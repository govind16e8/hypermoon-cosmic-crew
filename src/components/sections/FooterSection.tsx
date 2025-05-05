
import React from 'react';
import { Link } from 'lucide-react';

const FooterSection: React.FC = () => {
  return (
    <footer className="py-10 bg-black text-gray-400 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-orbitron text-cosmic-purple mb-2">HyperMoon</h3>
            <p className="text-sm">The cosmic meme token</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            <a href="#" className="text-sm hover:text-cosmic-purple transition-colors">Terms of Service</a>
            <a href="#" className="text-sm hover:text-cosmic-purple transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-cosmic-purple transition-colors">
              <span className="flex items-center">
                <Link className="h-4 w-4 mr-1" />
                Whitepaper
              </span>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">&copy; 2025 HyperMoon Project. All rights reserved.</p>
          <p className="text-xs mt-2 text-gray-600">
            This website is for entertainment purposes only. 
            HyperMoon is a meme token with no intrinsic value or financial return expectation.
          </p>
        </div>
      </div>
      
      {/* Animated stars in footer */}
      <div className="star absolute h-2 w-2 top-1/4 left-1/4 animate-stars"></div>
      <div className="star absolute h-1 w-1 top-1/2 left-1/3 animate-stars" style={{ animationDelay: '0.7s' }}></div>
      <div className="star absolute h-2 w-2 top-1/3 left-2/3 animate-stars" style={{ animationDelay: '1.3s' }}></div>
      <div className="star absolute h-1 w-1 top-2/3 left-1/4 animate-stars" style={{ animationDelay: '1.8s' }}></div>
    </footer>
  );
};

export default FooterSection;
