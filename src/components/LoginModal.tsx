
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, authState } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const [loginErrorType, setLoginErrorType] = useState<'wrong_password' | 'email_not_found' | null>(null);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    
    // Check the type of error and set appropriate error type
    if (authState.error) {
      // This is a simplified check - in a real app, you'd get specific error codes from your auth system
      if (authState.error.includes('password')) {
        setLoginErrorType('wrong_password');
      } else {
        setLoginErrorType('email_not_found');
      }
    } else {
      setLoginErrorType(null);
      onClose();
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would implement signup functionality here
    console.log("Sign up with", signupEmail, signupPassword);
    // Redirect to the login tab
    setActiveTab('login');
  };
  
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would implement forgot password functionality here
    console.log("Reset password for", forgotEmail);
    // Show a success message or redirect to login
    setActiveTab('login');
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="hidden">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="forgot">Forgot</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
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
                <div className="text-red-500 text-sm flex justify-between">
                  <span>{authState.error}</span>
                  {loginErrorType === 'wrong_password' && (
                    <button 
                      type="button" 
                      className="text-cosmic-purple hover:underline"
                      onClick={() => setActiveTab('forgot')}
                    >
                      Forgot Password?
                    </button>
                  )}
                  {loginErrorType === 'email_not_found' && (
                    <button 
                      type="button" 
                      className="text-cosmic-purple hover:underline"
                      onClick={() => setActiveTab('signup')}
                    >
                      Sign Up
                    </button>
                  )}
                </div>
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

              <div className="text-center pt-2 border-t border-cosmic-purple/20 mt-4">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{" "}
                  <button 
                    type="button"
                    onClick={() => setActiveTab('signup')}
                    className="text-cosmic-purple hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-white">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="cosmic@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="pl-10 bg-cosmic-deep-purple/20 border-cosmic-purple/30 text-white"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="pl-10 bg-cosmic-deep-purple/20 border-cosmic-purple/30 text-white"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-confirm" className="text-white">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="signup-confirm"
                    type="password"
                    placeholder="••••••••"
                    value={signupConfirm}
                    onChange={(e) => setSignupConfirm(e.target.value)}
                    className="pl-10 bg-cosmic-deep-purple/20 border-cosmic-purple/30 text-white"
                    required
                  />
                </div>
              </div>
              
              <DialogFooter className="mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setActiveTab('login')}
                  className="border-cosmic-purple/30 text-gray-300 hover:bg-cosmic-purple/10"
                >
                  Back to Login
                </Button>
                <GlowButton type="submit">
                  Create Account
                </GlowButton>
              </DialogFooter>
              
              <div className="text-center pt-2 border-t border-cosmic-purple/20 mt-4">
                <p className="text-gray-400 text-sm">
                  Already have an account?{" "}
                  <button 
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="text-cosmic-purple hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="forgot">
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="forgot-email" className="text-white">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="cosmic@example.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="pl-10 bg-cosmic-deep-purple/20 border-cosmic-purple/30 text-white"
                    required
                  />
                </div>
              </div>
              
              <p className="text-gray-300 text-sm">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
              <DialogFooter className="mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setActiveTab('login')}
                  className="border-cosmic-purple/30 text-gray-300 hover:bg-cosmic-purple/10"
                >
                  Back to Login
                </Button>
                <GlowButton type="submit">
                  Reset Password
                </GlowButton>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
        
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
