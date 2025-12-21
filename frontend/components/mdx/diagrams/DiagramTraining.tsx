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
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-6xl">
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

  // Neural Network - Simple 3-layer visualization
  if (type === "neural-network") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-2xl">
          <svg viewBox="0 0 400 200" className="w-full h-auto" role="img" aria-label={isCs ? "Neuronová síť: Vstup → Skryté vrstvy → Výstup" : "Neural Network: Input → Hidden Layers → Output"}>
            {/* Input Layer */}
            <g transform="translate(50, 30)">
              <text x="20" y="-10" textAnchor="middle" className="text-sm font-bold fill-blue-600 dark:fill-blue-400">{isCs ? "Vstup" : "Input"}</text>
              {[0, 1, 2, 3].map((i) => (
                <circle key={i} cx="20" cy={i * 40 + 20} r="15" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
              ))}
              <text x="20" y="190" textAnchor="middle" className="text-xs fill-slate-500 dark:fill-slate-400">784</text>
            </g>
            {/* Hidden Layer 1 */}
            <g transform="translate(140, 50)">
              <text x="20" y="-30" textAnchor="middle" className="text-sm font-bold fill-purple-600 dark:fill-purple-400">{isCs ? "Skryté" : "Hidden"}</text>
              {[0, 1, 2].map((i) => (
                <circle key={i} cx="20" cy={i * 50 + 20} r="15" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2" />
              ))}
            </g>
            {/* Hidden Layer 2 */}
            <g transform="translate(220, 50)">
              {[0, 1, 2].map((i) => (
                <circle key={i} cx="20" cy={i * 50 + 20} r="15" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2" />
              ))}
            </g>
            {/* Output Layer */}
            <g transform="translate(310, 70)">
              <text x="20" y="-50" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">{isCs ? "Výstup" : "Output"}</text>
              {[0, 1].map((i) => (
                <circle key={i} cx="20" cy={i * 60 + 20} r="18" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="2" />
              ))}
              <text x="20" y="35" textAnchor="middle" className="text-xs fill-slate-700 dark:fill-slate-300">0-9</text>
            </g>
            {/* Connection lines (simplified) */}
            <line x1="85" y1="100" x2="125" y2="100" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3" />
            <line x1="175" y1="100" x2="205" y2="100" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3" />
            <line x1="255" y1="100" x2="295" y2="100" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3" />
          </svg>
        </div>
      </div>
    );
  }

  // Learning Types Overview - The 3 Jedi Training Methods
  if (type === "learning-types-overview") {
    const types = isCs ? [
      { emoji: "📚", title: "S učitelem", desc: "Data + Štítky", color: "#3b82f6" },
      { emoji: "🧘", title: "Bez učitele", desc: "Jen data", color: "#a855f7" },
      { emoji: "⚔️", title: "Posilováním", desc: "Akce + Odměny", color: "#ef4444" },
    ] : [
      { emoji: "📚", title: "Supervised", desc: "Data + Labels", color: "#3b82f6" },
      { emoji: "🧘", title: "Unsupervised", desc: "Data only", color: "#a855f7" },
      { emoji: "⚔️", title: "Reinforcement", desc: "Actions + Rewards", color: "#ef4444" },
    ];
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {types.map((t, i) => (
              <div key={i} className="p-4 rounded-xl border-2 text-center" style={{ borderColor: t.color, backgroundColor: `${t.color}10` }}>
                <div className="text-3xl mb-2">{t.emoji}</div>
                <div className="font-bold text-base" style={{ color: t.color }}>{t.title}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Supervised Learning Flow - Simple input → label → learn
  if (type === "supervised-learning-flow") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-2xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="p-4 rounded-xl bg-blue-500/10 border-2 border-blue-500">
              <div className="text-2xl">🐱</div>
              <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">{isCs ? "Obrázek" : "Image"}</div>
            </div>
            <div className="text-2xl text-slate-400">→</div>
            <div className="p-4 rounded-xl bg-green-500/10 border-2 border-green-500">
              <div className="text-2xl">🏷️</div>
              <div className="text-sm font-bold text-green-600 dark:text-green-400 mt-1">{isCs ? "Štítek: Kočka" : "Label: Cat"}</div>
            </div>
            <div className="text-2xl text-slate-400">→</div>
            <div className="p-4 rounded-xl bg-purple-500/10 border-2 border-purple-500">
              <div className="text-2xl">🧠</div>
              <div className="text-sm font-bold text-purple-600 dark:text-purple-400 mt-1">{isCs ? "AI se učí" : "AI Learns"}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Clustering Visualization - Groups without labels
  if (type === "clustering-visualization") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-xl">
          <svg viewBox="0 0 300 180" className="w-full h-auto" role="img" aria-label={isCs ? "Clustering: AI najde skupiny" : "Clustering: AI finds groups"}>
            {/* Cluster 1 - Blue */}
            <circle cx="70" cy="60" r="8" fill="#3b82f6" />
            <circle cx="85" cy="75" r="8" fill="#3b82f6" />
            <circle cx="55" cy="80" r="8" fill="#3b82f6" />
            <circle cx="75" cy="90" r="8" fill="#3b82f6" />
            <ellipse cx="72" cy="75" rx="35" ry="30" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5" />
            {/* Cluster 2 - Purple */}
            <circle cx="180" cy="50" r="8" fill="#a855f7" />
            <circle cx="200" cy="65" r="8" fill="#a855f7" />
            <circle cx="165" cy="70" r="8" fill="#a855f7" />
            <circle cx="185" cy="80" r="8" fill="#a855f7" />
            <circle cx="195" cy="45" r="8" fill="#a855f7" />
            <ellipse cx="185" cy="62" rx="40" ry="32" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="5" />
            {/* Cluster 3 - Green */}
            <circle cx="130" cy="130" r="8" fill="#22c55e" />
            <circle cx="150" cy="145" r="8" fill="#22c55e" />
            <circle cx="115" cy="150" r="8" fill="#22c55e" />
            <ellipse cx="132" cy="142" rx="35" ry="25" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="5" />
            {/* Labels */}
            <text x="72" y="115" textAnchor="middle" className="text-xs font-bold fill-blue-600 dark:fill-blue-400">{isCs ? "Víkendoví" : "Weekend"}</text>
            <text x="185" y="105" textAnchor="middle" className="text-xs font-bold fill-purple-600 dark:fill-purple-400">{isCs ? "Lovci slev" : "Bargain"}</text>
            <text x="245" y="145" textAnchor="middle" className="text-xs font-bold fill-green-600 dark:fill-green-400">{isCs ? "VIP" : "VIP"}</text>
          </svg>
        </div>
      </div>
    );
  }

  // Reinforcement Learning Loop - Action → Reward cycle
  if (type === "reinforcement-learning-loop") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-xl">
          <svg viewBox="0 0 300 160" className="w-full h-auto" role="img" aria-label={isCs ? "RL smyčka: Akce → Prostředí → Odměna" : "RL Loop: Action → Environment → Reward"}>
            <defs>
              <marker id="arrowhead-rl" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>
            {/* Agent */}
            <rect x="20" y="50" width="80" height="60" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" />
            <text x="60" y="75" textAnchor="middle" className="text-xl">🤖</text>
            <text x="60" y="95" textAnchor="middle" className="text-xs font-bold fill-blue-600 dark:fill-blue-400">Agent</text>
            {/* Environment */}
            <rect x="180" y="50" width="100" height="60" rx="8" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="2" />
            <text x="230" y="75" textAnchor="middle" className="text-xl">🎮</text>
            <text x="230" y="95" textAnchor="middle" className="text-xs font-bold fill-green-600 dark:fill-green-400">{isCs ? "Prostředí" : "Environment"}</text>
            {/* Action arrow (top) */}
            <path d="M 100 65 L 175 65" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-rl)" />
            <text x="140" y="55" textAnchor="middle" className="text-xs fill-slate-600 dark:fill-slate-400">{isCs ? "Akce" : "Action"}</text>
            {/* Reward arrow (bottom) */}
            <path d="M 175 95 L 100 95" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-rl)" />
            <text x="140" y="130" textAnchor="middle" className="text-xs font-bold fill-amber-600 dark:fill-amber-400">{isCs ? "Odměna +1/-1" : "Reward +1/-1"}</text>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "training-pipeline") {
    return (
      <div className="my-8 flex justify-center -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full">
        <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl overflow-x-auto">
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
                "GPT-5 Raw"
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
