"use client";

import React from 'react';
import Clippy from './Clippy';

interface XPProgressBarProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  levelName: string;
}

export default function XPProgressBar({ currentXP, nextLevelXP, level, levelName }: XPProgressBarProps) {
  const progress = Math.min(100, (currentXP / nextLevelXP) * 100);

  return (
    <div className="fixed bottom-4 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-40 px-4 animate-in slide-in-from-bottom-4 duration-700 delay-300">
      <div className="bg-white dark:bg-slate-900 border-2 border-indigo-500 dark:border-red-600 rounded-full shadow-2xl p-2 flex items-center gap-4">
        
        {/* Avatar (Left) */}
        <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 dark:bg-slate-800 rounded-full flex items-center justify-center border border-indigo-200 dark:border-slate-700">
          <Clippy level={level} className="text-xl" />
        </div>

        {/* Bar Container */}
        <div className="flex-1">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
            <span>Lvl {level}: {levelName}</span>
            <span>{currentXP} / {nextLevelXP} XP</span>
          </div>
          
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-red-600 dark:to-orange-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Next Level Preview (Right) */}
        <div className="hidden sm:flex flex-shrink-0 w-8 h-8 opacity-50 grayscale items-center justify-center">
           <Clippy level={level + 1} className="text-lg" />
        </div>
      </div>
    </div>
  );
}
