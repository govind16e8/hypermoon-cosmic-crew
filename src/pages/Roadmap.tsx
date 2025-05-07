
import React from 'react';
import NavBar from '@/components/NavBar';
import FooterSection from '@/components/sections/FooterSection';
import RoadmapSection from '@/components/sections/RoadmapSection';
import SpaceAudioPlayer from '@/components/SpaceAudioPlayer';
import { useAuth } from '@/contexts/AuthContext';

const Roadmap: React.FC = () => {
  return (
    <div className="min-h-screen bg-cosmic-dark text-white">
      <NavBar />
      <div className="pt-20">
        <RoadmapSection />
      </div>
      <FooterSection />
      <SpaceAudioPlayer />
    </div>
  );
};

export default Roadmap;
