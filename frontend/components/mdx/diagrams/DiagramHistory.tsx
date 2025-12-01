"use client";

import React from 'react';
import { useLocale } from 'next-intl';

interface DiagramProps {
  type: string;
}

export default function DiagramHistory({ type }: DiagramProps) {
  const locale = useLocale();
  const isCs = locale === 'cs';

  if (type === 'traditional-vs-ml') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-slate-100/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 700 300" className="w-full h-auto" role="img" aria-label="Traditional Programming vs Machine Learning">
            <defs>
              <marker id="arrowhead-tvm" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Divider */}
            <line x1="350" y1="20" x2="350" y2="280" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

            {/* LEFT: TRADITIONAL */}
            <g transform="translate(50, 40)">
              <text x="120" y="0" textAnchor="middle" className="text-lg font-bold fill-blue-600 dark:fill-blue-400 uppercase">{isCs ? 'Tradiční' : 'Traditional'}</text>

              {/* Inputs */}
              <g transform="translate(0, 40)">
                <rect x="0" y="0" width="100" height="40" rx="4" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" />
                <text x="50" y="25" textAnchor="middle" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">{isCs ? 'Pravidla' : 'Rules'}</text>

                <rect x="140" y="0" width="100" height="40" rx="4" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" />
                <text x="190" y="25" textAnchor="middle" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">Data</text>
              </g>

              {/* Process */}
              <path d="M 50 80 L 100 120" stroke="#94a3b8" strokeWidth="2" />
              <path d="M 190 80 L 140 120" stroke="#94a3b8" strokeWidth="2" />

              <rect x="70" y="120" width="100" height="60" rx="8" fill="#1e293b" stroke="#334155" />
              <text x="120" y="155" textAnchor="middle" className="text-2xl">💻</text>

              {/* Output */}
              <path d="M 120 180 L 120 210" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-tvm)" />

              <rect x="70" y="210" width="100" height="40" rx="4" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" />
              <text x="120" y="235" textAnchor="middle" className="text-sm font-bold fill-green-700 dark:fill-green-300">{isCs ? 'Odpovědi' : 'Answers'}</text>
            </g>

            {/* RIGHT: MACHINE LEARNING */}
            <g transform="translate(400, 40)">
              <text x="120" y="0" textAnchor="middle" className="text-lg font-bold fill-purple-600 dark:fill-purple-400 uppercase">{isCs ? 'Strojové učení' : 'Machine Learning'}</text>

              {/* Inputs */}
              <g transform="translate(0, 40)">
                <rect x="0" y="0" width="100" height="40" rx="4" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" />
                <text x="50" y="25" textAnchor="middle" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">{isCs ? 'Odpovědi' : 'Answers'}</text>

                <rect x="140" y="0" width="100" height="40" rx="4" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" />
                <text x="190" y="25" textAnchor="middle" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">Data</text>
              </g>

              {/* Process */}
              <path d="M 50 80 L 100 120" stroke="#94a3b8" strokeWidth="2" />
              <path d="M 190 80 L 140 120" stroke="#94a3b8" strokeWidth="2" />

              <rect x="70" y="120" width="100" height="60" rx="8" fill="#1e293b" stroke="#334155" />
              <text x="120" y="155" textAnchor="middle" className="text-2xl">🧠</text>

              {/* Output */}
              <path d="M 120 180 L 120 210" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-tvm)" />

              <rect x="70" y="210" width="100" height="40" rx="4" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" />
              <text x="120" y="235" textAnchor="middle" className="text-sm font-bold fill-amber-700 dark:fill-amber-300">{isCs ? 'Pravidla' : 'Rules'}</text>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  if (type === 'ai-timeline') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 700 300" className="w-full h-auto" role="img" aria-label="The Two Waves of AI: Discriminative vs Generative">
            <defs>
              <marker id="arrowhead-timeline" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* --- WAVE 1: DISCRIMINATIVE --- */}
            <g transform="translate(50, 40)">
              <text x="0" y="0" className="text-sm font-bold fill-slate-600 dark:fill-slate-400 uppercase tracking-widest">{isCs ? 'Vlna 1: Diskriminativní AI' : 'Wave 1: Discriminative AI'}</text>

              {/* Input: Cat Photo */}
              <g transform="translate(0, 30)">
                <rect x="0" y="0" width="60" height="60" rx="4" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" />
                <text x="30" y="35" textAnchor="middle" className="text-2xl">🐱</text>
                <text x="30" y="75" textAnchor="middle" className="text-xs fill-slate-600 dark:fill-slate-400">Data</text>
              </g>

              {/* Arrow */}
              <path d="M 80 60 L 130 60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-timeline)" />

              {/* The Model (Judge) */}
              <g transform="translate(140, 30)">
                <polygon points="30,0 60,30 30,60 0,30" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" />
                <text x="30" y="35" textAnchor="middle" className="text-xl">⚖️</text>
                <text x="30" y="75" textAnchor="middle" className="text-xs fill-purple-700 dark:fill-purple-300">{isCs ? 'Soudce' : 'The Judge'}</text>
              </g>

              {/* Arrow */}
              <path d="M 210 60 L 260 60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-timeline)" />

              {/* Output: Label */}
              <g transform="translate(270, 40)">
                <rect x="0" y="0" width="80" height="40" rx="20" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" />
                <text x="40" y="25" textAnchor="middle" className="text-sm font-bold fill-green-700 dark:fill-green-300">{isCs ? '"Kočka"' : '"Cat"'}</text>
              </g>
            </g>

            {/* Divider */}
            <line x1="50" y1="150" x2="650" y2="150" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

            {/* --- WAVE 2: GENERATIVE --- */}
            <g transform="translate(50, 180)">
              <text x="0" y="0" className="text-sm font-bold fill-slate-600 dark:fill-slate-400 uppercase tracking-widest">{isCs ? 'Vlna 2: Generativní AI' : 'Wave 2: Generative AI'}</text>

              {/* Input: Prompt */}
              <g transform="translate(0, 30)">
                <rect x="0" y="0" width="100" height="60" rx="4" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" />
                <text x="50" y="25" textAnchor="middle" className="text-xs font-bold fill-amber-700 dark:fill-amber-200">{isCs ? '"Namaluj kyberpunk kočku"' : '"Paint a cyberpunk cat"'}</text>
                <text x="50" y="75" textAnchor="middle" className="text-xs fill-slate-600 dark:fill-slate-400">Prompt</text>
              </g>

              {/* Arrow */}
              <path d="M 110 60 L 160 60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-timeline)" />

              {/* The Model (Artist) */}
              <g transform="translate(170, 30)">
                <circle cx="30" cy="30" r="30" fill="#ec4899" fillOpacity="0.1" stroke="#ec4899" className="animate-pulse" />
                <text x="30" y="35" textAnchor="middle" className="text-xl">🎨</text>
                <text x="30" y="75" textAnchor="middle" className="text-xs fill-pink-700 dark:fill-pink-300">{isCs ? 'Tvůrce' : 'The Creator'}</text>
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

  if (type === 'ai-history-timeline') {
    return (
      <div className="my-8 flex justify-center">
        <div className="relative p-6 rounded-2xl bg-slate-100/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg w-full max-w-4xl overflow-x-auto">
          <svg viewBox="0 0 800 200" className="w-full min-w-[700px] h-auto" role="img" aria-label="History of AI: 1950s to Now">
            {/* Timeline Line */}
            <line x1="50" y1="100" x2="750" y2="100" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

            {/* 1950: Turing */}
            <g transform="translate(50, 60)">
              <circle cx="20" cy="40" r="8" fill="#3b82f6" />
              <text x="20" y="20" textAnchor="middle" className="text-xs font-bold fill-blue-700 dark:fill-blue-300">1950</text>
              <text x="20" y="130" textAnchor="middle" className="text-[10px] fill-slate-600 dark:fill-slate-400">{isCs ? 'Turingův test' : 'Turing Test'}</text>
            </g>

            {/* 1997: Deep Blue */}
            <g transform="translate(200, 60)">
              <circle cx="20" cy="40" r="8" fill="#a855f7" />
              <text x="20" y="20" textAnchor="middle" className="text-xs font-bold fill-purple-700 dark:fill-purple-300">1997</text>
              <text x="20" y="130" textAnchor="middle" className="text-[10px] fill-slate-600 dark:fill-slate-400">{isCs ? 'Deep Blue (Šachy)' : 'Deep Blue (Chess)'}</text>
            </g>

            {/* 2012: Deep Learning */}
            <g transform="translate(350, 60)">
              <circle cx="20" cy="40" r="8" fill="#ef4444" />
              <text x="20" y="20" textAnchor="middle" className="text-xs font-bold fill-red-700 dark:fill-red-300">2012</text>
              <text x="20" y="130" textAnchor="middle" className="text-[10px] fill-slate-600 dark:fill-slate-400">{isCs ? 'AlexNet (Vidění)' : 'AlexNet (Vision)'}</text>
            </g>

            {/* 2017: Transformers */}
            <g transform="translate(500, 60)">
              <circle cx="20" cy="40" r="8" fill="#f59e0b" />
              <text x="20" y="20" textAnchor="middle" className="text-xs font-bold fill-amber-700 dark:fill-amber-300">2017</text>
              <text x="20" y="130" textAnchor="middle" className="text-[10px] fill-slate-600 dark:fill-slate-400">Transformers</text>
            </g>

            {/* 2022: ChatGPT */}
            <g transform="translate(650, 60)">
              <circle cx="20" cy="40" r="12" fill="#22c55e" className="animate-pulse" />
              <text x="20" y="20" textAnchor="middle" className="text-sm font-bold fill-green-700 dark:fill-green-300">2022</text>
              <text x="20" y="130" textAnchor="middle" className="text-xs font-bold fill-slate-800 dark:fill-white">ChatGPT</text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  return null;
}
