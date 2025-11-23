"use client";

import React from 'react';
import { Info, AlertTriangle, Lightbulb, CheckCircle, Flame } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'success' | 'danger';
  children: React.ReactNode;
}

export default function Callout({ type = 'info', children }: CalloutProps) {
  const styles = {
    info: {
      container: 'bg-blue-50 dark:bg-blue-950/30 border-l-blue-500',
      iconColor: 'text-blue-600 dark:text-blue-400',
      IconComponent: Info
    },
    warning: {
      container: 'bg-amber-50 dark:bg-amber-950/30 border-l-amber-500',
      iconColor: 'text-amber-600 dark:text-amber-400',
      IconComponent: AlertTriangle
    },
    tip: {
      container: 'bg-emerald-50 dark:bg-emerald-950/30 border-l-emerald-500',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      IconComponent: Lightbulb
    },
    success: {
      container: 'bg-green-50 dark:bg-green-950/30 border-l-green-500',
      iconColor: 'text-green-600 dark:text-green-400',
      IconComponent: CheckCircle
    },
    danger: {
      container: 'bg-red-50 dark:bg-red-950/30 border-l-red-600',
      iconColor: 'text-red-600 dark:text-red-400',
      IconComponent: Flame
    }
  };

  const style = styles[type] || styles.info;
  const Icon = style.IconComponent;

  return (
    <div className={`
      ${style.container} 
      border-l-4 rounded-r-xl 
      p-5 mb-6 shadow-sm 
      flex gap-4 items-start 
      transition-transform hover:translate-x-1
    `}>
      <div className={`flex-shrink-0 mt-0.5 ${style.iconColor}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 prose prose-slate dark:prose-invert max-w-none prose-p:my-1 prose-p:leading-relaxed">
        {children}
      </div>
    </div>
  );
}