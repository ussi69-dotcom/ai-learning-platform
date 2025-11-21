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
      bg: 'bg-blue-50/80 border-blue-200',
      icon: 'text-blue-600',
      IconComponent: Info
    },
    warning: {
      bg: 'bg-amber-50/80 border-amber-200',
      icon: 'text-amber-600',
      IconComponent: AlertTriangle
    },
    tip: {
      bg: 'bg-emerald-50/80 border-emerald-200',
      icon: 'text-emerald-600',
      IconComponent: Lightbulb
    }
  };

  const style = styles[type];
  const Icon = style.IconComponent;

  return (
    <div className={`${style.bg} border-2 rounded-xl p-5 mb-6 backdrop-blur-sm shadow-sm flex gap-4`}>
      <div className="flex-shrink-0 mt-0.5">
        <Icon className={`${style.icon} w-6 h-6`} />
      </div>
      <div className="flex-1 prose prose-sm max-w-none prose-p:my-2 prose-p:text-slate-700">
        {children}
      </div>
    </div>
  );
}
