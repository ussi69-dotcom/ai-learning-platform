"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

// Extended glossary data with 12 terms
const GLOSSARY_TERMS = [
  {
    id: "llm",
    term: { en: "LLM", cs: "LLM" },
    fullName: { en: "Large Language Model", cs: "Velký jazykový model" },
    definition: {
      en: "AI systems trained on massive text datasets to understand and generate human-like text. Examples: GPT-4, Claude, Gemini.",
      cs: "AI systémy trénované na obrovských textových datech pro porozumění a generování lidského textu. Příklady: GPT-4, Claude, Gemini.",
    },
    lesson: { courseId: 1, lessonId: 3 },
    hue: 260,
  },
  {
    id: "prompt",
    term: { en: "Prompt", cs: "Prompt" },
    fullName: { en: "Prompt Engineering", cs: "Prompt Engineering" },
    definition: {
      en: "The art of crafting instructions for AI models to get optimal results. A well-designed prompt can dramatically improve AI output quality.",
      cs: "Umění tvorby instrukcí pro AI modely pro dosažení optimálních výsledků. Dobře navržený prompt může dramaticky zlepšit kvalitu AI výstupu.",
    },
    lesson: { courseId: 1, lessonId: 4 },
    hue: 200,
  },
  {
    id: "hallucination",
    term: { en: "Hallucination", cs: "Halucinace" },
    fullName: { en: "AI Hallucination", cs: "AI Halucinace" },
    definition: {
      en: "When AI confidently generates false or fabricated information. A critical limitation to understand when using AI systems.",
      cs: "Když AI sebevědomě generuje nepravdivé nebo vymyšlené informace. Kritické omezení, které je třeba znát při používání AI.",
    },
    lesson: { courseId: 1, lessonId: 5 },
    hue: 0,
  },
  {
    id: "neural",
    term: { en: "Neural Net", cs: "Neuronka" },
    fullName: { en: "Neural Network", cs: "Neuronová síť" },
    definition: {
      en: "Computing systems inspired by biological brains, using layers of interconnected nodes to learn patterns from data.",
      cs: "Výpočetní systémy inspirované biologickým mozkem, používající vrstvy propojených uzlů k učení vzorů z dat.",
    },
    lesson: { courseId: 1, lessonId: 2 },
    hue: 160,
  },
  {
    id: "rag",
    term: { en: "RAG", cs: "RAG" },
    fullName: { en: "Retrieval-Augmented Generation", cs: "Retrieval-Augmented Generation" },
    definition: {
      en: "Technique that enhances AI responses by retrieving relevant information from external knowledge bases before generating answers.",
      cs: "Technika vylepšující AI odpovědi načítáním relevantních informací z externích znalostních bází před generováním odpovědí.",
    },
    lesson: { courseId: 2, lessonId: 14 },
    hue: 45,
  },
  {
    id: "token",
    term: { en: "Token", cs: "Token" },
    fullName: { en: "Token / Context Window", cs: "Token / Kontextové okno" },
    definition: {
      en: "The basic unit of text that AI models process. A token is roughly 4 characters or 0.75 words. Context window = how many tokens AI can 'remember'.",
      cs: "Základní jednotka textu, kterou AI modely zpracovávají. Token je přibližně 4 znaky nebo 0.75 slova. Kontextové okno = kolik tokenů si AI 'pamatuje'.",
    },
    lesson: { courseId: 1, lessonId: 3 },
    hue: 330,
  },
  {
    id: "finetuning",
    term: { en: "Fine-tune", cs: "Fine-tune" },
    fullName: { en: "Model Fine-tuning", cs: "Doladění modelu" },
    definition: {
      en: "Process of further training a pre-trained AI model on specific data to specialize it for particular tasks or domains.",
      cs: "Proces dalšího trénování předtrénovaného AI modelu na specifických datech pro specializaci na konkrétní úkoly nebo domény.",
    },
    lesson: { courseId: 3, lessonId: 11 },
    hue: 280,
  },
  {
    id: "agent",
    term: { en: "AI Agent", cs: "AI Agent" },
    fullName: { en: "Autonomous AI Agent", cs: "Autonomní AI Agent" },
    definition: {
      en: "AI systems that can independently plan, use tools, and take actions to achieve goals. The frontier of AI capability in 2025.",
      cs: "AI systémy, které mohou samostatně plánovat, používat nástroje a provádět akce k dosažení cílů. Hranice AI schopností v roce 2025.",
    },
    lesson: { courseId: 2, lessonId: 17 },
    hue: 190,
  },
  {
    id: "transformer",
    term: { en: "Transformer", cs: "Transformer" },
    fullName: { en: "Transformer Architecture", cs: "Architektura Transformer" },
    definition: {
      en: "The revolutionary neural network architecture behind modern AI. Uses 'attention' to process all parts of input simultaneously.",
      cs: "Revoluční architektura neuronové sítě za moderní AI. Používá 'attention' pro zpracování všech částí vstupu současně.",
    },
    lesson: { courseId: 1, lessonId: 3 },
    hue: 120,
  },
  {
    id: "embedding",
    term: { en: "Embedding", cs: "Embedding" },
    fullName: { en: "Vector Embedding", cs: "Vektorový embedding" },
    definition: {
      en: "Converting text/images into numbers (vectors) that capture meaning. Similar concepts have similar vectors. Foundation of semantic search.",
      cs: "Převod textu/obrázků na čísla (vektory), které zachycují význam. Podobné koncepty mají podobné vektory. Základ sémantického vyhledávání.",
    },
    lesson: { courseId: 2, lessonId: 14 },
    hue: 70,
  },
  {
    id: "inference",
    term: { en: "Inference", cs: "Inference" },
    fullName: { en: "Model Inference", cs: "Inference modelu" },
    definition: {
      en: "Running a trained AI model to get predictions. The 'thinking' phase when you chat with ChatGPT or generate an image.",
      cs: "Spuštění natrénovaného AI modelu pro získání predikcí. Fáze 'přemýšlení' když chatujete s ChatGPT nebo generujete obrázek.",
    },
    lesson: { courseId: 2, lessonId: 16 },
    hue: 230,
  },
  {
    id: "context",
    term: { en: "Context", cs: "Kontext" },
    fullName: { en: "Context Window", cs: "Kontextové okno" },
    definition: {
      en: "The 'memory' of an AI during conversation. Larger context = AI remembers more. GPT-4: 128K tokens, Claude: 200K tokens.",
      cs: "‚Paměť' AI během konverzace. Větší kontext = AI si pamatuje více. GPT-4: 128K tokenů, Claude: 200K tokenů.",
    },
    lesson: { courseId: 1, lessonId: 4 },
    hue: 300,
  },
];

