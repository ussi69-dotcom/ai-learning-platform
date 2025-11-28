import React from 'react';
import { Cake, Guitar, Swords, Flame } from 'lucide-react';

interface DifficultyIconProps {
  level: string;
  className?: string;
  size?: number;
}

export default function DifficultyIcon({ level, className = "", size = 20 }: DifficultyIconProps) {
  switch (level) {
    case 'PIECE_OF_CAKE':
      return <Cake size={size} className={`text-pink-500 ${className}`} />;
    case 'LETS_ROCK':
      return <Guitar size={size} className={`text-indigo-500 ${className}`} />;
    case 'COME_GET_SOME':
      return <Swords size={size} className={`text-orange-500 ${className}`} />;
    case 'DAMN_IM_GOOD':
      return <Flame size={size} className={`text-red-600 ${className}`} />;
    default:
      return <Guitar size={size} className={`text-slate-500 ${className}`} />;
  }
}
