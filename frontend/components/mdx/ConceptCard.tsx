"use client";

import React, { useState, useRef } from 'react';
import { Lightbulb, Brain, Cpu, Zap, Database, Search, Bot, Layers, Code, Terminal, Sparkles, Shield, Gem, Briefcase } from 'lucide-react';

interface ConceptCardProps {
  title: string;
  icon: string;
  jediQuote?: string;
  sithQuote?: string;
  children: React.ReactNode;
  className?: string;
  difficulty?: string;
}

const JEDI_QUOTES = [
  "Knowledge is power.",
  "Patience you must have.",
  "Do or do not, there is no try.",
  "Your focus determines your reality.",
  "In my experience, there is no such thing as luck.",
  "The Force will be with you. Always.",
  "Luminous beings are we, not this crude matter.",
  "Train yourself to let go of everything you fear to lose."
];

const SITH_QUOTES = [
  "Power is everything.",
  "Peace is a lie, there is only passion.",
  "Through victory, my chains are broken.",
  "The Force shall free me.",
  "Power! Unlimited power!",
  "I find your lack of faith disturbing.",
  "The dark side is a pathway to many abilities.",
  "Destiny is not a matter of chance; it is a matter of choice."
];

// Map common emojis or keywords to Lucide icons
const getIcon = (iconStr: string) => {
  const lower = iconStr.toLowerCase();
  if (lower.includes('brain') || iconStr === '🧠') return <Brain className="w-10 h-10" />;
  if (lower.includes('cpu') || lower.includes('chip') || iconStr === '💾') return <Cpu className="w-10 h-10" />;
  if (lower.includes('zap') || lower.includes('flash') || iconStr === '⚡') return <Zap className="w-10 h-10" />;
  if (lower.includes('data') || iconStr === '🗄️') return <Database className="w-10 h-10" />;
  if (lower.includes('search') || iconStr === '🔍' || iconStr === '🕵️') return <Search className="w-10 h-10" />;
  if (lower.includes('bot') || lower.includes('robot') || iconStr === '🤖') return <Bot className="w-10 h-10" />;
  if (lower.includes('layer') || iconStr === '📚') return <Layers className="w-10 h-10" />;
  if (lower.includes('code') || iconStr === '💻') return <Code className="w-10 h-10" />;
  if (lower.includes('term') || iconStr === '🖥️') return <Terminal className="w-10 h-10" />;
  if (lower.includes('game') || iconStr === '🎮') return <Sparkles className="w-10 h-10" />;
  if (iconStr === '🛡️') return <Shield className="w-10 h-10" />;
  if (iconStr === '💎') return <Gem className="w-10 h-10" />;
  if (iconStr === '🏢') return <Briefcase className="w-10 h-10" />;
  if (iconStr === '🏗️') return <Layers className="w-10 h-10" />;
  
  // Default fallback if it's just a string/emoji we don't recognize specifically
  // If it's a single emoji, we might just render it, but let's try to use a generic icon for "Method X" titles
  if (iconStr.includes('Method')) return <Lightbulb className="w-10 h-10" />;
  
  // If it looks like an emoji (short string), render it as text, otherwise Lightbulb
  if (iconStr.length <= 4) return <span className="text-4xl">{iconStr}</span>;
  
  return <Lightbulb className="w-10 h-10" />;
};

export default function ConceptCard({ 
  title, 
  icon, 
  jediQuote, 
  sithQuote, 
  children, 
  className = "",
  difficulty
}: ConceptCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Use refs for random indices to avoid impure function calls during render
  const jediIndexRef = useRef(Math.floor(Math.random() * JEDI_QUOTES.length));
  const sithIndexRef = useRef(Math.floor(Math.random() * SITH_QUOTES.length));

  // Get stable quotes - use provided or random
  const randomJediQuote = jediQuote || JEDI_QUOTES[jediIndexRef.current];
  const randomSithQuote = sithQuote || SITH_QUOTES[sithIndexRef.current];

  const IconComponent = getIcon(icon);

  return (
    <div 
      className={`
        group relative p-8 rounded-3xl
        glass-panel
        shadow-xl hover:shadow-2xl hover:scale-[1.01]
        transition-all duration-500 ease-out
        flex flex-col overflow-hidden
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative Gradient Blob */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150" />

      {/* Header */}
      <div className="relative z-10 flex items-start gap-5 mb-6">
        <div className={`
          p-3 rounded-2xl 
          bg-primary/10
          text-primary
          border border-primary/20
          transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110
        `}>
          {IconComponent}
        </div>
        <div>
          {difficulty && (
            <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-bold uppercase tracking-wider rounded-full bg-muted text-muted-foreground">
              {difficulty}
            </span>
          )}
          <h3 className="text-2xl font-bold text-foreground leading-tight">
            {title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:text-foreground prose-p:text-muted-foreground">
        {children}
      </div>

      {/* Footer / Quote */}
      <div className={`
        relative z-10 mt-8 pt-6 
        border-t border-border
        text-sm font-medium italic text-center
        transition-all duration-700 transform
        ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-1'}
      `}>
        {/* Jedi Quote (Light Mode) - Green */}
        <span className="block dark:hidden text-emerald-600 drop-shadow-sm">
          "{randomJediQuote}"
        </span>
        
        {/* Sith Quote (Dark Mode) - Red/Primary */}
        <span className="hidden dark:block text-primary drop-shadow-sm">
          "{randomSithQuote}"
        </span>
      </div>
    </div>
  );
}