interface GlossaryTerm {
  id: string;
  term: { en: string; cs: string };
  fullName: { en: string; cs: string };
  definition: { en: string; cs: string };
  lesson: { courseId: number; lessonId: number };
  hue: number;
}

interface CubeState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
}

interface AIGlossaryProps {
  locale: string;
}

export default function AIGlossary({ locale }: AIGlossaryProps) {
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [cubeStates, setCubeStates] = useState<CubeState[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lang = locale === "cs" ? "cs" : "en";

  // Initialize cube positions
  useEffect(() => {
    const initStates = GLOSSARY_TERMS.map((_, i) => ({
      x: 50 + (i % 6) * 120 + Math.random() * 40,
      y: -100 - Math.random() * 300 - i * 30,
      vx: (Math.random() - 0.5) * 2,
      vy: 0,
      rotation: Math.random() * 360,
    }));
    setCubeStates(initStates);
  }, []);

  // Physics simulation
  useEffect(() => {
    if (cubeStates.length === 0) return;

    const gravity = 0.3;
    const friction = 0.98;
    const bounce = 0.6;
    const groundY = 180;
    const cubeSize = 80;

    const animate = () => {
      setCubeStates((prev) =>
        prev.map((cube, i) => {
          let { x, y, vx, vy, rotation } = cube;

          // Apply gravity
          vy += gravity;

          // Apply velocity
          x += vx;
          y += vy;

          // Apply friction
          vx *= friction;

          // Rotation based on velocity
          rotation += vx * 2;

          // Ground collision
          if (y > groundY) {
            y = groundY;
            vy = -vy * bounce;
            vx *= 0.9;

            // Small random bounce to keep things interesting
            if (Math.abs(vy) < 2) {
              vy = -Math.random() * 3 - 1;
              vx += (Math.random() - 0.5) * 2;
            }
          }

          // Wall collisions
          const containerWidth = containerRef.current?.offsetWidth || 800;
          const minX = 10;
          const maxX = containerWidth - cubeSize - 10;

          if (x < minX) {
            x = minX;
            vx = -vx * bounce;
          }
          if (x > maxX) {
            x = maxX;
            vx = -vx * bounce;
          }

          // Simple cube-to-cube collision
          prev.forEach((other, j) => {
            if (i !== j) {
              const dx = x - other.x;
              const dy = y - other.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < cubeSize * 0.9 && dist > 0) {
                const overlap = cubeSize * 0.9 - dist;
                const nx = dx / dist;
                const ny = dy / dist;
                x += nx * overlap * 0.5;
                y += ny * overlap * 0.5;
                vx += nx * 1.5;
                vy += ny * 0.5;
              }
            }
          });

          return { x, y, vx, vy, rotation };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [cubeStates.length]);

  const handleCubeClick = (term: GlossaryTerm, index: number) => {
    setSelectedTerm(term);
    // Add upward impulse when clicked
    setCubeStates((prev) =>
      prev.map((cube, i) =>
        i === index ? { ...cube, vy: -8, vx: (Math.random() - 0.5) * 4 } : cube
      )
    );
  };

  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-y border-white/10 overflow-hidden">
      <div className="container px-4 mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-sm font-mono text-cyan-400 mb-4">
            <Sparkles className="w-4 h-4" />
            <span>{locale === "cs" ? "Interaktivní slovník" : "Interactive Glossary"}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {locale === "cs" ? "AI Pojmy" : "AI Terms"}
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            {locale === "cs"
              ? "Klikni na ledovou kostku a zjisti více"
              : "Click an ice cube to learn more"}
          </p>
        </div>

        {/* Physics Container */}
        <div
          ref={containerRef}
          className="relative h-[280px] w-full overflow-hidden rounded-xl bg-gradient-to-b from-slate-800/30 to-slate-900/50 border border-white/5"
          style={{
            background: "linear-gradient(180deg, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.6) 100%)",
          }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
          </div>

          {/* Ice Cubes */}
          {GLOSSARY_TERMS.map((term, index) => {
            const state = cubeStates[index];
            if (!state) return null;

            return (
              <motion.button
                key={term.id}
                onClick={() => handleCubeClick(term, index)}
                className="absolute cursor-pointer group"
                style={{
                  left: state.x,
                  top: state.y,
                  transform: `rotate(${state.rotation}deg)`,
                  width: 80,
                  height: 80,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glass cube effect */}
                <div
                  className="w-full h-full rounded-xl relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg,
                      hsla(${term.hue}, 70%, 60%, 0.15) 0%,
                      hsla(${term.hue}, 70%, 40%, 0.25) 50%,
                      hsla(${term.hue}, 70%, 30%, 0.3) 100%)`,
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: `1px solid hsla(${term.hue}, 70%, 70%, 0.3)`,
                    boxShadow: `
                      0 8px 32px hsla(${term.hue}, 70%, 50%, 0.15),
                      inset 0 1px 1px hsla(${term.hue}, 70%, 90%, 0.2),
                      inset 0 -1px 1px hsla(${term.hue}, 70%, 20%, 0.1)
                    `,
                  }}
                >
                  {/* Ice shine effect */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1/2 rounded-t-xl"
                    style={{
                      background: `linear-gradient(180deg,
                        hsla(${term.hue}, 60%, 90%, 0.3) 0%,
                        transparent 100%)`,
                    }}
                  />

                  {/* Refraction lines */}
                  <div
                    className="absolute top-2 left-2 w-6 h-1 rounded-full opacity-40"
                    style={{ background: `hsla(${term.hue}, 70%, 90%, 0.5)` }}
                  />
                  <div
                    className="absolute top-4 left-3 w-3 h-0.5 rounded-full opacity-30"
                    style={{ background: `hsla(${term.hue}, 70%, 90%, 0.4)` }}
                  />

                  {/* Term text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-white font-bold text-xs md:text-sm drop-shadow-lg text-center px-1 leading-tight"
                      style={{
                        textShadow: `0 0 10px hsla(${term.hue}, 70%, 60%, 0.5)`,
                      }}
                    >
                      {term.term[lang]}
                    </span>
                  </div>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      boxShadow: `0 0 20px hsla(${term.hue}, 70%, 60%, 0.4)`,
                    }}
                  />
                </div>
              </motion.button>
            );
          })}

          {/* Floor reflection hint */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-cyan-500/5 to-transparent" />
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTerm(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative max-w-md w-full rounded-2xl p-6 border shadow-2xl"
              style={{
                background: `linear-gradient(135deg,
                  hsla(${selectedTerm.hue}, 30%, 15%, 0.95) 0%,
                  hsla(${selectedTerm.hue}, 30%, 10%, 0.98) 100%)`,
                borderColor: `hsla(${selectedTerm.hue}, 50%, 50%, 0.3)`,
                boxShadow: `0 0 60px hsla(${selectedTerm.hue}, 70%, 50%, 0.2)`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedTerm(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* Term badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-white font-bold text-lg mb-4"
                style={{
                  background: `linear-gradient(135deg,
                    hsla(${selectedTerm.hue}, 70%, 50%, 0.8) 0%,
                    hsla(${selectedTerm.hue}, 70%, 40%, 0.9) 100%)`,
                  boxShadow: `0 0 20px hsla(${selectedTerm.hue}, 70%, 50%, 0.3)`,
                }}
              >
                {selectedTerm.term[lang]}
              </div>

              {/* Full name */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {selectedTerm.fullName[lang]}
              </h3>

              {/* Definition */}
              <p className="text-slate-300 leading-relaxed mb-6">
                {selectedTerm.definition[lang]}
              </p>

              {/* CTA */}
              <Link
                href={`/courses/${selectedTerm.lesson.courseId}/lessons/${selectedTerm.lesson.lessonId}`}
                onClick={() => setSelectedTerm(null)}
              >
                <Button
                  className="w-full text-white font-medium gap-2"
                  style={{
                    background: `linear-gradient(135deg,
                      hsla(${selectedTerm.hue}, 70%, 50%, 1) 0%,
                      hsla(${selectedTerm.hue}, 70%, 40%, 1) 100%)`,
                  }}
                >
                  {locale === "cs" ? "Zjistit více v lekci" : "Learn more in lesson"}
                  <ExternalLink size={16} />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
