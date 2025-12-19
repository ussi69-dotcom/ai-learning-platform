"use client";

import React, { useEffect, useRef } from 'react';

interface Video {
  id: string;
  title: string;
  author?: string;
  description?: string;
  lang?: 'en' | 'cs';
  isMain?: boolean;
}

interface VideoSwitcherProps {
  videos: Video[];
}

/**
 * VideoSwitcher registers videos with the VideoPlayer via global registry.
 * Place this component in MDX content to add alternative videos.
 *
 * Uses subscription pattern to handle race conditions:
 * - Subscribes to registry changes
 * - Re-adds videos when registry is reset (e.g., lesson navigation)
 */
export const VideoSwitcher = ({ videos: propVideos }: VideoSwitcherProps) => {
  const videosRef = useRef(propVideos);
  const mountedRef = useRef(true);
  videosRef.current = propVideos;

  useEffect(() => {
    mountedRef.current = true;

    if (!propVideos || propVideos.length === 0 || typeof window === 'undefined') {
      return;
    }

    let unsubscribe: (() => void) | null = null;
    let retryTimeout: NodeJS.Timeout | null = null;

    const ensureVideosRegistered = () => {
      if (!mountedRef.current) return;

      const registry = (window as any).__videoRegistry;
      if (!registry || typeof registry.addVideos !== 'function') return;

      // Check if our videos are missing from registry
      const ourVideoIds = videosRef.current.map(v => v.id);
      const existingIds = registry.videos.map((v: Video) => v.id);
      const needsRegistration = ourVideoIds.some(id => !existingIds.includes(id));

      if (needsRegistration) {
        registry.addVideos(videosRef.current);
      }
    };

    const trySubscribe = () => {
      if (!mountedRef.current) return;

      const registry = (window as any).__videoRegistry;
      if (registry && typeof registry.subscribe === 'function') {
        // Register videos first
        ensureVideosRegistered();

        // Subscribe to future changes (e.g., registry reset on lesson change)
        unsubscribe = registry.subscribe(() => {
          // Small delay to let reset complete before re-adding
          setTimeout(ensureVideosRegistered, 10);
        });
      } else {
        // Registry not ready, retry
        retryTimeout = setTimeout(trySubscribe, 100);
      }
    };

    // Start subscription process after short delay
    retryTimeout = setTimeout(trySubscribe, 50);

    return () => {
      mountedRef.current = false;
      if (retryTimeout) clearTimeout(retryTimeout);
      if (unsubscribe) unsubscribe();
    };
  }, [propVideos]);

  // This component doesn't render anything visible
  return null;
};
