"use client";

import React from 'react';

interface ClippyProps {
  level: number; // 1-4
  className?: string;
}

export default function Clippy({ level, className = "" }: ClippyProps) {
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
        {/* Avatar - Custom SVG for Level 1, Emojis for others for now or keep consistent */}
        <div className="filter drop-shadow-md animate-bounce-slow transition-transform group-hover:scale-110">
          {currentLevel === 1 ? (
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
              {/* Paperclip Body */}
              <path d="M30 20 C 30 5, 70 5, 70 20 L 70 70 C 70 95, 20 95, 20 60 L 20 30" stroke="#6366f1" strokeWidth="8" strokeLinecap="round" className="dark:stroke-slate-300" />
              <path d="M45 30 L 45 60 C 45 75, 60 75, 60 60 L 60 30 C 60 15, 30 15, 30 30 L 30 60" stroke="#6366f1" strokeWidth="8" strokeLinecap="round" className="dark:stroke-slate-300" />
              
              {/* Eyes */}
              <circle cx="40" cy="40" r="5" fill="black" className="dark:fill-white"/>
              <circle cx="60" cy="40" r="5" fill="black" className="dark:fill-white"/>
              
              {/* Eyebrows */}
              <path d="M35 32 Q 40 28 45 32" stroke="black" strokeWidth="3" fill="none" className="dark:stroke-white"/>
              <path d="M55 32 Q 60 28 65 32" stroke="black" strokeWidth="3" fill="none" className="dark:stroke-white"/>
            </svg>
          ) : (
             <span className="text-2xl">
               {currentLevel === 2 ? "🤖" : currentLevel === 3 ? "🦾" : "🚀"}
             </span>
          )}
        </div>
        
        {/* Tooltip Name - Moved to BOTTOM */}
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
          {names[currentLevel]}
        </div>
      </div>
    </div>
  );
}
