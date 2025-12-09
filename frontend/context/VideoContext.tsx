"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Video {
  id: string;
  title: string;
  author?: string;
  lang?: 'en' | 'cs';
  isMain?: boolean;
}

interface VideoContextType {
  /** Current video being played */
  currentVideo: Video | null;
  /** All available videos for the lesson */
  videos: Video[];
  /** Set the list of available videos */
  setVideos: (videos: Video[]) => void;
  /** Switch to a specific video by index */
  setActiveVideo: (index: number) => void;
  /** Whether video is pinned (sticky) */
  isPinned: boolean;
  /** Toggle pin state */
  togglePin: () => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

interface VideoProviderProps {
  children: ReactNode;
  /** Initial video from meta.json (if any) */
  initialVideoUrl?: string;
  initialVideoTitle?: string;
}

export function VideoProvider({ children, initialVideoUrl, initialVideoTitle }: VideoProviderProps) {
  const [videos, setVideosState] = useState<Video[]>(() => {
    // If there's an initial video from meta.json, use it as first video
    if (initialVideoUrl) {
      // Extract video ID from YouTube URL
      const match = initialVideoUrl.match(/embed\/([^?]+)/);
      const id = match ? match[1] : initialVideoUrl;
      return [{
        id,
        title: initialVideoTitle || 'Video',
        isMain: true
      }];
    }
    return [];
  });
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  const setVideos = (newVideos: Video[]) => {
    setVideosState(newVideos);
    setActiveIndex(0);
  };

  const setActiveVideo = (index: number) => {
    if (index >= 0 && index < videos.length) {
      setActiveIndex(index);
    }
  };

  const togglePin = () => {
    setIsPinned(prev => !prev);
  };

  const currentVideo = videos.length > 0 ? videos[activeIndex] : null;

  return (
    <VideoContext.Provider value={{
      currentVideo,
      videos,
      setVideos,
      setActiveVideo,
      isPinned,
      togglePin
    }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
}

/**
 * Hook for VideoSwitcher to register its videos with the context
 */
export function useVideoSwitcher(videos: Video[]) {
  const { setVideos } = useVideo();
  
  React.useEffect(() => {
    if (videos && videos.length > 0) {
      setVideos(videos);
    }
  }, [videos, setVideos]);
}
