"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";
import { use, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import CourseIcon from "@/components/CourseIcon";
import LessonIcon from "@/components/LessonIcon";
import FeedbackFAB from "@/components/FeedbackFAB";
import FeedbackSubmissionModal from "@/components/FeedbackSubmissionModal";
import FeedbackDetailModal from "@/components/FeedbackDetailModal";
import FeedbackMarker from "@/components/FeedbackMarker";
import { Rocket } from "lucide-react";

type FeedbackMode = 'idle' | 'placing' | 'viewing';

export default function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  // Unwrap params Promise (Next.js 16 requirement)
  const { courseId } = use(params);
  
  const { token } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [progress, setProgress] = useState<any>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Feedback State
  const [feedbackMode, setFeedbackMode] = useState<FeedbackMode>('idle');
  const [feedbackToPlace, setFeedbackToPlace] = useState<{ x: number; y: number } | null>(null);
  const [feedbackItems, setFeedbackItems] = useState<any[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

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

  // Fetch feedback when entering viewing mode
  useEffect(() => {
    if (feedbackMode === 'viewing' && token) {
      const fetchFeedback = async () => {
        try {
          // Use lessonId=0 and slideIndex=-1 for generic course feedback
          const res = await fetch(`http://localhost:8000/feedback/?lesson_id=0&slide_index=-1`, {
            headers: { "Authorization": `Bearer ${token}` }
          });
          if (res.ok) {
            setFeedbackItems(await res.json());
          }
        } catch (error) {
          console.error("Error fetching feedback:", error);
        }
      };
      fetchFeedback();
    }
  }, [feedbackMode, token]);

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
      <div id="course-content-container" className="container mx-auto py-12 px-4 max-w-4xl bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen relative">
        {/* Header */}
        <div className="mb-12 text-center space-y-6">
          <div className="w-[512px] h-[512px] mx-auto mb-6 animate-in zoom-in-50 duration-500">
             <CourseIcon courseId={course.id} slug={course.slug} imageUrl={course.image_url} objectFit="contain" />
          </div>
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
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-red-600 dark:hover:bg-red-700 flex items-center gap-2">
                Start Learning <Rocket size={18} className="text-white" />
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
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mr-6 transition-colors duration-300 ${
                    completedLessonIds.includes(lesson.id)
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-slate-700'
                  }`}>
                    <LessonIcon 
                      title={lesson.title} 
                      completed={completedLessonIds.includes(lesson.id)} 
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="flex-grow min-w-0 pr-4">
                    <h3 className="text-lg font-semibold group-hover:text-indigo-600 dark:group-hover:text-red-500 transition-colors text-slate-900 dark:text-white">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {lesson.description}
                    </p>
                    {/* Metadata Row */}
                    <div className="flex items-center gap-4 mt-3 text-xs font-medium text-slate-500 dark:text-slate-500">
                      <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                        <span>⏳</span> {lesson.duration || "15 min"}
                      </span>
                      <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                        <span>🧪</span> {lesson.lab_count || 0} Labs
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-mono whitespace-nowrap flex-shrink-0 self-center">
                     Start &rarr;
                  </div>
                </Link>
              </Card>
            ))
          )}
        </div>

        {/* Feedback FAB */}
        <FeedbackFAB 
          onModeChange={setFeedbackMode}
          currentMode={feedbackMode}
          onPlaceFeedback={(x, y) => {
             setFeedbackToPlace({ x, y });
             setFeedbackMode('idle'); // Close FAB, modal will open
          }}
          lessonId={0} // 0 for Course Overview
          slideIndex={-1} // -1 for Course Overview
        />

        {/* Feedback Markers (Viewing Mode) */}
        {feedbackMode === 'viewing' && feedbackItems.map((item) => (
           <FeedbackMarker
             key={item.id}
             x={item.x_pos} // Corrected from x_position
             y={item.y_pos} // Corrected from y_position
             type={item.type}
             isResolved={item.is_resolved} // Corrected from resolved
             message={item.message}
             onClick={() => setSelectedFeedback(item)}
             author={item.author}
           />
        ))}

        {/* Submission Modal */}
        {feedbackToPlace && (
           <FeedbackSubmissionModal
             isOpen={!!feedbackToPlace}
             x={feedbackToPlace.x}
             y={feedbackToPlace.y}
             lessonId={0}
             slideIndex={-1}
             onClose={() => setFeedbackToPlace(null)}
             onSubmitSuccess={() => { // Corrected from onSubmit
                setFeedbackToPlace(null);
                // Refresh feedback
                const fetchFeedback = async () => {
                   try {
                     const res = await fetch(`http://localhost:8000/feedback/?lesson_id=0&slide_index=-1`, {
                        headers: { "Authorization": `Bearer ${token}` }
                     });
                     if (res.ok) setFeedbackItems(await res.json());
                   } catch (e) { console.error(e); }
                };
                fetchFeedback();
             }}
           />
        )}

        {/* Detail Modal */}
        {selectedFeedback && (
           <FeedbackDetailModal
             isOpen={!!selectedFeedback}
             feedbackItem={selectedFeedback}
             onClose={() => setSelectedFeedback(null)}
             onVote={async (id, type) => {
                 // Optimistic update
                 setFeedbackItems(prev => prev.map(i => i.id === id ? { ...i, votes: type === 'up' ? i.votes + 1 : i.votes - 1, user_vote: type } : i));
                 // Actual API call would go here
             }}
             onDelete={async (id) => {
                 try {
                    await fetch(`http://localhost:8000/feedback/${id}`, {
                       method: 'DELETE',
                       headers: { "Authorization": `Bearer ${token}` }
                    });
                    setFeedbackItems(prev => prev.filter(i => i.id !== id));
                    setSelectedFeedback(null);
                 } catch (e) { console.error(e); }
             }}
             onReply={async () => {
                // Refresh feedback to get new reply
                const res = await fetch(`http://localhost:8000/feedback/?lesson_id=0&slide_index=-1`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.ok) setFeedbackItems(await res.json());
             }}
             onUpdate={async (id, message, type) => {
                 setFeedbackItems(prev => prev.map(i => i.id === id ? { ...i, message, type } : i));
             }}
           />
        )}

      </div>
    </ProtectedRoute>
  );
}
