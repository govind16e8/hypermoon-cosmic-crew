
export interface User {
  id: string;
  email: string;
  walletAddress?: string;
  walletType?: 'ethereum';
  walletAge?: number; // in days
  walletBalance?: number;
  username?: string;
  createdAt: Date;
  lastLoginAt: Date;
  referralCode: string;
  referredBy?: string;
  completedTasks: string[];
  referralCount: number;
  streakCount: number;
  lastStreak: Date | null;
  points: number;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
}

export interface ReferralData {
  code: string;
  count: number;
  rewards: number;
}

export interface StreakData {
  current: number;
  lastLogin: Date | null;
  multiplier: number;
}
