
import React, { useEffect, useRef } from 'react';
import StarBackground from '@/components/StarBackground';
import GlowButton from '@/components/GlowButton';
import { ArrowDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Handle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && layerRef.current && !isMobile) {
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
    
    // Only add parallax effect on desktop
    if (!isMobile) {
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  const scrollToParticipation = () => {
    const participationSection = document.getElementById('participation-section');
    if (participationSection) {
      participationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cosmic-dark"
    >
      <StarBackground />
      
      <div 
        ref={layerRef}
        className="parallax-layer z-10"
      >
        <div className="container mx-auto px-4 py-20 pt-36 md:pt-20 text-center">
          <div className="animate-float">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white font-orbitron">
              HyperMoon <span className="text-cosmic-purple">–</span> <br className="md:hidden" />
              <span className="inline-block">A Token for Innovation and Community.</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-10 text-gray-200 max-w-3xl mx-auto">
              Join us on a cosmic journey. Together, we reach new heights.
            </p>
            
            <GlowButton 
              size={isMobile ? "default" : "lg"} 
              className={`mt-8 ${isMobile ? 'px-6 py-4' : 'px-8 py-6 text-lg'}`} 
              onClick={scrollToParticipation}
            >
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
        <ArrowDown className="h-8 w-8 sm:h-10 sm:w-10 text-cosmic-purple" />
      </div>
      
      {/* Visual element: Floating moon or planet */}
      <div className="absolute right-10 bottom-20 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-gray-300 to-gray-100 opacity-20 animate-pulse z-0"></div>
    </section>
  );
};

export default HeroSection;
