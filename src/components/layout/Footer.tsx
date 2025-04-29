
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-black/30 border-t border-white/10 py-10 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-lg font-bold text-gradient">PlaylistGenius</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Create AI-powered personalized YouTube playlists for any occasion with just a few clicks.
            </p>
          </div>
          
          <div className="md:ml-auto">
            <h3 className="text-sm font-semibold text-white mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} PlaylistGenius. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
