"use client";

import React from 'react';

interface LessonProgressBarProps {
  total: number;
  current: number;
  onNavigate: (page: number) => void;
}

export default function LessonProgressBar({ total, current, onNavigate }: LessonProgressBarProps) {
  return (
    <div className="flex flex-1 gap-1 mx-2 h-12 items-center"> {/* Zvětšena výška kontejneru pro touch area */}
      {[...Array(total)].map((_, i) => {
        const isActive = i <= current;
        const isCurrent = i === current;
        
        return (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className={`
              relative group flex-1 h-2 rounded-full transition-all duration-300
              ${isCurrent 
                ? 'bg-primary shadow-[0_0_10px_var(--color-primary)] ring-2 ring-primary/30 h-3' // Větší aktivní
                : isActive 
                  ? 'bg-primary/60 hover:bg-primary/80' 
                  : 'bg-muted hover:bg-muted-foreground/30'
              }
            `}
            aria-label={`Go to page ${i + 1}`}
          >
            {/* Tooltip / Number Indicator */}
            <div className={`
              absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
              bg-popover text-popover-foreground text-xs font-bold rounded shadow-md
              border border-border whitespace-nowrap pointer-events-none
              transition-all duration-200
              ${isCurrent 
                ? 'opacity-100 translate-y-0' // Vždy vidět pro aktuální
                : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0' // Hover efekt pro ostatní
              }
            `}>
              {i + 1}
            </div>
          </button>
        );
      })}
    </div>
  );
}
