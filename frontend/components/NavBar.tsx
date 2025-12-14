"use client";

import { useAuth } from "@/context/AuthContext";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import JediSithToggle from "./JediSithToggle";
import XPAvatarBadge, { getBadgeLevel, BADGE_TIERS } from "./XPAvatarBadge";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

// XP thresholds for next level
const XP_THRESHOLDS = [0, 500, 2000, 5000];

export default function NavBar() {
  const { user, logout } = useAuth();
  const t = useTranslations("Navigation");

  // Calculate XP progress
  const getXPProgress = (xp: number) => {
    const level = getBadgeLevel(xp);
    const currentThreshold = XP_THRESHOLDS[level - 1] || 0;
    const nextThreshold = XP_THRESHOLDS[level] || XP_THRESHOLDS[3];
    const progress =
      ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  const badgeLevel = user ? getBadgeLevel(user.xp || 0) : 1;
  const badge = BADGE_TIERS[badgeLevel];

  return (
    <nav className="border-b bg-white/80 dark:bg-slate-950/90 backdrop-blur-md border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      {/* SVG Gradients */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="grad-jedi" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient id="grad-sith" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
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
              className="text-lg sm:text-xl font-black bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-700 dark:from-red-600 dark:via-red-500 dark:to-red-800 bg-clip-text text-transparent hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              AI Edutainment
            </Link>

            {/* About Link */}
            <Link
              href="/about"
              className="flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-red-400 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  className="stroke-current"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 16v-4m0-4h.01"
                  className="stroke-current"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="hidden xs:inline">{t("about") || "About"}</span>
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
                {/* Streak Badge */}
                {user.current_streak > 0 && (
                  <div
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 border border-orange-300/50 dark:border-orange-700/50"
                    title={`🏆 ${t("longestStreak") || "Best"}: ${user.longest_streak} ${t("days") || "days"}`}
                  >
                    <span className="text-lg animate-pulse">🔥</span>
                    <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                      {user.current_streak}
                    </span>
                  </div>
                )}

                {/* Profile Button - horizontal layout */}
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-xl border border-transparent hover:border-violet-400/50 dark:hover:border-red-600/50 hover:bg-violet-50/50 dark:hover:bg-red-950/40 transition-all duration-300"
                >
                  {/* Avatar */}
                  <XPAvatarBadge
                    avatarId={user.avatar}
                    email={user.email}
                    level={badgeLevel}
                    xp={user.xp || 0}
                    asLink={false}
                  />

                  {/* Profile label + XP Bar */}
                  <div className="flex flex-col min-w-[60px] sm:min-w-[80px]">
                    <span className="text-[10px] sm:text-xs font-bold text-violet-700 dark:text-red-500 uppercase tracking-wide">
                      {t("profile") || "Profil"}
                    </span>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-0.5">
                      <div
                        className={`h-full bg-gradient-to-r ${badge.gradient} transition-all duration-500`}
                        style={{ width: `${getXPProgress(user.xp || 0)}%` }}
                      />
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                      {user.xp || 0} XP
                    </span>
                  </div>
                </Link>

                {/* Logout Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="p-1.5 sm:p-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                  title={t("logout") || "Logout"}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
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
                    className="text-xs sm:text-sm px-2 sm:px-3 h-8 font-semibold text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-red-400"
                  >
                    {t("login") || "Sign In"}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="text-xs sm:text-sm px-2 sm:px-4 h-8 font-semibold bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 hover:opacity-90 text-white dark:bg-none dark:bg-red-600 dark:hover:bg-red-700 border-none shadow-md dark:shadow-[0_0_10px_rgba(220,38,38,0.4)]"
                  >
                    {t("register") || "Sign Up"}
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
