"use client";

import React, { useState, useEffect } from 'react';

export default function ProgressDots() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate active dot based on scroll percentage (0-100)
  // 10 dots = 10% increments
  const activeDotIndex = Math.floor(scrollProgress / 10);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 z-50">
      {[...Array(10)].map((_, i) => (
        <div 
          key={i}
          className={`
            w-2 h-2 rounded-full transition-all duration-300
            ${i <= activeDotIndex 
              ? 'bg-purple-500 scale-125 shadow-[0_0_10px_rgba(168,85,247,0.5)]' 
              : 'bg-slate-300/20 dark:bg-white/10 scale-100'
            }
          `}
        />
      ))}
    </div>
  );
}
