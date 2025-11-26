"use client";

import React from 'react';

interface DiagramProps {
  type: 'neural-network' | 'training-loop' | 'black-box' | 'learning-types-overview' | 'supervised-learning-flow' | 'clustering-visualization' | 'reinforcement-learning-loop' | 'llm-next-token' | 'context-window' | 'tokenization-viz' | 'temperature-scale' | 'training-pipeline' | 'bias-in-data' | 'rag-architecture' | 'meeting-timeline' | 'ai-timeline' | 'few-shot-learning' | 'chain-of-thought' | 'dashboard-ui' | 'data-analysis-chart';
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
        <div className="relative p-6 rounded-2xl bg-slate-100/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg w-full max-w-3xl overflow-x-auto">
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
              <text x="50" y="110" textAnchor="middle" className="text-xs font-bold fill-slate-600 dark:fill-slate-400 uppercase tracking-wider">The Internet</text>
            </g>

            {/* Arrow */}
            <path d="M 100 60 L 150 60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-pipeline)" />

            {/* Step 2: Pre-training */}
            <g transform="translate(160, 20)">
              <rect x="0" y="0" width="120" height="80" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" />
              <text x="60" y="30" textAnchor="middle" className="text-sm font-bold fill-blue-700 dark:fill-blue-400">Pre-training</text>
              <text x="60" y="55" textAnchor="middle" className="text-[10px] fill-blue-600 dark:fill-blue-300">Months of GPU</text>
            </g>

            {/* Arrow */}
            <path d="M 290 60 L 340 60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-pipeline)" />

            {/* Step 3: Base Model */}
            <g transform="translate(350, 20)">
              <circle cx="40" cy="40" r="35" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" strokeWidth="2" />
              <text x="40" y="45" textAnchor="middle" className="text-sm font-bold fill-purple-700 dark:fill-purple-400">Base Model</text>
              <text x="40" y="95" textAnchor="middle" className="text-[10px] fill-slate-600 dark:fill-slate-400">"GPT-4 Raw"</text>
            </g>

            {/* Arrow */}
            <path d="M 440 60 L 490 60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-pipeline)" />

            {/* Step 4: Fine-tuning */}
            <g transform="translate(500, 20)">
              <rect x="0" y="0" width="140" height="80" rx="8" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="2" />
              <text x="70" y="30" textAnchor="middle" className="text-sm font-bold fill-green-700 dark:fill-green-400">RLHF / Fine-tuning</text>
              <text x="70" y="55" textAnchor="middle" className="text-[10px] fill-green-600 dark:fill-green-300">Teaching it to chat</text>
            </g>

            {/* Final Output Label */}
            <text x="570" y="120" textAnchor="middle" className="text-lg font-bold fill-slate-800 dark:fill-white">ChatGPT</text>

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

  if (type === 'llm-next-token') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-slate-100/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 600 200" className="w-full h-auto" role="img" aria-label="LLM Prediction: Calculating probabilities for the next token">
            {/* Input Context */}
            <text x="50" y="40" className="text-sm font-bold fill-slate-600 dark:fill-slate-400">Context:</text>
            <text x="50" y="70" className="text-2xl font-mono fill-slate-800 dark:fill-white">"The sky is"</text>

            {/* Arrows */}
            <path d="M 200 60 L 250 60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-timeline)" />

            {/* Probabilities */}
            <g transform="translate(270, 20)">
              {/* Option 1: Blue */}
              <rect x="0" y="0" width="200" height="30" rx="4" fill="#3b82f6" fillOpacity="0.2" />
              <rect x="0" y="0" width="180" height="30" rx="4" fill="#3b82f6" />
              <text x="10" y="20" className="text-sm font-bold fill-white">blue (90%)</text>

              {/* Option 2: Gray */}
              <rect x="0" y="40" width="200" height="30" rx="4" fill="#94a3b8" fillOpacity="0.2" />
              <rect x="0" y="40" width="20" height="30" rx="4" fill="#94a3b8" />
              <text x="10" y="60" className="text-sm font-bold fill-slate-800 dark:fill-white">gray (5%)</text>

