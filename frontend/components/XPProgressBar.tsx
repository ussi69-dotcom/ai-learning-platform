"use client";

import React from 'react';
import Clippy from './Clippy';

interface XPProgressBarProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  className?: string;
}

export default function XPProgressBar({ currentXP, nextLevelXP, level, className = "" }: XPProgressBarProps) {
  const progress = Math.min(100, (currentXP / nextLevelXP) * 100);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      
      {/* Avatar (Compact) */}
      <div className="flex-shrink-0 w-8 h-8 bg-indigo-50 dark:bg-red-950/30 rounded-full flex items-center justify-center border border-indigo-100 dark:border-red-900">
        <Clippy level={level} className="text-base" />
      </div>

      {/* Bar Container */}
      <div className="flex-1 w-full max-w-md">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-400 dark:text-red-400/80">
          <span>Lvl {level}</span>
          <span>{currentXP} XP</span>
        </div>
        
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
          <div 
            className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 dark:from-red-900 dark:to-red-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)] dark:shadow-[0_0_10px_rgba(220,38,38,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}