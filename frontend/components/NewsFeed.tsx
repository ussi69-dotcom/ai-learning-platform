"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { RefreshCw, Newspaper, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
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
  cs_total?: number;
  en_total?: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function NewsFeed({ locale }: NewsFeedProps) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [filter, setFilter] = useState<string>("hot");  // Default to hot news
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<NewsStats | null>(null);
  const [expanded, setExpanded] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const fetchNews = useCallback(async (source: string, fetchAll: boolean = false) => {
    setLoading(true);
    setError(null);

    // Determine language filter based on locale
    // EN locale: show only EN content, CZ locale: show all (or CZ-only when filter active)
    const langFilter = locale === "en" ? "en" : undefined;
    const limit = fetchAll ? 50 : 20;  // Show more items, especially when expanded

    try {
      let url: string;

      if (source === "hot") {
        // Hot endpoint with language filter for EN locale
        const params = new URLSearchParams({ limit: String(limit) });
        if (langFilter) params.set("lang", langFilter);
        url = `${API_URL}/news/hot/?${params.toString()}`;
      } else if (source === "cz") {
        // Czech language filter - show only Czech content
        url = `${API_URL}/news/?limit=${limit}&lang=cs`;
      } else {
        const params = new URLSearchParams({ limit: String(limit) });
        if (source !== "all") {
          params.set("source", source);
        }
        // Apply language filter for EN locale
        if (langFilter) {
          params.set("lang", langFilter);
        }
        url = `${API_URL}/news/?${params.toString()}`;
      }

      const response = await fetch(url);
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
    fetchNews(filter, expanded);
    fetchStats();
  }, [filter, expanded, fetchNews, fetchStats]);

  // Check scroll buttons visibility
  const checkScrollButtons = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    checkScrollButtons();
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        scrollEl.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, [checkScrollButtons, items, expanded]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setExpanded(false);  // Reset to carousel when changing filter
  };

  const handleRefresh = () => {
    fetchNews(filter, expanded);
    fetchStats();
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 320; // Approximate card width with gap
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const title = locale === "cs" ? "🔥 Nejnovější AI novinky" : "🔥 Latest AI News";
  const subtitle = locale === "cs"
    ? "Aktualizováno každých 30 minut z YouTube, blogů, Hacker News a arXiv"
    : "Updated every 30 minutes from YouTube, blogs, Hacker News, and arXiv";

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-600 dark:from-red-500 dark:via-orange-500 dark:to-red-500 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <NewsFilter
            value={filter}
            onChange={handleFilterChange}
            counts={stats ? { total: stats.total, youtube: stats.youtube, rss: stats.rss, hackernews: stats.hackernews, papers: stats.papers, cz: stats.cs_total || 0 } : undefined}
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
        <div className="flex gap-4 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-[280px] md:w-[300px] h-72 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse flex-shrink-0"
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
      ) : expanded ? (
        // Expanded Grid View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} locale={locale} />
          ))}
        </div>
      ) : (
        // Netflix-style Carousel
        <div className="relative group/carousel">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center shadow-lg transition-all ${
              canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="w-[280px] md:w-[300px] flex-shrink-0"
              >
                <NewsCard item={item} locale={locale} />
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center shadow-lg transition-all ${
              canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Fade edges */}
          <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-slate-50/80 dark:from-slate-900/80 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-slate-50/80 dark:from-slate-900/80 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Show All / Collapse Button */}
      {items.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setExpanded(!expanded)}
            className="gap-2 border-violet-500/30 hover:border-violet-500/50 hover:bg-violet-500/5 dark:border-red-500/30 dark:hover:border-red-500/50 dark:hover:bg-red-500/5"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                {locale === "cs" ? "Sbalit" : "Collapse"}
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                {locale === "cs" ? "Zobrazit vše" : "Show All"}
                <span className="text-xs opacity-70">({items.length})</span>
              </>
            )}
          </Button>
        </div>
      )}
    </section>
  );
}
