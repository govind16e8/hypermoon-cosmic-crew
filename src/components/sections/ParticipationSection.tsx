
import React, { useState } from 'react';
import GlowButton from '@/components/GlowButton';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/LoginModal';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ParticipationSection: React.FC = () => {
  const { authState } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleActionClick = () => {
    if (authState.user) {
      // If logged in, navigate to airdrop page
      navigate('/airdrop');
    } else {
      // If not logged in, open login modal
      openLoginModal();
    }
  };
  
  return (
    <section id="participation-section" className="py-20 bg-gradient-to-b from-black to-cosmic-dark relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white font-orbitron">
            Join the HyperMoon Airdrop
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Participate in the airdrop by joining the community and completing simple steps.
          </p>
        </div>

        <div className="max-w-md mx-auto text-center">
          <div className="mb-10 bg-cosmic-dark/70 border border-cosmic-purple/30 rounded-lg py-10 px-6">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-cosmic-purple/20 rounded-full flex items-center justify-center">
                <span className="text-5xl">🚀</span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">Ready for Takeoff?</h3>
            <p className="text-gray-300 mb-8">
              Sign in to access the HyperMoon airdrop dashboard and start earning your allocation.
            </p>
            
            <GlowButton size="lg" className="w-full py-6" onClick={handleActionClick}>
              {authState.user ? "Enter the Space Station" : "Sign In to Begin"} 
              <ArrowRight className="ml-2 h-5 w-5" />
            </GlowButton>
          </div>
        </div>
      </div>
      
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </section>
  );
};

export default ParticipationSection;
