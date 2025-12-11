"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";

interface Video {
  id: string;
  title: string;
  author?: string;
  description?: string;
  lang?: "en" | "cs";
  isMain?: boolean;
}

interface VideoPlayerProps {
  fallbackUrl?: string;
  fallbackTitle?: string;
  /** Unique lesson identifier to reset video registry on navigation */
  lessonKey?: string;
}

// Global video registry for cross-component communication
declare global {
  interface Window {
    __videoRegistry?: {
      videos: Video[];
      currentLessonKey: string | null;
      listeners: Set<() => void>;
      reset: (lessonKey: string) => void;
      addVideos: (videos: Video[]) => void;
      subscribe: (listener: () => void) => () => void;
    };
  }
}

function getVideoRegistry() {
  if (typeof window === "undefined") return null;

  if (!window.__videoRegistry) {
    window.__videoRegistry = {
      videos: [],
      currentLessonKey: null,
      listeners: new Set(),
      reset: (lessonKey: string) => {
        const registry = window.__videoRegistry!;
        if (registry.currentLessonKey !== lessonKey) {
          // Clear all videos when lesson changes
          registry.videos = [];
          registry.currentLessonKey = lessonKey;
          registry.listeners.forEach((listener) => listener());
        }
      },
      addVideos: (newVideos: Video[]) => {
        const registry = window.__videoRegistry!;
        newVideos.forEach((v) => {
          if (!registry.videos.some((existing) => existing.id === v.id)) {
            registry.videos.push(v);
          }
        });
        registry.listeners.forEach((listener) => listener());
      },
      subscribe: (listener: () => void) => {
        const registry = window.__videoRegistry!;
        registry.listeners.add(listener);
        return () => registry.listeners.delete(listener);
      },
    };
  }
  return window.__videoRegistry;
}

