
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MusicNotesIcon } from "@/components/ui/music-icon";
import { LogOut, Home, PlusCircle, Settings } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // TODO: Replace with actual logout
    toast.success("Logged out successfully");
    navigate("/");
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/dashboard/create", label: "Create Playlist", icon: PlusCircle },
    { path: "/dashboard/settings", label: "Settings", icon: Settings }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-0 w-full z-50 glass-morphism px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="text-lg font-bold text-gradient">PlaylistGenius</span>
        </Link>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        >
          {isMobileSidebarOpen ? "Close" : "Menu"}
        </Button>
      </div>
      
      {/* Sidebar */}
      <div 
        className={`${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:sticky top-0 left-0 z-40 h-full w-64 glass-morphism transition-transform duration-300 ease-in-out md:flex flex-col`}
      >
        <div className="p-6 border-b border-white/10">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-xl font-bold text-gradient">PlaylistGenius</span>
          </Link>
        </div>
        
        <nav className="flex-grow p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path) 
                    ? "bg-white/10 text-purple-300" 
                    : "text-gray-300 hover:bg-white/5"
                }`}
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="mt-8">
            <h3 className="px-4 text-xs uppercase text-gray-500 font-semibold mb-2">
              Your Playlists
            </h3>
            <div className="space-y-1">
              {['Halloween Party', 'Road Trip', 'Workout Mix'].map((playlist, index) => (
                <Link
                  key={index}
                  to={`/dashboard/playlist/${index}`}
                  className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:bg-white/5 transition-colors"
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <MusicNotesIcon className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-sm">{playlist}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center">
              <span className="text-white font-medium text-sm">JD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-400">john@example.com</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start mt-2 text-red-400 hover:text-red-300 hover:bg-red-400/10"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log out
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow md:ml-64 pt-16 md:pt-0">
        <div className="container p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
