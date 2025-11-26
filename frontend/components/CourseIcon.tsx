"use client";

import React from 'react';

interface CourseIconProps {
  courseId?: number;
  slug?: string;
  className?: string;
}

export default function CourseIcon({ courseId, slug, className = "w-full h-full" }: CourseIconProps) {
  // Logic to map ID or Slug to a visual type
  // Defaults based on current seed data
  // 1: AI Engineering (Deep Dive)
  // 2: Advanced AI (Expert)
  // 3: AI Basics (Beginner)
  // 4: Prompt Engineering (Practical)

  let type = 'default';
  if (slug?.includes('beginner') || courseId === 3) type = 'beginner';
  else if (slug?.includes('prompt') || courseId === 4) type = 'prompt';
  else if (slug?.includes('engineering') || courseId === 1) type = 'engineering';
  else if (slug?.includes('advanced') || courseId === 2) type = 'advanced';

  // --- SVG DEFINITIONS ---

  if (type === 'beginner') {
    // Concept: Glowing Brain / Neural Network Spark
    return (
      <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-beginner" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="glow-beginner">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <g filter="url(#glow-beginner)">
          {/* Brain Outline */}
          <path d="M100 40 C 60 40, 40 70, 40 100 C 40 140, 70 160, 100 160 C 130 160, 160 140, 160 100 C 160 70, 140 40, 100 40" 
                stroke="url(#grad-beginner)" strokeWidth="4" strokeLinecap="round" fill="none" />
          
          {/* Nodes */}
          <circle cx="100" cy="100" r="8" fill="#ffffff" fillOpacity="0.8" />
          <circle cx="70" cy="80" r="5" fill="#3b82f6" />
          <circle cx="130" cy="80" r="5" fill="#8b5cf6" />
          <circle cx="70" cy="120" r="5" fill="#3b82f6" />
          <circle cx="130" cy="120" r="5" fill="#8b5cf6" />
          
          {/* Connections */}
          <path d="M100 100 L70 80 M100 100 L130 80 M100 100 L70 120 M100 100 L130 120" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="2" />
        </g>
      </svg>
    );
  }

  if (type === 'prompt') {
    // Concept: Command Line Magic / Text Bubble
    return (
      <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-prompt" x1="0" y1="0" x2="200" y2="200">
            <stop stopColor="#f59e0b" />
            <stop offset="1" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        
        {/* Terminal Window */}
        <rect x="40" y="50" width="120" height="100" rx="10" fill="#1e293b" stroke="url(#grad-prompt)" strokeWidth="3" />
        
        {/* Dots */}
        <circle cx="55" cy="65" r="3" fill="#ef4444" />
        <circle cx="65" cy="65" r="3" fill="#f59e0b" />
        <circle cx="75" cy="65" r="3" fill="#22c55e" />
        
        {/* Code Lines */}
        <path d="M60 90 L 90 90" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
        <path d="M60 110 L 140 110" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
        <path d="M60 130 L 120 130" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
        
        {/* Sparkle */}
        <path d="M150 40 L155 50 L165 55 L155 60 L150 70 L145 60 L135 55 L145 50 Z" fill="#f59e0b" />
      </svg>
    );
  }

  if (type === 'engineering') {
    // Concept: Blueprint / Gears / Structure
    return (
      <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-eng" x1="0" y1="0" x2="200" y2="200">
            <stop stopColor="#0ea5e9" />
            <stop offset="1" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        
        {/* Hexagon Grid */}
        <path d="M100 40 L152 70 L152 130 L100 160 L48 130 L48 70 Z" stroke="url(#grad-eng)" strokeWidth="4" fill="url(#grad-eng)" fillOpacity="0.1" />
        
        {/* Inner Structure */}
        <path d="M100 40 L100 100 L152 130 M100 100 L48 130" stroke="url(#grad-eng)" strokeWidth="2" />
        <circle cx="100" cy="100" r="15" fill="#0ea5e9" />
        <circle cx="100" cy="100" r="8" fill="#ffffff" />
      </svg>
    );
  }

  if (type === 'advanced') {
    // Concept: Tesseract / Hypercube / Complexity
    return (
      <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-adv" x1="0" y1="0" x2="200" y2="200">
            <stop stopColor="#ec4899" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        
        {/* Outer Box */}
        <rect x="50" y="50" width="100" height="100" stroke="url(#grad-adv)" strokeWidth="2" rx="4" />
        
        {/* Inner Box (Shifted) */}
        <rect x="70" y="70" width="60" height="60" stroke="#ffffff" strokeWidth="2" rx="2" strokeOpacity="0.5" />
        
        {/* Connections */}
        <path d="M50 50 L70 70 M150 50 L130 70 M50 150 L70 130 M150 150 L130 130" stroke="url(#grad-adv)" strokeWidth="1" />
        
        <circle cx="100" cy="100" r="5" fill="#ec4899" className="animate-pulse" />
      </svg>
    );
  }

  // Default Fallback
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      <rect width="200" height="200" fill="#334155" rx="20" />
      <text x="100" y="100" textAnchor="middle" fill="#ffffff" fontSize="24">?</text>
    </svg>
  );
}
