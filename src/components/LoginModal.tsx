
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LoaderCircle, Wallet } from 'lucide-react';
import GlowButton from '@/components/GlowButton';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { connectWallet, authState } = useAuth();
  
  const handleConnectWallet = async () => {
    await connectWallet('ethereum');
    if (!authState.error) {
      onClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-cosmic-dark border border-cosmic-purple/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-cosmic-purple">Join the Moon Crew</DialogTitle>
          <DialogDescription className="text-gray-300">
            Connect your wallet to track your progress and earn more rewards
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6 space-y-4">
          <div className="bg-cosmic-deep-purple/20 border border-cosmic-purple/30 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-cosmic-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="h-8 w-8 text-cosmic-purple" />
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h3>
            <p className="text-gray-400 mb-6">
              Connect your MetaMask wallet to access the HyperMoon airdrop dashboard and track your rewards.
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <GlowButton 
                onClick={handleConnectWallet} 
                disabled={authState.isLoading} 
                className="w-full"
                size="lg"
              >
                {authState.isLoading ? (
                  <>
                    <LoaderCircle className="h-5 w-5 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="h-5 w-5 mr-2" />
                    Connect MetaMask
                  </>
                )}
              </GlowButton>
            </div>
            
            {authState.error && (
              <p className="mt-4 text-red-500 text-sm">{authState.error}</p>
            )}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              By connecting your wallet, you agree to our <a href="#" className="text-cosmic-purple hover:underline">Terms of Service</a> and <a href="#" className="text-cosmic-purple hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
