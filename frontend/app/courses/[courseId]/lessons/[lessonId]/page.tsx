"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";
import { use, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Quiz from "@/components/Quiz";

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

            {/* Formatted content */}
            <article className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-slate-900 prose-table:w-full prose-table:border-collapse prose-th:bg-slate-100 prose-th:p-3 prose-th:border prose-th:border-slate-300 prose-td:p-3 prose-td:border prose-td:border-slate-200">
              <div className="whitespace-pre-wrap">
                {currentContent.split('\n').map((line, index) => {
                  // Handle headings
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold mt-0 mb-4">{line.substring(2)}</h1>;
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 first:mt-0">{line.substring(3)}</h2>;
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{line.substring(4)}</h3>;
                  }
                  
                  // Handle tables - detect table rows
                  if (line.includes('|') && line.split('|').length > 2) {
                    const cells = line.split('|').filter(c => c.trim());
                    const isHeaderRow = line.includes('---');
                    
                    if (isHeaderRow) {
                      return null; // Skip separator rows
                    }
                    
                    // Check if this is first row of table (header)
                    const prevLine = currentContent.split('\n')[index - 1] || '';
                    const isFirstRow = !prevLine.includes('|');
                    
                    if (isFirstRow) {
                      // Start a table and render header
                      return (
                        <div key={index} className="my-6 overflow-x-auto">
                          <table className="min-w-full border-collapse border border-slate-300 rounded-lg overflow-hidden">
                            <thead className="bg-slate-100">
                              <tr>
                                {cells.map((cell, i) => (
                                  <th key={i} className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-900">
                                    {cell.trim()}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                          </table>
                        </div>
                      );
                    } else {
                      // Continue table with body rows
                      return (
                        <div key={index} className="-mt-6 mb-6 overflow-x-auto">
                          <table className="min-w-full border-collapse border border-slate-300">
                            <tbody>
                              <tr className="hover:bg-slate-50">
                                {cells.map((cell, i) => (
                                  <td key={i} className="border border-slate-200 px-4 py-3 text-slate-700">
                                    {cell.trim()}
                                  </td>
                                ))}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                  }
                  
                  // Handle bold text
                  if (line.includes('**')) {
                    const parts = line.split('**');
                    return (
                      <p key={index} className="mb-4">
                        {parts.map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)}
                      </p>
                    );
                  }
                  
                  // Handle bullet lists
                  if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
                    return (
                      <li key={index} className="ml-6 mb-2 text-slate-700">
                        {line.trim().substring(1).trim()}
                      </li>
                    );
                  }
                  
                  // Empty lines
                  if (line.trim() === '') {
                    return <br key={index} />;
                  }
                  
                  // Regular paragraphs
                  return <p key={index} className="mb-4 text-slate-700 leading-relaxed">{line}</p>;
                })}
              </div>
            </article>

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
          {currentPage === totalPages - 1 && <Quiz lessonId={lessonId} />}

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