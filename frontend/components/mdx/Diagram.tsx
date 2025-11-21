"use client";

import React from 'react';

interface DiagramProps {
  type: 'neural-network' | 'training-loop';
}

export default function Diagram({ type }: DiagramProps) {
  if (type === 'neural-network') {
    return (
      <div className="my-8 flex justify-center">
        <svg width="400" height="250" viewBox="0 0 400 250" className="w-full max-w-md">
          {/* Input Layer */}
          <circle cx="50" cy="60" r="12" fill="none" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="50" cy="125" r="12" fill="none" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="50" cy="190" r="12" fill="none" stroke="#94a3b8" strokeWidth="2" />
          
          {/* Hidden Layer */}
          <circle cx="200" cy="40" r="12" fill="none" stroke="#60a5fa" strokeWidth="2" />
          <circle cx="200" cy="95" r="12" fill="none" stroke="#60a5fa" strokeWidth="2" />
          <circle cx="200" cy="155" r="12" fill="none" stroke="#60a5fa" strokeWidth="2" />
          <circle cx="200" cy="210" r="12" fill="none" stroke="#60a5fa" strokeWidth="2" />
          
          {/* Output Layer */}
          <circle cx="350" cy="80" r="12" fill="none" stroke="#34d399" strokeWidth="2" />
          <circle cx="350" cy="170" r="12" fill="none" stroke="#34d399" strokeWidth="2" />
          
          {/* Connections Input -> Hidden */}
          <line x1="62" y1="60" x2="188" y2="40" stroke="#cbd5e1" strokeWidth="1" opacity="0.4" />
          <line x1="62" y1="60" x2="188" y2="95" stroke="#cbd5e1" strokeWidth="1" opacity="0.4" />
          <line x1="62" y1="125" x2="188" y2="95" stroke="#cbd5e1" strokeWidth="1" opacity="0.4" />
          <line x1="62" y1="125" x2="188" y2="155" stroke="#cbd5e1" strokeWidth="1" opacity="0.4" />
          <line x1="62" y1="190" x2="188" y2="155" stroke="#cbd5e1" strokeWidth="1" opacity="0.4" />
          <line x1="62" y1="190" x2="188" y2="210" stroke="#cbd5e1" strokeWidth="1" opacity="0.4" />
          
          {/* Connections Hidden -> Output */}
          <line x1="212" y1="40" x2="338" y2="80" stroke="#cbd5e1" strokeWidth="1" opacity="0.4" />
          <line x1="212" y1="95" x2="338" y2="80" stroke="#cbd5e1" strokeWidth="1" opacity="0.4" />
          <line x1="212" y1="155" x2="338" y2="170" stroke="#cbd5e1" strokeWidth="1" opacity="0.4" />
          <line x1="212" y1="210" x2="338" y2="170" stroke="#cbd5e1" strokeWidth="1" opacity="0.4" />
          
          {/* Labels */}
          <text x="50" y="230" textAnchor="middle" className="text-xs font-medium fill-slate-600">Input</text>
          <text x="200" y="230" textAnchor="middle" className="text-xs font-medium fill-slate-600">Hidden</text>
          <text x="350" y="230" textAnchor="middle" className="text-xs font-medium fill-slate-600">Output</text>
        </svg>
      </div>
    );
  }

  if (type === 'training-loop') {
    return (
      <div className="my-8 flex justify-center">
        <svg width="400" height="300" viewBox="0 0 400 300" className="w-full max-w-md">
          {/* Boxes */}
          <rect x="140" y="20" width="120" height="50" rx="8" fill="none" stroke="#60a5fa" strokeWidth="2" />
          <text x="200" y="50" textAnchor="middle" className="text-sm font-semibold fill-slate-700 dark:fill-slate-200">Data</text>
          
          <rect x="280" y="110" width="100" height="50" rx="8" fill="none" stroke="#8b5cf6" strokeWidth="2" />
          <text x="330" y="140" textAnchor="middle" className="text-sm font-semibold fill-slate-700 dark:fill-slate-200">Model</text>
          
          <rect x="140" y="200" width="120" height="50" rx="8" fill="none" stroke="#34d399" strokeWidth="2" />
          <text x="200" y="230" textAnchor="middle" className="text-sm font-semibold fill-slate-700 dark:fill-slate-200">Prediction</text>
          
          <rect x="20" y="110" width="100" height="50" rx="8" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <text x="70" y="140" textAnchor="middle" className="text-sm font-semibold fill-slate-700 dark:fill-slate-200">Error</text>
          
          {/* Arrows */}
          <path d="M 230 70 L 280 110" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
          <path d="M 300 160 L 230 200" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
          <path d="M 140 225 L 120 225 L 120 135" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
          <path d="M 120 110 L 120 90 L 300 90 L 300 110" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="4 4" />
          
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
            </marker>
          </defs>
          
          <text x="200" y="90" textAnchor="middle" className="text-xs italic fill-slate-500">Update</text>
        </svg>
      </div>
    );
  }

  if (type === 'black-box') {
    return (
      <div className="my-8 flex justify-center">
        <svg width="400" height="200" viewBox="0 0 400 200" className="w-full max-w-md">
           {/* Inputs */}
           <path d="M 50 60 L 120 60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-bb)" />
           <path d="M 50 100 L 120 100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-bb)" />
           <path d="M 50 140 L 120 140" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-bb)" />
           <text x="40" y="105" textAnchor="end" className="text-sm font-medium fill-slate-500 dark:fill-slate-400">Inputs</text>
           
           {/* The Box */}
           <rect x="130" y="30" width="140" height="140" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" className="drop-shadow-xl" />
           <text x="200" y="115" textAnchor="middle" className="text-5xl font-bold fill-white" opacity="0.9">?</text>
           
           {/* Neural connections inside (faint) */}
           <circle cx="150" cy="50" r="3" fill="#3b82f6" opacity="0.4" />
           <circle cx="250" cy="150" r="3" fill="#3b82f6" opacity="0.4" />
           <line x1="150" y1="50" x2="250" y2="150" stroke="#3b82f6" strokeWidth="1" opacity="0.2" />
           
           {/* Output */}
           <path d="M 270 100 L 340 100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-bb)" />
           <text x="350" y="105" textAnchor="start" className="text-sm font-medium fill-slate-500 dark:fill-slate-400">Output</text>

           <defs>
            <marker id="arrowhead-bb" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
            </marker>
          </defs>
        </svg>
      </div>
    );
  }

  return null;
}
