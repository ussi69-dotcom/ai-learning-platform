"use client";

import { useState, useMemo } from "react";
import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  Zap,
  ChevronDown,
  ChevronUp,
  Terminal,
  User,
  Bot,
  AlertTriangle,
  Clock,
  ShieldAlert,
  GitMerge,
  FileCheck,
  Shield,
  Sparkles,
  ChevronRight,
  Check,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getABTestPhases, ABTestPhase, ABTestMessage } from "./abTestPhases";
import { useABTestAnimation } from "./useABTestAnimation";

interface ABTestShowcaseProps {
  locale: string;
}

// Avatar mapping for messages
function getAvatar(role: string, name: string) {
  if (role === "user") return <User className="w-4 h-4" />;
  if (role === "system") return <GitMerge className="w-4 h-4" />;
  if (name.includes("Security")) return <Shield className="w-4 h-4" />;
  if (name.includes("Final Report")) return <Sparkles className="w-4 h-4" />;
  if (name.includes("Improved Test"))
    return <CheckCircle2 className="w-4 h-4" />;
  if (name.includes("Baseline")) return <XCircle className="w-4 h-4" />;
  if (name.includes("Applying")) return <Terminal className="w-4 h-4" />;
  if (role === "blue") return <Bot className="w-4 h-4" />;
  if (role === "red") return <ShieldAlert className="w-4 h-4" />;
  return <Bot className="w-4 h-4" />;
}

