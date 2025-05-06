
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Share, Check, Copy, Twitter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ReferralPanel: React.FC = () => {
  const { authState } = useAuth();
  const { toast } = useToast();
  const user = authState.user as User;
  const [copied, setCopied] = useState(false);
  
  if (!user) return null;
  
  const referralLink = `https://hypermoon.io/?ref=${user.referralCode}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Join me on HyperMoon - the future of cosmic community. Use my referral code to get started: ${user.referralCode}`);
    const url = encodeURIComponent(referralLink);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };
  
  return (
    <Card className="bg-cosmic-dark/60 border-cosmic-purple/20 mb-6">
      <CardHeader>
        <CardTitle className="text-cosmic-purple flex items-center">
          <Share className="h-5 w-5 mr-2" />
          Refer & Earn
        </CardTitle>
        <CardDescription className="text-gray-400">
          Earn 100 points for each friend that joins using your link
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm text-gray-300 mb-2 block">Your referral code</label>
          <div className="font-mono text-lg text-white bg-cosmic-deep-purple/20 p-3 rounded-md border border-cosmic-purple/30">
            {user.referralCode}
          </div>
        </div>
        
        <div>
          <label className="text-sm text-gray-300 mb-2 block">Your referral link</label>
          <div className="flex">
            <Input 
              value={referralLink}
              readOnly
              className="bg-cosmic-deep-purple/20 border-cosmic-purple/30 text-white"
            />
            <Button 
              variant="outline" 
              size="icon" 
              className="ml-2 border-cosmic-purple/30 hover:bg-cosmic-purple/20"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-cosmic-purple" />}
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center pt-2">
          <Button 
            className="bg-cosmic-purple hover:bg-cosmic-pink text-white px-6 py-2"
            onClick={shareOnTwitter}
          >
            <Twitter className="h-4 w-4 mr-2" />
            Share on Twitter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralPanel;
