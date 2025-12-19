"use client";

import { useEffect, useContext, createContext } from "react";

// Import Video type from VideoContext
export interface Video {
  id: string;
  title: string;
  author?: string;
  description?: string;
  lang?: "en" | "cs";
  isMain?: boolean;
}

interface VideoSwitcherProps {
  videos: Video[];
}

// Optional context hook that doesn't throw when used outside provider
const VideoRegistryContext = createContext<{
  addVideos: (videos: Video[]) => void;
} | null>(null);

// Export for VideoPlayer to provide
export { VideoRegistryContext };

/**
 * VideoSwitcher registers videos with the VideoPlayer.
 * Place this component in MDX content to add alternative videos.
 *
 * Uses React context when available (within VideoPlayer scope),
 * falls back to global registry for backward compatibility.
 */
export const VideoSwitcher = ({ videos: propVideos }: VideoSwitcherProps) => {
  const context = useContext(VideoRegistryContext);

  useEffect(() => {
    if (!propVideos || propVideos.length === 0 || typeof window === "undefined") {
      return;
    }

    // Prefer context if available
    if (context) {
      context.addVideos(propVideos);
      return;
    }

    // Fallback to global registry
    const registry = (window as any).__videoRegistry;
    if (registry && typeof registry.addVideos === "function") {
      registry.addVideos(propVideos);
    }
  }, [propVideos, context]);

  // This component doesn't render anything visible
  return null;
};
