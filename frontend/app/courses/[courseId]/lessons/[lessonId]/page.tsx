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
import ProgressDots from "@/components/mdx/ProgressDots";

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

  useEffect(() => {
    async function fetchData() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const lessonRes = await fetch(`http://localhost:8000/lessons/${lessonId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (lessonRes.ok) setLesson(await lessonRes.json());

        const courseRes = await fetch(`http://localhost:8000/courses/${courseId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (courseRes.ok) setCourse(await courseRes.json());

        const quizzesRes = await fetch(`http://localhost:8000/lessons/${lessonId}/quizzes`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (quizzesRes.ok) setQuizzes(await quizzesRes.json());

        const allLessonsRes = await fetch(`http://localhost:8000/lessons/`, {
          headers: { "Authorization": `Bearer ${token}` }
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
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 dark:border-red-500 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return <div className="p-12 text-center text-slate-500">Lesson not found 😢</div>;
  }

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
  const totalPages = slides.length + (hasQuiz ? 1 : 0);
  const isQuizPage = currentPage === slides.length;
  const currentContent = !isQuizPage ? slides[currentPage] : '';

  const currentIndex = allLessons.findIndex(l => l.id === parseInt(lessonId));
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const isLastLesson = currentIndex === allLessons.length - 1;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
        
        {/* Progress Dots */}
        <ProgressDots />
        
        <div className="container mx-auto py-6 px-4 max-w-4xl pb-32 md:pb-24">
          {/* Navigation back - UPDATED to outline for better visibility */}
          <div className="mb-6 mt-4">
            <Link href={`/courses/${courseId}`}>
              <Button variant="outline" className="gap-2 -ml-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-slate-700 border-slate-200">
                ← Back to Course
              </Button>
            </Link>
          </div>

          {/* Header Section */}
          <div className="mb-8">
             <div className="flex items-center gap-3 mb-4">
              <span className="bg-indigo-100 dark:bg-red-900/30 text-indigo-700 dark:text-red-400 px-3 py-1 rounded-full text-sm font-semibold border border-indigo-200 dark:border-red-900">
                Lesson {lesson.order}
              </span>
              {course && (
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  {course.title}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight">{lesson.title}</h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">{lesson.description}</p>
          </div>

          {/* Video Section */}
          {lesson.video_url && (
            <div className="mb-10">
              <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 ring-1 ring-black/5">
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
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border-2 border-slate-200 dark:border-slate-800 p-6 md:p-10 mb-8">
            
            {/* Page indicator */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  Section {currentPage + 1} / {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
                  >
                    ← Prev
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                    disabled={currentPage === totalPages - 1}
                    className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
                  >
                    Next →
                  </Button>
                </div>
              </div>
            )}

            {/* Formatted content */}
            {!isQuizPage ? (
              <div className="min-h-[300px]">
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
                  // Quiz logic
                }} 
              />
            )}
          </div>

          {/* Lesson Complete */}
          {currentPage === totalPages - 1 && !isQuizPage && !hasQuiz && (
             <LessonComplete 
               lessonId={parseInt(lessonId)} 
               courseId={parseInt(courseId)} 
             />
          )}

          {/* Desktop Lesson Navigation */}
          <div className="hidden md:flex justify-between items-center gap-4 mt-12">
            {/* Left Side */}
            {currentPage > 0 ? (
              <Button 
                variant="outline" 
                className="w-full max-w-xs justify-start gap-2 h-auto py-4 px-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-white"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <span>←</span>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Back</div>
                  <div className="font-bold">Previous Page</div>
                </div>
              </Button>
            ) : previousLesson ? (
              <Link href={`/courses/${courseId}/lessons/${previousLesson.id}`} className="flex-1 max-w-xs">
                <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4 px-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-white">
                  <span>←</span>
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Previous</div>
                    <div className="font-bold truncate">{previousLesson.title}</div>
                  </div>
                </Button>
              </Link>
            ) : <div className="flex-1 max-w-xs" />}

            {/* Right Side */}
            {currentPage < totalPages - 1 ? (
              <Button 
                className="w-full max-w-xs justify-end gap-2 h-auto py-4 px-6 rounded-2xl bg-indigo-600 dark:bg-red-700 hover:bg-indigo-700 dark:hover:bg-red-600 text-white shadow-xl shadow-indigo-200 dark:shadow-red-900/20 border-b-4 border-indigo-800 dark:border-red-900 active:border-b-0 active:translate-y-1 transition-all"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <div className="text-right">
                  <div className="text-[10px] text-indigo-200 dark:text-red-200 uppercase tracking-wider font-bold">Continue</div>
                  <div className="font-bold">Next Page</div>
                </div>
                <span>→</span>
              </Button>
            ) : nextLesson ? (
              <Link href={`/courses/${courseId}/lessons/${nextLesson.id}`} className="flex-1 max-w-xs">
                <Button className="w-full justify-end gap-2 h-auto py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-xl border-b-4 border-black active:border-b-0 active:translate-y-1 transition-all">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Next Lesson</div>
                    <div className="font-bold truncate">{nextLesson.title}</div>
                  </div>
                  <span>→</span>
                </Button>
              </Link>
            ) : isLastLesson ? (
              <Link href={`/courses/${courseId}`} className="flex-1 max-w-xs">
                <Button className="w-full bg-green-600 hover:bg-green-500 h-auto py-4 px-6 rounded-2xl text-white shadow-xl border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all">
                  ✓ Complete Course
                </Button>
              </Link>
            ) : <div className="flex-1 max-w-xs" />}
          </div>

          {/* Mobile Navigation */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 md:hidden z-30 flex gap-3">
             <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl font-bold border-2 dark:border-slate-700 dark:text-white"
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
              >
                ← Prev
              </Button>
              
              {currentPage < totalPages - 1 ? (
                <Button 
                  className="flex-[2] h-12 rounded-xl font-bold bg-indigo-600 dark:bg-red-600 hover:bg-indigo-700 dark:hover:bg-red-500 text-white shadow-lg"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next →
                </Button>
              ) : (
                 <Link href={nextLesson ? `/courses/${courseId}/lessons/${nextLesson.id}` : `/courses/${courseId}`} className="flex-[2]">
                    <Button className="w-full h-12 rounded-xl font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg">
                      {nextLesson ? 'Next Lesson' : 'Finish'}
                    </Button>
                 </Link>
              )}
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
