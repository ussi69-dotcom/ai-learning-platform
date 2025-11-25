"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";
import { use, useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Quiz, { QuizQuestion } from "@/components/Quiz";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import LessonComplete from "@/components/LessonComplete";
import ProgressDots from "@/components/mdx/ProgressDots";
import LessonProgressBar from "@/components/LessonProgressBar";
import axios from 'axios';

export default function LessonPage({ params }: { params: Promise<{ courseId: string; lessonId: string }> }) {
  const { courseId, lessonId } = use(params);
  
  const { token } = useAuth();
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>([]);
  const [allLessons, setAllLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch all data
  useEffect(() => {
    async function fetchData() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        
        // 1. Load Lesson
        const lessonRes = await axios.get(`${API_BASE}/lessons/${lessonId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        setLesson(lessonRes.data);

        // 2. Load Course
        const courseRes = await axios.get(`${API_BASE}/courses/${courseId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        setCourse(courseRes.data);

        // 3. Load Quizzes
        const quizzesRes = await axios.get(`${API_BASE}/lessons/${lessonId}/quizzes`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        setQuizzes(quizzesRes.data);

        // 4. Load All Lessons (for navigation)
        const allLessonsRes = await axios.get(`${API_BASE}/lessons/`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const courseLessons = allLessonsRes.data
          .filter((l: any) => l.course_id === parseInt(courseId))
          .sort((a: any, b: any) => a.order - b.order);
        setAllLessons(courseLessons);

        // 5. Load User Progress (Resume last page)
        const progressRes = await axios.get(`${API_BASE}/users/me/progress`, {
           headers: { "Authorization": `Bearer ${token}` }
        });
        const myProgress = progressRes.data.find((p: any) => p.lesson_id === parseInt(lessonId));
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
  }, [lessonId, token, courseId]);

  // Save progress when page changes
  useEffect(() => {
    if (!token || loading) return;

    const saveProgress = setTimeout(async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        await axios.post(`${API_BASE}/lessons/${lessonId}/progress?page=${currentPage}`, {}, {
          headers: { "Authorization": `Bearer ${token}` }
        });
      } catch (e: any) {
        if (e.response?.status === 401) {
          console.warn("Session expired while saving progress. Redirecting to login...");
          router.push('/login');
        } else {
          console.error("Failed to save progress", e);
        }
      }
    }, 1000); // Debounce 1s

    return () => clearTimeout(saveProgress);
  }, [currentPage, lessonId, token, loading]);


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return <div className="p-12 text-center text-muted-foreground">Lesson not found 😢</div>;
  }

  // Content Splitting logic
  const splitIntoSlides = (content: string): string[] => {
    const lines = content.split('\n');
    const slides: string[] = [];
    let currentSlide: string[] = [];

    lines.forEach((line) => {
      if (line.match(/^##\s+[^#]/)) {
        if (currentSlide.length > 0) {
          slides.push(currentSlide.join('\n'));
          currentSlide = [];
        }
      }
      currentSlide.push(line);
    });
    if (currentSlide.length > 0) slides.push(currentSlide.join('\n'));
    return slides.filter(s => s.trim().length > 0);
  };

  const slides = splitIntoSlides(lesson.content);
  const hasQuiz = quizzes.length > 0;
  const calculatedTotalPages = slides.length + (hasQuiz ? 1 : 0);
  
  // Ensure currentPage doesn't exceed bounds (e.g. if content changed)
  if (currentPage >= calculatedTotalPages && calculatedTotalPages > 0) {
      setCurrentPage(calculatedTotalPages - 1);
  }

  const isQuizPage = currentPage === slides.length;
  const currentContent = !isQuizPage ? slides[currentPage] : '';

  const currentIndex = allLessons.findIndex(l => l.id === parseInt(lessonId));
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background transition-colors duration-500">
        
        <ProgressDots />
        
        <div className="container mx-auto py-6 px-4 max-w-4xl pb-32 md:pb-24">
          
          {/* Lesson Navigation (TOP) */}
          <div className="flex items-center justify-between gap-4 mb-8 p-3 -mx-3 rounded-lg bg-card/50 border border-border backdrop-blur-sm">
            <Link href={`/courses/${courseId}`}>
              <Button variant="outline" size="sm" className="gap-2">
                ← Back to Course
              </Button>
            </Link>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
              >
                ← Prev
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(Math.min(calculatedTotalPages - 1, currentPage + 1))}
                disabled={currentPage === calculatedTotalPages - 1}
              >
                Next →
              </Button>
            </div>
          </div>
          
          {/* Header Section */}
          <div className="mb-8 mt-4">
             <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold border border-primary/20">
                Lesson {lesson.order}
              </span>
              {course && (
                <Link href={`/courses/${courseId}`} className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                  {course.title}
                </Link>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">{lesson.title}</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">{lesson.description}</p>
          </div>

          {/* Video Section */}
          {lesson.video_url && (
            <div className="mb-10">
              <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-border ring-1 ring-black/5">
                <iframe 
                  className="w-full h-full"
                  src={lesson.video_url} 
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Content Card */}
          <div className="glass-panel rounded-3xl p-6 md:p-10 mb-8 min-h-[400px] relative">
            
            {/* Page Indicator (Top) */}
            <div className="flex justify-between items-center mb-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">
               <span>Section {currentPage + 1} of {calculatedTotalPages}</span>
               {isQuizPage && <span className="text-primary">Final Challenge</span>}
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
                <Quiz 
                  quizzes={quizzes} 
                  onComplete={() => {}} 
                />
              </div>
            )}

            {/* Lesson Complete (Embedded on last page if no quiz, or after quiz) */}
            {currentPage === calculatedTotalPages - 1 && !isQuizPage && !hasQuiz && (
                <LessonComplete lessonId={parseInt(lessonId)} courseId={parseInt(courseId)} />
            )}
          </div>

          {/* --- PRIMARY NAVIGATION (Page Control) --- */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-card/50 p-4 rounded-2xl border border-border backdrop-blur-sm">
             <div className="flex w-full md:w-auto justify-between md:justify-start gap-4 order-2 md:order-1">
               <Button
                  variant="ghost"
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="min-w-[80px] h-12 text-base" // Větší tlačítka
                >
                  ← Prev
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

              <div className="flex w-full md:w-auto justify-end order-3">
                <Button
                  variant={currentPage === calculatedTotalPages - 1 ? "default" : "outline"} 
                  onClick={() => setCurrentPage(Math.min(calculatedTotalPages - 1, currentPage + 1))}
                  disabled={currentPage === calculatedTotalPages - 1}
                  className="min-w-[100px] h-12 text-base font-bold shadow-md" // Větší a výraznější
                >
                  Next Page →
                </Button>
              </div>
          </div>

          {/* --- SECONDARY NAVIGATION (Context Control) --- */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
            
            {/* Prev Lesson */}
            <div className="justify-self-start">
              {previousLesson ? (
                <Link href={`/courses/${courseId}/lessons/${previousLesson.id}`}>
                  <Button variant="outline" size="sm" className="text-muted-foreground hover:text-foreground gap-2">
                    <span>«</span> Prev Lesson
                  </Button>
                </Link>
              ) : (
                <Button variant="ghost" size="sm" disabled className="opacity-0">Prev</Button>
              )}
            </div>

            {/* Home / Course Index */}
            <div className="justify-self-center">
               <Link href={`/courses/${courseId}`}>
                  <Button variant="outline" size="sm" className="border-dashed border-border text-muted-foreground hover:text-foreground">
                    Course Overview
                  </Button>
               </Link>
            </div>

            {/* Next Lesson */}
            <div className="justify-self-end">
               {nextLesson ? (
                  <Link href={`/courses/${courseId}/lessons/${nextLesson.id}`}>
                    <Button variant="outline" size="sm" className="text-muted-foreground hover:text-foreground gap-2">
                      Next Lesson <span>»</span>
                    </Button>
                  </Link>
               ) : (
                  <Link href={`/courses/${courseId}`}>
                    <Button variant="default" size="sm" className="gap-2">
                      Finish Course 🏆
                    </Button>
                  </Link>
               )}
            </div>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
