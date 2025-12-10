"use client";

import { useAuth } from "@/context/AuthContext";
import { useLocale } from "next-intl";
import LevelUpModal from "./LevelUpModal";

export default function LevelUpProvider() {
  const { levelUpData, dismissLevelUp } = useAuth();
  const locale = useLocale();

  return (
    <LevelUpModal
      isOpen={levelUpData.show}
      onClose={dismissLevelUp}
      newLevel={levelUpData.newLevel}
      locale={locale}
    />
  );
}
