"use client";

import React from 'react';
import { Info, AlertTriangle, Lightbulb } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip';
  children: React.ReactNode;
}

export default function Callout({ type = 'info', children }: CalloutProps) {
  const styles = {
    info: {
      bg: 'bg-white/5',
      border: 'border-l-4 border-blue-500',
      icon: 'text-blue-400',
      IconComponent: Info
    },
    warning: {
      bg: 'bg-white/5',
      border: 'border-l-4 border-amber-500',
      icon: 'text-amber-400',
      IconComponent: AlertTriangle
    },
    tip: {
      bg: 'bg-white/5',
      border: 'border-l-4 border-emerald-500',
      icon: 'text-emerald-400',
      IconComponent: Lightbulb
    }
  };

  const style = styles[type];
  const Icon = style.IconComponent;

  return (
    <div className={`${style.bg} ${style.border} backdrop-blur-xl border border-white/10 rounded-xl p-4 mb-6 shadow-lg flex gap-3`}>
      <div className="flex-shrink-0 mt-0.5">
        <Icon className={`${style.icon} w-5 h-5`} />
      </div>
      <div className="flex-1 prose prose-sm max-w-none prose-p:my-1 prose-p:leading-relaxed prose-p:text-slate-200">
        {children}
      </div>
    </div>
  );
}
