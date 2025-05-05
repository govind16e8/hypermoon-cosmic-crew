
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SpaceAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/space-ambient.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // Start with lower volume
    
    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Using catch to handle autoplay restrictions in browsers
        audioRef.current.play().catch(e => {
          console.log("Audio autoplay was prevented:", e);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <button 
        onClick={toggleAudio}
        className="bg-cosmic-dark/70 backdrop-blur-md p-3 rounded-full border border-cosmic-purple/30 hover:border-cosmic-purple transition-all duration-300 text-white shadow-lg hover:shadow-cosmic-purple/20"
        aria-label={isPlaying ? "Mute space ambient sound" : "Play space ambient sound"}
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5 text-cosmic-purple" />
        ) : (
          <VolumeX className="h-5 w-5 text-gray-400" />
        )}
      </button>
    </div>
  );
};

export default SpaceAudioPlayer;
