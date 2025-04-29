import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Função para validar a chave da API do YouTube
async function validateYouTubeApiKey(apiKey: string): Promise<boolean> {
  console.log("Validando chave da API do YouTube...");
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=test&maxResults=1&key=${apiKey}`
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erro na validação da API do YouTube: Status ${response.status}`, errorText);
      return false;
    }
    
    console.log("Chave da API do YouTube é válida!");
    return true;
  } catch (error) {
    console.error("Erro ao validar chave da API do YouTube:", error);
    return false;
  }
}

// Função para gerar playlist usando Gemini
async function generatePlaylistWithGemini(prompt: string, geminiApiKey: string) {
  const systemPrompt = `Você é um assistente de geração de playlists. Crie uma playlist de 8 músicas baseada no pedido do usuário. Retorne SOMENTE um array JSON de objetos com "title" e "artist", assim: [{"title": "Nome da Música", "artist": "Nome do Artista"}, ...]. Não inclua explicações.`;

  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + geminiApiKey, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        { parts: [{ text: `${systemPrompt}\nPedido do usuário: ${prompt}` }] }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Gemini API error: ${response.status}`, errorText);
    throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  // O Gemini geralmente retorna a resposta em data.candidates[0].content.parts[0].text
  const songsText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  // Extraia o array JSON da resposta
  let songList;
  try {
    const jsonMatch = songsText.match(/\[.*\]/s);
    songList = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(songsText);
    console.log("Playlist gerada pelo Gemini:", songList);
  } catch (e) {
    console.error("Erro ao fazer parse da resposta do Gemini:", e, songsText);
    throw new Error("Falha ao interpretar a playlist gerada pelo Gemini");
  }

  return {
    success: true,
    playlist: songList
  };
}

serve(async (req) => {
  console.log("Edge function received request:", req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("Request body:", JSON.stringify(body));
    
    const { action, params } = body;
    const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY');
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    
    // Log para debug das chaves (apenas os primeiros caracteres por segurança)
    console.log("YouTube API Key status:", YOUTUBE_API_KEY ? `Presente (começa com ${YOUTUBE_API_KEY.substring(0, 4)}...)` : 'Ausente');
    console.log("Gemini API Key status:", GEMINI_API_KEY ? `Presente (começa com ${GEMINI_API_KEY.substring(0, 4)}...)` : 'Ausente');
    
    // Validar existência das chaves de API
    if (!YOUTUBE_API_KEY) {
      throw new Error("Chave da API do YouTube não está configurada");
    }
    if (!GEMINI_API_KEY) {
      throw new Error("Chave da API do Gemini não está configurada");
    }

    let result;
    
    // Handle different actions
    switch (action) {
      case 'search':
        console.log("Executando busca com query:", params.query);
        result = await searchVideos(params.query, YOUTUBE_API_KEY);
        break;
      case 'createPlaylist':
        console.log("Executando createPlaylist com prompt:", params.prompt);
        // Gera a playlist com Gemini
        result = await generatePlaylistWithGemini(params.prompt, GEMINI_API_KEY);
        break;
      default:
        console.error("Ação inválida:", action);
        throw new Error("Ação inválida");
    }

    console.log("Função completada com sucesso");
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Erro na função edge:", error.message, error.stack);
    
    // Melhor tratamento de erro com mensagens mais específicas
    const errorMessage = error.message;
    let statusCode = 500;

    if (errorMessage.includes("API") && errorMessage.includes("inválida")) {
      statusCode = 401;
    } else if (errorMessage.includes("não está configurada")) {
      statusCode = 503;
    }

    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: error.stack,
      timestamp: new Date().toISOString()
    }), {
      status: statusCode,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Function to search YouTube videos
async function searchVideos(query: string, apiKey: string) {
  console.log(`Searching YouTube for: "${query}"`);
  
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=10&key=${apiKey}`
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`YouTube API error: ${response.status}`, errorText);
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Found ${data.items?.length || 0} video results`);
    
    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.default.url
    }));
  } catch (error) {
    console.error("Error searching YouTube videos:", error);
    throw error;
  }
}
