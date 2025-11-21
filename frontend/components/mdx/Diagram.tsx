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
          <text x="200" y="50" textAnchor="middle" className="text-sm font-semibold fill-slate-700">Data</text>
          
          <rect x="280" y="110" width="100" height="50" rx="8" fill="none" stroke="#8b5cf6" strokeWidth="2" />
          <text x="330" y="140" textAnchor="middle" className="text-sm font-semibold fill-slate-700">Model</text>
          
          <rect x="140" y="200" width="120" height="50" rx="8" fill="none" stroke="#34d399" strokeWidth="2" />
          <text x="200" y="230" textAnchor="middle" className="text-sm font-semibold fill-slate-700">Prediction</text>
          
          <rect x="20" y="110" width="100" height="50" rx="8" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <text x="70" y="140" textAnchor="middle" className="text-sm font-semibold fill-slate-700">Error</text>
          
          {/* Arrows */}
          {/* Data -> Model */}
          <path d="M 230 70 L 280 110" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
          
          {/* Model -> Prediction */}
          <path d="M 300 160 L 230 200" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
          
          {/* Prediction -> Error */}
          <path d="M 140 225 L 120 225 L 120 135" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
          
          {/* Error -> Model (Feedback) */}
          <path d="M 120 110 L 120 90 L 300 90 L 300 110" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="4 4" />
          
          {/* Arrow marker */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
            </marker>
          </defs>
          
          {/* Label */}
          <text x="200" y="90" textAnchor="middle" className="text-xs italic fill-slate-500">Update</text>
        </svg>
      </div>
    );
  }

  return null;
}
