"use client";

import React from 'react';
import { Target, Eye, Lightbulb, CheckCircle2 } from 'lucide-react';

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
    return <span className="text-sm font-bold">{count}</span>;
  };

  // Helper to get color based on title
  const getStepColor = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('action')) return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    if (lowerTitle.includes('observation')) return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
    if (lowerTitle.includes('reflection')) return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
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
                flex items-center justify-center shadow-sm border backdrop-blur-md
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
