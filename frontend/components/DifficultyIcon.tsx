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
      return <Cake size={size} className={`text-purple-600 dark:text-red-500 ${className}`} />;
    case 'LETS_ROCK':
      return <Guitar size={size} className={`text-purple-700 dark:text-red-500 ${className}`} />;
    case 'COME_GET_SOME':
      return <Swords size={size} className={`text-purple-800 dark:text-red-500 ${className}`} />;
    case 'DAMN_IM_GOOD':
      return <Flame size={size} className={`text-purple-900 dark:text-red-500 ${className}`} />;
    default:
      return <Guitar size={size} className={`text-slate-500 dark:text-red-500 ${className}`} />;
  }
}
