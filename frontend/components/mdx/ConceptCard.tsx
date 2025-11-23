"use client";

import React from 'react';
import { BookOpen } from 'lucide-react';

interface ConceptCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function ConceptCard({ title, children, className = "" }: ConceptCardProps) {
  return (
    <div className={`
      group h-full my-6 p-5 rounded-xl
      bg-white/50 dark:bg-white/5 backdrop-blur-xl 
      border border-white/20 dark:border-white/10 border-l-4 border-l-purple-500
      shadow-lg transition-all duration-300 ease-out
      hover:-translate-y-1 hover:shadow-xl hover:bg-white/60 dark:hover:bg-white/10 hover:border-white/30
      ${className}
    `}>
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 pt-0.5">{title}</h4>
      </div>
      <div className="prose prose-sm max-w-none prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:my-2 prose-p:leading-relaxed">
        {children}
      </div>
    </div>
  );
}
