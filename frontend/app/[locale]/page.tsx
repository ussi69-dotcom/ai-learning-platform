"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import CourseIcon from "@/components/CourseIcon";
import CourseCarousel from "@/components/CourseCarousel";
import FeedbackFAB from "@/components/FeedbackFAB";
import FeedbackSubmissionModal from "@/components/FeedbackSubmissionModal";
import FeedbackDetailModal from "@/components/FeedbackDetailModal";
import FeedbackMarker from "@/components/FeedbackMarker";
import DifficultyIcon from "@/components/DifficultyIcon";
import SystemStatus from "@/components/SystemStatus";
// Teasers link to /about page showcases
import ABTestTeaser from "@/components/ABTestTeaser";
import PhysicsOptTeaser from "@/components/PhysicsOptTeaser";
import AIGlossary from "@/components/AIGlossary";
import NewsFeed from "@/components/NewsFeed";
import DailySummary from "@/components/DailySummary";
import { getBadgeLevel, BADGE_TIERS } from "@/components/XPAvatarBadge";
import { useLocale, useTranslations } from "next-intl";
import {
  Rocket,
  Info,
  Code2,
  Zap,
  Users,
  GitBranch,
  Play,
  Video,
  Clipboard,
  Bot,
  Trophy,
} from "lucide-react";

type FeedbackMode = "idle" | "placing" | "viewing";

