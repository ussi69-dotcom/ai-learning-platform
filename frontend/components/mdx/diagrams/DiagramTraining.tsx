"use client";

import React from "react";
import { useLocale } from "next-intl";

interface DiagramProps {
  type: string;
}

export default function DiagramTraining({ type }: DiagramProps) {
  const locale = useLocale();
  const isCs = locale === "cs";

  if (type === "training-loop") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-6xl">
          <svg
            viewBox="0 0 700 250"
            className="w-full h-auto"
            role="img"
            aria-label="Training Loop: Guess -> Error -> Update"
          >
            <defs>
              <marker
                id="arrowhead-loop"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Step 1: Guess */}
            <g transform="translate(80, 50)">
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
                🤔
              </text>
              <text
                x="60"
                y="60"
                textAnchor="middle"
                className="text-xs font-bold fill-blue-700 dark:fill-blue-300"
              >
                1. Guess
              </text>
              <text
                x="60"
                y="100"
                textAnchor="middle"
                className="text-[10px] fill-slate-600 dark:fill-slate-400"
              >
                "Is it a Dog?"
              </text>
            </g>

            {/* Arrow */}
            <path
              d="M 210 90 L 260 90"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-loop)"
            />

            {/* Step 2: Error (Loss) */}
            <g transform="translate(270, 50)">
              <rect
                x="0"
                y="0"
                width="120"
                height="80"
                rx="8"
                fill="#ef4444"
                fillOpacity="0.1"
                stroke="#ef4444"
              />
              <text x="60" y="30" textAnchor="middle" className="text-2xl">
                ❌
              </text>
              <text
                x="60"
                y="60"
                textAnchor="middle"
                className="text-xs font-bold fill-red-700 dark:fill-red-300"
              >
                2. Error
              </text>
              <text
                x="60"
                y="100"
                textAnchor="middle"
                className="text-[10px] fill-slate-600 dark:fill-slate-400"
              >
                "Wrong! It's a Cat."
              </text>
            </g>

            {/* Arrow */}
            <path
              d="M 400 90 L 450 90"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-loop)"
            />

            {/* Step 3: Update (Optimizer) */}
            <g transform="translate(460, 50)">
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
                🔧
              </text>
              <text
                x="60"
                y="60"
                textAnchor="middle"
                className="text-xs font-bold fill-green-700 dark:fill-green-300"
              >
                3. Update
              </text>
              <text
                x="60"
                y="100"
                textAnchor="middle"
                className="text-[10px] fill-slate-600 dark:fill-slate-400"
              >
                Tweak Weights
              </text>
            </g>

            {/* Loop Back Arrow - Centered for new layout */}
            <path
              d="M 520 140 Q 520 200 330 200 Q 140 200 140 140"
              fill="none"
              stroke="#a855f7"
              strokeWidth="2"
              strokeDasharray="6 6"
              markerEnd="url(#arrowhead-loop)"
            />
            <text
              x="330"
              y="190"
              textAnchor="middle"
              className="text-xs font-bold fill-purple-700 dark:fill-purple-300"
            >
              Repeat 1,000,000x
            </text>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "training-pipeline") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-3xl overflow-x-auto">
          <svg
            viewBox="0 0 700 200"
            className="w-full min-w-[600px] h-auto"
            role="img"
            aria-label="Training Pipeline: Internet Data -> Pre-training -> Base Model -> Fine-tuning -> Chat Model"
          >
            <defs>
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

            {/* Step 1: Data */}
            <g transform="translate(50, 50)">
              <path
                d="M 10 10 L 70 10 L 70 70 L 10 70 Z"
                fill="#f1f5f9"
                fillOpacity="0.1"
                stroke="#94a3b8"
              />
              <path
                d="M 15 15 L 75 15 L 75 75 L 15 75 Z"
                fill="#f1f5f9"
                fillOpacity="0.1"
                stroke="#94a3b8"
              />
              <path
                d="M 20 20 L 80 20 L 80 80 L 20 80 Z"
                fill="#f1f5f9"
                fillOpacity="0.1"
                stroke="#94a3b8"
              />
              <text
                x="50"
                y="110"
                textAnchor="middle"
                className="text-xs font-bold fill-slate-600 dark:fill-slate-400 uppercase tracking-wider"
              >
                The Internet
              </text>
            </g>

            {/* Arrow */}
            <path
              d="M 100 60 L 150 60"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-pipeline)"
            />

            {/* Step 2: Pre-training */}
            <g transform="translate(160, 20)">
              <rect
                x="0"
                y="0"
                width="120"
                height="80"
                rx="8"
                fill="#3b82f6"
                fillOpacity="0.1"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <text
                x="60"
                y="30"
                textAnchor="middle"
                className="text-sm font-bold fill-blue-700 dark:fill-blue-400"
              >
                Pre-training
              </text>
              <text
                x="60"
                y="55"
                textAnchor="middle"
                className="text-[10px] fill-blue-600 dark:fill-blue-300"
              >
                Months of GPU
              </text>
            </g>

            {/* Arrow */}
            <path
              d="M 290 60 L 340 60"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-pipeline)"
            />

            {/* Step 3: Base Model */}
            <g transform="translate(350, 20)">
              <circle
                cx="40"
                cy="40"
                r="35"
                fill="#a855f7"
                fillOpacity="0.1"
                stroke="#a855f7"
                strokeWidth="2"
              />
              <text
                x="40"
                y="45"
                textAnchor="middle"
                className="text-sm font-bold fill-purple-700 dark:fill-purple-400"
              >
                Base Model
              </text>
              <text
                x="40"
                y="95"
                textAnchor="middle"
                className="text-[10px] fill-slate-600 dark:fill-slate-400"
              >
                "GPT-5.1 Raw"
              </text>
            </g>

            {/* Arrow */}
            <path
              d="M 440 60 L 490 60"
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead-pipeline)"
            />

            {/* Step 4: Fine-tuning */}
            <g transform="translate(500, 20)">
              <rect
                x="0"
                y="0"
                width="140"
                height="80"
                rx="8"
                fill="#22c55e"
                fillOpacity="0.1"
                stroke="#22c55e"
                strokeWidth="2"
              />
              <text
                x="70"
                y="30"
                textAnchor="middle"
                className="text-sm font-bold fill-green-700 dark:fill-green-400"
              >
                RLHF / Fine-tuning
              </text>
              <text
                x="70"
                y="55"
                textAnchor="middle"
                className="text-[10px] fill-green-600 dark:fill-green-300"
              >
                Teaching it to chat
              </text>
            </g>

            {/* Final Output Label */}
            <text
              x="570"
              y="120"
              textAnchor="middle"
              className="text-lg font-bold fill-slate-800 dark:fill-white"
            >
              ChatGPT
            </text>
          </svg>
        </div>
      </div>
    );
  }

  return null;
}
