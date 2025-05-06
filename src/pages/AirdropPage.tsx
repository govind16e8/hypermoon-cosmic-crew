
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import FooterSection from '@/components/sections/FooterSection';
import UserStats from '@/components/UserStats';
import ReferralPanel from '@/components/ReferralPanel';
import DailyStreak from '@/components/DailyStreak';
import TaskTracker from '@/components/TaskTracker';
import { useAuth } from '@/contexts/AuthContext';
import DynamicBackground from '@/components/DynamicBackground';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AirdropPage: React.FC = () => {
  const { authState, checkDailyStreak } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check daily streak for logged in users
    checkDailyStreak();
    console.log("AirdropPage mounted, user:", authState.user);
  }, [checkDailyStreak]);
  
  // Add debug check for user data
  if (!authState.user) {
    console.log("No user found in AirdropPage");
    return (
      <div className="min-h-screen bg-cosmic-dark text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-cosmic-purple mb-4">Authentication Required</h2>
          <p className="mb-4">You need to be logged in to view this page</p>
          <Button 
            variant="outline" 
            className="text-cosmic-purple hover:bg-cosmic-purple/10"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-cosmic-dark text-white">
      <DynamicBackground />
      <NavBar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center">
            <Button 
              variant="ghost" 
              className="text-cosmic-purple hover:bg-cosmic-purple/10"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white font-orbitron">
              Your HyperMoon <span className="text-cosmic-purple">Airdrop</span> Dashboard
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Complete tasks, invite friends, and maintain your daily streak to maximize your airdrop allocation.
            </p>
            
            {/* Eligibility Banner */}
            <div className="mt-6 p-4 bg-cosmic-purple/20 border border-cosmic-purple/30 rounded-lg inline-block mx-auto">
              <p className="text-cosmic-purple font-medium">
                Airdrop eligibility: Active • Distribution expected Q3 2025
              </p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <UserStats />
            <TaskTracker />
            <ReferralPanel />
            <DailyStreak />
          </div>
        </div>
      </main>
      
      <FooterSection />
    </div>
  );
};

export default AirdropPage;
