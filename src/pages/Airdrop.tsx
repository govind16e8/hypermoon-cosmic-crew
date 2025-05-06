
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import FooterSection from '@/components/sections/FooterSection';
import UserStats from '@/components/UserStats';
import ReferralPanel from '@/components/ReferralPanel';
import DailyStreak from '@/components/DailyStreak';
import { useAuth } from '@/contexts/AuthContext';
import { Progress } from '@/components/ui/progress';
import GlowButton from '@/components/GlowButton';
import { Check, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Task } from '@/types/user';
import SpaceAudioPlayer from '@/components/SpaceAudioPlayer';

const Airdrop: React.FC = () => {
  const { authState, completeTask, checkDailyStreak } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in, redirect to home if not
    if (!authState.user) {
      navigate('/');
      return;
    }
    
    // Check daily streak for logged in users
    checkDailyStreak();
  }, [authState.user, navigate, checkDailyStreak]);
  
  // Define tasks
  const tasks: Task[] = [
    {
      id: 'telegram',
      title: 'Join our Telegram/Discord',
      description: 'Connect with the community and stay updated on announcements.',
      points: 50,
      completed: authState.user?.completedTasks.includes('telegram') || false
    },
    {
      id: 'twitter',
      title: 'Follow us on Twitter',
      description: 'Follow @HyperMoonToken for updates and announcements.',
      points: 50,
      completed: authState.user?.completedTasks.includes('twitter') || false
    },
    {
      id: 'email',
      title: 'Register for Airdrop',
      description: 'Submit your email and wallet address to qualify.',
      points: 100,
      completed: authState.user?.completedTasks.includes('email') || false
    },
    {
      id: 'share',
      title: 'Share about HyperMoon',
      description: 'Share a post about HyperMoon to get extra entries.',
      points: 100,
      completed: authState.user?.completedTasks.includes('share') || false
    }
  ];

  // For task list UI
  const renderTaskList = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const progressPercentage = (completedTasks / tasks.length) * 100;

    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white">Your Progress</h3>
            <span className="text-cosmic-purple font-medium">
              {completedTasks} of {tasks.length} completed
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          
          {/* Rocket animation when progress changes */}
          {completedTasks > 0 && (
            <motion.div 
              className="relative h-10"
              initial={{ x: `${(progressPercentage - (100/tasks.length))}%`, y: 20, opacity: 0 }}
              animate={{ x: `${progressPercentage}%`, y: -10, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-2xl absolute top-0">🚀</span>
            </motion.div>
          )}
        </div>

        <div className="space-y-4">
          {tasks.map(task => (
            <div 
              key={task.id}
              className={`p-6 rounded-lg border transition-all duration-300 ${
                task.completed 
                  ? 'border-cosmic-purple bg-cosmic-deep-purple/20' 
                  : 'border-gray-700 bg-cosmic-dark/50'
              }`}
            >
              <div className="flex items-start">
                <div 
                  className={`w-6 h-6 rounded-full border flex items-center justify-center cursor-pointer mr-4 flex-shrink-0 transition-colors ${
                    task.completed 
                      ? 'bg-cosmic-purple border-cosmic-purple' 
                      : 'border-gray-500'
                  }`}
                  onClick={() => completeTask(task.id)}
                >
                  {task.completed && <Check className="h-4 w-4 text-white" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-white">{task.title}</h4>
                    <span className="text-cosmic-purple font-medium">{task.points} pts</span>
                  </div>
                  <p className="text-gray-400">{task.description}</p>
                  
                  {task.id === 'telegram' && (
                    <a 
                      href="#" 
                      className="mt-3 inline-flex items-center text-cosmic-purple hover:text-cosmic-pink transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        completeTask(task.id);
                      }}
                    >
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.2803 6.6995C17.9292 6.02902 16.4758 5.5382 14.9472 5.24904C14.9284 5.24549 14.9095 5.25433 14.9002 5.27201C14.7144 5.6152 14.5054 6.06111 14.3577 6.41453C12.7152 6.14584 11.0834 6.14584 9.48091 6.41453C9.33322 6.05391 9.1166 5.6152 8.92955 5.27201C8.92024 5.25509 8.90138 5.24625 8.88252 5.24904C7.35467 5.5382 5.90127 6.02902 4.54942 6.6995C4.5416 6.70178 4.53483 6.70651 4.53014 6.71295C1.68294 11.0588 0.832656 15.2957 1.25722 19.4709C1.25936 19.4865 1.26969 19.5012 1.28352 19.51C3.0914 20.8283 4.83859 21.6486 6.55514 22.1908C6.574 22.1966 6.59398 22.19 6.60565 22.1743C7.0233 21.6037 7.39414 21.0034 7.706 20.3735C7.71879 20.3456 7.70454 20.3128 7.67583 20.3015C7.05676 20.0635 6.4661 19.7752 5.90064 19.4473C5.86874 19.4291 5.86587 19.3832 5.89458 19.3613C6.00204 19.2815 6.10951 19.1978 6.21268 19.1131C6.2254 19.1027 6.24282 19.0999 6.25807 19.1076C9.97854 20.8237 13.9979 20.8237 17.6765 19.1076C17.6918 19.0989 17.7092 19.1018 17.7227 19.1122C17.8259 19.1978 17.9334 19.2815 18.0416 19.3613C18.0703 19.3832 18.0683 19.4291 18.0364 19.4473C17.471 19.7803 16.8803 20.0635 16.2604 20.3006C16.2317 20.3119 16.2183 20.3456 16.2311 20.3735C16.5482 21.0025 16.9191 21.6027 17.3306 22.1734C17.3414 22.19 17.3622 22.1966 17.3811 22.1908C19.1068 21.6486 20.854 20.8283 22.6619 19.51C22.6766 19.5012 22.6861 19.4874 22.6882 19.4718C23.1939 14.6226 21.8644 10.4219 19.3137 6.71379C19.3099 6.70651 19.3031 6.70178 19.2953 6.6995H19.2803ZM8.18638 16.5553C7.13763 16.5553 6.26959 15.5798 6.26959 14.389C6.26959 13.1981 7.11877 12.2226 8.18638 12.2226C9.26398 12.2226 10.1232 13.2077 10.1031 14.389C10.1031 15.5798 9.2548 16.5553 8.18638 16.5553ZM15.8599 16.5553C14.8111 16.5553 13.9431 15.5798 13.9431 14.389C13.9431 13.1981 14.7923 12.2226 15.8599 12.2226C16.9375 12.2226 17.7967 13.2077 17.7766 14.389C17.7766 15.5798 16.9383 16.5553 15.8599 16.5553Z" fill="currentColor"/>
                      </svg>
                      Join Discord
                    </a>
                  )}
                  
                  {task.id === 'twitter' && (
                    <a 
                      href="#" 
                      className="mt-3 inline-flex items-center text-cosmic-purple hover:text-cosmic-pink transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        completeTask(task.id);
                      }}
                    >
                      <Twitter className="h-5 w-5 mr-2" />
                      Follow on Twitter
                    </a>
                  )}
                  
                  {task.id === 'email' && (
                    <a 
                      href="#" 
                      className="mt-3 inline-flex items-center text-cosmic-purple hover:text-cosmic-pink transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        completeTask(task.id);
                      }}
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Register Now
                    </a>
                  )}
                  
                  {task.id === 'share' && (
                    <a 
                      href="#" 
                      className="mt-3 inline-flex items-center text-cosmic-purple hover:text-cosmic-pink transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        completeTask(task.id);
                      }}
                    >
                      <Twitter className="h-5 w-5 mr-2" />
                      Share on Twitter
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div className="min-h-screen bg-cosmic-dark text-white">
      <NavBar />
      
      <section className="pt-32 pb-20 bg-gradient-to-b from-black to-cosmic-dark relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white font-orbitron">
              Your Cosmic Mission Awaits
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Welcome to your personalized HyperMoon dashboard. Complete tasks, track your progress, and earn rewards.
            </p>
          </div>
          
          {authState.user && (
            <>
              <UserStats />
              <ReferralPanel />
              <DailyStreak />
              {renderTaskList()}
            </>
          )}
          
          <div className="mt-10 text-center">
            <GlowButton 
              size="lg" 
              className="px-8 py-6 text-lg"
              onClick={() => navigate('/')}
            >
              Back to Home
            </GlowButton>
          </div>
        </div>
      </section>
      
      <FooterSection />
      <SpaceAudioPlayer />
    </div>
  );
};

export default Airdrop;
