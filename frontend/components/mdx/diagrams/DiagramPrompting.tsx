"use client";

import React from 'react';
import { useLocale } from 'next-intl';
import SystemPromptDiagram from './DiagramPersona';

interface DiagramProps {
  type: string;
}

export default function DiagramPrompting({ type }: DiagramProps) {
  const locale = useLocale();
  const isCs = locale === 'cs';

  if (type === 'system-prompt-flow') {
    return <SystemPromptDiagram />;
  }

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

  // =====================
  // AIM Framework Diagram
  // =====================
  if (type === 'aim-framework') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 700 200" className="w-full h-auto" role="img" aria-label="AIM Framework: Actor + Input + Mission">
            <defs>
              <linearGradient id="aim-grad-actor" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="aim-grad-input" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="aim-grad-mission" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
              <marker id="aim-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
              </marker>
            </defs>

            {/* Actor Circle */}
            <g transform="translate(100, 100)">
              <circle cx="0" cy="0" r="60" fill="url(#aim-grad-actor)" opacity="0.9" />
              <text x="0" y="-10" textAnchor="middle" className="text-2xl font-bold fill-white">A</text>
              <text x="0" y="15" textAnchor="middle" className="text-sm font-semibold fill-white/90">Actor</text>
              <text x="0" y="80" textAnchor="middle" className="text-xs fill-slate-600 dark:fill-slate-400">{isCs ? 'Kdo je AI?' : 'Who is the AI?'}</text>
            </g>

            {/* Arrow 1 */}
            <path d="M 170 100 L 230 100" stroke="#64748b" strokeWidth="3" markerEnd="url(#aim-arrow)" />
            <text x="200" y="80" textAnchor="middle" className="text-lg fill-slate-500">+</text>

            {/* Input Circle */}
            <g transform="translate(300, 100)">
              <circle cx="0" cy="0" r="60" fill="url(#aim-grad-input)" opacity="0.9" />
              <text x="0" y="-10" textAnchor="middle" className="text-2xl font-bold fill-white">I</text>
              <text x="0" y="15" textAnchor="middle" className="text-sm font-semibold fill-white/90">Input</text>
              <text x="0" y="80" textAnchor="middle" className="text-xs fill-slate-600 dark:fill-slate-400">{isCs ? 'Co dostane?' : 'What context?'}</text>
            </g>

            {/* Arrow 2 */}
            <path d="M 370 100 L 430 100" stroke="#64748b" strokeWidth="3" markerEnd="url(#aim-arrow)" />
            <text x="400" y="80" textAnchor="middle" className="text-lg fill-slate-500">+</text>

            {/* Mission Circle */}
            <g transform="translate(500, 100)">
              <circle cx="0" cy="0" r="60" fill="url(#aim-grad-mission)" opacity="0.9" />
              <text x="0" y="-10" textAnchor="middle" className="text-2xl font-bold fill-white">M</text>
              <text x="0" y="15" textAnchor="middle" className="text-sm font-semibold fill-white/90">Mission</text>
              <text x="0" y="80" textAnchor="middle" className="text-xs fill-slate-600 dark:fill-slate-400">{isCs ? 'Co má udělat?' : "What's the goal?"}</text>
            </g>

            {/* Result Arrow */}
            <path d="M 570 100 L 650 100" stroke="#22c55e" strokeWidth="3" markerEnd="url(#aim-arrow)" />
            <text x="655" y="105" className="text-xl fill-green-500">✓</text>
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // MAP Framework Diagram
  // =====================
  if (type === 'map-framework') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-4xl">
          <svg viewBox="0 0 800 220" className="w-full h-auto" role="img" aria-label="MAP Framework: Memory + Assets + Actions + Prompt">
            <defs>
              <linearGradient id="map-grad-memory" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="map-grad-assets" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="map-grad-actions" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="map-grad-prompt" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
            </defs>

            {/* Memory Column */}
            <g transform="translate(50, 30)">
              <rect x="0" y="0" width="140" height="160" rx="12" fill="url(#map-grad-memory)" opacity="0.15" stroke="#f59e0b" strokeWidth="2" />
              <text x="70" y="35" textAnchor="middle" className="text-3xl">🧠</text>
              <text x="70" y="65" textAnchor="middle" className="text-lg font-bold fill-amber-600 dark:fill-amber-400">Memory</text>
              <text x="70" y="90" textAnchor="middle" className="text-xs fill-slate-600 dark:fill-slate-400">{isCs ? 'Historie' : 'History'}</text>
              <text x="70" y="110" textAnchor="middle" className="text-xs fill-slate-600 dark:fill-slate-400">{isCs ? 'konverzace' : 'of chat'}</text>
              <rect x="20" y="125" width="100" height="25" rx="4" fill="#f59e0b" fillOpacity="0.2" />
              <text x="70" y="142" textAnchor="middle" className="text-[10px] fill-amber-700 dark:fill-amber-300">@previous</text>
            </g>

            {/* Assets Column */}
            <g transform="translate(220, 30)">
              <rect x="0" y="0" width="140" height="160" rx="12" fill="url(#map-grad-assets)" opacity="0.15" stroke="#3b82f6" strokeWidth="2" />
              <text x="70" y="35" textAnchor="middle" className="text-3xl">📂</text>
              <text x="70" y="65" textAnchor="middle" className="text-lg font-bold fill-blue-600 dark:fill-blue-400">Assets</text>
              <text x="70" y="90" textAnchor="middle" className="text-xs fill-slate-600 dark:fill-slate-400">{isCs ? 'Soubory' : 'Files'}</text>
              <text x="70" y="110" textAnchor="middle" className="text-xs fill-slate-600 dark:fill-slate-400">{isCs ? 'a dokumenty' : '& documents'}</text>
              <rect x="20" y="125" width="100" height="25" rx="4" fill="#3b82f6" fillOpacity="0.2" />
              <text x="70" y="142" textAnchor="middle" className="text-[10px] fill-blue-700 dark:fill-blue-300">report.pdf</text>
            </g>

            {/* Actions Column */}
            <g transform="translate(390, 30)">
              <rect x="0" y="0" width="140" height="160" rx="12" fill="url(#map-grad-actions)" opacity="0.15" stroke="#a855f7" strokeWidth="2" />
              <text x="70" y="35" textAnchor="middle" className="text-3xl">⚡</text>
              <text x="70" y="65" textAnchor="middle" className="text-lg font-bold fill-purple-600 dark:fill-purple-400">Actions</text>
              <text x="70" y="90" textAnchor="middle" className="text-xs fill-slate-600 dark:fill-slate-400">{isCs ? 'Nástroje' : 'Tools'}</text>
              <text x="70" y="110" textAnchor="middle" className="text-xs fill-slate-600 dark:fill-slate-400">{isCs ? 'a web search' : '& web search'}</text>
              <rect x="20" y="125" width="100" height="25" rx="4" fill="#a855f7" fillOpacity="0.2" />
              <text x="70" y="142" textAnchor="middle" className="text-[10px] fill-purple-700 dark:fill-purple-300">@web</text>
            </g>

            {/* Prompt Column */}
            <g transform="translate(560, 30)">
              <rect x="0" y="0" width="180" height="160" rx="12" fill="url(#map-grad-prompt)" opacity="0.15" stroke="#22c55e" strokeWidth="2" />
              <text x="90" y="35" textAnchor="middle" className="text-3xl">🎯</text>
              <text x="90" y="65" textAnchor="middle" className="text-lg font-bold fill-green-600 dark:fill-green-400">Prompt</text>
              <text x="90" y="90" textAnchor="middle" className="text-xs fill-slate-600 dark:fill-slate-400">{isCs ? 'Supercharged' : 'Supercharged'}</text>
              <text x="90" y="110" textAnchor="middle" className="text-xs fill-slate-600 dark:fill-slate-400">{isCs ? 'instrukce' : 'instructions'}</text>
              <rect x="15" y="125" width="150" height="25" rx="4" fill="#22c55e" fillOpacity="0.3" />
              <text x="90" y="142" textAnchor="middle" className="text-[10px] font-bold fill-green-700 dark:fill-green-300">{isCs ? 'M+A+A = 🚀' : 'M+A+A = 🚀'}</text>
            </g>

            {/* Connecting Arrows */}
            <path d="M 195 110 L 215 110" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
            <path d="M 365 110 L 385 110" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
            <path d="M 535 110 L 555 110" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Prompt Stack Diagram
  // =====================
  if (type === 'prompt-stack') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 700 320" className="w-full h-auto" role="img" aria-label="Prompt Stack: 4 Layers">
            <defs>
              <linearGradient id="stack-grad-system" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e40af" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="stack-grad-context" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id="stack-grad-instruction" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
              <linearGradient id="stack-grad-format" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>

            {/* Layer 1: System Prompt (Bottom) */}
            <g transform="translate(50, 240)">
              <rect x="0" y="0" width="600" height="60" rx="8" fill="url(#stack-grad-system)" opacity="0.9" />
              <text x="50" y="25" className="text-sm font-bold fill-white">1️⃣ SYSTEM PROMPT</text>
              <text x="50" y="45" className="text-xs fill-white/80">{isCs ? '"Jsi senior analytik s 20 lety zkušeností..."' : '"You are a senior analyst with 20 years..."'}</text>
              <text x="550" y="35" textAnchor="middle" className="text-2xl">🖥️</text>
            </g>

            {/* Layer 2: Context */}
            <g transform="translate(80, 175)">
              <rect x="0" y="0" width="540" height="55" rx="8" fill="url(#stack-grad-context)" opacity="0.9" />
              <text x="40" y="22" className="text-sm font-bold fill-white">2️⃣ CONTEXT</text>
              <text x="40" y="42" className="text-xs fill-white/80">{isCs ? '"Uživatel je majitel restaurace..."' : '"The user is a restaurant owner..."'}</text>
              <text x="490" y="32" textAnchor="middle" className="text-2xl">📚</text>
            </g>

            {/* Layer 3: Instruction */}
            <g transform="translate(110, 110)">
              <rect x="0" y="0" width="480" height="55" rx="8" fill="url(#stack-grad-instruction)" opacity="0.9" />
              <text x="40" y="22" className="text-sm font-bold fill-white">3️⃣ INSTRUCTION</text>
              <text x="40" y="42" className="text-xs fill-white/80">{isCs ? '"Analyzuj a navrhni 3 doporučení..."' : '"Analyze and suggest 3 recommendations..."'}</text>
              <text x="430" y="32" textAnchor="middle" className="text-2xl">⚡</text>
            </g>

            {/* Layer 4: Format (Top) */}
            <g transform="translate(140, 45)">
              <rect x="0" y="0" width="420" height="55" rx="8" fill="url(#stack-grad-format)" opacity="0.9" />
              <text x="40" y="22" className="text-sm font-bold fill-white">4️⃣ FORMAT</text>
              <text x="40" y="42" className="text-xs fill-white/80">{isCs ? '"Výstup jako tabulka: Oblast | Úspora..."' : '"Output as table: Area | Savings..."'}</text>
              <text x="370" y="32" textAnchor="middle" className="text-2xl">📐</text>
            </g>

            {/* Stack indicator arrows */}
            <path d="M 350 30 L 350 5" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
            <text x="350" y="-5" textAnchor="middle" className="text-xs fill-slate-500 dark:fill-slate-400">{isCs ? 'VÝSTUP' : 'OUTPUT'}</text>
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Defense Shield Diagram
  // =====================
  if (type === 'defense-shield') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-4xl">
          <svg viewBox="0 0 800 400" className="w-full h-auto" role="img" aria-label="Defense-in-Depth Shield: 5 Layers">
             <defs>
               <radialGradient id="shield-core-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                 <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                 <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
               </radialGradient>
             </defs>

             {/* Background Grid */}
             <pattern id="grid-defense" width="40" height="40" patternUnits="userSpaceOnUse">
               <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" strokeOpacity="0.3"/>
             </pattern>
             <rect width="800" height="400" fill="url(#grid-defense)" />

             {/* Central Shield Visualization */}
             <g transform="translate(400, 200)">
               
               {/* Layer 1: Sandwich Defense (Outer) */}
               <circle cx="0" cy="0" r="160" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" className="animate-[spin_20s_linear_infinite]" />
               <path d="M -160 0 A 160 160 0 0 1 160 0" fill="none" stroke="#64748b" strokeWidth="8" strokeOpacity="0.3" />
               <text x="0" y="-175" textAnchor="middle" className="text-xs font-bold fill-slate-500 uppercase tracking-widest">1. Sandwich Defense</text>
               
               {/* Layer 2: Spotlighting */}
               <circle cx="0" cy="0" r="130" fill="none" stroke="#a855f7" strokeWidth="3" opacity="0.4" />
               <circle cx="0" cy="0" r="130" fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="10 5" className="animate-[spin_15s_linear_infinite_reverse]" />
               <text x="0" y="-138" textAnchor="middle" className="text-xs font-bold fill-purple-500 uppercase tracking-widest">2. Spotlighting</text>

               {/* Layer 3: Parametric */}
               <rect x="-100" y="-100" width="200" height="200" rx="20" fill="none" stroke="#f59e0b" strokeWidth="2" transform="rotate(45)" opacity="0.5" />
               <text x="-90" y="-90" textAnchor="middle" className="text-xs font-bold fill-amber-500 uppercase tracking-widest" transform="rotate(-45 -90 -90)">3. Parametric</text>

               {/* Layer 4: In-Context Refusal */}
               <circle cx="0" cy="0" r="70" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="2" />
               <text x="0" y="-80" textAnchor="middle" className="text-xs font-bold fill-red-500 uppercase tracking-widest">4. Refusal</text>

               {/* Layer 5: Output Filter (Core) */}
               <circle cx="0" cy="0" r="40" fill="url(#shield-core-glow)" />
               <circle cx="0" cy="0" r="30" fill="#3b82f6" fillOpacity="0.8" stroke="#60a5fa" strokeWidth="2" className="animate-pulse" />
               <text x="0" y="5" textAnchor="middle" className="text-2xl">🛡️</text>
               <text x="0" y="45" textAnchor="middle" className="text-[10px] font-bold fill-blue-300 uppercase">5. Filter</text>
             </g>

             {/* Labels / Legend Right */}
             <g transform="translate(600, 50)">
               <text x="0" y="0" className="text-sm font-bold fill-slate-300">Defense Layers</text>
               
               <g transform="translate(0, 30)">
                 <circle cx="10" cy="5" r="5" fill="#64748b" />
                 <text x="25" y="10" className="text-xs fill-slate-400">Structure (Sandwich)</text>
               </g>
               <g transform="translate(0, 60)">
                 <circle cx="10" cy="5" r="5" fill="#a855f7" />
                 <text x="25" y="10" className="text-xs fill-slate-400">Syntax (XML Tags)</text>
               </g>
               <g transform="translate(0, 90)">
                 <rect x="5" y="0" width="10" height="10" fill="#f59e0b" transform="rotate(45 10 5)" />
                 <text x="25" y="10" className="text-xs fill-slate-400">Separation (Params)</text>
               </g>
               <g transform="translate(0, 120)">
                 <circle cx="10" cy="5" r="5" fill="#ef4444" />
                 <text x="25" y="10" className="text-xs fill-slate-400">Examples (Refusal)</text>
               </g>
               <g transform="translate(0, 150)">
                 <circle cx="10" cy="5" r="5" fill="#3b82f6" />
                 <text x="25" y="10" className="text-xs fill-slate-400">Verdict (Filter)</text>
               </g>
             </g>

             {/* Attacker Left */}
             <g transform="translate(50, 180)">
               <text x="0" y="0" className="text-lg font-bold fill-red-500">🔴 Attacker</text>
               <path d="M 100 0 L 220 0" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#aim-arrow)" />
               <text x="160" y="-10" textAnchor="middle" className="text-xs fill-red-400">Injection Attempt</text>
               
               {/* Blocked */}
               <text x="235" y="5" className="text-xl fill-red-500 font-bold">✕</text>
             </g>

          </svg>
        </div>
      </div>
    );
  }

  return null;
}
