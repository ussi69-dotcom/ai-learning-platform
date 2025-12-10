"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import DifficultyIcon from "@/components/DifficultyIcon";
import { Trophy, Sparkles, X } from "lucide-react";

const DIFFICULTY_LABELS: Record<string, string> = {
  PIECE_OF_CAKE: "Piece of Cake",
  LETS_ROCK: "Let's Rock",
  COME_GET_SOME: "Come Get Some",
  DAMN_IM_GOOD: "Damn I'm Good",
};

const LEVEL_DESCRIPTIONS: Record<string, { en: string; cs: string }> = {
  PIECE_OF_CAKE: {
    en: "Welcome, young Padawan!",
    cs: "Vítej, mladý Padawane!",
  },
  LETS_ROCK: {
    en: "You're getting stronger with the Force!",
    cs: "Síla v tobě roste!",
  },
  COME_GET_SOME: {
    en: "A true Jedi Knight emerges!",
    cs: "Zrodil se pravý rytíř Jedi!",
  },
  DAMN_IM_GOOD: {
    en: "Master level achieved. The Force is strong with you!",
    cs: "Dosáhl jsi úrovně Mistra. Síla je s tebou!",
  },
};

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: string;
  locale: string;
}

export default function LevelUpModal({
  isOpen,
  onClose,
  newLevel,
  locale,
}: LevelUpModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Trigger confetti
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const description = LEVEL_DESCRIPTIONS[newLevel] || LEVEL_DESCRIPTIONS.PIECE_OF_CAKE;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 dark:from-slate-900 dark:via-red-950 dark:to-black rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-yellow-500/30 transform transition-all duration-500 ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="text-center space-y-6">
          {/* Trophy icon with glow */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-yellow-500 blur-xl opacity-50 rounded-full" />
            <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 p-4 rounded-full">
              <Trophy className="w-12 h-12 text-yellow-900" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-yellow-400">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">
                {locale === "cs" ? "Level Up!" : "Level Up!"}
              </span>
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-3xl font-bold text-white">
              {locale === "cs" ? "Gratulujeme!" : "Congratulations!"}
            </h2>
          </div>

          {/* New level display */}
          <div className="bg-white/10 rounded-xl p-6 space-y-3">
            <p className="text-white/70 text-sm">
              {locale === "cs" ? "Dosáhl jsi úrovně" : "You've reached"}
            </p>
            <div className="flex items-center justify-center gap-3">
              <DifficultyIcon level={newLevel} size={32} className="text-yellow-400" />
              <span className="text-2xl font-bold text-white">
                {DIFFICULTY_LABELS[newLevel]}
              </span>
            </div>
            <p className="text-yellow-400/80 text-sm italic">
              {locale === "cs" ? description.cs : description.en}
            </p>
          </div>

          {/* CTA */}
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold py-3 rounded-xl transition-all transform hover:scale-105"
          >
            {locale === "cs" ? "Pokračovat v učení →" : "Continue Learning →"}
          </Button>
        </div>
      </div>
    </div>
  );
}
