
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MusicNotesIcon } from "@/components/ui/music-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Calendar, Share, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

interface Playlist {
  id: string;
  title: string;
  description: string;
  songs: number;
  created: string;
}

const Dashboard = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: '1',
      title: 'Halloween Party',
      description: 'Spooky songs for your Halloween party',
      songs: 12,
      created: '2023-10-15'
    },
    {
      id: '2',
      title: 'Road Trip',
      description: 'Perfect songs for a long drive',
      songs: 24,
      created: '2023-09-22'
    },
    {
      id: '3',
      title: 'Workout Mix',
      description: 'High-energy songs to keep you motivated',
      songs: 18,
      created: '2023-08-05'
    }
  ]);

  const handleDeletePlaylist = (id: string) => {
    setPlaylists(playlists.filter(playlist => playlist.id !== id));
    toast.success("Playlist deleted successfully");
  };

  const handleSharePlaylist = (id: string) => {
    // Simulate copy to clipboard
    toast.success("Playlist link copied to clipboard");
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Your Dashboard</h1>
          <p className="text-gray-400">Manage and create your playlists</p>
        </div>
        <Button asChild className="purple-gradient">
          <Link to="/dashboard/create">
            <PlusCircle className="w-4 h-4 mr-2" />
            Create New Playlist
          </Link>
        </Button>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="glass-morphism mb-6">
          <TabsTrigger value="all">All Playlists</TabsTrigger>
          <TabsTrigger value="recent">Recently Created</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map(playlist => (
              <Card key={playlist.id} className="glass-morphism border-white/10 overflow-hidden">
                <CardHeader className="bg-gradient-to-br from-purple-900/30 to-purple-600/10">
                  <CardTitle className="flex items-center">
                    <MusicNotesIcon className="w-5 h-5 text-purple-400 mr-2" />
                    {playlist.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">{playlist.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex justify-between text-sm text-gray-400">
                    <div className="flex items-center">
                      <MusicNotesIcon className="w-4 h-4 mr-1" />
                      <span>{playlist.songs} songs</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{playlist.created}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-white/10 pt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-purple-500/50"
                    onClick={() => handleSharePlaylist(playlist.id)}
                  >
                    <Share className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-red-500/50 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    onClick={() => handleDeletePlaylist(playlist.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="glass-morphism border-white/10 border-dashed flex flex-col items-center justify-center min-h-[250px]">
              <Button 
                variant="ghost" 
                className="flex flex-col h-full w-full p-6"
                asChild
              >
                <Link to="/dashboard/create">
                  <PlusCircle className="w-12 h-12 mb-4 text-purple-400" />
                  <span className="text-xl font-medium text-gray-300">Create New Playlist</span>
                  <span className="text-sm text-gray-400 mt-2">Add a personalized playlist</span>
                </Link>
              </Button>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="recent">
          <div className="glass-morphism rounded-xl p-8 text-center">
            <p className="text-gray-400">Your recent playlists will appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="shared">
          <div className="glass-morphism rounded-xl p-8 text-center">
            <p className="text-gray-400">Your shared playlists will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Dashboard;
