
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, LoaderCircle } from 'lucide-react';
import GlowButton from '@/components/GlowButton';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, authState } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
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
            Sign in to track your progress and earn more rewards
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="cosmic@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-cosmic-deep-purple/20 border-cosmic-purple/30 text-white"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-cosmic-deep-purple/20 border-cosmic-purple/30 text-white"
                required
              />
            </div>
          </div>
          
          {authState.error && (
            <div className="text-red-500 text-sm">{authState.error}</div>
          )}
          
          <DialogFooter className="mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="border-cosmic-purple/30 text-gray-300 hover:bg-cosmic-purple/10"
            >
              Cancel
            </Button>
            <GlowButton type="submit" disabled={authState.isLoading}>
              {authState.isLoading ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </GlowButton>
          </DialogFooter>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            Demo credentials: demo@hypermoon.io / any password
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
