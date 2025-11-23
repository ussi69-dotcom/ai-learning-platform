"use client";

import React, { useState } from 'react';

interface ConceptCardProps {
  title: string;
  icon: string;
  difficulty?: 'Beginner' | 'Builder' | 'Expert' | 'Architect';
  jediQuote?: string;
  sithQuote?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ConceptCard({ 
  title, 
  icon, 
  difficulty = 'Beginner', 
  jediQuote, 
  sithQuote, 
  children, 
  className = "" 
}: ConceptCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Difficulty Color Mapping
  const difficultyColors = {
    Beginner: { border: 'border-green-500', bg: 'bg-green-50', text: 'text-green-700', darkBorder: 'dark:border-green-600' },
    Builder: { border: 'border-blue-500', bg: 'bg-blue-50', text: 'text-blue-700', darkBorder: 'dark:border-blue-600' },
    Expert: { border: 'border-purple-500', bg: 'bg-purple-50', text: 'text-purple-700', darkBorder: 'dark:border-purple-600' },
    Architect: { border: 'border-red-500', bg: 'bg-red-50', text: 'text-red-700', darkBorder: 'dark:border-red-600' },
  };

  const colors = difficultyColors[difficulty] || difficultyColors.Beginner;

  return (
    <div 
      className={`
        group relative h-full my-6 p-6 rounded-2xl
        bg-white dark:bg-slate-800 
        border-2 ${colors.border} ${colors.darkBorder}
        shadow-lg hover:shadow-2xl hover:scale-[1.02]
        transition-all duration-300 ease-out
        flex flex-col
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Difficulty Badge (Top Right) */}
      <div className={`
        absolute -top-3 -right-3 
        px-3 py-1 rounded-full 
        bg-white dark:bg-slate-900 border-2 ${colors.border}
        shadow-sm text-xs font-bold uppercase tracking-wider
        ${colors.text}
      `}>
        {difficulty}
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="text-4xl filter drop-shadow-md transition-transform group-hover:scale-110 duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
          {title}
        </h3>
      </div>

      {/* Content */}
      <div className="flex-1 prose prose-sm max-w-none prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed">
        {children}
      </div>

      {/* Easter Egg Quote (Bottom) */}
      <div className={`
        mt-6 pt-4 border-t border-slate-100 dark:border-slate-700
        text-xs font-medium italic text-center
        transition-opacity duration-500
        ${isHovered ? 'opacity-100' : 'opacity-60'}
      `}>
        <span className="block dark:hidden text-slate-500">
          "{jediQuote || "Knowledge is power."}"
        </span>
        <span className="hidden dark:block text-red-400">
          "{sithQuote || "Power is everything."}"
        </span>
      </div>
    </div>
  );
}