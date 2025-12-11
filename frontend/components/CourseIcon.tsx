"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface CourseIconProps {
  courseId?: number;
  slug?: string;
  className?: string;
  imageUrl?: string;
  objectFit?: "cover" | "contain";
}

export default function CourseIcon({
  courseId,
  slug,
  className = "w-full h-full",
  imageUrl,
  objectFit = "cover",
}: CourseIconProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Detect dark mode
    const checkDarkMode = () => {
      // Rely ONLY on the class, as the app toggle controls this
      const dark = document.documentElement.classList.contains("dark");
      setIsDark(dark);
    };

    // Initial check and mark as mounted
    checkDarkMode();
    setMounted(true);

    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Use theme-specific image if available
  if (imageUrl && mounted) {
    // Replace extension with _dark or _light variant
    const themeImage = imageUrl.replace(
      /\.(jpg|jpeg|png|webp)$/i,
      isDark ? "_dark.$1" : "_light.$1"
    );

    return (
      <div className={className + " relative"}>
        <Image
          key={themeImage}
          src={themeImage}
          alt="Course cover"
          fill
          className={`object-${objectFit}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
    );
  }

  // Logic to map ID or Slug to a visual type
  // Defaults based on current seed data
  // 1: AI Engineering (Deep Dive)
  // 2: Advanced AI (Expert)
  // 3: AI Basics (Beginner)
  // 4: Prompt Engineering (Practical)

  const getType = (): string => {
    if (slug?.includes("beginner") || courseId === 3) return "beginner";
    if (slug?.includes("prompt") || courseId === 4) return "prompt";
    if (slug?.includes("engineering") || courseId === 1) return "engineering";
    if (slug?.includes("advanced") || courseId === 2) return "advanced";
    return "default";
  };
  const type = getType();

  // --- SVG DEFINITIONS ---

  if (type === "beginner") {
    // Concept: Space Fighter (X-Wing inspired) - Clean & Recognizable
    return (
      <svg
        viewBox="0 0 200 200"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad-ship" x1="0" y1="0" x2="200" y2="0">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>

          <radialGradient id="engine-glow">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* UPPER WINGS (2x) */}
        <g>
          {/* Top Right Wing */}
          <path
            d="M90 70 L170 40 L175 45 L95 75 Z"
            fill="url(#grad-ship)"
            stroke="#1e3a8a"
            strokeWidth="2"
            opacity="0.9"
          />
          <circle
            cx="172"
            cy="42"
            r="8"
            fill="#1e40af"
            stroke="#60a5fa"
            strokeWidth="1.5"
          />
          <circle
            cx="175"
            cy="42"
            r="6"
            fill="url(#engine-glow)"
            filter="url(#glow)"
          />

          {/* Top Left Wing */}
          <path
            d="M90 70 L170 30 L175 35 L95 65 Z"
            fill="url(#grad-ship)"
            stroke="#1e3a8a"
            strokeWidth="2"
            opacity="0.9"
          />
          <circle
            cx="172"
            cy="32"
            r="8"
            fill="#1e40af"
            stroke="#60a5fa"
            strokeWidth="1.5"
          />
          <circle
            cx="175"
            cy="32"
            r="6"
            fill="url(#engine-glow)"
            filter="url(#glow)"
          />
        </g>

        {/* LOWER WINGS (2x) */}
        <g>
          {/* Bottom Right Wing */}
          <path
            d="M90 130 L170 160 L175 155 L95 125 Z"
            fill="url(#grad-ship)"
            stroke="#1e3a8a"
            strokeWidth="2"
            opacity="0.9"
          />
          <circle
            cx="172"
            cy="158"
            r="8"
            fill="#1e40af"
            stroke="#60a5fa"
            strokeWidth="1.5"
          />
          <circle
            cx="175"
            cy="158"
            r="6"
            fill="url(#engine-glow)"
            filter="url(#glow)"
          />

          {/* Bottom Left Wing */}
          <path
            d="M90 130 L170 170 L175 165 L95 135 Z"
            fill="url(#grad-ship)"
            stroke="#1e3a8a"
            strokeWidth="2"
            opacity="0.9"
          />
          <circle
            cx="172"
            cy="168"
            r="8"
            fill="#1e40af"
            stroke="#60a5fa"
            strokeWidth="1.5"
          />
          <circle
            cx="175"
            cy="168"
            r="6"
            fill="url(#engine-glow)"
            filter="url(#glow)"
          />
        </g>

        {/* MAIN BODY */}
        <g>
          {/* Fuselage */}
          <ellipse
            cx="80"
            cy="100"
            rx="50"
            ry="16"
            fill="url(#grad-ship)"
            stroke="#3b82f6"
            strokeWidth="2.5"
            opacity="0.95"
          />

          {/* Nose Cone */}
          <path
            d="M125 95 L145 100 L125 105 Z"
            fill="#60a5fa"
            stroke="#3b82f6"
            strokeWidth="1.5"
          />

          {/* Cockpit */}
          <ellipse
            cx="95"
            cy="100"
            rx="14"
            ry="10"
            fill="#60a5fa"
            opacity="0.7"
            filter="url(#glow)"
          />
          <ellipse
            cx="95"
            cy="100"
            rx="9"
            ry="6"
            fill="#93c5fd"
            opacity="0.9"
            className="animate-pulse"
          />

          {/* Droid Bay */}
          <circle
            cx="75"
            cy="100"
            r="10"
            fill="#dc2626"
            stroke="#ea580c"
            strokeWidth="2"
            opacity="0.95"
          />
          <circle cx="75" cy="97" r="5" fill="#60a5fa" opacity="0.9" />
          <circle
            cx="75"
            cy="97"
            r="2"
            fill="#3b82f6"
            className="animate-pulse"
          />

          {/* Rear Engine */}
          <ellipse
            cx="35"
            cy="100"
            rx="10"
            ry="14"
            fill="#1e40af"
            stroke="#60a5fa"
            strokeWidth="2"
          />
          <circle
            cx="28"
            cy="100"
            r="12"
            fill="url(#engine-glow)"
            filter="url(#glow)"
          />
        </g>

        {/* DETAILS */}
        <line
          x1="50"
          y1="100"
          x2="120"
          y2="100"
          stroke="#3b82f6"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* Weapons */}
        <circle
          cx="140"
          cy="97"
          r="3"
          fill="#dc2626"
          opacity="0.9"
          filter="url(#glow)"
        />
        <circle
          cx="140"
          cy="103"
          r="3"
          fill="#dc2626"
          opacity="0.9"
          filter="url(#glow)"
        />
      </svg>
    );
  }

  if (type === "prompt") {
    // Concept: Command Line Magic / Text Bubble
    return (
      <svg
        viewBox="0 0 200 200"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad-prompt" x1="0" y1="0" x2="200" y2="200">
            <stop stopColor="#f59e0b" />
            <stop offset="1" stopColor="#b91c1c" />
          </linearGradient>
        </defs>

        {/* Terminal Window */}
        <rect
          x="40"
          y="50"
          width="120"
          height="100"
          rx="10"
          fill="#1e293b"
          stroke="url(#grad-prompt)"
          strokeWidth="3"
        />

        {/* Dots */}
        <circle cx="55" cy="65" r="3" fill="#ef4444" />
        <circle cx="65" cy="65" r="3" fill="#f59e0b" />
        <circle cx="75" cy="65" r="3" fill="#22c55e" />

        {/* Code Lines */}
        <path
          d="M60 90 L 90 90"
          stroke="#22c55e"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M60 110 L 140 110"
          stroke="#94a3b8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="4 4"
        />
        <path
          d="M60 130 L 120 130"
          stroke="#94a3b8"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Sparkle */}
        <path
          d="M150 40 L155 50 L165 55 L155 60 L150 70 L145 60 L135 55 L145 50 Z"
          fill="#f59e0b"
        />
      </svg>
    );
  }

  if (type === "engineering") {
    // Concept: Blueprint / Gears / Structure
    return (
      <svg
        viewBox="0 0 200 200"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad-eng" x1="0" y1="0" x2="200" y2="200">
            <stop stopColor="#0ea5e9" />
            <stop offset="1" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        {/* Hexagon Grid */}
        <path
          d="M100 40 L152 70 L152 130 L100 160 L48 130 L48 70 Z"
          stroke="url(#grad-eng)"
          strokeWidth="4"
          fill="url(#grad-eng)"
          fillOpacity="0.1"
        />

        {/* Inner Structure */}
        <path
          d="M100 40 L100 100 L152 130 M100 100 L48 130"
          stroke="url(#grad-eng)"
          strokeWidth="2"
        />
        <circle cx="100" cy="100" r="15" fill="#0ea5e9" />
        <circle cx="100" cy="100" r="8" fill="#ffffff" />
      </svg>
    );
  }

  if (type === "advanced") {
    // Concept: Tesseract / Hypercube / Complexity
    return (
      <svg
        viewBox="0 0 200 200"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad-adv" x1="0" y1="0" x2="200" y2="200">
            <stop stopColor="#ec4899" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Outer Box */}
        <rect
          x="50"
          y="50"
          width="100"
          height="100"
          stroke="url(#grad-adv)"
          strokeWidth="2"
          rx="4"
        />

        {/* Inner Box (Shifted) */}
        <rect
          x="70"
          y="70"
          width="60"
          height="60"
          stroke="#ffffff"
          strokeWidth="2"
          rx="2"
          strokeOpacity="0.5"
        />

        {/* Connections */}
        <path
          d="M50 50 L70 70 M150 50 L130 70 M50 150 L70 130 M150 150 L130 130"
          stroke="url(#grad-adv)"
          strokeWidth="1"
        />

        <circle
          cx="100"
          cy="100"
          r="5"
          fill="#ec4899"
          className="animate-pulse"
        />
      </svg>
    );
  }

  // Default Fallback
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      <rect width="200" height="200" fill="#334155" rx="20" />
      <text x="100" y="100" textAnchor="middle" fill="#ffffff" fontSize="24">
        ?
      </text>
    </svg>
  );
}
