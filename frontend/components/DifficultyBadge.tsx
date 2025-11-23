"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';

export default function DifficultyBadge() {
  const { user } = useAuth();

  if (!user) return null;

  const config = {
    PIECE_OF_CAKE: { label: 'Beginner', color: 'bg-green-100 text-green-700 border-green-200', icon: '🍰' },
    LETS_ROCK: { label: 'Builder', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: '🎸' },
    COME_GET_SOME: { label: 'Expert', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: '💪' },
    DAMN_IM_GOOD: { label: 'Architect', color: 'bg-red-100 text-red-700 border-red-200', icon: '🔥' },
  };

  // Fallback for string matching if API returns different case/format
  const diffKey = user.difficulty as keyof typeof config;
  const current = config[diffKey] || config.PIECE_OF_CAKE;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-700 delay-100">
      <div className={`
        flex items-center gap-2 px-4 py-2 rounded-full border-2 shadow-lg backdrop-blur-md
        ${current.color}
      `}>
        <span className="text-lg">{current.icon}</span>
        <span className="font-bold text-sm uppercase tracking-wide">{current.label}</span>
      </div>
    </div>
  );
}
