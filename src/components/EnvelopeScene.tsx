import React, { useState } from 'react';

interface EnvelopeSceneProps {
  onOpened: () => void;
}

export const EnvelopeScene: React.FC<EnvelopeSceneProps> = ({ onOpened }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Coordinate the sequence:
    // 0ms: top flap begins opening rotateX(180deg)
    // 400ms: letter paper begins sliding upward
    // 1200ms: transition into full letter reader
    setTimeout(() => {
      onOpened();
    }, 1250);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAF7F2] px-4 py-8 select-none transition-all duration-700">
      {/* Soft ambient warm glow behind the envelope */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(254, 226, 226, 0.4) 0%, rgba(250, 247, 242, 0.98) 65%)'
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Subtitle / context above */}
        <p className="font-serif-letter italic text-[#877870] text-sm md:text-base tracking-widest uppercase mb-6 opacity-80">
          A personal delivery for Ananya
        </p>

        {/* Envelope Container with 3D perspective and gentle hover lift */}
        <div
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpen();
            }
          }}
          aria-label="Open the letter"
          className={`relative w-[340px] sm:w-[400px] md:w-[440px] h-[220px] sm:h-[250px] md:h-[270px] cursor-pointer transition-transform duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-[#9F1239]/40 rounded-2xl ${
            isOpening ? 'scale-105' : 'hover:-translate-y-2'
          }`}
          style={{ perspective: '1200px' }}
        >
          {/* Ground shadow beneath the envelope */}
          <div 
            className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-6 bg-[#362721]/10 rounded-full blur-md transition-all duration-500 ${
              isOpening ? 'scale-110 opacity-40' : 'opacity-60'
            }`}
          />

          {/* Envelope Main Shell */}
          <div className="relative w-full h-full rounded-xl bg-[#F5EFE6] shadow-[0_12px_32px_rgba(40,25,20,0.08),0_2px_6px_rgba(40,25,20,0.04)] overflow-visible border border-[#E9DFD3]">
            {/* Back interior of the envelope (shows when flap opens) */}
            <div className="absolute inset-0 bg-[#EFE7DC] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#DFD5C8]/40 to-transparent" />
            </div>

            {/* Letter Paper inside the envelope that slides upward */}
            <div
              className="absolute left-6 right-6 top-4 bottom-4 bg-[#FCFAF6] rounded-lg shadow-sm border border-[#E8DACB] p-4 transition-all duration-800 ease-in-out flex flex-col items-center justify-start overflow-hidden pointer-events-none"
              style={{
                transform: isOpening ? 'translateY(-130px)' : 'translateY(0)',
                opacity: isOpening ? 1 : 0.85,
                zIndex: isOpening ? 25 : 5,
              }}
            >
              {/* Decorative peek lines on paper */}
              <div className="w-16 h-0.5 bg-[#9F1239]/40 rounded-full mb-3" />
              <div className="w-40 h-2 bg-[#EADFD4] rounded mb-2" />
              <div className="w-32 h-2 bg-[#EADFD4] rounded mb-2" />
              <div className="w-44 h-2 bg-[#EADFD4] rounded mb-3" />
              <p className="font-serif-letter italic text-[#9F1239] text-xs">
                Hey, birthday girl...
              </p>
            </div>

            {/* Envelope Pocket Front (Triangular folds) - sits in front of tucked paper */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-xl">
              {/* Left triangle fold */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(0 0, 0 100%, 50% 52%)',
                  backgroundColor: '#FFFFFF',
                  boxShadow: 'inset 0 0 12px rgba(40,25,20,0.04)',
                }}
              />
              {/* Right triangle fold */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(100% 0, 100% 100%, 50% 52%)',
                  backgroundColor: '#FAF8F5',
                  boxShadow: 'inset 0 0 12px rgba(40,25,20,0.04)',
                }}
              />
              {/* Bottom triangle fold */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(0 100%, 100% 100%, 50% 48%)',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 -2px 10px rgba(40,25,20,0.03)',
                  borderBottom: '1px solid #E9DFD3',
                }}
              />
            </div>

            {/* Envelope Top Flap (Triangular flap that flips open 180 degrees upward) */}
            <div
              className="absolute top-0 left-0 right-0 h-1/2 z-20 origin-top transition-transform duration-700 ease-in-out pointer-events-none"
              style={{
                transformStyle: 'preserve-3d',
                transform: isOpening ? 'rotateX(180deg)' : 'rotateX(0deg)',
              }}
            >
              {/* Flap Outer Surface (visible when closed) */}
              <div
                className="absolute inset-0 rounded-t-xl"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(40,25,20,0.08)',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Subtle fold border */}
                <svg className="w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="0" y1="0" x2="50" y2="100" stroke="#E9DFD3" strokeWidth="1" />
                  <line x1="100" y1="0" x2="50" y2="100" stroke="#E9DFD3" strokeWidth="1" />
                </svg>
              </div>

              {/* Flap Inner Surface (visible when flipped open) */}
              <div
                className="absolute inset-0 rounded-t-xl"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  backgroundColor: '#F5EFE6',
                  transform: 'rotateX(180deg)',
                  backfaceVisibility: 'hidden',
                }}
              />

              {/* Tiny Muted-Red Heart Wax Seal at the point of the flap */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-8 h-8 rounded-full bg-[#9F1239] shadow-[0_2px_8px_rgba(159,18,57,0.35)] flex items-center justify-center transition-transform duration-300 ${
                  isOpening ? 'opacity-80 scale-90' : 'hover:scale-110'
                }`}
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Tiny Heart */}
                <svg
                  className="w-4 h-4 fill-[#FFE4E6] text-[#FFE4E6]"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal text / button beneath the envelope */}
        <button
          onClick={handleOpen}
          disabled={isOpening}
          className="mt-10 px-6 py-2.5 rounded-full text-[#7B243B] hover:text-[#5F192C] hover:bg-[#9F1239]/5 active:scale-98 font-ui text-sm tracking-wider font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#9F1239]/30"
        >
          <span>Open the letter</span>
          <span className="text-base">💌</span>
        </button>
      </div>
    </div>
  );
};
