"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

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
  description: string;
  image_url?: string;
  difficulty_level: string;
  owner_id: number;
}

export default function HomePage() {
  const { user, token, isLoading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/courses/", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          setError("Failed to load courses");
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to connect to backend");
      } finally {
        setLoading(false);
      }
    }

    if (!isLoading) {
      fetchCourses();
    }
  }, [token, isLoading]);

  if (isLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      {/* Hero Sekce */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 border-b">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
            AI Learning Platform
          </h1>
          <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl mb-4">
            Learning by doing. Postaveno na Next.js 16 + FastAPI.
          </p>
          {user && (
            <p className="text-sm text-slate-500 mb-8">
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
             ) : courses.length > 0 ? (
                <Link href={`/courses/${courses[0].id}`}>
                  <Button size="lg" className='gap-2'>
                    Start Learning 🚀
                  </Button>
                </Link>
             ) : (
                <Button size="lg" disabled>No courses available</Button>
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
            <div className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-lg mb-6">
              {error}
            </div>
          )}

          {!user ? (
            <div className="col-span-3 p-12 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-500">
              <p className="text-lg mb-2">Please login to see courses</p>
              <p className="text-sm">Courses are personalized based on your difficulty level</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <Card key={course.id} className="border-2 border-slate-200 hover:border-primary/50 transition-colors group">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-semibold">
                          {DIFFICULTY_LABELS[course.difficulty_level]}
                        </span>
                      </div>
                      <CardTitle className="flex items-center gap-2">
                        <Link href={`/courses/${course.id}`} className="hover:underline">
                          {course.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-4 text-sm min-h-[40px] line-clamp-3">
                        {course.description || "No description"}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xs text-slate-400">ID: {course.id}</span>
                        
                      <Link href={`/courses/${course.id}`}>
                        <Button variant="outline" size="sm">
                           Detail
                         </Button>
                      </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 p-12 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-500">
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