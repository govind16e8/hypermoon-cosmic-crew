
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckSquare, Twitter, Users, Link, Star } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: React.ReactNode;
}

const TaskTracker: React.FC = () => {
  const { authState, completeTask } = useAuth();
  const user = authState.user as User;
  
  if (!user) return null;
  
  const tasks: Task[] = [
    {
      id: 'telegram',
      title: 'Join our Discord/Telegram',
      description: 'Connect with the community and stay updated.',
      points: 50,
      icon: <Users className="h-5 w-5 text-cosmic-purple" />
    },
    {
      id: 'twitter',
      title: 'Follow on Twitter',
      description: 'Follow @HyperMoonToken for announcements.',
      points: 50,
      icon: <Twitter className="h-5 w-5 text-cosmic-purple" />
    },
    {
      id: 'email',
      title: 'Register for Airdrop',
      description: 'Submit your email and wallet address.',
      points: 100,
      icon: <Star className="h-5 w-5 text-cosmic-purple" />
    },
    {
      id: 'share',
      title: 'Share about HyperMoon',
      description: 'Share a post about HyperMoon for extra entries.',
      points: 100,
      icon: <Link className="h-5 w-5 text-cosmic-purple" />
    }
  ];
  
  const completedTasksCount = tasks.filter(task => user.completedTasks.includes(task.id)).length;
  const progressPercentage = (completedTasksCount / tasks.length) * 100;
  
  return (
    <Card className="bg-cosmic-dark/60 border-cosmic-purple/20">
      <CardHeader>
        <CardTitle className="text-cosmic-purple flex items-center">
          <CheckSquare className="h-5 w-5 mr-2" />
          Task Tracker
        </CardTitle>
        <CardDescription className="text-gray-400">
          Complete tasks to maximize your airdrop allocation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Progress</span>
            <span className="text-sm font-medium text-cosmic-purple">
              {completedTasksCount}/{tasks.length} tasks
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          
          {/* Rocket animation when progress changes */}
          {completedTasksCount > 0 && (
            <div className="relative h-6">
              <div
                className="text-lg absolute transition-all duration-500"
                style={{ left: `${progressPercentage}%`, transform: 'translateX(-50%)' }}
              >
                🚀
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          {tasks.map(task => {
            const isCompleted = user.completedTasks.includes(task.id);
            
            return (
              <div 
                key={task.id}
                className={`p-4 rounded-lg border flex items-start transition-all duration-300 ${
                  isCompleted 
                    ? 'border-cosmic-purple bg-cosmic-deep-purple/20' 
                    : 'border-gray-700 bg-cosmic-dark/50'
                }`}
              >
                <div 
                  className={`w-6 h-6 rounded-full border flex items-center justify-center cursor-pointer mr-4 flex-shrink-0 transition-colors ${
                    isCompleted 
                      ? 'bg-cosmic-purple border-cosmic-purple' 
                      : 'border-gray-500'
                  }`}
                  onClick={() => completeTask(task.id)}
                >
                  {isCompleted && <CheckSquare className="h-4 w-4 text-white" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {task.icon}
                      <h4 className="text-base font-medium text-white ml-2">{task.title}</h4>
                    </div>
                    <span className="text-sm text-cosmic-purple font-medium">{task.points} pts</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskTracker;
