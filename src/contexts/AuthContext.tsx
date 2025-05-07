import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState, User } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

// Mock user data - in a real app, this would come from an API/database
const MOCK_USERS = [
  {
    id: 'user1',
    email: 'demo@hypermoon.io',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    username: 'cosmicuser',
    createdAt: new Date('2025-01-01'),
    lastLoginAt: new Date(),
    referralCode: 'COSMIC123',
    referredBy: undefined,
    completedTasks: ['telegram', 'twitter'],
    referralCount: 3,
    streakCount: 5,
    lastStreak: new Date(),
    points: 250
  }
];

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
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
  const login = async (email: string, password: string) => {
    setAuthState({ ...authState, isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching email
      const user = MOCK_USERS.find(u => u.email === email);
      
      if (user) {
        // Update last login time
        const updatedUser = {
          ...user,
          lastLoginAt: new Date()
        };
        
        // Save to localStorage
        localStorage.setItem('hypermoon_user', JSON.stringify(updatedUser));
        
        setAuthState({
          user: updatedUser,
          isLoading: false,
          error: null
        });
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${updatedUser.username || email}!`,
        });
        
        // Check streak
        checkDailyStreak(updatedUser);
        
        // Redirect to airdrop page after successful login
        navigate('/airdrop');
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          error: 'Invalid email or password'
        });
        
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive"
        });
      }
    } catch (error) {
      setAuthState({
        user: null,
        isLoading: false,
        error: 'Login failed'
      });
      
      toast({
        title: "Login failed",
        description: "An error occurred during login",
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
      title: "Logged out",
      description: "You have been successfully logged out",
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
        login, 
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
