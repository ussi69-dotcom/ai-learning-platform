"use client";

import React from 'react';

interface DiagramProps {
  type: 'neural-network' | 'training-loop' | 'black-box' | 'learning-types-overview' | 'supervised-learning-flow' | 'clustering-visualization' | 'reinforcement-learning-loop';
}

export default function Diagram({ type }: DiagramProps) {
  if (type === 'neural-network') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-lg">
          <svg width="450" height="200" viewBox="0 0 450 200" className="w-full max-w-lg" role="img" aria-label="Neural Network Diagram: Input cat image -> Hidden Layers -> Output 'Cat' label">
            <defs>
              <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <marker id="arrowhead-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Input Section */}
            <g transform="translate(50, 100)">
              <circle r="30" fill="white" fillOpacity="0.1" stroke="#94a3b8" strokeWidth="1" />
              <text x="0" y="5" textAnchor="middle" fontSize="24">🐱</text>
              <text x="0" y="45" textAnchor="middle" className="text-xs font-bold fill-slate-500 dark:fill-slate-400 uppercase tracking-wider">Input</text>
            </g>

            {/* Arrow 1 */}
            <path d="M 90 100 L 140 100" stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />

            {/* Hidden Layers (The Brain) */}
            <g transform="translate(225, 100)">
              {/* Background Box */}
              <rect x="-70" y="-60" width="140" height="120" rx="12" fill="url(#blue-grad)" fillOpacity="0.1" stroke="url(#blue-grad)" strokeOpacity="0.3" />
              
              {/* Nodes */}
              <circle cx="-30" cy="-30" r="8" fill="url(#blue-grad)" />
              <circle cx="-30" cy="30" r="8" fill="url(#blue-grad)" />
              <circle cx="30" cy="-30" r="8" fill="url(#blue-grad)" />
              <circle cx="30" cy="30" r="8" fill="url(#blue-grad)" />
              
              {/* Connections */}
              <line x1="-30" y1="-30" x2="30" y2="-30" stroke="#60a5fa" strokeWidth="1" opacity="0.5" />
              <line x1="-30" y1="-30" x2="30" y2="30" stroke="#60a5fa" strokeWidth="1" opacity="0.5" />
              <line x1="-30" y1="30" x2="30" y2="-30" stroke="#60a5fa" strokeWidth="1" opacity="0.5" />
              <line x1="-30" y1="30" x2="30" y2="30" stroke="#60a5fa" strokeWidth="1" opacity="0.5" />

              <text x="0" y="80" textAnchor="middle" className="text-xs font-bold fill-blue-500 uppercase tracking-wider">Learning Patterns</text>
            </g>

            {/* Arrow 2 */}
            <path d="M 305 100 L 355 100" stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />

            {/* Output Section */}
            <g transform="translate(400, 100)">
              <circle r="30" fill="url(#green-grad)" fillOpacity="0.1" stroke="url(#green-grad)" strokeWidth="1" />
              <text x="0" y="5" textAnchor="middle" className="text-sm font-bold fill-emerald-600 dark:fill-emerald-400">"Cat"</text>
              <text x="0" y="45" textAnchor="middle" className="text-xs font-bold fill-emerald-600 dark:fill-emerald-400 uppercase tracking-wider">Output</text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'training-loop') {
    return (
      <div className="my-8 flex justify-center">
        <svg width="400" height="300" viewBox="0 0 400 300" className="w-full max-w-md" role="img" aria-label="Training Loop Diagram: Data -> Model -> Prediction -> Error -> Update Model">
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
        <svg width="400" height="200" viewBox="0 0 400 200" className="w-full max-w-md" role="img" aria-label="Black Box Diagram: Inputs enter a mysterious box, Output comes out">
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

  if (type === 'learning-types-overview') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 600 300" className="w-full h-auto" role="img" aria-label="AI Learning Types: Supervised (Labeled Data), Unsupervised (Patterns Only), Reinforcement (Trial & Error)">
            <defs>
              <marker id="arrowhead-gray" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
              <filter id="glass-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Connections */}
            <path d="M 300 60 L 100 150" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-gray)" />
            <path d="M 300 60 L 300 150" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-gray)" />
            <path d="M 300 60 L 500 150" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-gray)" />

            {/* Root Node */}
            <g transform="translate(300, 40)">
              <rect x="-80" y="-25" width="160" height="50" rx="25" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" className="text-lg font-bold fill-slate-900 dark:fill-white" dominantBaseline="middle">AI Learning</text>
            </g>

            {/* Supervised Node */}
            <g transform="translate(100, 180)">
              <rect x="-80" y="-25" width="160" height="50" rx="12" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" className="text-sm font-bold fill-slate-800 dark:fill-slate-200" dominantBaseline="middle">Supervised</text>
              <text x="0" y="40" textAnchor="middle" className="text-xs fill-slate-500 dark:fill-slate-400">Labeled Data</text>
            </g>

            {/* Unsupervised Node */}
            <g transform="translate(300, 180)">
              <rect x="-80" y="-25" width="160" height="50" rx="12" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" className="text-sm font-bold fill-slate-800 dark:fill-slate-200" dominantBaseline="middle">Unsupervised</text>
              <text x="0" y="40" textAnchor="middle" className="text-xs fill-slate-500 dark:fill-slate-400">Patterns Only</text>
            </g>

            {/* Reinforcement Node */}
            <g transform="translate(500, 180)">
              <rect x="-80" y="-25" width="160" height="50" rx="12" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" className="text-sm font-bold fill-slate-800 dark:fill-slate-200" dominantBaseline="middle">Reinforcement</text>
              <text x="0" y="40" textAnchor="middle" className="text-xs fill-slate-500 dark:fill-slate-400">Trial & Error</text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'supervised-learning-flow') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-2xl overflow-x-auto">
          <svg viewBox="0 0 700 150" className="w-full min-w-[600px] h-auto" role="img" aria-label="Supervised Learning Flow: Input -> Label -> Training -> Prediction">
            <defs>
              <marker id="arrowhead-flow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Step 1: Input */}
            <g transform="translate(50, 50)">
              <rect x="0" y="0" width="120" height="60" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" />
              <text x="60" y="25" textAnchor="middle" className="text-sm font-bold fill-slate-800 dark:fill-slate-200" dominantBaseline="middle">1. Input</text>
              <text x="60" y="45" textAnchor="middle" className="text-xs fill-slate-500 dark:fill-slate-400">Raw Data</text>
            </g>

            {/* Arrow 1 */}
            <path d="M 170 80 L 210 80" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-flow)" />

            {/* Step 2: Label */}
            <g transform="translate(210, 50)">
              <rect x="0" y="0" width="120" height="60" rx="8" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="2" />
              <text x="60" y="25" textAnchor="middle" className="text-sm font-bold fill-slate-800 dark:fill-slate-200" dominantBaseline="middle">2. Label</text>
              <text x="60" y="45" textAnchor="middle" className="text-xs fill-slate-500 dark:fill-slate-400">Correct Answer</text>
            </g>

            {/* Arrow 2 */}
            <path d="M 330 80 L 370 80" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-flow)" />

            {/* Step 3: Training */}
            <g transform="translate(370, 50)">
              <rect x="0" y="0" width="120" height="60" rx="8" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" strokeWidth="2" />
              <text x="60" y="25" textAnchor="middle" className="text-sm font-bold fill-slate-800 dark:fill-slate-200" dominantBaseline="middle">3. Training</text>
              <text x="60" y="45" textAnchor="middle" className="text-xs fill-slate-500 dark:fill-slate-400">Learn Pattern</text>
            </g>

            {/* Arrow 3 */}
            <path d="M 490 80 L 530 80" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-flow)" />

            {/* Step 4: Prediction */}
            <g transform="translate(530, 50)">
              <rect x="0" y="0" width="120" height="60" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" />
              <text x="60" y="25" textAnchor="middle" className="text-sm font-bold fill-slate-800 dark:fill-slate-200" dominantBaseline="middle">4. Prediction</text>
              <text x="60" y="45" textAnchor="middle" className="text-xs fill-slate-500 dark:fill-slate-400">New Data</text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'clustering-visualization') {
    return (
      <div className="my-8 flex flex-col md:flex-row gap-8 justify-center items-center">
        {/* Before: Chaos */}
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-sm aspect-square flex flex-col items-center">
          <h4 className="text-center text-sm font-bold mb-4 text-slate-500 dark:text-slate-400">Before AI</h4>
          <svg viewBox="0 0 200 200" className="w-full h-full" role="img" aria-label="Random scattered dots representing chaotic data">
            <rect width="200" height="200" fill="none" />
            {/* Random dots */}
            <circle cx="45" cy="50" r="6" fill="#94a3b8" />
            <circle cx="150" cy="140" r="6" fill="#94a3b8" />
            <circle cx="80" cy="160" r="6" fill="#94a3b8" />
            <circle cx="120" cy="40" r="6" fill="#94a3b8" />
            <circle cx="30" cy="120" r="6" fill="#94a3b8" />
            <circle cx="170" cy="60" r="6" fill="#94a3b8" />
            <circle cx="100" cy="100" r="6" fill="#94a3b8" />
            <circle cx="60" cy="30" r="6" fill="#94a3b8" />
            <circle cx="140" cy="170" r="6" fill="#94a3b8" />
            <circle cx="20" cy="80" r="6" fill="#94a3b8" />
            <circle cx="180" cy="110" r="6" fill="#94a3b8" />
            <circle cx="90" cy="130" r="6" fill="#94a3b8" />
          </svg>
        </div>

        {/* Arrow */}
        <div className="hidden md:block text-slate-400">
          <svg width="40" height="20" viewBox="0 0 40 20">
            <path d="M 0 10 L 35 10" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead-gray)" />
          </svg>
        </div>

        {/* After: Order */}
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-sm aspect-square flex flex-col items-center">
          <h4 className="text-center text-sm font-bold mb-4 text-purple-500">After AI</h4>
          <svg viewBox="0 0 200 200" className="w-full h-full" role="img" aria-label="Organized clusters of colored dots representing structured data">
            <rect width="200" height="200" fill="none" />
            
            {/* Cluster 1 (Blue) */}
            <g>
              <circle cx="50" cy="50" r="40" fill="#3b82f6" fillOpacity="0.1" />
              <circle cx="45" cy="50" r="6" fill="#3b82f6" />
              <circle cx="60" cy="30" r="6" fill="#3b82f6" />
              <circle cx="30" cy="40" r="6" fill="#3b82f6" />
              <circle cx="65" cy="60" r="6" fill="#3b82f6" />
            </g>

            {/* Cluster 2 (Purple) */}
            <g>
              <circle cx="150" cy="60" r="40" fill="#a855f7" fillOpacity="0.1" />
              <circle cx="150" cy="60" r="6" fill="#a855f7" />
              <circle cx="170" cy="50" r="6" fill="#a855f7" />
              <circle cx="130" cy="70" r="6" fill="#a855f7" />
              <circle cx="160" cy="80" r="6" fill="#a855f7" />
            </g>

            {/* Cluster 3 (Green) */}
            <g>
              <circle cx="100" cy="150" r="45" fill="#22c55e" fillOpacity="0.1" />
              <circle cx="100" cy="150" r="6" fill="#22c55e" />
              <circle cx="80" cy="140" r="6" fill="#22c55e" />
              <circle cx="120" cy="160" r="6" fill="#22c55e" />
              <circle cx="90" cy="170" r="6" fill="#22c55e" />
              <circle cx="110" cy="130" r="6" fill="#22c55e" />
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'reinforcement-learning-loop') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-md">
          <svg viewBox="0 0 400 350" className="w-full h-auto" role="img" aria-label="Reinforcement Learning Loop: Agent takes Action in Environment, receives Reward or Penalty, and Learns">
            <defs>
              <marker id="arrowhead-loop" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Agent (Bottom) */}
            <g transform="translate(200, 300)">
              <rect x="-60" y="-30" width="120" height="60" rx="12" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" className="text-sm font-bold fill-slate-800 dark:fill-slate-200" dominantBaseline="middle">Agent</text>
              <text x="0" y="25" textAnchor="middle" className="text-xs fill-slate-500 dark:fill-slate-400">Learner</text>
            </g>

            {/* Environment (Top) */}
            <g transform="translate(200, 50)">
              <rect x="-60" y="-30" width="120" height="60" rx="12" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" className="text-sm font-bold fill-slate-800 dark:fill-slate-200" dominantBaseline="middle">Environment</text>
              <text x="0" y="25" textAnchor="middle" className="text-xs fill-slate-500 dark:fill-slate-400">The World</text>
            </g>

            {/* Action Arrow (Left Up) */}
            <path d="M 140 300 C 50 300, 50 50, 140 50" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-loop)" />
            <rect x="20" y="160" width="80" height="30" rx="4" className="fill-white dark:fill-slate-900" stroke="#cbd5e1" />
            <text x="60" y="180" textAnchor="middle" className="text-xs font-bold fill-slate-600 dark:fill-slate-300" dominantBaseline="middle">Action</text>

            {/* Feedback Arrow (Right Down) */}
            <path d="M 260 50 C 350 50, 350 300, 260 300" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-loop)" />
            
            {/* Reward Label */}
            <g transform="translate(320, 140)">
              <rect x="-35" y="-15" width="70" height="30" rx="4" fill="#dcfce7" stroke="#22c55e" />
              <text x="0" y="5" textAnchor="middle" className="text-xs font-bold fill-green-700" dominantBaseline="middle">+ Reward</text>
            </g>

            {/* Penalty Label */}
            <g transform="translate(320, 200)">
              <rect x="-35" y="-15" width="70" height="30" rx="4" fill="#fee2e2" stroke="#ef4444" />
              <text x="0" y="5" textAnchor="middle" className="text-xs font-bold fill-red-700" dominantBaseline="middle">- Penalty</text>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  return null;
}
