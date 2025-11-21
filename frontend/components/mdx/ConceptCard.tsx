"use client";

import React from 'react';
import { BookOpen } from 'lucide-react';

interface ConceptCardProps {
  title: string;
  children: React.ReactNode;
}

export default function ConceptCard({ title, children }: ConceptCardProps) {
  return (
    <div className="my-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <h4 className="text-lg font-bold text-slate-900 pt-0.5">{title}</h4>
      </div>
      <div className="prose prose-sm max-w-none prose-p:text-slate-700 prose-p:my-2">
        {children}
      </div>
    </div>
  );
}
