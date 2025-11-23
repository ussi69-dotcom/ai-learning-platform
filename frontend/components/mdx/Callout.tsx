"use client";

import React from 'react';
import { Info, AlertTriangle, Lightbulb, CheckCircle } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'success';
  children: React.ReactNode;
}

export default function Callout({ type = 'info', children }: CalloutProps) {
  const styles = {
    info: {
      container: 'bg-blue-500/5 border-blue-500/20 text-blue-900 dark:text-blue-100',
      icon: 'text-blue-500',
      IconComponent: Info
    },
    warning: {
      container: 'bg-amber-500/5 border-amber-500/20 text-amber-900 dark:text-amber-100',
      icon: 'text-amber-500',
      IconComponent: AlertTriangle
    },
    tip: {
      container: 'bg-emerald-500/5 border-emerald-500/20 text-emerald-900 dark:text-emerald-100',
      icon: 'text-emerald-500',
      IconComponent: Lightbulb
    },
    success: {
      container: 'bg-green-500/5 border-green-500/20 text-green-900 dark:text-green-100',
      icon: 'text-green-500',
      IconComponent: CheckCircle
    }
  };

  const style = styles[type] || styles.info;
  const Icon = style.IconComponent;

  return (
    <div className={`${style.container} backdrop-blur-xl border rounded-xl p-5 mb-6 shadow-sm flex gap-4 items-start transition-all hover:shadow-md`}>
      <div className="flex-shrink-0 mt-0.5 p-2 bg-white/50 dark:bg-slate-900/50 rounded-lg border border-white/20 shadow-sm">
        <Icon className={`${style.icon} w-5 h-5`} />
      </div>
      <div className="flex-1 prose prose-sm max-w-none prose-p:my-1 prose-p:leading-relaxed prose-strong:font-bold">
        {children}
      </div>
    </div>
  );
}
