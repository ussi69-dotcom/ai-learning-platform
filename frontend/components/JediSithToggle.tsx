"use client";

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

interface JediSithToggleProps {
  className?: string;
}

export default function JediSithToggle({ className = "" }: JediSithToggleProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className={`bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-primary/50 rounded-full p-1 flex shadow-inner ${className}`}>
      <button
        onClick={() => toggleTheme('light')}
        className={`
          flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300
          ${theme === 'light' 
            ? 'bg-white text-purple-600 shadow-sm scale-105 ring-1 ring-slate-200' 
            : 'text-slate-400 hover:text-slate-600'}
        `}
      >
        <Sun className="w-3.5 h-3.5" />
        <span className="hidden xl:inline">Jedi</span>
      </button>
      
      <button
        onClick={() => toggleTheme('dark')}
        className={`
          flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300
          ${theme === 'dark' 
            ? 'bg-primary/10 text-primary shadow-sm scale-105 ring-1 ring-primary' 
            : 'text-slate-400 hover:text-slate-600'}
        `}
      >
        <Moon className="w-3.5 h-3.5" />
        <span className="hidden xl:inline">Sith</span>
      </button>
    </div>
  );
}