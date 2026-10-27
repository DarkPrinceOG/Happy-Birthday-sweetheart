import React, { useState, useEffect } from 'react';
import { KeyRound, Eye, EyeOff, Loader2 } from 'lucide-react';

interface PasswordGateProps {
  onSuccess: (token: string) => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [cooldown, setCooldown] = useState<number | null>(null);

  // Cooldown countdown timer if rate-limited
  useEffect(() => {
    if (cooldown === null || cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          setErrorMsg(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || cooldown !== null) return;
    if (!password.trim()) {
      setErrorMsg('Please enter the secret key.');
      triggerShake();
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (res.status === 429 && data.retryAfter) {
          setCooldown(data.retryAfter);
          setErrorMsg(data.error || 'Too many attempts. Please pause.');
        } else {
          setErrorMsg(data.error || 'The postman shakes his head — key incorrect.');
        }
        triggerShake();
        setLoading(false);
        return;
      }

      // Successful unlock: trigger smooth transition
      onSuccess(data.token);
    } catch {
      setErrorMsg('Could not reach the post office. Please try again.');
      triggerShake();
      setLoading(false);
    }
  };

  const triggerShake = () => {
    setShake(false);
    requestAnimationFrame(() => {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FAF7F2] px-4 py-8 select-none transition-colors duration-700">
      {/* Background ambient warmth */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40" 
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(254, 226, 226, 0.45) 0%, rgba(250, 247, 242, 0.95) 70%)'
        }}
      />

      <div className="relative z-10 w-full max-w-md mx-auto text-center">
        {/* Subtle wax seal stamp icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FAF0E6] border border-[#E8DACB] shadow-sm mb-6 text-[#9F1239]">
          <KeyRound className="w-6 h-6 stroke-[1.5]" />
        </div>

        {/* Required Texts */}
        <p className="font-serif-letter italic text-xl md:text-2xl text-[#6B5E57] tracking-wide mb-3">
          Every letter has its own little secret...
        </p>

        <h1 className="font-ui text-xs md:text-sm tracking-[0.2em] uppercase font-semibold text-[#8B263E] mb-2">
          POSTMAN NEEDS THE KEY FOR SECURITY REASONS.
        </h1>

        <p className="font-serif-letter text-[#7C6E66] text-base md:text-lg mb-8 italic">
          Some letters are meant for one person only.
        </p>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className={`space-y-4 max-w-xs mx-auto ${shake ? 'animate-shake' : ''}`}
          noValidate
        >
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              disabled={loading || (cooldown !== null && cooldown > 0)}
              placeholder="Enter secret key..."
              autoFocus
              aria-label="Secret letter key"
              className="w-full px-4 py-3 pr-11 text-center font-serif-letter text-lg tracking-wider rounded-xl bg-white/90 border border-[#E4D7C8] text-[#3A2F2B] placeholder:text-[#B8AAA0] placeholder:font-serif-letter focus:outline-none focus:border-[#9F1239]/60 focus:ring-2 focus:ring-[#9F1239]/15 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-200 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8988D] hover:text-[#7A695E] p-1 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 stroke-[1.75]" />
              ) : (
                <Eye className="w-4 h-4 stroke-[1.75]" />
              )}
            </button>
          </div>

          {/* Feedback error notice */}
          {errorMsg && (
            <div 
              role="alert" 
              className="text-xs text-[#9F1239] font-ui font-medium tracking-tight animate-fade-in px-2"
            >
              {errorMsg}
            </div>
          )}

          {/* Unlock Button */}
          <button
            type="submit"
            disabled={loading || (cooldown !== null && cooldown > 0)}
            className="w-full py-3 px-6 rounded-xl bg-[#8B263E] hover:bg-[#731D31] active:scale-[0.99] text-[#FFF8F0] font-ui text-sm tracking-widest font-medium shadow-[0_4px_16px_rgba(139,38,62,0.18)] hover:shadow-[0_6px_20px_rgba(139,38,62,0.25)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Checking Key...</span>
              </>
            ) : cooldown !== null && cooldown > 0 ? (
              <span>Locked ({cooldown}s)</span>
            ) : (
              <span>Unlock Letter</span>
            )}
          </button>
        </form>

        {/* Quiet hint for recipient */}
        <p className="mt-8 text-[11px] font-ui tracking-wider text-[#A3948A] uppercase">
          Hint: A six-letter name for the birthday girl
        </p>
      </div>
    </div>
  );
};
