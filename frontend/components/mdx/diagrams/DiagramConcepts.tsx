"use client";

import React from "react";
import { useLocale } from "next-intl";

interface DiagramProps {
  type: string;
}

export default function DiagramConcepts({ type }: DiagramProps) {
  const locale = useLocale();
  const isCs = locale === "cs";

  if (type === "tokenization-viz") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-2xl">
          <svg
            viewBox="0 0 600 150"
            className="w-full h-auto"
            role="img"
            aria-label="Tokenization Visualization: Text converted to ID numbers"
          >
            {/* Sentence */}
            <g transform="translate(50, 40)">
              <rect
                x="0"
                y="0"
                width="100"
                height="40"
                rx="4"
                fill="#3b82f6"
                fillOpacity="0.2"
                stroke="#3b82f6"
              />
              <text
                x="50"
                y="25"
                textAnchor="middle"
                className="text-lg font-mono fill-white"
                dominantBaseline="middle"
              >
                "Fear"
              </text>

              <rect
                x="110"
                y="0"
                width="100"
                height="40"
                rx="4"
                fill="#a855f7"
                fillOpacity="0.2"
                stroke="#a855f7"
              />
              <text
                x="160"
                y="25"
                textAnchor="middle"
                className="text-lg font-mono fill-white"
                dominantBaseline="middle"
              >
                "leads"
              </text>

              <rect
                x="220"
                y="0"
                width="80"
                height="40"
                rx="4"
                fill="#22c55e"
                fillOpacity="0.2"
                stroke="#22c55e"
              />
              <text
                x="260"
                y="25"
                textAnchor="middle"
                className="text-lg font-mono fill-white"
                dominantBaseline="middle"
              >
                "to"
              </text>

              <rect
                x="310"
                y="0"
                width="100"
                height="40"
                rx="4"
                fill="#f59e0b"
                fillOpacity="0.2"
                stroke="#f59e0b"
              />
              <text
                x="360"
                y="25"
                textAnchor="middle"
                className="text-lg font-mono fill-white"
                dominantBaseline="middle"
              >
                "anger"
              </text>
            </g>

            {/* Arrows */}
            <defs>
              <marker
                id="arrowhead-token"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>
            <path
              d="M 100 90 L 100 110"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-token)"
            />
            <path
              d="M 210 90 L 210 110"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-token)"
            />
            <path
              d="M 310 90 L 310 110"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-token)"
            />
            <path
              d="M 410 90 L 410 110"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-token)"
            />

            {/* IDs */}
            <g transform="translate(50, 120)">
              <text
                x="50"
                y="20"
                textAnchor="middle"
                className="text-sm font-bold fill-blue-400"
              >
                18342
              </text>
              <text
                x="160"
                y="20"
                textAnchor="middle"
                className="text-sm font-bold fill-purple-400"
              >
                452
              </text>
              <text
                x="260"
                y="20"
                textAnchor="middle"
                className="text-sm font-bold fill-green-400"
              >
                211
              </text>
              <text
                x="360"
                y="20"
                textAnchor="middle"
                className="text-sm font-bold fill-amber-400"
              >
                9832
              </text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "llm-next-token") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-3xl">
          <svg
            viewBox="0 0 600 200"
            className="w-full h-auto"
            role="img"
            aria-label="LLM Prediction: Calculating probabilities for the next token"
          >
            <defs>
              <marker
                id="arrowhead-timeline"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>
            {/* Input Context */}
            <text
              x="50"
              y="40"
              className="text-sm font-bold fill-slate-600 dark:fill-slate-400"
            >
              Context:
            </text>
            <text
              x="50"
              y="70"
              className="text-2xl font-mono fill-slate-800 dark:fill-white"
            >
              "The sky is"
            </text>

            {/* Arrows */}
            <path
              d="M 200 60 L 250 60"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-timeline)"
            />

            {/* Probabilities */}
            <g transform="translate(270, 20)">
              {/* Option 1: Blue */}
              <rect
                x="0"
                y="0"
                width="200"
                height="30"
                rx="4"
                fill="#3b82f6"
                fillOpacity="0.2"
              />
              <rect x="0" y="0" width="180" height="30" rx="4" fill="#3b82f6" />
              <text x="10" y="20" className="text-sm font-bold fill-white">
                blue (90%)
              </text>

              {/* Option 2: Gray */}
              <rect
                x="0"
                y="40"
                width="200"
                height="30"
                rx="4"
                fill="#94a3b8"
                fillOpacity="0.2"
              />
              <rect x="0" y="40" width="20" height="30" rx="4" fill="#94a3b8" />
              <text
                x="10"
                y="60"
                className="text-sm font-bold fill-slate-800 dark:fill-white"
              >
                gray (5%)
              </text>

              {/* Option 3: Green */}
              <rect
                x="0"
                y="80"
                width="200"
                height="30"
                rx="4"
                fill="#22c55e"
                fillOpacity="0.2"
              />
              <rect x="0" y="80" width="10" height="30" rx="4" fill="#22c55e" />
              <text
                x="10"
                y="100"
                className="text-sm font-bold fill-slate-800 dark:fill-white"
              >
                green (1%)
              </text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "context-window") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-3xl">
          <svg
            viewBox="0 0 600 150"
            className="w-full h-auto"
            role="img"
            aria-label="Context Window: Moving window of attention"
          >
            {/* Text Stream */}
            <g transform="translate(50, 60)">
              <text x="0" y="0" className="text-lg font-mono fill-slate-600">
                Once upon a time there was a droid...
              </text>
            </g>

            {/* The Window */}
            <rect
              x="180"
              y="30"
              width="300"
              height="50"
              rx="8"
              fill="none"
              stroke="#a855f7"
              strokeWidth="3"
              strokeDasharray="6 6"
            />
            <text
              x="330"
              y="20"
              textAnchor="middle"
              className="text-xs font-bold fill-purple-400"
            >
              Context Window (Attention)
            </text>

            {/* Fog of War (Forgotten) */}
            <rect x="40" y="30" width="130" height="50" fill="url(#fog-grad)" />
            <defs>
              <linearGradient id="fog-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
              </linearGradient>
            </defs>
            <text
              x="100"
              y="100"
              textAnchor="middle"
              className="text-xs fill-slate-500"
            >
              Forgotten / Dropped
            </text>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "temperature-scale") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-3xl">
          <svg
            viewBox="0 0 600 200"
            className="w-full h-auto"
            role="img"
            aria-label="Temperature Scale: Precise vs Creative"
          >
            {/* Gradient Line */}
            <defs>
              <linearGradient id="temp-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <rect
              x="50"
              y="90"
              width="500"
              height="20"
              rx="10"
              fill="url(#temp-grad)"
            />

            {/* Low Temp */}
            <g transform="translate(50, 50)">
              <text x="0" y="0" className="text-xl font-bold fill-blue-400">
                0.0
              </text>
              <text x="0" y="25" className="text-xs fill-blue-300">
                Precise / Logical
              </text>
              <text x="0" y="130" className="text-xs fill-slate-400">
                "Math, Coding"
              </text>
            </g>

            {/* High Temp */}
            <g transform="translate(500, 50)">
              <text
                x="0"
                y="0"
                textAnchor="end"
                className="text-xl font-bold fill-red-400"
              >
                1.0
              </text>
              <text
                x="0"
                y="25"
                textAnchor="end"
                className="text-xs fill-red-300"
              >
                Creative / Random
              </text>
              <text
                x="0"
                y="130"
                textAnchor="end"
                className="text-xs fill-slate-400"
              >
                "Poetry, Brainstorming"
              </text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "bias-in-data") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-2xl">
          <svg
            viewBox="0 0 600 250"
            className="w-full h-auto"
            role="img"
            aria-label="Bias in Data: The AI Mirror reflects the Internet's distortions"
          >
            <defs>
              <linearGradient
                id="mirror-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
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
              <marker
                id="arrowhead-pipeline"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* The Internet (Cloud) */}
            <g transform="translate(50, 50)">
              <path
                d="M 40 40 Q 60 10 90 40 T 140 40 T 160 80 T 120 110 T 70 110 T 40 80 Z"
                fill="#f1f5f9"
                fillOpacity="0.1"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <text
                x="100"
                y="75"
                textAnchor="middle"
                className="text-xs font-bold fill-slate-300"
              >
                The Internet
              </text>

              {/* Bias Particles */}
              <circle
                cx="70"
                cy="60"
                r="3"
                fill="#ef4444"
                className="animate-pulse"
              />
              <circle
                cx="120"
                cy="50"
                r="3"
                fill="#ef4444"
                className="animate-pulse"
              />
              <circle
                cx="100"
                cy="90"
                r="3"
                fill="#ef4444"
                className="animate-pulse"
              />
              <circle cx="80" cy="80" r="2" fill="#3b82f6" />
              <circle cx="130" cy="70" r="2" fill="#3b82f6" />
            </g>

            {/* Arrow */}
            <path
              d="M 180 80 L 240 80"
              stroke="#64748b"
              strokeWidth="2"
              markerEnd="url(#arrowhead-pipeline)"
            />
            <text
              x="210"
              y="70"
              textAnchor="middle"
              className="text-[10px] fill-slate-500"
            >
              Training
            </text>

            {/* The AI (Mirror) */}
            <g transform="translate(260, 20)">
              <rect
                x="0"
                y="0"
                width="120"
                height="160"
                rx="4"
                fill="url(#mirror-grad)"
                stroke="#a855f7"
                strokeWidth="2"
                filter="url(#glow-bias)"
              />
              <text
                x="60"
                y="180"
                textAnchor="middle"
                className="text-sm font-bold fill-purple-400"
              >
                The AI Model
              </text>

              {/* Reflection */}
              <path
                d="M 30 40 Q 50 10 80 40 T 130 40"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                opacity="0.6"
                transform="scale(0.6) translate(20, 40)"
              />
            </g>

            {/* Arrow */}
            <path
              d="M 400 80 L 460 80"
              stroke="#64748b"
              strokeWidth="2"
              markerEnd="url(#arrowhead-pipeline)"
            />

            {/* Output */}
            <g transform="translate(480, 50)">
              <rect
                x="0"
                y="0"
                width="100"
                height="60"
                rx="8"
                fill="#ef4444"
                fillOpacity="0.1"
                stroke="#ef4444"
              />
              <text
                x="50"
                y="25"
                textAnchor="middle"
                className="text-xs fill-red-300"
              >
                Biased Output
              </text>
              <text
                x="50"
                y="45"
                textAnchor="middle"
                className="text-[10px] fill-red-400"
              >
                "Doctor = He"
              </text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "rag-architecture") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/10 shadow-2xl w-full max-w-5xl">
          {/* Increased viewBox width to 960 to prevent cropping */}
          <svg
            viewBox="0 0 960 400"
            className="w-full h-auto"
            role="img"
            aria-label="RAG Architecture: User Query -> Search Internal Docs -> AI Answer"
          >
            <defs>
              <marker
                id="arrowhead-rag"
                markerWidth="12"
                markerHeight="12"
                refX="10"
                refY="4"
                orient="auto"
              >
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
              <circle
                cx="40"
                cy="40"
                r="35"
                fill="#3b82f6"
                fillOpacity="0.2"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <text x="40" y="50" textAnchor="middle" className="text-4xl">
                👤
              </text>
              <text
                x="40"
                y="100"
                textAnchor="middle"
                className="text-sm font-bold fill-white"
              >
                You
              </text>
            </g>

            {/* Query Arrow */}
            <path
              d="M 100 220 L 180 220"
              stroke="#94a3b8"
              strokeWidth="3"
              markerEnd="url(#arrowhead-rag)"
            />
            <rect
              x="110"
              y="190"
              width="60"
              height="20"
              rx="4"
              fill="#1e293b"
            />
            <text
              x="140"
              y="205"
              textAnchor="middle"
              className="text-xs fill-slate-200"
            >
              "Query"
            </text>

            {/* 2. The Orchestrator (Copilot) */}
            <g transform="translate(200, 150)">
              <rect
                x="0"
                y="0"
                width="120"
                height="140"
                rx="12"
                fill="#a855f7"
                fillOpacity="0.15"
                stroke="#a855f7"
                strokeWidth="2"
                filter="url(#glow-rag)"
              />
              <text x="60" y="50" textAnchor="middle" className="text-5xl">
                🧠
              </text>
              <text
                x="60"
                y="90"
                textAnchor="middle"
                className="text-lg font-bold fill-purple-300"
              >
                Copilot
              </text>
              <text
                x="60"
                y="115"
                textAnchor="middle"
                className="text-xs fill-purple-200"
              >
                (The Brain)
              </text>
            </g>

            {/* Path to Data (Down) */}
            <path
              d="M 260 290 L 260 340 L 350 340"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeDasharray="6 6"
              markerEnd="url(#arrowhead-rag)"
            />
            <text
              x="290"
              y="330"
              textAnchor="middle"
              className="text-xs font-bold fill-amber-400"
            >
              1. Search
            </text>

            {/* 3. Company Data (Database) - Shifted Right slightly */}
            <g transform="translate(370, 300)">
              <path
                d="M 0 20 Q 50 0 100 20 L 100 100 Q 50 120 0 100 Z"
                fill="#f59e0b"
                fillOpacity="0.1"
                stroke="#f59e0b"
                strokeWidth="2"
              />
              <path
                d="M 0 20 Q 50 40 100 20"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
              />
              <text x="50" y="70" textAnchor="middle" className="text-4xl">
                🗄️
              </text>
              <text
                x="50"
                y="140"
                textAnchor="middle"
                className="text-sm font-bold fill-amber-300"
              >
                Company Data
              </text>
            </g>

            {/* Path from Data (Up) */}
            <path
              d="M 480 340 L 550 340 L 550 290"
              stroke="#22c55e"
              strokeWidth="3"
              strokeDasharray="6 6"
              markerEnd="url(#arrowhead-rag)"
            />
            <text
              x="580"
              y="320"
              textAnchor="middle"
              className="text-xs font-bold fill-green-400"
            >
              2. Retrieve
            </text>

            {/* 4. Context Window - Shifted Right */}
            <g transform="translate(520, 150)">
              <rect
                x="0"
                y="0"
                width="160"
                height="140"
                rx="12"
                fill="#22c55e"
                fillOpacity="0.15"
                stroke="#22c55e"
                strokeWidth="2"
              />
              <text
                x="80"
                y="30"
                textAnchor="middle"
                className="text-sm font-bold fill-green-300 uppercase tracking-widest"
              >
                Context Window
              </text>

              {/* Document Snippet */}
              <rect
                x="20"
                y="50"
                width="120"
                height="70"
                rx="4"
                fill="#ffffff"
                fillOpacity="0.1"
              />
              <line
                x1="30"
                y1="70"
                x2="130"
                y2="70"
                stroke="#ffffff"
                strokeOpacity="0.5"
                strokeWidth="2"
              />
              <line
                x1="30"
                y1="90"
                x2="110"
                y2="90"
                stroke="#ffffff"
                strokeOpacity="0.5"
                strokeWidth="2"
              />
              <text
                x="80"
                y="110"
                textAnchor="middle"
                className="text-[10px] fill-slate-300 italic"
              >
                "Found in Policy.pdf..."
              </text>
            </g>

            {/* Answer Arrow */}
            <path
              d="M 680 220 L 740 220"
              stroke="#94a3b8"
              strokeWidth="3"
              markerEnd="url(#arrowhead-rag)"
            />

            {/* 5. Final Answer - Shifted Right and ensured it fits */}
            <g transform="translate(750, 180)">
              <rect
                x="0"
                y="0"
                width="140"
                height="80"
                rx="12"
                fill="#3b82f6"
                fillOpacity="0.2"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <text
                x="70"
                y="35"
                textAnchor="middle"
                className="text-xs font-bold fill-blue-300 uppercase"
              >
                Final Answer
              </text>
              <text
                x="70"
                y="60"
                textAnchor="middle"
                className="text-lg font-bold fill-white"
              >
                "2 Weeks"
              </text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "black-box") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-3xl">
          <svg
            viewBox="0 0 600 200"
            className="w-full h-auto"
            role="img"
            aria-label="The Black Box Problem: Input -> ??? -> Output"
          >
            <defs>
              <marker
                id="arrowhead-box"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
              <linearGradient id="box-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>

            {/* Input */}
            <g transform="translate(50, 60)">
              <rect
                x="0"
                y="0"
                width="80"
                height="80"
                rx="4"
                fill="#3b82f6"
                fillOpacity="0.1"
                stroke="#3b82f6"
              />
              <text x="40" y="45" textAnchor="middle" className="text-2xl">
                🐱
              </text>
              <text
                x="40"
                y="70"
                textAnchor="middle"
                className="text-xs font-bold fill-blue-700 dark:fill-blue-300"
              >
                {isCs ? "Vstup" : "Input"}
              </text>
            </g>

            {/* Arrow */}
            <path
              d="M 140 100 L 190 100"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-box)"
            />

            {/* The Black Box */}
            <g transform="translate(200, 40)">
              <rect
                x="0"
                y="0"
                width="200"
                height="120"
                rx="8"
                fill="url(#box-grad)"
                stroke="#475569"
                strokeWidth="2"
              />
              <text
                x="100"
                y="60"
                textAnchor="middle"
                className="text-4xl font-bold fill-white opacity-50"
              >
                ???
              </text>
              <text
                x="100"
                y="90"
                textAnchor="middle"
                className="text-xs fill-slate-600 dark:fill-slate-400"
              >
                {isCs ? "Skryté vrstvy" : "Hidden Layers"}
              </text>

              {/* Math symbols floating */}
              <text
                x="30"
                y="30"
                className="text-[10px] fill-slate-600 dark:fill-slate-400"
              >
                ∑
              </text>
              <text
                x="170"
                y="100"
                className="text-[10px] fill-slate-600 dark:fill-slate-400"
              >
                ∫
              </text>
              <text
                x="160"
                y="30"
                className="text-[10px] fill-slate-600 dark:fill-slate-400"
              >
                w
              </text>
            </g>

            {/* Arrow */}
            <path
              d="M 410 100 L 460 100"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-box)"
            />

            {/* Output */}
            <g transform="translate(470, 60)">
              <rect
                x="0"
                y="0"
                width="80"
                height="80"
                rx="4"
                fill="#22c55e"
                fillOpacity="0.1"
                stroke="#22c55e"
              />
              <text
                x="40"
                y="45"
                textAnchor="middle"
                className="text-sm font-bold fill-green-700 dark:fill-green-300"
              >
                {isCs ? '"Kočka"' : '"Cat"'}
              </text>
              <text
                x="40"
                y="70"
                textAnchor="middle"
                className="text-xs font-bold fill-green-700 dark:fill-green-300"
              >
                {isCs ? "Výstup" : "Output"}
              </text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "transformer-architecture-simplified") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-6xl">
          <svg
            viewBox="0 0 700 300"
            className="w-full h-auto"
            role="img"
            aria-label="Transformer Architecture: Input -> Attention -> Feed Forward -> Output"
          >
            <defs>
              <marker
                id="arrowhead-transformer"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Input */}
            <g transform="translate(50, 120)">
              <rect
                x="0"
                y="0"
                width="100"
                height="80"
                rx="4"
                fill="#3b82f6"
                fillOpacity="0.1"
                stroke="#3b82f6"
              />
              <text
                x="50"
                y="35"
                textAnchor="middle"
                className="text-lg font-bold fill-blue-700 dark:fill-blue-300"
              >
                Input
              </text>
              <text
                x="50"
                y="65"
                textAnchor="middle"
                className="text-sm fill-slate-600 dark:fill-slate-400"
              >
                "The cat"
              </text>
            </g>

            {/* Arrow */}
            <path
              d="M 160 160 L 190 160"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-transformer)"
            />

            {/* The Transformer Block */}
            <g transform="translate(200, 50)">
              <rect
                x="0"
                y="0"
                width="280"
                height="220"
                rx="8"
                fill="#a855f7"
                fillOpacity="0.05"
                stroke="#a855f7"
                strokeWidth="2"
              />
              <text
                x="140"
                y="30"
                textAnchor="middle"
                className="text-lg font-bold fill-purple-700 dark:fill-purple-300"
              >
                Transformer Block
              </text>

              {/* Self Attention */}
              <rect
                x="40"
                y="50"
                width="200"
                height="60"
                rx="4"
                fill="#f59e0b"
                fillOpacity="0.2"
                stroke="#f59e0b"
              />
              <text
                x="140"
                y="85"
                textAnchor="middle"
                className="text-base font-bold fill-amber-700 dark:fill-amber-300"
              >
                Self-Attention
              </text>
              <text
                x="140"
                y="105"
                textAnchor="middle"
                className="text-xs fill-slate-600 dark:fill-slate-400"
              >
                "Cat looks at The"
              </text>

              {/* Arrow Down */}
              <path
                d="M 140 110 L 140 140"
                stroke="#94a3b8"
                strokeWidth="2"
                markerEnd="url(#arrowhead-transformer)"
              />

              {/* Feed Forward */}
              <rect
                x="40"
                y="140"
                width="200"
                height="60"
                rx="4"
                fill="#22c55e"
                fillOpacity="0.2"
                stroke="#22c55e"
              />
              <text
                x="140"
                y="175"
                textAnchor="middle"
                className="text-base font-bold fill-green-700 dark:fill-green-300"
              >
                Feed Forward
              </text>
              <text
                x="140"
                y="195"
                textAnchor="middle"
                className="text-xs fill-slate-600 dark:fill-slate-400"
              >
                "Process Meaning"
              </text>
            </g>

            {/* Arrow */}
            <path
              d="M 490 160 L 520 160"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-transformer)"
            />

            {/* Output */}
            <g transform="translate(530, 120)">
              <rect
                x="0"
                y="0"
                width="100"
                height="80"
                rx="4"
                fill="#ef4444"
                fillOpacity="0.1"
                stroke="#ef4444"
              />
              <text
                x="50"
                y="35"
                textAnchor="middle"
                className="text-lg font-bold fill-red-700 dark:fill-red-300"
              >
                Output
              </text>
              <text
                x="50"
                y="65"
                textAnchor="middle"
                className="text-sm fill-slate-600 dark:fill-slate-400"
              >
                "sat"
              </text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "alignment-misalignment") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-6xl">
          <svg
            viewBox="0 0 600 250"
            className="w-full h-auto"
            role="img"
            aria-label="Alignment Problem: Human Goal vs AI Goal"
          >
            <defs>
              <marker
                id="arrowhead-align"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Start Point */}
            <circle cx="50" cy="125" r="10" fill="#3b82f6" />
            <text
              x="50"
              y="160"
              textAnchor="middle"
              className="text-sm font-bold fill-slate-600 dark:fill-slate-500"
            >
              Start
            </text>

            {/* Human Goal (Green Path) */}
            <path
              d="M 60 125 Q 200 125 500 50"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeDasharray="6 6"
              markerEnd="url(#arrowhead-align)"
            />
            <text
              x="320"
              y="60"
              textAnchor="middle"
              className="text-lg font-bold fill-green-600 dark:fill-green-400"
            >
              Human Goal: "Cure Cancer"
            </text>
            <circle
              cx="520"
              cy="50"
              r="25"
              fill="#22c55e"
              fillOpacity="0.2"
              stroke="#22c55e"
            />
            <text x="520" y="60" textAnchor="middle" className="text-3xl">
              ❤️
            </text>

            {/* AI Goal (Red Path - Misaligned) */}
            <path
              d="M 60 125 Q 200 125 500 200"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              markerEnd="url(#arrowhead-align)"
            />
            <text
              x="320"
              y="200"
              textAnchor="middle"
              className="text-lg font-bold fill-red-600 dark:fill-red-400"
            >
              AI Goal: "Minimize Cells"
            </text>
            <circle
              cx="520"
              cy="200"
              r="25"
              fill="#ef4444"
              fillOpacity="0.2"
              stroke="#ef4444"
            />
            <text x="520" y="210" textAnchor="middle" className="text-3xl">
              💀
            </text>

            {/* Divergence Label - Moved to center gap to avoid overlap */}
            <text
              x="250"
              y="130"
              textAnchor="middle"
              className="text-sm fill-slate-600 dark:fill-slate-400 italic"
            >
              "Misalignment"
            </text>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "learning-types-overview") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-4xl">
          <svg
            viewBox="0 0 800 280"
            className="w-full h-auto"
            role="img"
            aria-label="Three Types of Machine Learning: Supervised, Unsupervised, Reinforcement"
          >
            {/* Title */}
            <text
              x="400"
              y="30"
              textAnchor="middle"
              className="text-lg font-bold fill-slate-600 dark:fill-slate-300"
            >
              {isCs
                ? "Tři typy strojového učení"
                : "Three Types of Machine Learning"}
            </text>

            {/* Supervised Learning */}
            <g transform="translate(50, 60)">
              <rect
                x="0"
                y="0"
                width="200"
                height="180"
                rx="12"
                fill="#3b82f6"
                fillOpacity="0.1"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <text
                x="100"
                y="35"
                textAnchor="middle"
                className="text-sm font-bold fill-blue-600 dark:fill-blue-400"
              >
                {isCs ? "Učení s učitelem" : "Supervised Learning"}
              </text>
              <text x="100" y="70" textAnchor="middle" className="text-4xl">
                👨‍🏫
              </text>
              <text
                x="100"
                y="100"
                textAnchor="middle"
                className="text-xs fill-slate-600 dark:fill-slate-400"
              >
                {isCs ? '"Toto je kočka"' : '"This is a cat"'}
              </text>
              <text
                x="100"
                y="130"
                textAnchor="middle"
                className="text-xs fill-slate-600 dark:fill-slate-400"
              >
                {isCs ? '"Toto je pes"' : '"This is a dog"'}
              </text>
              <rect
                x="40"
                y="145"
                width="120"
                height="25"
                rx="4"
                fill="#3b82f6"
                fillOpacity="0.2"
              />
              <text
                x="100"
                y="162"
                textAnchor="middle"
                className="text-[10px] font-bold fill-blue-600 dark:fill-blue-300"
              >
                {isCs ? "Označená data" : "Labeled Data"}
              </text>
            </g>

            {/* Unsupervised Learning */}
            <g transform="translate(300, 60)">
              <rect
                x="0"
                y="0"
                width="200"
                height="180"
                rx="12"
                fill="#a855f7"
                fillOpacity="0.1"
                stroke="#a855f7"
                strokeWidth="2"
              />
              <text
                x="100"
                y="35"
                textAnchor="middle"
                className="text-sm font-bold fill-purple-600 dark:fill-purple-400"
              >
                {isCs ? "Učení bez učitele" : "Unsupervised Learning"}
              </text>
              <text x="100" y="70" textAnchor="middle" className="text-4xl">
                🔍
              </text>
              <g transform="translate(40, 85)">
                <circle
                  cx="30"
                  cy="15"
                  r="8"
                  fill="#ef4444"
                  fillOpacity="0.5"
                />
                <circle
                  cx="50"
                  cy="25"
                  r="8"
                  fill="#ef4444"
                  fillOpacity="0.5"
                />
                <circle cx="40" cy="5" r="8" fill="#ef4444" fillOpacity="0.5" />
                <circle
                  cx="90"
                  cy="15"
                  r="8"
                  fill="#22c55e"
                  fillOpacity="0.5"
                />
                <circle
                  cx="110"
                  cy="25"
                  r="8"
                  fill="#22c55e"
                  fillOpacity="0.5"
                />
                <circle
                  cx="100"
                  cy="5"
                  r="8"
                  fill="#22c55e"
                  fillOpacity="0.5"
                />
              </g>
              <rect
                x="40"
                y="145"
                width="120"
                height="25"
                rx="4"
                fill="#a855f7"
                fillOpacity="0.2"
              />
              <text
                x="100"
                y="162"
                textAnchor="middle"
                className="text-[10px] font-bold fill-purple-600 dark:fill-purple-300"
              >
                {isCs ? "Najdi vzory" : "Find Patterns"}
              </text>
            </g>

            {/* Reinforcement Learning */}
            <g transform="translate(550, 60)">
              <rect
                x="0"
                y="0"
                width="200"
                height="180"
                rx="12"
                fill="#22c55e"
                fillOpacity="0.1"
                stroke="#22c55e"
                strokeWidth="2"
              />
              <text
                x="100"
                y="35"
                textAnchor="middle"
                className="text-sm font-bold fill-green-600 dark:fill-green-400"
              >
                {isCs ? "Posilované učení" : "Reinforcement Learning"}
              </text>
              <text x="100" y="70" textAnchor="middle" className="text-4xl">
                🎮
              </text>
              <text x="60" y="100" textAnchor="middle" className="text-lg">
                ✅
              </text>
              <text
                x="100"
                y="100"
                textAnchor="middle"
                className="text-xs fill-green-600 dark:fill-green-400"
              >
                +10
              </text>
              <text x="140" y="100" textAnchor="middle" className="text-lg">
                ❌
              </text>
              <text
                x="100"
                y="125"
                textAnchor="middle"
                className="text-xs fill-slate-600 dark:fill-slate-400"
              >
                {isCs ? "Pokus a omyl" : "Trial & Error"}
              </text>
              <rect
                x="40"
                y="145"
                width="120"
                height="25"
                rx="4"
                fill="#22c55e"
                fillOpacity="0.2"
              />
              <text
                x="100"
                y="162"
                textAnchor="middle"
                className="text-[10px] font-bold fill-green-600 dark:fill-green-300"
              >
                {isCs ? "Odměny & Tresty" : "Rewards & Penalties"}
              </text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "supervised-learning-flow") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-3xl">
          <svg
            viewBox="0 0 650 200"
            className="w-full h-auto"
            role="img"
            aria-label="Supervised Learning Flow: Data + Labels -> Training -> Prediction"
          >
            <defs>
              <marker
                id="arrowhead-supervised"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Step 1: Labeled Data */}
            <g transform="translate(30, 50)">
              <rect
                x="0"
                y="0"
                width="120"
                height="100"
                rx="8"
                fill="#3b82f6"
                fillOpacity="0.1"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <text
                x="60"
                y="25"
                textAnchor="middle"
                className="text-xs font-bold fill-blue-600 dark:fill-blue-400"
              >
                {isCs ? "Označená data" : "Labeled Data"}
              </text>
              <text
                x="30"
                y="55"
                className="text-xs fill-slate-600 dark:fill-slate-400"
              >
                🐱 = cat
              </text>
              <text
                x="30"
                y="75"
                className="text-xs fill-slate-600 dark:fill-slate-400"
              >
                🐶 = dog
              </text>
              <text
                x="30"
                y="95"
                className="text-xs fill-slate-600 dark:fill-slate-400"
              >
                🐦 = bird
              </text>
            </g>

            {/* Arrow */}
            <path
              d="M 160 100 L 200 100"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-supervised)"
            />

            {/* Step 2: Training */}
            <g transform="translate(210, 50)">
              <rect
                x="0"
                y="0"
                width="120"
                height="100"
                rx="8"
                fill="#a855f7"
                fillOpacity="0.1"
                stroke="#a855f7"
                strokeWidth="2"
              />
              <text
                x="60"
                y="25"
                textAnchor="middle"
                className="text-xs font-bold fill-purple-600 dark:fill-purple-400"
              >
                {isCs ? "Trénink" : "Training"}
              </text>
              <text x="60" y="60" textAnchor="middle" className="text-3xl">
                🧠
              </text>
              <text
                x="60"
                y="90"
                textAnchor="middle"
                className="text-[10px] fill-slate-600 dark:fill-slate-400"
              >
                {isCs ? "Učí se vzory" : "Learning patterns"}
              </text>
            </g>

            {/* Arrow */}
            <path
              d="M 340 100 L 380 100"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-supervised)"
            />

            {/* Step 3: Model */}
            <g transform="translate(390, 50)">
              <rect
                x="0"
                y="0"
                width="100"
                height="100"
                rx="8"
                fill="#f59e0b"
                fillOpacity="0.1"
                stroke="#f59e0b"
                strokeWidth="2"
              />
              <text
                x="50"
                y="25"
                textAnchor="middle"
                className="text-xs font-bold fill-amber-600 dark:fill-amber-400"
              >
                {isCs ? "Model" : "Model"}
              </text>
              <text x="50" y="60" textAnchor="middle" className="text-3xl">
                🤖
              </text>
              <text
                x="50"
                y="90"
                textAnchor="middle"
                className="text-[10px] fill-slate-600 dark:fill-slate-400"
              >
                {isCs ? "Natrénovaný" : "Trained"}
              </text>
            </g>

            {/* Arrow */}
            <path
              d="M 500 100 L 540 100"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-supervised)"
            />

            {/* Step 4: Prediction */}
            <g transform="translate(550, 50)">
              <rect
                x="0"
                y="0"
                width="90"
                height="100"
                rx="8"
                fill="#22c55e"
                fillOpacity="0.1"
                stroke="#22c55e"
                strokeWidth="2"
              />
              <text
                x="45"
                y="25"
                textAnchor="middle"
                className="text-xs font-bold fill-green-600 dark:fill-green-400"
              >
                {isCs ? "Predikce" : "Prediction"}
              </text>
              <text x="45" y="55" textAnchor="middle" className="text-xl">
                🐱❓
              </text>
              <text
                x="45"
                y="80"
                textAnchor="middle"
                className="text-xs fill-green-600 dark:fill-green-400"
              >
                → "cat"
              </text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "clustering-visualization") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-3xl">
          <svg
            viewBox="0 0 600 250"
            className="w-full h-auto"
            role="img"
            aria-label="Clustering: AI finds groups without labels"
          >
            <defs>
              <marker
                id="arrowhead-cluster"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Before: Mixed Data */}
            <g transform="translate(50, 40)">
              <text
                x="80"
                y="0"
                textAnchor="middle"
                className="text-sm font-bold fill-slate-600 dark:fill-slate-400"
              >
                {isCs ? "Před: Smíšená data" : "Before: Mixed Data"}
              </text>
              <rect
                x="0"
                y="15"
                width="160"
                height="160"
                rx="8"
                fill="#ffffff"
                fillOpacity="0.05"
                stroke="#475569"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Random dots */}
              <circle cx="40" cy="50" r="10" fill="#94a3b8" />
              <circle cx="100" cy="80" r="10" fill="#94a3b8" />
              <circle cx="60" cy="120" r="10" fill="#94a3b8" />
              <circle cx="130" cy="45" r="10" fill="#94a3b8" />
              <circle cx="80" cy="150" r="10" fill="#94a3b8" />
              <circle cx="120" cy="130" r="10" fill="#94a3b8" />
              <circle cx="45" cy="85" r="10" fill="#94a3b8" />
              <circle cx="110" cy="100" r="10" fill="#94a3b8" />
              <text
                x="80"
                y="200"
                textAnchor="middle"
                className="text-xs fill-slate-500"
              >
                {isCs ? "Bez označení" : "No Labels"}
              </text>
            </g>

            {/* Arrow */}
            <g transform="translate(230, 100)">
              <path
                d="M 0 20 L 60 20"
                stroke="#a855f7"
                strokeWidth="3"
                markerEnd="url(#arrowhead-cluster)"
              />
              <text
                x="30"
                y="10"
                textAnchor="middle"
                className="text-xs font-bold fill-purple-600 dark:fill-purple-400"
              >
                {isCs ? "Klastrování" : "Clustering"}
              </text>
              <text x="30" y="50" textAnchor="middle" className="text-2xl">
                🔍
              </text>
            </g>

            {/* After: Clustered Data */}
            <g transform="translate(340, 40)">
              <text
                x="100"
                y="0"
                textAnchor="middle"
                className="text-sm font-bold fill-slate-600 dark:fill-slate-400"
              >
                {isCs ? "Po: Nalezené skupiny" : "After: Groups Found"}
              </text>
              <rect
                x="0"
                y="15"
                width="200"
                height="160"
                rx="8"
                fill="#ffffff"
                fillOpacity="0.05"
                stroke="#475569"
                strokeWidth="2"
              />

              {/* Cluster 1 - Blue */}
              <ellipse
                cx="55"
                cy="70"
                rx="45"
                ry="40"
                fill="#3b82f6"
                fillOpacity="0.2"
                stroke="#3b82f6"
                strokeDasharray="4 4"
              />
              <circle cx="40" cy="60" r="10" fill="#3b82f6" />
              <circle cx="70" cy="55" r="10" fill="#3b82f6" />
              <circle cx="50" cy="85" r="10" fill="#3b82f6" />

              {/* Cluster 2 - Green */}
              <ellipse
                cx="145"
                cy="70"
                rx="45"
                ry="40"
                fill="#22c55e"
                fillOpacity="0.2"
                stroke="#22c55e"
                strokeDasharray="4 4"
              />
              <circle cx="130" cy="60" r="10" fill="#22c55e" />
              <circle cx="160" cy="55" r="10" fill="#22c55e" />
              <circle cx="145" cy="85" r="10" fill="#22c55e" />

              {/* Cluster 3 - Orange */}
              <ellipse
                cx="100"
                cy="140"
                rx="50"
                ry="30"
                fill="#f59e0b"
                fillOpacity="0.2"
                stroke="#f59e0b"
                strokeDasharray="4 4"
              />
              <circle cx="80" cy="140" r="10" fill="#f59e0b" />
              <circle cx="120" cy="140" r="10" fill="#f59e0b" />

              <text
                x="100"
                y="200"
                textAnchor="middle"
                className="text-xs fill-slate-500"
              >
                {isCs ? "3 skupiny nalezeny!" : "3 Groups Found!"}
              </text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "reinforcement-learning-loop") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-3xl">
          <svg
            viewBox="0 0 600 300"
            className="w-full h-auto"
            role="img"
            aria-label="Reinforcement Learning Loop: Agent, Environment, Reward"
          >
            <defs>
              <marker
                id="arrowhead-rl"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#22c55e" />
              </marker>
              <marker
                id="arrowhead-rl-blue"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
              </marker>
              <marker
                id="arrowhead-rl-amber"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#f59e0b" />
              </marker>
            </defs>

            {/* Agent (Left) */}
            <g transform="translate(80, 100)">
              <rect
                x="0"
                y="0"
                width="120"
                height="100"
                rx="12"
                fill="#a855f7"
                fillOpacity="0.15"
                stroke="#a855f7"
                strokeWidth="2"
              />
              <text x="60" y="35" textAnchor="middle" className="text-3xl">
                🤖
              </text>
              <text
                x="60"
                y="65"
                textAnchor="middle"
                className="text-sm font-bold fill-purple-600 dark:fill-purple-400"
              >
                {isCs ? "Agent" : "Agent"}
              </text>
              <text
                x="60"
                y="85"
                textAnchor="middle"
                className="text-[10px] fill-slate-600 dark:fill-slate-400"
              >
                {isCs ? "(Rozhoduje)" : "(Makes Decisions)"}
              </text>
            </g>

            {/* Environment (Right) */}
            <g transform="translate(400, 100)">
              <rect
                x="0"
                y="0"
                width="120"
                height="100"
                rx="12"
                fill="#3b82f6"
                fillOpacity="0.15"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <text x="60" y="35" textAnchor="middle" className="text-3xl">
                🌍
              </text>
              <text
                x="60"
                y="65"
                textAnchor="middle"
                className="text-sm font-bold fill-blue-600 dark:fill-blue-400"
              >
                {isCs ? "Prostředí" : "Environment"}
              </text>
              <text
                x="60"
                y="85"
                textAnchor="middle"
                className="text-[10px] fill-slate-600 dark:fill-slate-400"
              >
                {isCs ? "(Svět/Hra)" : "(World/Game)"}
              </text>
            </g>

            {/* Action Arrow (Top) */}
            <path
              d="M 200 120 L 400 120"
              stroke="#22c55e"
              strokeWidth="3"
              markerEnd="url(#arrowhead-rl)"
            />
            <text
              x="300"
              y="105"
              textAnchor="middle"
              className="text-xs font-bold fill-green-600 dark:fill-green-400"
            >
              {isCs ? "Akce" : "Action"}
            </text>
            <text x="300" y="135" textAnchor="middle" className="text-xl">
              🎯
            </text>

            {/* State Arrow (Bottom) */}
            <path
              d="M 400 180 L 200 180"
              stroke="#3b82f6"
              strokeWidth="3"
              markerEnd="url(#arrowhead-rl-blue)"
            />
            <text
              x="300"
              y="195"
              textAnchor="middle"
              className="text-xs font-bold fill-blue-600 dark:fill-blue-400"
            >
              {isCs ? "Nový stav" : "New State"}
            </text>

            {/* Reward (Center Bottom) */}
            <g transform="translate(250, 230)">
              <rect
                x="0"
                y="0"
                width="100"
                height="50"
                rx="8"
                fill="#f59e0b"
                fillOpacity="0.15"
                stroke="#f59e0b"
                strokeWidth="2"
              />
              <text x="50" y="25" textAnchor="middle" className="text-lg">
                🏆
              </text>
              <text
                x="50"
                y="42"
                textAnchor="middle"
                className="text-xs font-bold fill-amber-600 dark:fill-amber-400"
              >
                {isCs ? "Odměna" : "Reward"}
              </text>
            </g>

            {/* Reward arrows */}
            <path
              d="M 460 200 Q 460 255 350 255"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="4 4"
              markerEnd="url(#arrowhead-rl-amber)"
            />
            <path
              d="M 250 255 Q 140 255 140 200"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="4 4"
              markerEnd="url(#arrowhead-rl-amber)"
            />

            {/* Title */}
            <text
              x="300"
              y="40"
              textAnchor="middle"
              className="text-sm font-bold fill-slate-600 dark:fill-slate-300"
            >
              {isCs
                ? "Cyklus posilovaného učení"
                : "Reinforcement Learning Loop"}
            </text>

            {/* Example */}
            <text
              x="300"
              y="70"
              textAnchor="middle"
              className="text-xs fill-slate-500"
            >
              {isCs ? "Příklad: AI hraje šachy" : "Example: AI plays chess"}
            </text>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "ai-ml-dl-circles") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-2xl">
          <svg
            viewBox="0 0 500 400"
            className="w-full h-auto"
            role="img"
            aria-label="AI Hierarchy: Concentric circles showing AI > ML > DL > GenAI"
          >
            <defs>
              <filter id="glow-circles">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer Circle: AI */}
            <circle
              cx="250"
              cy="200"
              r="175"
              fill="#3b82f6"
              fillOpacity="0.1"
              stroke="#3b82f6"
              strokeWidth="3"
            />
            <text
              x="250"
              y="45"
              textAnchor="middle"
              className="text-lg font-bold fill-blue-600 dark:fill-blue-400"
            >
              {isCs ? "Umělá Inteligence" : "Artificial Intelligence"}
            </text>
            <text
              x="250"
              y="65"
              textAnchor="middle"
              className="text-xs fill-blue-500 dark:fill-blue-300"
            >
              {isCs ? "Jakákoli technika napodobující člověka" : "Any technique mimicking humans"}
            </text>

            {/* Middle Circle: ML */}
            <circle
              cx="250"
              cy="200"
              r="130"
              fill="#a855f7"
              fillOpacity="0.15"
              stroke="#a855f7"
              strokeWidth="3"
            />
            <text
              x="250"
              y="90"
              textAnchor="middle"
              className="text-base font-bold fill-purple-600 dark:fill-purple-400"
            >
              {isCs ? "Strojové Učení" : "Machine Learning"}
            </text>
            <text
              x="250"
              y="108"
              textAnchor="middle"
              className="text-[10px] fill-purple-500 dark:fill-purple-300"
            >
              {isCs ? "Učení z dat" : "Learning from data"}
            </text>

            {/* Inner Circle: DL */}
            <circle
              cx="250"
              cy="200"
              r="85"
              fill="#22c55e"
              fillOpacity="0.2"
              stroke="#22c55e"
              strokeWidth="3"
            />
            <text
              x="250"
              y="135"
              textAnchor="middle"
              className="text-sm font-bold fill-green-600 dark:fill-green-400"
            >
              {isCs ? "Hluboké Učení" : "Deep Learning"}
            </text>
            <text
              x="250"
              y="150"
              textAnchor="middle"
              className="text-[10px] fill-green-500 dark:fill-green-300"
            >
              {isCs ? "Neuronové sítě" : "Neural networks"}
            </text>

            {/* Core Circle: GenAI */}
            <circle
              cx="250"
              cy="200"
              r="45"
              fill="#f59e0b"
              fillOpacity="0.3"
              stroke="#f59e0b"
              strokeWidth="3"
              filter="url(#glow-circles)"
            />
            <text
              x="250"
              y="195"
              textAnchor="middle"
              className="text-sm font-bold fill-amber-600 dark:fill-amber-400"
            >
              GenAI
            </text>
            <text
              x="250"
              y="210"
              textAnchor="middle"
              className="text-[9px] fill-amber-500 dark:fill-amber-300"
            >
              {isCs ? "Tvoří nové" : "Creates new"}
            </text>

            {/* "You are here" indicator */}
            <g transform="translate(310, 200)">
              <line
                x1="0"
                y1="0"
                x2="50"
                y2="-30"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <rect
                x="50"
                y="-55"
                width="90"
                height="30"
                rx="4"
                fill="#f59e0b"
                fillOpacity="0.2"
                stroke="#f59e0b"
              />
              <text
                x="95"
                y="-35"
                textAnchor="middle"
                className="text-xs font-bold fill-amber-600 dark:fill-amber-300"
              >
                {isCs ? "📍 Jsi zde!" : "📍 You are here!"}
              </text>
            </g>

            {/* Examples on the right */}
            <g transform="translate(420, 320)">
              <text
                x="0"
                y="0"
                className="text-[10px] fill-blue-500 dark:fill-blue-400"
              >
                Siri, Chess AI
              </text>
              <text
                x="0"
                y="15"
                className="text-[10px] fill-purple-500 dark:fill-purple-400"
              >
                Netflix, Spotify
              </text>
              <text
                x="0"
                y="30"
                className="text-[10px] fill-green-500 dark:fill-green-400"
              >
                Image Recognition
              </text>
              <text
                x="0"
                y="45"
                className="text-[10px] fill-amber-500 dark:fill-amber-400"
              >
                ChatGPT, Midjourney
              </text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "human-in-the-loop") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-3xl">
          <svg
            viewBox="0 0 600 200"
            className="w-full h-auto"
            role="img"
            aria-label="Human in the Loop: Draft -> Review -> Refine"
          >
            <defs>
              <marker
                id="arrowhead-hitl"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Step 1: AI Draft */}
            <g transform="translate(50, 60)">
              <rect
                x="0"
                y="0"
                width="120"
                height="80"
                rx="8"
                fill="#a855f7"
                fillOpacity="0.1"
                stroke="#a855f7"
              />
              <text x="60" y="30" textAnchor="middle" className="text-2xl">
                🤖
              </text>
              <text
                x="60"
                y="60"
                textAnchor="middle"
                className="text-xs font-bold fill-purple-700 dark:fill-purple-300"
              >
                1. AI Draft
              </text>
              <text
                x="60"
                y="100"
                textAnchor="middle"
                className="text-[10px] fill-slate-600 dark:fill-slate-400"
              >
                "80% Done"
              </text>
            </g>

            {/* Arrow */}
            <path
              d="M 180 100 L 220 100"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-hitl)"
            />

            {/* Step 2: Human Review */}
            <g transform="translate(230, 60)">
              <rect
                x="0"
                y="0"
                width="120"
                height="80"
                rx="8"
                fill="#3b82f6"
                fillOpacity="0.1"
                stroke="#3b82f6"
              />
              <text x="60" y="30" textAnchor="middle" className="text-2xl">
                👩‍💻
              </text>
              <text
                x="60"
                y="60"
                textAnchor="middle"
                className="text-xs font-bold fill-blue-700 dark:fill-blue-300"
              >
                2. Review
              </text>
              <text
                x="60"
                y="100"
                textAnchor="middle"
                className="text-[10px] fill-slate-600 dark:fill-slate-400"
              >
                "Fact Check & Tone"
              </text>
            </g>

            {/* Arrow */}
            <path
              d="M 360 100 L 400 100"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-hitl)"
            />

            {/* Step 3: Final Polish */}
            <g transform="translate(410, 60)">
              <rect
                x="0"
                y="0"
                width="120"
                height="80"
                rx="8"
                fill="#22c55e"
                fillOpacity="0.1"
                stroke="#22c55e"
              />
              <text x="60" y="30" textAnchor="middle" className="text-2xl">
                ✨
              </text>
              <text
                x="60"
                y="60"
                textAnchor="middle"
                className="text-xs font-bold fill-green-700 dark:fill-green-300"
              >
                3. Final
              </text>
              <text
                x="60"
                y="100"
                textAnchor="middle"
                className="text-[10px] fill-slate-600 dark:fill-slate-400"
              >
                "Ready to Send"
              </text>
            </g>

            {/* Loop Back (Iterate) */}
            <path
              d="M 350 140 Q 350 170 290 170 Q 230 170 230 140"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="4 4"
              markerEnd="url(#arrowhead-hitl)"
            />
            <text
              x="290"
              y="185"
              textAnchor="middle"
              className="text-[10px] fill-amber-600 dark:fill-amber-400 font-bold"
            >
              Iterate if needed
            </text>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "multi-agent-workflow") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-4xl">
          <svg
            viewBox="0 0 700 520"
            className="w-full h-auto"
            role="img"
            aria-label={
              isCs
                ? "Multi-Agent Workflow v4.0: Claude orchestruje GPT-5.2, Gemini, Perplexity"
                : "Multi-Agent Workflow v4.0: Claude orchestrates GPT-5.2, Gemini, Perplexity"
            }
          >
            <defs>
              <marker
                id="arrowhead-maw"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3, 0 6"
                  className="fill-slate-400 dark:fill-slate-500"
                />
              </marker>
              {/* Glow filters */}
              <filter id="glow-claude" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Title */}
            <text
              x="350"
              y="30"
              textAnchor="middle"
              className="text-lg font-bold fill-slate-700 dark:fill-slate-200"
            >
              {isCs ? "🤖 Multi-Agent Workflow v4.0" : "🤖 Multi-Agent Workflow v4.0"}
            </text>

            {/* ═══ ORCHESTRATOR (Top Center) ═══ */}
            <text
              x="350"
              y="55"
              textAnchor="middle"
              className="text-[10px] font-mono fill-slate-500 dark:fill-slate-400"
            >
              ORCHESTRATION LAYER
            </text>

            {/* Claude Opus 4.5 - Orchestrator (larger, centered) */}
            <g transform="translate(225, 65)" filter="url(#glow-claude)">
              <rect
                x="0"
                y="0"
                width="250"
                height="85"
                rx="12"
                className="fill-orange-500/10 dark:fill-orange-500/15 stroke-orange-500"
                strokeWidth="3"
              />
              <text x="125" y="30" textAnchor="middle" className="text-2xl">
                🤖
              </text>
              <text
                x="125"
                y="50"
                textAnchor="middle"
                className="text-sm font-bold fill-orange-600 dark:fill-orange-400"
              >
                Claude Opus 4.5
              </text>
              <text
                x="125"
                y="70"
                textAnchor="middle"
                className="text-[10px] fill-orange-500 dark:fill-orange-300"
              >
                {isCs ? "Orchestrátor • CLI • QA Gate • Safety" : "Orchestrator • CLI • QA Gate • Safety"}
              </text>
            </g>

            {/* ═══ SPECIALIST AGENTS (Row below) ═══ */}
            <text
              x="350"
              y="175"
              textAnchor="middle"
              className="text-[10px] font-mono fill-slate-500 dark:fill-slate-400"
            >
              SPECIALIST AGENTS
            </text>

            {/* Arrows from Orchestrator to Specialists */}
            <line x1="290" y1="150" x2="155" y2="190" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" markerEnd="url(#arrowhead-maw)" />
            <line x1="350" y1="150" x2="350" y2="190" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" markerEnd="url(#arrowhead-maw)" />
            <line x1="410" y1="150" x2="545" y2="190" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" markerEnd="url(#arrowhead-maw)" />

            {/* GPT-5.2 Thinking - Reasoning specialist */}
            <g transform="translate(30, 195)">
              <rect
                x="0"
                y="0"
                width="150"
                height="85"
                rx="10"
                fill="#10b981"
                fillOpacity="0.1"
                stroke="#10b981"
                strokeWidth="2"
              />
              <text x="75" y="28" textAnchor="middle" className="text-xl">
                🧠
              </text>
              <text
                x="75"
                y="48"
                textAnchor="middle"
                className="text-[11px] font-bold fill-emerald-600 dark:fill-emerald-400"
              >
                GPT-5.2 Thinking
              </text>
              <text
                x="75"
                y="65"
                textAnchor="middle"
                className="text-[9px] fill-slate-500 dark:fill-slate-400"
              >
                {isCs ? "Reasoning, Architektura" : "Reasoning, Architecture"}
              </text>
              <text
                x="75"
                y="78"
                textAnchor="middle"
                className="text-[8px] fill-emerald-500/70"
              >
                GPQA 93.2%
              </text>
            </g>

            {/* Gemini CLI - Research & Content */}
            <g transform="translate(210, 195)">
              <rect
                x="0"
                y="0"
                width="150"
                height="85"
                rx="10"
                fill="#06b6d4"
                fillOpacity="0.1"
                stroke="#06b6d4"
                strokeWidth="2"
              />
              <text x="75" y="28" textAnchor="middle" className="text-xl">
                ✨
              </text>
              <text
                x="75"
                y="48"
                textAnchor="middle"
                className="text-[11px] font-bold fill-cyan-600 dark:fill-cyan-400"
              >
                Gemini 3 Pro
              </text>
              <text
                x="75"
                y="65"
                textAnchor="middle"
                className="text-[9px] fill-slate-500 dark:fill-slate-400"
              >
                {isCs ? "Research, Content Gen" : "Research, Content Gen"}
              </text>
              <text
                x="75"
                y="78"
                textAnchor="middle"
                className="text-[8px] fill-cyan-500/70"
              >
                2M context
              </text>
            </g>

            {/* Perplexity Sonar - Quick Research */}
            <g transform="translate(390, 195)">
              <rect
                x="0"
                y="0"
                width="150"
                height="85"
                rx="10"
                fill="#3b82f6"
                fillOpacity="0.1"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <text x="75" y="28" textAnchor="middle" className="text-xl">
                ⚡
              </text>
              <text
                x="75"
                y="48"
                textAnchor="middle"
                className="text-[11px] font-bold fill-blue-600 dark:fill-blue-400"
              >
                Perplexity Sonar
              </text>
              <text
                x="75"
                y="65"
                textAnchor="middle"
                className="text-[9px] fill-slate-500 dark:fill-slate-400"
              >
                {isCs ? "Quick Research, Fakta" : "Quick Research, Facts"}
              </text>
              <text
                x="75"
                y="78"
                textAnchor="middle"
                className="text-[8px] fill-blue-500/70"
              >
                {isCs ? "Real-time citace" : "Real-time citations"}
              </text>
            </g>

            {/* Gemini Deep Research - optional */}
            <g transform="translate(570, 195)">
              <rect
                x="0"
                y="0"
                width="110"
                height="85"
                rx="10"
                fill="#a855f7"
                fillOpacity="0.1"
                stroke="#a855f7"
                strokeWidth="1.5"
                strokeDasharray="4,2"
              />
              <text x="55" y="28" textAnchor="middle" className="text-lg">
                🔬
              </text>
              <text
                x="55"
                y="46"
                textAnchor="middle"
                className="text-[9px] font-bold fill-purple-600 dark:fill-purple-400"
              >
                Deep Research
              </text>
              <text
                x="55"
                y="60"
                textAnchor="middle"
                className="text-[8px] fill-slate-500 dark:fill-slate-400"
              >
                {isCs ? "Autonomní" : "Autonomous"}
              </text>
              <text
                x="55"
                y="73"
                textAnchor="middle"
                className="text-[7px] fill-purple-500/70"
              >
                20-60 min
              </text>
            </g>

            {/* Arrow to Deep Research */}
            <line x1="540" y1="237" x2="568" y2="237" className="stroke-purple-400/50 dark:stroke-purple-500/50" strokeWidth="1.5" strokeDasharray="3,2" markerEnd="url(#arrowhead-maw)" />

            {/* ═══ SHARED PROTOCOL (Center) ═══ */}
            <g transform="translate(175, 310)">
              <rect
                x="0"
                y="0"
                width="350"
                height="55"
                rx="8"
                className="fill-amber-500/10 dark:fill-amber-500/20 stroke-amber-500"
                strokeWidth="2"
                strokeDasharray="5,3"
              />
              <text x="175" y="22" textAnchor="middle" className="text-lg">
                📜
              </text>
              <text
                x="175"
                y="42"
                textAnchor="middle"
                className="text-sm font-bold fill-amber-600 dark:fill-amber-400"
              >
                AGENT_PROTOCOL.md
              </text>
            </g>

            {/* Arrows to Protocol */}
            <line x1="105" y1="280" x2="240" y2="305" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="1.5" markerEnd="url(#arrowhead-maw)" />
            <line x1="285" y1="280" x2="310" y2="305" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="1.5" markerEnd="url(#arrowhead-maw)" />
            <line x1="465" y1="280" x2="440" y2="305" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="1.5" markerEnd="url(#arrowhead-maw)" />

            {/* ═══ MEMORY SYSTEM (Bottom Row) ═══ */}
            <text
              x="350"
              y="395"
              textAnchor="middle"
              className="text-[10px] font-mono fill-slate-500 dark:fill-slate-400"
            >
              {isCs ? "PAMĚŤOVÝ SYSTÉM" : "MEMORY SYSTEM"}
            </text>

            {/* Arrow to Memory */}
            <line x1="350" y1="365" x2="350" y2="385" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="1.5" markerEnd="url(#arrowhead-maw)" />

            {/* Working Context - Short-term */}
            <g transform="translate(80, 405)">
              <rect
                x="0"
                y="0"
                width="160"
                height="65"
                rx="8"
                className="fill-emerald-500/10 dark:fill-emerald-500/20 stroke-emerald-500"
                strokeWidth="1.5"
              />
              <text x="80" y="22" textAnchor="middle" className="text-lg">
                💾
              </text>
              <text
                x="80"
                y="40"
                textAnchor="middle"
                className="text-[10px] font-bold fill-emerald-600 dark:fill-emerald-400"
              >
                WORKING_CONTEXT.md
              </text>
              <text
                x="80"
                y="55"
                textAnchor="middle"
                className="text-[8px] fill-slate-500 dark:fill-slate-400"
              >
                {isCs ? "Krátkodobá paměť" : "Short-term memory"}
              </text>
            </g>

            {/* Memory - Long-term */}
            <g transform="translate(270, 405)">
              <rect
                x="0"
                y="0"
                width="160"
                height="65"
                rx="8"
                className="fill-purple-500/10 dark:fill-purple-500/20 stroke-purple-500"
                strokeWidth="1.5"
              />
              <text x="80" y="22" textAnchor="middle" className="text-lg">
                🧠
              </text>
              <text
                x="80"
                y="40"
                textAnchor="middle"
                className="text-[10px] font-bold fill-purple-600 dark:fill-purple-400"
              >
                MEMORY.md
              </text>
              <text
                x="80"
                y="55"
                textAnchor="middle"
                className="text-[8px] fill-slate-500 dark:fill-slate-400"
              >
                {isCs ? "Dlouhodobá paměť" : "Long-term memory"}
              </text>
            </g>

            {/* Instructions */}
            <g transform="translate(460, 405)">
              <rect
                x="0"
                y="0"
                width="160"
                height="65"
                rx="8"
                className="fill-blue-500/10 dark:fill-blue-500/20 stroke-blue-500"
                strokeWidth="1.5"
              />
              <text x="80" y="22" textAnchor="middle" className="text-lg">
                📋
              </text>
              <text
                x="80"
                y="40"
                textAnchor="middle"
                className="text-[10px] font-bold fill-blue-600 dark:fill-blue-400"
              >
                {isCs ? "Agent Instrukce" : "Agent Instructions"}
              </text>
              <text
                x="80"
                y="55"
                textAnchor="middle"
                className="text-[8px] fill-slate-500 dark:fill-slate-400"
              >
                CLAUDE.md / GEMINI.md
              </text>
            </g>

            {/* ═══ ROUTING HINT ═══ */}
            <g transform="translate(50, 495)">
              <text
                x="0"
                y="0"
                className="text-[8px] font-mono fill-slate-400 dark:fill-slate-500"
              >
                {isCs
                  ? "🎯 Routing: Reasoning→GPT-5.2 | Content→Gemini | Quick facts→Perplexity | Deep research→Gemini DR"
                  : "🎯 Routing: Reasoning→GPT-5.2 | Content→Gemini | Quick facts→Perplexity | Deep research→Gemini DR"}
              </text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  return null;
}
