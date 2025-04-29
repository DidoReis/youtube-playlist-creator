
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-morphism px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="text-xl font-bold text-gradient">PlaylistGenius</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-4">
            <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              About
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button asChild variant="outline" size="sm" className="border-purple-500/50 hover:border-purple-500">
              <Link to="/login">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button asChild className="purple-gradient">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation Toggle */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-morphism py-4 px-4 absolute top-full left-0 right-0 border-t border-white/10">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-4 py-2"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-4 py-2"
              onClick={toggleMenu}
            >
              About
            </Link>
            <hr className="border-white/10" />
            <Button asChild variant="outline" size="sm" className="border-purple-500/50">
              <Link to="/login" onClick={toggleMenu}>Login</Link>
            </Button>
            <Button asChild className="purple-gradient">
              <Link to="/signup" onClick={toggleMenu}>Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
