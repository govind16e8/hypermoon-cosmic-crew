
import React, { useEffect } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import RoadmapSection from '@/components/sections/RoadmapSection';
import CommunitySection from '@/components/sections/CommunitySection';
import CTASection from '@/components/sections/CTASection';
import FooterSection from '@/components/sections/FooterSection';

const Index: React.FC = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-cosmic-dark text-white">
      <HeroSection />
      <AboutSection />
      <RoadmapSection />
      <CommunitySection />
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default Index;
