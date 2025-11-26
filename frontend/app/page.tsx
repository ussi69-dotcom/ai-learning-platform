"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axios from 'axios';
import CourseIcon from "@/components/CourseIcon";

// Difficulty level labels with emojis
const DIFFICULTY_LABELS: Record<string, string> = {
  PIECE_OF_CAKE: "🍰 Piece of Cake",
  LETS_ROCK: "🎸 Let's Rock",
  COME_GET_SOME: "💪 Come Get Some",
  DAMN_IM_GOOD: "🔥 Damn I'm Good"
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


  useEffect(() => {
    async function fetchCourses() {
      if (!token) {
        setLoadingCourses(false);
        return;
      }

      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const response = await axios.get(`${API_BASE}/courses/`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setCourses(response.data);
        } else {
          setError("Failed to load courses");
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to connect to backend");
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
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const response = await axios.get(`${API_BASE}/users/me/last-lesson`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.status === 200 && response.data) {
                setLastLesson(response.data);
            }
        } catch (err) {
            console.error("Error fetching last lesson:", err);
        } finally {
            setLoadingResume(false);
        }
    }

    if (!isLoading) {
      fetchCourses();
      fetchLastLesson();
    }
  }, [token, isLoading]);

  if (isLoading || loadingCourses || loadingResume) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Hero Sekce */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-card/50 border-b border-border">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
            AI Learning Platform
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mb-4">
            Learning by doing. Postaveno na Next.js 16 + FastAPI.
          </p>
          {user && (
            <p className="text-sm text-muted-foreground mb-8">
              Your difficulty: <span className="font-semibold">{DIFFICULTY_LABELS[user.difficulty]}</span>
            </p>
          )}
          <div className="space-x-4">
             {!user ? (
               <>
                 <Link href="/login">
                   <Button size="lg">Login to Start</Button>
                 </Link>
                 <Link href="/register">
                   <Button size="lg" variant="outline">Register</Button>
                 </Link>
               </>
             ) : (
                lastLesson ? (
                    <Link href={`/courses/${lastLesson.course_id}/lessons/${lastLesson.lesson_id}`}>
                        <Button size="lg" className='gap-2'>
                          Resume Learning 🚀
                        </Button>
                    </Link>
                ) : courses.length > 0 ? (
                    <Link href={`/courses/${courses[0].id}`}>
                      <Button size="lg" className='gap-2'>
                        Start Learning 🚀
                      </Button>
                    </Link>
                ) : (
                    <Button size="lg" disabled>No courses available</Button>
                )
             )}
          </div>
        </div>
      </section>

      {/* Seznam Kurzů */}
      <section className="w-full py-12 md:py-24 container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            {user ? `Courses for ${DIFFICULTY_LABELS[user.difficulty]}` : "Available Courses"}
          </h2>
          
          {error && (
            <div className="p-4 border border-destructive bg-destructive/10 text-destructive rounded-lg mb-6">
              {error}
            </div>
          )}

          {!user ? (
            <div className="col-span-3 p-12 border-2 border-dashed border-border rounded-xl text-center text-muted-foreground glass-panel">
              <p className="text-lg mb-2">Please login to see courses</p>
              <p className="text-sm">Courses are personalized based on your difficulty level</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <Card key={course.id} className="hover:border-primary/50 transition-all duration-300 group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
                    {/* Course Image / Icon Area */}
                    <div className="h-48 w-full bg-gradient-to-br from-slate-900 to-slate-800 relative p-4 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
                        </div>
                        <div className="w-32 h-32 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
                           <CourseIcon courseId={course.id} slug={course.slug} />
                        </div>
                        <span className="absolute top-3 right-3 text-[10px] font-bold bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded-full border border-white/10">
                          {DIFFICULTY_LABELS[course.difficulty_level]}
                        </span>
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">
                        <Link href={`/courses/${course.id}`} className="hover:text-primary transition-colors">
                          {course.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6 text-sm line-clamp-2 h-[40px]">
                        {course.description || "No description available."}
                      </p>
                      <div className="flex justify-between items-center pt-4 border-t border-border/50">
                        <span className="text-xs text-muted-foreground font-mono">ID: {course.id}</span>
                        
                      <Link href={`/courses/${course.id}`}>
                        <Button size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                           Start Course →
                         </Button>
                      </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 p-12 border-2 border-dashed border-border rounded-xl text-center text-muted-foreground glass-panel">
                  <p>No courses available for your difficulty level yet.</p>
                  <p className="text-sm mt-2">Check back soon!</p>
                </div>
              )}
            </div>
          )}
      </section>
    </div>
  )
}