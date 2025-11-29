"use client";

import { useAuth } from '@/context/AuthContext';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import JediSithToggle from './JediSithToggle';
import XPProgressBar from './XPProgressBar';
import LanguageSwitcher from './LanguageSwitcher';
import { useEffect, useState } from 'react';
import { getAvatar } from '@/components/AvatarSelector';
import { useTranslations } from 'next-intl';

export default function NavBar() {
  const { user, logout, token } = useAuth();
  const [progressStats, setProgressStats] = useState({ level: 1, xp: 0, maxXp: 500 });
  const t = useTranslations('Navigation');

  useEffect(() => {
    if (!user) return;

    // Calculate Level based on difficulty
    let level = 1;
    let maxXp = 500;
    if (user.difficulty === 'LETS_ROCK') { level = 2; maxXp = 1000; }
    if (user.difficulty === 'COME_GET_SOME') { level = 3; maxXp = 2000; }
    if (user.difficulty === 'DAMN_IM_GOOD') { level = 4; maxXp = 5000; }

    setProgressStats({ level, xp: user.xp || 0, maxXp });
  }, [user]);

  // Get Avatar Icon
  const avatarObj = user ? getAvatar(user.avatar) : null;
  const AvatarIcon = avatarObj?.type === 'ICON' ? avatarObj.icon : null;

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
        
        {/* Center: XP Bar (Only when logged in) */}
        {user && (
          <div className="hidden md:flex flex-1 justify-center">
            <XPProgressBar 
              currentXP={progressStats.xp} 
              nextLevelXP={progressStats.maxXp} 
              level={progressStats.level}
              className="w-full max-w-[200px]" // Reduced width significantly
            />
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          
          {/* About Link */}
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden md:block mr-2">
            {t('about') || 'About'}
          </Link>

          {/* Theme Toggle */}
          <JediSithToggle />
          
          {/* Language Switcher */}
          <LanguageSwitcher />

          {user ? (
            <>
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="gap-2 h-10 rounded-full pl-2 pr-4 border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                  {avatarObj && (
                    avatarObj.type === 'IMAGE' ? (
                      <img src={avatarObj.src} alt="Avatar" className="w-6 h-6 rounded-full" />
                    ) : (
                      <AvatarIcon 
                        className="w-6 h-6" 
                        style={{ stroke: avatarObj.gradient }}
                      />
                    )
                  )}
                  <span className="hidden sm:inline">{t('profile')}</span>
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={logout}
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {t('logout')}
              </Button>
            </>
          ) : (
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
