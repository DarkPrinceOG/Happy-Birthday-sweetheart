import React from 'react';

interface RoseIllustrationProps {
  bloomProgress: boolean; // true once bloom initiates
}

export const RoseIllustration: React.FC<RoseIllustrationProps> = ({ bloomProgress }) => {
  return (
    <div className="relative w-64 h-80 sm:w-72 sm:h-92 md:w-80 md:h-96 mx-auto flex items-center justify-center">
      {/* Soft crimson and golden ambient back-glow */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-2000 pointer-events-none ${
          bloomProgress ? 'opacity-80 rose-glow' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(225, 29, 72, 0.32) 0%, rgba(245, 158, 11, 0.16) 40%, transparent 70%)',
        }}
      />

      {/* SVG Rose */}
      <svg
        viewBox="0 0 200 280"
        className="w-full h-full relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Petal Gradients */}
          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4D6B3C" />
            <stop offset="100%" stopColor="#2D4022" />
          </linearGradient>

          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5E8349" />
            <stop offset="100%" stopColor="#314725" />
          </linearGradient>

          <radialGradient id="roseCoreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </radialGradient>

          <linearGradient id="petalDeep" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="30%" stopColor="#E11D48" />
            <stop offset="70%" stopColor="#9F1239" />
            <stop offset="100%" stopColor="#4C0519" />
          </linearGradient>

          <linearGradient id="petalOuterL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDA4AF" />
            <stop offset="45%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#881337" />
          </linearGradient>

          <linearGradient id="petalOuterR" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDA4AF" />
            <stop offset="45%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#881337" />
          </linearGradient>
        </defs>

        {/* Stem */}
        <path
          d="M 100 145 C 98 180, 104 220, 96 270"
          stroke="url(#stemGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          className={bloomProgress ? 'animate-stem' : 'opacity-0'}
        />

        {/* Thorns */}
        {bloomProgress && (
          <>
            <path
              d="M 97 195 C 94 193, 91 193, 89 194 C 91 197, 95 198, 97 199 Z"
              fill="#3E5430"
              className="animate-leaf-left"
            />
            <path
              d="M 101 230 C 104 228, 108 229, 110 230 C 107 233, 103 234, 101 234 Z"
              fill="#3E5430"
              className="animate-leaf-right"
            />
          </>
        )}

        {/* Leaves */}
        {bloomProgress && (
          <g>
            {/* Left Leaf */}
            <g className="animate-leaf-left">
              <path
                d="M 98 215 C 75 205, 50 215, 45 228 C 65 234, 85 225, 98 218 Z"
                fill="url(#leafGrad)"
                stroke="#3E5430"
                strokeWidth="0.75"
              />
              <path
                d="M 98 216 C 75 218, 55 224, 46 228"
                stroke="#6B9353"
                strokeWidth="0.75"
                strokeLinecap="round"
              />
            </g>

            {/* Right Leaf */}
            <g className="animate-leaf-right">
              <path
                d="M 100 240 C 122 232, 145 238, 155 250 C 135 258, 115 250, 100 242 Z"
                fill="url(#leafGrad)"
                stroke="#3E5430"
                strokeWidth="0.75"
              />
              <path
                d="M 100 241 C 122 242, 142 246, 154 250"
                stroke="#6B9353"
                strokeWidth="0.75"
                strokeLinecap="round"
              />
            </g>

            {/* Calyx / Sepals below bud */}
            <path
              d="M 92 145 C 80 152, 72 165, 70 172 C 80 162, 90 155, 94 146 Z"
              fill="#435E34"
            />
            <path
              d="M 108 145 C 120 152, 128 165, 130 172 C 120 162, 110 155, 106 146 Z"
              fill="#435E34"
            />
            <path
              d="M 100 146 C 96 156, 98 168, 100 176 C 102 168, 104 156, 100 146 Z"
              fill="#344A29"
            />
          </g>
        )}

        {/* Rose Petals Group */}
        {bloomProgress && (
          <g id="rose-petals">
            {/* Outer Petals Left & Right */}
            <path
              d="M 100 144 C 60 148, 48 115, 62 88 C 76 65, 98 85, 100 115 Z"
              fill="url(#petalOuterL)"
              opacity="0.95"
              className="animate-petal-out-l"
            />
            <path
              d="M 100 144 C 140 148, 152 115, 138 88 C 124 65, 102 85, 100 115 Z"
              fill="url(#petalOuterR)"
              opacity="0.95"
              className="animate-petal-out-r"
            />

            {/* Mid Petals */}
            <path
              d="M 100 142 C 72 140, 68 110, 78 90 C 88 72, 105 85, 100 120 Z"
              fill="url(#petalDeep)"
              className="animate-petal-mid-l"
            />
            <path
              d="M 100 142 C 128 140, 132 110, 122 90 C 112 72, 95 85, 100 120 Z"
              fill="url(#petalDeep)"
              className="animate-petal-mid-r"
            />

            {/* Back wrapping petal */}
            <path
              d="M 76 96 C 72 70, 128 70, 124 96 C 115 110, 85 110, 76 96 Z"
              fill="#9F1239"
              opacity="0.8"
            />

            {/* Center Rosebud Core Petals */}
            <path
              d="M 85 110 C 80 85, 115 80, 115 105 C 115 125, 88 128, 85 110 Z"
              fill="url(#roseCoreGrad)"
            />

            {/* Inner Spiral Flake */}
            <path
              d="M 94 98 C 96 90, 106 90, 106 97 C 106 104, 95 106, 94 98 Z"
              fill="#FFE4E6"
              opacity="0.9"
            />

            {/* Velvety Petal Edges / Highlights */}
            <path
              d="M 68 88 C 76 72, 94 82, 98 100"
              stroke="#FECDD3"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.6"
              className="animate-petal-mid-l"
            />
            <path
              d="M 132 88 C 124 72, 106 82, 102 100"
              stroke="#FECDD3"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.6"
              className="animate-petal-mid-r"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
