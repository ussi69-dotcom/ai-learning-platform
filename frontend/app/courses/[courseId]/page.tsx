"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";
import { use, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  // Unwrap params Promise (Next.js 16 requirement)
  const { courseId } = use(params);
  
  const { token } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [progress, setProgress] = useState<any>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Fetch course with auth token
        const courseRes = await fetch(`http://localhost:8000/courses/${courseId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (courseRes.ok) {
          setCourse(await courseRes.json());
        }

        // Fetch lessons with auth token
        const lessonsRes = await fetch(`http://localhost:8000/lessons/`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (lessonsRes.ok) {
          const allLessons = await lessonsRes.json();
          const filtered = allLessons
            .filter((l: any) => l.course_id === parseInt(courseId))
            .sort((a: any, b: any) => a.order - b.order);
          setLessons(filtered);
        }

        // Fetch progress
        const progressRes = await fetch(`http://localhost:8000/courses/${courseId}/progress`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (progressRes.ok) {
          setProgress(await progressRes.json());
        }

        // Fetch completed lessons
        const userProgressRes = await fetch(`http://localhost:8000/users/me/progress`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (userProgressRes.ok) {
          const userProgress = await userProgressRes.json();
          setCompletedLessonIds(userProgress.map((p: any) => p.lesson_id));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [courseId, token]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 dark:border-red-500 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return <div className="p-12 text-center text-slate-500">Course not found 😢</div>;
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-12 px-4 max-w-4xl bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen">
        {/* Header */}
        <div className="mb-12 text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{course.title}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">{course.description}</p>
          
          {/* Progress Bar */}
          {progress && (
            <div className="max-w-md mx-auto mt-4">
              <div className="flex justify-between text-sm mb-1 text-slate-600 dark:text-slate-400">
                <span className="font-medium">Course Progress</span>
                <span className="font-bold text-indigo-600 dark:text-red-500">{progress.percentage}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 dark:bg-red-600 h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${progress.percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {progress.completed} of {progress.total} lessons completed
              </p>
            </div>
          )}
          
          <div className="flex justify-center gap-4">
            {/* Button 1: Start Learning */}
            <Link href={`/courses/${courseId}/lessons/${lessons[0]?.id || 1}`}>
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-red-600 dark:hover:bg-red-700">
                Start Learning 🚀
              </Button>
            </Link>

            {/* Button 2: Back to Overview */}
            <Link href="/">
              <Button variant="outline" size="lg" className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300">
                Back to Overview
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Lesson List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">Course Outline</h2>
          {lessons.length === 0 ? (
            <p className="text-slate-600 dark:text-slate-400">No lessons yet.</p>
          ) : (
            lessons.map((lesson: any) => (
              <Card key={lesson.id} className="group hover:border-indigo-500 dark:hover:border-red-500 transition-colors">
                <Link href={`/courses/${courseId}/lessons/${lesson.id}`} className="flex items-center p-6">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold mr-6 transition-colors ${
                    completedLessonIds.includes(lesson.id)
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-slate-700'
                  }`}>
                    {completedLessonIds.includes(lesson.id) ? '✓' : lesson.order}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold group-hover:text-indigo-600 dark:group-hover:text-red-500 transition-colors text-slate-900 dark:text-white">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                      {lesson.description}
                    </p>
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                     Start &rarr;
                  </div>
                </Link>
              </Card>
            ))
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
