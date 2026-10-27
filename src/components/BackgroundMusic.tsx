import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface BackgroundMusicProps {
  shouldPlay: boolean;
  isDarkScene?: boolean;
}

const AUDIO_SRC = '/assets/aistudio/Golden_Brown__Fantasy_Version__368baf1c.m4a';
const TARGET_VOLUME = 0.5; // ~50% volume as requested

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  shouldPlay,
  isDarkScene = false,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Initialize audio element once
    if (!audioRef.current) {
      const audio = new Audio(AUDIO_SRC);
      audio.loop = true;
      audio.volume = TARGET_VOLUME;
      audioRef.current = audio;

      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
      audio.addEventListener('ended', () => {
        // loop backup
        audio.currentTime = 0;
        audio.play().catch(() => {});
      });
    }

    const audio = audioRef.current;

    if (shouldPlay && audio) {
      // Set to 50% volume
      audio.volume = TARGET_VOLUME;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log('Audio autoplay prevented, awaiting user gesture:', error);
            setIsPlaying(false);
          });
      }
    }

    return () => {
      // Do not destroy on unmount of subcomponents, but keep in sync
    };
  }, [shouldPlay]);

  // Handle fallback click anywhere on document to start playback if browser blocked initial autoplay
  useEffect(() => {
    if (!shouldPlay || isPlaying || hasInteracted) return;

    const resumeAudioOnGesture = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.volume = TARGET_VOLUME;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {});
      }
    };

    window.addEventListener('click', resumeAudioOnGesture, { once: true });
    window.addEventListener('keydown', resumeAudioOnGesture, { once: true });

    return () => {
      window.removeEventListener('click', resumeAudioOnGesture);
      window.removeEventListener('keydown', resumeAudioOnGesture);
    };
  }, [shouldPlay, isPlaying, hasInteracted]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.volume = TARGET_VOLUME;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {});
    } else {
      if (isMuted) {
        audioRef.current.muted = false;
        audioRef.current.volume = TARGET_VOLUME;
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  if (!shouldPlay) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 transition-all duration-700">
      <button
        onClick={toggleMute}
        type="button"
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music (50% volume)'}
        title={isMuted ? 'Sound muted (click to play)' : 'Golden Brown (Fantasy) · 50% volume'}
        className={`group flex items-center gap-2.5 px-3 py-2 rounded-full backdrop-blur-md transition-all duration-300 outline-none focus-visible:ring-2 cursor-pointer ${
          isDarkScene
            ? 'bg-[#150F18]/80 hover:bg-[#1E1424] border border-[#3E2433] text-[#FDA4AF] focus-visible:ring-[#FDA4AF]/40 shadow-[0_4px_16px_rgba(0,0,0,0.4)]'
            : 'bg-white/85 hover:bg-white border border-[#E8DACB] text-[#8B263E] focus-visible:ring-[#8B263E]/30 shadow-[0_2px_12px_rgba(60,40,30,0.06)]'
        }`}
      >
        {/* Animated Sound Equalizer / Icon */}
        <div className="relative flex items-center justify-center w-5 h-5">
          {isMuted || !isPlaying ? (
            <VolumeX className="w-4 h-4 opacity-70" />
          ) : (
            <div className="flex items-center gap-0.5">
              <span className="w-0.5 h-3 bg-current rounded-full animate-pulse" style={{ animationDuration: '0.8s' }} />
              <span className="w-0.5 h-4 bg-current rounded-full animate-pulse" style={{ animationDuration: '0.5s' }} />
              <span className="w-0.5 h-2 bg-current rounded-full animate-pulse" style={{ animationDuration: '0.9s' }} />
            </div>
          )}
        </div>

        {/* Minimal Audio Label */}
        <span className="text-xs font-ui font-medium tracking-wide hidden sm:inline-block">
          {isMuted || !isPlaying ? 'Music paused' : '50%'}
        </span>

        <Music className="w-3.5 h-3.5 opacity-60 group-hover:rotate-12 transition-transform duration-300" />
      </button>
    </div>
  );
};
