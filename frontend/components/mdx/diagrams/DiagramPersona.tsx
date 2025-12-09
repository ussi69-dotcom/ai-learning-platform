'use client';

import React from 'react';

interface SystemPromptDiagramProps {
  className?: string;
}

export function SystemPromptDiagram({ className = '' }: SystemPromptDiagramProps) {
  return (
    <svg
      viewBox="0 0 800 300"
      className={`w-full h-auto ${className}`}
      aria-label="System Prompt Flow: Base Model to Persona"
    >
      {/* Background gradient definitions */}
      <defs>
        {/* Base Model gradient - blue */}
        <linearGradient id="baseModelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" className="[stop-color:#3b82f6]" />
          <stop offset="100%" className="[stop-color:#1d4ed8]" />
        </linearGradient>
        
        {/* System Prompt gradient - purple */}
        <linearGradient id="systemPromptGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" className="[stop-color:#8b5cf6]" />
          <stop offset="100%" className="[stop-color:#6d28d9]" />
        </linearGradient>
        
        {/* Persona gradient - amber/gold */}
        <linearGradient id="personaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" className="[stop-color:#f59e0b]" />
          <stop offset="100%" className="[stop-color:#d97706]" />
        </linearGradient>

        {/* Arrow gradient */}
        <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" className="[stop-color:#64748b] dark:[stop-color:#94a3b8]" />
          <stop offset="100%" className="[stop-color:#475569] dark:[stop-color:#cbd5e1]" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Drop shadow */}
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Connection arrows */}
      <g className="fill-slate-400 dark:fill-slate-500">
        {/* Arrow 1: Base Model -> System Prompt */}
        <path
          d="M 230 150 L 290 150"
          className="stroke-slate-400 dark:stroke-slate-500"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          markerEnd="url(#arrowhead)"
        />
        
        {/* Arrow 2: System Prompt -> Persona */}
        <path
          d="M 510 150 L 570 150"
          className="stroke-slate-400 dark:stroke-slate-500"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          markerEnd="url(#arrowhead)"
        />

        {/* Arrowhead marker */}
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            className="fill-slate-400 dark:fill-slate-500"
          />
        </marker>
      </g>

      {/* Plus signs on arrows */}
      <g className="fill-slate-500 dark:fill-slate-400">
        <text x="260" y="140" fontSize="20" fontWeight="bold" textAnchor="middle">+</text>
        <text x="540" y="140" fontSize="20" fontWeight="bold" textAnchor="middle">=</text>
      </g>

      {/* Box 1: Base Model */}
      <g filter="url(#shadow)">
        <rect
          x="40"
          y="80"
          width="180"
          height="140"
          rx="12"
          fill="url(#baseModelGradient)"
          className="opacity-90"
        />
        {/* Icon: Brain/Neural network */}
        <circle cx="130" cy="120" r="20" className="fill-white/20" />
        <circle cx="130" cy="120" r="8" className="fill-white" />
        <circle cx="110" cy="140" r="5" className="fill-white/80" />
        <circle cx="150" cy="140" r="5" className="fill-white/80" />
        <circle cx="115" cy="110" r="4" className="fill-white/60" />
        <circle cx="145" cy="110" r="4" className="fill-white/60" />
        {/* Connecting lines */}
        <line x1="130" y1="120" x2="110" y2="140" className="stroke-white/50" strokeWidth="1.5" />
        <line x1="130" y1="120" x2="150" y2="140" className="stroke-white/50" strokeWidth="1.5" />
        <line x1="130" y1="120" x2="115" y2="110" className="stroke-white/50" strokeWidth="1.5" />
        <line x1="130" y1="120" x2="145" y2="110" className="stroke-white/50" strokeWidth="1.5" />
        
        <text
          x="130"
          y="180"
          textAnchor="middle"
          className="fill-white font-semibold"
          fontSize="16"
        >
          Base Model
        </text>
        <text
          x="130"
          y="200"
          textAnchor="middle"
          className="fill-white/70"
          fontSize="12"
        >
          (GPT-5.1, Claude 4.5, etc.)
        </text>
      </g>

      {/* Box 2: System Prompt */}
      <g filter="url(#shadow)">
        <rect
          x="310"
          y="80"
          width="180"
          height="140"
          rx="12"
          fill="url(#systemPromptGradient)"
          className="opacity-90"
        />
        {/* Icon: Document/Instructions */}
        <rect x="110" y="95" width="40" height="50" rx="4" className="fill-white/20" transform="translate(290, 0)" />
        <line x1="408" y1="110" x2="432" y2="110" className="stroke-white/80" strokeWidth="2" strokeLinecap="round" />
        <line x1="408" y1="120" x2="428" y2="120" className="stroke-white/80" strokeWidth="2" strokeLinecap="round" />
        <line x1="408" y1="130" x2="430" y2="130" className="stroke-white/80" strokeWidth="2" strokeLinecap="round" />
        
        <text
          x="400"
          y="180"
          textAnchor="middle"
          className="fill-white font-semibold"
          fontSize="16"
        >
          System Prompt
        </text>
        <text
          x="400"
          y="200"
          textAnchor="middle"
          className="fill-white/70"
          fontSize="12"
        >
          (Instructions & Context)
        </text>
      </g>

      {/* Box 3: Persona */}
      <g filter="url(#shadow)">
        <rect
          x="590"
          y="80"
          width="180"
          height="140"
          rx="12"
          fill="url(#personaGradient)"
          className="opacity-90"
        />
        {/* Icon: User/Persona with sparkle */}
        <circle cx="680" cy="115" r="18" className="fill-white/20" />
        <circle cx="680" cy="108" r="8" className="fill-white" />
        <ellipse cx="680" cy="130" rx="12" ry="8" className="fill-white" />
        {/* Sparkle */}
        <path
          d="M 710 95 L 712 100 L 717 102 L 712 104 L 710 109 L 708 104 L 703 102 L 708 100 Z"
          className="fill-white"
        />
        
        <text
          x="680"
          y="180"
          textAnchor="middle"
          className="fill-white font-semibold"
          fontSize="16"
        >
          Persona
        </text>
        <text
          x="680"
          y="200"
          textAnchor="middle"
          className="fill-white/70"
          fontSize="12"
        >
          (Specialized Assistant)
        </text>
      </g>

      {/* Labels below */}
      <g className="fill-slate-600 dark:fill-slate-400" fontSize="11">
        <text x="130" y="245" textAnchor="middle">
          Raw capabilities
        </text>
        <text x="400" y="245" textAnchor="middle">
          Behavior shaping
        </text>
        <text x="680" y="245" textAnchor="middle">
          Tailored experience
        </text>
      </g>

      {/* Flow annotation */}
      <text
        x="400"
        y="280"
        textAnchor="middle"
        className="fill-slate-500 dark:fill-slate-500 italic"
        fontSize="13"
      >
        The system prompt transforms a general AI into a specialized persona
      </text>
    </svg>
  );
}

export default SystemPromptDiagram;
