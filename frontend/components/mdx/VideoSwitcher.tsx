"use client";

import React, { useEffect } from 'react';

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
 */
export const VideoSwitcher = ({ videos: propVideos }: VideoSwitcherProps) => {
  
  useEffect(() => {
    if (propVideos && propVideos.length > 0 && typeof window !== 'undefined') {
      // Wait for registry to be initialized by VideoPlayer
      const tryRegister = () => {
        // Access registry with type assertion (defined in VideoPlayer.tsx)
        const registry = (window as any).__videoRegistry;
        if (registry && typeof registry.addVideos === 'function') {
          registry.addVideos(propVideos);
        } else {
          // Retry in 100ms if registry not ready
          setTimeout(tryRegister, 100);
        }
      };
      
      // Small initial delay to ensure VideoPlayer mounts first
      setTimeout(tryRegister, 50);
    }
  }, [propVideos]);

  // This component doesn't render anything visible
  return null;
};
