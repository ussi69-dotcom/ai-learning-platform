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
            ? "border-fuchsia-500/30 dark:border-red-600/50 bg-slate-50 dark:bg-slate-950/80 shadow-2xl shadow-fuchsia-900/20 dark:shadow-red-900/40"
            : "border-slate-200 dark:border-red-900/20 bg-white dark:bg-slate-900/40 hover:border-fuchsia-500/20 dark:hover:border-red-600/40"
        } backdrop-blur-xl`}
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 dark:from-red-600/5 via-transparent to-purple-600/5 dark:to-red-600/5 pointer-events-none" />

        {/* Header */}
        <div
          className="p-6 cursor-pointer group relative z-10"
          onClick={handleToggle}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 dark:bg-red-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative p-3 rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-red-900/30 shadow-lg group-hover:border-fuchsia-500/30 dark:group-hover:border-red-500/50 transition-colors">
                  <GitMerge className="w-6 h-6 text-fuchsia-600 dark:text-red-500" />
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 text-[10px] font-mono text-fuchsia-600 dark:text-red-500 mb-1 tracking-widest uppercase">
                  <span className="px-2 py-0.5 rounded-full bg-fuchsia-500/10 dark:bg-red-500/10 border border-fuchsia-500/20 dark:border-red-500/30">
                    Cycle #35
                  </span>
                  <span className="text-slate-400 dark:text-slate-700">|</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3 h-3" /> Dec 2, 2025
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-fuchsia-700 dark:group-hover:text-red-400 transition-colors tracking-tight">
                  {locale === "cs"
                    ? "AI × Human: Protocol Audit"
                    : "AI × Human: Protocol Audit"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  {locale === "cs"
                    ? "Red & Blue AI teams + člověk, jeden cyklus, hotovo."
                    : "Red & Blue AI teams + Human, 1 Cycle, Done."}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-10 md:border-l md:border-r border-slate-200 dark:border-white/5 md:px-10">
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">
                  Deploy Time
                </div>
                <div className="flex items-center gap-1 font-mono text-xl font-bold text-emerald-600 dark:text-emerald-400 dark:shadow-emerald-500/20 drop-shadow-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>-92%</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">
                  Blockers
                </div>
                <div className="flex items-center gap-3 font-mono text-xl font-bold text-slate-700 dark:text-slate-200">
                  <span className="text-red-600 dark:text-red-500 drop-shadow-sm">
                    3
                  </span>
                  <span className="text-slate-400 dark:text-slate-700 text-sm">
                    →
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 drop-shadow-sm">
                    0
                  </span>
                </div>
              </div>
            </div>

            {/* Toggle Button */}
            <div className="flex items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors relative">
              {!isExpanded && (
                <div className="hidden md:block absolute -left-12 top-1/2 -translate-y-1/2">
                  <ChevronRight className="w-5 h-5 text-fuchsia-600 dark:text-red-500 animate-[slide-right_2s_ease-in-out_infinite]" />
                </div>
              )}
              <span
                className={`hidden md:inline tracking-wide text-xs uppercase ${
                  !isExpanded
                    ? "text-fuchsia-600 dark:text-red-400 font-bold"
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
                className={`p-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 group-hover:bg-purple-500/10 dark:group-hover:bg-red-500/10 group-hover:border-purple-500/30 dark:group-hover:border-red-500/30 transition-all duration-300 ${
                  !isExpanded &&
                  "animate-pulse ring-2 ring-purple-500/20 dark:ring-red-500/20"
                }`}
              >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 fill-current text-fuchsia-600 dark:text-red-500" />
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
          <div className="border-t border-slate-200 dark:border-white/5 bg-white/50 dark:bg-slate-950/30 relative">
            {/* Phase Stepper */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-30 overflow-x-auto">
              {phases.map((phase, index) => (
                <div
                  key={phase.id}
                  onClick={() => handleManualChange(index)}
                  className={`flex items-center gap-2 cursor-pointer transition-all duration-300 whitespace-nowrap px-3 py-1.5 rounded-full ${
                    currentPhase === index
                      ? "bg-fuchsia-100 dark:bg-red-500/20 text-fuchsia-700 dark:text-red-300 border border-fuchsia-200 dark:border-red-500/30"
                      : currentPhase > index
                      ? "text-emerald-600 dark:text-emerald-400 opacity-80"
                      : "text-slate-500 dark:text-slate-600 opacity-60 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      currentPhase === index
                        ? "bg-fuchsia-600 dark:bg-red-600 text-white dark:shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                        : currentPhase > index
                        ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-500"
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
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-red-500/10 border border-purple-200 dark:border-red-500/20 text-purple-600 dark:text-red-400 text-[10px] font-mono animate-pulse">
                  <Play className="w-3 h-3" />
                  AUTO-PLAY
                </div>
              )}
              {isUserPaused && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-mono animate-pulse">
                  <Pause className="w-3 h-3" />
                  PAUSED
                </div>
              )}
            </div>

            {/* Content Area */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="min-h-[400px] max-h-[600px] overflow-y-auto p-6 md:p-8 space-y-8 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-slate-100 dark:[&::-webkit-scrollbar-track]:bg-slate-900/50 [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 dark:hover:[&::-webkit-scrollbar-thumb]:bg-slate-600"
            >
              {/* Phase Header */}
              <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500 dark:bg-red-500 animate-pulse" />
                  {phases[currentPhase].title}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
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
                            ? "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-400/30"
                            : msg.role === "red"
                            ? "bg-red-100 dark:bg-red-600/10 border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 shadow-red-500/10"
                            : msg.role === "system"
                            ? "bg-emerald-100 dark:bg-emerald-600/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-emerald-500/10"
                            : "bg-slate-100 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600/50 text-slate-600 dark:text-slate-300"
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
                              ? "text-blue-600 dark:text-blue-300"
                              : msg.role === "red"
                              ? "text-red-600 dark:text-red-400"
                              : msg.role === "system"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {msg.name}
                        </span>
                      </div>

                      <div
                        className={`group relative p-5 rounded-2xl text-sm leading-relaxed border backdrop-blur-sm transition-all duration-300 hover:shadow-lg inline-block text-left ${
                          msg.role === "blue"
                            ? "bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-400/30 hover:border-blue-300 dark:hover:border-blue-400/50 text-blue-900 dark:text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                            : msg.role === "red"
                            ? "bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-500/10 hover:border-red-200 dark:hover:border-red-500/20 text-red-900 dark:text-red-100"
                            : msg.role === "system"
                            ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-500/10 text-emerald-900 dark:text-emerald-100"
                            : "bg-white dark:bg-slate-800/40 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 text-slate-700 dark:text-slate-300"
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
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-950/90 border-t border-slate-200 dark:border-white/5 backdrop-blur-xl flex items-center justify-between z-20">
              <Button
                variant="ghost"
                disabled={currentPhase === 0}
                onClick={handleManualPrev}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
              >
                Previous Phase
              </Button>

              {currentPhase < phases.length - 1 ? (
                <Button
                  onClick={handleResume}
                  disabled={isResuming}
                  className={`bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-700 dark:from-red-700 dark:via-red-600 dark:to-red-800 hover:opacity-90 dark:shadow-[0_0_15px_rgba(220,38,38,0.4)] text-white gap-2 px-4 transition-all duration-300 ${
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
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
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
