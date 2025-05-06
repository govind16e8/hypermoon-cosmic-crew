
import React, { useEffect, useRef, useState } from 'react';
import GlowButton from '@/components/GlowButton';
import { ArrowDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/LoginModal';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const { authState } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Handle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && layerRef.current) {
        const scrollY = window.scrollY;
        const sectionTop = sectionRef.current.offsetTop;
        const sectionHeight = sectionRef.current.offsetHeight;
        
        // Only apply parallax when section is in view
        if (scrollY >= sectionTop - window.innerHeight && scrollY <= sectionTop + sectionHeight) {
          // Move the layer at a different speed than the scroll
          const yPos = (scrollY - sectionTop) * 0.4;
          layerRef.current.style.transform = `translateY(${yPos}px)`;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToParticipation = () => {
    const participationSection = document.getElementById('participation-section');
    if (participationSection) {
      participationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleCTAClick = () => {
    if (authState.user) {
      // If logged in, go directly to airdrop page
      window.location.href = '/airdrop';
    } else {
      // If not logged in, either scroll to participation or open login modal
      scrollToParticipation();
    }
  };
  
  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cosmic-dark"
    >
      <div 
        ref={layerRef}
        className="parallax-layer z-10"
      >
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-float">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white font-orbitron">
              Fuel the Future with <span className="text-cosmic-purple">HyperMoon</span>
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-cosmic-purple font-orbitron">
              Your Gateway to the Stars
            </h2>
            
            <p className="text-xl md:text-2xl lg:text-3xl mb-10 text-gray-200 max-w-3xl mx-auto">
              Join us on a cosmic journey. Together, we reach new heights.
            </p>
            
            <GlowButton size="lg" className="mt-8 px-8 py-6 text-lg" onClick={handleCTAClick}>
              Join the Crew <ArrowDown className="ml-2 h-5 w-5" />
            </GlowButton>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator animation */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={scrollToParticipation}
      >
        <ArrowDown className="h-10 w-10 text-cosmic-purple" />
      </div>
      
      {/* Visual element: Orbiting planet */}
      <div className="absolute right-10 bottom-20 w-32 h-32 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-purple-300 to-purple-100 opacity-20 animate-orbit z-0"></div>
      
      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </section>
  );
};

export default HeroSection;
