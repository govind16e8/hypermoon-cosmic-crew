
import React from 'react';
import { motion } from "framer-motion";
import { Star, Zap, Users } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-cosmic-dark to-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white font-orbitron">
              What is <span className="text-cosmic-purple">HyperMoon</span>?
            </h2>
            
            <p className="text-lg md:text-xl text-gray-300 mb-6">
              HyperMoon is a community-driven token that fuels the future of space, tech, and Web3 innovation. Take part in our mission and earn rewards.
            </p>
            
            <div className="space-y-4 mt-8">
              <div className="flex items-start">
                <Star className="h-6 w-6 text-cosmic-purple mr-3 mt-1 flex-shrink-0" />
                <p className="text-lg text-gray-300">
                  <span className="text-white font-semibold">Earn airdrops</span> by participating in our community.
                </p>
              </div>
              
              <div className="flex items-start">
                <Users className="h-6 w-6 text-cosmic-purple mr-3 mt-1 flex-shrink-0" />
                <p className="text-lg text-gray-300">
                  <span className="text-white font-semibold">Shape the future</span> with governance rights.
                </p>
              </div>
              
              <div className="flex items-start">
                <Zap className="h-6 w-6 text-cosmic-purple mr-3 mt-1 flex-shrink-0" />
                <p className="text-lg text-gray-300">
                  <span className="text-white font-semibold">Exclusive NFTs</span> and access to future token utility.
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Animated astronaut mascot */}
              <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple to-cosmic-blue rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-8 bg-gradient-to-br from-cosmic-purple to-cosmic-blue rounded-full opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-16 bg-gradient-to-br from-cosmic-purple to-cosmic-blue rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute inset-24 bg-gradient-to-br from-cosmic-purple to-cosmic-blue rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Astronaut icon in the center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl">👨‍🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
