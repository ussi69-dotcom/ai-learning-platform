"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "@/i18n/routing";
import UserAvatar from "./UserAvatar";
import { User, LogOut, Settings, Trophy } from "lucide-react";

interface XPAvatarBadgeProps {
  avatarId: string;
  email?: string;
  level: number; // 1-4 maps to bronze/silver/gold/diamond
  xp: number;
  certificates?: number; // Bonus for hybrid badge calculation
  onLogout?: () => void;
  locale?: string;
  className?: string;
}

// Badge tiers with colors
const BADGE_TIERS = {
  1: {
    name: "Bronze",
    nameCs: "Bronz",
    gradient: "from-amber-700 via-amber-500 to-amber-700",
    ring: "ring-amber-600",
    glow: "shadow-amber-500/30",
    border: "border-amber-500",
  },
  2: {
    name: "Silver",
    nameCs: "Stříbro",
    gradient: "from-slate-400 via-slate-200 to-slate-400",
    ring: "ring-slate-300",
    glow: "shadow-slate-300/40",
    border: "border-slate-300",
  },
  3: {
    name: "Gold",
    nameCs: "Zlato",
    gradient: "from-yellow-600 via-yellow-300 to-yellow-600",
    ring: "ring-yellow-400",
    glow: "shadow-yellow-400/50",
    border: "border-yellow-400",
  },
  4: {
    name: "Diamond",
    nameCs: "Diamant",
    gradient: "from-cyan-400 via-white to-cyan-400",
    ring: "ring-cyan-300",
    glow: "shadow-cyan-300/60",
    border: "border-cyan-300",
  },
} as const;

export default function XPAvatarBadge({
  avatarId,
  email,
  level,
  xp,
  certificates = 0,
  onLogout,
  locale = "en",
  className = "",
}: XPAvatarBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Clamp level between 1 and 4
  const badgeLevel = Math.max(1, Math.min(4, level)) as 1 | 2 | 3 | 4;
  const badge = BADGE_TIERS[badgeLevel];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const badgeName = locale === "cs" ? badge.nameCs : badge.name;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Avatar with Badge Ring */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative w-10 h-10 rounded-full
          ring-2 ${badge.ring}
          shadow-lg ${badge.glow}
          transition-all duration-300
          hover:scale-110 hover:shadow-xl
          focus:outline-none focus:ring-offset-2 focus:ring-offset-slate-900
        `}
        title={`${badgeName} (${xp} XP)`}
      >
        {/* Animated gradient border */}
        <div
          className={`
            absolute -inset-0.5 rounded-full
            bg-gradient-to-r ${badge.gradient}
            animate-spin-slow opacity-75
          `}
          style={{ animationDuration: "8s" }}
        />

        {/* Avatar container */}
        <div className="absolute inset-0.5 rounded-full overflow-hidden bg-slate-900">
          <UserAvatar
            avatarId={avatarId}
            email={email}
            className="w-full h-full"
          />
        </div>

        {/* Level indicator dot */}
        <div
          className={`
            absolute -bottom-0.5 -right-0.5
            w-4 h-4 rounded-full
            bg-gradient-to-br ${badge.gradient}
            border-2 border-slate-900
            flex items-center justify-center
            text-[8px] font-bold text-slate-900
          `}
        >
          {badgeLevel}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`
            absolute right-0 top-full mt-2
            w-56 rounded-xl
            bg-slate-800/95 backdrop-blur-lg
            border ${badge.border} border-opacity-50
            shadow-2xl ${badge.glow}
            z-50 overflow-hidden
            animate-in fade-in slide-in-from-top-2 duration-200
          `}
        >
          {/* Header with XP info */}
          <div className={`px-4 py-3 bg-gradient-to-r ${badge.gradient} bg-opacity-20`}>
            <p className="text-sm font-bold text-white truncate">{email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs font-semibold bg-gradient-to-r ${badge.gradient} bg-clip-text text-transparent`}>
                {badgeName}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-300">{xp} XP</span>
              {certificates > 0 && (
                <>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-300 flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    {certificates}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Menu items */}
          <div className="py-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-200 hover:bg-white/10 transition-colors"
            >
              <User className="w-4 h-4" />
              {locale === "cs" ? "Profil" : "Profile"}
            </Link>

            <Link
              href="/profile#certificates"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-200 hover:bg-white/10 transition-colors"
            >
              <Trophy className="w-4 h-4" />
              {locale === "cs" ? "Certifikáty" : "Certificates"}
            </Link>

            <Link
              href="/profile#settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-200 hover:bg-white/10 transition-colors"
            >
              <Settings className="w-4 h-4" />
              {locale === "cs" ? "Nastavení" : "Settings"}
            </Link>

            <hr className="my-2 border-slate-700" />

            <button
              onClick={() => {
                setIsOpen(false);
                onLogout?.();
              }}
              className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors w-full"
            >
              <LogOut className="w-4 h-4" />
              {locale === "cs" ? "Odhlásit" : "Logout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
