"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Sparkles, Zap, ZapOff } from "lucide-react";
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

// Physics state stored in ref (no React re-renders!)
interface PhysicsBody {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  sleeping: boolean;
  sleepCounter: number;
}

interface AIGlossaryProps {
  locale: string;
}

// Physics constants
const GRAVITY = 0.4;
const FRICTION = 0.985;
const BOUNCE = 0.5;
const ROTATION_DAMPING = 0.92;
const SLEEP_THRESHOLD = 0.15; // Velocity threshold for sleep
const SLEEP_FRAMES = 30; // Frames below threshold before sleeping
const FIXED_TIMESTEP = 1000 / 60; // 60 FPS physics

export default function AIGlossary({ locale }: AIGlossaryProps) {
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [isLowPerf, setIsLowPerf] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [dimensions, setDimensions] = useState({ height: 360, cubeSize: 120 });
  // Physics toggle - default OFF for weak machines, user can enable
  const [physicsEnabled, setPhysicsEnabled] = useState(false);

  // Refs for physics (no re-renders!)
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const physicsRef = useRef<PhysicsBody[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const accumulatorRef = useRef<number>(0);
  const lastScrollY = useRef<number>(0);
  const allSleepingRef = useRef<boolean>(false);

  const lang = locale === "cs" ? "cs" : "en";

  // Detect reduced motion preference and low-end devices
  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    // Performance probe - measure FPS for 1.5 seconds
    let frameCount = 0;
    const startTime = performance.now();
    let probeId: number;

    const probe = () => {
      frameCount++;
      if (performance.now() - startTime < 1500) {
        probeId = requestAnimationFrame(probe);
      } else {
        const avgFrameTime = 1500 / frameCount;
        // If average frame time > 25ms (< 40 FPS), mark as low perf
        if (avgFrameTime > 25) {
          setIsLowPerf(true);
        }
      }
    };
    probeId = requestAnimationFrame(probe);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      cancelAnimationFrame(probeId);
    };
  }, []);

  // Responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setDimensions({ height: 650, cubeSize: 85 });
      } else if (width < 640) {
        setDimensions({ height: 550, cubeSize: 95 });
      } else if (width < 768) {
        setDimensions({ height: 480, cubeSize: 105 });
      } else {
        setDimensions({ height: 360, cubeSize: 120 });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Initialize physics bodies
  useEffect(() => {
    const containerWidth = containerRef.current?.offsetWidth || 800;

    physicsRef.current = GLOSSARY_TERMS.map((_, i) => ({
      x: 30 + (i % 6) * (containerWidth / 7) + Math.random() * 30,
      y: -120 - Math.random() * 400 - i * 40,
      vx: (Math.random() - 0.5) * 2,
      vy: 0,
      rotation: (Math.random() - 0.5) * 30,
      sleeping: false,
      sleepCounter: 0,
    }));
  }, []);

  // Wake up cubes (used by scroll and click)
  const wakeUpCubes = useCallback((indices?: number[]) => {
    const bodies = physicsRef.current;
    const toWake = indices || bodies.map((_, i) => i);

    toWake.forEach(i => {
      if (bodies[i]) {
        bodies[i].sleeping = false;
        bodies[i].sleepCounter = 0;
      }
    });
    allSleepingRef.current = false;
  }, []);

  // Scroll-based impulse (optimized - no setState)
  useEffect(() => {
    // Physics must be enabled AND not blocked by reduced motion
    if (!physicsEnabled || prefersReducedMotion) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (Math.abs(delta) > 5) {
        const bodies = physicsRef.current;
        bodies.forEach(body => {
          if (!body.sleeping) {
            body.vy += delta > 0 ? 0.6 : -1.2;
            body.vx += (Math.random() - 0.5) * 0.3;
          }
        });
        wakeUpCubes();
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [physicsEnabled, prefersReducedMotion, wakeUpCubes]);

  // Physics simulation with fixed timestep (direct DOM manipulation)
  useEffect(() => {
    // Static layout when physics disabled OR reduced motion preference
    if (!physicsEnabled || prefersReducedMotion) {
      // Static layout - nice grid arrangement
      const containerWidth = containerRef.current?.offsetWidth || 800;
      const cols = Math.floor(containerWidth / (dimensions.cubeSize + 20));

      GLOSSARY_TERMS.forEach((_, i) => {
        const el = cubeRefs.current[i];
        if (el) {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const x = 20 + col * (dimensions.cubeSize + 15);
          const y = 20 + row * (dimensions.cubeSize + 15);
          el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(0deg)`;
        }
      });
      return;
    }

    const { height: containerHeight, cubeSize } = dimensions;
    const groundY = containerHeight - cubeSize - 10;
    const ceilingY = 5;

    const simulate = (now: number) => {
      // Fixed timestep with accumulator
      if (lastTimeRef.current === 0) lastTimeRef.current = now;
      const deltaTime = Math.min(now - lastTimeRef.current, 100); // Cap at 100ms
      lastTimeRef.current = now;
      accumulatorRef.current += deltaTime;

      // Skip if all cubes are sleeping
      if (allSleepingRef.current) {
        animationRef.current = requestAnimationFrame(simulate);
        return;
      }

      const bodies = physicsRef.current;
      const containerWidth = containerRef.current?.offsetWidth || 800;
      const minX = 10;
      const maxX = containerWidth - cubeSize - 10;

      // Process physics in fixed timesteps
      while (accumulatorRef.current >= FIXED_TIMESTEP) {
        accumulatorRef.current -= FIXED_TIMESTEP;

        let allSleeping = true;

        for (let i = 0; i < bodies.length; i++) {
          const body = bodies[i];

          // Skip sleeping bodies
          if (body.sleeping) continue;
          allSleeping = false;

          // Apply gravity
          body.vy += GRAVITY;

          // Apply velocity
          body.x += body.vx;
          body.y += body.vy;

          // Apply friction
          body.vx *= FRICTION;

          // Rotation based on velocity + damping
          body.rotation += body.vx * 1.2;
          body.rotation *= ROTATION_DAMPING;

          // Ground collision
          if (body.y > groundY) {
            body.y = groundY;
            body.vy = -body.vy * BOUNCE;
            body.vx *= 0.85;
          }

          // Ceiling collision
          if (body.y < ceilingY) {
            body.y = ceilingY;
            body.vy = Math.abs(body.vy) * BOUNCE;
          }

          // Wall collisions
          if (body.x < minX) {
            body.x = minX;
            body.vx = -body.vx * BOUNCE;
          }
          if (body.x > maxX) {
            body.x = maxX;
            body.vx = -body.vx * BOUNCE;
          }

          // Cube-to-cube collision (optimized - only check nearby)
          for (let j = i + 1; j < bodies.length; j++) {
            const other = bodies[j];
            if (other.sleeping) continue;

            const dx = body.x - other.x;
            const dy = body.y - other.y;
            const distSq = dx * dx + dy * dy;
            const minDist = cubeSize * 0.85;

            if (distSq < minDist * minDist && distSq > 0) {
              const dist = Math.sqrt(distSq);
              const overlap = minDist - dist;
              const nx = dx / dist;
              const ny = dy / dist;

              // Separate bodies
              const separation = overlap * 0.5;
              body.x += nx * separation;
              body.y += ny * separation;
              other.x -= nx * separation;
              other.y -= ny * separation;

              // Exchange velocity (simplified elastic collision)
              const relVx = body.vx - other.vx;
              const relVy = body.vy - other.vy;
              const impulse = (relVx * nx + relVy * ny) * 0.5;

              body.vx -= impulse * nx;
              body.vy -= impulse * ny;
              other.vx += impulse * nx;
              other.vy += impulse * ny;
            }
          }

          // Sleep detection with hysteresis
          const speed = Math.sqrt(body.vx * body.vx + body.vy * body.vy);
          if (speed < SLEEP_THRESHOLD && body.y >= groundY - 1) {
            body.sleepCounter++;
            if (body.sleepCounter > SLEEP_FRAMES) {
              body.sleeping = true;
              body.vx = 0;
              body.vy = 0;
            }
          } else {
            body.sleepCounter = 0;
          }
        }

        allSleepingRef.current = allSleeping;
      }

      // Update DOM (batch all writes together)
      for (let i = 0; i < bodies.length; i++) {
        const el = cubeRefs.current[i];
        if (el) {
          const body = bodies[i];
          el.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) rotate(${body.rotation}deg)`;
        }
      }

      animationRef.current = requestAnimationFrame(simulate);
    };

    animationRef.current = requestAnimationFrame(simulate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, prefersReducedMotion, physicsEnabled]);

  // Handle cube click - add impulse
  const handleCubeClick = useCallback((term: GlossaryTerm, index: number) => {
    setSelectedTerm(term);

    if (physicsEnabled && !prefersReducedMotion) {
      const body = physicsRef.current[index];
      if (body) {
        body.vy = -10;
        body.vx = (Math.random() - 0.5) * 6;
        body.sleeping = false;
        body.sleepCounter = 0;
        wakeUpCubes([index]);
      }
    }
  }, [physicsEnabled, prefersReducedMotion, wakeUpCubes]);

  const { height: containerHeight, cubeSize } = dimensions;

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
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-4">
            {locale === "cs"
              ? "Klikni na ledovou kostku a zjisti více"
              : "Click an ice cube to learn more"}
          </p>

          {/* Physics Toggle Button */}
          {!prefersReducedMotion && (
            <button
              onClick={() => {
                setPhysicsEnabled(!physicsEnabled);
                // Reset physics when enabling
                if (!physicsEnabled) {
                  wakeUpCubes();
                  // Re-initialize positions for drop animation
                  const containerWidth = containerRef.current?.offsetWidth || 800;
                  physicsRef.current = GLOSSARY_TERMS.map((_, i) => ({
                    x: 30 + (i % 6) * (containerWidth / 7) + Math.random() * 30,
                    y: -120 - Math.random() * 400 - i * 40,
                    vx: (Math.random() - 0.5) * 2,
                    vy: 0,
                    rotation: (Math.random() - 0.5) * 30,
                    sleeping: false,
                    sleepCounter: 0,
                  }));
                }
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                physicsEnabled
                  ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30"
                  : "bg-slate-700/50 border-slate-600/50 text-slate-400 hover:bg-slate-700/70 hover:text-slate-300"
              } border`}
              title={
                isLowPerf
                  ? locale === "cs"
                    ? "Slabší zařízení detekováno - fyzika může způsobit zpomalení"
                    : "Weaker device detected - physics may cause slowdown"
                  : ""
              }
            >
              {physicsEnabled ? (
                <>
                  <Zap className="w-4 h-4" />
                  {locale === "cs" ? "Fyzika ZAPNUTA" : "Physics ON"}
                </>
              ) : (
                <>
                  <ZapOff className="w-4 h-4" />
                  {locale === "cs" ? "Fyzika VYPNUTA" : "Physics OFF"}
                </>
              )}
              {isLowPerf && (
                <span className="text-xs text-amber-400 ml-1">⚠️</span>
              )}
            </button>
          )}
        </div>

        {/* Physics Container */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-slate-800/30 to-slate-900/50 border border-white/5 transition-[height] duration-300"
          style={{
            height: containerHeight,
            background: "linear-gradient(180deg, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.6) 100%)",
          }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
          </div>

          {/* Ice Cubes - using refs for direct DOM updates */}
          {GLOSSARY_TERMS.map((term, index) => (
            <button
              key={term.id}
              ref={el => { cubeRefs.current[index] = el; }}
              onClick={() => handleCubeClick(term, index)}
              className="absolute cursor-pointer group"
              style={{
                width: cubeSize,
                height: cubeSize,
                willChange: "transform", // GPU hint
                transform: "translate3d(0, 0, 0)", // Initial position, updated by physics
              }}
            >
              {/* Glass cube effect */}
              <div
                className="w-full h-full rounded-xl relative overflow-hidden transition-transform duration-150 group-hover:scale-110 group-active:scale-95"
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
                  className="absolute top-0 left-0 right-0 h-1/2 rounded-t-xl pointer-events-none"
                  style={{
                    background: `linear-gradient(180deg,
                      hsla(${term.hue}, 60%, 90%, 0.3) 0%,
                      transparent 100%)`,
                  }}
                />

                {/* Refraction lines */}
                <div
                  className="absolute top-2 left-2 w-6 h-1 rounded-full opacity-40 pointer-events-none"
                  style={{ background: `hsla(${term.hue}, 70%, 90%, 0.5)` }}
                />
                <div
                  className="absolute top-4 left-3 w-3 h-0.5 rounded-full opacity-30 pointer-events-none"
                  style={{ background: `hsla(${term.hue}, 70%, 90%, 0.4)` }}
                />

                {/* Term text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-white font-bold drop-shadow-lg text-center px-1 leading-tight"
                    style={{
                      fontSize: cubeSize < 100 ? '0.7rem' : cubeSize < 110 ? '0.8rem' : '0.9rem',
                      textShadow: `0 0 10px hsla(${term.hue}, 70%, 60%, 0.5)`,
                    }}
                  >
                    {term.term[lang]}
                  </span>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: `0 0 20px hsla(${term.hue}, 70%, 60%, 0.4)`,
                  }}
                />
              </div>
            </button>
          ))}

          {/* Floor reflection hint */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
        </div>

        {/* Performance indicator (dev only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="text-xs text-slate-500 mt-2 text-center">
            {prefersReducedMotion && "🚫 Reduced motion (no physics)"}
            {!prefersReducedMotion && physicsEnabled && "✨ Physics enabled"}
            {!prefersReducedMotion && !physicsEnabled && "📦 Static layout (physics off)"}
            {isLowPerf && " | ⚠️ Low-perf device detected"}
          </div>
        )}
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
