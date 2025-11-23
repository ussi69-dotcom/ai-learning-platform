"use client";

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function JediSithToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Initialize theme from localStorage or system preference
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
    <div className="fixed top-4 left-4 z-50 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-2 border-slate-200 dark:border-red-900 rounded-full p-1 flex shadow-lg">
        <button
          onClick={() => toggleTheme('light')}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold transition-all
            ${theme === 'light' 
              ? 'bg-blue-100 text-blue-700 shadow-sm scale-105' 
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100/50'}
          `}
        >
          <Sun className="w-4 h-4" />
          <span className="hidden sm:inline">Jedi</span>
        </button>
        
        <button
          onClick={() => toggleTheme('dark')}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold transition-all
            ${theme === 'dark' 
              ? 'bg-red-900/30 text-red-500 shadow-sm scale-105' 
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100/50'}
          `}
        >
          <Moon className="w-4 h-4" />
          <span className="hidden sm:inline">Sith</span>
        </button>
      </div>
    </div>
  );
}
