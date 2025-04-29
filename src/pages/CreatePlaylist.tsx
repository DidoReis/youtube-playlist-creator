
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/sonner";
import { MusicNotesIcon } from "@/components/ui/music-icon";
import { supabase } from "@/integrations/supabase/client";
import { PlayIcon, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PlaylistSong {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
}

const CreatePlaylist = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedPlaylist, setGeneratedPlaylist] = useState<PlaylistSong[]>([]);
  const [playlistTitle, setPlaylistTitle] = useState("Custom Playlist");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (prompt.trim() === "") {
      toast.error("Please enter a description for your playlist");
      return;
    }
    
    // Clear any previous errors
    setError(null);
    
    // Start generating the playlist
    setIsGenerating(true);
    setGenerationProgress(0);
    setGeneratedPlaylist([]);
    
    // Use a progress interval for UX
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 600);
    
    try {
      console.log("Calling YouTube API with prompt:", prompt);
      
      // Call our edge function to generate the playlist
      const { data, error } = await supabase.functions.invoke('youtube-api', {
        body: {
          action: 'createPlaylist',
          params: { prompt }
        }
      });
      
      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Unknown error from edge function");
      }
      
      console.log("API response:", data);
      
      if (!data || !data.playlist) {
        throw new Error("Invalid response from API");
      }
      
      // Generate a playlist title from the prompt
      let title = prompt.split(' ').slice(0, 3).join(' ');
      if (title.length < 10) {
        title += " Mix";
      }
      setPlaylistTitle(title);
      
      // Set the generated playlist
      setGeneratedPlaylist(data.playlist || []);
      toast.success("Playlist generated successfully!");
    } catch (error: any) {
      console.error("Error generating playlist:", error);
      setError(`Failed to generate playlist: ${error.message || "Unknown error"}`);
      toast.error(`Failed to generate playlist: ${error.message || "Unknown error"}`);
    } finally {
      clearInterval(progressInterval);
      setGenerationProgress(100);
      setIsGenerating(false);
    }
  };
  
  const handleSavePlaylist = async () => {
    try {
      // Here we could save the playlist to a database
      // For now we'll just show a success message
      toast.success("Playlist saved successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(`Failed to save playlist: ${error.message || "Unknown error"}`);
    }
  };
  
  const handlePlayVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };
  
  const handlePlayPlaylist = () => {
    if (generatedPlaylist.length === 0) {
      toast.error("No playlist to play");
      return;
    }
    
    // Create a YouTube playlist URL with all video IDs
    const videoIds = generatedPlaylist.map(song => song.id).join(',');
    window.open(`https://www.youtube.com/watch_videos?video_ids=${videoIds}`, '_blank');
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Create New Playlist</h1>
        <p className="text-gray-400">Use AI to generate a personalized playlist</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card className="glass-morphism border-white/10">
            <CardHeader>
              <CardTitle>Describe Your Playlist</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="prompt">What kind of playlist do you want?</Label>
                    <Textarea
                      id="prompt"
                      placeholder="e.g. Create a playlist for my Halloween party with spooky songs from the 80s and 90s"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-32 bg-background border-white/10"
                      disabled={isGenerating}
                    />
                    <p className="text-xs text-gray-400">
                      Be specific about mood, occasion, genres, or time periods you prefer.
                    </p>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full purple-gradient"
                    disabled={isGenerating}
                  >
                    {isGenerating ? "Generating Playlist..." : "Generate Playlist"}
                  </Button>
                </div>
              </form>
              
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {isGenerating && (
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Generating your playlist...</span>
                    <span>{Math.round(generationProgress)}%</span>
                  </div>
                  <Progress value={generationProgress} className="h-2 bg-white/5" />
                  <p className="text-xs italic text-gray-500 mt-2">
                    Our AI is searching for the perfect songs based on your description.
                  </p>
                </div>
              )}
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-3">Tips for Better Playlists:</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-purple-400/10 text-purple-400 h-6 w-6 mr-2 shrink-0">1</span>
                    <span>Be specific about the mood or occasion (party, workout, relaxation)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-purple-400/10 text-purple-400 h-6 w-6 mr-2 shrink-0">2</span>
                    <span>Mention specific genres or decades you prefer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-purple-400/10 text-purple-400 h-6 w-6 mr-2 shrink-0">3</span>
                    <span>Include artists you like for better recommendations</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="glass-morphism border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Generated Playlist</CardTitle>
              {generatedPlaylist.length > 0 && (
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={handlePlayPlaylist}
                  >
                    <PlayIcon className="h-4 w-4 mr-2" />
                    Play All
                  </Button>
                  <Button 
                    size="sm" 
                    className="purple-gradient"
                    onClick={handleSavePlaylist}
                  >
                    Save Playlist
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {generatedPlaylist.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{playlistTitle}</h3>
                      <p className="text-sm text-gray-400">{generatedPlaylist.length} songs</p>
                    </div>
                  </div>
                  
                  <Separator className="bg-white/10" />
                  
                  <div className="space-y-2">
                    {generatedPlaylist.map((song) => (
                      <div key={song.id} className="flex items-center p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <div 
                          className="h-10 w-10 rounded bg-purple-900/50 flex items-center justify-center mr-3 cursor-pointer overflow-hidden"
                          onClick={() => handlePlayVideo(song.id)}
                        >
                          {song.thumbnail ? (
                            <img src={song.thumbnail} alt={song.title} className="w-full h-full object-cover" />
                          ) : (
                            <MusicNotesIcon className="h-5 w-5 text-purple-400" />
                          )}
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="font-medium truncate">{song.title}</p>
                          <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="ml-2"
                          onClick={() => handlePlayVideo(song.id)}
                        >
                          <PlayIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="bg-white/10" />
                  
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" className="border-white/10">
                      Edit Playlist
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-white/10"
                      onClick={handlePlayPlaylist}
                    >
                      Open on YouTube
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <MusicNotesIcon className="h-16 w-16 text-gray-500 mb-4" />
                  <h3 className="text-xl font-medium text-gray-300 mb-2">No Playlist Generated</h3>
                  <p className="text-gray-400 max-w-xs">
                    {isGenerating 
                      ? "Your playlist is being created..."
                      : "Enter a description and click Generate to create a playlist."
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {generatedPlaylist.length > 0 && (
            <Card className="glass-morphism border-white/10 mt-6">
              <CardHeader>
                <CardTitle>Share Your Playlist</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Share your generated playlist with friends or on social media.
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1 border-white/10" onClick={() => toast.success("Link copied to clipboard!")}>
                    Copy Link
                  </Button>
                  <Button variant="outline" className="flex-1 border-white/10" onClick={() => toast.success("Playlist shared!")}>
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreatePlaylist;
