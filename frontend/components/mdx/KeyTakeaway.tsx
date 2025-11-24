import React from 'react';

interface KeyTakeawayProps {
  icon: string;
  title: string;
  children: React.ReactNode;
  color?: 'green' | 'purple' | 'orange' | 'indigo' | 'slate';
}

export default function KeyTakeaway({ icon, title, children, color = 'slate' }: KeyTakeawayProps) {
  const colorMap = {
    green: {
      bg: 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800',
      border: 'border-green-200 dark:border-green-900/30',
      text: 'text-green-800 dark:text-green-400'
    },
    purple: {
      bg: 'bg-gradient-to-r from-purple-50 to-violet-50 dark:from-slate-900 dark:to-slate-800',
      border: 'border-purple-200 dark:border-purple-900/30',
      text: 'text-purple-800 dark:text-purple-400'
    },
    orange: {
      bg: 'bg-gradient-to-r from-orange-50 to-red-50 dark:from-slate-900 dark:to-slate-800',
      border: 'border-orange-200 dark:border-orange-900/30',
      text: 'text-orange-800 dark:text-orange-400'
    },
    indigo: {
      bg: 'bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-slate-800',
      border: 'border-indigo-200 dark:border-indigo-900/30',
      text: 'text-indigo-800 dark:text-indigo-400'
    },
    slate: {
      bg: 'bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900 dark:to-slate-800',
      border: 'border-slate-300 dark:border-slate-700',
      text: 'text-slate-800 dark:text-slate-300'
    }
  };

  const styles = colorMap[color];

  return (
    <div className={`flex items-start gap-4 p-6 rounded-2xl border-2 ${styles.bg} ${styles.border} mb-4`}>
      <span className="text-4xl">{icon}</span>
      <div>
        <strong className={styles.text}>{title}:</strong> {children}
      </div>
    </div>
  );
}
