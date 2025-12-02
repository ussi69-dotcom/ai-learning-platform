"use client";

import React from 'react';
import { useLocale } from 'next-intl';

interface DiagramProps {
  type: string;
}

export default function DiagramPrompting({ type }: DiagramProps) {
  const locale = useLocale();
  const isCs = locale === 'cs';

  if (type === 'few-shot-learning') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-3xl">
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
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-3xl">
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

  if (type === 'prompt-structure-pyramid') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 600 300" className="w-full h-auto" role="img" aria-label="Prompt Structure Pyramid: Context -> Instruction -> Data -> Format">
            {/* Pyramid Base: Context */}
            <g transform="translate(100, 220)">
              <path d="M 0 60 L 400 60 L 350 0 L 50 0 Z" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
              <text x="200" y="40" textAnchor="middle" className="text-sm font-bold fill-blue-700 dark:fill-blue-300">1. Context (The Foundation)</text>
              <text x="200" y="55" textAnchor="middle" className="text-[10px] fill-slate-600 dark:fill-slate-400">"Act as a Teacher..."</text>
            </g>

            {/* Layer 2: Instruction */}
            <g transform="translate(150, 160)">
              <path d="M 0 60 L 300 60 L 250 0 L 50 0 Z" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" />
              <text x="150" y="40" textAnchor="middle" className="text-sm font-bold fill-purple-700 dark:fill-purple-300">2. Instruction (The Verb)</text>
              <text x="150" y="55" textAnchor="middle" className="text-[10px] fill-slate-600 dark:fill-slate-400">"Explain Quantum Physics..."</text>
            </g>

            {/* Layer 3: Data */}
            <g transform="translate(200, 100)">
              <path d="M 0 60 L 200 60 L 150 0 L 50 0 Z" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" />
              <text x="100" y="40" textAnchor="middle" className="text-sm font-bold fill-green-700 dark:fill-green-300">3. Data (The Input)</text>
              <text x="100" y="55" textAnchor="middle" className="text-[10px] fill-slate-600 dark:fill-slate-400">"Using this text..."</text>
            </g>

            {/* Top: Format */}
            <g transform="translate(250, 40)">
              <path d="M 0 60 L 100 60 L 50 0 Z" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" />
              <text x="50" y="40" textAnchor="middle" className="text-xs font-bold fill-amber-700 dark:fill-amber-300">4. Format</text>
              <text x="50" y="55" textAnchor="middle" className="text-[8px] fill-slate-600 dark:fill-slate-400">"As JSON"</text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'prompt-cheat-sheet') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-0 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-2xl w-full max-w-4xl overflow-hidden">
          <svg viewBox="0 0 800 450" className="w-full h-auto" role="img" aria-label="Prompt Engineering Cheat Sheet">
            
            {/* Background Header */}
            <rect x="0" y="0" width="800" height="60" fill="#3b82f6" fillOpacity="0.1" />
            <text x="400" y="40" textAnchor="middle" className="text-2xl font-bold fill-blue-700 dark:fill-blue-300 uppercase tracking-widest">Prompt Engineering Master Key</text>

            {/* --- LEFT COLUMN: THE 6 PILLARS --- */}
            <g transform="translate(40, 90)">
              <text x="0" y="0" className="text-lg font-bold fill-slate-700 dark:fill-slate-200">The 6 Pillars</text>
              
              {/* Pillar 1: Persona */}
              <g transform="translate(0, 30)">
                <circle cx="15" cy="15" r="15" fill="#a855f7" fillOpacity="0.2" />
                <text x="15" y="20" textAnchor="middle" className="text-lg">🎭</text>
                <text x="40" y="12" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">Persona</text>
                <text x="40" y="28" className="text-xs fill-slate-500">"Act as a..."</text>
              </g>

              {/* Pillar 2: Task */}
              <g transform="translate(0, 80)">
                <circle cx="15" cy="15" r="15" fill="#ef4444" fillOpacity="0.2" />
                <text x="15" y="20" textAnchor="middle" className="text-lg">⚔️</text>
                <text x="40" y="12" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">Task</text>
                <text x="40" y="28" className="text-xs fill-slate-500">"Write/Create..."</text>
              </g>

              {/* Pillar 3: Context */}
              <g transform="translate(0, 130)">
                <circle cx="15" cy="15" r="15" fill="#3b82f6" fillOpacity="0.2" />
                <text x="15" y="20" textAnchor="middle" className="text-lg">🌍</text>
                <text x="40" y="12" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">Context</text>
                <text x="40" y="28" className="text-xs fill-slate-500">"For who? Why?"</text>
              </g>

              {/* Pillar 4: Exemplars */}
              <g transform="translate(180, 30)">
                <circle cx="15" cy="15" r="15" fill="#f59e0b" fillOpacity="0.2" />
                <text x="15" y="20" textAnchor="middle" className="text-lg">👯</text>
                <text x="40" y="12" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">Exemplars</text>
                <text x="40" y="28" className="text-xs fill-slate-500">"Like this..."</text>
              </g>

              {/* Pillar 5: Format */}
              <g transform="translate(180, 80)">
                <circle cx="15" cy="15" r="15" fill="#22c55e" fillOpacity="0.2" />
                <text x="15" y="20" textAnchor="middle" className="text-lg">📐</text>
                <text x="40" y="12" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">Format</text>
                <text x="40" y="28" className="text-xs fill-slate-500">"Table/JSON"</text>
              </g>

              {/* Pillar 6: Tone */}
              <g transform="translate(180, 130)">
                <circle cx="15" cy="15" r="15" fill="#ec4899" fillOpacity="0.2" />
                <text x="15" y="20" textAnchor="middle" className="text-lg">🎨</text>
                <text x="40" y="12" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">Tone</text>
                <text x="40" y="28" className="text-xs fill-slate-500">"Professional"</text>
              </g>
            </g>

            {/* Divider Line */}
            <line x1="380" y1="80" x2="380" y2="420" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

            {/* --- RIGHT COLUMN: THE TEMPLATE --- */}
            <g transform="translate(420, 90)">
              <text x="0" y="0" className="text-lg font-bold fill-slate-700 dark:fill-slate-200">The Master Template</text>
              
              {/* Terminal Window */}
              <g transform="translate(0, 20)">
                <rect x="0" y="0" width="340" height="300" rx="8" fill="#1e293b" stroke="#334155" />
                
                {/* Window Controls */}
                <circle cx="20" cy="20" r="4" fill="#ef4444" />
                <circle cx="35" cy="20" r="4" fill="#f59e0b" />
                <circle cx="50" cy="20" r="4" fill="#22c55e" />
                
                {/* Code Text */}
                <text x="20" y="60" className="text-xs font-mono fill-purple-400">Act as a [PERSONA]</text>
                <text x="20" y="90" className="text-xs font-mono fill-blue-400">Your task is to [TASK]</text>
                <text x="20" y="120" className="text-xs font-mono fill-green-400">This is for [CONTEXT]</text>
                
                <text x="20" y="160" className="text-xs font-mono fill-slate-400"># Examples (Few-Shot)</text>
                <text x="20" y="180" className="text-xs font-mono fill-amber-400">Here are examples: [EXEMPLARS]</text>
                
                <text x="20" y="220" className="text-xs font-mono fill-pink-400">Output format: [FORMAT]</text>
                <text x="20" y="250" className="text-xs font-mono fill-cyan-400">Tone: [TONE]</text>
                
                {/* Cursor */}
                <rect x="20" y="270" width="8" height="14" fill="#3b82f6" className="animate-pulse" />
              </g>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  return null;
}
