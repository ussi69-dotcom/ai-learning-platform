"use client";

import React, { useState } from "react";
import {
  User,
  Zap,
  Sun,
  Shield,
  Sword,
  Ghost,
  Flame,
  Skull,
  Bot,
  Cpu,
  Terminal,
  Database,
  Glasses,
  Radio,
  Rocket,
  Gamepad,
  Headphones,
  Crown,
  Gem,
  Star,
  Trophy,
  Medal,
  Atom,
  Biohazard,
  Radiation,
  Hexagon,
  Triangle,
  Eye,
  Anchor,
  Truck,
  Car,
  Bike,
  Plane,
  Monitor,
  Compass,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- AVATAR DATA ---

type AvatarType = "ICON" | "IMAGE";

interface AvatarDef {
  id: string;
  type: AvatarType;
  icon?: LucideIcon; // Lucide Icon
  src?: string; // Image URL
  color?: string; // Solid color for ICON (replacing gradient for compatibility)
  bg: string; // Tailwind class for background
  label: string;
}

const ROBOT_SEEDS = [
  "Felix",
  "Aneka",
  "Zoe",
  "Caleb",
  "Nala",
  "Jasper",
  "Milo",
  "Luna",
  "Leo",
  "Max",
  "Oliver",
  "Charlie",
  "Bubba",
  "Sparks",
  "Circuit",
  "Glitch",
  "Vortex",
  "Titan",
];

// Generator for Droid Avatars (DiceBear)
const droids: AvatarDef[] = ROBOT_SEEDS.map((seed, i) => ({
  id: `droid_${i}`,
  type: "IMAGE",
  src: `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${seed}`,
  bg: "bg-slate-100 dark:bg-slate-800",
  label: `Droid ${seed}`,
}));

export const AVATARS: AvatarDef[] = [
  // --- DROIDS (Complex Images) ---
  ...droids,

  // --- JEDI (Blue/Light Theme) ---
  {
    id: "jedi_1",
    type: "ICON",
    icon: User,
    color: "#60a5fa",
    bg: "bg-blue-500/10",
    label: "Padawan",
  },
  {
    id: "jedi_2",
    type: "ICON",
    icon: Zap,
    color: "#60a5fa",
    bg: "bg-blue-500/10",
    label: "Force",
  },
  {
    id: "jedi_3",
    type: "ICON",
    icon: Sun,
    color: "#facc15",
    bg: "bg-yellow-500/10",
    label: "Light",
  },
  {
    id: "jedi_4",
    type: "ICON",
    icon: Shield,
    color: "#06b6d4",
    bg: "bg-cyan-500/10",
    label: "Guardian",
  },
  {
    id: "jedi_5",
    type: "ICON",
    icon: Star,
    color: "#0ea5e9",
    bg: "bg-sky-500/10",
    label: "Hope",
  },
  {
    id: "jedi_6",
    type: "ICON",
    icon: Eye,
    color: "#6366f1",
    bg: "bg-indigo-500/10",
    label: "Seer",
  },
  {
    id: "jedi_7",
    type: "ICON",
    icon: Compass,
    color: "#3b82f6",
    bg: "bg-blue-500/10",
    label: "Wayfinder",
  },

  // --- SITH (Red/Dark Theme) ---
  {
    id: "sith_1",
    type: "ICON",
    icon: Ghost,
    color: "#ef4444",
    bg: "bg-red-500/10",
    label: "Phantom",
  },
  {
    id: "sith_2",
    type: "ICON",
    icon: Flame,
    color: "#dc2626",
    bg: "bg-red-500/10",
    label: "Lord",
  },
  {
    id: "sith_3",
    type: "ICON",
    icon: Skull,
    color: "#78716c",
    bg: "bg-stone-500/10",
    label: "Death",
  },
  {
    id: "sith_4",
    type: "ICON",
    icon: Sword,
    color: "#dc2626",
    bg: "bg-red-600/10",
    label: "Saber",
  },
  {
    id: "sith_5",
    type: "ICON",
    icon: Biohazard,
    color: "#84cc16",
    bg: "bg-lime-500/10",
    label: "Toxic",
  },
  {
    id: "sith_6",
    type: "ICON",
    icon: Radiation,
    color: "#b91c1c",
    bg: "bg-red-700/10",
    label: "Hazard",
  },
  {
    id: "sith_7",
    type: "ICON",
    icon: Triangle,
    color: "#ef4444",
    bg: "bg-red-500/10",
    label: "Empire",
  },

  // --- CYBERPUNK (Neon Theme) ---
  {
    id: "cyber_1",
    type: "ICON",
    icon: Glasses,
    color: "#d946ef",
    bg: "bg-fuchsia-500/10",
    label: "Hacker",
  },
  {
    id: "cyber_2",
    type: "ICON",
    icon: Radio,
    color: "#8b5cf6",
    bg: "bg-violet-500/10",
    label: "Signal",
  },
  {
    id: "cyber_3",
    type: "ICON",
    icon: Rocket,
    color: "#ef4444",
    bg: "bg-red-500/10",
    label: "Ship",
  },
  {
    id: "cyber_4",
    type: "ICON",
    icon: Terminal,
    color: "#64748b",
    bg: "bg-slate-500/10",
    label: "Console",
  },
  {
    id: "cyber_5",
    type: "ICON",
    icon: Gamepad,
    color: "#6366f1",
    bg: "bg-indigo-500/10",
    label: "Player",
  },
  {
    id: "cyber_6",
    type: "ICON",
    icon: Headphones,
    color: "#f43f5e",
    bg: "bg-rose-500/10",
    label: "Audio",
  },
  {
    id: "cyber_7",
    type: "ICON",
    icon: Hexagon,
    color: "#7c3aed",
    bg: "bg-violet-600/10",
    label: "Node",
  },
  {
    id: "cyber_8",
    type: "ICON",
    icon: Atom,
    color: "#06b6d4",
    bg: "bg-cyan-500/10",
    label: "Core",
  },

  // --- VEHICLES & TECH (Tech Theme) ---
  {
    id: "tech_1",
    type: "ICON",
    icon: Plane,
    color: "#64748b",
    bg: "bg-slate-500/10",
    label: "Fighter",
  },
  {
    id: "tech_2",
    type: "ICON",
    icon: Truck,
    color: "#64748b",
    bg: "bg-slate-500/10",
    label: "Hauler",
  },
  {
    id: "tech_3",
    type: "ICON",
    icon: Car,
    color: "#64748b",
    bg: "bg-slate-500/10",
    label: "Speeder",
  },
  {
    id: "tech_4",
    type: "ICON",
    icon: Bike,
    color: "#64748b",
    bg: "bg-slate-500/10",
    label: "Bike",
  },
  {
    id: "tech_5",
    type: "ICON",
    icon: Anchor,
    color: "#3b82f6",
    bg: "bg-blue-500/10",
    label: "Fleet",
  },
  {
    id: "tech_6",
    type: "ICON",
    icon: Cpu,
    color: "#10b981",
    bg: "bg-emerald-500/10",
    label: "Chip",
  },
  {
    id: "tech_7",
    type: "ICON",
    icon: Database,
    color: "#3b82f6",
    bg: "bg-blue-500/10",
    label: "Data",
  },
  {
    id: "tech_8",
    type: "ICON",
    icon: Monitor,
    color: "#64748b",
    bg: "bg-slate-500/10",
    label: "Screen",
  },

  // --- RANKS (Gold Theme) ---
  {
    id: "rank_1",
    type: "ICON",
    icon: Crown,
    color: "#fbbf24",
    bg: "bg-yellow-500/20",
    label: "King",
  },
  {
    id: "rank_2",
    type: "ICON",
    icon: Gem,
    color: "#06b6d4",
    bg: "bg-cyan-500/20",
    label: "Diamond",
  },
  {
    id: "rank_3",
    type: "ICON",
    icon: Trophy,
    color: "#f59e0b",
    bg: "bg-amber-500/20",
    label: "Champ",
  },
  {
    id: "rank_4",
    type: "ICON",
    icon: Medal,
    color: "#64748b",
    bg: "bg-slate-500/20",
    label: "Vet",
  },
];

// Helper to get Avatar object
export const getAvatar = (id: string) => {
  return AVATARS.find((a) => a.id === id) || AVATARS[0];
};

// --- HELPER COMPONENT FOR SAFE IMAGE LOADING ---
const SafeAvatarImage = ({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return <Bot className={cn(className, "text-primary/50")} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

interface AvatarSelectorProps {
  selectedAvatar: string;
  onSelect: (avatarId: string) => void;
}

export default function AvatarSelector({
  selectedAvatar,
  onSelect,
}: AvatarSelectorProps) {
  return (
    <div className="relative w-full min-h-[200px]">
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2 p-3 max-h-[350px] overflow-y-auto">
        {AVATARS.map((avatar) => {
          const isSelected = selectedAvatar === avatar.id;

          return (
            <button
              type="button"
              key={avatar.id}
              onClick={() => onSelect(avatar.id)}
              className={cn(
                "flex items-center justify-center rounded-lg transition-all duration-150 aspect-square p-1",
                isSelected
                  ? `ring-2 ring-primary ring-offset-2 ${avatar.bg}`
                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
              title={avatar.label}
            >
              {avatar.type === "IMAGE" ? (
                <SafeAvatarImage
                  src={avatar.src}
                  alt={avatar.label}
                  className="w-full h-full object-contain"
                />
              ) : (
                avatar.icon && (
                  <avatar.icon
                    className="w-full h-full p-0.5"
                    stroke={avatar.color || "currentColor"}
                    strokeWidth={1.5}
                    fill={avatar.color ? `${avatar.color}30` : "none"}
                  />
                )
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
