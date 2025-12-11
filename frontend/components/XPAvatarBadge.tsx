"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import UserAvatar from "./UserAvatar";

interface XPAvatarBadgeProps {
  avatarId: string;
  email?: string;
  level: number; // 1-4 maps to bronze/silver/gold/diamond
  xp: number;
  className?: string;
  asLink?: boolean; // If false, renders without Link wrapper (for use inside other Links)
}

// Badge tiers with colors - exported for use in profile
export const BADGE_TIERS = {
  1: {
    name: "Bronze",
    nameCs: "Bronz",
    gradient: "from-amber-700 via-amber-500 to-amber-700",
    ring: "ring-amber-600",
    glow: "shadow-amber-500/30",
    border: "border-amber-500",
    bg: "bg-amber-500",
  },
  2: {
    name: "Silver",
    nameCs: "Stříbro",
    gradient: "from-slate-400 via-slate-200 to-slate-400",
    ring: "ring-slate-300",
    glow: "shadow-slate-300/40",
    border: "border-slate-300",
    bg: "bg-slate-300",
  },
  3: {
    name: "Gold",
    nameCs: "Zlato",
    gradient: "from-yellow-600 via-yellow-300 to-yellow-600",
    ring: "ring-yellow-400",
    glow: "shadow-yellow-400/50",
    border: "border-yellow-400",
    bg: "bg-yellow-400",
  },
  4: {
    name: "Diamond",
    nameCs: "Diamant",
    gradient: "from-cyan-400 via-white to-cyan-400",
    ring: "ring-cyan-300",
    glow: "shadow-cyan-300/60",
    border: "border-cyan-300",
    bg: "bg-cyan-300",
  },
} as const;

export function getBadgeLevel(xp: number): 1 | 2 | 3 | 4 {
  if (xp >= 5000) return 4; // Diamond
  if (xp >= 2000) return 3; // Gold
  if (xp >= 500) return 2;  // Silver
  return 1; // Bronze
}

export default function XPAvatarBadge({
  avatarId,
  email,
  level,
  xp,
  className = "",
  asLink = true,
}: XPAvatarBadgeProps) {
  // Clamp level between 1 and 4
  const badgeLevel = Math.max(1, Math.min(4, level)) as 1 | 2 | 3 | 4;
  const badge = BADGE_TIERS[badgeLevel];

  const avatarContent = (
    <div
      className={`
        relative w-9 h-9 rounded-full
        ring-2 ${badge.ring}
        shadow-lg ${badge.glow}
        transition-all duration-300
        hover:scale-110 hover:shadow-xl
      `}
    >
      {/* Animated gradient border */}
      <div
        className={`
          absolute -inset-0.5 rounded-full
          bg-gradient-to-r ${badge.gradient}
          animate-spin-slow opacity-75
        `}
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
    </div>
  );

  if (!asLink) {
    return <div className={`relative ${className}`} title={`${xp} XP`}>{avatarContent}</div>;
  }

  return (
    <Link
      href="/profile"
      className={`relative block ${className}`}
      title={`${xp} XP`}
    >
      {avatarContent}
    </Link>
  );
}
