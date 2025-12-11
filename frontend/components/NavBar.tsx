"use client";

import { useAuth } from '@/context/AuthContext';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import JediSithToggle from './JediSithToggle';
import XPAvatarBadge, { getBadgeLevel, BADGE_TIERS } from './XPAvatarBadge';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';

// XP thresholds for next level
const XP_THRESHOLDS = [0, 500, 2000, 5000];

export default function NavBar() {
  const { user, logout } = useAuth();
  const t = useTranslations('Navigation');

  // Calculate XP progress
  const getXPProgress = (xp: number) => {
    const level = getBadgeLevel(xp);
    const currentThreshold = XP_THRESHOLDS[level - 1] || 0;
    const nextThreshold = XP_THRESHOLDS[level] || XP_THRESHOLDS[3];
    const progress = ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  const badgeLevel = user ? getBadgeLevel(user.xp || 0) : 1;
  const badge = BADGE_TIERS[badgeLevel];

  return (
    <nav className="border-b bg-white/80 dark:bg-slate-950/90 backdrop-blur-md border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      {/* SVG Gradients */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="grad-jedi" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#ffffff" /></linearGradient>
          <linearGradient id="grad-sith" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ef4444" /><stop offset="100%" stopColor="#f59e0b" /></linearGradient>
        </defs>
      </svg>

      <div className="container mx-auto px-3 sm:px-4">
        {/* Main navbar row - wraps on mobile */}
        <div className="flex flex-wrap items-center justify-between gap-2 py-2 sm:py-0 sm:h-14">

          {/* Left: Logo + About */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="text-lg sm:text-xl font-black bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-700 dark:from-red-500 dark:via-orange-400 dark:to-red-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              AI Edutainment
            </Link>

            {/* About Link */}
            <Link
              href="/about"
              className="flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-red-400 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" className="stroke-current" strokeWidth="1.5" />
                <path d="M12 16v-4m0-4h.01" className="stroke-current" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="hidden xs:inline">{t('about') || 'About'}</span>
            </Link>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle - horizontal on mobile */}
            <JediSithToggle />

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* User Section */}
            {user ? (
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Profile Button with Avatar + XP Bar */}
                <Link
                  href="/profile"
                  className="flex flex-col items-center px-2 sm:px-3 py-1 rounded-xl border border-transparent hover:border-purple-300 dark:hover:border-red-500/50 hover:bg-purple-50/50 dark:hover:bg-red-950/20 transition-all duration-300 group"
                >
                  {/* Avatar */}
                  <XPAvatarBadge
                    avatarId={user.avatar}
                    email={user.email}
                    level={badgeLevel}
                    xp={user.xp || 0}
                    asLink={false}
                  />

                  {/* XP Bar under avatar */}
                  <div className="w-10 sm:w-12 mt-1">
                    <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${badge.gradient} transition-all duration-500`}
                        style={{ width: `${getXPProgress(user.xp || 0)}%` }}
                      />
                    </div>
                    <div className="text-[8px] sm:text-[9px] text-center text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      {user.xp || 0} XP
                    </div>
                  </div>
                </Link>

                {/* Logout Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="p-1.5 sm:p-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                  title={t('logout') || 'Logout'}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </Button>
              </div>
            ) : (
              /* Sign In / Register buttons */
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs sm:text-sm px-2 sm:px-3 h-8 font-semibold text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-red-400"
                  >
                    {t('login') || 'Sign In'}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="text-xs sm:text-sm px-2 sm:px-4 h-8 font-semibold bg-gradient-to-r from-purple-600 to-fuchsia-600 dark:from-red-600 dark:to-orange-600 hover:opacity-90 text-white border-none shadow-md"
                  >
                    {t('register') || 'Sign Up'}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
