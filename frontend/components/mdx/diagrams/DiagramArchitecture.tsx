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
      <div className="my-8 flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:static md:mx-0">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl">
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
      <div className="my-8 flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:static md:mx-0">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <div className="md:hidden space-y-4">
            <div className="text-center text-lg font-bold text-slate-200">🔌 MCP Architecture</div>
            <div className="grid gap-3 text-base">
              <div className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-3">
                {isCs ? '1. MCP Host (klient)' : '1. MCP Host (client)'}
              </div>
              <div className="rounded-xl border border-slate-500/40 bg-slate-500/10 px-4 py-3">
                {isCs ? '2. MCP Protocol (JSON-RPC)' : '2. MCP Protocol (JSON-RPC)'}
              </div>
              <div className="rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 py-3">
                {isCs ? '3. MCP Server (tool runtime)' : '3. MCP Server (tool runtime)'}
              </div>
              <div className="rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3">
                {isCs ? '4. Resources (DB, Files, APIs)' : '4. Resources (DB, Files, APIs)'}
              </div>
            </div>
          </div>
          <svg viewBox="0 0 800 350" className="hidden md:block w-full h-auto" role="img" aria-label="MCP Architecture: Client <-> Protocol <-> Server <-> Resource">
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
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
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
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl">
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
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl">
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
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
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
              <text x="60" y="100" textAnchor="middle" className="text-[10px] fill-orange-300">Gemini 3</text>
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
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
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
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl">
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

  // =====================
  // Claude Code PSB Workflow
  // =====================
  if (type === 'claude-code-psb-workflow') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <svg viewBox="0 0 800 300" className="w-full h-auto" role="img" aria-label="PSB Workflow: Plan, Setup, Build">
            <defs>
              <linearGradient id="psb-plan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="psb-setup" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="psb-build" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
              <marker id="psb-arrow" markerWidth="12" markerHeight="12" refX="10" refY="4" orient="auto">
                <polygon points="0 0, 12 4, 0 8" fill="#64748b" />
              </marker>
            </defs>

            {/* Title */}
            <text x="400" y="30" textAnchor="middle" className="text-lg font-bold fill-white">🎯 {isCs ? 'PSB Systém: Tvoje Tajná Zbraň' : 'The PSB System: Your Secret Weapon'}</text>

            {/* Step 1: PLAN */}
            <g transform="translate(50, 70)">
              <rect x="0" y="0" width="200" height="180" rx="16" fill="url(#psb-plan)" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
              <circle cx="100" cy="45" r="30" fill="#3b82f6" fillOpacity="0.3" />
              <text x="100" y="52" textAnchor="middle" className="text-2xl">📋</text>
              <text x="100" y="95" textAnchor="middle" className="text-lg font-bold fill-blue-400">PLAN</text>
              <text x="100" y="120" textAnchor="middle" className="text-xs fill-blue-300">{isCs ? 'Co stavíš?' : 'What are you building?'}</text>
              <text x="100" y="145" textAnchor="middle" className="text-[10px] fill-slate-400">• Project Spec Doc</text>
              <text x="100" y="160" textAnchor="middle" className="text-[10px] fill-slate-400">• {isCs ? 'Milníky (MVP, V2)' : 'Milestones (MVP, V2)'}</text>
              <text x="100" y="175" textAnchor="middle" className="text-[10px] fill-slate-400">• {isCs ? 'Tech Stack' : 'Tech Stack'}</text>
            </g>

            {/* Arrow 1 */}
            <path d="M 260 160 L 300 160" stroke="#64748b" strokeWidth="3" markerEnd="url(#psb-arrow)" />

            {/* Step 2: SETUP */}
            <g transform="translate(300, 70)">
              <rect x="0" y="0" width="200" height="180" rx="16" fill="url(#psb-setup)" fillOpacity="0.15" stroke="#a855f7" strokeWidth="2" />
              <circle cx="100" cy="45" r="30" fill="#a855f7" fillOpacity="0.3" />
              <text x="100" y="52" textAnchor="middle" className="text-2xl">⚙️</text>
              <text x="100" y="95" textAnchor="middle" className="text-lg font-bold fill-purple-400">SETUP</text>
              <text x="100" y="120" textAnchor="middle" className="text-xs fill-purple-300">{isCs ? '7-krokový checklist' : '7-step checklist'}</text>
              <text x="100" y="145" textAnchor="middle" className="text-[10px] fill-slate-400">• GitHub repo</text>
              <text x="100" y="160" textAnchor="middle" className="text-[10px] fill-slate-400">• CLAUDE.md</text>
              <text x="100" y="175" textAnchor="middle" className="text-[10px] fill-slate-400">• Plugins + MCPs</text>
            </g>

            {/* Arrow 2 */}
            <path d="M 510 160 L 550 160" stroke="#64748b" strokeWidth="3" markerEnd="url(#psb-arrow)" />

            {/* Step 3: BUILD */}
            <g transform="translate(550, 70)">
              <rect x="0" y="0" width="200" height="180" rx="16" fill="url(#psb-build)" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2" />
              <circle cx="100" cy="45" r="30" fill="#22c55e" fillOpacity="0.3" />
              <text x="100" y="52" textAnchor="middle" className="text-2xl">🔨</text>
              <text x="100" y="95" textAnchor="middle" className="text-lg font-bold fill-green-400">BUILD</text>
              <text x="100" y="120" textAnchor="middle" className="text-xs fill-green-300">{isCs ? 'Workflow vzory' : 'Workflow patterns'}</text>
              <text x="100" y="145" textAnchor="middle" className="text-[10px] fill-slate-400">• Plan Mode</text>
              <text x="100" y="160" textAnchor="middle" className="text-[10px] fill-slate-400">• {isCs ? 'Issue-based dev' : 'Issue-based dev'}</text>
              <text x="100" y="175" textAnchor="middle" className="text-[10px] fill-slate-400">• Multi-agent</text>
            </g>

            {/* Bottom note */}
            <text x="400" y="280" textAnchor="middle" className="text-xs fill-slate-500 italic">{isCs ? '15 minut plánování = hodiny ušetřeného času' : '15 minutes of planning = hours saved'}</text>

          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Agentic vs Assistive Comparison
  // =====================
  if (type === 'agentic-vs-assistive') {
    return (
      <div className="my-8 flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:static md:mx-0">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <div className="md:hidden space-y-4">
            <div className="text-center text-lg font-bold text-slate-200">🤖 {isCs ? 'Asistivní vs Agentní AI' : 'Assistive vs Agentic AI'}</div>
            <div className="grid gap-3 text-base">
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3">
                <div className="font-semibold text-red-300">{isCs ? 'Asistivní (ty makáš)' : 'Assistive (you work)'}</div>
                <div className="text-sm text-slate-400">
                  {isCs ? 'Prompt → odpověď → copy/paste → debug' : 'Prompt → response → copy/paste → debug'}
                </div>
              </div>
              <div className="rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3">
                <div className="font-semibold text-green-300">{isCs ? 'Agentní (AI pracuje)' : 'Agentic (AI works)'}</div>
                <div className="text-sm text-slate-400">
                  {isCs ? 'Cíl → plán → akce → verifikace' : 'Goal → plan → act → verify'}
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-slate-400">💡 {isCs ? 'Agentní AI může jednat, ne jen radit' : 'Agentic AI can act, not just suggest'}</div>
          </div>
          <svg viewBox="0 0 800 350" className="hidden md:block w-full h-auto" role="img" aria-label="Agentic vs Assistive AI Comparison">
            <defs>
              <marker id="compare-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
              </marker>
            </defs>

            {/* Title */}
            <text x="400" y="30" textAnchor="middle" className="text-lg font-bold fill-white">🤖 {isCs ? 'Asistivní vs Agentní AI' : 'Assistive vs Agentic AI'}</text>

            {/* LEFT: Traditional/Assistive */}
            <g transform="translate(30, 60)">
              <rect x="0" y="0" width="350" height="250" rx="12" fill="#ef4444" fillOpacity="0.05" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
              <text x="175" y="30" textAnchor="middle" className="text-sm font-bold fill-red-400">❌ {isCs ? 'TRADIČNÍ ASISTENT' : 'TRADITIONAL ASSISTANT'}</text>

              {/* Linear flow */}
              <g transform="translate(40, 60)">
                <rect x="0" y="0" width="80" height="40" rx="6" fill="#64748b" fillOpacity="0.2" stroke="#64748b" />
                <text x="40" y="25" textAnchor="middle" className="text-xs fill-slate-300">{isCs ? 'Zeptáš se' : 'You ask'}</text>
              </g>
              <path d="M 125 80 L 155 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#compare-arrow)" />

              <g transform="translate(160, 60)">
                <rect x="0" y="0" width="80" height="40" rx="6" fill="#64748b" fillOpacity="0.2" stroke="#64748b" />
                <text x="40" y="25" textAnchor="middle" className="text-xs fill-slate-300">{isCs ? 'AI odpoví' : 'AI responds'}</text>
              </g>

              <g transform="translate(40, 120)">
                <rect x="0" y="0" width="80" height="40" rx="6" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" />
                <text x="40" y="25" textAnchor="middle" className="text-xs fill-red-300">Copy/Paste</text>
              </g>
              <path d="M 125 140 L 155 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#compare-arrow)" />

              <g transform="translate(160, 120)">
                <rect x="0" y="0" width="80" height="40" rx="6" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" />
                <text x="40" y="25" textAnchor="middle" className="text-xs fill-red-300">{isCs ? 'Ty debuguješ' : 'You debug'}</text>
              </g>

              <text x="175" y="200" textAnchor="middle" className="text-xs fill-red-400">{isCs ? 'Ty děláš práci' : 'YOU do the work'}</text>
              <text x="175" y="220" textAnchor="middle" className="text-[10px] fill-slate-500">{isCs ? 'AI jen radí' : 'AI just suggests'}</text>
            </g>

            {/* RIGHT: Agentic */}
            <g transform="translate(420, 60)">
              <rect x="0" y="0" width="350" height="250" rx="12" fill="#22c55e" fillOpacity="0.05" stroke="#22c55e" strokeWidth="2" />
            <text x="175" y="30" textAnchor="middle" className="text-sm font-bold fill-green-400">✅ {isCs ? 'AGENTNÍ AI' : 'AGENTIC AI'}</text>

              {/* Circular flow */}
              <g transform="translate(115, 70)">
                <circle cx="60" cy="60" r="55" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="8 4" />

                {/* Intent */}
                <g transform="translate(35, -5)">
                  <rect x="0" y="0" width="50" height="25" rx="4" fill="#22c55e" fillOpacity="0.3" />
                  <text x="25" y="17" textAnchor="middle" className="text-[10px] fill-green-300">{isCs ? 'Záměr' : 'Intent'}</text>
                </g>

                {/* Plan */}
                <g transform="translate(90, 35)">
                  <rect x="0" y="0" width="50" height="25" rx="4" fill="#22c55e" fillOpacity="0.3" />
                  <text x="25" y="17" textAnchor="middle" className="text-[10px] fill-green-300">Plan</text>
                </g>

                {/* Execute */}
                <g transform="translate(90, 85)">
                  <rect x="0" y="0" width="50" height="25" rx="4" fill="#22c55e" fillOpacity="0.3" />
                  <text x="25" y="17" textAnchor="middle" className="text-[10px] fill-green-300">{isCs ? 'Exekuce' : 'Execute'}</text>
                </g>

                {/* Verify */}
                <g transform="translate(35, 100)">
                  <rect x="0" y="0" width="50" height="25" rx="4" fill="#22c55e" fillOpacity="0.3" />
                  <text x="25" y="17" textAnchor="middle" className="text-[10px] fill-green-300">Verify</text>
                </g>

                {/* Review */}
                <g transform="translate(-20, 55)">
                  <rect x="0" y="0" width="50" height="25" rx="4" fill="#3b82f6" fillOpacity="0.3" />
                  <text x="25" y="17" textAnchor="middle" className="text-[10px] fill-blue-300">Review</text>
                </g>
              </g>

              <text x="175" y="200" textAnchor="middle" className="text-xs fill-green-400">{isCs ? 'AI dělá práci' : 'AI does the work'}</text>
              <text x="175" y="220" textAnchor="middle" className="text-[10px] fill-slate-500">{isCs ? 'Ty jen revizuješ' : 'You just review'}</text>
            </g>

            {/* Bottom highlight */}
            <rect x="200" y="320" width="400" height="25" rx="6" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" />
            <text x="400" y="338" textAnchor="middle" className="text-sm font-bold fill-green-400">💡 {isCs ? 'Agentní AI může JEDNAT, nejen radit' : 'Agentic AI can take ACTION, not just suggest'}</text>

          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Sub-Agent Architecture
  // =====================
  if (type === 'sub-agent-architecture') {
    return (
      <div className="my-8 flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:static md:mx-0">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <div className="md:hidden space-y-5">
            <div className="text-center">
              <div className="text-lg font-bold text-slate-200">🕸️ {isCs ? 'Sub-Agent Architektura' : 'Sub-Agent Architecture'}</div>
              <div className="text-sm text-slate-400">{isCs ? 'Každý agent má vlastní context window' : 'Each agent gets its own context window'}</div>
            </div>
            <div className="rounded-xl border border-purple-500/40 bg-purple-500/10 p-4 text-center">
              <div className="text-lg font-semibold text-purple-300">Main Agent</div>
              <div className="text-base text-slate-400">{isCs ? '(Mluvíš s ním) • Orchestruje ostatní' : '(You talk to this) • Orchestrates others'}</div>
            </div>
            <div className="grid gap-3 text-base">
              <div className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-3">
                <span className="mr-2">🔍</span>
                <span className="font-semibold text-blue-300">Explore Agent</span>
                <span className="text-base text-slate-400"> — {isCs ? 'Prohledává codebase' : 'Searches codebase'}</span>
              </div>
              <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3">
                <span className="mr-2">📐</span>
                <span className="font-semibold text-amber-300">Plan Agent</span>
                <span className="text-base text-slate-400"> — {isCs ? 'Navrhuje architekturu' : 'Designs architecture'}</span>
              </div>
              <div className="rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3">
                <span className="mr-2">🔬</span>
                <span className="font-semibold text-green-300">Review Agent</span>
                <span className="text-base text-slate-400"> — {isCs ? 'Kontroluje kvalitu' : 'Checks quality'}</span>
              </div>
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3">
                <span className="mr-2">✅</span>
                <span className="font-semibold text-red-300">Test Agent</span>
                <span className="text-base text-slate-400"> — {isCs ? 'Spouští testy' : 'Runs tests'}</span>
              </div>
            </div>
          </div>
          <svg viewBox="0 0 800 320" className="hidden md:block w-full h-auto" role="img" aria-label="Sub-Agent Architecture">
            <defs>
              <linearGradient id="main-agent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>

            {/* Title */}
            <text x="400" y="30" textAnchor="middle" className="text-lg font-bold fill-white">🕸️ {isCs ? 'Sub-Agent Architektura' : 'Sub-Agent Architecture'}</text>
            <text x="400" y="50" textAnchor="middle" className="text-xs fill-slate-400">{isCs ? 'Každý agent má vlastní context window' : 'Each agent gets its own context window'}</text>

            {/* Main Agent (Center) */}
            <g transform="translate(300, 80)">
              <rect x="0" y="0" width="200" height="80" rx="12" fill="url(#main-agent-grad)" fillOpacity="0.2" stroke="#a855f7" strokeWidth="3" />
              <text x="100" y="35" textAnchor="middle" className="text-lg font-bold fill-purple-400">Main Agent</text>
              <text x="100" y="55" textAnchor="middle" className="text-xs fill-purple-300">{isCs ? '(Mluvíš s ním)' : '(You talk to this)'}</text>
              <text x="100" y="70" textAnchor="middle" className="text-[10px] fill-slate-400">{isCs ? 'Orchestruje ostatní' : 'Orchestrates others'}</text>
            </g>

            {/* Connection lines */}
            <line x1="300" y1="160" x2="150" y2="220" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="400" y1="160" x2="320" y2="220" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="400" y1="160" x2="480" y2="220" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="500" y1="160" x2="650" y2="220" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />

            {/* Sub-Agent 1: Explore */}
            <g transform="translate(50, 220)">
              <rect x="0" y="0" width="150" height="70" rx="8" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
              <text x="75" y="25" textAnchor="middle" className="text-lg">🔍</text>
              <text x="75" y="45" textAnchor="middle" className="text-xs font-bold fill-blue-400">Explore Agent</text>
              <text x="75" y="60" textAnchor="middle" className="text-[10px] fill-slate-400">{isCs ? 'Prohledává codebase' : 'Searches codebase'}</text>
            </g>

            {/* Sub-Agent 2: Plan */}
            <g transform="translate(230, 220)">
              <rect x="0" y="0" width="150" height="70" rx="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
              <text x="75" y="25" textAnchor="middle" className="text-lg">📐</text>
              <text x="75" y="45" textAnchor="middle" className="text-xs font-bold fill-amber-400">Plan Agent</text>
              <text x="75" y="60" textAnchor="middle" className="text-[10px] fill-slate-400">{isCs ? 'Navrhuje architekturu' : 'Designs architecture'}</text>
            </g>

            {/* Sub-Agent 3: Code Review */}
            <g transform="translate(410, 220)">
              <rect x="0" y="0" width="150" height="70" rx="8" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2" />
              <text x="75" y="25" textAnchor="middle" className="text-lg">🔬</text>
              <text x="75" y="45" textAnchor="middle" className="text-xs font-bold fill-green-400">Review Agent</text>
              <text x="75" y="60" textAnchor="middle" className="text-[10px] fill-slate-400">{isCs ? 'Kontroluje kvalitu' : 'Checks quality'}</text>
            </g>

            {/* Sub-Agent 4: Test Runner */}
            <g transform="translate(590, 220)">
              <rect x="0" y="0" width="150" height="70" rx="8" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="2" />
              <text x="75" y="25" textAnchor="middle" className="text-lg">✅</text>
              <text x="75" y="45" textAnchor="middle" className="text-xs font-bold fill-red-400">Test Agent</text>
              <text x="75" y="60" textAnchor="middle" className="text-[10px] fill-slate-400">{isCs ? 'Spouští testy' : 'Runs tests'}</text>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Plan Mode Flow
  // =====================
  if (type === 'plan-mode-flow') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <svg viewBox="0 0 800 280" className="w-full h-auto" role="img" aria-label="Plan Mode Flow">
            <defs>
              <marker id="plan-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#a855f7" />
              </marker>
            </defs>

            {/* Title */}
            <text x="400" y="30" textAnchor="middle" className="text-lg font-bold fill-white">⚡ Plan Mode: {isCs ? 'Mysli Než Budeš Jednat' : 'Think Before You Act'}</text>
            <text x="400" y="50" textAnchor="middle" className="text-xs fill-slate-400">{isCs ? 'Aktivuj: Shift+Tab (2×) nebo /plan' : 'Activate: Shift+Tab (2×) or /plan'}</text>

            {/* Step 1: Enter Plan Mode */}
            <g transform="translate(30, 80)">
              <rect x="0" y="0" width="150" height="80" rx="10" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
              <text x="75" y="35" textAnchor="middle" className="text-2xl">🎯</text>
              <text x="75" y="55" textAnchor="middle" className="text-xs font-bold fill-blue-400">{isCs ? 'Zadej úkol' : 'Enter Task'}</text>
              <text x="75" y="70" textAnchor="middle" className="text-[10px] fill-slate-400">Shift+Tab×2</text>
            </g>

            <path d="M 190 120 L 230 120" stroke="#a855f7" strokeWidth="2" markerEnd="url(#plan-arrow)" />

            {/* Step 2: Claude Analyzes */}
            <g transform="translate(240, 80)">
              <rect x="0" y="0" width="150" height="80" rx="10" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2" />
              <text x="75" y="35" textAnchor="middle" className="text-2xl">🔍</text>
              <text x="75" y="55" textAnchor="middle" className="text-xs font-bold fill-purple-400">{isCs ? 'Analýza' : 'Analysis'}</text>
              <text x="75" y="70" textAnchor="middle" className="text-[10px] fill-slate-400">{isCs ? 'Čte soubory' : 'Reads files'}</text>
            </g>

            <path d="M 400 120 L 440 120" stroke="#a855f7" strokeWidth="2" markerEnd="url(#plan-arrow)" />

            {/* Step 3: Proposes Plan */}
            <g transform="translate(450, 80)">
              <rect x="0" y="0" width="150" height="80" rx="10" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
              <text x="75" y="35" textAnchor="middle" className="text-2xl">📋</text>
              <text x="75" y="55" textAnchor="middle" className="text-xs font-bold fill-amber-400">{isCs ? 'Plán' : 'Plan'}</text>
              <text x="75" y="70" textAnchor="middle" className="text-[10px] fill-slate-400">{isCs ? 'Navrhuje kroky' : 'Proposes steps'}</text>
            </g>

            <path d="M 610 120 L 650 120" stroke="#a855f7" strokeWidth="2" markerEnd="url(#plan-arrow)" />

            {/* Step 4: Your Approval */}
            <g transform="translate(660, 80)">
              <rect x="0" y="0" width="110" height="80" rx="10" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="2" />
              <text x="55" y="35" textAnchor="middle" className="text-2xl">✅</text>
              <text x="55" y="55" textAnchor="middle" className="text-xs font-bold fill-green-400">{isCs ? 'Schválení' : 'Approve'}</text>
              <text x="55" y="70" textAnchor="middle" className="text-[10px] fill-slate-400">Enter</text>
            </g>

            {/* When to use */}
            <g transform="translate(100, 190)">
              <text x="0" y="0" className="text-sm font-bold fill-slate-300">{isCs ? 'Kdy použít Plan Mode:' : 'When to use Plan Mode:'}</text>
              <text x="0" y="25" className="text-xs fill-slate-400">• {isCs ? 'Multi-file refaktoring' : 'Multi-file refactoring'}</text>
              <text x="0" y="45" className="text-xs fill-slate-400">• {isCs ? 'Nové feature implementace' : 'New feature implementations'}</text>
              <text x="0" y="65" className="text-xs fill-slate-400">• {isCs ? 'Architekturální změny' : 'Architectural changes'}</text>
            </g>

            <g transform="translate(450, 190)">
              <text x="0" y="0" className="text-sm font-bold fill-slate-300">{isCs ? 'Pro tip:' : 'Pro tip:'}</text>
              <text x="0" y="25" className="text-xs fill-purple-300">{isCs ? 'CLI verze Plan Mode je chytřejší!' : 'CLI Plan Mode is smarter!'}</text>
              <text x="0" y="45" className="text-xs fill-slate-400">{isCs ? 'Klade více otázek,' : 'Asks more questions,'}</text>
              <text x="0" y="65" className="text-xs fill-slate-400">{isCs ? 'lépe rozumí kontextu' : 'better context understanding'}</text>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Claude Code Ecosystem
  // =====================
  if (type === 'claude-code-ecosystem') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <svg viewBox="0 0 800 380" className="w-full h-auto" role="img" aria-label="Claude Code Ecosystem">
            {/* Title */}
            <text x="400" y="30" textAnchor="middle" className="text-lg font-bold fill-white">🌐 Claude Code Ecosystem</text>

            {/* Central Claude Code */}
            <g transform="translate(300, 120)">
              <rect x="0" y="0" width="200" height="100" rx="16" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="3" />
              <text x="100" y="40" textAnchor="middle" className="text-2xl">🤖</text>
              <text x="100" y="65" textAnchor="middle" className="text-lg font-bold fill-purple-400">Claude Code</text>
              <text x="100" y="85" textAnchor="middle" className="text-xs fill-purple-300">{isCs ? 'Agentní CLI' : 'Agentic CLI'}</text>
            </g>

            {/* MCP Servers (Left) */}
            <g transform="translate(30, 100)">
              <rect x="0" y="0" width="150" height="140" rx="10" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" />
              <text x="75" y="25" textAnchor="middle" className="text-sm font-bold fill-blue-400">MCP Servers</text>
              <text x="75" y="50" textAnchor="middle" className="text-[10px] fill-slate-400">🔌 GitHub</text>
              <text x="75" y="70" textAnchor="middle" className="text-[10px] fill-slate-400">🔌 Postgres</text>
              <text x="75" y="90" textAnchor="middle" className="text-[10px] fill-slate-400">🔌 Playwright</text>
              <text x="75" y="110" textAnchor="middle" className="text-[10px] fill-slate-400">🔌 Figma</text>
              <text x="75" y="130" textAnchor="middle" className="text-[10px] fill-slate-400">🔌 Context7</text>
              <line x1="150" y1="70" x2="290" y2="150" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
            </g>

            {/* Plugins & Skills (Right) */}
            <g transform="translate(620, 100)">
              <rect x="0" y="0" width="150" height="140" rx="10" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="2" />
              <text x="75" y="25" textAnchor="middle" className="text-sm font-bold fill-green-400">{isCs ? 'Pluginy & Skills' : 'Plugins & Skills'}</text>
              <text x="75" y="50" textAnchor="middle" className="text-[10px] fill-slate-400">📦 Frontend Dev</text>
              <text x="75" y="70" textAnchor="middle" className="text-[10px] fill-slate-400">📦 Agent SDK</text>
              <text x="75" y="90" textAnchor="middle" className="text-[10px] fill-slate-400">📦 Code Review</text>
              <text x="75" y="110" textAnchor="middle" className="text-[10px] fill-slate-400">📦 {isCs ? 'Vlastní skills' : 'Custom skills'}</text>
              <line x1="0" y1="70" x2="-110" y2="150" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4" />
            </g>

            {/* Hooks (Top) */}
            <g transform="translate(325, 30)">
              <rect x="0" y="0" width="150" height="60" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" />
              <text x="75" y="25" textAnchor="middle" className="text-sm font-bold fill-amber-400">Hooks</text>
              <text x="75" y="45" textAnchor="middle" className="text-[10px] fill-slate-400">{isCs ? 'Pre/Post akce' : 'Pre/Post actions'}</text>
              <line x1="75" y1="60" x2="75" y2="110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
            </g>

            {/* Browser Control (Bottom) */}
            <g transform="translate(325, 250)">
              <rect x="0" y="0" width="150" height="60" rx="8" fill="#ec4899" fillOpacity="0.1" stroke="#ec4899" strokeWidth="2" />
              <text x="75" y="25" textAnchor="middle" className="text-sm font-bold fill-pink-400">🌐 Browser</text>
              <text x="75" y="45" textAnchor="middle" className="text-[10px] fill-slate-400">{isCs ? 'Nativní ovládání' : 'Native control'}</text>
              <line x1="75" y1="0" x2="75" y2="-30" stroke="#ec4899" strokeWidth="2" strokeDasharray="4 4" />
            </g>

            {/* IDE Integrations (Bottom left) */}
            <g transform="translate(50, 280)">
              <rect x="0" y="0" width="120" height="80" rx="8" fill="#64748b" fillOpacity="0.1" stroke="#64748b" strokeWidth="2" />
              <text x="60" y="25" textAnchor="middle" className="text-sm font-bold fill-slate-400">{isCs ? 'IDE' : 'IDEs'}</text>
              <text x="60" y="45" textAnchor="middle" className="text-[10px] fill-slate-500">Cursor</text>
              <text x="60" y="60" textAnchor="middle" className="text-[10px] fill-slate-500">Windsurf</text>
              <text x="60" y="75" textAnchor="middle" className="text-[10px] fill-slate-500">VS Code</text>
              <line x1="120" y1="40" x2="290" y2="180" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
            </g>

            {/* Git/GitHub (Bottom right) */}
            <g transform="translate(630, 280)">
              <rect x="0" y="0" width="120" height="80" rx="8" fill="#64748b" fillOpacity="0.1" stroke="#64748b" strokeWidth="2" />
              <text x="60" y="25" textAnchor="middle" className="text-sm font-bold fill-slate-400">Git</text>
              <text x="60" y="45" textAnchor="middle" className="text-[10px] fill-slate-500">{isCs ? 'Větve' : 'Branches'}</text>
              <text x="60" y="60" textAnchor="middle" className="text-[10px] fill-slate-500">{isCs ? 'Commity' : 'Commits'}</text>
              <text x="60" y="75" textAnchor="middle" className="text-[10px] fill-slate-500">PR</text>
              <line x1="0" y1="40" x2="-120" y2="180" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
            </g>

          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // 10 Rules Pyramid
  // =====================
  if (type === '10-rules-pyramid') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <svg viewBox="0 0 800 400" className="w-full h-auto" role="img" aria-label="10 Rules for 10x Output">
            {/* Title */}
            <text x="400" y="30" textAnchor="middle" className="text-lg font-bold fill-white">🎯 {isCs ? '10 Pravidel pro 10× Výstup' : '10 Rules for 10x Output'}</text>

            {/* Pyramid structure - from bottom to top */}

            {/* Base - Rule 1 & 2: Tone + Explicitness */}
            <g transform="translate(100, 320)">
              <polygon points="0,0 600,0 550,50 50,50" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
              <text x="300" y="35" textAnchor="middle" className="text-sm font-bold fill-blue-400">1. {isCs ? 'Tón spolupráce' : 'Collaborative Tone'} | 2. {isCs ? 'Buď explicitní' : 'Be Explicit'}</text>
            </g>

            {/* Level 2 - Rule 3 & 4: Boundaries + Draft First */}
            <g transform="translate(150, 260)">
              <polygon points="0,0 500,0 450,50 50,50" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2" />
              <text x="250" y="35" textAnchor="middle" className="text-sm font-bold fill-purple-400">3. {isCs ? 'Definuj hranice' : 'Define Boundaries'} | 4. {isCs ? 'Nejdřív draft' : 'Draft First'}</text>
            </g>

            {/* Level 3 - Rule 5 & 6: Structured Output + Explain Why */}
            <g transform="translate(200, 200)">
              <polygon points="0,0 400,0 350,50 50,50" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="2" />
              <text x="200" y="35" textAnchor="middle" className="text-sm font-bold fill-green-400">5. {isCs ? 'Strukturovaný výstup' : 'Structured Output'} | 6. {isCs ? 'Vysvětli proč' : 'Explain Why'}</text>
            </g>

            {/* Level 4 - Rule 7 & 8: Verbosity + Scaffold */}
            <g transform="translate(250, 140)">
              <polygon points="0,0 300,0 250,50 50,50" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
              <text x="150" y="35" textAnchor="middle" className="text-xs font-bold fill-amber-400">7. {isCs ? 'Řiď rozsah' : 'Control Verbosity'} | 8. Scaffold</text>
            </g>

            {/* Level 5 - Rule 9 & 10: Magic Words + Divide & Conquer */}
            <g transform="translate(300, 80)">
              <polygon points="0,0 200,0 150,50 50,50" fill="#ec4899" fillOpacity="0.2" stroke="#ec4899" strokeWidth="2" />
              <text x="100" y="35" textAnchor="middle" className="text-xs font-bold fill-pink-400">9. {isCs ? 'Kouzelná slova' : 'Magic Words'}</text>
            </g>

            {/* Top - The pinnacle */}
            <g transform="translate(350, 50)">
              <polygon points="50,0 100,30 0,30" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2" />
              <text x="50" y="55" textAnchor="middle" className="text-xs font-bold fill-red-400">10. {isCs ? 'Rozděl & panuj' : 'Divide & Conquer'}</text>
            </g>

            {/* Side annotations */}
            <g transform="translate(720, 180)">
              <text x="0" y="0" className="text-xs fill-slate-400 font-bold">{isCs ? 'Kouzelná slova:' : 'Magic Words:'}</text>
              <text x="0" y="20" className="text-[10px] fill-slate-500">"Think step by step"</text>
              <text x="0" y="35" className="text-[10px] fill-slate-500">"Critique your response"</text>
              <text x="0" y="50" className="text-[10px] fill-slate-500">"As an expert in..."</text>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Claude Code Installation Flow
  // =====================
  if (type === 'claude-code-installation-flow') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <svg viewBox="0 0 900 400" className="w-full h-auto" role="img" aria-label="Claude Code Installation Flow">
            <defs>
              <linearGradient id="install-windows" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0078d4" />
                <stop offset="100%" stopColor="#00bcf2" />
              </linearGradient>
              <linearGradient id="install-linux" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f9a825" />
                <stop offset="100%" stopColor="#ff6f00" />
              </linearGradient>
              <linearGradient id="install-success" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <marker id="install-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
              </marker>
            </defs>

            {/* Title */}
            <text x="450" y="30" textAnchor="middle" className="text-lg font-bold fill-slate-300">
              {isCs ? "Cesta k instalaci Claude Code" : "Claude Code Installation Path"}
            </text>

            {/* Start */}
            <g transform="translate(50, 60)">
              <circle cx="40" cy="40" r="35" fill="#6366f1" fillOpacity="0.2" stroke="#6366f1" strokeWidth="2"/>
              <text x="40" y="45" textAnchor="middle" className="text-2xl">🖥️</text>
              <text x="40" y="100" textAnchor="middle" className="text-xs fill-slate-400 font-bold">
                {isCs ? "VÁŠ POČÍTAČ" : "YOUR PC"}
              </text>
            </g>

            {/* Decision diamond */}
            <g transform="translate(200, 60)">
              <polygon points="60,0 120,40 60,80 0,40" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2"/>
              <text x="60" y="45" textAnchor="middle" className="text-xs font-bold fill-purple-400">
                {isCs ? "OS?" : "OS?"}
              </text>
            </g>
            <path d="M 125 100 L 200 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#install-arrow)" />

            {/* Windows Path (top) */}
            <g transform="translate(350, 20)">
              <rect x="0" y="0" width="160" height="70" rx="8" fill="url(#install-windows)" fillOpacity="0.15" stroke="#0078d4" strokeWidth="2"/>
              <text x="80" y="25" textAnchor="middle" className="text-sm font-bold fill-blue-400">Windows</text>
              <text x="80" y="50" textAnchor="middle" className="text-xs fill-blue-300">
                {isCs ? "Nainstaluj WSL2" : "Install WSL2"}
              </text>
            </g>
            <path d="M 320 80 L 350 55" stroke="#64748b" strokeWidth="2" markerEnd="url(#install-arrow)" />
            <text x="320" y="50" className="text-xs fill-slate-500">Windows</text>

            {/* Linux/Mac Path (bottom) */}
            <g transform="translate(350, 110)">
              <rect x="0" y="0" width="160" height="70" rx="8" fill="url(#install-linux)" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2"/>
              <text x="80" y="25" textAnchor="middle" className="text-sm font-bold fill-amber-400">Linux / Mac</text>
              <text x="80" y="50" textAnchor="middle" className="text-xs fill-amber-300">
                {isCs ? "Už máte terminál" : "Terminal ready"}
              </text>
            </g>
            <path d="M 320 120 L 350 145" stroke="#64748b" strokeWidth="2" markerEnd="url(#install-arrow)" />
            <text x="310" y="150" className="text-xs fill-slate-500">Linux/Mac</text>

            {/* Merge point */}
            <path d="M 510 55 L 560 100" stroke="#64748b" strokeWidth="2" />
            <path d="M 510 145 L 560 100" stroke="#64748b" strokeWidth="2" />

            {/* Common steps */}
            <g transform="translate(570, 60)">
              <rect x="0" y="0" width="140" height="80" rx="8" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="2"/>
              <text x="70" y="25" textAnchor="middle" className="text-xs font-bold fill-green-400">
                {isCs ? "SPOLEČNÉ KROKY" : "COMMON STEPS"}
              </text>
              <text x="70" y="45" textAnchor="middle" className="text-xs fill-green-300">1. Node.js (nvm)</text>
              <text x="70" y="60" textAnchor="middle" className="text-xs fill-green-300">2. npm install -g</text>
              <text x="70" y="75" textAnchor="middle" className="text-xs fill-green-300">3. API Key</text>
            </g>

            {/* Final success */}
            <path d="M 710 100 L 750 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#install-arrow)" />
            <g transform="translate(760, 60)">
              <rect x="0" y="0" width="120" height="80" rx="12" fill="url(#install-success)" fillOpacity="0.2" stroke="#10b981" strokeWidth="2"/>
              <text x="60" y="35" textAnchor="middle" className="text-2xl">🚀</text>
              <text x="60" y="60" textAnchor="middle" className="text-xs font-bold fill-green-400">Claude Code</text>
              <text x="60" y="75" textAnchor="middle" className="text-xs fill-green-300">
                {isCs ? "PŘIPRAVEN!" : "READY!"}
              </text>
            </g>

            {/* Terminal commands box */}
            <g transform="translate(200, 200)">
              <rect x="0" y="0" width="500" height="180" rx="12" fill="#1e1e1e" stroke="#3f3f46" strokeWidth="2"/>
              <rect x="0" y="0" width="500" height="30" rx="12" fill="#2d2d2d"/>
              <circle cx="20" cy="15" r="6" fill="#ff5f56"/>
              <circle cx="40" cy="15" r="6" fill="#ffbd2e"/>
              <circle cx="60" cy="15" r="6" fill="#27ca40"/>
              <text x="250" y="20" textAnchor="middle" className="text-xs fill-slate-400 font-mono">Terminal</text>

              <text x="20" y="60" className="text-xs fill-green-400 font-mono">$</text>
              <text x="35" y="60" className="text-xs fill-slate-300 font-mono">
                {isCs ? "# Windows: Otevři PowerShell jako Admin" : "# Windows: Open PowerShell as Admin"}
              </text>
              <text x="20" y="80" className="text-xs fill-green-400 font-mono">$</text>
              <text x="35" y="80" className="text-xs fill-cyan-300 font-mono">wsl --install</text>

              <text x="20" y="110" className="text-xs fill-green-400 font-mono">$</text>
              <text x="35" y="110" className="text-xs fill-slate-300 font-mono">
                {isCs ? "# Všichni: Instalace Claude Code" : "# Everyone: Install Claude Code"}
              </text>
              <text x="20" y="130" className="text-xs fill-green-400 font-mono">$</text>
              <text x="35" y="130" className="text-xs fill-cyan-300 font-mono">npm install -g @anthropic-ai/claude-code</text>

              <text x="20" y="160" className="text-xs fill-green-400 font-mono">$</text>
              <text x="35" y="160" className="text-xs fill-cyan-300 font-mono">claude --version</text>
              <text x="230" y="160" className="text-xs fill-slate-500 font-mono">
                {isCs ? "# Ověření instalace" : "# Verify installation"}
              </text>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Terminal Basics for Beginners
  // =====================
  if (type === 'terminal-basics') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl">
          <svg viewBox="0 0 700 350" className="w-full h-auto" role="img" aria-label="Terminal Basics">
            <defs>
              <linearGradient id="term-folder" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>

            {/* Title */}
            <text x="350" y="30" textAnchor="middle" className="text-lg font-bold fill-slate-300">
              {isCs ? "Základy terminálu pro začátečníky" : "Terminal Basics for Beginners"}
            </text>

            {/* Commands grid */}
            <g transform="translate(30, 50)">
              {/* cd command */}
              <g transform="translate(0, 0)">
                <rect x="0" y="0" width="200" height="70" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6"/>
                <text x="100" y="25" textAnchor="middle" className="text-sm font-bold fill-blue-400 font-mono">cd</text>
                <text x="100" y="45" textAnchor="middle" className="text-xs fill-blue-300">
                  {isCs ? "změna adresáře" : "change directory"}
                </text>
                <text x="100" y="60" textAnchor="middle" className="text-xs fill-slate-500 font-mono">cd my-project</text>
              </g>

              {/* ls command */}
              <g transform="translate(220, 0)">
                <rect x="0" y="0" width="200" height="70" rx="8" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e"/>
                <text x="100" y="25" textAnchor="middle" className="text-sm font-bold fill-green-400 font-mono">ls</text>
                <text x="100" y="45" textAnchor="middle" className="text-xs fill-green-300">
                  {isCs ? "výpis souborů" : "list files"}
                </text>
                <text x="100" y="60" textAnchor="middle" className="text-xs fill-slate-500 font-mono">ls -la</text>
              </g>

              {/* mkdir command */}
              <g transform="translate(440, 0)">
                <rect x="0" y="0" width="200" height="70" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b"/>
                <text x="100" y="25" textAnchor="middle" className="text-sm font-bold fill-amber-400 font-mono">mkdir</text>
                <text x="100" y="45" textAnchor="middle" className="text-xs fill-amber-300">
                  {isCs ? "vytvoř složku" : "make directory"}
                </text>
                <text x="100" y="60" textAnchor="middle" className="text-xs fill-slate-500 font-mono">mkdir src</text>
              </g>

              {/* pwd command */}
              <g transform="translate(0, 90)">
                <rect x="0" y="0" width="200" height="70" rx="8" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7"/>
                <text x="100" y="25" textAnchor="middle" className="text-sm font-bold fill-purple-400 font-mono">pwd</text>
                <text x="100" y="45" textAnchor="middle" className="text-xs fill-purple-300">
                  {isCs ? "kde jsem?" : "where am I?"}
                </text>
                <text x="100" y="60" textAnchor="middle" className="text-xs fill-slate-500 font-mono">/home/user/project</text>
              </g>

              {/* cat command */}
              <g transform="translate(220, 90)">
                <rect x="0" y="0" width="200" height="70" rx="8" fill="#ec4899" fillOpacity="0.1" stroke="#ec4899"/>
                <text x="100" y="25" textAnchor="middle" className="text-sm font-bold fill-pink-400 font-mono">cat</text>
                <text x="100" y="45" textAnchor="middle" className="text-xs fill-pink-300">
                  {isCs ? "zobraz soubor" : "show file"}
                </text>
                <text x="100" y="60" textAnchor="middle" className="text-xs fill-slate-500 font-mono">cat README.md</text>
              </g>

              {/* clear command */}
              <g transform="translate(440, 90)">
                <rect x="0" y="0" width="200" height="70" rx="8" fill="#06b6d4" fillOpacity="0.1" stroke="#06b6d4"/>
                <text x="100" y="25" textAnchor="middle" className="text-sm font-bold fill-cyan-400 font-mono">clear</text>
                <text x="100" y="45" textAnchor="middle" className="text-xs fill-cyan-300">
                  {isCs ? "vyčisti obrazovku" : "clear screen"}
                </text>
                <text x="100" y="60" textAnchor="middle" className="text-xs fill-slate-500 font-mono">Ctrl+L</text>
              </g>
            </g>

            {/* Pro tip box */}
            <g transform="translate(30, 230)">
              <rect x="0" y="0" width="640" height="100" rx="12" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeDasharray="4 4"/>
              <text x="25" y="30" className="text-sm font-bold fill-green-400">
                💡 {isCs ? "Pro Tip: Šipky a Tab" : "Pro Tip: Arrows & Tab"}
              </text>
              <text x="25" y="55" className="text-xs fill-green-300">
                {isCs
                  ? "↑/↓ = Procházej historii příkazů  |  Tab = Automatické doplňování"
                  : "↑/↓ = Browse command history  |  Tab = Auto-complete paths"}
              </text>
              <text x="25" y="80" className="text-xs fill-slate-400">
                {isCs
                  ? "Stačí napsat část názvu a stisknout Tab - terminál doplní zbytek!"
                  : "Just type part of a filename and press Tab - terminal completes it!"}
              </text>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Claude Code Approval Loop
  // =====================
  if (type === 'claude-approval-loop') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl">
          <svg viewBox="0 0 700 240" className="w-full h-auto" role="img" aria-label="Claude Code Approval Loop">
            <defs>
              <marker id="loop-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
              </marker>
            </defs>

            {/* Title */}
            <text x="350" y="20" textAnchor="middle" className="text-base font-bold fill-slate-300">
              {isCs ? "Cyklus schvalování v Claude Code" : "Claude Code Approval Loop"}
            </text>

            {/* Step 1: User Prompt */}
            <g transform="translate(20, 45)">
              <rect x="0" y="0" width="95" height="70" rx="10" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2"/>
              <text x="47" y="30" textAnchor="middle" className="text-xl">👤</text>
              <text x="47" y="55" textAnchor="middle" className="text-[10px] font-bold fill-blue-400">
                {isCs ? "Tvůj Prompt" : "Your Prompt"}
              </text>
            </g>

            {/* Arrow 1 */}
            <path d="M 115 80 L 140 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#loop-arrow)" />

            {/* Step 2: Claude Thinking */}
            <g transform="translate(150, 45)">
              <rect x="0" y="0" width="95" height="70" rx="10" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2"/>
              <text x="47" y="30" textAnchor="middle" className="text-xl">🤔</text>
              <text x="47" y="55" textAnchor="middle" className="text-[10px] font-bold fill-purple-400">
                {isCs ? "Claude myslí" : "Claude Thinks"}
              </text>
            </g>

            {/* Arrow 2 */}
            <path d="M 245 80 L 270 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#loop-arrow)" />

            {/* Step 3: STOP - Permission */}
            <g transform="translate(280, 35)">
              <rect x="0" y="0" width="120" height="90" rx="10" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="3"/>
              <text x="60" y="28" textAnchor="middle" className="text-base font-black fill-amber-400">🛑 STOP</text>
              <text x="60" y="48" textAnchor="middle" className="text-[9px] fill-amber-300">
                {isCs ? "Schválení nutné" : "Permission Required"}
              </text>
              <rect x="25" y="58" width="70" height="22" rx="4" fill="#1e293b"/>
              <text x="60" y="74" textAnchor="middle" className="text-xs font-mono fill-white">[y/n/e]?</text>
            </g>

            {/* Arrow 3 */}
            <path d="M 400 80 L 425 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#loop-arrow)" />

            {/* Step 4: User Approves */}
            <g transform="translate(435, 45)">
              <rect x="0" y="0" width="85" height="70" rx="10" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="2"/>
              <text x="42" y="30" textAnchor="middle" className="text-xl">✅</text>
              <text x="42" y="55" textAnchor="middle" className="text-[10px] font-bold fill-green-400">
                {isCs ? "Ty: 'y'" : "You: 'y'"}
              </text>
            </g>

            {/* Arrow 4 */}
            <path d="M 520 80 L 545 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#loop-arrow)" />

            {/* Step 5: Action */}
            <g transform="translate(555, 45)">
              <rect x="0" y="0" width="120" height="70" rx="10" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e"/>
              <text x="60" y="30" textAnchor="middle" className="text-xl">⚡</text>
              <text x="60" y="55" textAnchor="middle" className="text-[10px] font-bold fill-green-400">
                {isCs ? "Akce provedena" : "Action Executed"}
              </text>
            </g>

            {/* Feedback Loop Arrow */}
            <path d="M 615 115 Q 615 170 350 170 Q 70 170 70 115" stroke="#64748b" strokeWidth="2" strokeDasharray="5 5" fill="none" markerEnd="url(#loop-arrow)" />
            <text x="350" y="190" textAnchor="middle" className="text-xs fill-slate-500">
              {isCs ? "Výsledek → Další prompt" : "Result → Next prompt"}
            </text>

            {/* Legend */}
            <g transform="translate(20, 210)">
              <text x="0" y="12" className="text-[10px] fill-slate-400">
                {isCs
                  ? "y = ano (schválit) | n = ne (zamítnout) | e = editovat příkaz"
                  : "y = yes (approve) | n = no (reject) | e = edit command"}
              </text>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Context Bucket Strategy
  // =====================
  if (type === 'context-bucket') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl">
          <svg viewBox="0 0 700 300" className="w-full h-auto" role="img" aria-label="Context Management Strategy">

            {/* Title */}
            <text x="350" y="20" textAnchor="middle" className="text-base font-bold fill-slate-300">
              {isCs ? "Správa kontextu: Kyblík s tokeny" : "Context Management: The Token Bucket"}
            </text>

            {/* Bucket 1: Full (Bad) */}
            <g transform="translate(50, 40)">
              <text x="70" y="0" textAnchor="middle" className="text-sm font-bold fill-red-400">
                {isCs ? "🔴 Plný" : "🔴 Full"}
              </text>
              <path d="M 20 15 L 20 130 Q 20 150 70 150 Q 120 150 120 130 L 120 15 Q 120 35 70 35 Q 20 35 20 15 Q 20 0 70 0 Q 120 0 120 15"
                    fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="2"/>
              <rect x="25" y="25" width="90" height="115" fill="#ef4444" fillOpacity="0.4"/>
              <text x="70" y="70" textAnchor="middle" className="text-xs fill-white font-bold">100%</text>

              <text x="70" y="175" textAnchor="middle" className="text-[10px] fill-red-300">
                {isCs ? "💸 Drahé" : "💸 Expensive"}
              </text>
              <text x="70" y="190" textAnchor="middle" className="text-[10px] fill-red-300">
                {isCs ? "🐌 Pomalé" : "🐌 Slow"}
              </text>
            </g>

            {/* Arrow 1 */}
            <g transform="translate(180, 80)">
              <path d="M 0 30 L 50 30" stroke="#64748b" strokeWidth="2" markerEnd="url(#loop-arrow)" />
              <text x="25" y="20" textAnchor="middle" className="text-xs fill-slate-400 font-mono">/compact</text>
            </g>

            {/* Bucket 2: Compacted (OK) */}
            <g transform="translate(270, 40)">
              <text x="70" y="0" textAnchor="middle" className="text-sm font-bold fill-amber-400">
                {isCs ? "🟡 Komprimovaný" : "🟡 Compacted"}
              </text>
              <path d="M 20 15 L 20 130 Q 20 150 70 150 Q 120 150 120 130 L 120 15 Q 120 35 70 35 Q 20 35 20 15 Q 20 0 70 0 Q 120 0 120 15"
                    fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2"/>
              <rect x="25" y="75" width="90" height="65" fill="#f59e0b" fillOpacity="0.4"/>
              <text x="70" y="110" textAnchor="middle" className="text-xs fill-white font-bold">50%</text>

              <text x="70" y="175" textAnchor="middle" className="text-[10px] fill-amber-300">
                {isCs ? "📦 Shrnutý" : "📦 Summarized"}
              </text>
              <text x="70" y="190" textAnchor="middle" className="text-[10px] fill-amber-300">
                {isCs ? "⚡ Rychlejší" : "⚡ Faster"}
              </text>
            </g>

            {/* Arrow 2 */}
            <g transform="translate(400, 80)">
              <path d="M 0 30 L 50 30" stroke="#64748b" strokeWidth="2" markerEnd="url(#loop-arrow)" />
              <text x="25" y="20" textAnchor="middle" className="text-xs fill-slate-400 font-mono">/clear</text>
            </g>

            {/* Bucket 3: Empty (Fresh) */}
            <g transform="translate(490, 40)">
              <text x="70" y="0" textAnchor="middle" className="text-sm font-bold fill-green-400">
                {isCs ? "🟢 Prázdný" : "🟢 Fresh"}
              </text>
              <path d="M 20 15 L 20 130 Q 20 150 70 150 Q 120 150 120 130 L 120 15 Q 120 35 70 35 Q 20 35 20 15 Q 20 0 70 0 Q 120 0 120 15"
                    fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="2"/>
              <text x="70" y="90" textAnchor="middle" className="text-2xl">✨</text>
              <text x="70" y="120" textAnchor="middle" className="text-xs fill-green-300 font-bold">0%</text>

              <text x="70" y="175" textAnchor="middle" className="text-[10px] fill-green-300">
                {isCs ? "🆕 Nový úkol" : "🆕 New task"}
              </text>
              <text x="70" y="190" textAnchor="middle" className="text-[10px] fill-green-300">
                {isCs ? "🎯 Fokusovaný" : "🎯 Focused"}
              </text>
            </g>

            {/* Pro tip */}
            <g transform="translate(50, 220)">
              <rect x="0" y="0" width="600" height="55" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeDasharray="4 4"/>
              <text x="20" y="25" className="text-xs fill-blue-300">
                💡 {isCs
                  ? "Tip: /compact = shrnutí kontextu | /clear = úplně nový úkol"
                  : "Tip: /compact = summarize context | /clear = completely new task"}
              </text>
              <text x="20" y="45" className="text-[10px] fill-slate-400">
                {isCs
                  ? "Plný kontext = vyšší cena + pomalejší odpovědi. Pravidelně čisti!"
                  : "Full context = higher cost + slower responses. Clean regularly!"}
              </text>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // CLAUDE.md Anatomy
  // =====================
  if (type === 'claude-md-anatomy') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl">
          <svg viewBox="0 0 700 340" className="w-full h-auto" role="img" aria-label="CLAUDE.md Anatomy">

            {/* Title */}
            <text x="350" y="20" textAnchor="middle" className="text-base font-bold fill-slate-300">
              {isCs ? "Anatomie souboru CLAUDE.md" : "Anatomy of CLAUDE.md"}
            </text>

            {/* File representation */}
            <g transform="translate(40, 40)">
              <rect x="0" y="0" width="260" height="280" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2"/>
              <text x="15" y="22" className="text-sm font-mono font-bold fill-slate-400">CLAUDE.md</text>

              {/* Section 1: Tech Stack */}
              <g transform="translate(10, 35)">
                <rect x="0" y="0" width="240" height="50" rx="4" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6"/>
                <text x="10" y="18" className="text-[11px] font-mono fill-blue-300">## Tech Stack</text>
                <text x="10" y="32" className="text-[9px] font-mono fill-slate-400">- Next.js 14, TypeScript</text>
                <text x="10" y="44" className="text-[9px] font-mono fill-slate-400">- Tailwind CSS</text>
              </g>

              {/* Section 2: Code Style */}
              <g transform="translate(10, 95)">
                <rect x="0" y="0" width="240" height="50" rx="4" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7"/>
                <text x="10" y="18" className="text-[11px] font-mono fill-purple-300">## Code Style</text>
                <text x="10" y="32" className="text-[9px] font-mono fill-slate-400">- Functional components</text>
                <text x="10" y="44" className="text-[9px] font-mono fill-slate-400">- Arrow functions</text>
              </g>

              {/* Section 3: Rules */}
              <g transform="translate(10, 155)">
                <rect x="0" y="0" width="240" height="60" rx="4" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e"/>
                <text x="10" y="18" className="text-[11px] font-mono fill-green-300">## Rules</text>
                <text x="10" y="32" className="text-[9px] font-mono fill-slate-400">- NEVER delete without why</text>
                <text x="10" y="44" className="text-[9px] font-mono fill-slate-400">- ALWAYS run tests first</text>
                <text x="10" y="56" className="text-[9px] font-mono fill-slate-400">- Limit changes &lt;100 lines</text>
              </g>

              {/* Section 4: Security */}
              <g transform="translate(10, 225)">
                <rect x="0" y="0" width="240" height="45" rx="4" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444"/>
                <text x="10" y="18" className="text-[11px] font-mono fill-red-300">## Security</text>
                <text x="10" y="32" className="text-[9px] font-mono fill-slate-400">- NO hardcoded secrets</text>
                <text x="10" y="44" className="text-[9px] font-mono fill-slate-400">- Check API auth</text>
              </g>
            </g>

            {/* Arrows and explanations */}
            <g transform="translate(320, 75)">
              <path d="M 0 0 L 25 0" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#loop-arrow)"/>
              <rect x="35" y="-12" width="310" height="24" rx="6" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6"/>
              <text x="50" y="4" className="text-[10px] fill-blue-300">
                {isCs ? "🎯 Zabraňuje halucinacím o technologiích" : "🎯 Prevents tech stack hallucinations"}
              </text>
            </g>

            <g transform="translate(320, 135)">
              <path d="M 0 0 L 25 0" stroke="#a855f7" strokeWidth="2" markerEnd="url(#loop-arrow)"/>
              <rect x="35" y="-12" width="310" height="24" rx="6" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7"/>
              <text x="50" y="4" className="text-[10px] fill-purple-300">
                {isCs ? "📐 Zajišťuje konzistentní styl kódu" : "📐 Ensures consistent code style"}
              </text>
            </g>

            <g transform="translate(320, 200)">
              <path d="M 0 0 L 25 0" stroke="#22c55e" strokeWidth="2" markerEnd="url(#loop-arrow)"/>
              <rect x="35" y="-12" width="310" height="24" rx="6" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e"/>
              <text x="50" y="4" className="text-[10px] fill-green-300">
                {isCs ? "🛡️ Chrání před nechtěnými změnami" : "🛡️ Guards against unwanted changes"}
              </text>
            </g>

            <g transform="translate(320, 262)">
              <path d="M 0 0 L 25 0" stroke="#ef4444" strokeWidth="2" markerEnd="url(#loop-arrow)"/>
              <rect x="35" y="-12" width="310" height="24" rx="6" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444"/>
              <text x="50" y="4" className="text-[10px] fill-red-300">
                {isCs ? "🔒 Bezpečnostní mantinely" : "🔒 Security guardrails"}
              </text>
            </g>

            {/* Bottom tip */}
            <g transform="translate(320, 305)">
              <text x="0" y="12" className="text-[10px] fill-slate-400">
                💡 {isCs
                  ? "Čím více kontextu, tím méně korekcí během práce"
                  : "More context upfront = fewer corrections needed"}
              </text>
            </g>

          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Paradigm Shift Pyramid
  // =====================
  if (type === 'paradigm-shift-pyramid') {
    return (
      <div className="my-8 flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:static md:mx-0">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl">
          <div className="md:hidden space-y-4">
            <div className="text-center text-lg font-bold text-slate-200">🎬 {isCs ? "Evoluce vývojáře" : "Developer Evolution"}</div>
            <div className="grid gap-3 text-base">
              <div className="rounded-lg bg-slate-600/30 border border-slate-500/40 px-4 py-3 text-slate-100">
                {isCs ? "📝 Písař kódu (Pre-2020)" : "📝 Code Writer (Pre-2020)"}
              </div>
              <div className="rounded-lg bg-blue-600/30 border border-blue-500/40 px-4 py-3 text-blue-100">
                {isCs ? "🤖 AI uživatel (2021–23)" : "🤖 AI User (2021–23)"}
              </div>
              <div className="rounded-lg bg-purple-600/30 border border-purple-500/40 px-4 py-3 text-purple-100">
                {isCs ? "💬 Prompt inženýr (2024)" : "💬 Prompt Engineer (2024)"}
              </div>
              <div className="rounded-lg bg-green-600/30 border border-green-500/40 px-4 py-3 text-green-100">
                {isCs ? "🧑‍💼 Režisér agentů (2025+)" : "🧑‍💼 Agent Director (2025+)"}
              </div>
            </div>
          </div>
          <svg viewBox="0 0 600 350" className="hidden md:block w-full h-auto" role="img" aria-label="Developer Evolution Pyramid">
            <defs>
              <linearGradient id="psp-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <linearGradient id="psp-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="psp-grad-3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="psp-grad-4" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
            </defs>

            {/* Title */}
            <text x="300" y="30" textAnchor="middle" className="text-lg font-bold fill-white">
              {isCs ? "🎬 Evoluce vývojáře" : "🎬 Developer Evolution"}
            </text>

            {/* Pyramid layers - bottom to top */}
            {/* Layer 1: Code Writer (bottom) */}
            <g transform="translate(50, 280)">
              <path d="M 0 0 L 500 0 L 450 -50 L 50 -50 Z" fill="url(#psp-grad-1)" opacity="0.8"/>
              <text x="250" y="-20" textAnchor="middle" className="text-sm font-bold fill-white">
                {isCs ? "📝 Písař kódu" : "📝 Code Writer"}
              </text>
              <text x="540" y="-20" textAnchor="start" className="text-[10px] fill-slate-400">Pre-2020</text>
            </g>

            {/* Layer 2: AI User */}
            <g transform="translate(100, 220)">
              <path d="M 0 0 L 400 0 L 360 -50 L 40 -50 Z" fill="url(#psp-grad-2)" opacity="0.8"/>
              <text x="200" y="-20" textAnchor="middle" className="text-sm font-bold fill-white">
                {isCs ? "🤖 AI uživatel" : "🤖 AI User"}
              </text>
              <text x="440" y="-20" textAnchor="start" className="text-[10px] fill-blue-400">2021-23</text>
            </g>

            {/* Layer 3: Prompt Engineer */}
            <g transform="translate(150, 160)">
              <path d="M 0 0 L 300 0 L 270 -50 L 30 -50 Z" fill="url(#psp-grad-3)" opacity="0.8"/>
              <text x="150" y="-20" textAnchor="middle" className="text-sm font-bold fill-white">
                {isCs ? "💬 Prompt inženýr" : "💬 Prompt Engineer"}
              </text>
              <text x="340" y="-20" textAnchor="start" className="text-[10px] fill-purple-400">2024</text>
            </g>

            {/* Layer 4: Agent Director (top) */}
            <g transform="translate(200, 100)">
              <path d="M 0 0 L 200 0 L 180 -50 L 20 -50 Z" fill="url(#psp-grad-4)" opacity="0.9"/>
              <text x="100" y="-20" textAnchor="middle" className="text-sm font-bold fill-white">
                {isCs ? "🎬 Režisér agentů" : "🎬 Agent Director"}
              </text>
              <text x="240" y="-20" textAnchor="start" className="text-[10px] fill-green-400">2025+</text>
            </g>

            {/* Star at top */}
            <text x="300" y="55" textAnchor="middle" className="text-2xl">⭐</text>

            {/* Bottom legend */}
            <text x="300" y="330" textAnchor="middle" className="text-[10px] fill-slate-500">
              {isCs ? "↑ Vyšší abstrakce = méně psaní, více řízení" : "↑ Higher abstraction = less writing, more directing"}
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // MCP Capability Types
  // =====================
  if (type === 'mcp-capability-types') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <svg viewBox="0 0 800 280" className="w-full h-auto" role="img" aria-label="MCP Capability Types">
            {/* Title */}
            <text x="400" y="30" textAnchor="middle" className="text-lg font-bold fill-white">
              {isCs ? "🔌 Tři rozhraní MCP" : "🔌 Three MCP Interfaces"}
            </text>

            {/* Tools (Model-controlled) */}
            <g transform="translate(50, 60)">
              <rect x="0" y="0" width="220" height="180" rx="12" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2"/>
              <text x="110" y="30" textAnchor="middle" className="text-sm font-bold fill-blue-400">🔧 TOOLS</text>
              <text x="110" y="50" textAnchor="middle" className="text-[10px] fill-blue-300">
                {isCs ? "Ovládá: Model (LLM)" : "Controlled by: Model (LLM)"}
              </text>

              <g transform="translate(20, 70)">
                <rect x="0" y="0" width="180" height="30" rx="4" fill="#fff" fillOpacity="0.05" stroke="#3b82f6" strokeDasharray="2 2"/>
                <text x="90" y="20" textAnchor="middle" className="text-xs fill-blue-200">git_commit()</text>
              </g>
              <g transform="translate(20, 110)">
                <rect x="0" y="0" width="180" height="30" rx="4" fill="#fff" fillOpacity="0.05" stroke="#3b82f6" strokeDasharray="2 2"/>
                <text x="90" y="20" textAnchor="middle" className="text-xs fill-blue-200">query_database()</text>
              </g>
              <g transform="translate(20, 150)">
                <rect x="0" y="0" width="180" height="30" rx="4" fill="#fff" fillOpacity="0.05" stroke="#3b82f6" strokeDasharray="2 2"/>
                <text x="90" y="20" textAnchor="middle" className="text-xs fill-blue-200">send_email()</text>
              </g>
            </g>

            {/* Resources (App-controlled) */}
            <g transform="translate(290, 60)">
              <rect x="0" y="0" width="220" height="180" rx="12" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" strokeWidth="2"/>
              <text x="110" y="30" textAnchor="middle" className="text-sm font-bold fill-purple-400">📁 RESOURCES</text>
              <text x="110" y="50" textAnchor="middle" className="text-[10px] fill-purple-300">
                {isCs ? "Ovládá: Aplikace" : "Controlled by: Application"}
              </text>

              <g transform="translate(20, 70)">
                <rect x="0" y="0" width="180" height="30" rx="4" fill="#fff" fillOpacity="0.05" stroke="#a855f7" strokeDasharray="2 2"/>
                <text x="90" y="20" textAnchor="middle" className="text-xs fill-purple-200">file://project/src</text>
              </g>
              <g transform="translate(20, 110)">
                <rect x="0" y="0" width="180" height="30" rx="4" fill="#fff" fillOpacity="0.05" stroke="#a855f7" strokeDasharray="2 2"/>
                <text x="90" y="20" textAnchor="middle" className="text-xs fill-purple-200">logs://server.log</text>
              </g>
              <g transform="translate(20, 150)">
                <rect x="0" y="0" width="180" height="30" rx="4" fill="#fff" fillOpacity="0.05" stroke="#a855f7" strokeDasharray="2 2"/>
                <text x="90" y="20" textAnchor="middle" className="text-xs fill-purple-200">db://schema</text>
              </g>
            </g>

            {/* Prompts (User-controlled) */}
            <g transform="translate(530, 60)">
              <rect x="0" y="0" width="220" height="180" rx="12" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="2"/>
              <text x="110" y="30" textAnchor="middle" className="text-sm font-bold fill-green-400">💬 PROMPTS</text>
              <text x="110" y="50" textAnchor="middle" className="text-[10px] fill-green-300">
                {isCs ? "Ovládá: Uživatel" : "Controlled by: User"}
              </text>

              <g transform="translate(20, 70)">
                <rect x="0" y="0" width="180" height="30" rx="4" fill="#fff" fillOpacity="0.05" stroke="#22c55e" strokeDasharray="2 2"/>
                <text x="90" y="20" textAnchor="middle" className="text-xs fill-green-200">/analyze-pr</text>
              </g>
              <g transform="translate(20, 110)">
                <rect x="0" y="0" width="180" height="30" rx="4" fill="#fff" fillOpacity="0.05" stroke="#22c55e" strokeDasharray="2 2"/>
                <text x="90" y="20" textAnchor="middle" className="text-xs fill-green-200">/code-review</text>
              </g>
              <g transform="translate(20, 150)">
                <rect x="0" y="0" width="180" height="30" rx="4" fill="#fff" fillOpacity="0.05" stroke="#22c55e" strokeDasharray="2 2"/>
                <text x="90" y="20" textAnchor="middle" className="text-xs fill-green-200">/generate-tests</text>
              </g>
            </g>

            {/* Bottom legend */}
            <text x="400" y="265" textAnchor="middle" className="text-[10px] fill-slate-500">
              {isCs ? "Tools = akce | Resources = data | Prompts = šablony" : "Tools = actions | Resources = data | Prompts = templates"}
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // MCP Ecosystem Map
  // =====================
  if (type === 'mcp-ecosystem-map') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <svg viewBox="0 0 800 350" className="w-full h-auto" role="img" aria-label="MCP Ecosystem Map">
            {/* Title */}
            <text x="400" y="30" textAnchor="middle" className="text-lg font-bold fill-white">
              🌐 {isCs ? "MCP Ekosystém 2025" : "MCP Ecosystem 2025"}
            </text>
            <text x="400" y="50" textAnchor="middle" className="text-xs fill-slate-400">1,100+ community servers</text>

            {/* Center: MCP Protocol */}
            <g transform="translate(350, 130)">
              <circle cx="50" cy="50" r="50" fill="#1e293b" stroke="#94a3b8" strokeWidth="3"/>
              <text x="50" y="45" textAnchor="middle" className="text-lg font-bold fill-white">MCP</text>
              <text x="50" y="65" textAnchor="middle" className="text-[9px] fill-slate-400">Protocol</text>
            </g>

            {/* Code servers */}
            <g transform="translate(50, 80)">
              <rect x="0" y="0" width="120" height="80" rx="8" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6"/>
              <text x="60" y="25" textAnchor="middle" className="text-xs font-bold fill-blue-400">💻 Code</text>
              <text x="60" y="45" textAnchor="middle" className="text-[10px] fill-blue-300">GitHub</text>
              <text x="60" y="60" textAnchor="middle" className="text-[10px] fill-blue-300">GitLab</text>
            </g>
            <path d="M 170 120 L 300 155" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4"/>

            {/* Data servers */}
            <g transform="translate(50, 180)">
              <rect x="0" y="0" width="120" height="80" rx="8" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e"/>
              <text x="60" y="25" textAnchor="middle" className="text-xs font-bold fill-green-400">🗄️ Data</text>
              <text x="60" y="45" textAnchor="middle" className="text-[10px] fill-green-300">Postgres</text>
              <text x="60" y="60" textAnchor="middle" className="text-[10px] fill-green-300">Firestore</text>
            </g>
            <path d="M 170 220 L 300 185" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 4"/>

            {/* Files servers */}
            <g transform="translate(630, 80)">
              <rect x="0" y="0" width="120" height="80" rx="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b"/>
              <text x="60" y="25" textAnchor="middle" className="text-xs font-bold fill-amber-400">📁 Files</text>
              <text x="60" y="45" textAnchor="middle" className="text-[10px] fill-amber-300">Filesystem</text>
              <text x="60" y="60" textAnchor="middle" className="text-[10px] fill-amber-300">Obsidian</text>
            </g>
            <path d="M 630 120 L 500 155" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4"/>

            {/* Cloud servers */}
            <g transform="translate(630, 180)">
              <rect x="0" y="0" width="120" height="80" rx="8" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7"/>
              <text x="60" y="25" textAnchor="middle" className="text-xs font-bold fill-purple-400">☁️ Cloud</text>
              <text x="60" y="45" textAnchor="middle" className="text-[10px] fill-purple-300">Cloudflare</text>
              <text x="60" y="60" textAnchor="middle" className="text-[10px] fill-purple-300">Stripe</text>
            </g>
            <path d="M 630 220 L 500 185" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4"/>

            {/* Web servers */}
            <g transform="translate(240, 250)">
              <rect x="0" y="0" width="120" height="60" rx="8" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444"/>
              <text x="60" y="20" textAnchor="middle" className="text-xs font-bold fill-red-400">🌐 Web</text>
              <text x="60" y="40" textAnchor="middle" className="text-[10px] fill-red-300">Fetch, Brave Search</text>
            </g>
            <path d="M 300 250 L 370 210" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4"/>

            {/* Security servers */}
            <g transform="translate(440, 250)">
              <rect x="0" y="0" width="120" height="60" rx="8" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1"/>
              <text x="60" y="20" textAnchor="middle" className="text-xs font-bold fill-indigo-400">🔒 Security</text>
              <text x="60" y="40" textAnchor="middle" className="text-[10px] fill-indigo-300">Kali Linux (Docker)</text>
            </g>
            <path d="M 500 250 L 430 210" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 4"/>

            {/* Legend */}
            <text x="400" y="335" textAnchor="middle" className="text-[10px] fill-slate-500">
              {isCs ? "Jeden server, všichni klienti • Žádný vendor lock-in" : "One server, all clients • No vendor lock-in"}
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Context Hierarchy
  // =====================
  if (type === 'context-hierarchy') {
    return (
      <div className="my-8 flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:static md:mx-0">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl">
          <div className="md:hidden space-y-4">
            <div className="text-center text-lg font-bold text-slate-200">🧠 {isCs ? "Hierarchie kontextu" : "Context Hierarchy"}</div>
            <div className="grid gap-3 text-base">
              <div className="rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3">
                <div className="font-semibold text-green-300">{isCs ? "📜 Projektová ústava" : "📜 Project Constitution"}</div>
                <div className="text-sm text-slate-400">CLAUDE.md, .cursorrules, .windsurfrules</div>
                <div className="text-sm text-green-200 mt-1">{isCs ? "TRVALÝ" : "PERMANENT"}</div>
              </div>
              <div className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-3">
                <div className="font-semibold text-blue-300">{isCs ? "📋 Kontext úlohy" : "📋 Task Context"}</div>
                <div className="text-sm text-slate-400">{isCs ? "Inline komentáře, popisy, TODO" : "Inline comments, descriptions, TODO"}</div>
                <div className="text-sm text-blue-200 mt-1">{isCs ? "DOČASNÝ" : "TEMPORARY"}</div>
              </div>
              <div className="rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 py-3">
                <div className="font-semibold text-purple-300">{isCs ? "⚡ Dynamický kontext" : "⚡ Dynamic Context"}</div>
                <div className="text-sm text-slate-400">{isCs ? "MCP resources, čtení souborů, API" : "MCP resources, file reads, API calls"}</div>
                <div className="text-sm text-purple-200 mt-1">{isCs ? "EFEMÉRNÍ" : "EPHEMERAL"}</div>
              </div>
            </div>
          </div>
          <svg viewBox="0 0 600 320" className="hidden md:block w-full h-auto" role="img" aria-label="Context Hierarchy">
            {/* Title */}
            <text x="300" y="30" textAnchor="middle" className="text-lg font-bold fill-white">
              🧠 {isCs ? "Hierarchie kontextu" : "Context Hierarchy"}
            </text>

            {/* Layer 1: Project Constitution (permanent) */}
            <g transform="translate(50, 60)">
              <rect x="0" y="0" width="500" height="70" rx="12" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2"/>
              <text x="40" y="35" className="text-sm font-bold fill-green-400">📜 {isCs ? "Projektová ústava" : "Project Constitution"}</text>
              <text x="40" y="55" className="text-[10px] fill-green-300">CLAUDE.md, .cursorrules, .windsurfrules</text>
              <rect x="380" y="20" width="100" height="30" rx="4" fill="#22c55e" fillOpacity="0.3"/>
              <text x="430" y="40" textAnchor="middle" className="text-[10px] font-bold fill-green-200">{isCs ? "TRVALÝ" : "PERMANENT"}</text>
            </g>

            {/* Layer 2: Task Context (temporary) */}
            <g transform="translate(80, 150)">
              <rect x="0" y="0" width="440" height="70" rx="12" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2"/>
              <text x="40" y="35" className="text-sm font-bold fill-blue-400">📋 {isCs ? "Kontext úlohy" : "Task Context"}</text>
              <text x="40" y="55" className="text-[10px] fill-blue-300">{isCs ? "Inline komentáře, popisy, TODO" : "Inline comments, descriptions, TODO"}</text>
              <rect x="320" y="20" width="100" height="30" rx="4" fill="#3b82f6" fillOpacity="0.3"/>
              <text x="370" y="40" textAnchor="middle" className="text-[10px] font-bold fill-blue-200">{isCs ? "DOČASNÝ" : "TEMPORARY"}</text>
            </g>

            {/* Layer 3: Dynamic Context (ephemeral) */}
            <g transform="translate(110, 240)">
              <rect x="0" y="0" width="380" height="70" rx="12" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" strokeWidth="2"/>
              <text x="40" y="35" className="text-sm font-bold fill-purple-400">⚡ {isCs ? "Dynamický kontext" : "Dynamic Context"}</text>
              <text x="40" y="55" className="text-[10px] fill-purple-300">{isCs ? "MCP resources, čtení souborů, API" : "MCP resources, file reads, API calls"}</text>
              <rect x="260" y="20" width="100" height="30" rx="4" fill="#a855f7" fillOpacity="0.3"/>
              <text x="310" y="40" textAnchor="middle" className="text-[10px] font-bold fill-purple-200">{isCs ? "EFEMÉRNÍ" : "EPHEMERAL"}</text>
            </g>

            {/* Arrow indicating flow */}
            <path d="M 30 95 L 30 280" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4"/>
            <text x="20" y="185" textAnchor="middle" className="text-[10px] fill-slate-500" transform="rotate(-90, 20, 185)">
              {isCs ? "Životnost ↓" : "Lifespan ↓"}
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // IDE Selection Decision Tree
  // =====================
  if (type === 'ide-selection-decision-tree') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <svg viewBox="0 0 800 380" className="w-full h-auto" role="img" aria-label="IDE Selection Decision Tree">
            <defs>
              <marker id="ide-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
              </marker>
            </defs>

            {/* Title */}
            <text x="400" y="30" textAnchor="middle" className="text-lg font-bold fill-white">
              🔧 {isCs ? "Rozhodovací strom pro výběr IDE" : "IDE Selection Decision Tree"}
            </text>

            {/* Start node */}
            <g transform="translate(350, 50)">
              <circle cx="50" cy="20" r="20" fill="#1e293b" stroke="#94a3b8" strokeWidth="2"/>
              <text x="50" y="25" textAnchor="middle" className="text-xs font-bold fill-white">?</text>
            </g>

            {/* Decision branches */}
            {/* Quick Prototype → Antigravity */}
            <g transform="translate(50, 100)">
              <path d="M 300 -30 L 80 20" stroke="#64748b" strokeWidth="1" markerEnd="url(#ide-arrow)"/>
              <rect x="0" y="0" width="180" height="50" rx="8" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b"/>
              <text x="90" y="20" textAnchor="middle" className="text-xs font-bold fill-amber-400">
                {isCs ? "🚀 Rychlý prototyp?" : "🚀 Quick prototype?"}
              </text>
              <text x="90" y="38" textAnchor="middle" className="text-[10px] fill-amber-300">→ Antigravity</text>
            </g>

            {/* Daily coding → Cursor */}
            <g transform="translate(250, 100)">
              <path d="M 130 -30 L 90 20" stroke="#64748b" strokeWidth="1" markerEnd="url(#ide-arrow)"/>
              <rect x="0" y="0" width="180" height="50" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6"/>
              <text x="90" y="20" textAnchor="middle" className="text-xs font-bold fill-blue-400">
                {isCs ? "💻 Denní kódování?" : "💻 Daily coding?"}
              </text>
              <text x="90" y="38" textAnchor="middle" className="text-[10px] fill-blue-300">→ Cursor 2.0</text>
            </g>

            {/* Large refactor → Windsurf */}
            <g transform="translate(450, 100)">
              <path d="M -50 -30 L 90 20" stroke="#64748b" strokeWidth="1" markerEnd="url(#ide-arrow)"/>
              <rect x="0" y="0" width="180" height="50" rx="8" fill="#06b6d4" fillOpacity="0.2" stroke="#06b6d4"/>
              <text x="90" y="20" textAnchor="middle" className="text-xs font-bold fill-cyan-400">
                {isCs ? "🔄 Velký refaktor?" : "🔄 Large refactor?"}
              </text>
              <text x="90" y="38" textAnchor="middle" className="text-[10px] fill-cyan-300">→ Windsurf</text>
            </g>

            {/* Architecture → Claude Code */}
            <g transform="translate(50, 190)">
              <rect x="0" y="0" width="180" height="50" rx="8" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7"/>
              <text x="90" y="20" textAnchor="middle" className="text-xs font-bold fill-purple-400">
                {isCs ? "🏗️ Architektura?" : "🏗️ Architecture?"}
              </text>
              <text x="90" y="38" textAnchor="middle" className="text-[10px] fill-purple-300">→ Claude Code</text>
            </g>

            {/* Performance → Zed */}
            <g transform="translate(250, 190)">
              <rect x="0" y="0" width="180" height="50" rx="8" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e"/>
              <text x="90" y="20" textAnchor="middle" className="text-xs font-bold fill-green-400">
                {isCs ? "⚡ Výkon kritický?" : "⚡ Performance?"}
              </text>
              <text x="90" y="38" textAnchor="middle" className="text-[10px] fill-green-300">→ Zed</text>
            </g>

            {/* Terminal workflow → Claude Code CLI */}
            <g transform="translate(450, 190)">
              <rect x="0" y="0" width="180" height="50" rx="8" fill="#ec4899" fillOpacity="0.2" stroke="#ec4899"/>
              <text x="90" y="20" textAnchor="middle" className="text-xs font-bold fill-pink-400">
                {isCs ? "⌨️ Terminál?" : "⌨️ Terminal workflow?"}
              </text>
              <text x="90" y="38" textAnchor="middle" className="text-[10px] fill-pink-300">→ Claude Code CLI</text>
            </g>

            {/* Connecting lines row 2 */}
            <path d="M 140 150 L 140 190" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4"/>
            <path d="M 340 150 L 340 190" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4"/>
            <path d="M 540 150 L 540 190" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4"/>

            {/* Pro tip at bottom */}
            <g transform="translate(100, 280)">
              <rect x="0" y="0" width="600" height="80" rx="12" fill="#1e293b" stroke="#334155"/>
              <text x="300" y="25" textAnchor="middle" className="text-xs font-bold fill-slate-300">
                💡 {isCs ? "Multi-tool strategie" : "Multi-tool Strategy"}
              </text>
              <text x="300" y="50" textAnchor="middle" className="text-[10px] fill-slate-400">
                {isCs
                  ? "Validuj (Antigravity) → Vyvíjej (Cursor) → Refaktoruj (Windsurf) → Architektuj (Claude Code)"
                  : "Validate (Antigravity) → Develop (Cursor) → Refactor (Windsurf) → Architect (Claude Code)"}
              </text>
              <text x="300" y="68" textAnchor="middle" className="text-[10px] fill-slate-500">
                {isCs ? "Rychle selži na špatných nápadech, správně investuj do dobrých" : "Fail fast on bad ideas, invest properly in good ones"}
              </text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // AI Security Layers
  // =====================
  if (type === 'ai-security-layers') {
    return (
      <div className="my-8 flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:static md:mx-0">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl">
          <div className="md:hidden space-y-5">
            <div className="text-center text-lg font-bold text-slate-200">🔒 {isCs ? "Vrstvy zabezpečení AI" : "AI Security Layers"}</div>
            <div className="text-center text-sm text-slate-400">Defense-in-Depth</div>
            <div className="grid gap-3 text-base">
              <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-red-200">
                🐳 {isCs ? "Sandbox (Docker kontejner)" : "Sandbox (Docker Container)"}
              </div>
              <div className="rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-amber-200">
                🔑 {isCs ? "OAuth 2.0 / Autentizace" : "OAuth 2.0 / Authentication"}
              </div>
              <div className="rounded-xl border border-green-400/40 bg-green-500/10 px-4 py-3 text-green-200">
                🛡️ {isCs ? "Nejmenší oprávnění (RBAC)" : "Least Privilege (RBAC)"}
              </div>
              <div className="rounded-xl border border-blue-400/40 bg-blue-500/10 px-4 py-3 text-blue-200">
                📋 {isCs ? "Audit Log" : "Audit Logging"}
              </div>
              <div className="rounded-xl border border-purple-400/40 bg-purple-500/10 px-4 py-3 text-purple-200 text-center">
                🤖 {isCs ? "AI Agent + HITL" : "AI Agent + HITL"}
              </div>
            </div>
          </div>
          <svg viewBox="0 0 600 350" className="hidden md:block w-full h-auto" role="img" aria-label="AI Security Layers">
            {/* Title */}
            <text x="300" y="30" textAnchor="middle" className="text-lg font-bold fill-white">
              🔒 {isCs ? "Vrstvy zabezpečení AI" : "AI Security Layers"}
            </text>
            <text x="300" y="50" textAnchor="middle" className="text-xs fill-slate-400">Defense-in-Depth</text>

            {/* Outer layer: Sandbox */}
            <g transform="translate(50, 70)">
              <rect x="0" y="0" width="500" height="250" rx="16" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="2"/>
              <text x="250" y="25" textAnchor="middle" className="text-sm font-bold fill-red-400">
                🐳 {isCs ? "Sandbox (Docker kontejner)" : "Sandbox (Docker Container)"}
              </text>
            </g>

            {/* Layer 2: OAuth/Auth */}
            <g transform="translate(80, 110)">
              <rect x="0" y="0" width="440" height="190" rx="12" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2"/>
              <text x="220" y="25" textAnchor="middle" className="text-sm font-bold fill-amber-400">
                🔑 {isCs ? "OAuth 2.0 / Autentizace" : "OAuth 2.0 / Authentication"}
              </text>
            </g>

            {/* Layer 3: Permissions */}
            <g transform="translate(110, 150)">
              <rect x="0" y="0" width="380" height="130" rx="10" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="2"/>
              <text x="190" y="25" textAnchor="middle" className="text-sm font-bold fill-green-400">
                🛡️ {isCs ? "Nejmenší oprávnění (RBAC)" : "Least Privilege (RBAC)"}
              </text>
            </g>

            {/* Layer 4: Audit (innermost) */}
            <g transform="translate(140, 190)">
              <rect x="0" y="0" width="320" height="70" rx="8" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2"/>
              <text x="160" y="25" textAnchor="middle" className="text-sm font-bold fill-blue-400">
                📋 {isCs ? "Audit Log" : "Audit Logging"}
              </text>
              <text x="160" y="45" textAnchor="middle" className="text-[10px] fill-blue-300">
                {isCs ? "Všechna volání nástrojů" : "All tool invocations"}
              </text>
            </g>

            {/* Center: AI Agent */}
            <g transform="translate(260, 280)">
              <circle cx="40" cy="20" r="25" fill="#a855f7" fillOpacity="0.3" stroke="#a855f7" strokeWidth="2"/>
              <text x="40" y="25" textAnchor="middle" className="text-lg">🤖</text>
            </g>

            {/* HITL arrow */}
            <g transform="translate(400, 280)">
              <path d="M 0 20 L 80 20" stroke="#ec4899" strokeWidth="2" strokeDasharray="4 4"/>
              <circle cx="100" cy="20" r="20" fill="#ec4899" fillOpacity="0.2" stroke="#ec4899"/>
              <text x="100" y="25" textAnchor="middle" className="text-sm">👤</text>
              <text x="100" y="55" textAnchor="middle" className="text-[9px] fill-pink-400">HITL</text>
            </g>

            {/* Bottom tip */}
            <text x="300" y="340" textAnchor="middle" className="text-[10px] fill-slate-500">
              {isCs ? "Každá vrstva zachytí útoky, které prošly předchozí" : "Each layer catches attacks that passed the previous one"}
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Enterprise Agent Triad
  // =====================
  if (type === 'enterprise-agent-triad') {
    return (
      <div className="my-8 flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:static md:mx-0">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <div className="md:hidden space-y-4">
            <div className="text-center text-lg font-bold text-slate-200">
              {isCs ? 'Tři pilíře agenta' : 'The Agent Triad'}
            </div>
            <div className="grid gap-3 text-base">
              <div className="rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-4 py-3">
                {isCs ? 'Instrukce: persona, ton, limity' : 'Instructions: persona, tone, constraints'}
              </div>
              <div className="rounded-xl border border-sky-500/40 bg-sky-500/10 px-4 py-3">
                {isCs ? 'Znalost: SharePoint, OneDrive, web' : 'Knowledge: SharePoint, OneDrive, web'}
              </div>
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3">
                {isCs ? 'Akce: flowy, API, automatizace' : 'Actions: flows, APIs, automation'}
              </div>
            </div>
          </div>
          <svg viewBox="0 0 800 320" className="hidden md:block w-full h-auto" role="img" aria-label="Enterprise Agent Triad: Instructions, Knowledge, Actions around an Agent core">
            <defs>
              <marker id="triad-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Title */}
            <text x="400" y="30" textAnchor="middle" className="text-lg font-bold fill-white">
              {isCs ? 'Tři pilíře enterprise agenta' : 'The Enterprise Agent Triad'}
            </text>
            <text x="400" y="50" textAnchor="middle" className="text-xs fill-slate-400">
              {isCs ? 'Instrukce • Znalost • Akce' : 'Instructions • Knowledge • Actions'}
            </text>

            {/* Center Agent */}
            <g transform="translate(350, 130)">
              <circle cx="50" cy="50" r="45" fill="#0f172a" stroke="#94a3b8" strokeWidth="2"/>
              <text x="50" y="46" textAnchor="middle" className="text-xl">🤖</text>
              <text x="50" y="70" textAnchor="middle" className="text-xs font-bold fill-slate-200">
                {isCs ? 'Agent' : 'Agent'}
              </text>
            </g>

            {/* Instructions */}
            <g transform="translate(280, 70)">
              <rect x="0" y="0" width="240" height="70" rx="12" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="2"/>
              <text x="120" y="28" textAnchor="middle" className="text-sm font-bold fill-indigo-300">
                {isCs ? 'Instrukce' : 'Instructions'}
              </text>
              <text x="120" y="48" textAnchor="middle" className="text-xs fill-indigo-200">
                {isCs ? 'Persona, ton, limity' : 'Persona, tone, constraints'}
              </text>
            </g>

            {/* Knowledge */}
            <g transform="translate(80, 210)">
              <rect x="0" y="0" width="260" height="70" rx="12" fill="#0ea5e9" fillOpacity="0.15" stroke="#0ea5e9" strokeWidth="2"/>
              <text x="130" y="28" textAnchor="middle" className="text-sm font-bold fill-sky-300">
                {isCs ? 'Znalost' : 'Knowledge'}
              </text>
              <text x="130" y="48" textAnchor="middle" className="text-xs fill-sky-200">
                {isCs ? 'SharePoint, OneDrive, web' : 'SharePoint, OneDrive, web'}
              </text>
            </g>

            {/* Actions */}
            <g transform="translate(460, 210)">
              <rect x="0" y="0" width="260" height="70" rx="12" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2"/>
              <text x="130" y="28" textAnchor="middle" className="text-sm font-bold fill-emerald-300">
                {isCs ? 'Akce' : 'Actions'}
              </text>
              <text x="130" y="48" textAnchor="middle" className="text-xs fill-emerald-200">
                {isCs ? 'Flowy, API, automace' : 'Flows, APIs, automation'}
              </text>
            </g>

            {/* Connectors */}
            <path d="M 400 140 L 400 180" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#triad-arrow)" />
            <path d="M 320 210 L 400 190" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#triad-arrow)" />
            <path d="M 480 210 L 400 190" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#triad-arrow)" />
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Antigravity: Dual Interface
  // =====================
  if (type === 'antigravity-dual-interface') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <svg viewBox="0 0 800 380" className="w-full h-auto" role="img" aria-label="Antigravity Dual Interface: Editor vs Manager">
            <defs>
              <linearGradient id="ag-dual-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="ag-dual-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>

            {/* Title */}
            <text x="400" y="35" textAnchor="middle" className="text-xl font-bold fill-white">
              {isCs ? 'Dvě Rozhraní Antigravity' : 'The Two Surfaces of Antigravity'}
            </text>

            {/* Editor Surface - Left */}
            <g transform="translate(30, 60)">
              <rect x="0" y="0" width="340" height="260" rx="16" fill="url(#ag-dual-blue)" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2"/>
              <text x="170" y="40" textAnchor="middle" className="text-lg font-bold fill-blue-400">
                {'📝 Editor Surface'}
              </text>
              <text x="170" y="65" textAnchor="middle" className="text-base fill-blue-300">Ctrl+E</text>

              {/* VS Code-like elements */}
              <rect x="20" y="90" width="70" height="100" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
              <rect x="30" y="105" width="50" height="8" rx="3" fill="#475569"/>
              <rect x="30" y="120" width="42" height="8" rx="3" fill="#475569"/>
              <rect x="30" y="135" width="55" height="8" rx="3" fill="#475569"/>
              <rect x="30" y="150" width="38" height="8" rx="3" fill="#3b82f6"/>

              {/* Code area */}
              <rect x="100" y="90" width="220" height="100" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
              <text x="115" y="120" className="text-sm fill-purple-400 font-mono">function</text>
              <text x="190" y="120" className="text-sm fill-blue-400 font-mono">main()</text>
              <text x="115" y="145" className="text-sm fill-slate-500 font-mono">{'// code'}</text>
              <text x="115" y="170" className="text-sm fill-green-400 font-mono">return</text>
              <text x="175" y="170" className="text-sm fill-amber-400 font-mono">result;</text>

              {/* Traits */}
              <text x="170" y="215" textAnchor="middle" className="text-sm fill-slate-300">
                ✓ Tab completion
              </text>
              <text x="170" y="238" textAnchor="middle" className="text-sm fill-slate-300">
                ✓ Inline edits (Cmd+K)
              </text>
              <text x="170" y="261" textAnchor="middle" className="text-sm fill-slate-300">
                ✓ {isCs ? 'Synchronní práce' : 'Synchronous work'}
              </text>
            </g>

            {/* Switch Arrows - Center */}
            <g transform="translate(385, 180)">
              <path d="M 0 5 L 30 5" stroke="#64748b" strokeWidth="3"/>
              <polygon points="30,0 40,5 30,10" fill="#64748b"/>
              <path d="M 40 25 L 10 25" stroke="#64748b" strokeWidth="3"/>
              <polygon points="10,20 0,25 10,30" fill="#64748b"/>
            </g>

            {/* Manager Surface - Right */}
            <g transform="translate(430, 60)">
              <rect x="0" y="0" width="340" height="260" rx="16" fill="url(#ag-dual-purple)" fillOpacity="0.15" stroke="#a855f7" strokeWidth="2"/>
              <text x="170" y="40" textAnchor="middle" className="text-lg font-bold fill-purple-400">
                {'🎯 Manager Surface'}
              </text>
              <text x="170" y="65" textAnchor="middle" className="text-base fill-purple-300">Ctrl+M</text>

              {/* Agent cards */}
              <g transform="translate(20, 85)">
                <rect x="0" y="0" width="145" height="60" rx="8" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="1.5"/>
                <text x="15" y="25" className="text-sm fill-green-400 font-bold">{'🤖 Agent 1'}</text>
                <text x="15" y="45" className="text-sm fill-green-300">{isCs ? 'Píše API...' : 'Writing API...'}</text>
              </g>

              <g transform="translate(175, 85)">
                <rect x="0" y="0" width="145" height="60" rx="8" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1.5"/>
                <text x="15" y="25" className="text-sm fill-amber-400 font-bold">{'🤖 Agent 2'}</text>
                <text x="15" y="45" className="text-sm fill-amber-300">{isCs ? 'Testuje UI...' : 'Testing UI...'}</text>
              </g>

              <g transform="translate(20, 155)">
                <rect x="0" y="0" width="300" height="40" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="1.5"/>
                <text x="15" y="26" className="text-sm fill-blue-400 font-bold">{'📥 Inbox: 3'} {isCs ? 'artefakty' : 'artifacts'}</text>
              </g>

              {/* Traits */}
              <text x="170" y="215" textAnchor="middle" className="text-sm fill-slate-300">
                ✓ {isCs ? 'Paralelní agenti' : 'Parallel agents'}
              </text>
              <text x="170" y="238" textAnchor="middle" className="text-sm fill-slate-300">
                ✓ Fire & Forget
              </text>
              <text x="170" y="261" textAnchor="middle" className="text-sm fill-slate-300">
                ✓ {isCs ? 'Asynchronní práce' : 'Asynchronous work'}
              </text>
            </g>

            {/* Bottom comparison */}
            <text x="200" y="355" textAnchor="middle" className="text-base font-semibold fill-blue-400">
              {isCs ? 'Ty jsi řidič' : 'You are the driver'}
            </text>
            <text x="600" y="355" textAnchor="middle" className="text-base font-semibold fill-purple-400">
              {isCs ? 'Ty jsi manažer' : 'You are the manager'}
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Artifacts Workflow
  // =====================
  if (type === 'artifacts-workflow') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <svg viewBox="0 0 800 320" className="w-full h-auto" role="img" aria-label="Artifacts Workflow: Intent to Apply">
            <defs>
              <linearGradient id="art-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>

            {/* Title */}
            <text x="400" y="35" textAnchor="middle" className="text-xl font-bold fill-white">
              {isCs ? 'Systém Artefaktů' : 'The Artifacts System'}
            </text>

            {/* Flow line */}
            <path d="M 70 160 L 730 160" stroke="url(#art-gradient)" strokeWidth="3" strokeDasharray="10 5" opacity="0.4"/>

            {/* Step 1: User Intent */}
            <g transform="translate(30, 80)">
              <circle cx="50" cy="80" r="50" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2"/>
              <text x="50" y="75" textAnchor="middle" className="text-2xl">💡</text>
              <text x="50" y="100" textAnchor="middle" className="text-sm font-bold fill-blue-400">{isCs ? 'Záměr' : 'Intent'}</text>
              <text x="50" y="160" textAnchor="middle" className="text-sm fill-slate-400">{isCs ? '"Přidej login"' : '"Add login"'}</text>
            </g>

            {/* Arrow 1 */}
            <path d="M 130 160 L 165 160" stroke="#64748b" strokeWidth="3"/>
            <polygon points="165,155 175,160 165,165" fill="#64748b"/>

            {/* Step 2: Agent Processing */}
            <g transform="translate(180, 90)">
              <rect x="0" y="20" width="100" height="100" rx="12" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2"/>
              <text x="50" y="65" textAnchor="middle" className="text-2xl">🤖</text>
              <text x="50" y="90" textAnchor="middle" className="text-sm font-bold fill-purple-400">Agent</text>
              <text x="50" y="110" textAnchor="middle" className="text-sm fill-purple-300">{isCs ? 'pracuje...' : 'working...'}</text>
            </g>

            {/* Arrow 2 */}
            <path d="M 285 160 L 320 160" stroke="#64748b" strokeWidth="3"/>
            <polygon points="320,155 330,160 320,165" fill="#64748b"/>

            {/* Step 3: Artifacts Generated */}
            <g transform="translate(335, 60)">
              <rect x="0" y="0" width="160" height="200" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="1.5"/>
              <text x="80" y="28" textAnchor="middle" className="text-base font-bold fill-white">{isCs ? 'Artefakty' : 'Artifacts'}</text>

              {/* Plan artifact */}
              <rect x="12" y="42" width="136" height="32" rx="6" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6"/>
              <text x="22" y="63" className="text-sm fill-blue-400">📋 {isCs ? 'Plán' : 'Plan'}</text>

              {/* Diff artifact */}
              <rect x="12" y="82" width="136" height="32" rx="6" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e"/>
              <text x="22" y="103" className="text-sm fill-green-400">📄 {isCs ? 'Diffy' : 'Diffs'}</text>

              {/* Screenshot artifact */}
              <rect x="12" y="122" width="136" height="32" rx="6" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b"/>
              <text x="22" y="143" className="text-sm fill-amber-400">📸 {isCs ? 'Screenshoty' : 'Screenshots'}</text>

              {/* Recording artifact */}
              <rect x="12" y="162" width="136" height="32" rx="6" fill="#ec4899" fillOpacity="0.2" stroke="#ec4899"/>
              <text x="22" y="183" className="text-sm fill-pink-400">🎥 {isCs ? 'Záznam' : 'Recording'}</text>
            </g>

            {/* Arrow 3 */}
            <path d="M 500 160 L 535 160" stroke="#64748b" strokeWidth="3"/>
            <polygon points="535,155 545,160 535,165" fill="#64748b"/>

            {/* Step 4: Human Review (GATE) */}
            <g transform="translate(550, 80)">
              <rect x="0" y="20" width="110" height="120" rx="12" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3"/>
              <text x="55" y="60" textAnchor="middle" className="text-2xl">👤</text>
              <text x="55" y="85" textAnchor="middle" className="text-sm font-bold fill-amber-400">{isCs ? 'Kontrola' : 'Review'}</text>
              <text x="55" y="105" textAnchor="middle" className="text-sm fill-amber-300">✓ / ✗</text>
              <text x="55" y="160" textAnchor="middle" className="text-sm fill-slate-400 font-bold">🚧 GATE</text>
            </g>

            {/* Arrow 4 */}
            <path d="M 665 160 L 700 160" stroke="#64748b" strokeWidth="3"/>
            <polygon points="700,155 710,160 700,165" fill="#64748b"/>

            {/* Step 5: Apply */}
            <g transform="translate(710, 80)">
              <circle cx="45" cy="80" r="50" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="2"/>
              <text x="45" y="75" textAnchor="middle" className="text-2xl">✅</text>
              <text x="45" y="100" textAnchor="middle" className="text-sm font-bold fill-green-400">{isCs ? 'Aplikuj' : 'Apply'}</text>
            </g>

            {/* Bottom note */}
            <text x="400" y="300" textAnchor="middle" className="text-sm fill-slate-400">
              {isCs ? 'Důvěřuj, ale ověřuj — artefakty ukazují CO agent udělal' : 'Trust, but verify — artifacts show WHAT the agent did'}
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Planning vs Fast Mode
  // =====================
  if (type === 'planning-vs-fast-mode') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl">
          <svg viewBox="0 0 700 380" className="w-full h-auto" role="img" aria-label="Planning vs Fast Mode Decision">
            {/* Title */}
            <text x="350" y="35" textAnchor="middle" className="text-xl font-bold fill-white">
              {isCs ? 'Kdy použít který mód?' : 'When to Use Which Mode?'}
            </text>

            {/* Decision Diamond */}
            <g transform="translate(260, 60)">
              <polygon points="90,0 180,60 90,120 0,60" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2"/>
              <text x="90" y="55" textAnchor="middle" className="text-base font-bold fill-purple-400">{isCs ? 'Je to' : 'Is it'}</text>
              <text x="90" y="75" textAnchor="middle" className="text-base font-bold fill-purple-400">{isCs ? 'komplexní?' : 'complex?'}</text>
            </g>

            {/* Yes Arrow - Left */}
            <path d="M 260 120 L 150 200" stroke="#22c55e" strokeWidth="4"/>
            <polygon points="150,195 145,210 160,205" fill="#22c55e"/>
            <text x="190" y="155" className="text-base font-bold fill-green-400">{isCs ? 'ANO' : 'YES'}</text>

            {/* No Arrow - Right */}
            <path d="M 440 120 L 550 200" stroke="#f59e0b" strokeWidth="4"/>
            <polygon points="550,195 555,210 540,205" fill="#f59e0b"/>
            <text x="510" y="155" className="text-base font-bold fill-amber-400">{isCs ? 'NE' : 'NO'}</text>

            {/* Planning Mode Box - Left */}
            <g transform="translate(30, 210)">
              <rect x="0" y="0" width="250" height="140" rx="14" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2"/>
              <text x="125" y="32" textAnchor="middle" className="text-lg font-bold fill-green-400">📋 Planning Mode</text>

              <text x="20" y="60" className="text-sm fill-slate-300">1. {isCs ? 'Agent analyzuje' : 'Agent analyzes'}</text>
              <text x="20" y="82" className="text-sm fill-slate-300">2. {isCs ? 'Generuje plán' : 'Generates plan'}</text>
              <text x="20" y="104" className="text-sm fill-slate-300">3. {isCs ? 'Čeká na schválení' : 'Waits for approval'}</text>

              <text x="125" y="132" textAnchor="middle" className="text-sm fill-green-300">{isCs ? '✓ Bezpečné pro velké změny' : '✓ Safe for big changes'}</text>
            </g>

            {/* Fast Mode Box - Right */}
            <g transform="translate(420, 210)">
              <rect x="0" y="0" width="250" height="140" rx="14" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2"/>
              <text x="125" y="32" textAnchor="middle" className="text-lg font-bold fill-amber-400">⚡ Fast Mode</text>

              <text x="20" y="60" className="text-sm fill-slate-300">1. {isCs ? 'Okamžitá akce' : 'Immediate action'}</text>
              <text x="20" y="82" className="text-sm fill-slate-300">2. {isCs ? 'Žádný plán' : 'No plan artifact'}</text>
              <text x="20" y="104" className="text-sm fill-slate-300">3. {isCs ? 'Rovnou diffy' : 'Straight to diffs'}</text>

              <text x="125" y="132" textAnchor="middle" className="text-sm fill-amber-300">{isCs ? '⚡ Rychlé pro jednoduché' : '⚡ Fast for simple tasks'}</text>
            </g>

            {/* Examples below */}
            <text x="155" y="370" textAnchor="middle" className="text-sm fill-slate-400">
              {isCs ? 'Feature, refaktoring, security' : 'Feature, refactor, security'}
            </text>
            <text x="545" y="370" textAnchor="middle" className="text-sm fill-slate-400">
              {isCs ? 'Překlep, barva' : 'Typo, color'}
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Security Attack Chain
  // =====================
  if (type === 'security-attack-chain') {
    return (
      <div className="my-8 flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:static md:mx-0">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <div className="md:hidden space-y-4">
            <div className="text-center text-lg font-bold text-slate-200">
              {isCs ? 'Řetězec útoku na AI agenta' : 'AI Agent Attack Chain'}
            </div>
            <div className="grid gap-3 text-base">
              <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3">
                {isCs ? '1. Škodlivý soubor' : '1. Malicious file'}
              </div>
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3">
                {isCs ? '2. Agent čte a poslouchá' : '2. Agent reads and obeys'}
              </div>
              <div className="rounded-xl border border-red-600/40 bg-red-600/10 px-4 py-3">
                {isCs ? '3. Spustí příkaz (exfiltrace)' : '3. Executes command (exfiltration)'}
              </div>
              <div className="rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3">
                {isCs ? 'Obrana: review + blokace webhooků + žádné secrets' : 'Defense: review + block webhooks + no secrets'}
              </div>
            </div>
          </div>
          <svg viewBox="0 0 800 340" className="hidden md:block w-full h-auto" role="img" aria-label="Security Attack Chain">
            <defs>
              <linearGradient id="attack-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>

            {/* Title */}
            <text x="400" y="35" textAnchor="middle" className="text-xl font-bold fill-red-400">
              {isCs ? 'Řetězec útoku na AI agenta' : 'AI Agent Attack Chain'}
            </text>

            {/* Warning Banner */}
            <rect x="150" y="50" width="500" height="35" rx="6" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444"/>
            <text x="400" y="73" textAnchor="middle" className="text-sm fill-red-300">
              {isCs ? 'Agent může být kompromitován dříve, než si toho všimnete' : 'Agent can be compromised before you notice'}
            </text>

            {/* Attack flow line */}
            <path d="M 80 170 L 720 170" stroke="url(#attack-gradient)" strokeWidth="3" strokeDasharray="10 5" opacity="0.5"/>

            {/* Step 1: Malicious Input */}
            <g transform="translate(30, 110)">
              <rect x="0" y="15" width="140" height="100" rx="12" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2"/>
              <text x="70" y="55" textAnchor="middle" className="text-2xl">📄</text>
              <text x="70" y="80" textAnchor="middle" className="text-sm font-bold fill-amber-400">{isCs ? 'Škodlivý soubor' : 'Malicious File'}</text>
              <text x="70" y="100" textAnchor="middle" className="text-sm fill-amber-300">README.md</text>
            </g>

            {/* Arrow 1 */}
            <path d="M 175 170 L 210 170" stroke="#ef4444" strokeWidth="3"/>
            <polygon points="210,165 220,170 210,175" fill="#ef4444"/>

            {/* Step 2: Agent Reads */}
            <g transform="translate(225, 110)">
              <rect x="0" y="15" width="130" height="100" rx="12" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="2"/>
              <text x="65" y="55" textAnchor="middle" className="text-2xl">🤖</text>
              <text x="65" y="80" textAnchor="middle" className="text-sm font-bold fill-red-400">{isCs ? 'Agent čte' : 'Agent Reads'}</text>
              <text x="65" y="100" textAnchor="middle" className="text-sm fill-red-300">{isCs ? 'a poslouchá' : 'and obeys'}</text>
            </g>

            {/* Arrow 2 */}
            <path d="M 360 170 L 395 170" stroke="#ef4444" strokeWidth="3"/>
            <polygon points="395,165 405,170 395,175" fill="#ef4444"/>

            {/* Step 3: Executes Injection */}
            <g transform="translate(410, 110)">
              <rect x="0" y="15" width="130" height="100" rx="12" fill="#dc2626" fillOpacity="0.2" stroke="#dc2626" strokeWidth="2"/>
              <text x="65" y="55" textAnchor="middle" className="text-2xl">⚙️</text>
              <text x="65" y="80" textAnchor="middle" className="text-sm font-bold fill-red-500">{isCs ? 'Spustí příkaz' : 'Executes'}</text>
              <text x="65" y="100" textAnchor="middle" className="text-sm fill-red-400 font-mono">cat .env</text>
            </g>

            {/* Arrow 3 */}
            <path d="M 545 170 L 580 170" stroke="#ef4444" strokeWidth="3"/>
            <polygon points="580,165 590,170 580,175" fill="#ef4444"/>

            {/* Step 4: Exfiltrates */}
            <g transform="translate(595, 110)">
              <rect x="0" y="15" width="150" height="100" rx="12" fill="#7f1d1d" fillOpacity="0.3" stroke="#dc2626" strokeWidth="2"/>
              <text x="75" y="55" textAnchor="middle" className="text-2xl">🌐</text>
              <text x="75" y="80" textAnchor="middle" className="text-sm font-bold fill-red-500">{isCs ? 'Exfiltrace' : 'Exfiltrates'}</text>
              <text x="75" y="100" textAnchor="middle" className="text-sm fill-red-400">webhook.site</text>
            </g>

            {/* Defense Shield - Below */}
            <g transform="translate(200, 250)">
              <rect x="0" y="0" width="400" height="70" rx="10" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="2" strokeDasharray="5 3"/>
              <text x="200" y="28" textAnchor="middle" className="text-base font-bold fill-green-400">🛡️ {isCs ? 'Obrana' : 'Defense'}</text>
              <text x="200" y="52" textAnchor="middle" className="text-sm fill-green-300">
                {isCs ? 'Review policies • Block webhook.site • No secrets' : 'Review policies • Block webhook.site • No secrets'}
              </text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Copilot Studio Architecture
  // =====================
  if (type === 'copilot-studio-architecture') {
    return (
      <div className="my-8 flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:static md:mx-0">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <div className="md:hidden space-y-5">
            <div className="text-center text-lg font-bold text-slate-200">
              {isCs ? 'Architektura Enterprise Agenta' : 'Enterprise Agent Architecture'}
            </div>
            <div className="grid gap-4 text-base">
              <div className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-3">
                <div className="font-semibold text-blue-300">🧠 Instructions</div>
                <div className="text-sm text-slate-400">{isCs ? 'Systémový prompt • Tón • Omezení' : 'System Prompt • Tone • Constraints'}</div>
              </div>
              <div className="rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 py-3">
                <div className="font-semibold text-purple-300">📚 Knowledge</div>
                <div className="text-sm text-slate-400">SharePoint • OneDrive/Dataverse • {isCs ? 'Veřejné weby' : 'Public Websites'}</div>
              </div>
              <div className="rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3">
                <div className="font-semibold text-green-300">⚡ Actions</div>
                <div className="text-sm text-slate-400">Power Automate • API Connectors • Dataverse</div>
              </div>
            </div>
          </div>
          <svg viewBox="0 0 800 320" className="hidden md:block w-full h-auto" role="img" aria-label="Copilot Studio Architecture">
            <defs>
              <linearGradient id="cs-grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="cs-grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="cs-grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
            </defs>

            {/* Title */}
            <text x="400" y="30" textAnchor="middle" className="text-lg font-bold fill-slate-300">
              {isCs ? 'Architektura Enterprise Agenta' : 'Enterprise Agent Architecture'}
            </text>

            {/* Pillar 1: Instructions (Brain) */}
            <g transform="translate(50, 60)">
              <rect x="0" y="0" width="200" height="220" rx="16" fill="url(#cs-grad-blue)" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2"/>
              <text x="100" y="40" textAnchor="middle" className="text-3xl">🧠</text>
              <text x="100" y="70" textAnchor="middle" className="text-base font-bold fill-blue-400">Instructions</text>
              <text x="100" y="90" textAnchor="middle" className="text-sm fill-blue-300">{isCs ? '(Mozek)' : '(The Brain)'}</text>
              <rect x="15" y="110" width="170" height="30" rx="6" fill="#fff" fillOpacity="0.05"/>
              <text x="100" y="130" textAnchor="middle" className="text-xs fill-slate-400">{isCs ? 'Systémový prompt' : 'System Prompt'}</text>
              <rect x="15" y="150" width="170" height="30" rx="6" fill="#fff" fillOpacity="0.05"/>
              <text x="100" y="170" textAnchor="middle" className="text-xs fill-slate-400">{isCs ? 'Tón a osobnost' : 'Tone & Persona'}</text>
              <rect x="15" y="190" width="170" height="30" rx="6" fill="#fff" fillOpacity="0.05"/>
              <text x="100" y="210" textAnchor="middle" className="text-xs fill-slate-400">{isCs ? 'Omezení' : 'Constraints'}</text>
            </g>

            {/* Pillar 2: Knowledge (Memory) */}
            <g transform="translate(300, 60)">
              <rect x="0" y="0" width="200" height="220" rx="16" fill="url(#cs-grad-purple)" fillOpacity="0.15" stroke="#a855f7" strokeWidth="2"/>
              <text x="100" y="40" textAnchor="middle" className="text-3xl">📚</text>
              <text x="100" y="70" textAnchor="middle" className="text-base font-bold fill-purple-400">Knowledge</text>
              <text x="100" y="90" textAnchor="middle" className="text-sm fill-purple-300">{isCs ? '(Paměť)' : '(The Memory)'}</text>
              <rect x="15" y="110" width="170" height="30" rx="6" fill="#fff" fillOpacity="0.05"/>
              <text x="100" y="130" textAnchor="middle" className="text-xs fill-slate-400">SharePoint</text>
              <rect x="15" y="150" width="170" height="30" rx="6" fill="#fff" fillOpacity="0.05"/>
              <text x="100" y="170" textAnchor="middle" className="text-xs fill-slate-400">OneDrive / Dataverse</text>
              <rect x="15" y="190" width="170" height="30" rx="6" fill="#fff" fillOpacity="0.05"/>
              <text x="100" y="210" textAnchor="middle" className="text-xs fill-slate-400">{isCs ? 'Veřejné weby' : 'Public Websites'}</text>
            </g>

            {/* Pillar 3: Actions (Hands) */}
            <g transform="translate(550, 60)">
              <rect x="0" y="0" width="200" height="220" rx="16" fill="url(#cs-grad-green)" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2"/>
              <text x="100" y="40" textAnchor="middle" className="text-3xl">⚡</text>
              <text x="100" y="70" textAnchor="middle" className="text-base font-bold fill-green-400">Actions</text>
              <text x="100" y="90" textAnchor="middle" className="text-sm fill-green-300">{isCs ? '(Ruce)' : '(The Hands)'}</text>
              <rect x="15" y="110" width="170" height="30" rx="6" fill="#fff" fillOpacity="0.05"/>
              <text x="100" y="130" textAnchor="middle" className="text-xs fill-slate-400">Power Automate Flows</text>
              <rect x="15" y="150" width="170" height="30" rx="6" fill="#fff" fillOpacity="0.05"/>
              <text x="100" y="170" textAnchor="middle" className="text-xs fill-slate-400">API Connectors</text>
              <rect x="15" y="190" width="170" height="30" rx="6" fill="#fff" fillOpacity="0.05"/>
              <text x="100" y="210" textAnchor="middle" className="text-xs fill-slate-400">Dataverse CRUD</text>
            </g>

            {/* Bottom: Azure OpenAI */}
            <rect x="200" y="290" width="400" height="25" rx="8" fill="#f97316" fillOpacity="0.2" stroke="#f97316"/>
            <text x="400" y="308" textAnchor="middle" className="text-sm font-bold fill-orange-400">Azure OpenAI → {isCs ? 'Odpověď' : 'Response'}</text>
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Workflows Agent Trinity
  // =====================
  if (type === 'workflows-agent-trinity') {
    return (
      <div className="my-8 flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:static md:mx-0">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl">
          <div className="md:hidden space-y-5">
            <div className="text-center">
              <div className="text-lg font-bold text-slate-200">🧩 {isCs ? 'Workflows Agent Trinity' : 'Workflows Agent Trinity'}</div>
              <div className="text-sm text-slate-400">{isCs ? 'Trigger → Akce + LLM → Odpověď' : 'Trigger → Action + LLM → Response'}</div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-xl border border-blue-500/40 bg-blue-500/10 p-4">
                <div className="flex items-center gap-2 text-base font-semibold text-blue-300">
                  <span className="text-xl">👂</span> Trigger <span className="text-sm text-blue-200/80">{isCs ? '(Ucho)' : '(The Ear)'}</span>
                </div>
                <div className="text-sm text-slate-400 mt-1">{isCs ? 'Email, Soubor, Čas' : 'Email, File, Time'}</div>
              </div>
              <div className="text-center text-xs text-slate-500">↓</div>
              <div className="rounded-xl border border-purple-500/40 bg-purple-500/10 p-4">
                <div className="flex items-center gap-2 text-base font-semibold text-purple-300">
                  <span className="text-xl">🤖</span> Action + LLM <span className="text-sm text-purple-200/80">{isCs ? '(Mozek + Ruce)' : '(Brain + Hands)'}</span>
                </div>
                <div className="text-sm text-slate-400 mt-1">{isCs ? 'Analyzuj, Hledej, Ulož' : 'Analyze, Search, Save'}</div>
              </div>
              <div className="text-center text-xs text-slate-500">↓</div>
              <div className="rounded-xl border border-green-500/40 bg-green-500/10 p-4">
                <div className="flex items-center gap-2 text-base font-semibold text-green-300">
                  <span className="text-xl">📣</span> Response <span className="text-sm text-green-200/80">{isCs ? '(Hlas)' : '(The Voice)'}</span>
                </div>
                <div className="text-sm text-slate-400 mt-1">{isCs ? 'Teams, Email, Log' : 'Teams, Email, Log'}</div>
              </div>
            </div>
          </div>
          <svg viewBox="0 0 700 200" className="hidden md:block w-full h-auto" role="img" aria-label="Workflows Agent Trinity">
            <defs>
              <marker id="wa-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
              </marker>
            </defs>

            {/* Step 1: Trigger */}
            <g transform="translate(50, 40)">
              <rect x="0" y="0" width="140" height="120" rx="12" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2"/>
              <text x="70" y="35" textAnchor="middle" className="text-2xl">👂</text>
              <text x="70" y="60" textAnchor="middle" className="text-sm font-bold fill-blue-400">Trigger</text>
              <text x="70" y="80" textAnchor="middle" className="text-xs fill-blue-300">{isCs ? '(Ucho)' : '(The Ear)'}</text>
              <text x="70" y="105" textAnchor="middle" className="text-xs fill-slate-400">{isCs ? 'Email, Soubor, Čas' : 'Email, File, Time'}</text>
            </g>

            {/* Arrow 1 */}
            <path d="M 200 100 L 250 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#wa-arrow)" />

            {/* Step 2: Action (with LLM) */}
            <g transform="translate(260, 40)">
              <rect x="0" y="0" width="180" height="120" rx="12" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" strokeWidth="2"/>
              <text x="90" y="35" textAnchor="middle" className="text-2xl">🤖</text>
              <text x="90" y="60" textAnchor="middle" className="text-sm font-bold fill-purple-400">Action + LLM</text>
              <text x="90" y="80" textAnchor="middle" className="text-xs fill-purple-300">{isCs ? '(Mozek + Ruce)' : '(Brain + Hands)'}</text>
              <text x="90" y="105" textAnchor="middle" className="text-xs fill-slate-400">{isCs ? 'Analyzuj, Hledej, Ulož' : 'Analyze, Search, Save'}</text>
            </g>

            {/* Arrow 2 */}
            <path d="M 450 100 L 500 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#wa-arrow)" />

            {/* Step 3: Response */}
            <g transform="translate(510, 40)">
              <rect x="0" y="0" width="140" height="120" rx="12" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2"/>
              <text x="70" y="35" textAnchor="middle" className="text-2xl">📣</text>
              <text x="70" y="60" textAnchor="middle" className="text-sm font-bold fill-green-400">Response</text>
              <text x="70" y="80" textAnchor="middle" className="text-xs fill-green-300">{isCs ? '(Hlas)' : '(The Voice)'}</text>
              <text x="70" y="105" textAnchor="middle" className="text-xs fill-slate-400">{isCs ? 'Teams, Email, Log' : 'Teams, Email, Log'}</text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Workflow Lifecycle Loop
  // =====================
  if (type === 'workflow-lifecycle-loop') {
    return (
      <div className="my-8 flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:static md:mx-0">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <div className="md:hidden space-y-4">
            <div className="text-center text-lg font-bold text-slate-200">♻️ {isCs ? 'Životní cyklus workflow' : 'Workflow Lifecycle'}</div>
            <div className="grid gap-3 text-base">
              <div className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-3">
                1. {isCs ? 'Záměr + Prompt' : 'Intent + Prompt'}
              </div>
              <div className="rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 py-3">
                2. {isCs ? 'Build + Integrace' : 'Build + Integrations'}
              </div>
              <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3">
                3. {isCs ? 'Test + Debug' : 'Test + Debug'}
              </div>
              <div className="rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3">
                4. {isCs ? 'Monitor + Iterace' : 'Monitor + Iterate'}
              </div>
            </div>
          </div>
          <svg viewBox="0 0 800 260" className="hidden md:block w-full h-auto" role="img" aria-label="Workflow lifecycle loop">
            <defs>
              <marker id="lifecycle-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            <text x="400" y="30" textAnchor="middle" className="text-lg font-bold fill-white">
              ♻️ {isCs ? 'Životní cyklus workflow' : 'Workflow Lifecycle'}
            </text>
            <text x="400" y="50" textAnchor="middle" className="text-xs fill-slate-400">
              {isCs ? 'Nikdy není hotovo — jen stabilnější' : 'Never done — only more stable'}
            </text>

            {/* Top: Intent + Prompt */}
            <g transform="translate(300, 70)">
              <rect x="0" y="0" width="200" height="50" rx="10" fill="#3b82f6" fillOpacity="0.12" stroke="#3b82f6" />
              <text x="100" y="30" textAnchor="middle" className="text-sm font-bold fill-blue-300">
                1. {isCs ? 'Záměr + Prompt' : 'Intent + Prompt'}
              </text>
            </g>

            {/* Right: Build + Integrations */}
            <g transform="translate(540, 120)">
              <rect x="0" y="0" width="220" height="50" rx="10" fill="#a855f7" fillOpacity="0.12" stroke="#a855f7" />
              <text x="110" y="30" textAnchor="middle" className="text-sm font-bold fill-purple-300">
                2. {isCs ? 'Build + Integrace' : 'Build + Integrations'}
              </text>
            </g>

            {/* Bottom: Test + Debug */}
            <g transform="translate(300, 170)">
              <rect x="0" y="0" width="200" height="50" rx="10" fill="#f59e0b" fillOpacity="0.12" stroke="#f59e0b" />
              <text x="100" y="30" textAnchor="middle" className="text-sm font-bold fill-amber-300">
                3. {isCs ? 'Test + Debug' : 'Test + Debug'}
              </text>
            </g>

            {/* Left: Monitor + Iterate */}
            <g transform="translate(40, 120)">
              <rect x="0" y="0" width="220" height="50" rx="10" fill="#22c55e" fillOpacity="0.12" stroke="#22c55e" />
              <text x="110" y="30" textAnchor="middle" className="text-sm font-bold fill-green-300">
                4. {isCs ? 'Monitor + Iterace' : 'Monitor + Iterate'}
              </text>
            </g>

            {/* Loop arrows */}
            <path d="M 400 120 L 540 145" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#lifecycle-arrow)" />
            <path d="M 650 170 L 500 195" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#lifecycle-arrow)" />
            <path d="M 300 195 L 150 170" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#lifecycle-arrow)" />
            <path d="M 150 120 L 300 95" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#lifecycle-arrow)" />
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Pilot Timeline (4-week)
  // =====================
  if (type === 'pilot-timeline') {
    return (
      <div className="my-8 flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:static md:mx-0">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <div className="md:hidden space-y-4">
            <div className="text-center text-lg font-bold text-slate-200">🧪 {isCs ? 'Pilotní roadmapa (4 týdny)' : 'Pilot Roadmap (4 weeks)'}</div>
            <div className="grid gap-3 text-base">
              <div className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-3">
                {isCs ? 'Týden 1: Scope + data + guardrails' : 'Week 1: Scope + data + guardrails'}
              </div>
              <div className="rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 py-3">
                {isCs ? 'Týden 2: Shadow mode + review' : 'Week 2: Shadow mode + review'}
              </div>
              <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3">
                {isCs ? 'Týden 3: Limited rollout + metrics' : 'Week 3: Limited rollout + metrics'}
              </div>
              <div className="rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3">
                {isCs ? 'Týden 4: Expand + harden' : 'Week 4: Expand + harden'}
              </div>
            </div>
          </div>
          <svg viewBox="0 0 800 220" className="hidden md:block w-full h-auto" role="img" aria-label="4-week pilot timeline">
            <text x="400" y="28" textAnchor="middle" className="text-lg font-bold fill-white">
              🧪 {isCs ? 'Pilotní roadmapa (4 týdny)' : 'Pilot Roadmap (4 weeks)'}
            </text>
            <text x="400" y="48" textAnchor="middle" className="text-xs fill-slate-400">
              {isCs ? 'Bezpečné rozšíření od prototypu k produkci' : 'Safe path from prototype to production'}
            </text>

            <line x1="80" y1="110" x2="720" y2="110" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

            <g transform="translate(80, 70)">
              <circle cx="0" cy="40" r="10" fill="#3b82f6" />
              <rect x="20" y="0" width="170" height="80" rx="10" fill="#3b82f6" fillOpacity="0.12" stroke="#3b82f6" />
              <text x="105" y="30" textAnchor="middle" className="text-sm font-bold fill-blue-300">{isCs ? 'Týden 1' : 'Week 1'}</text>
              <text x="105" y="50" textAnchor="middle" className="text-xs fill-slate-300">{isCs ? 'Scope + data + guardrails' : 'Scope + data + guardrails'}</text>
            </g>

            <g transform="translate(270, 70)">
              <circle cx="0" cy="40" r="10" fill="#a855f7" />
              <rect x="20" y="0" width="170" height="80" rx="10" fill="#a855f7" fillOpacity="0.12" stroke="#a855f7" />
              <text x="105" y="30" textAnchor="middle" className="text-sm font-bold fill-purple-300">{isCs ? 'Týden 2' : 'Week 2'}</text>
              <text x="105" y="50" textAnchor="middle" className="text-xs fill-slate-300">{isCs ? 'Shadow mode + review' : 'Shadow mode + review'}</text>
            </g>

            <g transform="translate(460, 70)">
              <circle cx="0" cy="40" r="10" fill="#f59e0b" />
              <rect x="20" y="0" width="170" height="80" rx="10" fill="#f59e0b" fillOpacity="0.12" stroke="#f59e0b" />
              <text x="105" y="30" textAnchor="middle" className="text-sm font-bold fill-amber-300">{isCs ? 'Týden 3' : 'Week 3'}</text>
              <text x="105" y="50" textAnchor="middle" className="text-xs fill-slate-300">{isCs ? 'Limited rollout + metrics' : 'Limited rollout + metrics'}</text>
            </g>

            <g transform="translate(650, 70)">
              <circle cx="0" cy="40" r="10" fill="#22c55e" />
              <rect x="20" y="0" width="170" height="80" rx="10" fill="#22c55e" fillOpacity="0.12" stroke="#22c55e" />
              <text x="105" y="30" textAnchor="middle" className="text-sm font-bold fill-green-300">{isCs ? 'Týden 4' : 'Week 4'}</text>
              <text x="105" y="50" textAnchor="middle" className="text-xs fill-slate-300">{isCs ? 'Expand + harden' : 'Expand + harden'}</text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Triage Pilot Timeline (2-week)
  // =====================
  if (type === 'triage-pilot-timeline') {
    return (
      <div className="my-8 flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:static md:mx-0">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <div className="md:hidden space-y-4">
            <div className="text-center text-lg font-bold text-slate-200">🧪 {isCs ? '2týdenní triage pilot' : '2-week Triage Pilot'}</div>
            <div className="grid gap-3 text-base">
              <div className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-3">
                {isCs ? 'Týden 1: Draft-only + lidský review' : 'Week 1: Draft-only + human review'}
              </div>
              <div className="rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3">
                {isCs ? 'Týden 2: Rozšíření + KPI' : 'Week 2: Expand + KPIs'}
              </div>
            </div>
          </div>
          <svg viewBox="0 0 700 200" className="hidden md:block w-full h-auto" role="img" aria-label="2-week triage pilot timeline">
            <text x="350" y="28" textAnchor="middle" className="text-lg font-bold fill-white">
              🧪 {isCs ? '2týdenní triage pilot' : '2-week Triage Pilot'}
            </text>
            <text x="350" y="48" textAnchor="middle" className="text-xs fill-slate-400">
              {isCs ? 'Bezpečný start, rychlá validace' : 'Safe start, fast validation'}
            </text>

            <line x1="90" y1="110" x2="610" y2="110" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

            <g transform="translate(90, 70)">
              <circle cx="0" cy="40" r="10" fill="#3b82f6" />
              <rect x="20" y="0" width="230" height="80" rx="10" fill="#3b82f6" fillOpacity="0.12" stroke="#3b82f6" />
              <text x="135" y="30" textAnchor="middle" className="text-sm font-bold fill-blue-300">{isCs ? 'Týden 1' : 'Week 1'}</text>
              <text x="135" y="52" textAnchor="middle" className="text-xs fill-slate-300">
                {isCs ? 'Draft-only • denní review' : 'Draft-only • daily review'}
              </text>
            </g>

            <g transform="translate(380, 70)">
              <circle cx="0" cy="40" r="10" fill="#22c55e" />
              <rect x="20" y="0" width="230" height="80" rx="10" fill="#22c55e" fillOpacity="0.12" stroke="#22c55e" />
              <text x="135" y="30" textAnchor="middle" className="text-sm font-bold fill-green-300">{isCs ? 'Týden 2' : 'Week 2'}</text>
              <text x="135" y="52" textAnchor="middle" className="text-xs fill-slate-300">
                {isCs ? 'Rozšíření • KPI • rollback plan' : 'Expand • KPIs • rollback plan'}
              </text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Real-World Use Cases (Triad)
  // =====================
  if (type === 'use-case-triad') {
    return (
      <div className="my-8 flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:static md:mx-0">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-4xl">
          <div className="md:hidden space-y-4">
            <div className="text-center text-lg font-bold text-slate-200">🧩 {isCs ? '3 ověřené use-casy' : '3 proven use cases'}</div>
            <div className="grid gap-3 text-base">
              <div className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-3">
                {isCs ? 'IT Support — ticket deflection' : 'IT Support — ticket deflection'}
              </div>
              <div className="rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 py-3">
                {isCs ? 'HR Onboarding — 90-day buddy' : 'HR Onboarding — 90-day buddy'}
              </div>
              <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3">
                {isCs ? 'Sales Pipeline — CRM autopilot' : 'Sales Pipeline — CRM autopilot'}
              </div>
            </div>
          </div>
          <svg viewBox="0 0 800 240" className="hidden md:block w-full h-auto" role="img" aria-label="Real-world use cases triad">
            <text x="400" y="28" textAnchor="middle" className="text-lg font-bold fill-white">
              🧩 {isCs ? '3 ověřené use-casy' : '3 Proven Use Cases'}
            </text>
            <text x="400" y="48" textAnchor="middle" className="text-xs fill-slate-400">
              {isCs ? 'Rychlé ROI, jasné KPI' : 'Fast ROI, clear KPIs'}
            </text>

            <g transform="translate(50, 80)">
              <rect x="0" y="0" width="220" height="120" rx="12" fill="#3b82f6" fillOpacity="0.12" stroke="#3b82f6" />
              <text x="110" y="45" textAnchor="middle" className="text-3xl">🛠️</text>
              <text x="110" y="75" textAnchor="middle" className="text-sm font-bold fill-blue-300">IT Support</text>
              <text x="110" y="95" textAnchor="middle" className="text-xs fill-slate-300">{isCs ? 'Deflekce ticketů' : 'Ticket deflection'}</text>
            </g>

            <g transform="translate(290, 80)">
              <rect x="0" y="0" width="220" height="120" rx="12" fill="#a855f7" fillOpacity="0.12" stroke="#a855f7" />
              <text x="110" y="45" textAnchor="middle" className="text-3xl">🎒</text>
              <text x="110" y="75" textAnchor="middle" className="text-sm font-bold fill-purple-300">HR Onboarding</text>
              <text x="110" y="95" textAnchor="middle" className="text-xs fill-slate-300">{isCs ? '90denní buddy' : '90-day buddy'}</text>
            </g>

            <g transform="translate(530, 80)">
              <rect x="0" y="0" width="220" height="120" rx="12" fill="#f59e0b" fillOpacity="0.12" stroke="#f59e0b" />
              <text x="110" y="45" textAnchor="middle" className="text-3xl">📈</text>
              <text x="110" y="75" textAnchor="middle" className="text-sm font-bold fill-amber-300">Sales Pipeline</text>
              <text x="110" y="95" textAnchor="middle" className="text-xs fill-slate-300">{isCs ? 'CRM autopilot' : 'CRM autopilot'}</text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  // =====================
  // Automation Evolution
  // =====================
  if (type === 'automation-evolution') {
    return (
      <div className="my-8 flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:static md:mx-0">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl">
          <div className="md:hidden space-y-5">
            <div className="text-center text-lg font-bold text-slate-200">{isCs ? 'Evoluce automatizace' : 'Evolution of Automation'}</div>
            <div className="grid gap-4">
              <div className="rounded-xl border border-slate-500/40 bg-slate-500/10 p-4">
                <div className="flex items-center gap-2 text-base font-semibold text-slate-200">
                  <span className="text-xl">💻</span> {isCs ? '1. Generace — Scripting' : '1st Gen — Scripting'}
                </div>
                <div className="text-sm text-slate-400 mt-1">{isCs ? 'Role: Vývojář' : 'Role: Developer'}</div>
              </div>
              <div className="text-center text-xs text-slate-500">↓</div>
              <div className="rounded-xl border border-blue-500/40 bg-blue-500/10 p-4">
                <div className="flex items-center gap-2 text-base font-semibold text-blue-300">
                  <span className="text-xl">🔲</span> {isCs ? '2. Generace — Low-Code' : '2nd Gen — Low-Code'}
                </div>
                <div className="text-sm text-slate-400 mt-1">{isCs ? 'Role: Analytik' : 'Role: Analyst'}</div>
              </div>
              <div className="text-center text-xs text-slate-500">↓</div>
              <div className="rounded-xl border border-green-500/40 bg-green-500/10 p-4">
                <div className="flex items-center gap-2 text-base font-semibold text-green-300">
                  <span className="text-xl">🤖</span> {isCs ? '3. Generace — Agentic' : '3rd Gen — Agentic'}
                </div>
                <div className="text-sm text-slate-400 mt-1">{isCs ? 'Role: Orchestrátor' : 'Role: Orchestrator'}
                </div>
              </div>
            </div>
          </div>
          <svg viewBox="0 0 700 280" className="hidden md:block w-full h-auto" role="img" aria-label="Evolution of Automation">
            {/* Title */}
            <text x="350" y="30" textAnchor="middle" className="text-base font-bold fill-slate-300">
              {isCs ? 'Evoluce automatizace' : 'Evolution of Automation'}
            </text>

            {/* Generation 1: Scripting */}
            <g transform="translate(50, 50)">
              <rect x="0" y="0" width="180" height="180" rx="12" fill="#64748b" fillOpacity="0.1" stroke="#64748b" strokeWidth="2"/>
              <text x="90" y="40" textAnchor="middle" className="text-3xl">💻</text>
              <text x="90" y="70" textAnchor="middle" className="text-sm font-bold fill-slate-400">{isCs ? '1. Generace' : '1st Gen'}</text>
              <text x="90" y="95" textAnchor="middle" className="text-base font-bold fill-slate-300">Scripting</text>
              <rect x="20" y="115" width="140" height="25" rx="4" fill="#374151"/>
              <text x="90" y="133" textAnchor="middle" className="text-xs fill-slate-400 font-mono">if email.from == ...</text>
              <text x="90" y="165" textAnchor="middle" className="text-xs fill-slate-500">{isCs ? 'Role: Vývojář' : 'Role: Developer'}</text>
            </g>

            {/* Arrow 1-2 */}
            <path d="M 240 140 L 260 140" stroke="#64748b" strokeWidth="2"/>
            <polygon points="260,135 270,140 260,145" fill="#64748b"/>

            {/* Generation 2: Low-Code */}
            <g transform="translate(260, 50)">
              <rect x="0" y="0" width="180" height="180" rx="12" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2"/>
              <text x="90" y="40" textAnchor="middle" className="text-3xl">🔲</text>
              <text x="90" y="70" textAnchor="middle" className="text-sm font-bold fill-blue-400">{isCs ? '2. Generace' : '2nd Gen'}</text>
              <text x="90" y="95" textAnchor="middle" className="text-base font-bold fill-blue-300">Low-Code</text>
              <rect x="30" y="115" width="40" height="25" rx="4" fill="#1d4ed8"/>
              <rect x="80" y="115" width="40" height="25" rx="4" fill="#1d4ed8"/>
              <path d="M 50 140 L 80 127" stroke="#3b82f6" strokeWidth="2"/>
              <path d="M 50 140 L 80 140" stroke="#3b82f6" strokeWidth="2"/>
              <text x="90" y="165" textAnchor="middle" className="text-xs fill-blue-400">{isCs ? 'Role: Analytik' : 'Role: Analyst'}</text>
            </g>

            {/* Arrow 2-3 */}
            <path d="M 450 140 L 470 140" stroke="#64748b" strokeWidth="2"/>
            <polygon points="470,135 480,140 470,145" fill="#64748b"/>

            {/* Generation 3: Agentic */}
            <g transform="translate(470, 50)">
              <rect x="0" y="0" width="180" height="180" rx="12" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2"/>
              <text x="90" y="40" textAnchor="middle" className="text-3xl">🤖</text>
              <text x="90" y="70" textAnchor="middle" className="text-sm font-bold fill-green-400">{isCs ? '3. Generace' : '3rd Gen'}</text>
              <text x="90" y="95" textAnchor="middle" className="text-base font-bold fill-green-300">Agentic AI</text>
              <rect x="15" y="115" width="150" height="25" rx="4" fill="#166534"/>
              <text x="90" y="133" textAnchor="middle" className="text-xs fill-green-300">{isCs ? '"Zpracuj emaily"' : '"Handle emails"'}</text>
              <text x="90" y="165" textAnchor="middle" className="text-xs fill-green-400">{isCs ? 'Role: Supervizor' : 'Role: Supervisor'}</text>
            </g>

            {/* Bottom label */}
            <text x="350" y="265" textAnchor="middle" className="text-sm fill-slate-500">
              {isCs ? 'Méně kódu → Více abstrakce → Vyšší produktivita' : 'Less Code → More Abstraction → Higher Productivity'}
            </text>
          </svg>
        </div>
      </div>
    );
  }

  return null;
}
