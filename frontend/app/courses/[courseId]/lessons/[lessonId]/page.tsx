"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";
import { use, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LessonPage({ params }: { params: Promise<{ courseId: string; lessonId: string }> }) {
  // Unwrap params Promise (Next.js 16 requirement)
  const { courseId, lessonId } = use(params);
  
  const { token } = useAuth();
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
  const [allLessons, setAllLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Find current lesson index and neighbors
  const currentIndex = allLessons.findIndex(l => l.id === parseInt(lessonId));
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const isLastLesson = currentIndex === allLessons.length - 1;

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        {/* Navigace zpět */}
        <div className="mb-8">
          <Link href={`/courses/${courseId}`}>
            <Button variant="outline" className="gap-2 pl-0 hover:pl-2 transition-all">
               &larr; Zpět na osnovu kurzu
            </Button>
          </Link>
        </div>

        {/* Hlavička Lekce */}
        <div className="space-y-4 mb-12 border-b pb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-widest font-bold">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded">Lekce {lesson.order}</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{lesson.title}</h1>
          <p className="text-xl text-muted-foreground">{lesson.description}</p>
        </div>

        {/* 🎥 Video Player (Youtube Embed) */}
        {lesson.video_url && (
          <div className="mb-12 aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              {/* Jednoduchý parser pro YouTube embed (nahradí watch?v= za embed/) */}
              <iframe 
                  className="w-full h-full"
                  src={lesson.video_url} 
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
              />
          </div>
        )}

        {/* 📝 Obsah lekce (simple markdown rendering) */}
        <article className="prose prose-slate lg:prose-lg dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap">{lesson.content}</div>
        </article>


        {/* Footer navigace (Next/Prev by se řešilo tady) */}
        <div className="mt-16 pt-8 border-t flex justify-between items-center">
            {previousLesson ? (
              <Link href={`/courses/${courseId}/lessons/${previousLesson.id}`}>
                <Button variant="outline" className="gap-2">
                  ← Předchozí: {previousLesson.title}
                </Button>
              </Link>
            ) : (
              <Button variant="outline" disabled>
                ← Předchozí
              </Button>
            )}

            {nextLesson ? (
              <Link href={`/courses/${courseId}/lessons/${nextLesson.id}`}>
                <Button className="gap-2">
                  Další: {nextLesson.title} →
                </Button>
              </Link>
            ) : isLastLesson ? (
              <Link href={`/courses/${courseId}`}>
                <Button className="gap-2 bg-green-600 hover:bg-green-700">
                  ✓ Dokončit kurz
                </Button>
              </Link>
            ) : (
              <Button disabled>
                Další →
              </Button>
            )}
        </div>
      </div>
    </ProtectedRoute>
  );
}