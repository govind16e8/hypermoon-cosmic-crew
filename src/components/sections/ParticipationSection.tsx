
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlowButton from '@/components/GlowButton';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/LoginModal';
import { Wallet } from 'lucide-react';

const ParticipationSection: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  
  const handleParticipate = () => {
    if (authState.user) {
      navigate('/airdrop');
    } else {
      openLoginModal();
    }
  };

  return (
    <section id="participation-section" className="py-20 bg-gradient-to-b from-black to-cosmic-dark relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white font-orbitron">
            How to Join the Moon Crew
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {authState.user 
              ? `Welcome, ${authState.user.username || 'Cosmic Explorer'}! Your journey continues...` 
              : 'Complete simple tasks to qualify for the HyperMoon airdrop and join our cosmic community.'}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="p-8 rounded-xl border border-cosmic-purple/30 bg-cosmic-dark/50 backdrop-blur-md text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl text-cosmic-purple font-semibold mb-4">
              Join the HyperMoon Airdrop
            </h3>
            <p className="text-gray-300 mb-8">
              {authState.user 
                ? "Continue to your personal dashboard to track your progress, complete tasks, and earn rewards."
                : "Connect your wallet to complete tasks, earn rewards, and bring others on the mission."}
            </p>
            
            <GlowButton 
              size="lg" 
              className="px-8 py-6 text-lg"
              onClick={handleParticipate}
            >
              {authState.user ? (
                "Enter Your Dashboard"
              ) : (
                <>
                  <Wallet className="h-5 w-5 mr-2" />
                  Launch Mission Control
                </>
              )}
            </GlowButton>
          </motion.div>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg bg-cosmic-dark/30 border border-cosmic-purple/20">
              <div className="w-16 h-16 bg-cosmic-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Complete Tasks</h4>
              <p className="text-gray-400">Follow social channels, register, and share to qualify for the airdrop</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-cosmic-dark/30 border border-cosmic-purple/20">
              <div className="w-16 h-16 bg-cosmic-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Refer Friends</h4>
              <p className="text-gray-400">Earn bonus points by inviting others to join the cosmic journey</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-cosmic-dark/30 border border-cosmic-purple/20">
              <div className="w-16 h-16 bg-cosmic-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔥</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Daily Streak</h4>
              <p className="text-gray-400">Log in daily to maintain your streak and earn multiplier bonuses</p>
            </div>
          </div>
        </div>
      </div>
      
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </section>
  );
};

export default ParticipationSection;
