
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ParticipationSection from '@/components/sections/ParticipationSection';
import CommunitySection from '@/components/sections/CommunitySection';
import CTASection from '@/components/sections/CTASection';
import FooterSection from '@/components/sections/FooterSection';
import SpaceAudioPlayer from '@/components/SpaceAudioPlayer';
import { useAuth } from '@/contexts/AuthContext';

interface LocationState {
  scrollTo?: string;
}

const Index: React.FC = () => {
  const { checkDailyStreak } = useAuth();
  const location = useLocation();
  const state = location.state as LocationState;
  
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Check daily streak for logged in users
    checkDailyStreak();
    
    // Handle scrolling to section if coming from another page
    if (state?.scrollTo) {
      const section = document.getElementById(state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [checkDailyStreak, state]);
  
  // Add subtle stars/cosmic effects
  useEffect(() => {
    const createCosmicEffect = () => {
      const star = document.createElement('div');
      const size = Math.random() * 4 + 1;
      star.className = 'cosmic-particle';
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.background = 'white';
      star.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.8)';
      star.style.borderRadius = '50%';
      star.style.position = 'fixed';
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.opacity = '0';
      star.style.zIndex = '1';
      
      document.body.appendChild(star);
      
      // Animate star
      setTimeout(() => {
        star.style.transition = 'opacity 2s ease-in-out, transform 10s linear';
        star.style.opacity = `${Math.random() * 0.5 + 0.2}`;
        star.style.transform = `translateY(${Math.random() * 20 - 10}vh)`;
        
        // Remove after animation
        setTimeout(() => {
          star.style.opacity = '0';
          setTimeout(() => {
            document.body.removeChild(star);
          }, 2000);
        }, 8000);
      }, 100);
    };
    
    // Create stars randomly
    const interval = setInterval(() => {
      createCosmicEffect();
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen bg-cosmic-dark text-white">
      <NavBar />
      <HeroSection />
      <AboutSection />
      <ParticipationSection />
      <CommunitySection />
      <CTASection />
      <FooterSection />
      <SpaceAudioPlayer />
    </div>
  );
};

export default Index;
