"use client";

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LabBadgeProps {
  title: string;
  onClose: () => void;
}

export default function LabBadge({ title, onClose }: LabBadgeProps) {
  // Check if we are in dark mode (simplified check, ideally use context)
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

  useEffect(() => {
    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = isDark ? ['#ff0000', '#aa0000'] : ['#4f46e5', '#9333ea'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, [isDark]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md transform bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-4 border-indigo-500 dark:border-red-600 animate-in zoom-in-95 duration-300 p-8 text-center overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-6xl mb-4 animate-bounce">
            {isDark ? '⚡' : '🎉'}
          </div>
          
          <h2 className="text-3xl font-black mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-red-500 dark:to-orange-500 bg-clip-text text-transparent">
            LAB COMPLETE!
          </h2>
          
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            You've mastered <strong>{title}</strong>
          </p>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 mb-6 inline-block border border-slate-200 dark:border-slate-700">
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Reward</div>
            <div className="text-2xl font-black text-indigo-600 dark:text-red-500">+25 XP</div>
          </div>

          <div className="italic text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-4">
            "{isDark ? 'Power grows through understanding.' : 'Knowledge is the path to mastery.'}"
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 dark:bg-red-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 dark:bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
      </div>
    </div>
  );
}