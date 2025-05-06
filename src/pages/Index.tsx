
import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ParticipationSection from '@/components/sections/ParticipationSection';
import RoadmapSection from '@/components/sections/RoadmapSection';
import CommunitySection from '@/components/sections/CommunitySection';
import CTASection from '@/components/sections/CTASection';
import FooterSection from '@/components/sections/FooterSection';
import DynamicBackground from '@/components/DynamicBackground';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const { checkDailyStreak } = useAuth();
  
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Check daily streak for logged in users
    checkDailyStreak();
    
    // Create and play ambient space music
    const audio = new Audio('/space-ambient.mp3');
    audio.loop = true;
    audio.volume = 0.15; // Lower volume
    
    // Play the audio (will be blocked in some browsers until user interacts)
    const playMusic = () => {
      audio.play().catch(error => {
        console.log("Audio autoplay prevented:", error);
      });
    };
    
    // Try to autoplay, and also add event listeners to play on user interaction
    playMusic();
    document.addEventListener('click', playMusic, { once: true });
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      audio.pause();
      document.removeEventListener('click', playMusic);
    };
  }, [checkDailyStreak]);
  
  return (
    <div className="min-h-screen bg-cosmic-dark text-white">
      <DynamicBackground />
      <NavBar />
      <HeroSection />
      <AboutSection />
      <ParticipationSection />
      <RoadmapSection />
      <CommunitySection />
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default Index;
