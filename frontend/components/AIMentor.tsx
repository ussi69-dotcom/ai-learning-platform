"use client";

import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import { Sparkles, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

type MentorMode = "fast";
type MentorVibe = "jedi" | "sith";

type MentorSource = {
  section: string;
  snippet: string;
  score: number;
};

type MentorMessage = {
  role: "user" | "assistant";
  content: string;
  sources?: MentorSource[];
};

interface AIMentorProps {
  lessonId: number;
  lessonTitle?: string;
}

export default function AIMentor({ lessonId, lessonTitle }: AIMentorProps) {
  const { token } = useAuth();
  const locale = useLocale();
  const t = useTranslations("Mentor");

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MentorMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const mode: MentorMode = "fast";
  const [vibe, setVibe] = useState<MentorVibe>("jedi");
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const withRetry = async <T,>(action: () => Promise<T>, retries = 1) => {
    try {
      return await action();
    } catch (err) {
      if (retries <= 0) {
        throw err;
      }
      await sleep(350);
      return action();
    }
  };

  const apiBase = useMemo(
    () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    []
  );

  useEffect(() => {
    const updateVibe = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setVibe(isDark ? "sith" : "jedi");
    };
    updateVibe();

    const observer = new MutationObserver(updateVibe);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMessages([]);
    setSuggestions([]);
    setError(null);
    setIsLoading(false);
    setIsOpen(false);
  }, [lessonId]);

  useEffect(() => {
    if (!isOpen || !token || suggestions.length > 0) return;
    const fetchSuggestions = async () => {
      try {
        const res = await withRetry(() =>
          axios.get(`${apiBase}/mentor/lessons/${lessonId}/suggestions`, {
            params: { lang: locale },
            headers: { Authorization: `Bearer ${token}` },
          })
        );
        setSuggestions(res.data.questions || []);
      } catch (err) {
        console.error("Mentor suggestions failed", err);
      }
    };
    fetchSuggestions();
  }, [apiBase, isOpen, lessonId, locale, suggestions.length, token]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading, isOpen]);

  const handleSend = async (messageOverride?: string) => {
    const message = (messageOverride ?? inputValue).trim();
    if (!message || !token) return;

    const nextMessages: MentorMessage[] = [
      ...messages,
      { role: "user", content: message },
    ];
    setMessages(nextMessages);
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      const history = nextMessages
        .slice(0, -1)
        .slice(-6)
        .map((entry) => ({ role: entry.role, content: entry.content }));

      const res = await withRetry(() =>
        axios.post(
          `${apiBase}/mentor/lessons/${lessonId}/chat`,
          {
            message,
            mode,
            vibe,
            history,
          },
          {
            params: { lang: locale },
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      );

      const answer = res.data.answer || t("fallback");
      const sources = res.data.sources || [];
      const suggested = res.data.suggested_questions || [];

      const assistantMessage: MentorMessage = {
        role: "assistant",
        content: answer,
        sources,
      };
      setMessages([...nextMessages, assistantMessage]);
      setSuggestions(suggested);
    } catch (err) {
      console.error("Mentor chat failed", err);
      setError(t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-16 md:bottom-20 right-3 md:right-4 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-[92vw] max-w-[380px] h-[calc(100vh-120px)] md:h-[calc(100vh-140px)] max-h-[calc(100vh-120px)] md:max-h-[calc(100vh-140px)] rounded-3xl border border-border/60 bg-card/70 backdrop-blur-xl shadow-2xl shadow-primary/10 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-gradient-to-r from-primary/10 via-transparent to-primary/5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {t("title")}
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {vibe === "jedi" ? t("vibe_jedi") : t("vibe_sith")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("model_info")}
              </p>
              {lessonTitle && (
                <p className="text-xs text-muted-foreground mt-1">
                  {t("focus")} {lessonTitle}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsOpen(false)}
              aria-label={t("close")}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div
            ref={scrollRef}
            className="px-4 py-4 space-y-4 overflow-y-auto flex-1 min-h-0 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-primary/5 dark:[&::-webkit-scrollbar-track]:bg-primary/10 [&::-webkit-scrollbar-thumb]:bg-primary/30 dark:[&::-webkit-scrollbar-thumb]:bg-primary/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-primary/50 dark:hover:[&::-webkit-scrollbar-thumb]:bg-primary/60"
          >
            {messages.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border/60 bg-background/40 p-4 text-sm text-muted-foreground">
                {t("intro")}
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto max-w-[85%]"
                    : "bg-background/70 text-slate-900 dark:text-slate-100 border border-border/40"
                )}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                    <p className="uppercase tracking-[0.2em]">
                      {t("sources")}
                    </p>
                    {msg.sources.slice(0, 3).map((source, sourceIndex) => (
                      <div
                        key={`${source.section}-${sourceIndex}`}
                        className="rounded-lg border border-border/50 px-2 py-2 bg-card/40"
                      >
                        <p className="font-semibold text-slate-700 dark:text-slate-200">
                          {source.section}
                        </p>
                        <p>{source.snippet}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="rounded-2xl border border-border/50 px-4 py-3 text-sm text-muted-foreground">
                {t("thinking")}
              </div>
            )}
          </div>

          {suggestions.length > 0 && (
            <div className="px-4 pb-2 shrink-0">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                {t("suggested")}
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.slice(0, 4).map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSend(suggestion)}
                    className="text-xs px-3 py-1 rounded-full border border-border/60 text-slate-700 dark:text-slate-200 hover:border-primary/60 hover:text-primary transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="px-4 pb-4 pt-3 border-t border-border/50 shrink-0">
            {error && (
              <p className="text-xs text-red-500 mb-2">{error}</p>
            )}
            <div className="flex items-center gap-2">
              <input
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder={t("placeholder")}
              />
              <Button
                variant="default"
                size="sm"
                className="rounded-full h-10 w-10 p-0"
                onClick={() => handleSend()}
                disabled={isLoading}
                aria-label={t("send")}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-lg border transition",
          "bg-primary text-primary-foreground border-primary/60 hover:shadow-xl hover:shadow-primary/40"
        )}
        aria-label={t("toggle")}
      >
        <Sparkles className="h-4 w-4" />
        {t("title")}
      </button>
    </div>
  );
}
