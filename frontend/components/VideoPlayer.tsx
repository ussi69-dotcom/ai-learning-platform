"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';

interface Video {
  id: string;
  title: string;
  author?: string;
  description?: string;
  lang?: 'en' | 'cs';
  isMain?: boolean;
}

interface VideoPlayerProps {
  /** Fallback video URL if no videos are provided */
  fallbackUrl?: string;
  fallbackTitle?: string;
}

// Global video registry for cross-component communication
declare global {
  interface Window {
    __videoRegistry?: {
      videos: Video[];
      listeners: Set<() => void>;
      addVideos: (videos: Video[]) => void;
      subscribe: (listener: () => void) => () => void;
    };
  }
}

function getVideoRegistry() {
  if (typeof window === 'undefined') return null;
  
  if (!window.__videoRegistry) {
    window.__videoRegistry = {
      videos: [],
      listeners: new Set(),
      addVideos: (newVideos: Video[]) => {
        const registry = window.__videoRegistry!;
        newVideos.forEach(v => {
          if (!registry.videos.some(existing => existing.id === v.id)) {
            registry.videos.push(v);
          }
        });
        registry.listeners.forEach(listener => listener());
      },
      subscribe: (listener: () => void) => {
        const registry = window.__videoRegistry!;
        registry.listeners.add(listener);
        return () => registry.listeners.delete(listener);
      }
    };
  }
  return window.__videoRegistry;
}

/**
 * VideoPlayer component with integrated video switching and PIN functionality
 */
export const VideoPlayer = ({ fallbackUrl, fallbackTitle }: VideoPlayerProps) => {
  const locale = useLocale();
  const [isPinned, setIsPinned] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [, forceUpdate] = useState({});

  // Initialize with fallback video
  useEffect(() => {
    if (fallbackUrl) {
      const id = extractVideoId(fallbackUrl);
      if (id) {
        const registry = getVideoRegistry();
        if (registry) {
          const mainVideo: Video = {
            id,
            title: fallbackTitle || 'Video',
            isMain: true
          };
          // Add main video if not already present
          if (!registry.videos.some(v => v.id === id)) {
            registry.videos.unshift(mainVideo);
          }
        }
        if (!activeVideoId) {
          setActiveVideoId(id);
        }
      }
    }
  }, [fallbackUrl, fallbackTitle, activeVideoId]);

  // Subscribe to video registry changes
  useEffect(() => {
    const registry = getVideoRegistry();
    if (!registry) return;

    const unsubscribe = registry.subscribe(() => {
      setVideos([...registry.videos]);
      forceUpdate({});
    });

    // Initial sync
    setVideos([...registry.videos]);

    return unsubscribe;
  }, []);

  const activeVideo = videos.find(v => v.id === activeVideoId) || videos[0];
  const alternativeVideos = videos.filter(v => v.id !== activeVideo?.id);

  if (!activeVideo) {
    return null;
  }

  const embedUrl = `https://www.youtube.com/embed/${activeVideo.id}?cc_load_policy=1&cc_lang_pref=${locale}&hl=${locale}`;

  return (
    <div 
      className={`mb-10 transition-all duration-300 ${
        isPinned 
          ? 'sticky top-0 z-50 bg-background/98 backdrop-blur-xl py-4 -mx-4 px-4 shadow-2xl shadow-black/20 border-b border-border/50' 
          : ''
      }`}
      style={isPinned ? { marginTop: '-1rem' } : {}}
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
      
      {/* Controls Bar */}
      <div className="flex items-center justify-between mt-3 gap-4">
        {/* Current Video Info */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground truncate">
            {activeVideo.title}
          </div>
          {activeVideo.author && (
            <div className="text-xs text-muted-foreground">
              {activeVideo.author}
            </div>
          )}
        </div>
        
        {/* Pin Button */}
        <button
          onClick={() => setIsPinned(!isPinned)}
          className={`
            px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
            flex items-center gap-1.5 shrink-0
            ${isPinned 
              ? 'bg-primary text-primary-foreground shadow-lg' 
              : 'bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground border border-white/10'
            }
          `}
          title={isPinned ? 'Odepnout video' : 'Připnout video nahoře'}
        >
          <span>{isPinned ? '📌' : '📍'}</span>
          <span className="hidden sm:inline">{isPinned ? 'Odepnout' : 'Připnout'}</span>
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
                {locale === 'cs' ? 'Další doporučená videa' : 'More recommended videos'}
              </span>
              <span className="text-xs text-muted-foreground bg-white/10 px-2 py-0.5 rounded-full">
                {alternativeVideos.length}
              </span>
            </div>
            <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          
          {isExpanded && (
            <div className="mt-2 space-y-2 animate-in slide-in-from-top-2 duration-200">
              {alternativeVideos.map((video) => {
                const langEmoji = video.lang === 'cs' ? '🇨🇿' : video.lang === 'en' ? '🇬🇧' : '🎬';
                
                return (
                  <button
                    key={video.id}
                    onClick={() => {
                      setActiveVideoId(video.id);
                      setIsExpanded(false);
                    }}
                    className="w-full flex items-start gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-200 text-left group"
                  >
                    {/* Thumbnail placeholder */}
                    <div className="w-24 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <span className="text-2xl">{langEmoji}</span>
                    </div>
                    
                    {/* Video Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {video.title}
                      </div>
                      {video.author && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {video.author}
                        </div>
                      )}
                      {video.description && (
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {video.description}
                        </div>
                      )}
                    </div>
                    
                    {/* Play indicator */}
                    <div className="text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                      ▶
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

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
