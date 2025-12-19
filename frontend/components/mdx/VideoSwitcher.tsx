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
 * Handles race conditions by:
 * 1. Subscribing to registry changes
 * 2. Re-adding videos if they get cleared (e.g., after lesson navigation)
 */
export const VideoSwitcher = ({ videos: propVideos }: VideoSwitcherProps) => {
  const registeredRef = useRef(false);
  const videosRef = useRef(propVideos);
  videosRef.current = propVideos;

  useEffect(() => {
    if (!propVideos || propVideos.length === 0 || typeof window === 'undefined') {
      return;
    }

    const registerVideos = () => {
      const registry = (window as any).__videoRegistry;
      if (registry && typeof registry.addVideos === 'function') {
        // Check if our videos are already in the registry
        const ourVideoIds = videosRef.current.map(v => v.id);
        const existingIds = registry.videos.map((v: Video) => v.id);
        const needsRegistration = ourVideoIds.some(id => !existingIds.includes(id));

        if (needsRegistration) {
          registry.addVideos(videosRef.current);
          registeredRef.current = true;
        }
        return true;
      }
      return false;
    };

    // Initial registration with retry
    const tryRegister = () => {
      if (!registerVideos()) {
        // Retry if registry not ready
        setTimeout(tryRegister, 100);
      }
    };

    // Wait for VideoPlayer to mount and create registry
    const initialDelay = setTimeout(tryRegister, 50);

    // Subscribe to registry changes to re-add videos if cleared
    const checkInterval = setInterval(() => {
      const registry = (window as any).__videoRegistry;
      if (registry && registeredRef.current) {
        // Check if our videos got cleared (e.g., by lesson navigation)
        const ourVideoIds = videosRef.current.map(v => v.id);
        const existingIds = registry.videos.map((v: Video) => v.id);
        const videosCleared = ourVideoIds.some(id => !existingIds.includes(id));

        if (videosCleared) {
          registry.addVideos(videosRef.current);
        }
      }
    }, 200);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(checkInterval);
      registeredRef.current = false;
    };
  }, [propVideos]);

  // This component doesn't render anything visible
  return null;
};
