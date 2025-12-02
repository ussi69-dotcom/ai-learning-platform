import React from 'react';

interface SplitBugEyeIconProps {
  size?: number;
  className?: string;
}

/**
 * Custom icon that combines Bug (left half) and Eye (right half) vertically split
 * Shows both "report bug" and "view feedback" functionality in one icon
 */
export default function SplitBugEyeIcon({ size = 24, className = '' }: SplitBugEyeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Top half: Bug icon (clipped) */}
      <g clipPath="url(#topHalf)">
        {/* Bug body */}
        <path d="m8 2 1.88 1.88" />
        <path d="M14.12 3.88 16 2" />
        <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
        <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
        <path d="M12 20v-9" />
        <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
        <path d="M6 13H2" />
        <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
        <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
        <path d="M22 13h-4" />
        <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
      </g>

      {/* Bottom half: Eye icon (clipped) */}
      <g clipPath="url(#bottomHalf)">
        {/* Eye shape */}
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        {/* Pupil */}
        <circle cx="12" cy="12" r="3" />
      </g>

      {/* Horizontal dividing line */}
      <line x1="0" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.3" />

      {/* Clip paths for horizontal split */}
      <defs>
        <clipPath id="topHalf">
          <rect x="0" y="0" width="24" height="12" />
        </clipPath>
        <clipPath id="bottomHalf">
          <rect x="0" y="12" width="24" height="12" />
        </clipPath>
      </defs>
    </svg>
  );
}
