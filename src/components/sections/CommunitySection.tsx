
import React from 'react';
import GlowButton from '@/components/GlowButton';
import { Star, Twitter, Mail } from 'lucide-react';

const CommunitySection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-cosmic-dark to-black relative">
      <div className="container mx-auto px-4 text-center">
        <Star className="inline-block text-cosmic-purple h-12 w-12 mb-6 animate-pulse" />
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white font-orbitron">
          Join the Moon Crew!
        </h2>
        
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Become a part of the HyperMoon revolution. Stay updated on airdrops, events, and more.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <a 
            href="#" 
            className="flex items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-cosmic-purple rounded-lg transition-all duration-300 group"
          >
            <Twitter className="h-8 w-8 text-cosmic-purple group-hover:text-white transition-colors duration-300" />
            <span className="ml-3 text-lg font-medium text-white">Twitter</span>
          </a>
          
          <a 
            href="#" 
            className="flex items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-cosmic-purple rounded-lg transition-all duration-300 group"
          >
            <svg className="h-8 w-8 text-cosmic-purple group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.2803 6.6995C17.9292 6.02902 16.4758 5.5382 14.9472 5.24904C14.9284 5.24549 14.9095 5.25433 14.9002 5.27201C14.7144 5.6152 14.5054 6.06111 14.3577 6.41453C12.7152 6.14584 11.0834 6.14584 9.48091 6.41453C9.33322 6.05391 9.1166 5.6152 8.92955 5.27201C8.92024 5.25509 8.90138 5.24625 8.88252 5.24904C7.35467 5.5382 5.90127 6.02902 4.54942 6.6995C4.5416 6.70178 4.53483 6.70651 4.53014 6.71295C1.68294 11.0588 0.832656 15.2957 1.25722 19.4709C1.25936 19.4865 1.26969 19.5012 1.28352 19.51C3.0914 20.8283 4.83859 21.6486 6.55514 22.1908C6.574 22.1966 6.59398 22.19 6.60565 22.1743C7.0233 21.6037 7.39414 21.0034 7.706 20.3735C7.71879 20.3456 7.70454 20.3128 7.67583 20.3015C7.05676 20.0635 6.4661 19.7752 5.90064 19.4473C5.86874 19.4291 5.86587 19.3832 5.89458 19.3613C6.00204 19.2815 6.10951 19.1978 6.21268 19.1131C6.2254 19.1027 6.24282 19.0999 6.25807 19.1076C9.97854 20.8237 13.9979 20.8237 17.6765 19.1076C17.6918 19.0989 17.7092 19.1018 17.7227 19.1122C17.8259 19.1978 17.9334 19.2815 18.0416 19.3613C18.0703 19.3832 18.0683 19.4291 18.0364 19.4473C17.471 19.7803 16.8803 20.0635 16.2604 20.3006C16.2317 20.3119 16.2183 20.3456 16.2311 20.3735C16.5482 21.0025 16.9191 21.6027 17.3306 22.1734C17.3414 22.19 17.3622 22.1966 17.3811 22.1908C19.1068 21.6486 20.854 20.8283 22.6619 19.51C22.6766 19.5012 22.6861 19.4874 22.6882 19.4718C23.1939 14.6226 21.8644 10.4219 19.3137 6.71379C19.3099 6.70651 19.3031 6.70178 19.2953 6.6995H19.2803ZM8.18638 16.5553C7.13763 16.5553 6.26959 15.5798 6.26959 14.389C6.26959 13.1981 7.11877 12.2226 8.18638 12.2226C9.26398 12.2226 10.1232 13.2077 10.1031 14.389C10.1031 15.5798 9.2548 16.5553 8.18638 16.5553ZM15.8599 16.5553C14.8111 16.5553 13.9431 15.5798 13.9431 14.389C13.9431 13.1981 14.7923 12.2226 15.8599 12.2226C16.9375 12.2226 17.7967 13.2077 17.7766 14.389C17.7766 15.5798 16.9383 16.5553 15.8599 16.5553Z" fill="currentColor"/>
            </svg>
            <span className="ml-3 text-lg font-medium text-white">Discord</span>
          </a>
          
          <a 
            href="#" 
            className="flex items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-cosmic-purple rounded-lg transition-all duration-300 group"
          >
            <Mail className="h-8 w-8 text-cosmic-purple group-hover:text-white transition-colors duration-300" />
            <span className="ml-3 text-lg font-medium text-white">Subscribe</span>
          </a>
        </div>

        {/* Floating stars animation */}
        <div className="relative h-20 overflow-hidden w-full max-w-md mx-auto mb-10">
          <div className="star absolute h-2 w-2 top-1/4 left-1/4 animate-stars"></div>
          <div className="star absolute h-3 w-3 top-1/2 left-1/3 animate-stars" style={{ animationDelay: '0.5s' }}></div>
          <div className="star absolute h-2 w-2 top-1/3 left-2/3 animate-stars" style={{ animationDelay: '1s' }}></div>
          <div className="star absolute h-4 w-4 top-2/3 left-1/2 animate-stars" style={{ animationDelay: '1.5s' }}></div>
          <div className="star absolute h-3 w-3 top-1/2 left-3/4 animate-stars" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
