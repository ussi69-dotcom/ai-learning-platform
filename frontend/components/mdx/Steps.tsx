"use client";

import React from 'react';
import { Target, Eye, Lightbulb, BookOpen, Briefcase, MessageCircleQuestion } from 'lucide-react';

interface StepsProps {
  children: React.ReactNode;
}

export default function Steps({ children }: StepsProps) {
  const childArray = React.Children.toArray(children);
  let stepCount = 0;
  
  // Helper to get icon based on title
  const getStepIcon = (title: string, count: number) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('action')) return <Target className="w-4 h-4" />;
    if (lowerTitle.includes('observation')) return <Eye className="w-4 h-4" />;
    if (lowerTitle.includes('reflection')) return <Lightbulb className="w-4 h-4" />;
    if (lowerTitle.includes('scenario')) return <BookOpen className="w-4 h-4" />; // Changed to Book (Story/Context)
    if (lowerTitle.includes('your job')) return <Briefcase className="w-4 h-4" />;
    if (lowerTitle.includes('question')) return <MessageCircleQuestion className="w-4 h-4" />;
    
    // Default: Numbered blue badge
    return (
      <div className="w-full h-full rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 flex items-center justify-center">
        <span className="text-sm font-bold">{count}</span>
      </div>
    );
  };

  // Helper to get color based on title (for border and shadow)
  const getStepColor = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('action')) return 'border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-900/20';
    if (lowerTitle.includes('observation')) return 'border-purple-500/20 text-purple-600 dark:text-purple-400 bg-purple-500/10 dark:bg-purple-900/20';
    if (lowerTitle.includes('reflection')) return 'border-amber-500/20 text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-900/20';
    
    // Scenario: Teal/Cyan
    if (lowerTitle.includes('scenario')) return 'border-teal-500/20 text-teal-600 dark:text-teal-400 bg-teal-500/10 dark:bg-teal-900/20';
    
    // Your Job: Orange
    if (lowerTitle.includes('your job')) return 'border-orange-500/20 text-orange-600 dark:text-orange-400 bg-orange-500/10 dark:bg-orange-900/20';
    
    // Question: Indigo (Standard question color)
    if (lowerTitle.includes('question')) return 'border-indigo-500/20 text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-900/20';

    return 'border-slate-500/20 text-slate-600 dark:text-slate-400 bg-slate-500/10 dark:bg-slate-900/20'; // Default for generic steps
  };

  return (
    <div className="my-8 relative">
      {/* Vertical line connecting steps */}
      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-800" />

      {childArray.map((child, index) => {
        if (React.isValidElement(child) && child.type === 'h3') {
          stepCount++;
          const props = child.props as { children?: React.ReactNode };
          const title = String(props.children || '');
          const icon = getStepIcon(title, stepCount);
          const colorClass = getStepColor(title);

          return (
            <div key={index} className="relative flex gap-4 items-start mb-2 mt-6 first:mt-0">
              <div className={`
                relative z-10 flex-shrink-0 w-8 h-8 rounded-full 
                flex items-center justify-center shadow-sm border
                ${colorClass}
              `}>
                {icon}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {props.children}
                </h3>
              </div>
            </div>
          );
        }
        // Render content
        return (
          <div key={index} className="ml-12 prose prose-sm max-w-none dark:prose-invert prose-p:my-2">
            {child}
          </div>
        );
      })}
    </div>
  );
}