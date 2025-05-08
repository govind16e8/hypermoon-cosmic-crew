
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import GlowButton from '@/components/GlowButton';
import UserNav from '@/components/UserNav';
import { Link, useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // Close mobile menu first
    setMobileMenuOpen(false);
    
    // Check if we're on the home page
    if (window.location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on home page, navigate to home and then scroll
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2 bg-cosmic-dark/80 backdrop-blur-lg shadow-lg'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo with icon */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-xl sm:text-2xl font-bold text-white font-orbitron">
              <img 
                src="/lovable-uploads/d33f823d-0fb9-4e10-8cfb-b52e2e7675fc.png" 
                alt="Planet Logo" 
                className="h-7 w-7 sm:h-8 sm:w-8 mr-2" 
              />
              Hyper<span className="text-cosmic-purple">Moon</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a
              onClick={() => scrollToSection('participation-section')}
              className="text-gray-300 hover:text-cosmic-purple transition-colors cursor-pointer"
            >
              Participate
            </a>
            <Link
              to="/roadmap"
              className="text-gray-300 hover:text-cosmic-purple transition-colors"
            >
              Roadmap
            </Link>
            <a
              href="#"
              className="text-gray-300 hover:text-cosmic-purple transition-colors"
            >
              Community
            </a>
            <UserNav />
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <UserNav />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cosmic-dark/95 backdrop-blur-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <a
                  onClick={() => scrollToSection('participation-section')}
                  className="text-gray-300 hover:text-cosmic-purple transition-colors py-2 cursor-pointer"
                >
                  Participate
                </a>
                <Link
                  to="/roadmap"
                  className="text-gray-300 hover:text-cosmic-purple transition-colors py-2"
                >
                  Roadmap
                </Link>
                <a
                  href="#"
                  className="text-gray-300 hover:text-cosmic-purple transition-colors py-2"
                >
                  Community
                </a>
                <GlowButton
                  onClick={() => scrollToSection('participation-section')}
                  className="w-full mt-2"
                >
                  Join the Crew
                </GlowButton>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
