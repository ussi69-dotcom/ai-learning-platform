"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MDXRemote } from 'next-mdx-remote/rsc'; // Server-side rendering MDX
import { ArrowLeft, PlayCircle } from "lucide-react"; // Ikony (pokud máš lucide-react, jinak smaž)
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LessonPage({ params }: { params: { courseId: string; lessonId: string } }) {
  const { token } = useAuth();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLesson() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:8000/lessons/${params.lessonId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.ok) {
          setLesson(await res.json());
        }
      } catch (error) {
        console.error("Error fetching lesson:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLesson();
  }, [params.lessonId, token]);

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

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        {/* Navigace zpět */}
        <div className="mb-8">
          <Link href={`/courses/${params.courseId}`}>
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
                  src={lesson.video_url.replace("watch?v=", "embed/")} 
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
              />
          </div>
        )}

        {/* 📝 MDX Obsah (Text lekce) */}
        <article className="prose prose-slate lg:prose-lg dark:prose-invert max-w-none">
          {/* Zde se děje magie - renderování Markdownu z DB */}
          <MDXRemote source={lesson.content} />
        </article>

        {/* Footer navigace (Next/Prev by se řešilo tady) */}
        <div className="mt-16 pt-8 border-t flex justify-between">
            <Button variant="outline" disabled>Předchozí</Button>
            <Button>Dokončit a pokračovat &rarr;</Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}