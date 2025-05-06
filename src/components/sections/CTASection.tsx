
import React from 'react';
import GlowButton from '@/components/GlowButton';
import StarBackground from '@/components/StarBackground';

const CTASection: React.FC = () => {
  const scrollToParticipation = () => {
    const participationSection = document.getElementById('participation-section');
    if (participationSection) {
      participationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-cosmic-dark relative overflow-hidden">
      <StarBackground className="opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-gradient-to-r from-cosmic-deep-purple/20 to-cosmic-blue/20 p-10 rounded-2xl border border-cosmic-purple/50 backdrop-blur-sm">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white font-orbitron">
              Are You Ready to Join the HyperMoon Mission?
            </h2>
            
            <p className="text-xl text-gray-300 mb-10">
              Don't miss your chance to be part of the next big crypto revolution. 
              The future is cosmic, and it starts with HyperMoon.
            </p>
            
            <GlowButton size="lg" className="px-10 py-7 text-xl" onClick={scrollToParticipation}>
              Start Participating Now
            </GlowButton>
          </div>
        </div>
      </div>
      
      {/* Visual element: Floating planet */}
      <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-gradient-to-br from-cosmic-purple/20 to-cosmic-blue/20 blur-2xl"></div>
    </section>
  );
};

export default CTASection;
