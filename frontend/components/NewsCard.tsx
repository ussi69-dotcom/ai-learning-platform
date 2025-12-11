"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ExternalLink, Clock, TrendingUp, FileText, Newspaper } from "lucide-react";
import Image from "next/image";

export interface NewsItem {
  id: number;
  external_id: string;
  title: string;
  description: string | null;
  source: "youtube" | "rss" | "hackernews" | "papers";
  source_url: string;
  thumbnail_url: string | null;
  channel_name: string | null;
  published_at: string | null;
  video_id: string | null;
  duration_seconds: number | null;
  score: number | null;
  created_at: string;
}

interface NewsCardProps {
  item: NewsItem;
  locale: string;
}

// Format duration from seconds to MM:SS or HH:MM:SS
function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

// Format relative time (e.g., "2 hours ago", "3 days ago")
function formatRelativeTime(dateString: string, locale: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (locale === "cs") {
    if (diffHours < 1) return "před chvílí";
    if (diffHours < 24) return `před ${diffHours} h`;
    if (diffDays < 7) return `před ${diffDays} dny`;
    return date.toLocaleDateString("cs-CZ");
  }

  if (diffHours < 1) return "just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US");
}

// Format numbers with K/M suffix
function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

// Get source icon and color
function getSourceStyle(source: string) {
  switch (source) {
    case "youtube":
      return {
        icon: Play,
        color: "bg-red-500/90 text-white",
        label: "YouTube",
      };
    case "rss":
      return {
        icon: Newspaper,
        color: "bg-orange-500/90 text-white",
        label: "Article",
      };
    case "hackernews":
      return {
        icon: TrendingUp,
        color: "bg-orange-600/90 text-white",
        label: "HN",
      };
    case "papers":
      return {
        icon: FileText,
        color: "bg-purple-500/90 text-white",
        label: "Paper",
      };
    default:
      return {
        icon: ExternalLink,
        color: "bg-slate-500/90 text-white",
        label: "Link",
      };
  }
}

export default function NewsCard({ item, locale }: NewsCardProps) {
  const sourceStyle = getSourceStyle(item.source);
  const SourceIcon = sourceStyle.icon;

  // Generate YouTube thumbnail if not provided
  const thumbnailUrl =
    item.thumbnail_url ||
    (item.video_id
      ? `https://img.youtube.com/vi/${item.video_id}/hqdefault.jpg`
      : null);

  const isVideo = item.source === "youtube";
  const ctaLabel = locale === "cs"
    ? (isVideo ? "Sledovat" : "Číst")
    : (isVideo ? "Watch" : "Read");

  return (
    <Card className="group overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/10 flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative h-40 bg-slate-200 dark:bg-slate-800 overflow-hidden">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <SourceIcon className="w-12 h-12 text-slate-400" />
          </div>
        )}

        {/* Source badge */}
        <Badge className={`absolute top-2 left-2 ${sourceStyle.color} flex items-center gap-1`}>
          <SourceIcon className="w-3 h-3" />
          {sourceStyle.label}
        </Badge>

        {/* Video duration badge */}
        {item.duration_seconds && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(item.duration_seconds)}
          </span>
        )}

        {/* HN score badge */}
        {item.source === "hackernews" && item.score && (
          <span className="absolute bottom-2 right-2 bg-orange-600/90 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {formatNumber(item.score)}
          </span>
        )}
      </div>

      {/* Content */}
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold line-clamp-2 leading-tight">
          {item.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Description */}
        {item.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {item.description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 mt-auto">
          <span className="truncate max-w-[60%]">{item.channel_name}</span>
          {item.published_at && (
            <span>{formatRelativeTime(item.published_at, locale)}</span>
          )}
        </div>

        {/* CTA */}
        <a href={item.source_url} target="_blank" rel="noopener noreferrer" className="block">
          <Button
            size="sm"
            className="w-full bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 hover:from-violet-700 hover:via-indigo-700 hover:to-violet-700"
          >
            {isVideo ? <Play className="w-4 h-4 mr-2" /> : <ExternalLink className="w-4 h-4 mr-2" />}
            {ctaLabel}
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}
