"use client";

import React from 'react';

interface StepsProps {
  children: React.ReactNode;
}

export default function Steps({ children }: StepsProps) {
  // Extract h3 elements as steps
  const childArray = React.Children.toArray(children);
  let stepCount = 0;
  
  return (
    <div className="my-8 space-y-4">
      {childArray.map((child, index) => {
        if (React.isValidElement(child) && child.type === 'h3') {
          stepCount++;
          const props = child.props as { children?: React.ReactNode };
          return (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shadow-sm border border-blue-500/20 backdrop-blur-md">
                {stepCount}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {props.children}
                </h3>
              </div>
            </div>
          );
        }
        // Render other content (paragraphs, etc.) without step number
        return (
          <div key={index} className="ml-12 prose prose-sm max-w-none dark:prose-invert">
            {child}
          </div>
        );
      })}
    </div>
  );
}
