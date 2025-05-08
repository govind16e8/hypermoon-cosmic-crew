
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cosmic-dark text-white p-4">
      <div className="text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-4 font-orbitron text-cosmic-purple">404</h1>
        <p className="text-xl sm:text-2xl text-gray-300 mb-8">Oops! Page not found</p>
        <Link to="/" className="text-cosmic-purple hover:text-cosmic-blue underline text-lg">
          Return to Home
        </Link>
        {/* Space elements */}
        <div className="mt-12 relative">
          <div className="w-24 h-24 mx-auto rounded-full bg-cosmic-purple/30 animate-pulse flex items-center justify-center">
            <span className="text-4xl">🚀</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
