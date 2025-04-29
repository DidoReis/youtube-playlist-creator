
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md glass-morphism rounded-xl p-8">
        <h1 className="text-4xl font-bold mb-4 text-gradient">404</h1>
        <p className="text-xl text-gray-300 mb-6">Oops! Page not found</p>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="purple-gradient">
            <Link to="/">Return to Home</Link>
          </Button>
          <Button asChild variant="outline" className="border-purple-500/50">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
