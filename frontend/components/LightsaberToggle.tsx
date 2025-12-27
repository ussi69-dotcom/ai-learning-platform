"use client";

import React, { useEffect, useState } from "react";

interface LightsaberToggleProps {
  className?: string;
}

/**
 * LightsaberToggle - Theme switcher styled as a horizontal lightsaber
 *
 * Features:
 * - Horizontal SVG handle with metallic gradient
 * - Animated blade extending from the handle
 * - Blue (Jedi) / Red (Sith) theme colors
 * - Smooth blade extend/retract animation
 */
export default function LightsaberToggle({
  className = "",
}: LightsaberToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark = storedTheme === "dark" || (!storedTheme && prefersDark);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newTheme = theme === "light" ? "dark" : "light";

    // Brief blade retract before switch
    setTimeout(() => {
      setTheme(newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }

      setTimeout(() => setIsAnimating(false), 400);
    }, 150);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`lightsaber-toggle group ${className}`}
      aria-label={theme === "light" ? "Switch to Sith (dark) mode" : "Switch to Jedi (light) mode"}
      aria-pressed={theme === "dark"}
      disabled={isAnimating}
    >
      {/* Horizontal Lightsaber Handle SVG */}
      <svg
        className="lightsaber-handle"
        viewBox="0 0 32 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="handleBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9CA3AF" />
            <stop offset="30%" stopColor="#6B7280" />
            <stop offset="70%" stopColor="#4B5563" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
          <linearGradient id="handleShine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D1D5DB" />
            <stop offset="100%" stopColor="#9CA3AF" />
          </linearGradient>
        </defs>

        {/* Main handle body */}
        <rect
          x="4"
          y="4"
          width="24"
          height="8"
          rx="1"
          fill="url(#handleBody)"
        />

        {/* Handle grip lines */}
        <line x1="10" y1="5" x2="10" y2="11" stroke="#1F2937" strokeWidth="1" />
        <line x1="14" y1="5" x2="14" y2="11" stroke="#1F2937" strokeWidth="1" />
        <line x1="18" y1="5" x2="18" y2="11" stroke="#1F2937" strokeWidth="1" />

        {/* Emitter (right side - where blade comes out) */}
        <rect
          x="26"
          y="3"
          width="4"
          height="10"
          rx="1"
          fill="url(#handleShine)"
        />

        {/* Emitter detail */}
        <rect
          x="28"
          y="5"
          width="2"
          height="6"
          rx="0.5"
          fill="#4B5563"
        />

        {/* Power button */}
        <circle
          cx="7"
          cy="8"
          r="2"
          className={theme === "light" ? "fill-[#4FC3F7]" : "fill-[#EF5350]"}
        />

        {/* Pommel (left end) */}
        <rect
          x="2"
          y="5"
          width="3"
          height="6"
          rx="1"
          fill="#1F2937"
        />
      </svg>

      {/* Blade - extends from the right side of handle */}
      <div
        className={`lightsaber-blade ${
          isAnimating ? "off" : theme === "light" ? "jedi" : "sith"
        }`}
      />

      {/* Label */}
      <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-foreground/70 group-hover:text-foreground transition-colors ml-3">
        {theme === "light" ? "Jedi" : "Sith"}
      </span>
    </button>
  );
}
