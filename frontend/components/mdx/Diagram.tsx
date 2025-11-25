"use client";

import React from 'react';

interface DiagramProps {
  type: 'neural-network' | 'training-loop' | 'black-box' | 'learning-types-overview' | 'supervised-learning-flow' | 'clustering-visualization' | 'reinforcement-learning-loop' | 'llm-next-token' | 'context-window' | 'tokenization-viz' | 'temperature-scale' | 'training-pipeline' | 'bias-in-data' | 'rag-architecture' | 'meeting-timeline';
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

  if (type === 'bias-in-data') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-2xl">
          <svg viewBox="0 0 600 250" className="w-full h-auto" role="img" aria-label="Bias in Data: The AI Mirror reflects the Internet's distortions">
            <defs>
              <linearGradient id="mirror-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
              </linearGradient>
              <filter id="glow-bias">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* The Internet (Cloud) */}
            <g transform="translate(50, 50)">
              <path d="M 40 40 Q 60 10 90 40 T 140 40 T 160 80 T 120 110 T 70 110 T 40 80 Z" fill="#f1f5f9" fillOpacity="0.1" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
              <text x="100" y="75" textAnchor="middle" className="text-xs font-bold fill-slate-300">The Internet</text>
              
              {/* Bias Particles */}
              <circle cx="70" cy="60" r="3" fill="#ef4444" className="animate-pulse" />
              <circle cx="120" cy="50" r="3" fill="#ef4444" className="animate-pulse" />
              <circle cx="100" cy="90" r="3" fill="#ef4444" className="animate-pulse" />
              <circle cx="80" cy="80" r="2" fill="#3b82f6" />
              <circle cx="130" cy="70" r="2" fill="#3b82f6" />
            </g>

            {/* Arrow */}
            <path d="M 180 80 L 240 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead-pipeline)" />
            <text x="210" y="70" textAnchor="middle" className="text-[10px] fill-slate-500">Training</text>

            {/* The AI (Mirror) */}
            <g transform="translate(260, 20)">
              <rect x="0" y="0" width="120" height="160" rx="4" fill="url(#mirror-grad)" stroke="#a855f7" strokeWidth="2" filter="url(#glow-bias)" />
              <text x="60" y="180" textAnchor="middle" className="text-sm font-bold fill-purple-400">The AI Model</text>
              
              {/* Reflection */}
              <path d="M 30 40 Q 50 10 80 40 T 130 40" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.6" transform="scale(0.6) translate(20, 40)" />
            </g>

            {/* Arrow */}
            <path d="M 400 80 L 460 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead-pipeline)" />

            {/* Output */}
            <g transform="translate(480, 50)">
               <rect x="0" y="0" width="100" height="60" rx="8" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" />
               <text x="50" y="25" textAnchor="middle" className="text-xs fill-red-300">Biased Output</text>
               <text x="50" y="45" textAnchor="middle" className="text-[10px] fill-red-400">"Doctor = He"</text>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  if (type === 'rag-architecture') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/10 shadow-2xl w-full max-w-5xl">
          {/* Increased viewBox width to 900 to prevent cropping */}
          <svg viewBox="0 0 900 400" className="w-full h-auto" role="img" aria-label="RAG Architecture: User Query -> Search Internal Docs -> AI Answer">
            <defs>
              <marker id="arrowhead-rag" markerWidth="12" markerHeight="12" refX="10" refY="4" orient="auto">
                <polygon points="0 0, 12 4, 0 8" fill="#94a3b8" />
              </marker>
              <filter id="glow-rag">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. User (Left aligned) */}
            <g transform="translate(50, 180)">
              <circle cx="40" cy="40" r="35" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
              <text x="40" y="50" textAnchor="middle" className="text-4xl">👤</text>
              <text x="40" y="100" textAnchor="middle" className="text-sm font-bold fill-white">You</text>
            </g>

            {/* Query Arrow */}
            <path d="M 100 220 L 180 220" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#arrowhead-rag)" />
            <rect x="110" y="190" width="60" height="20" rx="4" fill="#1e293b" />
            <text x="140" y="205" textAnchor="middle" className="text-xs fill-slate-200">"Query"</text>

            {/* 2. The Orchestrator (Copilot) */}
            <g transform="translate(200, 150)">
              <rect x="0" y="0" width="120" height="140" rx="12" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" strokeWidth="2" filter="url(#glow-rag)" />
              <text x="60" y="50" textAnchor="middle" className="text-5xl">🧠</text>
              <text x="60" y="90" textAnchor="middle" className="text-lg font-bold fill-purple-300">Copilot</text>
              <text x="60" y="115" textAnchor="middle" className="text-xs fill-purple-200">(The Brain)</text>
            </g>

            {/* Path to Data (Down) */}
            <path d="M 260 290 L 260 340 L 350 340" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 6" markerEnd="url(#arrowhead-rag)" />
            <text x="290" y="330" textAnchor="middle" className="text-xs font-bold fill-amber-400">1. Search</text>

            {/* 3. Company Data (Database) - Shifted Right slightly */}
            <g transform="translate(370, 300)">
              <path d="M 0 20 Q 50 0 100 20 L 100 100 Q 50 120 0 100 Z" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" />
              <path d="M 0 20 Q 50 40 100 20" fill="none" stroke="#f59e0b" strokeWidth="2" />
              <text x="50" y="70" textAnchor="middle" className="text-4xl">🗄️</text>
              <text x="50" y="140" textAnchor="middle" className="text-sm font-bold fill-amber-300">Company Data</text>
            </g>

            {/* Path from Data (Up) */}
            <path d="M 480 340 L 550 340 L 550 290" stroke="#22c55e" strokeWidth="3" strokeDasharray="6 6" markerEnd="url(#arrowhead-rag)" />
            <text x="580" y="320" textAnchor="middle" className="text-xs font-bold fill-green-400">2. Retrieve</text>

            {/* 4. Context Window - Shifted Right */}
            <g transform="translate(520, 150)">
              <rect x="0" y="0" width="160" height="140" rx="12" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2" />
              <text x="80" y="30" textAnchor="middle" className="text-sm font-bold fill-green-300 uppercase tracking-widest">Context Window</text>
              
              {/* Document Snippet */}
              <rect x="20" y="50" width="120" height="70" rx="4" fill="#ffffff" fillOpacity="0.1" />
              <line x1="30" y1="70" x2="130" y2="70" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" />
              <line x1="30" y1="90" x2="110" y2="90" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" />
              <text x="80" y="110" textAnchor="middle" className="text-[10px] fill-slate-300 italic">"Found in Policy.pdf..."</text>
            </g>

            {/* Answer Arrow */}
            <path d="M 680 220 L 740 220" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#arrowhead-rag)" />

            {/* 5. Final Answer - Shifted Right and ensured it fits */}
            <g transform="translate(750, 180)">
               <rect x="0" y="0" width="140" height="80" rx="12" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
               <text x="70" y="35" textAnchor="middle" className="text-xs font-bold fill-blue-300 uppercase">Final Answer</text>
               <text x="70" y="60" textAnchor="middle" className="text-lg font-bold fill-white">"2 Weeks"</text>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  if (type === 'meeting-timeline') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 700 200" className="w-full h-auto" role="img" aria-label="AI Meeting Assistant: Audio -> Transcript -> Summary">
            <defs>
              <marker id="arrowhead-meeting" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Timeline Line */}
            <line x1="50" y1="100" x2="650" y2="100" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

            {/* Event 1: Audio */}
            <g transform="translate(80, 60)">
              <rect x="0" y="0" width="100" height="80" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" />
              <text x="50" y="30" textAnchor="middle" className="text-2xl">🗣️</text>
              <text x="50" y="60" textAnchor="middle" className="text-xs font-bold fill-blue-300">Audio Stream</text>
            </g>

            {/* Arrow */}
            <path d="M 190 100 L 230 100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-meeting)" />

            {/* Event 2: Transcript */}
            <g transform="translate(240, 60)">
              <rect x="0" y="0" width="120" height="80" rx="8" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" />
              <text x="60" y="30" textAnchor="middle" className="text-2xl">📝</text>
              <text x="60" y="55" textAnchor="middle" className="text-xs font-bold fill-purple-300">Live Transcript</text>
              <text x="60" y="70" textAnchor="middle" className="text-[8px] fill-slate-400">"John said..."</text>
            </g>

            {/* Arrow */}
            <path d="M 370 100 L 410 100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-meeting)" />

            {/* Event 3: AI Processing */}
            <g transform="translate(420, 70)">
              <circle cx="30" cy="30" r="25" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" className="animate-pulse" />
              <text x="30" y="35" textAnchor="middle" className="text-xl">⚙️</text>
            </g>

            {/* Arrow */}
            <path d="M 480 100 L 520 100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-meeting)" />

            {/* Event 4: Summary */}
            <g transform="translate(530, 50)">
              <rect x="0" y="0" width="120" height="100" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" />
              <text x="60" y="25" textAnchor="middle" className="text-xs font-bold fill-amber-300">Meeting Summary</text>
              <line x1="20" y1="40" x2="100" y2="40" stroke="#94a3b8" strokeWidth="2" />
              <line x1="20" y1="55" x2="90" y2="55" stroke="#94a3b8" strokeWidth="2" />
              <line x1="20" y1="70" x2="60" y2="70" stroke="#94a3b8" strokeWidth="2" />
              <rect x="80" y="65" width="30" height="20" rx="4" fill="#ef4444" fillOpacity="0.8" />
              <text x="95" y="78" textAnchor="middle" className="text-[8px] fill-white font-bold">Action</text>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  return null;
}
