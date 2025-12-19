"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Sparkles, Zap, ZapOff } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

// Comprehensive glossary data with terms from ALL lessons across all courses
const GLOSSARY_TERMS = [
  // === AI Basics (Course 3) ===
  {
    id: "llm",
    term: { en: "LLM", cs: "LLM" },
    fullName: { en: "Large Language Model", cs: "Velký jazykový model" },
    definition: {
      en: "AI systems trained on massive text datasets to understand and generate human-like text. Examples: GPT-4, Claude, Gemini.",
      cs: "AI systémy trénované na obrovských textových datech pro porozumění a generování lidského textu. Příklady: GPT-4, Claude, Gemini.",
    },
    lesson: { courseId: 3, lessonId: 3 },
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
    lesson: { courseId: 3, lessonId: 4 },
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
    lesson: { courseId: 3, lessonId: 5 },
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
    lesson: { courseId: 3, lessonId: 2 },
    hue: 160,
  },
  {
    id: "token",
    term: { en: "Token", cs: "Token" },
    fullName: { en: "Token / Context Window", cs: "Token / Kontextové okno" },
    definition: {
      en: "The basic unit of text that AI models process. A token is roughly 4 characters or 0.75 words. Context window = how many tokens AI can 'remember'.",
      cs: "Základní jednotka textu, kterou AI modely zpracovávají. Token je přibližně 4 znaky nebo 0.75 slova. Kontextové okno = kolik tokenů si AI 'pamatuje'.",
    },
    lesson: { courseId: 3, lessonId: 3 },
    hue: 330,
  },
  {
    id: "transformer",
    term: { en: "Transformer", cs: "Transformer" },
    fullName: { en: "Transformer Architecture", cs: "Architektura Transformer" },
    definition: {
      en: "The revolutionary neural network architecture behind modern AI. Uses 'attention' to process all parts of input simultaneously.",
      cs: "Revoluční architektura neuronové sítě za moderní AI. Používá 'attention' pro zpracování všech částí vstupu současně.",
    },
    lesson: { courseId: 3, lessonId: 3 },
    hue: 120,
  },
  {
    id: "bias",
    term: { en: "AI Bias", cs: "AI Bias" },
    fullName: { en: "AI Bias & Fairness", cs: "Zkreslení a férovost AI" },
    definition: {
      en: "Systematic errors in AI outputs caused by biased training data or algorithms. Can perpetuate discrimination if not addressed.",
      cs: "Systematické chyby v AI výstupech způsobené zkreslenými trénovacími daty nebo algoritmy. Mohou perpetuovat diskriminaci, pokud nejsou řešeny.",
    },
    lesson: { courseId: 3, lessonId: 5 },
    hue: 15,
  },

  // === Prompt Engineering (Course 2) ===
  {
    id: "prompt-injection",
    term: { en: "Prompt Injection", cs: "Prompt Injekce" },
    fullName: { en: "Prompt Injection", cs: "Prompt Injekce" },
    definition: {
      en: "Security attack where malicious inputs trick AI into ignoring its instructions. Critical vulnerability in AI-powered applications.",
      cs: "Bezpečnostní útok, kde škodlivé vstupy oklamou AI, aby ignorovala své instrukce. Kritická zranitelnost v AI aplikacích.",
    },
    lesson: { courseId: 2, lessonId: 2 },
    hue: 355,
  },
  {
    id: "local-ai",
    term: { en: "Local AI", cs: "Lokální AI" },
    fullName: { en: "Local AI / Ollama", cs: "Lokální AI / Ollama" },
    definition: {
      en: "Running AI models directly on your computer without internet. Tools like Ollama enable private, offline AI with full data control.",
      cs: "Spouštění AI modelů přímo na vašem počítači bez internetu. Nástroje jako Ollama umožňují soukromou, offline AI s plnou kontrolou dat.",
    },
    lesson: { courseId: 2, lessonId: 4 },
    hue: 175,
  },
  {
    id: "claude-code",
    term: { en: "Claude Code", cs: "Claude Code" },
    fullName: { en: "Claude Code CLI", cs: "Claude Code CLI" },
    definition: {
      en: "Anthropic's agentic coding tool. Lives in your terminal, reads/writes files, runs commands, and builds entire features autonomously.",
      cs: "Agentický kódovací nástroj od Anthropic. Žije v terminálu, čte/píše soubory, spouští příkazy a buduje celé funkce autonomně.",
    },
    lesson: { courseId: 2, lessonId: 6 },
    hue: 35,
  },
  {
    id: "cursor",
    term: { en: "Cursor", cs: "Cursor" },
    fullName: { en: "Cursor AI IDE", cs: "Cursor AI IDE" },
    definition: {
      en: "AI-native code editor built on VS Code. Features inline AI suggestions, chat, and automatic code generation with full context awareness.",
      cs: "AI-nativní editor kódu postavený na VS Code. Nabízí inline AI návrhy, chat a automatické generování kódu s plným kontextovým povědomím.",
    },
    lesson: { courseId: 2, lessonId: 5 },
    hue: 270,
  },
  {
    id: "github-copilot",
    term: { en: "GH Copilot", cs: "GH Copilot" },
    fullName: { en: "GitHub Copilot", cs: "GitHub Copilot" },
    definition: {
      en: "AI pair programmer by GitHub/Microsoft. Suggests code completions, explains code, and generates functions based on comments and context.",
      cs: "AI párový programátor od GitHub/Microsoft. Navrhuje doplnění kódu, vysvětluje kód a generuje funkce na základě komentářů a kontextu.",
    },
    lesson: { courseId: 2, lessonId: 5 },
    hue: 250,
  },
  {
    id: "antigravity",
    term: { en: "Antigravity", cs: "Antigravity" },
    fullName: { en: "Antigravity AI Agent", cs: "Antigravity AI Agent" },
    definition: {
      en: "Full-stack AI development agent by Sourcegraph. Autonomous coding with project understanding, multi-file edits, and git integration.",
      cs: "Full-stack AI vývojový agent od Sourcegraph. Autonomní kódování s pochopením projektu, multi-file úpravami a git integrací.",
    },
    lesson: { courseId: 2, lessonId: 7 },
    hue: 310,
  },
  {
    id: "agent",
    term: { en: "AI Agent", cs: "AI Agent" },
    fullName: { en: "Autonomous AI Agent", cs: "Autonomní AI Agent" },
    definition: {
      en: "AI systems that can independently plan, use tools, and take actions to achieve goals. The frontier of AI capability in 2025.",
      cs: "AI systémy, které mohou samostatně plánovat, používat nástroje a provádět akce k dosažení cílů. Hranice AI schopností v roce 2025.",
    },
    lesson: { courseId: 2, lessonId: 5 },
    hue: 190,
  },

  // === Advanced AI Techniques (Course 5) ===
  {
    id: "chain-of-thought",
    term: { en: "Chain of Thought", cs: "Chain of Thought" },
    fullName: { en: "Chain-of-Thought", cs: "Chain-of-Thought" },
    definition: {
      en: "Prompting technique that asks AI to show step-by-step reasoning. Dramatically improves accuracy on complex tasks like math and logic.",
      cs: "Promptovací technika, která žádá AI, aby ukázala krokové uvažování. Dramaticky zlepšuje přesnost u složitých úkolů jako matematika a logika.",
    },
    lesson: { courseId: 5, lessonId: 1 },
    hue: 55,
  },
  {
    id: "few-shot",
    term: { en: "Few-Shot", cs: "Few-Shot" },
    fullName: { en: "Few-Shot Learning", cs: "Few-Shot Learning" },
    definition: {
      en: "Teaching AI by providing a few input-output examples before your actual task. The model learns the pattern and applies it to new inputs.",
      cs: "Učení AI poskytnutím několika příkladů vstup-výstup před vaším skutečným úkolem. Model se naučí vzorec a aplikuje ho na nové vstupy.",
    },
    lesson: { courseId: 5, lessonId: 2 },
    hue: 95,
  },
  {
    id: "reasoning",
    term: { en: "Reasoning Models", cs: "Reasoning Modely" },
    fullName: { en: "Reasoning Models", cs: "Reasoning modely" },
    definition: {
      en: "Advanced AI models with built-in 'thinking time' (o1, o3, Claude 3.5). Solve complex problems through extended internal reasoning.",
      cs: "Pokročilé AI modely s vestavěným 'časem na přemýšlení' (o1, o3, Claude 3.5). Řeší složité problémy rozšířeným interním uvažováním.",
    },
    lesson: { courseId: 5, lessonId: 3 },
    hue: 140,
  },

  // === AI Engineering (Course 1) ===
  {
    id: "rag",
    term: { en: "RAG", cs: "RAG" },
    fullName: { en: "Retrieval-Augmented Generation", cs: "Retrieval-Augmented Generation" },
    definition: {
      en: "Technique that enhances AI responses by retrieving relevant information from external knowledge bases before generating answers.",
      cs: "Technika vylepšující AI odpovědi načítáním relevantních informací z externích znalostních bází před generováním odpovědí.",
    },
    lesson: { courseId: 1, lessonId: 1 },
    hue: 45,
  },
  {
    id: "embedding",
    term: { en: "Embedding", cs: "Embedding" },
    fullName: { en: "Vector Embedding", cs: "Vektorový embedding" },
    definition: {
      en: "Converting text/images into numbers (vectors) that capture meaning. Similar concepts have similar vectors. Foundation of semantic search.",
      cs: "Převod textu/obrázků na čísla (vektory), které zachycují význam. Podobné koncepty mají podobné vektory. Základ sémantického vyhledávání.",
    },
    lesson: { courseId: 1, lessonId: 1 },
    hue: 70,
  },
  {
    id: "finetuning",
    term: { en: "Fine-tune", cs: "Fine-tune" },
    fullName: { en: "Model Fine-tuning", cs: "Doladění modelu" },
    definition: {
      en: "Process of further training a pre-trained AI model on specific data to specialize it for particular tasks or domains.",
      cs: "Proces dalšího trénování předtrénovaného AI modelu na specifických datech pro specializaci na konkrétní úkoly nebo domény.",
    },
    lesson: { courseId: 1, lessonId: 2 },
    hue: 280,
  },
  {
    id: "n8n",
    term: { en: "n8n", cs: "n8n" },
    fullName: { en: "n8n Automation", cs: "n8n Automatizace" },
    definition: {
      en: "Open-source workflow automation platform. Connect AI models with 400+ services using visual node-based programming.",
      cs: "Open-source platforma pro automatizaci workflow. Propojte AI modely s 400+ službami pomocí vizuálního programování.",
    },
    lesson: { courseId: 1, lessonId: 3 },
    hue: 320,
  },
  {
    id: "context",
    term: { en: "Context Window", cs: "Kontextové Okno" },
    fullName: { en: "Context Window", cs: "Kontextové okno" },
    definition: {
      en: "The 'memory' of an AI during conversation. Larger context = AI remembers more. GPT-4: 128K tokens, Claude: 200K tokens.",
      cs: "‚Paměť' AI během konverzace. Větší kontext = AI si pamatuje více. GPT-4: 128K tokenů, Claude: 200K tokenů.",
    },
    lesson: { courseId: 3, lessonId: 4 },
    hue: 300,
  },
  {
    id: "inference",
    term: { en: "Inference", cs: "Inference" },
    fullName: { en: "Model Inference", cs: "Inference modelu" },
    definition: {
      en: "Running a trained AI model to get predictions. The 'thinking' phase when you chat with ChatGPT or generate an image.",
      cs: "Spuštění natrénovaného AI modelu pro získání predikcí. Fáze 'přemýšlení' když chatujete s ChatGPT nebo generujete obrázek.",
    },
    lesson: { courseId: 1, lessonId: 2 },
    hue: 230,
  },

  // === Microsoft Copilot Mastery (Course 4) ===
  {
    id: "workflows-agent",
    term: { en: "MS Workflows Agent", cs: "MS Workflows Agent" },
    fullName: { en: "Microsoft Workflows Agent", cs: "Microsoft Workflows Agent" },
    definition: {
      en: "Conversational AI interface in Microsoft 365 Copilot for building automations using natural language. Creates Power Automate flows from plain text descriptions.",
      cs: "Konverzační AI rozhraní v Microsoft 365 Copilot pro tvorbu automatizací pomocí přirozeného jazyka. Vytváří Power Automate flows z textových popisů.",
    },
    lesson: { courseId: 4, lessonId: 2 },
    hue: 25,
  },
  {
    id: "copilot-studio",
    term: { en: "Copilot Studio", cs: "Copilot Studio" },
    fullName: { en: "Microsoft Copilot Studio", cs: "Microsoft Copilot Studio" },
    definition: {
      en: "Enterprise platform for building custom AI agents. Define Instructions (persona), Knowledge Sources (data), and Actions (capabilities) without code.",
      cs: "Podniková platforma pro tvorbu vlastních AI agentů. Definujte Instructions (personu), Knowledge Sources (data) a Actions (schopnosti) bez kódu.",
    },
    lesson: { courseId: 4, lessonId: 3 },
    hue: 340,
  },
  {
    id: "knowledge-sources",
    term: { en: "Knowledge Sources", cs: "Znalostní Zdroje" },
    fullName: { en: "Knowledge Sources", cs: "Znalostní zdroje" },
    definition: {
      en: "External data that AI agents can read and reference. Includes SharePoint, OneDrive, websites, and APIs. Respects user permissions automatically.",
      cs: "Externí data, která AI agenti mohou číst a odkazovat. Zahrnuje SharePoint, OneDrive, weby a API. Automaticky respektuje uživatelská oprávnění.",
    },
    lesson: { courseId: 4, lessonId: 3 },
    hue: 85,
  },
  {
    id: "power-automate",
    term: { en: "Power Automate", cs: "Power Automate" },
    fullName: { en: "Power Automate", cs: "Power Automate" },
    definition: {
      en: "Microsoft's workflow automation platform. Creates automated flows between apps and services. Backend engine for Workflows Agent and Copilot Studio Actions.",
      cs: "Automatizační platforma Microsoft. Vytváří automatizované toky mezi aplikacemi a službami. Backend engine pro Workflows Agent a Copilot Studio Actions.",
    },
    lesson: { courseId: 4, lessonId: 2 },
    hue: 210,
  },
  {
    id: "copilot-actions",
    term: { en: "Copilot Actions", cs: "Copilot Akce" },
    fullName: { en: "Copilot Actions", cs: "Copilot Akce" },
    definition: {
      en: "What AI agents can DO beyond conversation: call Power Automate flows, connect to APIs (Jira, Salesforce), send Teams messages, update databases.",
      cs: "Co AI agenti mohou DĚLAT kromě konverzace: volat Power Automate flows, připojovat se k API (Jira, Salesforce), posílat Teams zprávy, aktualizovat databáze.",
    },
    lesson: { courseId: 4, lessonId: 3 },
    hue: 145,
  },
  {
    id: "m365-copilot",
    term: { en: "M365 Copilot", cs: "M365 Copilot" },
    fullName: { en: "Microsoft 365 Copilot", cs: "Microsoft 365 Copilot" },
    definition: {
      en: "AI assistant integrated into Word, Excel, Outlook, Teams. Drafts documents, summarizes emails, creates presentations from your enterprise data.",
      cs: "AI asistent integrovaný do Word, Excel, Outlook, Teams. Píše dokumenty, shrnuje e-maily, vytváří prezentace z vašich firemních dat.",
    },
    lesson: { courseId: 4, lessonId: 1 },
    hue: 50,
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
  const t = useTranslations("Glossary");
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

  // Responsive dimensions - scale container 1.5x larger than cube grid for physics movement
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const termCount = GLOSSARY_TERMS.length;

      // Calculate grid dimensions and scale container 1.5x for physics space
      if (width < 480) {
        // Mobile: 3 columns, need more vertical space
        const cols = 3;
        const cubeSize = 85;
        const rows = Math.ceil(termCount / cols);
        const baseHeight = rows * (cubeSize + 15) + 40;
        setDimensions({ height: Math.round(baseHeight * 1.5), cubeSize });
      } else if (width < 640) {
        const cols = 4;
        const cubeSize = 95;
        const rows = Math.ceil(termCount / cols);
        const baseHeight = rows * (cubeSize + 15) + 40;
        setDimensions({ height: Math.round(baseHeight * 1.5), cubeSize });
      } else if (width < 768) {
        const cols = 5;
        const cubeSize = 105;
        const rows = Math.ceil(termCount / cols);
        const baseHeight = rows * (cubeSize + 15) + 40;
        setDimensions({ height: Math.round(baseHeight * 1.5), cubeSize });
      } else {
        // Desktop: 6 columns
        const cols = 6;
        const cubeSize = 120;
        const rows = Math.ceil(termCount / cols);
        const baseHeight = rows * (cubeSize + 15) + 40;
        setDimensions({ height: Math.round(baseHeight * 1.5), cubeSize });
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

  // Restart physics loop (called when cubes wake up)
  const restartPhysicsLoop = useCallback(() => {
    if (animationRef.current === null && physicsEnabled && !prefersReducedMotion) {
      lastTimeRef.current = 0;
      accumulatorRef.current = 0;
      // The useEffect will handle starting the loop
      // We trigger a re-render by setting allSleepingRef
    }
  }, [physicsEnabled, prefersReducedMotion]);

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

    const wasSleeping = allSleepingRef.current;
    allSleepingRef.current = false;

    // Restart animation loop if it was stopped (P2 optimization)
    if (wasSleeping && animationRef.current === null && physicsEnabled && !prefersReducedMotion) {
      const { height: containerHeight, cubeSize } = dimensions;
      const groundY = containerHeight - cubeSize - 10;
      const ceilingY = 5;

      const simulate = (now: number) => {
        if (lastTimeRef.current === 0) lastTimeRef.current = now;
        const deltaTime = Math.min(now - lastTimeRef.current, 100);
        lastTimeRef.current = now;
        accumulatorRef.current += deltaTime;

        if (allSleepingRef.current) {
          animationRef.current = null;
          return;
        }

        const containerWidth = containerRef.current?.offsetWidth || 800;
        const minX = 10;
        const maxX = containerWidth - cubeSize - 10;

        while (accumulatorRef.current >= FIXED_TIMESTEP) {
          accumulatorRef.current -= FIXED_TIMESTEP;
          let allSleeping = true;

          for (let i = 0; i < bodies.length; i++) {
            const body = bodies[i];
            if (body.sleeping) continue;
            allSleeping = false;

            body.vy += GRAVITY;
            body.x += body.vx;
            body.y += body.vy;
            body.vx *= FRICTION;
            body.rotation += body.vx * 1.2;
            body.rotation *= ROTATION_DAMPING;

            if (body.y > groundY) { body.y = groundY; body.vy = -body.vy * BOUNCE; body.vx *= 0.85; }
            if (body.y < ceilingY) { body.y = ceilingY; body.vy = Math.abs(body.vy) * BOUNCE; }
            if (body.x < minX) { body.x = minX; body.vx = -body.vx * BOUNCE; }
            if (body.x > maxX) { body.x = maxX; body.vx = -body.vx * BOUNCE; }

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
                const separation = overlap * 0.5;
                body.x += nx * separation; body.y += ny * separation;
                other.x -= nx * separation; other.y -= ny * separation;
                const relVx = body.vx - other.vx;
                const relVy = body.vy - other.vy;
                const impulse = (relVx * nx + relVy * ny) * 0.5;
                body.vx -= impulse * nx; body.vy -= impulse * ny;
                other.vx += impulse * nx; other.vy += impulse * ny;
              }
            }

            const speed = Math.sqrt(body.vx * body.vx + body.vy * body.vy);
            if (speed < SLEEP_THRESHOLD && body.y >= groundY - 1) {
              body.sleepCounter++;
              if (body.sleepCounter > SLEEP_FRAMES) {
                body.sleeping = true; body.vx = 0; body.vy = 0;
              }
            } else {
              body.sleepCounter = 0;
            }
          }
          allSleepingRef.current = allSleeping;
        }

        for (let i = 0; i < bodies.length; i++) {
          const el = cubeRefs.current[i];
          if (el) {
            const body = bodies[i];
            el.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) rotate(${body.rotation}deg)`;
          }
        }

        animationRef.current = requestAnimationFrame(simulate);
      };

      lastTimeRef.current = 0;
      accumulatorRef.current = 0;
      animationRef.current = requestAnimationFrame(simulate);
    }
  }, [dimensions, physicsEnabled, prefersReducedMotion]);

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

      // Stop animation loop when all cubes are sleeping (P2 optimization)
      if (allSleepingRef.current) {
        // Don't request new frame - loop will restart when cubes wake up
        animationRef.current = null;
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
            <span>{t("interactiveGlossary")}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {t("title")}
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-4">
            {t("subtitle")}
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
                  {t("physicsOn")}
                </>
              ) : (
                <>
                  <ZapOff className="w-4 h-4" />
                  {t("physicsOff")}
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
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <span
                    className="text-white font-bold drop-shadow-lg text-center leading-tight break-words hyphens-auto"
                    style={{
                      fontSize: cubeSize < 100 ? '0.65rem' : cubeSize < 110 ? '0.75rem' : '0.85rem',
                      textShadow: `0 0 10px hsla(${term.hue}, 70%, 60%, 0.5)`,
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      maxWidth: '100%',
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
                  {t("learnMore")}
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