export const VideoPlayer = ({
  fallbackUrl,
  fallbackTitle,
  lessonKey,
}: VideoPlayerProps) => {
  const locale = useLocale();
  const [isPinned, setIsPinned] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [, forceUpdate] = useState({});
  const initializedRef = useRef(false);

  // Reset registry when lesson changes
  useEffect(() => {
    const registry = getVideoRegistry();
    if (registry && lessonKey) {
      registry.reset(lessonKey);
    }
    // Reset local state
    setActiveVideoId(null);
    setVideos([]);
    setIsPinned(false);
    setIsExpanded(false);
    initializedRef.current = false;
  }, [lessonKey]);

  // Initialize with fallback video
  useEffect(() => {
    if (fallbackUrl && !initializedRef.current) {
      const id = extractVideoId(fallbackUrl);
      if (id) {
        const registry = getVideoRegistry();
        if (registry) {
          const mainVideo: Video = {
            id,
            title: fallbackTitle || "Video",
            isMain: true,
          };
          // Add main video only if not already present
          if (!registry.videos.some((v) => v.id === id)) {
            registry.videos.unshift(mainVideo);
            registry.listeners.forEach((listener) => listener());
          }
        }
        setActiveVideoId(id);
        initializedRef.current = true;
      }
    }
  }, [fallbackUrl, fallbackTitle, lessonKey]);

  // Subscribe to video registry changes
  useEffect(() => {
    const registry = getVideoRegistry();
    if (!registry) return;

    const unsubscribe = registry.subscribe(() => {
      setVideos([...registry.videos]);
      forceUpdate({});
    });

    setVideos([...registry.videos]);
    return unsubscribe;
  }, [lessonKey]);

  const activeVideo = videos.find((v) => v.id === activeVideoId) || videos[0];
  const alternativeVideos = videos.filter((v) => v.id !== activeVideo?.id);

  if (!activeVideo) {
    return null;
  }

  const embedUrl = `https://www.youtube.com/embed/${activeVideo.id}?cc_load_policy=1&cc_lang_pref=${locale}&hl=${locale}`;

  return (
    <div
      className={`mb-10 transition-all duration-300 ${
        isPinned
          ? "sticky top-0 z-50 bg-background/98 backdrop-blur-xl py-4 -mx-4 px-4 shadow-2xl shadow-black/20 border-b border-border/50"
          : ""
      }`}
      style={isPinned ? { marginTop: "-1rem" } : {}}
    >
      {/* Video Player */}
      <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-black/5">
        <iframe
          key={activeVideo.id}
          className="w-full h-full"
          src={embedUrl}
          title={activeVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Current Video Info + Controls */}
      <div className="flex items-center justify-between mt-3 gap-4 px-1">
        <div className="flex-1 min-w-0 flex items-center gap-3">
          {/* Language Badge */}
          {activeVideo.lang && (
            <span
              className={`shrink-0 px-2 py-0.5 rounded text-xs font-bold ${
                activeVideo.lang === "cs"
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`}
            >
              {activeVideo.lang === "cs" ? "🇨🇿 CZ" : "🇬🇧 EN"}
            </span>
          )}

          {/* Main Badge */}
          {activeVideo.isMain && (
            <span className="shrink-0 px-2 py-0.5 rounded text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
              ⭐ MAIN
            </span>
          )}

          <div className="min-w-0">
            <div className="text-sm font-medium text-foreground truncate">
              {activeVideo.title}
            </div>
            {activeVideo.author && (
              <div className="text-xs text-muted-foreground">
                👤 {activeVideo.author}
              </div>
            )}
          </div>
        </div>

        {/* Pin Button */}
        <button
          onClick={() => setIsPinned(!isPinned)}
          className={`
            px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
            flex items-center gap-1.5 shrink-0
            ${
              isPinned
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground border border-white/10"
            }
          `}
        >
          <span>{isPinned ? "📌" : "📍"}</span>
          <span className="hidden sm:inline">
            {isPinned ? "Odepnout" : "Připnout"}
          </span>
        </button>
      </div>

      {/* Alternative Videos Dropdown */}
      {alternativeVideos.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-200"
          >
            <div className="flex items-center gap-2">
              <span>🎬</span>
              <span className="text-sm font-medium">
                {locale === "cs"
                  ? "Další doporučená videa"
                  : "More recommended videos"}
              </span>
              <span className="text-xs text-muted-foreground bg-white/10 px-2 py-0.5 rounded-full">
                {alternativeVideos.length}
              </span>
            </div>
            <span
              className={`transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {isExpanded && (
            <div className="mt-3 space-y-3 animate-in slide-in-from-top-2 duration-200">
              {alternativeVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onSelect={() => {
                    setActiveVideoId(video.id);
                    setIsExpanded(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Video Card Component with YouTube Thumbnail
function VideoCard({
  video,
  onSelect,
}: {
  video: Video;
  onSelect: () => void;
}) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;

  return (
    <button
      onClick={onSelect}
      className="w-full flex items-start gap-4 p-4 bg-gradient-to-r from-white/5 to-white/[0.02] hover:from-white/10 hover:to-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 text-left group"
    >
      {/* YouTube Thumbnail */}
      <div className="relative shrink-0 w-32 h-20 rounded-lg overflow-hidden bg-black/50 group-hover:scale-105 transition-transform duration-200 shadow-lg">
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-white text-sm ml-0.5">▶</span>
          </div>
        </div>

        {/* Language flag */}
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
          {video.lang === "cs" ? "🇨🇿" : "🇬🇧"}
        </div>
      </div>

      {/* Video Info */}
      <div className="flex-1 min-w-0 py-1">
        {/* Badges Row */}
        <div className="flex items-center gap-2 mb-1.5">
          {/* Language Badge */}
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              video.lang === "cs"
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}
          >
            {video.lang === "cs" ? "Čeština" : "English"}
          </span>

          {/* Main/Recommended Badge */}
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              video.isMain
                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                : "bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30"
            }`}
          >
            {video.isMain ? "⭐ Main" : "💡 Doporučeno"}
          </span>
        </div>

        {/* Title */}
        <div className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {video.title}
        </div>

        {/* Author */}
        {video.author && (
          <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
            <span>👤</span>
            <span>{video.author}</span>
          </div>
        )}

        {/* Description */}
        {video.description && (
          <div className="text-xs text-muted-foreground/80 mt-1.5 line-clamp-2 leading-relaxed">
            {video.description}
          </div>
        )}
      </div>

      {/* Arrow indicator */}
      <div className="shrink-0 self-center text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">
        →
      </div>
    </button>
  );
}

function extractVideoId(url: string): string | null {
  if (!url) return null;

  const embedMatch = url.match(/embed\/([^?]+)/);
  if (embedMatch) return embedMatch[1];

  const watchMatch = url.match(/watch\?v=([^&]+)/);
  if (watchMatch) return watchMatch[1];

  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return shortMatch[1];

  return null;
}
