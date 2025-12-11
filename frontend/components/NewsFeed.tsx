"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsCard, { NewsItem } from "./NewsCard";
import NewsFilter from "./NewsFilter";

interface NewsFeedProps {
  locale: string;
}

interface NewsStats {
  total: number;
  youtube: number;
  rss: number;
  hackernews: number;
  papers: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function NewsFeed({ locale }: NewsFeedProps) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<NewsStats | null>(null);

  const fetchNews = useCallback(async (source: string) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ limit: "12" });
      if (source !== "all") {
        params.set("source", source);
      }

      const response = await fetch(`${API_URL}/news/?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch news:", err);
      setError(locale === "cs" ? "Nepodařilo se načíst novinky" : "Failed to load news");
    } finally {
      setLoading(false);
    }
  }, [locale]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/news/stats/`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  }, []);

  useEffect(() => {
    fetchNews(filter);
    fetchStats();
  }, [filter, fetchNews, fetchStats]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleRefresh = () => {
    fetchNews(filter);
    fetchStats();
  };

  const title = locale === "cs" ? "🔥 Nejnovější AI novinky" : "🔥 Latest AI News";
  const subtitle = locale === "cs"
    ? "Aktualizováno každých 30 minut z YouTube, blogů, Hacker News a arXiv"
    : "Updated every 30 minutes from YouTube, blogs, Hacker News, and arXiv";

  return (
    <section className="py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <NewsFilter
            value={filter}
            onChange={handleFilterChange}
            counts={stats ? { total: stats.total, youtube: stats.youtube, rss: stats.rss, hackernews: stats.hackernews, papers: stats.papers } : undefined}
            locale={locale}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
            className="shrink-0 w-9 h-9 p-0"
            title={locale === "cs" ? "Obnovit" : "Refresh"}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Content */}
      {error ? (
        <div className="text-center py-12">
          <Newspaper className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-destructive">{error}</p>
          <Button variant="outline" onClick={handleRefresh} className="mt-4">
            {locale === "cs" ? "Zkusit znovu" : "Try again"}
          </Button>
        </div>
      ) : loading && items.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-80 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <Newspaper className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            {locale === "cs"
              ? "Zatím žádné novinky. Zkuste to později."
              : "No news yet. Check back later."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} locale={locale} />
          ))}
        </div>
      )}
    </section>
  );
}
