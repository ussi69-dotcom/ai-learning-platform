"use client";

import { useState, useEffect, use, useMemo } from "react";
import { useRouter } from "@/i18n/routing"; // Updated import for routing
import { Link } from "@/i18n/routing"; // Updated import for routing
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { VideoPlayer } from "@/components/VideoPlayer";
import { extractAlternativeVideos } from "@/lib/video-parsing";
import Quiz, { QuizQuestion } from "@/components/Quiz";
import LessonComplete from "@/components/LessonComplete";
import ProgressDots from "@/components/mdx/ProgressDots";
import LessonProgressBar from "@/components/LessonProgressBar";
import FeedbackFAB from "@/components/FeedbackFAB";
import FeedbackSubmissionModal from "@/components/FeedbackSubmissionModal";
import FeedbackDetailModal from "@/components/FeedbackDetailModal";
import FeedbackMarker from "@/components/FeedbackMarker";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";

// Helper function moved outside component
const splitIntoSlides = (content: string): string[] => {
  const lines = content.split("\n");
  const slides: string[] = [];
  let currentSlide: string[] = [];
  let insideCodeBlock = false;

  lines.forEach((line) => {
    // Track code block state
    if (line.trim().startsWith("```")) {
      insideCodeBlock = !insideCodeBlock;
    }

    // Only split on ## headings when NOT inside a code block
    if (!insideCodeBlock && line.match(/^##\s+[^#]/)) {
      if (currentSlide.length > 0) {
        slides.push(currentSlide.join("\n"));
        currentSlide = [];
      }
    }
    currentSlide.push(line);
  });
  if (currentSlide.length > 0) slides.push(currentSlide.join("\n"));
  return slides.filter((s) => s.trim().length > 0);
};

type FeedbackMode = "idle" | "placing" | "viewing";

export default function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = use(params);

  const { token } = useAuth();
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>([]);
  const [allLessons, setAllLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const locale = useLocale();
  const t = useTranslations("Common");

  const [feedbackMode, setFeedbackMode] = useState<FeedbackMode>("idle");
  const [feedbackToPlace, setFeedbackToPlace] = useState<{
    x: number;
    y: number;
    slideIndex: number;
  } | null>(null);
  const [feedbackItems, setFeedbackItems] = useState<any[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

  // --- DEBUG LOGGING ---
  useEffect(() => {
    console.log(
      `[LessonPage] Render Cycle. LessonId: ${lessonId}, Page: ${currentPage}, Loading: ${loading}`
    );
  });

  useEffect(() => {
    console.log(`[LessonPage] Mount or LessonId Change: ${lessonId}`);
  }, [lessonId]);

  // Scroll to top when changing pages within the lesson
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  // ---------------------

  // Derive total pages immediately (safe calculation)
  const slides = lesson ? splitIntoSlides(lesson.content) : [];
  const hasQuiz = quizzes.length > 0;
  const calculatedTotalPages = slides.length + (hasQuiz ? 1 : 0);

  // Extract all alternative videos from the entire lesson content
  const allAlternativeVideos = useMemo(() => {
    return lesson ? extractAlternativeVideos(lesson.content) : [];
  }, [lesson?.content]);

  // DEBUG: Check if content has VideoSwitcher
  useEffect(() => {
    if (lesson?.content) {
      const hasVideoSwitcher = lesson.content.includes("<VideoSwitcher");
      console.log("[DEBUG] Content has VideoSwitcher:", hasVideoSwitcher);
      if (hasVideoSwitcher) {
        const match = lesson.content.match(/<VideoSwitcher[^>]*>/);
        console.log(
          "[DEBUG] VideoSwitcher tag found:",
          match?.[0]?.substring(0, 100)
        );
      }
      console.log(
        "[DEBUG] First 500 chars of content:",
        lesson.content.substring(0, 500)
      );
    }
  }, [lesson?.content]);

  // Fetch all data
  useEffect(() => {
    async function fetchData() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        // 1. Load Lesson
        const lessonRes = await axios.get(`${API_BASE}/lessons/${lessonId}`, {
          params: { lang: locale },
          headers: { Authorization: `Bearer ${token}` },
        });
        setLesson(lessonRes.data);

        // 2. Load Course
        const courseRes = await axios.get(`${API_BASE}/courses/${courseId}`, {
          params: { lang: locale },
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(courseRes.data);

        // 3. Load Quizzes
        const quizzesRes = await axios.get(
          `${API_BASE}/lessons/${lessonId}/quizzes`,
          {
            params: { lang: locale },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setQuizzes(quizzesRes.data);

        // 4. Load All Lessons (for navigation)
        const allLessonsRes = await axios.get(`${API_BASE}/lessons/`, {
          params: { lang: locale },
          headers: { Authorization: `Bearer ${token}` },
        });
        const courseLessons = allLessonsRes.data
          .filter((l: any) => l.course_id === parseInt(courseId))
          .sort((a: any, b: any) => a.order - b.order);
        setAllLessons(courseLessons);

        // 5. Load User Progress (Resume last page)
        const progressRes = await axios.get(`${API_BASE}/users/me/progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const myProgress = progressRes.data.find(
          (p: any) => p.lesson_id === parseInt(lessonId)
        );
        if (myProgress && myProgress.current_page) {
          setCurrentPage(myProgress.current_page);
        }
      } catch (error) {
        console.error("Error fetching lesson data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [lessonId, token, courseId, locale]);

  // Save progress when page changes
  useEffect(() => {
    if (!token || loading) return;

    const saveProgress = setTimeout(async () => {
      try {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        await axios.post(
          `${API_BASE}/lessons/${lessonId}/progress?page=${currentPage}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (e: any) {
        if (e.response?.status === 401) {
          console.warn(
            "Session expired while saving progress. Redirecting to login..."
          );
          router.push("/login");
        } else {
          console.error("Failed to save progress", e);
        }
      }
    }, 1000); // Debounce 1s

    return () => clearTimeout(saveProgress);
  }, [currentPage, lessonId, token, loading, router]);

  // Fetch Feedback when entering viewing mode or page changes
  useEffect(() => {
    if (feedbackMode !== "viewing" || !token) return;

    const fetchFeedback = async () => {
      try {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await axios.get(`${API_BASE}/feedback`, {
          params: { lesson_id: lessonId, slide_index: currentPage },
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbackItems(res.data);
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      }
    };

    fetchFeedback();
  }, [feedbackMode, currentPage, lessonId, token]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (currentPage < calculatedTotalPages - 1) {
          setCurrentPage((p) => p + 1);
        }
      }
      if (e.key === "ArrowLeft") {
        if (currentPage > 0) {
          setCurrentPage((p) => p - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, calculatedTotalPages]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="p-12 text-center text-muted-foreground">
        Lesson not found 😢
      </div>
    );
  }

  // Ensure currentPage doesn't exceed bounds (e.g. if content changed)
  if (currentPage >= calculatedTotalPages && calculatedTotalPages > 0) {
    setCurrentPage(calculatedTotalPages - 1);
  }

  const isQuizPage = currentPage === slides.length;
  const currentContent = !isQuizPage ? slides[currentPage] : "";

  const currentIndex = allLessons.findIndex((l) => l.id === parseInt(lessonId));
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handlePlaceFeedback = (x: number, y: number, slideIdx: number) => {
    setFeedbackToPlace({ x, y, slideIndex: slideIdx });
    setFeedbackMode("idle"); // Back to idle after placing
  };

  const handleVote = async (id: number, direction: "up" | "down") => {
    try {
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      await axios.post(`${API_BASE}/feedback/${id}/vote`, null, {
        params: { direction },
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh feedback
      const res = await axios.get(`${API_BASE}/feedback`, {
        params: { lesson_id: lessonId, slide_index: currentPage },
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbackItems(res.data);

      // Update selected item if open
      if (selectedFeedback && selectedFeedback.id === id) {
        const updated = res.data.find((i: any) => i.id === id);
        setSelectedFeedback(updated);
      }
    } catch (error) {
      console.error("Vote failed:", error);
    }
  };

  const handleReply = async (parentId: number, message: string) => {
    try {
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      // We need to construct the full object, but the endpoint expects FeedbackItemCreate
      // which needs lesson_id, slide_index, x_pos, y_pos, type, message.
      // For a reply, x/y/type might be inherited or irrelevant but required by schema.
      // Let's find the parent to copy context.
      const parent =
        feedbackItems.find((i) => i.id === parentId) || selectedFeedback;
      if (!parent) return;

      await axios.post(
        `${API_BASE}/feedback/${parentId}/reply`,
        {
          lesson_id: parseInt(lessonId),
          slide_index: parent.slide_index,
          x_pos: parent.x_pos,
          y_pos: parent.y_pos,
          type: parent.type, // Inherit type or make it NOTE? Let's inherit for now or use NOTE.
          message: message,
          parent_id: parentId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Refresh
      const res = await axios.get(`${API_BASE}/feedback`, {
        params: { lesson_id: lessonId, slide_index: currentPage },
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbackItems(res.data);
      // Update selected item if open
      if (selectedFeedback && selectedFeedback.id === parentId) {
        const updated = res.data.find((i: any) => i.id === parentId);
        setSelectedFeedback(updated);
      }
    } catch (error) {
      console.error("Reply failed:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      await axios.delete(`${API_BASE}/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refresh
      const res = await axios.get(`${API_BASE}/feedback`, {
        params: { lesson_id: lessonId, slide_index: currentPage },
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbackItems(res.data);
      if (selectedFeedback && selectedFeedback.id === id) {
        setSelectedFeedback(null); // Close modal if deleted
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background transition-colors duration-500 relative">
        {/* Ambient Background Blobs */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div
            className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-violet-500/5 dark:bg-indigo-500/10 rounded-full blur-[150px] animate-pulse"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 dark:bg-purple-500/10 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: "10s" }}
          />
          <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] bg-violet-500/3 dark:bg-violet-500/5 rounded-full blur-[100px]" />
        </div>

        <ProgressDots />

        <div className="container mx-auto py-6 px-4 max-w-4xl pb-32 md:pb-24">
          {/* Lesson Navigation (TOP) */}
          <div className="flex items-center justify-between gap-4 mb-8 p-3 -mx-3 rounded-xl bg-card/30 border border-border/50 backdrop-blur-md hover:bg-card/50 transition-all duration-300">
            <div className="flex gap-2">
              <Link href={`/courses/${courseId}`}>
                <Button variant="outline" size="sm" className="gap-2">
                  ← {locale === "cs" ? "Zpět na kurz" : "Back to Course"}
                </Button>
              </Link>
              {currentPage > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setCurrentPage(0)}
                >
                  {locale === "cs" ? "Zpět na stranu 1" : "Back to Page 1"}
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
              >
                ← {locale === "cs" ? "Zpět" : "Prev"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setCurrentPage(
                    Math.min(calculatedTotalPages - 1, currentPage + 1)
                  )
                }
                disabled={currentPage === calculatedTotalPages - 1}
              >
                {locale === "cs" ? "Další" : "Next"} →
              </Button>
            </div>
          </div>

          {/* Header Section */}
          <div className="mb-8 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-violet-500/10 text-violet-600 px-3 py-1 rounded-full text-sm font-semibold border border-violet-500/20 backdrop-blur-sm">
                {locale === "cs" ? "Lekce" : "Lesson"} {lesson.order}
              </span>
              {course && (
                <Link
                  href={`/courses/${courseId}`}
                  className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors hover:underline underline-offset-4"
                >
                  {course.title}
                </Link>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 dark:bg-gradient-to-br dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent tracking-tight drop-shadow-sm dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] pb-1">
              {lesson.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {lesson.description}
            </p>
          </div>

          {/* Video Section - VideoPlayer provides context for VideoSwitcher in content */}
          {/* key={lessonId} ensures state resets when navigating between lessons */}
          <VideoPlayer
            key={lessonId}
            fallbackUrl={lesson.video_url}
            fallbackTitle={lesson.title}
            initialVideos={allAlternativeVideos}
          >
            {/* Content Card - rendered inside VideoPlayer for context access */}
            <div
              id="lesson-content-container"
              className="glass-panel rounded-3xl p-6 md:p-10 mb-8 min-h-[400px] relative animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 border border-border/50 shadow-xl shadow-primary/5 dark:shadow-primary/10 hover:shadow-2xl hover:shadow-primary/10 transition-shadow duration-500"
            >
              {/* Page Indicator (Top) */}
              <div className="flex justify-between items-center mb-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <span>
                  {locale === "cs" ? "Sekce" : "Section"} {currentPage + 1}{" "}
                  {locale === "cs" ? "z" : "of"} {calculatedTotalPages}
                </span>
                {isQuizPage && (
                  <span className="text-primary">
                    {locale === "cs" ? "Závěrečný test" : "Final Challenge"}
                  </span>
                )}
              </div>

              {/* Formatted content */}
              {!isQuizPage ? (
                <div className="animate-in fade-in duration-300">
                  <MarkdownRenderer
                    content={currentContent}
                    courseSlug={course?.slug}
                    lessonSlug={lesson?.slug}
                  />
                </div>
              ) : (
              <div className="animate-in zoom-in-95 duration-300">
                <Quiz quizzes={quizzes} onComplete={() => {}} />
              </div>
            )}

            {/* Lesson Complete (Embedded on last page if no quiz, or after quiz) */}
            {currentPage === calculatedTotalPages - 1 &&
              !isQuizPage &&
              !hasQuiz && (
                <LessonComplete
                  lessonId={parseInt(lessonId)}
                  courseId={parseInt(courseId)}
                  lessonTitle={lesson.title}
                />
              )}

            {/* Feedback Markers Overlay */}
            {feedbackMode === "viewing" && (
              <div className="absolute inset-0 z-20 pointer-events-none">
                {feedbackItems.map((item) => (
                  <div key={item.id} className="pointer-events-auto">
                    <FeedbackMarker
                      x={item.x_pos}
                      y={item.y_pos}
                      type={item.type}
                      message={item.message}
                      author={item.author}
                      isResolved={item.is_resolved}
                      onClick={() => setSelectedFeedback(item)}
                    />
                  </div>
                ))}
              </div>
            )}
            </div>
          </VideoPlayer>

          {/* --- PRIMARY NAVIGATION (Page Control) --- */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-card/30 p-4 rounded-2xl border border-border/50 backdrop-blur-md shadow-lg shadow-black/5 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            <div className="flex w-full md:w-auto justify-between md:justify-start gap-4 order-2 md:order-1">
              <Button
                variant="ghost"
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="min-w-[80px] h-12 text-base" // Větší tlačítka
              >
                ← {locale === "cs" ? "Zpět" : "Prev"}
              </Button>
            </div>

            {/* Interactive Segmented Progress Bar */}
            <div className="w-full order-1 md:order-2">
              <LessonProgressBar
                total={calculatedTotalPages}
                current={currentPage}
                onNavigate={setCurrentPage}
              />
            </div>

            <div className="flex w-full md:w-auto justify-end order-3 h-12">
              <Button
                variant={
                  currentPage === calculatedTotalPages - 1
                    ? "default"
                    : "outline"
                }
                onClick={() =>
                  setCurrentPage(
                    Math.min(calculatedTotalPages - 1, currentPage + 1)
                  )
                }
                disabled={currentPage === calculatedTotalPages - 1}
                className={`w-full md:w-auto min-w-[120px] h-full text-base font-bold shadow-md ${
                  currentPage === calculatedTotalPages - 1
                    ? "bg-gradient-to-br from-violet-700 via-indigo-500 via-violet-400 to-violet-800 hover:opacity-90 text-white border-none dark:from-red-700 dark:via-red-500 dark:via-red-400 dark:to-red-800"
                    : ""
                }`}
              >
                {locale === "cs" ? "Další strana" : "Next Page"} →
              </Button>
            </div>
          </div>

          {/* --- SECONDARY NAVIGATION (Context Control) --- */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/50 animate-in fade-in duration-500 delay-500">
            {/* Prev Lesson */}
            <div className="justify-self-start">
              {previousLesson ? (
                <Link
                  href={`/courses/${courseId}/lessons/${previousLesson.id}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground gap-2 hover:-translate-x-1 transition-all duration-200"
                  >
                    <span>«</span>{" "}
                    {locale === "cs" ? "Předchozí lekce" : "Prev Lesson"}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  disabled
                  className="opacity-0"
                >
                  Prev
                </Button>
              )}
            </div>

            {/* Home / Course Index */}
            <div className="justify-self-center">
              <Link href={`/courses/${courseId}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-dashed border-border/50 text-muted-foreground hover:text-foreground hover:border-border hover:bg-card/50 transition-all duration-200"
                >
                  {locale === "cs" ? "Přehled kurzu" : "Course Overview"}
                </Button>
              </Link>
            </div>

            {/* Next Lesson */}
            <div className="justify-self-end">
              {nextLesson ? (
                <Link href={`/courses/${courseId}/lessons/${nextLesson.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground gap-2 hover:translate-x-1 transition-all duration-200"
                  >
                    {locale === "cs" ? "Další lekce" : "Next Lesson"}{" "}
                    <span>»</span>
                  </Button>
                </Link>
              ) : allLessons.length > 0 && currentIndex === allLessons.length - 1 && currentPage === calculatedTotalPages - 1 ? (
                <Link href={`/courses/${courseId}`}>
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-2 hover:scale-105 transition-transform duration-200"
                  >
                    {locale === "cs" ? "Dokončit kurz 🏆" : "Finish Course 🏆"}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  disabled
                  className="opacity-0"
                >
                  {locale === "cs" ? "Další" : "Next"}
                </Button>
              )}
            </div>
          </div>
        </div>
        <FeedbackFAB
          onModeChange={setFeedbackMode}
          currentMode={feedbackMode}
          onPlaceFeedback={handlePlaceFeedback}
          lessonId={parseInt(lessonId)}
          slideIndex={currentPage}
        />

        <FeedbackSubmissionModal
          isOpen={feedbackToPlace !== null}
          onClose={() => {
            setFeedbackToPlace(null);
            setFeedbackMode("idle");
          }}
          onSubmitSuccess={() => {
            setFeedbackToPlace(null);
            setFeedbackMode("viewing");
          }}
          lessonId={parseInt(lessonId)}
          slideIndex={feedbackToPlace?.slideIndex || 0}
          x={feedbackToPlace?.x || 0}
          y={feedbackToPlace?.y || 0}
        />

        <FeedbackDetailModal
          isOpen={selectedFeedback !== null}
          onClose={() => setSelectedFeedback(null)}
          feedbackItem={selectedFeedback}
          onVote={handleVote}
          onReply={handleReply}
          onDelete={handleDelete}
          onUpdate={() => {}} // Not implemented yet
        />
      </div>
    </ProtectedRoute>
  );
}
