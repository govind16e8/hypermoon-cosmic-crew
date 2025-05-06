
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const DailyStreak: React.FC = () => {
  const { authState } = useAuth();
  const user = authState.user as User;
  
  if (!user) return null;
  
  // Generate last 7 days
  const generateCalendarDays = () => {
    const days = [];
    const now = new Date();
    const lastStreak = user.lastStreak ? new Date(user.lastStreak) : null;
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Determine if this day is part of the streak
      let status = 'inactive';
      
      if (lastStreak) {
        const dayDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
        
        if (dayDiff < user.streakCount && dayDiff >= 0) {
          status = 'active';
        }
        
        // Today
        if (date.getDate() === now.getDate() && 
            date.getMonth() === now.getMonth() && 
            date.getFullYear() === now.getFullYear()) {
          status = lastStreak.getDate() === now.getDate() ? 'today-active' : 'today-inactive';
        }
      }
      
      days.push({
        date,
        day: date.getDate(),
        status
      });
    }
    
    return days;
  };
  
  const days = generateCalendarDays();
  
  const getDayClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-cosmic-purple/50 border-cosmic-purple';
      case 'today-active':
        return 'bg-cosmic-pink border-cosmic-pink animate-pulse';
      case 'today-inactive':
        return 'bg-cosmic-dark border-cosmic-purple/30 border-dashed';
      default:
        return 'bg-cosmic-dark/30 border-gray-700';
    }
  };
  
  return (
    <Card className="bg-cosmic-dark/60 border-cosmic-purple/20 mb-6">
      <CardHeader>
        <CardTitle className="text-cosmic-purple flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Daily Login Streak
        </CardTitle>
        <CardDescription className="text-gray-400">
          Current streak: {user.streakCount} days
          {user.streakCount >= 5 && ` (${Math.floor(user.streakCount / 5) * 25}% bonus)`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          {days.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-400 mb-1">
                {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div 
                className={`w-10 h-10 rounded-full border flex items-center justify-center ${getDayClass(day.status)}`}
              >
                <span className="text-white">{day.day}</span>
              </div>
              <div className="text-xs mt-1 text-gray-400">
                {day.status.includes('today') ? 'Today' : ''}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-gray-300">
          <p>Log in daily to maintain your streak and earn bonus points:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Basic daily login: 10 points</li>
            <li>5-day streak: 25% bonus (12.5 points/day)</li>
            <li>10-day streak: 50% bonus (15 points/day)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyStreak;
