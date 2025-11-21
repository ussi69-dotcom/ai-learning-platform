"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";
import { use, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Quiz, { QuizQuestion } from "@/components/Quiz";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import LessonComplete from "@/components/LessonComplete";

export default function LessonPage({ params }: { params: Promise<{ courseId: string; lessonId: string }> }) {
  // Unwrap params Promise (Next.js 16 requirement)
  const { courseId, lessonId } = use(params);
  
  const { token } = useAuth();
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
  const [course, setCourse] = useState<any>(null); // Added course state
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>([]);
  const [allLessons, setAllLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Fetch current lesson
        const lessonRes = await fetch(`http://localhost:8000/lessons/${lessonId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (lessonRes.ok) {
          setLesson(await lessonRes.json());
        }

        // Fetch course (for slug)
        const courseRes = await fetch(`http://localhost:8000/courses/${courseId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (courseRes.ok) {
          setCourse(await courseRes.json());
        }

        // Fetch quizzes
        const quizzesRes = await fetch(`http://localhost:8000/lessons/${lessonId}/quizzes`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (quizzesRes.ok) {
          setQuizzes(await quizzesRes.json());
        }

        // Fetch all lessons for navigation
        const allLessonsRes = await fetch(`http://localhost:8000/lessons/`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (allLessonsRes.ok) {
          const lessons = await allLessonsRes.json();
          const courseLessons = lessons
            .filter((l: any) => l.course_id === parseInt(courseId))
            .sort((a: any, b: any) => a.order - b.order);
          setAllLessons(courseLessons);
        }
      } catch (error) {
        console.error("Error fetching lesson:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [lessonId, token, courseId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return <div className="p-12 text-center">Lekce nenalezena 😢</div>;
  }

  // Split content into logical slides based on main headings (##)
  const splitIntoSlides = (content: string): string[] => {
    const lines = content.split('\n');
    const slides: string[] = [];
    let currentSlide: string[] = [];

    lines.forEach((line, index) => {
      // Check if this is a main section heading (## but not ###)
      if (line.match(/^##\s+[^#]/)) {
        // If we have content, save the current slide
        if (currentSlide.length > 0) {
          slides.push(currentSlide.join('\n'));
          currentSlide = [];
        }
      }
      currentSlide.push(line);
    });

    // Don't forget the last slide
    if (currentSlide.length > 0) {
      slides.push(currentSlide.join('\n'));
    }

    return slides.filter(s => s.trim().length > 0);
  };

  const slides = splitIntoSlides(lesson.content);
  const hasQuiz = quizzes.length > 0;
  const totalPages = slides.length + (hasQuiz ? 1 : 0);
  const isQuizPage = currentPage === slides.length;
  const currentContent = !isQuizPage ? slides[currentPage] : '';

  // Find current lesson index and neighbors
  const currentIndex = allLessons.findIndex(l => l.id === parseInt(lessonId));
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const isLastLesson = currentIndex === allLessons.length - 1;

    return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
        <div className="container mx-auto py-6 px-4 max-w-4xl pb-32 md:pb-12">
          {/* Navigation back */}
          <div className="mb-6">
            <Link href={`/courses/${courseId}`}>
              <Button variant="ghost" className="gap-2 -ml-4 text-slate-600 hover:text-slate-900 hover:bg-white/50">
                ← Back to Course
              </Button>
            </Link>
          </div>

          {/* Header Section (Replaces Hero) */}
          <div className="mb-8">
             <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100/80 backdrop-blur-sm text-blue-700 px-3 py-1 rounded-full text-sm font-semibold border border-blue-200">
                Lesson {lesson.order}
              </span>
              {course && (
                <span className="text-slate-500 text-sm font-medium">
                  {course.title}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">{lesson.title}</h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">{lesson.description}</p>
          </div>

          {/* Video Section */}
          {lesson.video_url && (
            <div className="mb-10">
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-xl border border-white/20 ring-1 ring-black/5">
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

          {/* Content Card (Liquid Glass) */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-white/50 p-6 md:p-10 mb-8 ring-1 ring-slate-900/5">
            {/* Page indicator */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200/60">
                <div className="text-sm font-medium text-slate-500">
                  Section {currentPage + 1} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className="bg-white/50 hover:bg-white"
                  >
                    ← Prev
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                    disabled={currentPage === totalPages - 1}
                    className="bg-white/50 hover:bg-white"
                  >
                    Next →
                  </Button>
                </div>
              </div>
            )}

            {/* Formatted content using MarkdownRenderer */}
            {!isQuizPage ? (
              <div className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-blue-600 hover:prose-a:text-blue-500">
                <MarkdownRenderer 
                  content={currentContent} 
                  courseSlug={course?.slug}
                  lessonSlug={lesson?.slug}
                />
              </div>
            ) : (
              <Quiz 
                quizzes={quizzes} 
                onComplete={() => {
                  // Optional: Auto-mark lesson as complete or show confetti
                }} 
              />
            )}
          </div>

          {/* Lesson Complete - show on last page (quiz or content) */}
          {currentPage === totalPages - 1 && (
             <LessonComplete 
               lessonId={parseInt(lessonId)} 
               courseId={parseInt(courseId)} 
             />
          )}

          {/* Desktop Lesson Navigation */}
          <div className="hidden md:flex justify-between items-center gap-4 mt-12">
            {/* Left Side: Previous Page OR Previous Lesson */}
            {currentPage > 0 ? (
              <Button 
                variant="outline" 
                className="w-full max-w-xs justify-start gap-2 group h-auto py-4 px-6 bg-white/50 hover:bg-white border-slate-200"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <span className="group-hover:-translate-x-1 transition-transform text-xl">←</span>
                <div className="text-left">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Go Back</div>
                  <div className="font-semibold text-lg">Previous Page</div>
                </div>
              </Button>
            ) : previousLesson ? (
              <Link href={`/courses/${courseId}/lessons/${previousLesson.id}`} className="flex-1 max-w-xs">
                <Button variant="outline" className="w-full justify-start gap-2 group h-auto py-4 px-6 bg-white/50 hover:bg-white border-slate-200">
                  <span className="group-hover:-translate-x-1 transition-transform text-xl">←</span>
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Previous Lesson</div>
                    <div className="font-semibold truncate text-lg">{previousLesson.title}</div>
                  </div>
                </Button>
              </Link>
            ) : (
              <div className="flex-1 max-w-xs" />
            )}

            {/* Right Side: Next Page OR Next Lesson OR Finish */}
            {currentPage < totalPages - 1 ? (
              <Button 
                className="w-full max-w-xs justify-end gap-2 group h-auto py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <div className="text-right">
                  <div className="text-xs text-blue-100 uppercase tracking-wider font-semibold">Continue</div>
                  <div className="font-semibold text-lg">Next Page</div>
                </div>
                <span className="group-hover:translate-x-1 transition-transform text-xl">→</span>
              </Button>
            ) : nextLesson ? (
              <Link href={`/courses/${courseId}/lessons/${nextLesson.id}`} className="flex-1 max-w-xs">
                <Button className="w-full justify-end gap-2 group h-auto py-4 px-6 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-lg hover:shadow-xl transition-all">
                  <div className="text-right">
                    <div className="text-xs text-emerald-100 uppercase tracking-wider font-semibold">Next Lesson</div>
                    <div className="font-semibold truncate text-lg">{nextLesson.title}</div>
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform text-xl">→</span>
                </Button>
              </Link>
            ) : isLastLesson ? (
              <Link href={`/courses/${courseId}`} className="flex-1 max-w-xs">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 h-auto py-4 text-lg shadow-lg hover:shadow-purple-900/20">
                  ✓ Complete Course
                </Button>
              </Link>
            ) : (
              <div className="flex-1 max-w-xs" />
            )}
          </div>

          {/* Mobile Sticky Navigation Bar - Reading Mode */}
          <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-xl border-t border-slate-200 md:hidden z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-2">
              {/* Previous Slide Button */}
              <Button
                variant="ghost"
                size="lg"
                className="h-14 px-6 flex-shrink-0 text-slate-700 hover:bg-slate-100 font-semibold"
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
              >
                ← Previous Page
              </Button>

              {/* Progress Box (Center) */}
              <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Lesson {lesson.order}
                  </span>
                  <span className="text-xs font-bold text-blue-600">
                    {currentPage + 1}/{totalPages}
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-white/60 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-300 ease-out"
                    style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                  />
                </div>
              </div>

              {/* Next Slide / Next Lesson Button */}
              {currentPage < totalPages - 1 ? (
                // Not on last slide - show Next Page
                <Button 
                  size="lg"
                  className="h-14 px-6 flex-shrink-0 bg-blue-600 hover:bg-blue-700 shadow-lg font-semibold"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next Page →
                </Button>
              ) : (
                // On last slide - show Next Lesson or Finish
                <>
                  {nextLesson ? (
                    <Link href={`/courses/${courseId}/lessons/${nextLesson.id}`}>
                      <Button 
                        size="lg"
                        className="h-14 px-6 flex-shrink-0 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-lg font-bold whitespace-nowrap"
                      >
                        Next Lesson →
                      </Button>
                    </Link>
                  ) : isLastLesson ? (
                    <Link href={`/courses/${courseId}`}>
                      <Button 
                        size="lg"
                        className="h-14 px-6 flex-shrink-0 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg font-bold whitespace-nowrap"
                      >
                        Finish Course ✓
                      </Button>
                    </Link>
                  ) : (
                    <Button 
                      size="lg"
                      className="h-14 px-6 flex-shrink-0 bg-blue-600 hover:bg-blue-700 shadow-lg font-semibold"
                      disabled
                    >
                      Next Page →
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>

          
        </div>
      </div>
    </ProtectedRoute>
  );
}