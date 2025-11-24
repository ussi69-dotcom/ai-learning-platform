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
      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center border border-primary/20 dark:border-primary/50">
        <Clippy level={level} className="text-base" />
      </div>

      {/* Bar Container */}
      <div className="flex-1 w-full max-w-md">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1 text-muted-foreground">
          <span>Lvl {level}</span>
          <span>{currentXP} XP</span>
        </div>
        
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden border border-border">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out shadow-[0_0_10px_var(--color-primary)] dark:shadow-[0_0_10px_var(--color-primary)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}