
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import GlowButton from '@/components/GlowButton';
import UserNav from '@/components/UserNav';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { authState } = useAuth();

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
    // Only scroll if we're on the home page
    if (window.location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    } else {
      // If not on home page, navigate to home and then scroll
      window.location.href = `/#${sectionId}`;
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
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white font-orbitron">
              Hyper<span className="text-cosmic-purple">Moon</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              onClick={() => scrollToSection('participation-section')}
              className="text-gray-300 hover:text-cosmic-purple transition-colors cursor-pointer"
            >
              Participate
            </a>
            <a
              onClick={() => scrollToSection('roadmap-section')}
              className="text-gray-300 hover:text-cosmic-purple transition-colors cursor-pointer"
            >
              Roadmap
            </a>
            <a
              onClick={() => scrollToSection('community-section')}
              className="text-gray-300 hover:text-cosmic-purple transition-colors cursor-pointer"
            >
              Community
            </a>
            {authState.user && (
              <Link 
                to="/airdrop"
                className="text-cosmic-purple hover:text-cosmic-pink transition-colors"
              >
                Airdrop
              </Link>
            )}
            <UserNav />
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <UserNav />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
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
                <a
                  onClick={() => scrollToSection('roadmap-section')}
                  className="text-gray-300 hover:text-cosmic-purple transition-colors py-2 cursor-pointer"
                >
                  Roadmap
                </a>
                <a
                  onClick={() => scrollToSection('community-section')}
                  className="text-gray-300 hover:text-cosmic-purple transition-colors py-2 cursor-pointer"
                >
                  Community
                </a>
                {authState.user && (
                  <Link 
                    to="/airdrop"
                    className="text-cosmic-purple hover:text-cosmic-pink transition-colors py-2"
                  >
                    Airdrop
                  </Link>
                )}
                <GlowButton
                  onClick={() => authState.user ? window.location.href = '/airdrop' : scrollToSection('participation-section')}
                  className="w-full mt-2"
                >
                  {authState.user ? 'Enter Space Station' : 'Join the Crew'}
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