// Get user badge name based on XP
const getUserBadgeName = (xp: number, locale: string): string => {
  const level = getBadgeLevel(xp);
  const badge = BADGE_TIERS[level];
  return locale === "cs" ? badge.nameCs : badge.name;
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

interface UserProgress {
  lesson_id: number;
  course_id: number;
  current_page: number;
}

export default function HomePage() {
  const { user, token, isLoading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastLesson, setLastLesson] = useState<UserProgress | null>(null);
  const [loadingResume, setLoadingResume] = useState(true);

  const locale = useLocale();
  const t = useTranslations("Home");
  const tAuth = useTranslations("Auth");
  const tAbout = useTranslations("About");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");

  // Feedback State
  const [feedbackMode, setFeedbackMode] = useState<FeedbackMode>("idle");
  const [feedbackToPlace, setFeedbackToPlace] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [feedbackItems, setFeedbackItems] = useState<any[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

  useEffect(() => {
    async function fetchCourses() {
      if (!token) {
        setLoadingCourses(false);
        return;
      }

      try {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await axios.get(`${API_BASE}/courses/`, {
          params: { lang: locale },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setCourses(response.data);
        } else {
          setError("Failed to load courses");
        }
      } catch (err: any) {
        if (err.response?.status !== 401) {
          console.error("Error fetching courses:", err);
          setError("Failed to connect to backend");
        }
      } finally {
        setLoadingCourses(false);
      }
    }

    async function fetchLastLesson() {
      if (!token) {
        setLoadingResume(false);
        return;
      }
      try {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await axios.get(`${API_BASE}/users/me/last-lesson`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200 && response.data) {
          setLastLesson(response.data);
        }
      } catch (err: any) {
        if (err.response?.status !== 401) {
          console.error("Error fetching last lesson:", err);
        }
      } finally {
        setLoadingResume(false);
      }
    }

    if (!isLoading) {
      fetchCourses();
      fetchLastLesson();
    }
  }, [token, isLoading, locale]);

  // Fetch Global Feedback
  useEffect(() => {
    if (feedbackMode !== "viewing" || !token) return;

    const fetchFeedback = async () => {
      try {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await axios.get(`${API_BASE}/feedback`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbackItems(res.data);
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      }
    };

    fetchFeedback();
  }, [feedbackMode, token]);

  const handlePlaceFeedback = (x: number, y: number) => {
    setFeedbackToPlace({ x, y });
    setFeedbackMode("idle");
  };

  const handleVote = async (id: number, direction: "up" | "down") => {
    try {
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      await axios.post(`${API_BASE}/feedback/${id}/vote`, null, {
        params: { direction },
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh
      const res = await axios.get(`${API_BASE}/feedback`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbackItems(res.data);
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
      const parent =
        feedbackItems.find((i) => i.id === parentId) || selectedFeedback;
      if (!parent) return;

      await axios.post(
        `${API_BASE}/feedback/${parentId}/reply`,
        {
          lesson_id: parent.lesson_id,
          slide_index: parent.slide_index,
          x_pos: parent.x_pos,
          y_pos: parent.y_pos,
          type: parent.type,
          message: message,
          parent_id: parentId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Refresh
      const res = await axios.get(`${API_BASE}/feedback`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbackItems(res.data);
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
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbackItems(res.data);
      if (selectedFeedback && selectedFeedback.id === id) {
        setSelectedFeedback(null);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (isLoading || loadingCourses || loadingResume) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{tCommon("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen flex-col bg-background text-foreground relative"
      id="lesson-content-container"
    >
      {/* Hero Sekce */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-card/50 border-b border-border relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[100px]" />
        </div>

        <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
            <Rocket className="w-4 h-4" />
            <span>{tAbout("hero_subtitle")}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 dark:bg-gradient-to-br dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent drop-shadow-sm">
            {tAbout("hero_title")}
          </h1>

          <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl mb-8 leading-relaxed">
            {tAbout("hero_desc")}
          </p>

          {user && (
            <p className="text-sm text-muted-foreground mb-8 bg-card/50 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border">
              {locale === "cs" ? "Tvoje hodnost: " : "Your rank: "}
              <span className="font-semibold text-violet-600 dark:text-red-600 dark:drop-shadow-[0_0_8px_rgba(220,38,38,0.8)] flex items-center gap-1">
                <Trophy size={16} />
                {getUserBadgeName(user.xp || 0, locale)}
              </span>
              <span className="text-xs opacity-70">({user.xp} XP)</span>
            </p>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!user ? (
              <>
                <Link href="/login">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 hover:opacity-90 transition-opacity text-white dark:bg-none dark:bg-red-700 dark:hover:bg-red-600 dark:shadow-[0_0_20px_rgba(220,38,38,0.5)] border-none"
                  >
                    {tAuth("submit_login")}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 hover:opacity-90 transition-opacity text-white dark:bg-none dark:bg-transparent dark:border dark:border-red-900 dark:hover:bg-red-950/30 dark:text-red-500 dark:hover:text-red-400"
                  >
                    {tAuth("submit_register")}
                  </Button>
                </Link>
              </>
            ) : lastLesson ? (
              <Link
                href={`/courses/${lastLesson.course_id}/lessons/${lastLesson.lesson_id}`}
              >
                <Button
                  size="lg"
                  className="gap-2 w-full sm:w-auto shadow-lg shadow-violet-500/20 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 hover:opacity-90 text-white dark:bg-none dark:bg-red-700 dark:hover:bg-red-600 dark:shadow-[0_0_20px_rgba(220,38,38,0.5)] border-none"
                >
                  {locale === "cs" ? "Pokračovat v učení" : "Resume Learning"}{" "}
                  <Rocket size={18} className="text-white" />
                </Button>
              </Link>
            ) : courses.length > 0 ? (
              <Link href={`/courses/${courses[0].id}`}>
                <Button
                  size="lg"
                  className="gap-2 w-full sm:w-auto shadow-lg shadow-violet-500/20 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 hover:opacity-90 text-white dark:bg-none dark:bg-red-700 dark:hover:bg-red-600 dark:shadow-[0_0_20px_rgba(220,38,38,0.5)] border-none"
                >
                  {locale === "cs" ? "Začít s učením" : "Start Learning"}{" "}
                  <Rocket size={18} className="text-white" />
                </Button>
              </Link>
            ) : (
              <Button size="lg" disabled>
                {locale === "cs" ? "Žádné kurzy" : "No courses available"}
              </Button>
            )}

            <Link href="/about">
              <Button
                variant="ghost"
                size="lg"
                className="gap-2 w-full sm:w-auto"
              >
                <Info size={18} /> {tNav("about")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* System Status Monitor */}
      <SystemStatus />

      {/* Daily AI Digest + News Feed */}
      <section className="w-full py-12 md:py-16 bg-slate-50/30 dark:bg-slate-900/20 border-y border-border/30">
        <div className="container px-4 mx-auto">
          {/* Daily Summary - Curated by agents */}
          <DailySummary locale={locale} />

          {/* AI News Feed - Aggregated from YouTube, RSS, HN, arXiv */}
          <NewsFeed locale={locale} />
        </div>
      </section>

      {/* AI Learning Path - Core Courses */}
      <section className="w-full py-12 md:py-16 container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-700 dark:from-red-600 dark:via-red-500 dark:to-red-800 bg-clip-text text-transparent">
              {locale === "cs" ? "🎯 AI Learning Path" : "🎯 AI Learning Path"}
            </h2>
            {user && (
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                {locale === "cs" ? "Tvoje hodnost: " : "Your rank: "}
                <span className="inline-flex items-center gap-1 text-violet-600 dark:text-red-500 dark:drop-shadow-[0_0_5px_rgba(220,38,38,0.8)] font-medium">
                  <Trophy size={14} />
                  {getUserBadgeName(user.xp || 0, locale)}
                </span>
                <span className="text-xs opacity-70">({user.xp} XP)</span>
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="p-4 border border-destructive bg-destructive/10 text-destructive rounded-lg mb-6">
            {error}
          </div>
        )}

        {!user ? (
          <div className="col-span-3 p-12 border-2 border-dashed border-border rounded-xl text-center text-muted-foreground glass-panel">
            <p className="text-lg mb-2">
              {locale === "cs"
                ? "Pro zobrazení kurzů se prosím přihlaste"
                : "Please login to see courses"}
            </p>
            <p className="text-sm">
              {locale === "cs"
                ? "Kurzy jsou doporučovány podle vaší úrovně"
                : "Courses are recommended based on your level"}
            </p>
          </div>
        ) : (
          <CourseCarousel
            courses={courses.filter(c => c.slug !== "microsoft-copilot-mastery")}
            locale={locale}
            userLevel={user.calculated_level}
            showRecommended={true}
          />
        )}
      </section>

      {/* Optional - MS 365 Productivity */}
      {user && courses.some(c => c.slug === "microsoft-copilot-mastery") && (
        <section className="w-full py-8 md:py-12 container px-4 mx-auto">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-muted-foreground">
              {locale === "cs" ? "📎 MS 365 Produktivita" : "📎 MS 365 Productivity"}
            </h2>
            <p className="text-sm text-muted-foreground/70 mt-1">
              {locale === "cs"
                ? "Volitelný kurz pro uživatele Microsoft ekosystému"
                : "Optional course for Microsoft ecosystem users"}
            </p>
          </div>
          <CourseCarousel
            courses={courses.filter(c => c.slug === "microsoft-copilot-mastery")}
            locale={locale}
            userLevel={user.calculated_level}
            showRecommended={false}
            specialBadge="ms365"
          />
        </section>
      )}

      {/* AI Glossary - Interactive Terms */}
      <AIGlossary locale={locale} />

      {/* Development Showcases - Teasers to About page */}
      <section className="w-full py-8">
        <ABTestTeaser />
        <PhysicsOptTeaser />
      </section>

      {/* Benefits Section - Edutainment Enhanced */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-background border-t border-b border-border/50">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-sm font-mono text-violet-600 dark:text-violet-400 mb-4">
              <Play className="w-4 h-4" />
              <span>Edutainment v3.0</span>
            </div>
            <h2 className="text-3xl font-bold mb-3">{t("benefits_title")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("benefits_subtitle")}
            </p>
          </div>

          {/* Primary Edutainment Features - Horizontal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                icon: <Zap className="w-5 h-5" />,
                title: t("benefit_hook_title"),
                desc: t("benefit_hook_desc"),
                gradient: "from-yellow-500 to-orange-500",
              },
              {
                icon: <Video className="w-5 h-5" />,
                title: t("benefit_videos_title"),
                desc: t("benefit_videos_desc"),
                gradient: "from-red-500 to-pink-500",
              },
              {
                icon: <Clipboard className="w-5 h-5" />,
                title: t("benefit_labs_title"),
                desc: t("benefit_labs_desc"),
                gradient: "from-purple-500 to-indigo-500",
              },
              {
                icon: <Bot className="w-5 h-5" />,
                title: t("benefit_multiagent_title"),
                desc: t("benefit_multiagent_desc"),
                gradient: "from-blue-500 to-cyan-500",
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-border/50 bg-card/60 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
                />
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2.5 rounded-xl bg-gradient-to-br ${benefit.gradient} text-white shadow-lg flex-shrink-0`}
                    >
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Secondary Benefits - Smaller Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                icon: <Code2 className="w-4 h-4" />,
                title: t("benefit_projects_title"),
                color: "text-blue-500",
              },
              {
                icon: <Zap className="w-4 h-4" />,
                title: t("benefit_real_title"),
                color: "text-amber-500",
              },
              {
                icon: <Users className="w-4 h-4" />,
                title: t("benefit_collab_title"),
                color: "text-purple-500",
              },
              {
                icon: <GitBranch className="w-4 h-4" />,
                title: t("benefit_open_title"),
                color: "text-emerald-500",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 rounded-lg bg-card/40 border border-border/30 hover:border-border/60 transition-colors"
              >
                <span className={benefit.color}>{benefit.icon}</span>
                <span className="text-xs font-medium">{benefit.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback System */}
      {user && (
        <>
          <FeedbackFAB
            onModeChange={setFeedbackMode}
            currentMode={feedbackMode}
            onPlaceFeedback={(x, y) => handlePlaceFeedback(x, y)}
            lessonId={0} // Dummy or ignored
            slideIndex={0} // Dummy or ignored
          />

          <FeedbackSubmissionModal
            isOpen={feedbackToPlace !== null}
            onClose={() => {
              setFeedbackToPlace(null);
              setFeedbackMode("idle");
            }}
            onSubmitSuccess={() => {
              setFeedbackToPlace(null);
              setFeedbackMode("idle");
            }}
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
            onUpdate={() => {}}
          />

          {/* Markers */}
          {feedbackMode === "viewing" && (
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden h-full w-full">
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
        </>
      )}
    </div>
  );
}
