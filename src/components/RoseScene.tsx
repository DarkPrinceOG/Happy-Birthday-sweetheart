import React, { useState, useEffect } from 'react';
import { RoseIllustration } from './RoseIllustration.tsx';
import type { LetterPayload } from '../types.ts';

interface RoseSceneProps {
  giftData: LetterPayload['roseExperience'];
}

export const RoseScene: React.FC<RoseSceneProps> = ({ giftData }) => {
  // Step orchestrator:
  // 0: cinematic dark screen
  // 1: rose emerging & blooming
  // 2: rose text 1 ("And, of course, a rose for the birthday girl. 🌹")
  // 3: rose text 2 ("A fresh rose for a beautiful girl, from my side." & "I hope it makes you smile...")
  // 4: final wish header ("Happy birthday, Ananya. ❤️")
  // 5: final wish body ("I hope life gives you beautiful reasons...")
  // 6: "With all my heart,"
  // 7: signature handwritten reveal "~ Aryan / Unknown"
  const [step, setStep] = useState(0);

  useEffect(() => {
    // 1. Cinematic dark pause for ~1.2s, then rose emerges and blooms
    const t1 = setTimeout(() => setStep(1), 1200);

    // 2. Rose messages appear after bloom completes (~4.5s)
    const t2 = setTimeout(() => setStep(2), 4800);

    // 3. Next message in rose sequence
    const t3 = setTimeout(() => setStep(3), 7200);

    // 4. Final birthday wish begins
    const t4 = setTimeout(() => setStep(4), 10000);

    // 5. Final wish body paragraphs
    const t5 = setTimeout(() => setStep(5), 12500);

    // 6. Sign-off greeting
    const t6 = setTimeout(() => setStep(6), 15000);

    // 7. Signature reveal last
    const t7 = setTimeout(() => setStep(7), 16800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#080509] text-[#FFF5EB] relative flex flex-col items-center justify-start overflow-y-auto px-4 py-12 md:py-16 selection:bg-[#BE123C] selection:text-white">
      {/* Soft atmospheric background vignette */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(ellipse at 50% 35%, rgba(136, 19, 55, 0.22) 0%, rgba(8, 5, 9, 0.98) 75%)'
        }}
      />

      {/* Few Gentle Glowing Fireflies floating around the rose */}
      {step >= 1 && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
          {/* Firefly 1 */}
          <div
            className="firefly-1 absolute w-2 h-2 rounded-full bg-[#FEF08A] shadow-[0_0_12px_#FEF08A,0_0_24px_#F59E0B]"
            style={{ top: '24%', left: '42%' }}
          />
          {/* Firefly 2 */}
          <div
            className="firefly-2 absolute w-1.5 h-1.5 rounded-full bg-[#FDE047] shadow-[0_0_10px_#FDE047,0_0_20px_#F43F5E]"
            style={{ top: '30%', right: '38%' }}
          />
          {/* Firefly 3 */}
          <div
            className="firefly-3 absolute w-2.5 h-2.5 rounded-full bg-[#FFFBEB] shadow-[0_0_14px_#FEF08A,0_0_28px_#E11D48]"
            style={{ top: '40%', left: '36%' }}
          />
          {/* Firefly 4 */}
          <div
            className="firefly-1 absolute w-1.5 h-1.5 rounded-full bg-[#FEF08A] shadow-[0_0_10px_#FEF08A]"
            style={{ top: '48%', right: '35%' }}
          />
          {/* Firefly 5 */}
          <div
            className="firefly-2 absolute w-2 h-2 rounded-full bg-[#FBCFE8] shadow-[0_0_12px_#FDA4AF]"
            style={{ top: '18%', right: '46%' }}
          />
          {/* Firefly 6 */}
          <div
            className="firefly-3 absolute w-1.5 h-1.5 rounded-full bg-[#FEF08A] shadow-[0_0_10px_#FEF08A]"
            style={{ top: '35%', left: '48%' }}
          />
        </div>
      )}

      {/* Main Experience Container */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center text-center my-auto">
        {/* Blooming Rose Illustration */}
        <div className={`transition-all duration-1000 ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <RoseIllustration bloomProgress={step >= 1} />
        </div>

        {/* Gradual Rose Reveal Text (Experience 4) */}
        <div className="space-y-4 max-w-md mx-auto mt-4 mb-10 min-h-[100px] flex flex-col items-center justify-center">
          {step >= 2 && (
            <p className="font-serif-letter italic text-xl md:text-2xl text-[#FFE4E6] tracking-wide animate-fade-in transition-opacity duration-1000">
              {giftData.messages[0]}
            </p>
          )}

          {step >= 3 && (
            <div className="space-y-2 text-[#E7D7D0] font-serif-letter text-base md:text-lg animate-fade-in transition-opacity duration-1000">
              <p>{giftData.messages[1]}</p>
              <p className="text-[#CDBAB0] italic">{giftData.messages[2]}</p>
            </div>
          )}
        </div>

        {/* Final Birthday Wish (Experience 5) */}
        {step >= 4 && (
          <div className="w-full pt-6 border-t border-[#38232B]/80 max-w-lg mx-auto animate-fade-in transition-all duration-1000">
            {/* Header Wish */}
            <h2 className="font-serif-letter text-2xl md:text-3xl font-semibold text-[#FFF0F2] mb-6 tracking-tight">
              {giftData.finalWishes[0]}
            </h2>

            {/* Core Messages */}
            {step >= 5 && (
              <div className="space-y-4 font-serif-letter text-[#E3D3CB] text-base md:text-lg leading-relaxed animate-fade-in">
                <p>{giftData.finalWishes[1]}</p>
                <p>{giftData.finalWishes[2]}</p>
              </div>
            )}

            {/* Closing Salutation */}
            {step >= 6 && (
              <p className="mt-8 font-serif-letter italic text-[#C9B3A7] text-lg animate-fade-in">
                {giftData.finalWishes[3]}
              </p>
            )}

            {/* The Handwritten Signature (Last to appear) */}
            {step >= 7 && (
              <div className="mt-4 pb-6 flex justify-center">
                <span className="font-signature text-3xl md:text-4xl text-[#FDA4AF] tracking-wider animate-handwritten drop-shadow-[0_0_12px_rgba(253,164,175,0.4)]">
                  {giftData.signature}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
