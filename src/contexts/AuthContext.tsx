import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState, User } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

interface AuthContextType {
  authState: AuthState;
  connectWallet: () => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  completeTask: (taskId: string) => void;
  checkDailyStreak: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null
  });
  
  // We need this for programmatic navigation
  const navigate = useNavigate();

  // Check if user is logged in from localStorage on initial load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('hypermoon_user');
        if (userData) {
          const user = JSON.parse(userData);
          setAuthState({
            user,
            isLoading: false,
            error: null
          });
          // Check streak on page load
          checkDailyStreak(user);
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            error: null
          });
        }
      } catch (error) {
        setAuthState({
          user: null,
          isLoading: false,
          error: 'Failed to restore session'
        });
      }
    };

    checkAuth();
  }, []);

  // Mock login function - in real app, would call an API
  const connectWallet = async () => {
    setAuthState({ ...authState, isLoading: true, error: null });
    
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed! Please install MetaMask to connect your wallet.");
      }
      
      // Request account access
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      
      // Get chain ID
      const network = await provider.getNetwork();
      const chainId = network.chainId;
      
      // For demo purposes, you might want to show a message if user is not on the right network
      // This example accepts any network, but you could restrict to specific ones
      
      // Create user object
      const updatedUser = {
        id: address,
        walletAddress: address,
        chainId: chainId.toString(),
        username: `${address.substring(0, 6)}...${address.substring(38)}`,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        referralCode: `COSMIC${address.substring(0, 5)}`,
        referredBy: undefined,
        completedTasks: [],
        referralCount: 0,
        streakCount: 1,
        lastStreak: new Date(),
        points: 50  // Award initial points for connecting wallet
      };
      
      // Save to localStorage
      localStorage.setItem('hypermoon_user', JSON.stringify(updatedUser));
      
      setAuthState({
        user: updatedUser,
        isLoading: false,
        error: null
      });
      
      toast({
        title: "Wallet connected",
        description: `Connected with ${updatedUser.username}`,
      });
      
      // Check streak
      checkDailyStreak(updatedUser);
      
      // Redirect to airdrop page after successful login
      navigate('/airdrop');
    } catch (error) {
      console.error("Wallet connection error:", error);
      setAuthState({
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to connect wallet'
      });
      
      toast({
        title: "Connection failed",
        description: error instanceof Error ? error.message : 'Failed to connect wallet',
        variant: "destructive"
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('hypermoon_user');
    setAuthState({
      user: null,
      isLoading: false,
      error: null
    });
    
    toast({
      title: "Wallet disconnected",
      description: "You have been successfully disconnected",
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (!authState.user) return;
    
    const updatedUser = { ...authState.user, ...userData };
    localStorage.setItem('hypermoon_user', JSON.stringify(updatedUser));
    
    setAuthState({
      ...authState,
      user: updatedUser
    });
  };

  const completeTask = (taskId: string) => {
    if (!authState.user) return;
    
    // Check if task is already completed
    if (authState.user.completedTasks.includes(taskId)) return;
    
    const completedTasks = [...authState.user.completedTasks, taskId];
    const points = authState.user.points + 50; // Award 50 points per task
    
    const updatedUser = {
      ...authState.user,
      completedTasks,
      points
    };
    
    localStorage.setItem('hypermoon_user', JSON.stringify(updatedUser));
    
    setAuthState({
      ...authState,
      user: updatedUser
    });
    
    toast({
      title: "Task completed!",
      description: `You earned 50 points. Current total: ${points} points`,
    });
  };

  const checkDailyStreak = (user = authState.user) => {
    if (!user) return;
    
    const now = new Date();
    const lastStreak = user.lastStreak ? new Date(user.lastStreak) : null;
    
    // If no previous login or it's the first login today
    if (!lastStreak) {
      const updatedUser = {
        ...user,
        streakCount: 1,
        lastStreak: now,
        points: user.points + 10 // Award 10 points for first day
      };
      
      localStorage.setItem('hypermoon_user', JSON.stringify(updatedUser));
      
      setAuthState({
        ...authState,
        user: updatedUser
      });
      
      toast({
        title: "First day streak!",
        description: "Come back tomorrow to continue your streak!",
      });
      return;
    }
    
    // Check if it's a new day (past midnight)
    const isNewDay = lastStreak.getDate() !== now.getDate() || 
                     lastStreak.getMonth() !== now.getMonth() || 
                     lastStreak.getFullYear() !== now.getFullYear();
    
    if (isNewDay) {
      // Calculate days between now and last streak
      const timeDiff = now.getTime() - lastStreak.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      
      if (daysDiff === 1) {
        // Consecutive day - increase streak
        const newStreakCount = user.streakCount + 1;
        // Calculate bonus (higher streak = higher bonus)
        const streakBonus = Math.min(50, newStreakCount * 10);
        
        const updatedUser = {
          ...user,
          streakCount: newStreakCount,
          lastStreak: now,
          points: user.points + streakBonus
        };
        
        localStorage.setItem('hypermoon_user', JSON.stringify(updatedUser));
        
        setAuthState({
          ...authState,
          user: updatedUser
        });
        
        toast({
          title: `${newStreakCount}-day streak!`,
          description: `You earned ${streakBonus} bonus points!`,
        });
      } else if (daysDiff > 1) {
        // Streak broken - reset to 1
        const updatedUser = {
          ...user,
          streakCount: 1,
          lastStreak: now,
          points: user.points + 10 // Base points for new streak
        };
        
        localStorage.setItem('hypermoon_user', JSON.stringify(updatedUser));
        
        setAuthState({
          ...authState,
          user: updatedUser
        });
        
        toast({
          title: "New streak started!",
          description: "Your previous streak was broken, but you've started a new one!",
        });
      }
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        authState, 
        connectWallet, 
        logout, 
        updateUser,
        completeTask,
        checkDailyStreak
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
