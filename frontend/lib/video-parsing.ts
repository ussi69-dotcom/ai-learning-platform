export interface Video {
  id: string;
  title: string;
  author?: string;
  description?: string;
  lang?: "en" | "cs";
  isMain?: boolean;
}

const VIDEO_SWITCHER_PROP_REGEX = /(?:videos|alternatives)=\{(\[[\s\S]*?\])\}/;

type VideoSwitcherParseResult =
  | { matched: false }
  | { matched: true; rawJson: string; videos: Video[]; error?: unknown };

const normalizeTagContent = (tagContent: string): string =>
  tagContent.replace(/\n/g, " ");

const sanitizeVideosJson = (videosJson: string): string => {
  let sanitized = videosJson.replace(
    /(\{|,)\s*(\w+)\s*:/g,
    (_match, prefix, key) => `${prefix}"${key}":`
  );
  sanitized = sanitized.replace(/,\s*]/g, "]").replace(/,\s*}/g, "}");
  return sanitized;
};

export const parseVideoSwitcherTag = (
  tagContent: string
): VideoSwitcherParseResult => {
  if (!tagContent) return { matched: false };

  const normalized = normalizeTagContent(tagContent);
  const propMatch = normalized.match(VIDEO_SWITCHER_PROP_REGEX);
  if (!propMatch) return { matched: false };

  const rawJson = propMatch[1];
  const videosJson = sanitizeVideosJson(rawJson);

  try {
    const parsedVideos = JSON.parse(videosJson);
    if (!Array.isArray(parsedVideos)) {
      return {
        matched: true,
        rawJson,
        videos: [],
        error: new Error("VideoSwitcher JSON is not an array."),
      };
    }

    const videos: Video[] = [];
    parsedVideos.forEach((video) => {
      if (video && typeof video === "object" && video.id) {
        videos.push({
          id: video.id,
          title: video.title || "Video",
          author: video.author,
          description: video.description,
          lang: video.lang,
          isMain: !!video.isMain,
        });
      }
    });

    return { matched: true, rawJson, videos };
  } catch (error) {
    return { matched: true, rawJson, videos: [], error };
  }
};

/**
 * Extracts all alternative videos from MDX content by looking for <VideoSwitcher /> tags.
 * This is used to pre-load all videos in a lesson regardless of which slide they are on.
 */
export function extractAlternativeVideos(content: string): Video[] {
  if (!content) return [];
  
  const videos: Video[] = [];
  
  // Find all <VideoSwitcher ... /> or <VideoSwitcher ... ></VideoSwitcher>
  // We use a regex that handles multi-line tags by using [\s\S]*?
  const switcherRegex = /<VideoSwitcher[\s\S]*?>/g;
  const matches = content.matchAll(switcherRegex);
  
  for (const match of matches) {
    const parsed = parseVideoSwitcherTag(match[0]);
    if (!parsed.matched) continue;

    if (parsed.error) {
      console.error(
        "Failed to parse VideoSwitcher videos in extraction:",
        parsed.error,
        parsed.rawJson
      );
      continue;
    }

    if (parsed.videos.length > 0) {
      videos.push(...parsed.videos);
    }
  }
  
  // Remove duplicates based on ID
  const uniqueVideos: Video[] = [];
  const seenIds = new Set<string>();
  
  for (const v of videos) {
    if (!seenIds.has(v.id)) {
      uniqueVideos.push(v);
      seenIds.add(v.id);
    }
  }
  
  return uniqueVideos;
}