export default function ABTestShowcase({ locale }: ABTestShowcaseProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get phases with locale
  const phases = useMemo(() => getABTestPhases(locale), [locale]);

  // Use animation hook
  const {
    currentPhase,
    visibleMessagesInPhase,
    isAutoPlaying,
    isUserPaused,
    isResuming,
    scrollRef,
    handleScroll,
    handleResume,
    handleManualChange,
    handleManualNext,
    handleManualPrev,
    resetAnimation,
  } = useABTestAnimation({ phases, isExpanded });

  const handleToggle = () => {
    if (isExpanded) {
      setIsExpanded(false);
      setTimeout(resetAnimation, 300);
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div
        className={`relative overflow-hidden rounded-2xl border transition-all duration-700 ease-in-out ${
          isExpanded
            ? "border-primary/30 bg-card shadow-2xl shadow-primary/20"
            : "border-border bg-card/80 hover:border-primary/30"
        } backdrop-blur-xl`}
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

        {/* Header */}
        <div
          className="p-6 cursor-pointer group relative z-10"
          onClick={handleToggle}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute inset-0 bg-primary blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative p-3 rounded-xl bg-card border border-border shadow-lg group-hover:border-primary/50 transition-colors">
                  <GitMerge className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 text-[10px] font-mono text-primary mb-1 tracking-widest uppercase">
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    Cycle #35
                  </span>
                  <span className="text-muted-foreground/50">|</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" /> Dec 2, 2025
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                  {locale === "cs"
                    ? "AI × Human: Protocol Audit"
                    : "AI × Human: Protocol Audit"}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 font-medium">
                  {locale === "cs"
                    ? "Red & Blue AI teams + člověk, jeden cyklus, hotovo."
                    : "Red & Blue AI teams + Human, 1 Cycle, Done."}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-10 md:border-l md:border-r border-border md:px-10">
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                  Deploy Time
                </div>
                <div className="flex items-center gap-1 font-mono text-xl font-bold text-emerald-600 dark:text-emerald-400 dark:shadow-emerald-500/20 drop-shadow-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>-92%</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                  Blockers
                </div>
                <div className="flex items-center gap-3 font-mono text-xl font-bold text-foreground">
                  <span className="text-red-500 drop-shadow-sm">
                    3
                  </span>
                  <span className="text-muted-foreground/50 text-sm">
                    →
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 drop-shadow-sm">
                    0
                  </span>
                </div>
              </div>
            </div>

            {/* Toggle Button */}
            <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors relative">
              {!isExpanded && (
                <div className="hidden md:block absolute -left-12 top-1/2 -translate-y-1/2">
                  <ChevronRight className="w-5 h-5 text-primary animate-[slide-right_2s_ease-in-out_infinite]" />
                </div>
              )}
              <span
                className={`hidden md:inline tracking-wide text-xs uppercase ${
                  !isExpanded
                    ? "text-primary font-bold"
                    : ""
                }`}
              >
                {isExpanded
                  ? locale === "cs"
                    ? "Přehrávání mise"
                    : "Mission Playback"
                  : locale === "cs"
                  ? "Spustit misi"
                  : "Start Mission"}
              </span>
              <div
                className={`p-2 rounded-full bg-muted border border-border group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300 ${
                  !isExpanded &&
                  "animate-pulse ring-2 ring-primary/20"
                }`}
              >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 fill-current text-primary" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        <div
          className={`overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isExpanded ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-border bg-card/50 relative">
            {/* Phase Stepper */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-30 overflow-x-auto">
              {phases.map((phase, index) => (
                <div
                  key={phase.id}
                  onClick={() => handleManualChange(index)}
                  className={`flex items-center gap-2 cursor-pointer transition-all duration-300 whitespace-nowrap px-3 py-1.5 rounded-full ${
                    currentPhase === index
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : currentPhase > index
                      ? "text-emerald-500 opacity-80"
                      : "text-muted-foreground opacity-60 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      currentPhase === index
                        ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                        : currentPhase > index
                        ? "bg-emerald-500/20 text-emerald-500"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentPhase > index ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="text-xs font-medium hidden md:inline">
                    {phase.title.split(":")[1]}
                  </span>
                </div>
              ))}

              {/* Auto-Play Indicator */}
              {isAutoPlaying && !isUserPaused && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono animate-pulse">
                  <Play className="w-3 h-3" />
                  AUTO-PLAY
                </div>
              )}
              {isUserPaused && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-mono animate-pulse">
                  <Pause className="w-3 h-3" />
                  PAUSED
                </div>
              )}
            </div>

            {/* Content Area */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="min-h-[400px] max-h-[600px] overflow-y-auto p-6 md:p-8 space-y-8 scroll-smooth scrollbar-themed"
            >
              {/* Phase Header */}
              <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs font-mono text-muted-foreground mb-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {phases[currentPhase].title}
                </div>
                <h4 className="text-2xl font-bold text-foreground">
                  {phases[currentPhase].desc}
                </h4>
              </div>

              {/* Messages */}
              {phases[currentPhase].messages
                .slice(
                  0,
                  isAutoPlaying
                    ? visibleMessagesInPhase
                    : phases[currentPhase].messages.length
                )
                .map((msg, i) => (
                  <div
                    key={`${currentPhase}-${i}`}
                    className={`flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both ${
                      msg.role === "user" ? "flex-row-reverse" : ""
                    }`}
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    {/* Avatar Column */}
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 ${
                          msg.role === "blue"
                            ? "bg-blue-500/20 text-blue-400 border-blue-400/30"
                            : msg.role === "red"
                            ? "bg-red-500/20 text-red-400 border-red-500/30 shadow-red-500/10"
                            : msg.role === "system"
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-emerald-500/10"
                            : "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        {getAvatar(msg.role, msg.name)}
                      </div>
                    </div>

                    {/* Message Content */}
                    <div
                      className={`flex-1 max-w-4xl pt-1 ${
                        msg.role === "user" ? "text-right" : ""
                      }`}
                    >
                      <div
                        className={`flex items-center gap-3 mb-2 ${
                          msg.role === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <span
                          className={`text-xs font-bold tracking-wider uppercase ${
                            msg.role === "blue"
                              ? "text-blue-400"
                              : msg.role === "red"
                              ? "text-red-400"
                              : msg.role === "system"
                              ? "text-emerald-400"
                              : "text-muted-foreground"
                          }`}
                        >
                          {msg.name}
                        </span>
                      </div>

                      <div
                        className={`group relative p-5 rounded-2xl text-sm leading-relaxed border backdrop-blur-sm transition-all duration-300 hover:shadow-lg inline-block text-left ${
                          msg.role === "blue"
                            ? "bg-blue-500/10 border-blue-400/30 hover:border-blue-400/50 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                            : msg.role === "red"
                            ? "bg-red-500/10 border-red-500/20 hover:border-red-500/30 text-red-100"
                            : msg.role === "system"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-100"
                            : "bg-card border-border hover:border-primary/20 text-foreground"
                        }`}
                      >
                        <div className="relative whitespace-pre-wrap font-sans">
                          {msg.message}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              <div className="h-24" />
            </div>

            {/* Footer Navigation */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-card/90 border-t border-border backdrop-blur-xl flex items-center justify-between z-20">
              <Button
                variant="ghost"
                disabled={currentPhase === 0}
                onClick={handleManualPrev}
                className="text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                Previous Phase
              </Button>

              {currentPhase < phases.length - 1 ? (
                <Button
                  onClick={handleResume}
                  disabled={isResuming}
                  className={`btn-glow gap-2 px-4 transition-all duration-300 ${
                    isResuming ? "opacity-50 cursor-wait" : ""
                  }`}
                  size="sm"
                >
                  {isResuming ? (
                    <Clock className="w-3 h-3 animate-spin" />
                  ) : (
                    <Play className="w-3 h-3 fill-current" />
                  )}
                </Button>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  MISSION COMPLETE
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
