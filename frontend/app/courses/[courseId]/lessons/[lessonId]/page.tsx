"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";
import { use, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Quiz from "@/components/Quiz";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import LessonComplete from "@/components/LessonComplete";

export default function LessonPage({ params }: { params: Promise<{ courseId: string; lessonId: string }> }) {
  // Unwrap params Promise (Next.js 16 requirement)
  const { courseId, lessonId } = use(params);
  
  const { token } = useAuth();
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
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
  const totalPages = slides.length;
  const currentContent = slides[currentPage] || '';

  // Find current lesson index and neighbors
  const currentIndex = allLessons.findIndex(l => l.id === parseInt(lessonId));
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const isLastLesson = currentIndex === allLessons.length - 1;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto py-8 px-4 max-w-4xl">
          {/* Navigation back */}
          <div className="mb-8">
            <Link href={`/courses/${courseId}`}>
              <Button variant="ghost" className="gap-2 -ml-4">
                ← Back to Course
              </Button>
            </Link>
          </div>

          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                Lesson {lesson.order}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-3">{lesson.title}</h1>
            <p className="text-xl text-blue-100">{lesson.description}</p>
          </div>

          {/* Video Section */}
          {lesson.video_url && (
            <div className="mb-12">
              <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-slate-200">
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

          {/* Content with Pagination */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 mb-8">
            {/* Page indicator */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <div className="text-sm text-slate-500">
                  Section {currentPage + 1} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                  >
                    ← Prev
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                    disabled={currentPage === totalPages - 1}
                  >
                    Next →
                  </Button>
                </div>
              </div>
            )}

            {/* Formatted content using MarkdownRenderer */}
            <div className="prose prose-lg prose-slate max-w-none">
              <MarkdownRenderer content={currentContent} />
            </div>

            {/* Bottom pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8 pt-6 border-t">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                      currentPage === i
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quiz Section - only on last page */}
          {currentPage === totalPages - 1 && (
            <>
              <Quiz lessonId={lessonId} />
              <LessonComplete 
                lessonId={parseInt(lessonId)} 
                courseId={parseInt(courseId)} 
              />
            </>
          )}

          {/* Lesson Navigation */}
          <div className="flex justify-between items-center gap-4 mt-12">
            {previousLesson ? (
              <Link href={`/courses/${courseId}/lessons/${previousLesson.id}`} className="flex-1">
                <Button variant="outline" className="w-full justify-start gap-2 group">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span>
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">Previous</div>
                    <div className="font-semibold truncate">{previousLesson.title}</div>
                  </div>
                </Button>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextLesson ? (
              <Link href={`/courses/${courseId}/lessons/${nextLesson.id}`} className="flex-1">
                <Button className="w-full justify-end gap-2 group">
                  <div className="text-right">
                    <div className="text-xs">Next</div>
                    <div className="font-semibold truncate">{nextLesson.title}</div>
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </Link>
            ) : isLastLesson ? (
              <Link href={`/courses/${courseId}`} className="flex-1">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  ✓ Complete Course
                </Button>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}