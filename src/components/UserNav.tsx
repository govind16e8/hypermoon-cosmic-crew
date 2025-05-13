
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Wallet, Award, Calendar, Users, LogOut, Database } from 'lucide-react';
import LoginModal from '@/components/LoginModal';

const UserNav: React.FC = () => {
  const { authState, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  
  // If user is not logged in, show connect wallet button
  if (!authState.user) {
    return (
      <>
        <Button 
          variant="outline" 
          className="border-cosmic-purple/30 text-cosmic-purple hover:bg-cosmic-purple/10"
          onClick={openLoginModal}
        >
          <Wallet className="h-4 w-4 mr-2" />
          Connect Wallet
        </Button>
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      </>
    );
  }
  
  // Get initials from wallet address for avatar fallback
  const getInitials = () => {
    if (authState.user?.walletAddress) {
      return authState.user.walletAddress.substring(2, 4).toUpperCase();
    }
    return 'HM';
  };

  const walletBadge = authState.user?.walletType === 'ethereum' ? 'ETH' : 'SOL';
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full hover:bg-cosmic-purple/10 border border-cosmic-purple/30"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatar-placeholder.png" alt="Wallet Avatar" />
            <AvatarFallback className="bg-cosmic-dark text-cosmic-purple">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cosmic-pink text-[10px] text-white font-bold">
            {walletBadge}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-cosmic-dark border border-cosmic-purple/30 text-white" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-cosmic-purple">
              {authState.user?.username || 'Cosmic Explorer'}
            </p>
            <p className="text-xs text-gray-400 truncate" title={authState.user?.walletAddress}>
              {authState.user?.walletAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-cosmic-purple/30" />
        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-cosmic-purple/10 flex justify-between cursor-pointer">
          <div className="flex items-center">
            <Award className="mr-2 h-4 w-4 text-cosmic-purple" />
            <span>Points</span>
          </div>
          <span className="text-cosmic-pink">{authState.user?.points || 0}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-cosmic-purple/10 flex justify-between cursor-pointer">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-cosmic-purple" />
            <span>Streak</span>
          </div>
          <span className="text-cosmic-pink">{authState.user?.streakCount || 0} days</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-cosmic-purple/10 flex justify-between cursor-pointer">
          <div className="flex items-center">
            <Database className="mr-2 h-4 w-4 text-cosmic-purple" />
            <span>Balance</span>
          </div>
          <span className="text-cosmic-pink">
            {authState.user?.walletBalance?.toFixed(4) || '0'} {authState.user?.walletType === 'ethereum' ? 'ETH' : 'SOL'}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-cosmic-purple/10 flex justify-between cursor-pointer">
          <div className="flex items-center">
            <Wallet className="mr-2 h-4 w-4 text-cosmic-purple" />
            <span>Wallet Age</span>
          </div>
          <span className="text-cosmic-pink">{authState.user?.walletAge || '0'} days</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-cosmic-purple/10 flex justify-between cursor-pointer">
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4 text-cosmic-purple" />
            <span>Referrals</span>
          </div>
          <span className="text-cosmic-pink">{authState.user?.referralCount || 0}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-cosmic-purple/30" />
        <DropdownMenuItem 
          className="text-gray-300 hover:text-white hover:bg-cosmic-purple/10 cursor-pointer"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4 text-cosmic-purple" />
          <span>Disconnect Wallet</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