              {/* Option 3: Green */}
              <rect x="0" y="80" width="200" height="30" rx="4" fill="#22c55e" fillOpacity="0.2" />
              <rect x="0" y="80" width="10" height="30" rx="4" fill="#22c55e" />
              <text x="10" y="100" className="text-sm font-bold fill-slate-800 dark:fill-white">green (1%)</text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'context-window') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 600 150" className="w-full h-auto" role="img" aria-label="Context Window: Moving window of attention">
            {/* Text Stream */}
            <g transform="translate(50, 60)">
              <text x="0" y="0" className="text-lg font-mono fill-slate-600">Once upon a time there was a droid...</text>
            </g>
            
            {/* The Window */}
            <rect x="180" y="30" width="300" height="50" rx="8" fill="none" stroke="#a855f7" strokeWidth="3" strokeDasharray="6 6" />
            <text x="330" y="20" textAnchor="middle" className="text-xs font-bold fill-purple-400">Context Window (Attention)</text>

            {/* Fog of War (Forgotten) */}
            <rect x="40" y="30" width="130" height="50" fill="url(#fog-grad)" />
            <defs>
              <linearGradient id="fog-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
              </linearGradient>
            </defs>
            <text x="100" y="100" textAnchor="middle" className="text-xs fill-slate-500">Forgotten / Dropped</text>
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'temperature-scale') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 600 200" className="w-full h-auto" role="img" aria-label="Temperature Scale: Precise vs Creative">
            {/* Gradient Line */}
            <defs>
              <linearGradient id="temp-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <rect x="50" y="90" width="500" height="20" rx="10" fill="url(#temp-grad)" />

            {/* Low Temp */}
            <g transform="translate(50, 50)">
              <text x="0" y="0" className="text-xl font-bold fill-blue-400">0.0</text>
              <text x="0" y="25" className="text-xs fill-blue-300">Precise / Logical</text>
              <text x="0" y="130" className="text-xs fill-slate-400">"Math, Coding"</text>
            </g>

            {/* High Temp */}
            <g transform="translate(500, 50)">
              <text x="0" y="0" textAnchor="end" className="text-xl font-bold fill-red-400">1.0</text>
              <text x="0" y="25" textAnchor="end" className="text-xs fill-red-300">Creative / Random</text>
              <text x="0" y="130" textAnchor="end" className="text-xs fill-slate-400">"Poetry, Brainstorming"</text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'ai-timeline') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 700 300" className="w-full h-auto" role="img" aria-label="The Two Waves of AI: Discriminative vs Generative">
            <defs>
              <marker id="arrowhead-timeline" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* --- WAVE 1: DISCRIMINATIVE --- */}
            <g transform="translate(50, 40)">
              <text x="0" y="0" className="text-sm font-bold fill-slate-400 uppercase tracking-widest">Wave 1: Discriminative AI</text>
              
              {/* Input: Cat Photo */}
              <g transform="translate(0, 30)">
                <rect x="0" y="0" width="60" height="60" rx="4" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" />
                <text x="30" y="35" textAnchor="middle" className="text-2xl">🐱</text>
                <text x="30" y="75" textAnchor="middle" className="text-xs fill-slate-400">Data</text>
              </g>

              {/* Arrow */}
              <path d="M 80 60 L 130 60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-timeline)" />

              {/* The Model (Judge) */}
              <g transform="translate(140, 30)">
                <polygon points="30,0 60,30 30,60 0,30" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" />
                <text x="30" y="35" textAnchor="middle" className="text-xl">⚖️</text>
                <text x="30" y="75" textAnchor="middle" className="text-xs fill-purple-300">The Judge</text>
              </g>

              {/* Arrow */}
              <path d="M 210 60 L 260 60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-timeline)" />

              {/* Output: Label */}
              <g transform="translate(270, 40)">
                <rect x="0" y="0" width="80" height="40" rx="20" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" />
                <text x="40" y="25" textAnchor="middle" className="text-sm font-bold fill-green-300">"Cat"</text>
              </g>
            </g>

            {/* Divider */}
            <line x1="50" y1="150" x2="650" y2="150" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

            {/* --- WAVE 2: GENERATIVE --- */}
            <g transform="translate(50, 180)">
              <text x="0" y="0" className="text-sm font-bold fill-slate-400 uppercase tracking-widest">Wave 2: Generative AI</text>
              
              {/* Input: Prompt */}
              <g transform="translate(0, 30)">
                <rect x="0" y="0" width="100" height="60" rx="4" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" />
                <text x="50" y="25" textAnchor="middle" className="text-[10px] fill-amber-200">"Paint a cyberpunk cat"</text>
                <text x="50" y="75" textAnchor="middle" className="text-xs fill-slate-400">Prompt</text>
              </g>

              {/* Arrow */}
              <path d="M 110 60 L 160 60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-timeline)" />

              {/* The Model (Artist) */}
              <g transform="translate(170, 30)">
                <circle cx="30" cy="30" r="30" fill="#ec4899" fillOpacity="0.1" stroke="#ec4899" className="animate-pulse" />
                <text x="30" y="35" textAnchor="middle" className="text-xl">🎨</text>
                <text x="30" y="75" textAnchor="middle" className="text-xs fill-pink-300">The Creator</text>
              </g>

              {/* Arrow */}
              <path d="M 240 60 L 290 60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-timeline)" />

              {/* Output: New Image */}
              <g transform="translate(300, 20)">
                <rect x="0" y="0" width="80" height="80" rx="4" fill="url(#cyber-grad)" stroke="#ec4899" strokeWidth="2" />
                <text x="40" y="45" textAnchor="middle" className="text-2xl">🐱🤖</text>
                <defs>
                  <linearGradient id="cyber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </g>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  if (type === 'few-shot-learning') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-slate-100/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 600 250" className="w-full h-auto" role="img" aria-label="Few-Shot Learning: Showing examples to guide the AI">
            <defs>
              <marker id="arrowhead-fewshot" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Zero-Shot (Left) */}
            <g transform="translate(50, 50)">
              <text x="80" y="0" textAnchor="middle" className="text-sm font-bold fill-slate-700 dark:fill-slate-400 uppercase">Zero-Shot</text>
              <rect x="0" y="20" width="160" height="120" rx="8" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeDasharray="4 4" />
              
              <text x="20" y="50" className="text-xs fill-slate-700 dark:fill-slate-300">Input: "Translate"</text>
              <path d="M 80 70 L 80 100" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead-fewshot)" />
              <text x="80" y="130" textAnchor="middle" className="text-xs font-bold fill-red-700 dark:fill-red-300">? (Random)</text>
            </g>

            {/* Few-Shot (Right) */}
            <g transform="translate(250, 50)">
              <text x="150" y="0" textAnchor="middle" className="text-sm font-bold fill-green-700 dark:fill-green-400 uppercase">Few-Shot (Exemplars)</text>
              <rect x="0" y="20" width="300" height="160" rx="8" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" />

              {/* Examples */}
              <g transform="translate(20, 40)">
                <text x="0" y="0" className="text-[10px] fill-green-800 dark:fill-green-200">Ex 1: Hello &rarr; Hola</text>
                <text x="0" y="20" className="text-[10px] fill-green-800 dark:fill-green-200">Ex 2: Good &rarr; Bueno</text>
                <text x="0" y="40" className="text-[10px] fill-green-800 dark:fill-green-200">Ex 3: Red &rarr; Rojo</text>
                
                <line x1="0" y1="55" x2="260" y2="55" stroke="#22c55e" strokeWidth="1" />
                
                <text x="0" y="80" className="text-xs font-bold fill-slate-800 dark:fill-white">Input: "Blue"</text>
                <path d="M 150 75 L 200 75" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead-fewshot)" />
                <text x="210" y="80" className="text-xs font-bold fill-green-700 dark:fill-green-300">"Azul"</text>
              </g>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'chain-of-thought') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-slate-100/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 600 250" className="w-full h-auto" role="img" aria-label="Chain of Thought: Step-by-step reasoning">
            <defs>
              <marker id="arrowhead-cot" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Standard Prompting */}
            <g transform="translate(50, 50)">
              <text x="100" y="0" textAnchor="middle" className="text-sm font-bold fill-slate-700 dark:fill-slate-400">Standard Prompt</text>
              <rect x="0" y="20" width="200" height="40" rx="4" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" />
              <text x="100" y="45" textAnchor="middle" className="text-xs fill-blue-700 dark:fill-blue-200">"Question"</text>
              
              <path d="M 100 60 L 100 100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-cot)" />
              
              <rect x="0" y="100" width="200" height="40" rx="4" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" />
              <text x="100" y="125" textAnchor="middle" className="text-xs fill-red-700 dark:fill-red-300">"Wrong Answer"</text>
              <text x="100" y="150" textAnchor="middle" className="text-[10px] fill-slate-600 dark:fill-slate-500">(Rushed)</text>
            </g>

            {/* Chain of Thought */}
            <g transform="translate(300, 50)">
              <text x="125" y="0" textAnchor="middle" className="text-sm font-bold fill-purple-700 dark:fill-purple-400">Chain of Thought</text>
              <rect x="0" y="20" width="250" height="40" rx="4" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" />
              <text x="125" y="45" textAnchor="middle" className="text-xs fill-blue-700 dark:fill-blue-200">"Let's think step by step"</text>

              <path d="M 125 60 L 125 80" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-cot)" />

              {/* Steps */}
              <g transform="translate(50, 80)">
                <rect x="0" y="0" width="150" height="60" rx="4" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" strokeDasharray="2 2" />
                <text x="75" y="20" textAnchor="middle" className="text-[10px] fill-purple-700 dark:fill-purple-200">Step 1: Logic...</text>
                <text x="75" y="40" textAnchor="middle" className="text-[10px] fill-purple-700 dark:fill-purple-200">Step 2: Calc...</text>
              </g>

              <path d="M 125 140 L 125 150" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-cot)" />

              <rect x="50" y="150" width="150" height="30" rx="4" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" />
              <text x="125" y="170" textAnchor="middle" className="text-xs font-bold fill-green-700 dark:fill-green-300">"Correct Answer"</text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'dashboard-ui') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-2 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl w-full max-w-2xl">
          <svg viewBox="0 0 600 300" className="w-full h-auto" role="img" aria-label="AI Dashboard Interface">
            {/* Sidebar */}
            <rect x="0" y="0" width="100" height="300" fill="#1e293b" />
            <circle cx="50" cy="40" r="20" fill="#3b82f6" opacity="0.5" />
            <rect x="20" y="80" width="60" height="10" rx="2" fill="#475569" />
            <rect x="20" y="100" width="60" height="10" rx="2" fill="#475569" />
            <rect x="20" y="120" width="60" height="10" rx="2" fill="#475569" />

            {/* Top Bar */}
            <rect x="100" y="0" width="500" height="50" fill="#0f172a" />
            <rect x="120" y="15" width="200" height="20" rx="4" fill="#334155" />
            <circle cx="570" cy="25" r="15" fill="#22c55e" />

            {/* Content Area */}
            <rect x="100" y="50" width="500" height="250" fill="#020617" />
            
            {/* Widget 1 */}
            <rect x="120" y="70" width="220" height="100" rx="8" fill="#1e293b" stroke="#334155" />
            <text x="140" y="100" className="text-xs fill-slate-400 font-bold">USER GROWTH</text>
            <path d="M 140 140 L 180 130 L 220 150 L 260 110 L 300 120" stroke="#3b82f6" strokeWidth="3" fill="none" />

            {/* Widget 2 */}
            <rect x="360" y="70" width="220" height="100" rx="8" fill="#1e293b" stroke="#334155" />
            <text x="380" y="100" className="text-xs fill-slate-400 font-bold">AI TASKS</text>
            <rect x="380" y="120" width="150" height="10" rx="2" fill="#22c55e" />
            <rect x="380" y="140" width="100" height="10" rx="2" fill="#f59e0b" />

            {/* Widget 3 */}
            <rect x="120" y="190" width="460" height="90" rx="8" fill="#1e293b" stroke="#334155" />
            <text x="140" y="220" className="text-xs fill-slate-400 font-bold">RECENT ACTIVITY</text>
            <rect x="140" y="240" width="400" height="8" rx="2" fill="#334155" />
            <rect x="140" y="260" width="350" height="8" rx="2" fill="#334155" />
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'data-analysis-chart') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-2xl">
          <svg viewBox="0 0 600 250" className="w-full h-auto" role="img" aria-label="Data Analysis Visualization">
            {/* Grid Lines */}
            <line x1="50" y1="50" x2="550" y2="50" stroke="#334155" strokeDasharray="4 4" />
            <line x1="50" y1="100" x2="550" y2="100" stroke="#334155" strokeDasharray="4 4" />
            <line x1="50" y1="150" x2="550" y2="150" stroke="#334155" strokeDasharray="4 4" />
            <line x1="50" y1="200" x2="550" y2="200" stroke="#334155" strokeWidth="2" />

            {/* Bars */}
            <rect x="80" y="120" width="40" height="80" fill="#3b82f6" opacity="0.8" />
            <rect x="160" y="80" width="40" height="120" fill="#3b82f6" opacity="0.8" />
            <rect x="240" y="150" width="40" height="50" fill="#3b82f6" opacity="0.8" />
            <rect x="320" y="60" width="40" height="140" fill="#3b82f6" opacity="0.8" />
            <rect x="400" y="90" width="40" height="110" fill="#3b82f6" opacity="0.8" />
            <rect x="480" y="40" width="40" height="160" fill="#3b82f6" opacity="0.8" />

            {/* Trend Line (AI Prediction) */}
            <path d="M 100 120 L 180 80 L 260 150 L 340 60 L 420 90 L 500 40" stroke="#ef4444" strokeWidth="3" fill="none" />
            <circle cx="500" cy="40" r="5" fill="#ef4444" className="animate-pulse" />
            
            {/* Tooltip */}
            <g transform="translate(420, 20)">
              <rect x="0" y="0" width="100" height="30" rx="4" fill="#1e293b" stroke="#ef4444" />
              <text x="50" y="20" textAnchor="middle" className="text-xs fill-white font-bold">AI Insight: +15%</text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'training-loop') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-slate-100/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 700 250" className="w-full h-auto" role="img" aria-label="Training Loop: Guess -> Error -> Update">
            <defs>
              <marker id="arrowhead-loop" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Step 1: Guess */}
            <g transform="translate(50, 50)">
              <rect x="0" y="0" width="120" height="80" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" />
              <text x="60" y="30" textAnchor="middle" className="text-2xl">🤔</text>
              <text x="60" y="60" textAnchor="middle" className="text-xs font-bold fill-blue-700 dark:fill-blue-300">1. Guess</text>
              <text x="60" y="100" textAnchor="middle" className="text-[10px] fill-slate-600 dark:fill-slate-400">"Is it a Dog?"</text>
            </g>

            {/* Arrow */}
            <path d="M 180 90 L 220 90" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-loop)" />

            {/* Step 2: Error (Loss) */}
            <g transform="translate(230, 50)">
              <rect x="0" y="0" width="120" height="80" rx="8" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" />
              <text x="60" y="30" textAnchor="middle" className="text-2xl">❌</text>
              <text x="60" y="60" textAnchor="middle" className="text-xs font-bold fill-red-700 dark:fill-red-300">2. Error</text>
              <text x="60" y="100" textAnchor="middle" className="text-[10px] fill-slate-600 dark:fill-slate-400">"Wrong! It's a Cat."</text>
            </g>

            {/* Arrow */}
            <path d="M 360 90 L 400 90" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-loop)" />

            {/* Step 3: Update (Optimizer) */}
            <g transform="translate(410, 50)">
              <rect x="0" y="0" width="120" height="80" rx="8" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" />
              <text x="60" y="30" textAnchor="middle" className="text-2xl">🔧</text>
              <text x="60" y="60" textAnchor="middle" className="text-xs font-bold fill-green-700 dark:fill-green-300">3. Update</text>
              <text x="60" y="100" textAnchor="middle" className="text-[10px] fill-slate-600 dark:fill-slate-400">Tweak Weights</text>
            </g>

            {/* Loop Back Arrow */}
            <path d="M 470 140 Q 470 180 350 180 Q 110 180 110 140" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="6 6" markerEnd="url(#arrowhead-loop)" />
            <text x="290" y="170" textAnchor="middle" className="text-xs font-bold fill-purple-700 dark:fill-purple-300">Repeat 1,000,000x</text>
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'black-box') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-slate-100/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 600 200" className="w-full h-auto" role="img" aria-label="The Black Box Problem: Input -> ??? -> Output">
            <defs>
              <marker id="arrowhead-box" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
              <linearGradient id="box-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>

            {/* Input */}
            <g transform="translate(50, 60)">
              <rect x="0" y="0" width="80" height="80" rx="4" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" />
              <text x="40" y="45" textAnchor="middle" className="text-2xl">🐱</text>
              <text x="40" y="70" textAnchor="middle" className="text-xs font-bold fill-blue-700 dark:fill-blue-300">Input</text>
            </g>

            {/* Arrow */}
            <path d="M 140 100 L 190 100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-box)" />

            {/* The Black Box */}
            <g transform="translate(200, 40)">
              <rect x="0" y="0" width="200" height="120" rx="8" fill="url(#box-grad)" stroke="#475569" strokeWidth="2" />
              <text x="100" y="60" textAnchor="middle" className="text-4xl font-bold fill-white opacity-50">???</text>
              <text x="100" y="90" textAnchor="middle" className="text-xs fill-slate-400">Hidden Layers</text>
              
              {/* Math symbols floating */}
              <text x="30" y="30" className="text-[10px] fill-slate-600">∑</text>
              <text x="170" y="100" className="text-[10px] fill-slate-600">∫</text>
              <text x="160" y="30" className="text-[10px] fill-slate-600">w</text>
            </g>

            {/* Arrow */}
            <path d="M 410 100 L 460 100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-box)" />

            {/* Output */}
            <g transform="translate(470, 60)">
              <rect x="0" y="0" width="80" height="80" rx="4" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" />
              <text x="40" y="45" textAnchor="middle" className="text-sm font-bold fill-green-700 dark:fill-green-300">"Cat"</text>
              <text x="40" y="70" textAnchor="middle" className="text-xs font-bold fill-green-700 dark:fill-green-300">Output</text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  return null;
}
