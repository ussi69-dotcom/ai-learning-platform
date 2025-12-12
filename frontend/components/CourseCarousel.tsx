"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Star,
  Construction,
  Trophy,
} from "lucide-react";
import CourseIcon from "./CourseIcon";
import DifficultyIcon from "./DifficultyIcon";

// Course difficulty labels (Duke Nukem style)
const COURSE_DIFFICULTY_LABELS: Record<string, string> = {
  PIECE_OF_CAKE: "Piece of Cake",
  LETS_ROCK: "Let's Rock",
  COME_GET_SOME: "Come Get Some",
  DAMN_IM_GOOD: "Damn I'm Good",
};

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url?: string;
  difficulty_level: string;
  owner_id: number;
}

interface CourseCarouselProps {
  courses: Course[];
  locale: string;
  userLevel?: string;
  showRecommended?: boolean;
}

export default function CourseCarousel({
  courses,
  locale,
  userLevel,
  showRecommended = false,
}: CourseCarouselProps) {
  const [expanded, setExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll buttons visibility
  const checkScrollButtons = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    checkScrollButtons();
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);
      return () => {
        scrollEl.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, [checkScrollButtons, courses, expanded]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 360; // Approximate card width with gap
    const scrollAmount = direction === "left" ? -cardWidth * 2 : cardWidth * 2;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const CourseCard = ({ course }: { course: Course }) => {
    const isRecommended =
      showRecommended && course.difficulty_level === userLevel;
    const isUnderConstruction =
      course.slug === "advanced-ai-techniques" ||
      course.slug === "ai-engineering-deep-dive";

    return (
      <Card
        className={`hover:border-primary/50 transition-all duration-300 group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm relative h-full ${
          isRecommended
            ? "ring-2 ring-yellow-500/50 dark:ring-yellow-400/50"
            : ""
        } ${isUnderConstruction ? "opacity-75" : ""}`}
      >
        {/* Under Construction Overlay */}
        {isUnderConstruction && (
          <div className="absolute inset-0 z-20 bg-gradient-to-br from-amber-500/90 to-orange-600/90 dark:from-amber-600/90 dark:to-orange-700/90 flex flex-col items-center justify-center text-white backdrop-blur-sm">
            <div className="text-5xl mb-3 animate-bounce">🤖</div>
            <div className="flex items-center gap-2 mb-2">
              <Construction className="w-5 h-5" />
              <span className="text-lg font-bold">
                {locale === "cs" ? "Ve výstavbě" : "Under Construction"}
              </span>
              <Construction className="w-5 h-5" />
            </div>
            <p className="text-xs text-white/80 text-center px-4">
              {locale === "cs"
                ? "Náš robot pilně pracuje na tomto kurzu!"
                : "Our robot is working hard on this course!"}
            </p>
            <div className="mt-2 text-xl">🔧⚙️🛠️</div>
          </div>
        )}

        {/* Course Image / Icon Area */}
        <div className="h-36 w-full bg-transparent relative p-3 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
          </div>
          <div className="absolute inset-0 w-full h-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
            <CourseIcon
              courseId={course.id}
              slug={course.slug}
              imageUrl={course.image_url}
              objectFit="cover"
            />
          </div>
          {/* Recommended badge */}
          {isRecommended && (
            <span className="absolute top-2 left-2 text-[10px] font-bold bg-yellow-500 text-black px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <Star size={10} fill="currentColor" />
              {locale === "cs" ? "Doporučeno" : "Recommended"}
            </span>
          )}
          {/* Difficulty badge */}
          <span className="absolute top-2 right-2 text-[9px] font-bold bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded-full border border-white/10 flex items-center gap-1">
            <DifficultyIcon
              level={course.difficulty_level}
              size={10}
              className="text-white"
            />
            {COURSE_DIFFICULTY_LABELS[course.difficulty_level]}
          </span>
        </div>

        <CardHeader className="pb-1 pt-2 px-4">
          <CardTitle className="text-base line-clamp-1">
            <Link
              href={`/courses/${course.id}`}
              className="hover:text-primary transition-colors"
            >
              {course.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <p className="text-muted-foreground mb-4 text-xs line-clamp-2 h-[32px]">
            {course.description || "No description available."}
          </p>
          <Link href={`/courses/${course.id}`}>
            <Button
              size="sm"
              className="w-full text-xs bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 hover:opacity-90 text-white dark:bg-none dark:bg-red-700 dark:hover:bg-red-600 dark:shadow-[0_0_10px_rgba(220,38,38,0.4)] border-none"
            >
              {locale === "cs" ? "Začít kurz →" : "Start Course →"}
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  };

  if (courses.length === 0) {
    return (
      <div className="col-span-3 p-12 border-2 border-dashed border-border rounded-xl text-center text-muted-foreground glass-panel">
        <p>
          {locale === "cs"
            ? "Zatím nejsou dostupné žádné kurzy."
            : "No courses available yet."}
        </p>
        <p className="text-sm mt-2">
          {locale === "cs" ? "Zkuste to brzy znovu!" : "Check back soon!"}
        </p>
      </div>
    );
  }

  return (
    <div>
      {expanded ? (
        // Expanded Grid View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        // Netflix-style Carousel
        <div className="relative group/carousel">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center shadow-lg transition-all ${
              canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {courses.map((course) => (
              <div
                key={course.id}
                className="w-[280px] md:w-[320px] flex-shrink-0"
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center shadow-lg transition-all ${
              canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Fade edges */}
          <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-background/80 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-background/80 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Show All / Collapse Button */}
      {courses.length > 3 && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setExpanded(!expanded)}
            className="gap-2 border-violet-500/30 hover:border-violet-500/50 hover:bg-violet-500/5 dark:border-red-500/30 dark:hover:border-red-500/50 dark:hover:bg-red-500/5"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                {locale === "cs" ? "Sbalit" : "Collapse"}
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                {locale === "cs" ? "Zobrazit vše" : "Show All"}
                <span className="text-xs opacity-70">({courses.length})</span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
