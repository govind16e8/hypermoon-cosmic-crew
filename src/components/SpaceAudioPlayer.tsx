
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SpaceAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create an audio element
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    // Cleanup function to stop and remove audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Play might be rejected if user hasn't interacted with the page yet
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Audio playback was prevented: ', error);
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleAudio}
        className="flex items-center justify-center w-12 h-12 bg-cosmic-dark border border-cosmic-purple rounded-full shadow-lg hover:shadow-cosmic-purple/30 transition-all duration-300"
        aria-label={isPlaying ? 'Mute space audio' : 'Play space audio'}
      >
        {isPlaying ? 
          <Volume2 className="w-5 h-5 text-cosmic-purple" /> : 
          <VolumeX className="w-5 h-5 text-cosmic-purple" />
        }
      </button>
      
      {isPlaying && (
        <div className="absolute -top-10 right-0 bg-cosmic-dark px-3 py-1 rounded text-xs text-cosmic-purple border border-cosmic-purple whitespace-nowrap">
          Space ambience playing
        </div>
      )}
      
      {/* Audio wave animation when playing */}
      {isPlaying && (
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-full border border-cosmic-purple pointer-events-none animate-pulse"></div>
      )}
    </div>
  );
};

export default SpaceAudioPlayer;
