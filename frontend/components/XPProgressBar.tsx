"use client";

import React from "react";
import { getBadgeLevel, BADGE_TIERS } from "./XPAvatarBadge";

interface XPProgressBarProps {
  currentXP: number;
  nextLevelXP: number;
  locale?: string;
  className?: string;
}

export default function XPProgressBar({
  currentXP,
  nextLevelXP,
  locale = "en",
  className = "",
}: XPProgressBarProps) {
  const progress = nextLevelXP > 0 ? Math.min(100, (currentXP / nextLevelXP) * 100) : 100;
  const badgeLevel = getBadgeLevel(currentXP);
  const badge = BADGE_TIERS[badgeLevel];
  const badgeName = locale === "cs" ? badge.nameCs : badge.name;

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Labels */}
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1 text-muted-foreground">
        <span>{badgeName}</span>
        <span>{currentXP} XP</span>
      </div>

      {/* Bar */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden border border-border">
        <div
          className={`h-full bg-gradient-to-r ${badge.gradient} transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}