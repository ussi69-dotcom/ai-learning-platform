"use client";

import React from 'react';

interface ClippyProps {
  level: number; // 1-4
  className?: string;
}

export default function Clippy({ level, className = "" }: ClippyProps) {
  const avatars = {
    1: "🖇️", // Beginner
    2: "🤖", // Builder
    3: "🦾", // Expert
    4: "🚀"  // Architect
  };

  const names = {
    1: "Clippy",
    2: "C.L.I.P.",
    3: "Cyber-Clip",
    4: "The Architect"
  };

  // Clamp level between 1 and 4
  const currentLevel = Math.max(1, Math.min(4, level)) as 1|2|3|4;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative group cursor-help">
        {/* Avatar */}
        <div className="text-4xl filter drop-shadow-md animate-bounce-slow transition-transform group-hover:scale-110">
          {avatars[currentLevel]}
        </div>
        
        {/* Tooltip Name */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {names[currentLevel]}
        </div>
      </div>
    </div>
  );
}
