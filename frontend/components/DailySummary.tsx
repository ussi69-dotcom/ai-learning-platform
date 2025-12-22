"use client";

import { useState, useEffect } from "react";
import { Sparkles, ExternalLink } from "lucide-react";

interface DigestFeedItem {
  title: string;
  description: string;
  source_url: string;
}

interface DailyDigest {
  id: number;
  digest_date: string;
  summary_en: string[] | null;
  summary_cs: string[] | null;
  feed_en: DigestFeedItem[] | null;
  feed_cs: DigestFeedItem[] | null;
  source: string;
  created_at: string;
}

interface DailySummaryProps {
  locale: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const VISUAL_TEST_DIGEST: DailyDigest = {
  id: 999,
  digest_date: "2025-01-15",
  summary_en: [
    "Ops teams adopt agent checklists for daily tasks.",
    "New guardrails reduce prompt injection risk.",
    "Tooling stacks converge on MCP-style connectors.",
  ],
  summary_cs: [
    "Tymy nasazuji agentni checklisty pro denni ulohy.",
    "Nove guardrails snizuji riziko prompt injection.",
    "Tooling stacky se sbihaji k MCP konektorum.",
  ],
  feed_en: [
    {
      title: "Agent checklists",
      description: "Ops playbook updates",
      source_url: "https://example.com/visual-digest-1",
    },
    {
      title: "Prompt injection guardrails",
      description: "Security notes",
      source_url: "https://example.com/visual-digest-2",
    },
    {
      title: "MCP connectors",
      description: "Tooling round-up",
      source_url: "https://example.com/visual-digest-3",
    },
  ],
  feed_cs: [
    {
      title: "Agentni checklisty",
      description: "Aktualizace playbooku",
      source_url: "https://example.com/visual-digest-1",
    },
    {
      title: "Guardrails proti prompt injection",
      description: "Security notes",
      source_url: "https://example.com/visual-digest-2",
    },
    {
      title: "MCP konektory",
      description: "Tooling round-up",
      source_url: "https://example.com/visual-digest-3",
    },
  ],
  source: "visual",
  created_at: "2025-01-15T00:00:00Z",
};

export default function DailySummary({ locale }: DailySummaryProps) {
  const visualMode =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("visual");
  const [digest, setDigest] = useState<DailyDigest | null>(
    visualMode ? VISUAL_TEST_DIGEST : null
  );
  const [loading, setLoading] = useState(!visualMode);

  useEffect(() => {
    if (visualMode) {
      return;
    }
    const fetchDigest = async () => {
      try {
        const response = await fetch(`${API_URL}/digest`);
        if (response.ok) {
          const data = await response.json();
          setDigest(data);
        }
      } catch (err) {
        console.error("Failed to fetch daily digest:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDigest();
  }, [visualMode]);

  // Don't render if no digest available
  if (loading || !digest) {
    return null;
  }

  const summary = locale === "cs" ? digest.summary_cs : digest.summary_en;
  const feed = locale === "cs" ? digest.feed_cs : digest.feed_en;

  // Don't render if no content for this locale
  if (!summary || summary.length === 0) {
    return null;
  }

  // Format date
  const digestDate = new Date(digest.digest_date);
  const formattedDate = digestDate.toLocaleDateString(
    locale === "cs" ? "cs-CZ" : "en-US",
    { weekday: "long", month: "long", day: "numeric" }
  );

  const title = locale === "cs" ? "📰 Denní AI Přehled" : "📰 Daily AI Digest";
  const subtitle =
    locale === "cs"
      ? `Kuratovaný přehled od Perplexity • ${formattedDate}`
      : `Curated by Perplexity AI • ${formattedDate}`;

  // Match summary bullets with feed items by index (for links)
  // If feed has fewer items than summary, remaining bullets won't have links
  const getLink = (index: number): string | null => {
    if (feed && feed[index]) {
      return feed[index].source_url;
    }
    return null;
  };

  return (
    <section className="py-6 mb-4">
      {/* Compact Card */}
      <div className="relative overflow-hidden rounded-xl border border-violet-500/30 dark:border-red-500/30 bg-gradient-to-br from-violet-50/50 via-indigo-50/30 to-purple-50/50 dark:from-slate-900/80 dark:via-slate-800/60 dark:to-slate-900/80">
        {/* Decorative glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-400/20 dark:bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-400/20 dark:bg-orange-500/10 rounded-full blur-3xl" />

        <div className="relative p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-violet-600 dark:text-red-400" />
                <h2 className="text-xl font-bold text-violet-700 dark:text-red-400">
                  {title}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-violet-100 dark:bg-red-900/30 text-xs font-medium text-violet-700 dark:text-red-300">
              <Sparkles className="w-3 h-3" />
              Perplexity
            </div>
          </div>

          {/* Bullet Points with inline links */}
          <ul className="space-y-2">
            {summary.map((bullet, index) => {
              const link = getLink(index);
              return (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 dark:bg-red-400 flex-shrink-0" />
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-1.5 hover:text-violet-600 dark:hover:text-red-400 transition-colors"
                    >
                      <span>{bullet}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </a>
                  ) : (
                    <span>{bullet}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
