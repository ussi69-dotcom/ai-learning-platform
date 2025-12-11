"use client";

import { useAuth } from '@/context/AuthContext';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import JediSithToggle from './JediSithToggle';
import XPProgressBar from './XPProgressBar';
import LanguageSwitcher from './LanguageSwitcher';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function NavBar() {
  const { user, logout } = useAuth();
  const [progressStats, setProgressStats] = useState({ level: 1, xp: 0, maxXp: 500 });
  const t = useTranslations('Navigation');
  const locale = useLocale();

  useEffect(() => {
    if (!user) return;

    // Calculate Level based on difficulty
    let level = 1;
    let maxXp = 500;
    if (user.difficulty === 'LETS_ROCK') { level = 2; maxXp = 2000; }
    if (user.difficulty === 'COME_GET_SOME') { level = 3; maxXp = 5000; }
    if (user.difficulty === 'DAMN_IM_GOOD') { level = 4; maxXp = 10000; }

    setProgressStats({ level, xp: user.xp || 0, maxXp });
  }, [user]);

  return (
    <nav className="border-b bg-white/80 dark:bg-slate-950/90 backdrop-blur-md border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      {/* Inject Gradients for Navbar Icons */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="grad-jedi" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#ffffff" /></linearGradient>
          <linearGradient id="grad-sith" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ef4444" /><stop offset="100%" stopColor="#f59e0b" /></linearGradient>
          <linearGradient id="grad-cyber" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#d946ef" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient>
          <linearGradient id="grad-gold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fbbf24" /><stop offset="100%" stopColor="#fef3c7" /></linearGradient>
          <linearGradient id="grad-tech" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient>
        </defs>
      </svg>

      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-xl font-bold bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 dark:bg-gradient-to-br dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            AI Learning
          </Link>
        </div>
        
        {/* Center: XP Bar with Avatar Badge (Only when logged in) */}
        {user && (
          <div className="hidden md:flex flex-1 justify-center">
            <XPProgressBar
              currentXP={progressStats.xp}
              nextLevelXP={progressStats.maxXp}
              level={progressStats.level}
              avatarId={user.avatar}
              email={user.email}
              onLogout={logout}
              locale={locale}
              className="w-full max-w-[280px]"
            />
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          
          {/* About Link - Enhanced with pulsing AI icon */}
          <Link href="/about" className="hidden md:flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group mr-2 px-3 py-1.5 rounded-full border border-transparent hover:border-purple-300 dark:hover:border-red-500/50 hover:bg-purple-50 dark:hover:bg-red-950/30">
            {/* Pulsing AI Brain Icon */}
            <svg
              className="w-5 h-5 animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Brain/AI neural network icon */}
              <circle cx="12" cy="12" r="10" className="stroke-purple-500 dark:stroke-red-500" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="12" cy="8" r="2" className="fill-purple-600 dark:fill-red-500" />
              <circle cx="8" cy="14" r="2" className="fill-purple-500 dark:fill-red-400" />
              <circle cx="16" cy="14" r="2" className="fill-purple-500 dark:fill-red-400" />
              <path d="M12 10v2M10 13l-1 0.5M14 13l1 0.5" className="stroke-purple-400 dark:stroke-red-300" strokeWidth="1.5" strokeLinecap="round" />
              {/* Central glow */}
              <circle cx="12" cy="12" r="3" className="fill-purple-200/50 dark:fill-red-500/30 animate-ping" style={{ animationDuration: '2s' }} />
            </svg>
            <span className="text-purple-700 dark:text-red-400 group-hover:text-purple-900 dark:group-hover:text-red-300">
              {t('about') || 'About'}
            </span>
          </Link>

          {/* Theme Toggle */}
          <JediSithToggle />
          
          {/* Language Switcher */}
          <LanguageSwitcher />

          {!user && (
            <div className="flex gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm" className="dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300">
                  {t('login')}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 hover:opacity-90 text-white dark:bg-none dark:bg-red-600 dark:hover:bg-red-700 border-none">
                  {t('register')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
