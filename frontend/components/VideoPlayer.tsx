"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocale } from "next-intl";
import { VideoRegistryContext, Video } from "./mdx/VideoSwitcher";

interface VideoPlayerProps {
  fallbackUrl?: string;
  fallbackTitle?: string;
  /** Content to render - VideoSwitcher inside will register videos via context */
  children?: React.ReactNode;
  /** Pre-extracted alternative videos to avoid race conditions with lazy-loaded slides */
  initialVideos?: Video[];
}

/**
 * VideoPlayer wraps content and provides video registry context.
 * VideoSwitcher components inside children can register videos.
 *
 * Key fix: Using React Context instead of global registry avoids
 * race conditions between effect ordering during navigation.
 */
export const VideoPlayer = ({
  fallbackUrl,
  fallbackTitle,
  children,
  initialVideos = [],
}: VideoPlayerProps) => {
  const locale = useLocale();
  const [isPinned, setIsPinned] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const fallbackTimerRef = useRef<number | null>(null);
  const initializedRef = useRef(false);

  // Initialize with fallback video and any initial videos
  useEffect(() => {
    const baseVideos = [...initialVideos];
    
    if (fallbackUrl && !initializedRef.current) {
      const id = extractVideoId(fallbackUrl);
      if (id) {
        const mainVideo: Video = {
          id,
          title: fallbackTitle || "Video",
          isMain: true,
        };
        
        setVideos((prev) => {
          // Merge initialVideos, existing videos, and main video
          const combined = [mainVideo, ...baseVideos, ...prev];
          const unique = Array.from(new Map(combined.map(v => [v.id, v])).values());
          return unique;
        });
        
        setActiveVideoId(id);
        initializedRef.current = true;
      } else {
        // No valid fallback URL, just set initial videos
        setVideos(prev => {
          const combined = [...baseVideos, ...prev];
          const unique = Array.from(new Map(combined.map(v => [v.id, v])).values());
          return unique;
        });
      }
    } else if (initialVideos.length > 0) {
      setVideos(prev => {
        const combined = [...baseVideos, ...prev];
        const unique = Array.from(new Map(combined.map(v => [v.id, v])).values());
        return unique;
      });
    }
  }, [fallbackUrl, fallbackTitle, initialVideos]);

  // Set first video as active if none selected
  useEffect(() => {
    if (!activeVideoId && videos.length > 0) {
      setActiveVideoId(videos[0].id);
    }
  }, [videos, activeVideoId]);

  // Context callback for VideoSwitcher to add videos
  const addVideos = useCallback((newVideos: Video[]) => {
    if (!newVideos || newVideos.length === 0) return;

    setVideos((currentVideos) => {
      const existingIds = new Set(currentVideos.map((v) => v.id));
      const videosToAdd = newVideos.filter(
        (video) => video?.id && !existingIds.has(video.id)
      );

      if (videosToAdd.length === 0) return currentVideos;
      return [...currentVideos, ...videosToAdd];
    });
  }, []);

  const activeVideo = videos.find((v) => v.id === activeVideoId) || videos[0];
  const alternativeVideos = videos.filter((v) => v.id !== activeVideo?.id);

  useEffect(() => {
    if (!activeVideo?.id) {
      setIsVideoLoaded(false);
      setShowFallback(false);
      return undefined;
    }

    setIsVideoLoaded(false);
    setShowFallback(false);

    if (fallbackTimerRef.current) {
      window.clearTimeout(fallbackTimerRef.current);
    }

    fallbackTimerRef.current = window.setTimeout(() => {
      setShowFallback(true);
    }, 6000);

    return () => {
      if (fallbackTimerRef.current) {
        window.clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
    };
  }, [activeVideo?.id]);

  // Always render the wrapper with context provider
  // This ensures VideoSwitcher can register videos even if no video yet
  const contextValue = { addVideos };

  // If no video available, just render children with context
  if (!activeVideo) {
    return (
      <VideoRegistryContext.Provider value={contextValue}>
        {children}
      </VideoRegistryContext.Provider>
    );
  }

  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  const embedUrl = `https://www.youtube.com/embed/${activeVideo.id}?cc_load_policy=1&cc_lang_pref=${locale}&hl=${locale}${
    origin ? `&origin=${encodeURIComponent(origin)}` : ""
  }`;
  const watchUrl = `https://www.youtube.com/watch?v=${activeVideo.id}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${activeVideo.id}/hqdefault.jpg`;

  return (
    <VideoRegistryContext.Provider value={contextValue}>
      <div
        className={`mb-10 transition-all duration-300 ${
          isPinned
            ? "sticky top-0 z-50 bg-background/98 backdrop-blur-xl py-4 -mx-4 px-4 shadow-2xl shadow-black/20 border-b border-border/50"
            : ""
        }`}
        style={isPinned ? { marginTop: "-1rem" } : {}}
      >
        {/* Video Player */}
        <div
          className="relative aspect-video bg-black bg-center bg-cover rounded-2xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-black/5"
          style={{ backgroundImage: `url(${thumbnailUrl})` }}
        >
          {!isVideoLoaded && !showFallback && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-xs text-white/80 tracking-wide">
              {locale === "cs" ? "Načítám video…" : "Loading video…"}
            </div>
          )}
          {showFallback && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 text-center text-white/80 px-6">
              <div className="text-xs uppercase tracking-wider">
                {locale === "cs"
                  ? "Video se nedaří načíst"
                  : "Video not loading"}
              </div>
              <a
                href={watchUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full border border-white/20 transition-colors"
              >
                {locale === "cs" ? "Otevřít na YouTube" : "Open on YouTube"}
              </a>
            </div>
          )}
          <iframe
            key={activeVideo.id}
            className="w-full h-full"
            src={embedUrl}
            title={activeVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => {
              setIsVideoLoaded(true);
              setShowFallback(false);
              if (fallbackTimerRef.current) {
                window.clearTimeout(fallbackTimerRef.current);
                fallbackTimerRef.current = null;
              }
            }}
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

      {/* Render children (MarkdownRenderer) after video player */}
      {children}
    </VideoRegistryContext.Provider>
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
                : "bg-violet-500/20 text-violet-400 border border-violet-500/30"
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

  // Last resort: if it looks like a YouTube ID
  if (/^[a-zA-Z0-9_-]{10,12}$/.test(url)) return url;

  return null;
}
