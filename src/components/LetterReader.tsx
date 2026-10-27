import React, { useRef } from 'react';
import { FloralBorder } from './FloralBorder.tsx';
import type { LetterPayload } from '../types.ts';

interface LetterReaderProps {
  letterData: LetterPayload;
  onOpenGift: () => void;
  isFadingOut?: boolean;
}

export const LetterReader: React.FC<LetterReaderProps> = ({
  letterData,
  onOpenGift,
  isFadingOut = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`min-h-screen w-full bg-[#FAF7F2] py-8 sm:py-12 md:py-16 px-3 sm:px-6 flex justify-center items-start transition-opacity duration-1000 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient light */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(254, 226, 226, 0.5) 0%, rgba(250, 247, 242, 0.95) 75%)'
        }}
      />

      {/* Parchment Paper Container */}
      <main
        ref={containerRef}
        role="article"
        aria-label="Birthday letter for Ananya"
        className="relative z-10 w-full max-w-2xl md:max-w-3xl paper-texture rounded-2xl shadow-[0_20px_50px_rgba(45,30,22,0.07),0_1px_4px_rgba(45,30,22,0.04)] border border-[#ECE0D3] my-auto"
      >
        {/* Floral Decorative Frame */}
        <FloralBorder />

        {/* Letter Text Content Area */}
        <div className="relative z-10 px-7 sm:px-14 md:px-20 py-12 sm:py-16 md:py-20">
          {/* Header Date & Small Tag */}
          <div className="flex items-center justify-between border-b border-[#EADFD4] pb-5 mb-8 text-xs font-ui text-[#8E7E74] tracking-widest uppercase">
            <span>Special Delivery</span>
            <span>October · With Care</span>
          </div>

          {/* Letter Greeting */}
          <h1 className="font-serif-letter text-2xl sm:text-3xl text-[#1E1917] font-semibold tracking-tight mb-8">
            {letterData.greeting}
          </h1>

          {/* Exact Letter Paragraphs */}
          <div className="font-serif-letter text-[#2D2420] text-lg sm:text-[19px] leading-[1.85] space-y-6 selection:bg-[#FCE7F3] selection:text-[#831843]">
            {letterData.paragraphs.map((para, index) => (
              <p 
                key={index} 
                className={`${index === 0 ? 'text-xl sm:text-[21px] text-[#1F1815] font-medium' : ''}`}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Divider between letter text and Gift Button */}
          <div className="my-12 flex items-center justify-center gap-4">
            <div className="h-px bg-gradient-to-r from-transparent via-[#E2D4C5] to-transparent w-24 sm:w-36" />
            <span className="text-[#9F1239] text-sm">❦</span>
            <div className="h-px bg-gradient-to-r from-transparent via-[#E2D4C5] to-transparent w-24 sm:w-36" />
          </div>

          {/* Gift CTA Button */}
          <div className="flex flex-col items-center justify-center pt-2">
            <button
              onClick={onOpenGift}
              className="group relative px-8 py-3.5 rounded-full bg-[#8B263E] hover:bg-[#731D31] text-[#FFF8F0] font-ui text-xs sm:text-sm tracking-[0.16em] uppercase font-medium shadow-[0_4px_20px_rgba(139,38,62,0.22)] hover:shadow-[0_6px_28px_rgba(139,38,62,0.32)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#8B263E]/40"
            >
              <span>{letterData.giftButtonLabel}</span>
            </button>
            <p className="font-serif-letter italic text-[#998980] text-sm mt-3">
              A quiet surprise awaits you
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
