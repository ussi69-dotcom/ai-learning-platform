"use client";

import React from "react";
import XPAvatarBadge from "./XPAvatarBadge";

interface XPProgressBarProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  avatarId?: string;
  email?: string;
  certificates?: number;
  onLogout?: () => void;
  locale?: string;
  className?: string;
}

// Badge tier names for display
const BADGE_NAMES = {
  1: { en: "Bronze", cs: "Bronz" },
  2: { en: "Silver", cs: "Stříbro" },
  3: { en: "Gold", cs: "Zlato" },
  4: { en: "Diamond", cs: "Diamant" },
} as const;

export default function XPProgressBar({
  currentXP,
  nextLevelXP,
  level,
  avatarId = "droid_1",
  email,
  certificates = 0,
  onLogout,
  locale = "en",
  className = "",
}: XPProgressBarProps) {
  const progress = nextLevelXP > 0 ? Math.min(100, (currentXP / nextLevelXP) * 100) : 100;
  const badgeLevel = Math.max(1, Math.min(4, level)) as 1 | 2 | 3 | 4;
  const badgeName = locale === "cs" ? BADGE_NAMES[badgeLevel].cs : BADGE_NAMES[badgeLevel].en;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Avatar with Badge (acts as profile menu) */}
      <XPAvatarBadge
        avatarId={avatarId}
        email={email}
        level={level}
        xp={currentXP}
        certificates={certificates}
        onLogout={onLogout}
        locale={locale}
      />

      {/* Bar Container */}
      <div className="flex-1 w-full max-w-md">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1 text-muted-foreground">
          <span>{badgeName}</span>
          <span>{currentXP} XP</span>
        </div>

        <div className="w-full h-2 bg-muted rounded-full overflow-hidden border border-border">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out shadow-[0_0_10px_var(--color-primary)] dark:shadow-[0_0_10px_var(--color-primary)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}