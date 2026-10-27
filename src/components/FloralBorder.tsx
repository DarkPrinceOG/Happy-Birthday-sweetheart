import React from 'react';

export const FloralBorder: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden rounded-2xl">
      {/* Delicate inner hairline frame */}
      <div className="absolute inset-3 sm:inset-5 md:inset-6 border border-[#E8DACB]/60 rounded-xl pointer-events-none" />

      {/* Top Left Floral Corner */}
      <svg
        className="absolute top-2 left-2 sm:top-3 sm:left-3 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 opacity-85"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Vine Stem */}
        <path
          d="M6 94 C 18 65, 35 38, 92 8"
          stroke="#7A8B6E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 70 C 14 56, 12 42, 22 30"
          stroke="#7A8B6E"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Olive Sage Leaves */}
        <path
          d="M32 54 C 28 44, 34 38, 42 42 C 45 49, 39 55, 32 54 Z"
          fill="#8A9A7E"
          opacity="0.8"
        />
        <path
          d="M60 28 C 54 20, 60 14, 68 18 C 72 24, 66 30, 60 28 Z"
          fill="#8A9A7E"
          opacity="0.8"
        />
        <path
          d="M18 42 C 12 36, 16 28, 24 30 C 26 36, 22 42, 18 42 Z"
          fill="#8A9A7E"
          opacity="0.8"
        />
        {/* Small Muted-Red Flower Bud */}
        <circle cx="24" cy="28" r="4.5" fill="#9F1239" opacity="0.9" />
        <circle cx="22" cy="27" r="2.5" fill="#E11D48" opacity="0.85" />
        {/* Soft Pink Blossom Petals */}
        <g transform="translate(68, 18)">
          <circle cx="0" cy="-6" r="4.5" fill="#FDA4AF" opacity="0.85" />
          <circle cx="6" cy="-2" r="4.5" fill="#F43F5E" opacity="0.75" />
          <circle cx="4" cy="5" r="4.5" fill="#FB7185" opacity="0.8" />
          <circle cx="-4" cy="5" r="4.5" fill="#FDA4AF" opacity="0.85" />
          <circle cx="-6" cy="-2" r="4.5" fill="#F43F5E" opacity="0.75" />
          <circle cx="0" cy="0" r="3" fill="#FFE4E6" />
          <circle cx="0" cy="0" r="1.5" fill="#9F1239" />
        </g>
      </svg>

      {/* Top Right Floral Corner (Mirrored horizontally) */}
      <svg
        className="absolute top-2 right-2 sm:top-3 sm:right-3 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 opacity-85 scale-x-[-1]"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6 94 C 18 65, 35 38, 92 8"
          stroke="#7A8B6E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 70 C 14 56, 12 42, 22 30"
          stroke="#7A8B6E"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M32 54 C 28 44, 34 38, 42 42 C 45 49, 39 55, 32 54 Z"
          fill="#8A9A7E"
          opacity="0.8"
        />
        <path
          d="M60 28 C 54 20, 60 14, 68 18 C 72 24, 66 30, 60 28 Z"
          fill="#8A9A7E"
          opacity="0.8"
        />
        <circle cx="24" cy="28" r="4.5" fill="#9F1239" opacity="0.9" />
        <g transform="translate(68, 18)">
          <circle cx="0" cy="-6" r="4.5" fill="#FDA4AF" opacity="0.85" />
          <circle cx="6" cy="-2" r="4.5" fill="#F43F5E" opacity="0.75" />
          <circle cx="4" cy="5" r="4.5" fill="#FB7185" opacity="0.8" />
          <circle cx="-4" cy="5" r="4.5" fill="#FDA4AF" opacity="0.85" />
          <circle cx="-6" cy="-2" r="4.5" fill="#F43F5E" opacity="0.75" />
          <circle cx="0" cy="0" r="3" fill="#FFE4E6" />
          <circle cx="0" cy="0" r="1.5" fill="#9F1239" />
        </g>
      </svg>

      {/* Bottom Left Floral Corner (Mirrored vertically) */}
      <svg
        className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 opacity-85 scale-y-[-1]"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6 94 C 18 65, 35 38, 92 8"
          stroke="#7A8B6E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 70 C 14 56, 12 42, 22 30"
          stroke="#7A8B6E"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M32 54 C 28 44, 34 38, 42 42 C 45 49, 39 55, 32 54 Z"
          fill="#8A9A7E"
          opacity="0.8"
        />
        <circle cx="24" cy="28" r="4.5" fill="#9F1239" opacity="0.9" />
        <g transform="translate(68, 18)">
          <circle cx="0" cy="-6" r="4.5" fill="#FDA4AF" opacity="0.85" />
          <circle cx="6" cy="-2" r="4.5" fill="#F43F5E" opacity="0.75" />
          <circle cx="4" cy="5" r="4.5" fill="#FB7185" opacity="0.8" />
          <circle cx="-4" cy="5" r="4.5" fill="#FDA4AF" opacity="0.85" />
          <circle cx="-6" cy="-2" r="4.5" fill="#F43F5E" opacity="0.75" />
          <circle cx="0" cy="0" r="3" fill="#FFE4E6" />
          <circle cx="0" cy="0" r="1.5" fill="#9F1239" />
        </g>
      </svg>

      {/* Bottom Right Floral Corner (Mirrored both) */}
      <svg
        className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 opacity-85 scale-[-1]"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6 94 C 18 65, 35 38, 92 8"
          stroke="#7A8B6E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 70 C 14 56, 12 42, 22 30"
          stroke="#7A8B6E"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M32 54 C 28 44, 34 38, 42 42 C 45 49, 39 55, 32 54 Z"
          fill="#8A9A7E"
          opacity="0.8"
        />
        <circle cx="24" cy="28" r="4.5" fill="#9F1239" opacity="0.9" />
        <g transform="translate(68, 18)">
          <circle cx="0" cy="-6" r="4.5" fill="#FDA4AF" opacity="0.85" />
          <circle cx="6" cy="-2" r="4.5" fill="#F43F5E" opacity="0.75" />
          <circle cx="4" cy="5" r="4.5" fill="#FB7185" opacity="0.8" />
          <circle cx="-4" cy="5" r="4.5" fill="#FDA4AF" opacity="0.85" />
          <circle cx="-6" cy="-2" r="4.5" fill="#F43F5E" opacity="0.75" />
          <circle cx="0" cy="0" r="3" fill="#FFE4E6" />
          <circle cx="0" cy="0" r="1.5" fill="#9F1239" />
        </g>
      </svg>
    </div>
  );
};
