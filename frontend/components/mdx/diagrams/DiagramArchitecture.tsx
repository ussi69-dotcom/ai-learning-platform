"use client";

import React from 'react';
import { useLocale } from 'next-intl';

interface DiagramProps {
  type: string;
}

export default function DiagramArchitecture({ type }: DiagramProps) {
  const locale = useLocale();
  const isCs = locale === 'cs';

  // =====================
  // Local LLM Architecture
  // =====================
  if (type === 'local-llm-architecture') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 800 300" className="w-full h-auto" role="img" aria-label="Local LLM Architecture: User -> UI -> Inference Engine -> Hardware">
            <defs>
              <linearGradient id="arch-grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="arch-grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <marker id="arch-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
              </marker>
            </defs>

            {/* Step 1: User/UI */}
            <g transform="translate(50, 50)">
              <rect x="0" y="0" width="180" height="200" rx="12" fill="#fff" fillOpacity="0.05" stroke="#334155" strokeDasharray="4 4"/>
              <text x="20" y="30" className="text-sm font-bold fill-slate-500">CLIENT LAYER</text>
              
              <g transform="translate(20, 60)">
                <rect x="0" y="0" width="140" height="50" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6"/>
                <text x="70" y="30" textAnchor="middle" className="text-sm font-bold fill-blue-500">Open WebUI</text>
              </g>

              <g transform="translate(20, 130)">
                <rect x="0" y="0" width="140" height="50" rx="8" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7"/>
                <text x="70" y="30" textAnchor="middle" className="text-sm font-bold fill-purple-500">Python Script</text>
              </g>
            </g>

            {/* Connector */}
            <path d="M 230 150 L 270 150" stroke="#64748b" strokeWidth="2" markerEnd="url(#arch-arrow)" />
            <text x="250" y="140" textAnchor="middle" className="text-xs fill-slate-500 font-mono">HTTP/API</text>

            {/* Step 2: Inference Engine */}
            <g transform="translate(280, 50)">
              <rect x="0" y="0" width="200" height="200" rx="12" fill="url(#arch-grad-blue)" fillOpacity="0.1" stroke="#3b82f6"/>
              <text x="100" y="30" textAnchor="middle" className="text-sm font-bold fill-blue-400">INFERENCE ENGINE</text>
              
              <g transform="translate(30, 60)">
                <circle cx="70" cy="50" r="40" fill="#fff" fillOpacity="0.9"/>
                <text x="70" y="55" textAnchor="middle" className="text-xl font-bold fill-slate-900">🦙 Ollama</text>
              </g>

              <text x="100" y="160" textAnchor="middle" className="text-xs fill-blue-300">llama.cpp runtime</text>
            </g>

            {/* Connector */}
            <path d="M 480 150 L 520 150" stroke="#64748b" strokeWidth="2" markerEnd="url(#arch-arrow)" />
             <text x="500" y="140" textAnchor="middle" className="text-xs fill-slate-500 font-mono">Loads</text>

            {/* Step 3: Hardware/Model */}
            <g transform="translate(530, 50)">
              <rect x="0" y="0" width="220" height="200" rx="12" fill="#fff" fillOpacity="0.05" stroke="#334155"/>
              <text x="110" y="30" textAnchor="middle" className="text-sm font-bold fill-slate-500">HARDWARE & MODEL</text>

              <g transform="translate(20, 60)">
                <rect x="0" y="0" width="180" height="40" rx="4" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b"/>
                <text x="90" y="25" textAnchor="middle" className="text-xs font-bold fill-amber-500">RAM / VRAM (16GB)</text>
              </g>

              <g transform="translate(40, 120)">
                <path d="M 0 0 L 140 0 L 140 60 L 0 60 Z" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e"/>
                <text x="70" y="25" textAnchor="middle" className="text-xs font-bold fill-green-500">📦 Llama-3.2.gguf</text>
                <text x="70" y="45" textAnchor="middle" className="text-[10px] fill-green-400">Q4_K_M (4-bit)</text>
              </g>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // MCP Architecture
  // =====================
  if (type === 'mcp-architecture') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-4xl">
          <svg viewBox="0 0 800 350" className="w-full h-auto" role="img" aria-label="MCP Architecture: Client <-> Protocol <-> Server <-> Resource">
             <defs>
              <marker id="mcp-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
             </defs>

             {/* Background Flow Line */}
             <path d="M 120 175 L 680 175" stroke="#334155" strokeWidth="4" strokeDasharray="8 8" opacity="0.5" />

             {/* 1. HOST (Client) */}
             <g transform="translate(50, 100)">
               <rect x="0" y="0" width="160" height="150" rx="12" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2"/>
               <text x="80" y="30" textAnchor="middle" className="text-sm font-bold fill-blue-500">MCP HOST</text>
               <text x="80" y="50" textAnchor="middle" className="text-xs fill-blue-300">(Client)</text>
               
               <g transform="translate(30, 70)">
                 <rect x="0" y="0" width="100" height="40" rx="4" fill="#fff" fillOpacity="0.1"/>
                 <text x="50" y="25" textAnchor="middle" className="text-xs font-bold fill-white">Claude Desktop</text>
               </g>
               <g transform="translate(30, 120)">
                  <text x="50" y="0" textAnchor="middle" className="text-[10px] fill-blue-400">Cursor / IDE</text>
               </g>
             </g>

             {/* 2. PROTOCOL (USB-C Metaphor) */}
             <g transform="translate(260, 140)">
               <circle cx="40" cy="35" r="40" fill="#1e293b" stroke="#94a3b8" strokeWidth="2"/>
               <text x="40" y="30" textAnchor="middle" className="text-xl font-bold fill-slate-200">MCP</text>
               <text x="40" y="50" textAnchor="middle" className="text-[10px] fill-slate-400">JSON-RPC</text>
               <text x="40" y="95" textAnchor="middle" className="text-[10px] fill-slate-500 italic">"The USB-C cable"</text>
             </g>

             {/* 3. SERVER */}
             <g transform="translate(390, 100)">
               <rect x="0" y="0" width="160" height="150" rx="12" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" strokeWidth="2"/>
               <text x="80" y="30" textAnchor="middle" className="text-sm font-bold fill-purple-500">MCP SERVER</text>
               
               <g transform="translate(30, 70)">
                 <rect x="0" y="0" width="100" height="40" rx="4" fill="#fff" fillOpacity="0.1" stroke="#a855f7" strokeDasharray="2 2"/>
                 <text x="50" y="25" textAnchor="middle" className="text-xs font-bold fill-purple-300">Running Process</text>
               </g>
             </g>

             {/* 4. RESOURCES (Tools) */}
             <g transform="translate(600, 80)">
               {/* DB */}
               <g transform="translate(0, 0)">
                 <path d="M 0 10 Q 30 0 60 10 L 60 50 Q 30 60 0 50 Z" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e"/>
                 <ellipse cx="30" cy="10" rx="30" ry="10" fill="#22c55e" fillOpacity="0.3" stroke="#22c55e"/>
                 <text x="80" y="35" textAnchor="start" className="text-xs font-bold fill-green-500">Postgres DB</text>
               </g>

               {/* Files */}
               <g transform="translate(0, 80)">
                 <rect x="10" y="0" width="40" height="50" rx="4" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b"/>
                 <text x="80" y="30" textAnchor="start" className="text-xs font-bold fill-amber-500">Local Files</text>
               </g>

               {/* API */}
               <g transform="translate(0, 150)">
                 <circle cx="30" cy="25" r="25" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444"/>
                 <text x="80" y="30" textAnchor="start" className="text-xs font-bold fill-red-500">GitHub API</text>
               </g>
             </g>

             {/* Connection Arrows Resource -> Server */}
             <path d="M 550 130 L 590 110" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" />
             <path d="M 550 175 L 590 175" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" />
             <path d="M 550 220 L 590 200" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" />

          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Model Benchmark Chart (2025)
  // =====================
  if (type === 'model-benchmark-chart') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-4xl">
          <svg viewBox="0 0 800 400" className="w-full h-auto" role="img" aria-label="Model Benchmark Comparison 2025">
            <defs>
              <linearGradient id="bench-local" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
              <linearGradient id="bench-cloud" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>

            {/* Title */}
            <text x="400" y="30" textAnchor="middle" className="text-lg font-bold fill-white">📊 {isCs ? 'Benchmark Arena 2025' : 'Benchmark Arena 2025'}</text>
            <text x="400" y="50" textAnchor="middle" className="text-xs fill-slate-400">{isCs ? 'MMLU skóre (vyšší = lepší)' : 'MMLU Score (higher = better)'}</text>

            {/* Y-axis */}
            <line x1="100" y1="80" x2="100" y2="350" stroke="#334155" strokeWidth="2" />
            <text x="90" y="90" textAnchor="end" className="text-xs fill-slate-500">90%</text>
            <text x="90" y="170" textAnchor="end" className="text-xs fill-slate-500">70%</text>
            <text x="90" y="260" textAnchor="end" className="text-xs fill-slate-500">50%</text>
            <text x="90" y="350" textAnchor="end" className="text-xs fill-slate-500">30%</text>

            {/* Grid lines */}
            <line x1="100" y1="90" x2="750" y2="90" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            <line x1="100" y1="170" x2="750" y2="170" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            <line x1="100" y1="260" x2="750" y2="260" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />

            {/* Bars - GPT-5.1 (Cloud) */}
            <g transform="translate(130, 0)">
              <rect x="0" y="85" width="60" height="265" rx="4" fill="url(#bench-cloud)" />
              <text x="30" y="75" textAnchor="middle" className="text-sm font-bold fill-blue-400">92.1%</text>
              <text x="30" y="370" textAnchor="middle" className="text-xs fill-slate-400">GPT-5.1</text>
              <text x="30" y="385" textAnchor="middle" className="text-[10px] fill-blue-500">☁️ Cloud</text>
            </g>

            {/* Bars - Claude Opus 4.5 (Cloud) */}
            <g transform="translate(220, 0)">
              <rect x="0" y="88" width="60" height="262" rx="4" fill="url(#bench-cloud)" />
              <text x="30" y="78" textAnchor="middle" className="text-sm font-bold fill-blue-400">91.5%</text>
              <text x="30" y="370" textAnchor="middle" className="text-xs fill-slate-400">Opus 4.5</text>
              <text x="30" y="385" textAnchor="middle" className="text-[10px] fill-blue-500">☁️ Cloud</text>
            </g>

            {/* Bars - Gemini 3 Pro (Cloud) */}
            <g transform="translate(330, 0)">
              <rect x="0" y="90" width="60" height="260" rx="4" fill="url(#bench-cloud)" />
              <text x="30" y="80" textAnchor="middle" className="text-sm font-bold fill-blue-400">91.0%</text>
              <text x="30" y="370" textAnchor="middle" className="text-xs fill-slate-400">Gemini 3</text>
              <text x="30" y="385" textAnchor="middle" className="text-[10px] fill-blue-500">☁️ Cloud</text>
            </g>

            {/* Bars - Llama 4 Maverick (Local) */}
            <g transform="translate(440, 0)">
              <rect x="0" y="100" width="60" height="250" rx="4" fill="url(#bench-local)" />
              <text x="30" y="90" textAnchor="middle" className="text-sm font-bold fill-green-400">89.2%</text>
              <text x="30" y="370" textAnchor="middle" className="text-xs fill-slate-400">Llama 4 Mav</text>
              <text x="30" y="385" textAnchor="middle" className="text-[10px] fill-green-500">🖥️ Local</text>
            </g>

            {/* Bars - Qwen 3 235B (Local) */}
            <g transform="translate(550, 0)">
              <rect x="0" y="105" width="60" height="245" rx="4" fill="url(#bench-local)" />
              <text x="30" y="95" textAnchor="middle" className="text-sm font-bold fill-green-400">88.5%</text>
              <text x="30" y="370" textAnchor="middle" className="text-xs fill-slate-400">Qwen 3</text>
              <text x="30" y="385" textAnchor="middle" className="text-[10px] fill-green-500">🖥️ Local</text>
            </g>

            {/* Bars - Llama 4 Scout (Local - Budget) */}
            <g transform="translate(660, 0)">
              <rect x="0" y="115" width="60" height="235" rx="4" fill="url(#bench-local)" opacity="0.7" />
              <text x="30" y="105" textAnchor="middle" className="text-sm font-bold fill-green-400">80.5%</text>
              <text x="30" y="370" textAnchor="middle" className="text-xs fill-slate-400">Llama 4 Scout</text>
              <text x="30" y="385" textAnchor="middle" className="text-[10px] fill-green-500">🖥️ 8GB</text>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // VRAM Stack Visualization
  // =====================
  if (type === 'vram-stack') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 700 300" className="w-full h-auto" role="img" aria-label="VRAM Stack Visualization">
            {/* Title */}
            <text x="350" y="25" textAnchor="middle" className="text-base font-bold fill-white">🧮 {isCs ? 'Jak model zabírá VRAM' : 'How Models Consume VRAM'}</text>

            {/* 8GB Card */}
            <g transform="translate(50, 50)">
              <rect x="0" y="0" width="180" height="220" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              <text x="90" y="25" textAnchor="middle" className="text-sm font-bold fill-slate-300">RTX 4060 (8GB)</text>
              
              {/* Llama 8B Q4 - 5.6GB */}
              <rect x="10" y="40" width="160" height="140" rx="4" fill="#22c55e" fillOpacity="0.3" stroke="#22c55e" />
              <text x="90" y="80" textAnchor="middle" className="text-xs fill-green-400">Llama 4 8B (Q4)</text>
              <text x="90" y="100" textAnchor="middle" className="text-lg font-bold fill-green-500">5.6 GB</text>
              <text x="90" y="120" textAnchor="middle" className="text-[10px] fill-green-300">✓ {isCs ? 'Vejde se!' : 'Fits!'}</text>

              {/* Free space */}
              <rect x="10" y="185" width="160" height="25" rx="4" fill="#334155" fillOpacity="0.5" />
              <text x="90" y="202" textAnchor="middle" className="text-[10px] fill-slate-400">{isCs ? '2.4 GB volno' : '2.4 GB free'}</text>
            </g>

            {/* 24GB Card */}
            <g transform="translate(260, 50)">
              <rect x="0" y="0" width="180" height="220" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              <text x="90" y="25" textAnchor="middle" className="text-sm font-bold fill-slate-300">RTX 4090 (24GB)</text>
              
              {/* Llama 70B Q4 - needs more */}
              <rect x="10" y="40" width="160" height="180" rx="4" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeDasharray="4 4" />
              <text x="90" y="80" textAnchor="middle" className="text-xs fill-red-400">Llama 4 70B (Q4)</text>
              <text x="90" y="100" textAnchor="middle" className="text-lg font-bold fill-red-500">~40 GB</text>
              <text x="90" y="120" textAnchor="middle" className="text-[10px] fill-red-300">✗ {isCs ? 'Nevejde se' : 'Doesn\'t fit'}</text>
              <text x="90" y="160" textAnchor="middle" className="text-[10px] fill-slate-400">{isCs ? 'Potřeba 2x GPU' : 'Needs 2x GPU'}</text>
            </g>

            {/* Mac M4 Ultra */}
            <g transform="translate(470, 50)">
              <rect x="0" y="0" width="180" height="220" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
              <text x="90" y="25" textAnchor="middle" className="text-sm font-bold fill-purple-300">Mac M4 Ultra (128GB)</text>
              
              {/* Llama 70B Q4 - fits! */}
              <rect x="10" y="40" width="160" height="80" rx="4" fill="#22c55e" fillOpacity="0.3" stroke="#22c55e" />
              <text x="90" y="70" textAnchor="middle" className="text-xs fill-green-400">Llama 4 70B (Q4)</text>
              <text x="90" y="90" textAnchor="middle" className="text-sm font-bold fill-green-500">40 GB ✓</text>

              {/* Free space */}
              <rect x="10" y="125" width="160" height="85" rx="4" fill="#334155" fillOpacity="0.5" />
              <text x="90" y="170" textAnchor="middle" className="text-[10px] fill-slate-400">{isCs ? '88 GB volno' : '88 GB free'}</text>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Latency Comparison
  // =====================
  if (type === 'latency-comparison') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 700 250" className="w-full h-auto" role="img" aria-label="Latency Comparison: Local vs Cloud">
            {/* Title */}
            <text x="350" y="25" textAnchor="middle" className="text-base font-bold fill-white">⚡ {isCs ? 'Latence: Local vs Cloud' : 'Latency: Local vs Cloud'}</text>
            <text x="350" y="45" textAnchor="middle" className="text-xs fill-slate-400">{isCs ? 'Time to First Token (TTFT)' : 'Time to First Token (TTFT)'}</text>

            {/* Local - M4 Ultra */}
            <g transform="translate(50, 80)">
              <rect x="0" y="0" width="80" height="30" rx="4" fill="#22c55e" />
              <text x="40" y="20" textAnchor="middle" className="text-xs font-bold fill-white">12ms</text>
              <text x="100" y="20" textAnchor="start" className="text-xs fill-slate-300">Mac M4 Ultra (Local)</text>
              <text x="590" y="20" textAnchor="end" className="text-xs fill-green-500">🚀 {isCs ? 'Okamžité' : 'Instant'}</text>
            </g>

            {/* Local - RTX 5090 */}
            <g transform="translate(50, 120)">
              <rect x="0" y="0" width="100" height="30" rx="4" fill="#22c55e" fillOpacity="0.8" />
              <text x="50" y="20" textAnchor="middle" className="text-xs font-bold fill-white">18ms</text>
              <text x="120" y="20" textAnchor="start" className="text-xs fill-slate-300">NVIDIA RTX 5090 (Local)</text>
            </g>

            {/* Cloud - GPT-5.1 */}
            <g transform="translate(50, 160)">
              <rect x="0" y="0" width="350" height="30" rx="4" fill="#3b82f6" />
              <text x="175" y="20" textAnchor="middle" className="text-xs font-bold fill-white">150-300ms</text>
              <text x="370" y="20" textAnchor="start" className="text-xs fill-slate-300">GPT-5.1 (API)</text>
              <text x="590" y="20" textAnchor="end" className="text-xs fill-blue-400">{isCs ? 'Síťová latence' : 'Network latency'}</text>
            </g>

            {/* Cloud - Claude Opus 4.5 */}
            <g transform="translate(50, 200)">
              <rect x="0" y="0" width="400" height="30" rx="4" fill="#3b82f6" fillOpacity="0.8" />
              <text x="200" y="20" textAnchor="middle" className="text-xs font-bold fill-white">200-400ms</text>
              <text x="420" y="20" textAnchor="start" className="text-xs fill-slate-300">Opus 4.5 (API)</text>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Antigravity Workflow
  // =====================
  if (type === 'antigravity-workflow') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-4xl">
          <svg viewBox="0 0 900 280" className="w-full h-auto" role="img" aria-label="Antigravity Workflow: Idea to Deployment">
            <defs>
              <linearGradient id="ag-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
              <marker id="ag-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#a855f7" />
              </marker>
            </defs>

            {/* Title */}
            <text x="450" y="30" textAnchor="middle" className="text-lg font-bold fill-white">🚀 Antigravity Workflow</text>

            {/* Flow line */}
            <path d="M 100 150 L 800 150" stroke="url(#ag-gradient)" strokeWidth="3" strokeDasharray="10 5" opacity="0.5" />

            {/* Step 1: Idea */}
            <g transform="translate(50, 80)">
              <circle cx="50" cy="70" r="45" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2" />
              <text x="50" y="65" textAnchor="middle" className="text-2xl">💡</text>
              <text x="50" y="85" textAnchor="middle" className="text-xs font-bold fill-purple-400">{isCs ? 'Nápad' : 'Idea'}</text>
              <text x="50" y="150" textAnchor="middle" className="text-[10px] fill-slate-400">{isCs ? '"Udělej mi app"' : '"Build me an app"'}</text>
            </g>

            {/* Arrow */}
            <path d="M 145 150 L 195 150" stroke="#a855f7" strokeWidth="2" markerEnd="url(#ag-arrow)" />

            {/* Step 2: Canvas */}
            <g transform="translate(200, 80)">
              <rect x="0" y="25" width="120" height="90" rx="8" fill="#ec4899" fillOpacity="0.2" stroke="#ec4899" strokeWidth="2" />
              <text x="60" y="65" textAnchor="middle" className="text-2xl">🎨</text>
              <text x="60" y="85" textAnchor="middle" className="text-xs font-bold fill-pink-400">Canvas</text>
              <text x="60" y="100" textAnchor="middle" className="text-[10px] fill-pink-300">{isCs ? 'Vizuální editor' : 'Visual Editor'}</text>
              <text x="60" y="150" textAnchor="middle" className="text-[10px] fill-slate-400">{isCs ? 'Drag & Drop' : 'Drag & Drop'}</text>
            </g>

            {/* Arrow */}
            <path d="M 325 150 L 375 150" stroke="#ec4899" strokeWidth="2" markerEnd="url(#ag-arrow)" />

            {/* Step 3: AI Agent */}
            <g transform="translate(380, 80)">
              <rect x="0" y="25" width="120" height="90" rx="8" fill="#f97316" fillOpacity="0.2" stroke="#f97316" strokeWidth="2" />
              <text x="60" y="65" textAnchor="middle" className="text-2xl">🤖</text>
              <text x="60" y="85" textAnchor="middle" className="text-xs font-bold fill-orange-400">AI Agent</text>
              <text x="60" y="100" textAnchor="middle" className="text-[10px] fill-orange-300">Gemini 2.5</text>
              <text x="60" y="150" textAnchor="middle" className="text-[10px] fill-slate-400">{isCs ? 'Generuje kód' : 'Generates code'}</text>
            </g>

            {/* Arrow */}
            <path d="M 505 150 L 555 150" stroke="#f97316" strokeWidth="2" markerEnd="url(#ag-arrow)" />

            {/* Step 4: Code */}
            <g transform="translate(560, 80)">
              <rect x="0" y="25" width="120" height="90" rx="8" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="2" />
              <text x="60" y="65" textAnchor="middle" className="text-2xl">💻</text>
              <text x="60" y="85" textAnchor="middle" className="text-xs font-bold fill-green-400">{isCs ? 'Kód' : 'Code'}</text>
              <text x="60" y="100" textAnchor="middle" className="text-[10px] fill-green-300">Python/JS</text>
              <text x="60" y="150" textAnchor="middle" className="text-[10px] fill-slate-400">{isCs ? 'Hotový projekt' : 'Complete project'}</text>
            </g>

            {/* Arrow */}
            <path d="M 685 150 L 735 150" stroke="#22c55e" strokeWidth="2" markerEnd="url(#ag-arrow)" />

            {/* Step 5: Deploy */}
            <g transform="translate(740, 80)">
              <circle cx="50" cy="70" r="45" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
              <text x="50" y="65" textAnchor="middle" className="text-2xl">🌐</text>
              <text x="50" y="85" textAnchor="middle" className="text-xs font-bold fill-blue-400">Deploy</text>
              <text x="50" y="150" textAnchor="middle" className="text-[10px] fill-slate-400">{isCs ? 'Jeden klik' : 'One click'}</text>
            </g>

            {/* Bottom: Key differentiator */}
            <rect x="250" y="220" width="400" height="40" rx="8" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" />
            <text x="450" y="245" textAnchor="middle" className="text-sm font-bold fill-green-400">✨ {isCs ? 'ZDARMA • Python-native • Bez instalace' : 'FREE • Python-native • No install'}</text>

          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // IDE Comparison Radar
  // =====================
  if (type === 'ide-comparison-radar') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-4xl">
          <svg viewBox="0 0 800 450" className="w-full h-auto" role="img" aria-label="AI IDE Comparison">
            {/* Title */}
            <text x="400" y="30" textAnchor="middle" className="text-lg font-bold fill-white">🔧 {isCs ? 'Srovnání AI IDE (2025)' : 'AI IDE Comparison (2025)'}</text>

            {/* Legend */}
            <g transform="translate(550, 60)">
              <rect x="0" y="0" width="15" height="15" fill="#a855f7" />
              <text x="20" y="12" className="text-xs fill-slate-300">Antigravity</text>
              <rect x="100" y="0" width="15" height="15" fill="#3b82f6" />
              <text x="120" y="12" className="text-xs fill-slate-300">Cursor</text>
              <rect x="180" y="0" width="15" height="15" fill="#22c55e" />
              <text x="200" y="12" className="text-xs fill-slate-300">Windsurf</text>
            </g>

            {/* Comparison Table Visual */}
            <g transform="translate(50, 100)">
              {/* Headers */}
              <text x="0" y="0" className="text-sm font-bold fill-slate-400">{isCs ? 'Funkce' : 'Feature'}</text>
              <text x="250" y="0" textAnchor="middle" className="text-sm font-bold fill-purple-400">Antigravity</text>
              <text x="400" y="0" textAnchor="middle" className="text-sm font-bold fill-blue-400">Cursor</text>
              <text x="550" y="0" textAnchor="middle" className="text-sm font-bold fill-green-400">Windsurf</text>
              <text x="680" y="0" textAnchor="middle" className="text-sm font-bold fill-slate-400">Claude Code</text>

              {/* Row 1: Price */}
              <line x1="0" y1="20" x2="700" y2="20" stroke="#334155" />
              <text x="0" y="45" className="text-xs fill-slate-300">{isCs ? 'Cena' : 'Price'}</text>
              <text x="250" y="45" textAnchor="middle" className="text-sm font-bold fill-green-400">ZDARMA 🎉</text>
              <text x="400" y="45" textAnchor="middle" className="text-xs fill-slate-300">$20/mo</text>
              <text x="550" y="45" textAnchor="middle" className="text-xs fill-slate-300">$10/mo</text>
              <text x="680" y="45" textAnchor="middle" className="text-xs fill-slate-300">$20/mo</text>

              {/* Row 2: Speed */}
              <line x1="0" y1="65" x2="700" y2="65" stroke="#334155" />
              <text x="0" y="90" className="text-xs fill-slate-300">{isCs ? 'Rychlost' : 'Speed'}</text>
              <text x="250" y="90" textAnchor="middle" className="text-xs fill-slate-300">⭐⭐⭐</text>
              <text x="400" y="90" textAnchor="middle" className="text-sm font-bold fill-blue-400">⭐⭐⭐⭐⭐</text>
              <text x="550" y="90" textAnchor="middle" className="text-xs fill-slate-300">⭐⭐⭐⭐</text>
              <text x="680" y="90" textAnchor="middle" className="text-xs fill-slate-300">⭐⭐⭐</text>

              {/* Row 3: Agent Quality */}
              <line x1="0" y1="110" x2="700" y2="110" stroke="#334155" />
              <text x="0" y="135" className="text-xs fill-slate-300">{isCs ? 'Agentní schopnosti' : 'Agent Quality'}</text>
              <text x="250" y="135" textAnchor="middle" className="text-sm font-bold fill-purple-400">⭐⭐⭐⭐⭐</text>
              <text x="400" y="135" textAnchor="middle" className="text-xs fill-slate-300">⭐⭐⭐</text>
              <text x="550" y="135" textAnchor="middle" className="text-sm font-bold fill-green-400">⭐⭐⭐⭐⭐</text>
              <text x="680" y="135" textAnchor="middle" className="text-xs fill-slate-300">⭐⭐⭐⭐</text>

              {/* Row 4: Best For */}
              <line x1="0" y1="155" x2="700" y2="155" stroke="#334155" />
              <text x="0" y="180" className="text-xs fill-slate-300">{isCs ? 'Nejlepší pro' : 'Best For'}</text>
              <text x="250" y="180" textAnchor="middle" className="text-[10px] fill-purple-300">{isCs ? 'Prototypy' : 'Prototypes'}</text>
              <text x="400" y="180" textAnchor="middle" className="text-[10px] fill-blue-300">{isCs ? 'Denní práce' : 'Daily driver'}</text>
              <text x="550" y="180" textAnchor="middle" className="text-[10px] fill-green-300">{isCs ? 'Velké změny' : 'Big refactors'}</text>
              <text x="680" y="180" textAnchor="middle" className="text-[10px] fill-slate-300">{isCs ? 'Architektura' : 'Architecture'}</text>

              {/* Row 5: MCP Support */}
              <line x1="0" y1="200" x2="700" y2="200" stroke="#334155" />
              <text x="0" y="225" className="text-xs fill-slate-300">MCP</text>
              <text x="250" y="225" textAnchor="middle" className="text-xs fill-green-400">✓</text>
              <text x="400" y="225" textAnchor="middle" className="text-xs fill-green-400">✓</text>
              <text x="550" y="225" textAnchor="middle" className="text-xs fill-green-400">✓</text>
              <text x="680" y="225" textAnchor="middle" className="text-xs fill-green-400">✓</text>

              {/* Row 6: Local LLM */}
              <line x1="0" y1="245" x2="700" y2="245" stroke="#334155" />
              <text x="0" y="270" className="text-xs fill-slate-300">{isCs ? 'Lokální LLM' : 'Local LLM'}</text>
              <text x="250" y="270" textAnchor="middle" className="text-xs fill-green-400">✓ Ollama</text>
              <text x="400" y="270" textAnchor="middle" className="text-xs fill-green-400">✓ Ollama</text>
              <text x="550" y="270" textAnchor="middle" className="text-xs fill-green-400">✓ Ollama</text>
              <text x="680" y="270" textAnchor="middle" className="text-xs fill-red-400">✗</text>

            </g>

            {/* Bottom recommendation */}
            <rect x="100" y="390" width="600" height="40" rx="8" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" />
            <text x="400" y="415" textAnchor="middle" className="text-sm fill-purple-300">💡 {isCs ? 'Tip: Začni s Antigravity (zdarma), pak přejdi na Cursor pro denní práci' : 'Tip: Start with Antigravity (free), then move to Cursor for daily work'}</text>

          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Ollama Ecosystem
  // =====================
  if (type === 'ollama-ecosystem') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-3xl">
          <svg viewBox="0 0 700 350" className="w-full h-auto" role="img" aria-label="Ollama Ecosystem">
            {/* Title */}
            <text x="350" y="30" textAnchor="middle" className="text-lg font-bold fill-white">🦙 Ollama Ecosystem</text>

            {/* Central Ollama */}
            <g transform="translate(280, 120)">
              <circle cx="70" cy="70" r="60" fill="#fff" fillOpacity="0.1" stroke="#22c55e" strokeWidth="3" />
              <text x="70" y="60" textAnchor="middle" className="text-3xl">🦙</text>
              <text x="70" y="90" textAnchor="middle" className="text-sm font-bold fill-green-400">Ollama</text>
              <text x="70" y="105" textAnchor="middle" className="text-[10px] fill-green-300">Core Engine</text>
            </g>

            {/* Orbiting elements */}
            {/* Models */}
            <g transform="translate(50, 80)">
              <rect x="0" y="0" width="100" height="60" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
              <text x="50" y="25" textAnchor="middle" className="text-lg">📦</text>
              <text x="50" y="45" textAnchor="middle" className="text-xs font-bold fill-blue-400">{isCs ? 'Modely' : 'Models'}</text>
              <line x1="100" y1="30" x2="220" y2="120" stroke="#3b82f6" strokeDasharray="4 4" />
            </g>

            {/* WebUI */}
            <g transform="translate(550, 80)">
              <rect x="0" y="0" width="100" height="60" rx="8" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" />
              <text x="50" y="25" textAnchor="middle" className="text-lg">🖥️</text>
              <text x="50" y="45" textAnchor="middle" className="text-xs font-bold fill-purple-400">Open WebUI</text>
              <line x1="0" y1="30" x2="-130" y2="120" stroke="#a855f7" strokeDasharray="4 4" />
            </g>

            {/* Python */}
            <g transform="translate(50, 220)">
              <rect x="0" y="0" width="100" height="60" rx="8" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" />
              <text x="50" y="25" textAnchor="middle" className="text-lg">🐍</text>
              <text x="50" y="45" textAnchor="middle" className="text-xs font-bold fill-amber-400">Python SDK</text>
              <line x1="100" y1="30" x2="220" y2="-30" stroke="#f59e0b" strokeDasharray="4 4" />
            </g>

            {/* API */}
            <g transform="translate(550, 220)">
              <rect x="0" y="0" width="100" height="60" rx="8" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" />
              <text x="50" y="25" textAnchor="middle" className="text-lg">🔌</text>
              <text x="50" y="45" textAnchor="middle" className="text-xs font-bold fill-red-400">REST API</text>
              <line x1="0" y1="30" x2="-130" y2="-30" stroke="#ef4444" strokeDasharray="4 4" />
            </g>

            {/* IDEs */}
            <g transform="translate(300, 280)">
              <rect x="0" y="0" width="100" height="60" rx="8" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" />
              <text x="50" y="25" textAnchor="middle" className="text-lg">💻</text>
              <text x="50" y="45" textAnchor="middle" className="text-xs font-bold fill-green-400">{isCs ? 'IDE' : 'IDEs'}</text>
              <line x1="50" y1="0" x2="50" y2="-30" stroke="#22c55e" strokeDasharray="4 4" />
            </g>

          </svg>
        </div>
      </div>
    );
  }

  return null;
}
