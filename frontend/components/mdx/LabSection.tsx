"use client";

import React, { useState } from 'react';
import { Check, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LabBadge from './LabBadge'; // We will create this next

interface LabSectionProps {
  title: string;
  difficulty?: string;
  children: React.ReactNode;
}

export default function LabSection({ title, difficulty = "Builder", children }: LabSectionProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  const handleComplete = () => {
    if (!isCompleted) {
      setIsCompleted(true);
      setShowBadge(true);
      // TODO: Trigger XP gain or API call here
    }
  };

  return (
    <div className="my-10 relative">
      {/* Lab Container */}
      <div className={`
        relative overflow-hidden rounded-3xl
        bg-white dark:bg-slate-800
        border-2 ${isCompleted ? 'border-green-500 dark:border-green-500' : 'border-indigo-200 dark:border-indigo-800'}
        shadow-xl transition-all duration-500
        ${isCompleted ? 'shadow-green-500/20' : 'shadow-indigo-500/10'}
      `}>
        
        {/* Header */}
        <div className={`
          p-6 flex items-center justify-between
          border-b ${isCompleted ? 'bg-green-50 dark:bg-green-900/20 border-green-100' : 'bg-slate-50 dark:bg-slate-900/50 border-slate-100'}
        `}>
          <div className="flex items-center gap-3">
            <div className={`
              w-10 h-10 rounded-xl flex items-center justify-center
              ${isCompleted ? 'bg-green-500 text-white' : 'bg-indigo-600 text-white'}
              shadow-lg
            `}>
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Interactive Lab</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
            </div>
          </div>
          
          {isCompleted && (
            <div className="flex items-center gap-2 text-green-600 font-bold bg-white px-3 py-1 rounded-full shadow-sm">
              <Check className="w-4 h-4" />
              Completed
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* We wrap children to style ordered lists as steps */}
          <div className="prose prose-lg max-w-none dark:prose-invert
            prose-ol:list-none prose-ol:pl-0 prose-ol:space-y-8
            prose-li:relative prose-li:pl-12
            prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-0
            prose-li:before:w-8 prose-li:before:h-8 prose-li:before:bg-indigo-100 prose-li:before:dark:bg-indigo-900
            prose-li:before:text-indigo-700 prose-li:before:dark:text-indigo-300
            prose-li:before:rounded-full prose-li:before:flex prose-li:before:items-center prose-li:before:justify-center
            prose-li:before:font-bold prose-li:before:content-[counter(list-item)]
            prose-pre:bg-slate-900 prose-pre:border-2 prose-pre:border-slate-800
          ">
            {children}
          </div>
        </div>

        {/* Footer / Action */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <Button 
            size="lg"
            onClick={handleComplete}
            disabled={isCompleted}
            className={`
              font-bold text-base px-8 h-12 transition-all
              ${isCompleted 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5'
              }
            `}
          >
            {isCompleted ? 'Lab Completed!' : 'I Finished This Lab'}
          </Button>
        </div>
      </div>

      {/* Celebration Modal */}
      {showBadge && (
        <LabBadge 
          title={title} 
          onClose={() => setShowBadge(false)} 
        />
      )}
    </div>
  );
}