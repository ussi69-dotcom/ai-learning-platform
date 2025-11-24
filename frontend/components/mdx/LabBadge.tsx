"use client";

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LabBadgeProps {
  title: string;
  onClose: () => void;
  type?: 'lab' | 'lesson' | 'quiz';
  xp?: number;
}

export default function LabBadge({ title, onClose, type = 'lab', xp = 25 }: LabBadgeProps) {
  // ... (confetti logic same)

  const badgeTitle = type === 'lesson' ? 'LESSON COMPLETE!' : type === 'quiz' ? 'QUIZ MASTERED!' : 'LAB COMPLETE!';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md transform glass-panel rounded-3xl shadow-2xl border-2 border-primary animate-in zoom-in-95 duration-300 p-8 text-center overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-6xl mb-4 animate-bounce">
            🏆
          </div>
          
          <h2 className="text-3xl font-black mb-2 text-primary">
            {badgeTitle}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            You've mastered <strong className="text-foreground">{title}</strong>
          </p>

          <div className="bg-muted rounded-xl p-4 mb-6 inline-block border border-border">
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Reward</div>
            <div className="text-2xl font-black text-primary">+{xp} XP</div>
          </div>

          <div className="italic text-sm text-muted-foreground border-t border-border pt-4">
            "Knowledge is the path to mastery."
          </div>
        </div>
        {/* ... effects ... */}
      </div>
    </div>
  );
}