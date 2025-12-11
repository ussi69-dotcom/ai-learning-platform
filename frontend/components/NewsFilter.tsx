"use client";

import { Play, Newspaper, TrendingUp, FileText, Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsFilterProps {
  value: string;
  onChange: (value: string) => void;
  counts?: Record<string, number>;
  locale: string;
}

const filters = [
  {
    id: "all",
    labelEn: "All",
    labelCs: "Vše",
    icon: Grid3X3,
  },
  {
    id: "youtube",
    labelEn: "Videos",
    labelCs: "Videa",
    icon: Play,
  },
  {
    id: "rss",
    labelEn: "Articles",
    labelCs: "Články",
    icon: Newspaper,
  },
  {
    id: "hackernews",
    labelEn: "HN",
    labelCs: "HN",
    icon: TrendingUp,
  },
  {
    id: "papers",
    labelEn: "Papers",
    labelCs: "Články",
    icon: FileText,
  },
];

export default function NewsFilter({ value, onChange, counts, locale }: NewsFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = value === filter.id;
        const count = filter.id === "all" ? counts?.total : counts?.[filter.id];
        const label = locale === "cs" ? filter.labelCs : filter.labelEn;

        return (
          <button
            key={filter.id}
            onClick={() => onChange(filter.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
              "border border-border hover:border-primary/50",
              isActive
                ? "bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-violet-600/20 border-primary text-primary dark:text-violet-300"
                : "bg-background/50 text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            {count !== undefined && count > 0 && (
              <span
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full",
                  isActive
                    ? "bg-primary/20 text-primary dark:text-violet-300"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
