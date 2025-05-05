
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/types/user';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, Award } from 'lucide-react';

const UserStats: React.FC = () => {
  const { authState } = useAuth();
  const user = authState.user as User;
  
  if (!user) return null;
  
  const getStreakMultiplier = () => {
    const baseMultiplier = 1;
    const bonusMultiplier = Math.floor(user.streakCount / 5) * 0.25; // +0.25 for every 5 days
    return (baseMultiplier + bonusMultiplier).toFixed(2);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="bg-cosmic-dark/60 border-cosmic-purple/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-cosmic-purple flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Points
          </CardTitle>
          <CardDescription className="text-gray-400">
            Earn more by completing tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white">{user.points}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-cosmic-dark/60 border-cosmic-purple/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-cosmic-purple flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Daily Streak
          </CardTitle>
          <CardDescription className="text-gray-400">
            Current multiplier: {getStreakMultiplier()}x
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white">{user.streakCount} days</div>
          <div className="mt-2 text-sm text-gray-400">
            Next bonus at {Math.ceil(user.streakCount / 5) * 5} days
          </div>
          <Progress 
            value={(user.streakCount % 5) * 20} 
            className="h-2 mt-2" 
          />
        </CardContent>
      </Card>
      
      <Card className="bg-cosmic-dark/60 border-cosmic-purple/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-cosmic-purple flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Referrals
          </CardTitle>
          <CardDescription className="text-gray-400">
            Invite friends to earn more
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white">{user.referralCount}</div>
          <div className="text-sm text-gray-400 mt-2">
            Earned: <span className="text-cosmic-purple">{user.referralCount * 100} points</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStats;
