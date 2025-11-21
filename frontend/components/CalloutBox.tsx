import React from 'react';

type CalloutType = 'tip' | 'warning' | 'note' | 'success' | 'exercise';

interface CalloutBoxProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutStyles: Record<CalloutType, { bg: string; border: string; text: string; icon: string }> = {
  tip: {
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    text: 'text-blue-900',
    icon: '💡'
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-500',
    text: 'text-yellow-900',
    icon: '⚠️'
  },
  note: {
    bg: 'bg-slate-50',
    border: 'border-slate-500',
    text: 'text-slate-900',
    icon: '📝'
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-500',
    text: 'text-green-900',
    icon: '✅'
  },
  exercise: {
    bg: 'bg-purple-50',
    border: 'border-purple-500',
    text: 'text-purple-900',
    icon: '🎯'
  }
};

export default function CalloutBox({ type, title, children }: CalloutBoxProps) {
  const styles = calloutStyles[type];

  return (
    <div className={`${styles.bg} ${styles.text} border-l-4 ${styles.border} rounded-r-lg p-6 my-6 shadow-sm`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{styles.icon}</span>
        <div className="flex-1">
          {title && (
            <div className="font-bold text-lg mb-2">
              {title}
            </div>
          )}
          <div className="prose prose-sm max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
