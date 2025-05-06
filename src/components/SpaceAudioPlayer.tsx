
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Volume1, Volume } from 'lucide-react';

const SpaceAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // Default volume
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeControlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/space-ambient.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume; // Start with lower volume
    
    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // Update audio volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Close volume control when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeControlRef.current && !volumeControlRef.current.contains(event.target as Node)) {
        setShowVolumeControl(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-5 w-5" />;
    if (volume < 0.3) return <Volume className="h-5 w-5" />;
    if (volume < 0.7) return <Volume1 className="h-5 w-5" />;
    return <Volume2 className="h-5 w-5" />;
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <div className="relative">
        <button 
          onClick={toggleAudio}
          onMouseEnter={() => setShowVolumeControl(true)}
          className="bg-cosmic-dark/70 backdrop-blur-md p-3 rounded-full border border-cosmic-purple/30 hover:border-cosmic-purple transition-all duration-300 text-white shadow-lg hover:shadow-cosmic-purple/20"
          aria-label={isPlaying ? "Mute space ambient sound" : "Play space ambient sound"}
        >
          {isPlaying ? (
            <span className={`${volume === 0 ? 'text-gray-400' : 'text-cosmic-purple'}`}>
              {getVolumeIcon()}
            </span>
          ) : (
            <VolumeX className="h-5 w-5 text-gray-400" />
          )}
        </button>

        {/* Volume Control Panel */}
        {showVolumeControl && (
          <div 
            ref={volumeControlRef}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 p-3 bg-cosmic-dark/90 backdrop-blur-md rounded-lg border border-cosmic-purple/30 shadow-lg w-48"
          >
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setVolume(0)} 
                className="text-gray-400 hover:text-cosmic-purple"
              >
                <VolumeX className="h-4 w-4" />
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-cosmic-dark rounded-lg appearance-none cursor-pointer accent-cosmic-purple"
              />
              <button 
                onClick={() => setVolume(1)} 
                className="text-gray-400 hover:text-cosmic-purple"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Visual indicator that sound is playing */}
        {isPlaying && volume > 0 && (
          <div className="absolute inset-0 rounded-full border border-cosmic-purple/50 animate-pulse pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};

export default SpaceAudioPlayer;
