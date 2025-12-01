"use client";

import React from 'react';
import { 
  User, Zap, Sun, Shield, Sword, Ghost, Flame, Skull, 
  Bot, Cpu, Brain, Code, Terminal, Database, Globe, 
  Glasses, Radio, Rocket, Gamepad, Headphones, 
  Cat, Dog, Fish, Bird, Bug, 
  Crown, Gem, Star, Heart, Trophy, Medal,
  Atom, Biohazard, Radiation, Hexagon, Triangle, Circle,
  CloudLightning, Wind, Droplets, Snowflake,
  Eye, Smile, Frown, Meh,
  Anchor, Truck, Car, Bike, Plane,
  Hammer, Wrench, Key, Settings,
  Monitor, Smartphone, Tablet, Tv,
  Search, Map, Navigation, Compass
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- GRADIENT DEFINITIONS ---
// We define SVG gradients hiddenly, and reference them in the icons using stroke="url(#id)"
// We define SVG gradients hiddenly, and reference them in the icons using stroke="url(#id)"
export const GradientDefs = () => (
  <svg width="0" height="0" className="absolute pointer-events-none opacity-0" aria-hidden="true">
    <defs>
      <linearGradient id="grad-jedi" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" /> {/* blue-400 */}
        <stop offset="100%" stopColor="#ffffff" /> {/* white */}
      </linearGradient>
      <linearGradient id="grad-sith" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" /> {/* red-500 */}
        <stop offset="100%" stopColor="#f59e0b" /> {/* orange-400 */}
      </linearGradient>
      <linearGradient id="grad-cyber" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d946ef" /> {/* fuchsia-500 */}
        <stop offset="100%" stopColor="#06b6d4" /> {/* cyan-500 */}
      </linearGradient>
      <linearGradient id="grad-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" /> {/* amber-400 */}
        <stop offset="100%" stopColor="#fef3c7" /> {/* amber-100 */}
      </linearGradient>
      <linearGradient id="grad-tech" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" /> {/* emerald-500 */}
        <stop offset="100%" stopColor="#3b82f6" /> {/* blue-500 */}
      </linearGradient>
    </defs>
  </svg>
);

// --- AVATAR DATA ---

type AvatarType = 'ICON' | 'IMAGE';

interface AvatarDef {
  id: string;
  type: AvatarType;
  icon?: any; // Lucide Icon
  src?: string; // Image URL
  gradient?: string; // ID of gradient for ICON
  bg: string; // Tailwind class for background
  label: string;
}

const ROBOT_SEEDS = [
  'Felix', 'Aneka', 'Zoe', 'Caleb', 'Nala', 'Jasper', 
  'Milo', 'Luna', 'Leo', 'Max', 'Oliver', 'Charlie',
  'Bubba', 'Sparks', 'Circuit', 'Glitch', 'Vortex', 'Titan'
];

// Generator for Droid Avatars (DiceBear)
const droids: AvatarDef[] = ROBOT_SEEDS.map((seed, i) => ({
  id: `droid_${i}`,
  type: 'IMAGE',
  src: `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${seed}`,
  bg: 'bg-slate-100 dark:bg-slate-800',
  label: `Droid ${seed}`
}));

export const AVATARS: AvatarDef[] = [
  // --- DROIDS (Complex Images) ---
  ...droids,

  // --- JEDI (Gradient Icons) ---
  { id: 'jedi_1', type: 'ICON', icon: User, gradient: 'url(#grad-jedi)', bg: 'bg-blue-500/10', label: 'Padawan' },
  { id: 'jedi_2', type: 'ICON', icon: Zap, gradient: 'url(#grad-jedi)', bg: 'bg-blue-500/10', label: 'Force' },
  { id: 'jedi_3', type: 'ICON', icon: Sun, gradient: 'url(#grad-jedi)', bg: 'bg-yellow-500/10', label: 'Light' },
  { id: 'jedi_4', type: 'ICON', icon: Shield, gradient: 'url(#grad-jedi)', bg: 'bg-cyan-500/10', label: 'Guardian' },
  { id: 'jedi_5', type: 'ICON', icon: Star, gradient: 'url(#grad-jedi)', bg: 'bg-sky-500/10', label: 'Hope' },
  { id: 'jedi_6', type: 'ICON', icon: Eye, gradient: 'url(#grad-jedi)', bg: 'bg-indigo-500/10', label: 'Seer' },
  { id: 'jedi_7', type: 'ICON', icon: Compass, gradient: 'url(#grad-jedi)', bg: 'bg-blue-500/10', label: 'Wayfinder' },

  // --- SITH (Gradient Icons) ---
  { id: 'sith_1', type: 'ICON', icon: Ghost, gradient: 'url(#grad-sith)', bg: 'bg-red-500/10', label: 'Phantom' },
  { id: 'sith_2', type: 'ICON', icon: Flame, gradient: 'url(#grad-sith)', bg: 'bg-orange-500/10', label: 'Lord' },
  { id: 'sith_3', type: 'ICON', icon: Skull, gradient: 'url(#grad-sith)', bg: 'bg-stone-500/10', label: 'Death' },
  { id: 'sith_4', type: 'ICON', icon: Sword, gradient: 'url(#grad-sith)', bg: 'bg-red-600/10', label: 'Saber' },
  { id: 'sith_5', type: 'ICON', icon: Biohazard, gradient: 'url(#grad-sith)', bg: 'bg-lime-500/10', label: 'Toxic' },
  { id: 'sith_6', type: 'ICON', icon: Radiation, gradient: 'url(#grad-sith)', bg: 'bg-yellow-600/10', label: 'Hazard' },
  { id: 'sith_7', type: 'ICON', icon: Triangle, gradient: 'url(#grad-sith)', bg: 'bg-red-500/10', label: 'Empire' },

  // --- CYBERPUNK (Gradient Icons) ---
  { id: 'cyber_1', type: 'ICON', icon: Glasses, gradient: 'url(#grad-cyber)', bg: 'bg-fuchsia-500/10', label: 'Hacker' },
  { id: 'cyber_2', type: 'ICON', icon: Radio, gradient: 'url(#grad-cyber)', bg: 'bg-violet-500/10', label: 'Signal' },
  { id: 'cyber_3', type: 'ICON', icon: Rocket, gradient: 'url(#grad-cyber)', bg: 'bg-orange-500/10', label: 'Ship' },
  { id: 'cyber_4', type: 'ICON', icon: Terminal, gradient: 'url(#grad-cyber)', bg: 'bg-slate-500/10', label: 'Console' },
  { id: 'cyber_5', type: 'ICON', icon: Gamepad, gradient: 'url(#grad-cyber)', bg: 'bg-indigo-500/10', label: 'Player' },
  { id: 'cyber_6', type: 'ICON', icon: Headphones, gradient: 'url(#grad-cyber)', bg: 'bg-rose-500/10', label: 'Audio' },
  { id: 'cyber_7', type: 'ICON', icon: Hexagon, gradient: 'url(#grad-cyber)', bg: 'bg-purple-500/10', label: 'Node' },
  { id: 'cyber_8', type: 'ICON', icon: Atom, gradient: 'url(#grad-cyber)', bg: 'bg-cyan-500/10', label: 'Core' },

  // --- VEHICLES & TECH (Tech Gradient) ---
  { id: 'tech_1', type: 'ICON', icon: Plane, gradient: 'url(#grad-tech)', bg: 'bg-slate-500/10', label: 'Fighter' },
  { id: 'tech_2', type: 'ICON', icon: Truck, gradient: 'url(#grad-tech)', bg: 'bg-slate-500/10', label: 'Hauler' },
  { id: 'tech_3', type: 'ICON', icon: Car, gradient: 'url(#grad-tech)', bg: 'bg-slate-500/10', label: 'Speeder' },
  { id: 'tech_4', type: 'ICON', icon: Bike, gradient: 'url(#grad-tech)', bg: 'bg-slate-500/10', label: 'Bike' },
  { id: 'tech_5', type: 'ICON', icon: Anchor, gradient: 'url(#grad-tech)', bg: 'bg-blue-500/10', label: 'Fleet' },
  { id: 'tech_6', type: 'ICON', icon: Cpu, gradient: 'url(#grad-tech)', bg: 'bg-emerald-500/10', label: 'Chip' },
  { id: 'tech_7', type: 'ICON', icon: Database, gradient: 'url(#grad-tech)', bg: 'bg-blue-500/10', label: 'Data' },
  { id: 'tech_8', type: 'ICON', icon: Monitor, gradient: 'url(#grad-tech)', bg: 'bg-slate-500/10', label: 'Screen' },

  // --- RANKS (Gold Gradient) ---
  { id: 'rank_1', type: 'ICON', icon: Crown, gradient: 'url(#grad-gold)', bg: 'bg-yellow-500/20', label: 'King' },
  { id: 'rank_2', type: 'ICON', icon: Gem, gradient: 'url(#grad-cyber)', bg: 'bg-cyan-500/20', label: 'Diamond' },
  { id: 'rank_3', type: 'ICON', icon: Trophy, gradient: 'url(#grad-gold)', bg: 'bg-amber-500/20', label: 'Champ' },
  { id: 'rank_4', type: 'ICON', icon: Medal, gradient: 'url(#grad-gold)', bg: 'bg-slate-500/20', label: 'Vet' },
];

// Helper to get Avatar object
export const getAvatar = (id: string) => {
  return AVATARS.find(a => a.id === id) || AVATARS[0];
};

interface AvatarSelectorProps {
  selectedAvatar: string;
  onSelect: (avatarId: string) => void;
}

export default function AvatarSelector({ selectedAvatar, onSelect }: AvatarSelectorProps) {
  return (
    <div className="relative">
      {/* Inject Gradient Definitions once */}
      <GradientDefs />
      
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 p-2 max-h-[400px] overflow-y-auto scrollbar-thin">
        {AVATARS.map((avatar) => {
          const isSelected = selectedAvatar === avatar.id;

          return (
            <button
              type="button"
              key={avatar.id}
              onClick={() => onSelect(avatar.id)}
              className={cn(
                "group flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 border-2 aspect-square relative overflow-hidden",
                isSelected 
                  ? `border-primary scale-110 shadow-lg ${avatar.bg}` 
                  : "border-transparent hover:bg-muted hover:border-muted-foreground/20 hover:scale-105"
              )}
              title={avatar.label}
            >
              {avatar.type === 'IMAGE' ? (
                <img 
                  src={avatar.src} 
                  alt={avatar.label} 
                  className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" 
                />
              ) : (
                <avatar.icon 
                  className="w-8 h-8 group-hover:scale-110 transition-transform" 
                  style={{ stroke: avatar.gradient, strokeWidth: 2 }} // Apply gradient stroke
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
