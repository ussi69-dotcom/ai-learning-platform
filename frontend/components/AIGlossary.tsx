"use client";

import { useState } from "react";
import { X, ExternalLink, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

// Glossary data with terms, definitions, and lesson links
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
    color: "from-purple-500 to-indigo-600",
    delay: 0,
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
    color: "from-blue-500 to-cyan-500",
    delay: 0.5,
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
    color: "from-red-500 to-orange-500",
    delay: 1,
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
    color: "from-emerald-500 to-teal-500",
    delay: 1.5,
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
    color: "from-amber-500 to-yellow-500",
    delay: 2,
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
    color: "from-pink-500 to-rose-500",
    delay: 2.5,
  },
  {
    id: "finetuning",
    term: { en: "Fine-tuning", cs: "Fine-tuning" },
    fullName: { en: "Model Fine-tuning", cs: "Doladění modelu" },
    definition: {
      en: "Process of further training a pre-trained AI model on specific data to specialize it for particular tasks or domains.",
      cs: "Proces dalšího trénování předtrénovaného AI modelu na specifických datech pro specializaci na konkrétní úkoly nebo domény.",
    },
    lesson: { courseId: 3, lessonId: 11 },
    color: "from-violet-500 to-purple-600",
    delay: 3,
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
    color: "from-cyan-500 to-blue-600",
    delay: 3.5,
  },
];

interface AIGlossaryProps {
  locale: string;
}

interface GlossaryTerm {
  id: string;
  term: { en: string; cs: string };
  fullName: { en: string; cs: string };
  definition: { en: string; cs: string };
  lesson: { courseId: number; lessonId: number };
  color: string;
  delay: number;
}

export default function AIGlossary({ locale }: AIGlossaryProps) {
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const lang = locale === "cs" ? "cs" : "en";

  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-b from-slate-900/50 to-slate-950/80 border-y border-border/30 overflow-hidden">
      <div className="container px-4 mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-mono text-purple-400 mb-4">
            <Sparkles className="w-4 h-4" />
            <span>{locale === "cs" ? "Interaktivní slovník" : "Interactive Glossary"}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {locale === "cs" ? "AI Pojmy" : "AI Terms"}
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            {locale === "cs"
              ? "Klikni na kostku a zjisti více o klíčových AI konceptech"
              : "Click a cube to learn more about key AI concepts"}
          </p>
        </div>

        {/* Bouncing Cubes Container */}
        <div className="relative h-[280px] md:h-[220px] flex items-center justify-center">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl">
            {GLOSSARY_TERMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedTerm(item)}
                className={`
                  group relative w-20 h-20 md:w-24 md:h-24
                  bg-gradient-to-br ${item.color}
                  rounded-xl shadow-lg shadow-black/30
                  transform transition-all duration-300
                  hover:scale-110 hover:shadow-xl hover:shadow-purple-500/20
                  hover:-translate-y-2
                  cursor-pointer
                  animate-bounce-slow
                `}
                style={{
                  animationDelay: `${item.delay}s`,
                  animationDuration: "3s",
                }}
              >
                {/* Cube face effect */}
                <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Term text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm md:text-base drop-shadow-lg text-center px-1">
                    {item.term[lang]}
                  </span>
                </div>

                {/* Shine effect */}
                <div className="absolute top-1 left-1 right-1 h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-lg" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedTerm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTerm(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className={`
              relative max-w-md w-full
              bg-gradient-to-br from-slate-900 to-slate-950
              rounded-2xl p-6
              border border-slate-700/50
              shadow-2xl shadow-purple-500/10
              transform transition-all
              animate-in fade-in zoom-in-95 duration-200
            `}
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
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${selectedTerm.color} text-white font-bold text-lg mb-4`}
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
                className={`w-full bg-gradient-to-r ${selectedTerm.color} hover:opacity-90 text-white font-medium gap-2`}
              >
                {locale === "cs" ? "Zjistit více v lekci" : "Learn more in lesson"}
                <ExternalLink size={16} />
              </Button>
            </Link>
          </div>
        </div>
      )}

    </section>
  );
}
