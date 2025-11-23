"use client";

import React, { useState, useEffect } from 'react';
import { Trophy, X } from 'lucide-react';

interface LabBadgeProps {
  xp?: number;
  title?: string;
}

export default function LabBadge({ xp = 10, title = "Lab Complete!" }: LabBadgeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Delay appearance slightly for effect
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isDismissed) return null;

  return (
    <div 
      className={`
        relative my-8 p-4 rounded-xl overflow-hidden
        bg-gradient-to-br from-green-500/10 to-emerald-500/10 
        border border-green-500/20 backdrop-blur-xl
        transition-all duration-700 ease-out transform
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}
      `}
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 blur-3xl rounded-full -mr-16 -mt-16" />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg border border-yellow-300/50">
            <Trophy className="w-6 h-6 text-white drop-shadow-md" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {title}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              You earned <span className="text-green-600 dark:text-green-400 font-bold">+{xp} XP</span>
            </p>
          </div>
        </div>

        <button 
          onClick={() => setIsDismissed(true)}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-500"
          aria-label="Dismiss badge"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
