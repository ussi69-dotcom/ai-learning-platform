"use client";

import React from 'react';
import { useLocale } from 'next-intl';

interface DiagramProps {
  type: string;
}

export default function DiagramUI({ type }: DiagramProps) {
  const locale = useLocale();
  const isCs = locale === 'cs';

  if (type === 'meeting-timeline') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl">
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

  if (type === 'dashboard-ui') {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-2 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl w-full max-w-none md:max-w-2xl">
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
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-none md:max-w-2xl">
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

  return null;
}
