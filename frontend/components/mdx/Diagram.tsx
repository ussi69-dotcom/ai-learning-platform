"use client";

import React from 'react';

interface DiagramProps {
  type: 'neural-network' | 'training-loop' | 'black-box' | 'learning-types-overview' | 'supervised-learning-flow' | 'clustering-visualization' | 'reinforcement-learning-loop' | 'llm-next-token' | 'context-window' | 'tokenization-viz' | 'temperature-scale';
}

export default function Diagram({ type }: DiagramProps) {
  // ... (existing diagrams) ...

  if (type === 'tokenization-viz') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-2xl">
          <svg viewBox="0 0 600 150" className="w-full h-auto" role="img" aria-label="Tokenization Visualization: Text converted to ID numbers">
            {/* Sentence */}
            <g transform="translate(50, 40)">
              <rect x="0" y="0" width="100" height="40" rx="4" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
              <text x="50" y="25" textAnchor="middle" className="text-lg font-mono fill-white" dominantBaseline="middle">"Fear"</text>
              
              <rect x="110" y="0" width="100" height="40" rx="4" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" />
              <text x="160" y="25" textAnchor="middle" className="text-lg font-mono fill-white" dominantBaseline="middle">"leads"</text>
              
              <rect x="220" y="0" width="80" height="40" rx="4" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" />
              <text x="260" y="25" textAnchor="middle" className="text-lg font-mono fill-white" dominantBaseline="middle">"to"</text>
              
              <rect x="310" y="0" width="100" height="40" rx="4" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" />
              <text x="360" y="25" textAnchor="middle" className="text-lg font-mono fill-white" dominantBaseline="middle">"anger"</text>
            </g>

            {/* Arrows */}
            <path d="M 100 90 L 100 110" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-token)" />
            <path d="M 210 90 L 210 110" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-token)" />
            <path d="M 310 90 L 310 110" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-token)" />
            <path d="M 410 90 L 410 110" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-token)" />

            {/* IDs */}
            <g transform="translate(50, 120)">
              <text x="50" y="20" textAnchor="middle" className="text-sm font-bold fill-blue-400">18342</text>
              <text x="160" y="20" textAnchor="middle" className="text-sm font-bold fill-purple-400">452</text>
              <text x="260" y="20" textAnchor="middle" className="text-sm font-bold fill-green-400">211</text>
              <text x="360" y="20" textAnchor="middle" className="text-sm font-bold fill-amber-400">9832</text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'training-pipeline') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-3xl overflow-x-auto">
          <svg viewBox="0 0 700 200" className="w-full min-w-[600px] h-auto" role="img" aria-label="Training Pipeline: Internet Data -> Pre-training -> Base Model -> Fine-tuning -> Chat Model">
            <defs>
              <marker id="arrowhead-pipeline" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Step 1: Data */}
            <g transform="translate(50, 50)">
              <path d="M 10 10 L 70 10 L 70 70 L 10 70 Z" fill="#f1f5f9" fillOpacity="0.1" stroke="#94a3b8" />
              <path d="M 15 15 L 75 15 L 75 75 L 15 75 Z" fill="#f1f5f9" fillOpacity="0.1" stroke="#94a3b8" />
              <path d="M 20 20 L 80 20 L 80 80 L 20 80 Z" fill="#f1f5f9" fillOpacity="0.1" stroke="#94a3b8" />
              <text x="50" y="110" textAnchor="middle" className="text-xs font-bold fill-slate-400 uppercase tracking-wider">The Internet</text>
            </g>

            {/* Arrow */}
            <path d="M 100 60 L 150 60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-pipeline)" />

            {/* Step 2: Pre-training */}
            <g transform="translate(160, 20)">
              <rect x="0" y="0" width="120" height="80" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" />
              <text x="60" y="30" textAnchor="middle" className="text-sm font-bold fill-blue-400">Pre-training</text>
              <text x="60" y="55" textAnchor="middle" className="text-[10px] fill-blue-300">Months of GPU</text>
            </g>

            {/* Arrow */}
            <path d="M 290 60 L 340 60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-pipeline)" />

            {/* Step 3: Base Model */}
            <g transform="translate(350, 20)">
              <circle cx="40" cy="40" r="35" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" strokeWidth="2" />
              <text x="40" y="45" textAnchor="middle" className="text-sm font-bold fill-purple-400">Base Model</text>
              <text x="40" y="95" textAnchor="middle" className="text-[10px] fill-slate-400">"GPT-4 Raw"</text>
            </g>

            {/* Arrow */}
            <path d="M 440 60 L 490 60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-pipeline)" />

            {/* Step 4: Fine-tuning */}
            <g transform="translate(500, 20)">
              <rect x="0" y="0" width="140" height="80" rx="8" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="2" />
              <text x="70" y="30" textAnchor="middle" className="text-sm font-bold fill-green-400">RLHF / Fine-tuning</text>
              <text x="70" y="55" textAnchor="middle" className="text-[10px] fill-green-300">Teaching it to chat</text>
            </g>

            {/* Final Output Label */}
            <text x="570" y="120" textAnchor="middle" className="text-lg font-bold fill-white">ChatGPT</text>

          </svg>
        </div>
      </div>
    );
  }

  return null;
}
