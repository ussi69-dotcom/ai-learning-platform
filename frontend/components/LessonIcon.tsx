"use client";

import React from 'react';

interface LessonIconProps {
  title: string;
  completed?: boolean;
  className?: string;
}

export default function LessonIcon({ title, completed, className = "w-6 h-6" }: LessonIconProps) {
  const lowerTitle = title.toLowerCase();
  
  // Default Color Logic
  const strokeColor = completed ? "#22c55e" : "currentColor";
  const fillColor = completed ? "rgba(34, 197, 94, 0.1)" : "none";

  // --- ICONS ---

  // 1. Introduction / What is AI
  if (lowerTitle.includes('what is') || lowerTitle.includes('intro')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }

  // 2. How AI Learns / Training
  if (lowerTitle.includes('learn') || lowerTitle.includes('training')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    );
  }

  // 3. LLMs / Brain / Neural
  if (lowerTitle.includes('llm') || lowerTitle.includes('mind') || lowerTitle.includes('brain')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    );
  }

  // 4. Prompting / Chat
  if (lowerTitle.includes('prompt') || lowerTitle.includes('talking')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );
  }

  // 5. Dark Side / Safety / Ethics
  if (lowerTitle.includes('dark') || lowerTitle.includes('safety') || lowerTitle.includes('bias')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }

  // 6. At Work / Enterprise
  if (lowerTitle.includes('work') || lowerTitle.includes('enterprise') || lowerTitle.includes('business')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    );
  }

  // 7. Summary / Trophy
  if (lowerTitle.includes('summary') || lowerTitle.includes('final') || lowerTitle.includes('next')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    );
  }

  // Default: Play Button
  return (
    <svg viewBox="0 0 24 24" className={className} fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}
