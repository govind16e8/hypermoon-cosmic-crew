
import React, { useEffect, useRef } from 'react';
import StarBackground from '@/components/StarBackground';
import GlowButton from '@/components/GlowButton';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  
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
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-float">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white font-orbitron">
              HyperMoon <span className="text-cosmic-purple">–</span> To the Moon, Together.
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl mb-10 text-gray-200 max-w-3xl mx-auto">
              The meme token with cosmic ambitions. Join the ride.
            </p>
            
            <GlowButton size="lg" className="mt-8 px-8 py-6 text-lg">
              Join the Crew <ArrowRight className="ml-2 h-5 w-5" />
            </GlowButton>
          </div>
        </div>
      </div>
      
      {/* Visual element: Floating moon or planet */}
      <div className="absolute right-10 bottom-20 w-32 h-32 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-gray-300 to-gray-100 opacity-20 animate-pulse z-0"></div>
    </section>
  );
};

export default HeroSection;
