import React, { useState, useEffect } from 'react';
import { PasswordGate } from './components/PasswordGate.tsx';
import { EnvelopeScene } from './components/EnvelopeScene.tsx';
import { LetterReader } from './components/LetterReader.tsx';
import { RoseScene } from './components/RoseScene.tsx';
import { BackgroundMusic } from './components/BackgroundMusic.tsx';
import type { ExperienceStage, LetterPayload } from './types.ts';

export default function App() {
  const [stage, setStage] = useState<ExperienceStage>('gate');
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [letterData, setLetterData] = useState<LetterPayload | null>(null);
  const [isFadingOutLetter, setIsFadingOutLetter] = useState(false);
  const [isFetchingLetter, setIsFetchingLetter] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  // Restore existing session token if still valid
  useEffect(() => {
    const savedToken = sessionStorage.getItem('letter_auth_token');
    if (savedToken) {
      loadLetterContent(savedToken, false);
    }
  }, []);

  const loadLetterContent = async (token: string, advanceToEnvelope = true) => {
    setIsFetchingLetter(true);
    try {
      const res = await fetch('/api/letter-content', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        sessionStorage.removeItem('letter_auth_token');
        setAuthToken(null);
        setStage('gate');
        setIsFetchingLetter(false);
        return;
      }

      const data = await res.json();
      if (data.success && data.letter) {
        setLetterData(data.letter);
        setAuthToken(token);
        setMusicStarted(true);
        sessionStorage.setItem('letter_auth_token', token);
        if (advanceToEnvelope) {
          setStage('envelope');
        } else {
          // If already in session, resume at envelope
          setStage('envelope');
        }
      }
    } catch (err) {
      console.error('Error fetching letter payload:', err);
    } finally {
      setIsFetchingLetter(false);
    }
  };

  const handleGateSuccess = (token: string) => {
    setMusicStarted(true);
    loadLetterContent(token, true);
  };

  const handleEnvelopeOpened = () => {
    setStage('letter');
  };

  const handleOpenGift = () => {
    setIsFadingOutLetter(true);
    // Cinematic pause & fade before rose scene emerges
    setTimeout(() => {
      setStage('rose');
    }, 900);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] font-ui transition-colors duration-1000">
      {/* Background ambient music (loops at 50% volume after password unlock) */}
      <BackgroundMusic
        shouldPlay={musicStarted}
        isDarkScene={stage === 'rose'}
      />

      {/* Stage 1: Password Gate */}
      {stage === 'gate' && (
        <PasswordGate onSuccess={handleGateSuccess} />
      )}

      {/* Loading overlay if fetching letter after unlock */}
      {isFetchingLetter && (
        <div className="fixed inset-0 z-50 bg-[#FAF7F2]/80 backdrop-blur-sm flex items-center justify-center">
          <p className="font-serif-letter italic text-[#9F1239] text-xl animate-pulse">
            The postman is opening the sealed bag...
          </p>
        </div>
      )}

      {/* Stage 2: The White Envelope */}
      {stage === 'envelope' && (
        <EnvelopeScene onOpened={handleEnvelopeOpened} />
      )}

      {/* Stage 3: The Letter */}
      {stage === 'letter' && letterData && (
        <LetterReader
          letterData={letterData}
          onOpenGift={handleOpenGift}
          isFadingOut={isFadingOutLetter}
        />
      )}

      {/* Stage 4 & 5: The Digital Rose & Final Birthday Wish */}
      {stage === 'rose' && letterData && (
        <RoseScene giftData={letterData.roseExperience} />
      )}
    </div>
  );
}
