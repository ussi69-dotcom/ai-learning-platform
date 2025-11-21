"use client";

import React from 'react';
import { BookOpen } from 'lucide-react';

interface ConceptCardProps {
  title: string;
  children: React.ReactNode;
}

export default function ConceptCard({ title, children }: ConceptCardProps) {
  return (
    <div className="my-6 bg-white/5 backdrop-blur-xl border border-white/10 border-l-4 border-l-purple-500 rounded-xl p-5 shadow-lg">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-400/30 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-purple-400" />
        </div>
        <h4 className="text-lg font-bold text-slate-100 pt-0.5">{title}</h4>
      </div>
      <div className="prose prose-sm max-w-none prose-p:text-slate-200 prose-p:my-2 prose-p:leading-relaxed">
        {children}
      </div>
    </div>
  );
}
