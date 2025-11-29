"use client";

import { Link } from '@/i18n/routing';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axios from 'axios';
import CourseIcon from "@/components/CourseIcon";
import FeedbackFAB from "@/components/FeedbackFAB";
import FeedbackSubmissionModal from "@/components/FeedbackSubmissionModal";
import FeedbackDetailModal from "@/components/FeedbackDetailModal";
import FeedbackMarker from "@/components/FeedbackMarker";
import DifficultyIcon from "@/components/DifficultyIcon";
import { useLocale, useTranslations } from 'next-intl';
import { Rocket, Info } from 'lucide-react';

type FeedbackMode = 'idle' | 'placing' | 'viewing';

// Difficulty level labels (without emojis)
const DIFFICULTY_LABELS: Record<string, string> = {
  PIECE_OF_CAKE: "Piece of Cake",
  LETS_ROCK: "Let's Rock",
  COME_GET_SOME: "Come Get Some",
  DAMN_IM_GOOD: "Damn I'm Good"
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
  
  const locale = useLocale();
  const t = useTranslations('Common');
  const tAuth = useTranslations('Auth');
  const tAbout = useTranslations('About');
  const tNav = useTranslations('Navigation');

  // Feedback State
  const [feedbackMode, setFeedbackMode] = useState<FeedbackMode>('idle');
  const [feedbackToPlace, setFeedbackToPlace] = useState<{ x: number; y: number } | null>(null);
  const [feedbackItems, setFeedbackItems] = useState<any[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);


  useEffect(() => {
    async function fetchCourses() {
      if (!token) {
        setLoadingCourses(false);
        return;
      }

      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const response = await axios.get(`${API_BASE}/courses/`, {
          params: { lang: locale },
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
  }, [token, isLoading, locale]);

  // Fetch Global Feedback
  useEffect(() => {
    if (feedbackMode !== 'viewing' || !token) return;

    const fetchFeedback = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await axios.get(`${API_BASE}/feedback`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        setFeedbackItems(res.data);
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      }
    };

    fetchFeedback();
  }, [feedbackMode, token]);

  const handlePlaceFeedback = (x: number, y: number) => {
    setFeedbackToPlace({ x, y });
    setFeedbackMode('idle');
  };

  const handleVote = async (id: number, direction: 'up' | 'down') => {
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      await axios.post(`${API_BASE}/feedback/${id}/vote`, null, {
        params: { direction },
        headers: { "Authorization": `Bearer ${token}` }
      });
      // Refresh
      const res = await axios.get(`${API_BASE}/feedback`, {
          headers: { "Authorization": `Bearer ${token}` }
      });
      setFeedbackItems(res.data);
      if (selectedFeedback && selectedFeedback.id === id) {
         const updated = res.data.find((i: any) => i.id === id);
         setSelectedFeedback(updated);
      }
    } catch (error) {
      console.error("Vote failed:", error);
    }
  };

  const handleReply = async (parentId: number, message: string) => {
     try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const parent = feedbackItems.find(i => i.id === parentId) || selectedFeedback;
      if (!parent) return;

      await axios.post(`${API_BASE}/feedback/${parentId}/reply`, {
        lesson_id: parent.lesson_id,
        slide_index: parent.slide_index,
        x_pos: parent.x_pos,
        y_pos: parent.y_pos,
        type: parent.type,
        message: message,
        parent_id: parentId
      }, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      // Refresh
      const res = await axios.get(`${API_BASE}/feedback`, {
          headers: { "Authorization": `Bearer ${token}` }
      });
      setFeedbackItems(res.data);
      if (selectedFeedback && selectedFeedback.id === parentId) {
         const updated = res.data.find((i: any) => i.id === parentId);
         setSelectedFeedback(updated);
      }
    } catch (error) {
      console.error("Reply failed:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      await axios.delete(`${API_BASE}/feedback/${id}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      // Refresh
      const res = await axios.get(`${API_BASE}/feedback`, {
          headers: { "Authorization": `Bearer ${token}` }
      });
      setFeedbackItems(res.data);
      if (selectedFeedback && selectedFeedback.id === id) {
        setSelectedFeedback(null);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (isLoading || loadingCourses || loadingResume) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground relative" id="lesson-content-container">
      {/* Hero Sekce */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-card/50 border-b border-border relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
           <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[100px]" />
        </div>

        <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
            <Rocket className="w-4 h-4" />
            <span>{tAbout('hero_subtitle')}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 dark:bg-gradient-to-br dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent drop-shadow-sm">
            {tAbout('hero_title')}
          </h1>
          
          <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl mb-8 leading-relaxed">
            {tAbout('hero_desc')}
          </p>

          {user && (
            <p className="text-sm text-muted-foreground mb-8 bg-card/50 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border">
              {locale === 'cs' ? 'Vaše obtížnost: ' : 'Your difficulty: '}
              <span className="font-semibold text-purple-600 dark:text-red-500 flex items-center gap-1">
                <DifficultyIcon level={user.difficulty} size={16} />
                {DIFFICULTY_LABELS[user.difficulty]}
              </span>
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             {!user ? (
               <>
                 <Link href="/login">
                   <Button size="lg" className="w-full sm:w-auto bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 hover:opacity-90 transition-opacity text-white dark:bg-none dark:bg-primary dark:text-primary-foreground border-none">{tAuth('submit_login')}</Button>
                 </Link>
                 <Link href="/register">
                   <Button size="lg" className="w-full sm:w-auto bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 hover:opacity-90 transition-opacity text-white dark:bg-none dark:bg-transparent dark:border dark:border-input dark:hover:bg-accent dark:hover:text-accent-foreground">{tAuth('submit_register')}</Button>
                 </Link>
               </>
             ) : (
                lastLesson ? (
                    <Link href={`/courses/${lastLesson.course_id}/lessons/${lastLesson.lesson_id}`}>
                        <Button size="lg" className='gap-2 w-full sm:w-auto shadow-lg shadow-purple-500/20 bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 hover:opacity-90 text-white dark:bg-none dark:bg-red-600 dark:hover:bg-red-700 border-none'>
                          {locale === 'cs' ? 'Pokračovat v učení' : 'Resume Learning'} <Rocket size={18} className="text-white" />
                        </Button>
                    </Link>
                ) : courses.length > 0 ? (
                    <Link href={`/courses/${courses[0].id}`}>
                      <Button size="lg" className='gap-2 w-full sm:w-auto shadow-lg shadow-purple-500/20 bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 hover:opacity-90 text-white dark:bg-none dark:bg-red-600 dark:hover:bg-red-700 border-none'>
                        {locale === 'cs' ? 'Začít s učením' : 'Start Learning'} <Rocket size={18} className="text-white" />
                      </Button>
                    </Link>
                ) : (
                    <Button size="lg" disabled>{locale === 'cs' ? 'Žádné kurzy' : 'No courses available'}</Button>
                )
             )}
             
             <Link href="/about">
                <Button variant="ghost" size="lg" className="gap-2 w-full sm:w-auto">
                  <Info size={18} /> {tNav('about')}
                </Button>
             </Link>
          </div>
        </div>
      </section>

      {/* Seznam Kurzů */}
      <section className="w-full py-12 md:py-24 container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            {user ? (
              <span className="flex items-center gap-2">
                {locale === 'cs' ? 'Kurzy pro ' : 'Courses for '}
                <span className="inline-flex items-center gap-1 text-purple-600 dark:text-red-500">
                   <DifficultyIcon level={user.difficulty} size={24} />
                   {DIFFICULTY_LABELS[user.difficulty]}
                </span>
              </span>
            ) : (locale === 'cs' ? "Dostupné kurzy" : "Available Courses")}
          </h2>
          
          {error && (
            <div className="p-4 border border-destructive bg-destructive/10 text-destructive rounded-lg mb-6">
              {error}
            </div>
          )}

          {!user ? (
            <div className="col-span-3 p-12 border-2 border-dashed border-border rounded-xl text-center text-muted-foreground glass-panel">
              <p className="text-lg mb-2">{locale === 'cs' ? 'Pro zobrazení kurzů se prosím přihlaste' : 'Please login to see courses'}</p>
              <p className="text-sm">{locale === 'cs' ? 'Kurzy jsou personalizované podle vaší obtížnosti' : 'Courses are personalized based on your difficulty level'}</p>
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
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                           <CourseIcon courseId={course.id} slug={course.slug} imageUrl={course.image_url} objectFit="cover" />
                        </div>
                        <span className="absolute top-3 right-3 text-[10px] font-bold bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded-full border border-white/10 flex items-center gap-1">
                          <DifficultyIcon level={course.difficulty_level} size={12} className="text-white" />
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
                        <Button size="sm" className="bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 hover:opacity-90 text-white dark:bg-none dark:bg-red-600 dark:hover:bg-red-700 border-none">
                           {locale === 'cs' ? 'Začít kurz →' : 'Start Course →'}
                         </Button>
                      </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 p-12 border-2 border-dashed border-border rounded-xl text-center text-muted-foreground glass-panel">
                  <p>{locale === 'cs' ? 'Pro vaši obtížnost zatím nejsou dostupné žádné kurzy.' : 'No courses available for your difficulty level yet.'}</p>
                  <p className="text-sm mt-2">{locale === 'cs' ? 'Zkuste to brzy znovu!' : 'Check back soon!'}</p>
                </div>
              )}
            </div>
          )}
      </section>

      {/* Feedback System */}
      {user && (
        <>
          <FeedbackFAB 
            onModeChange={setFeedbackMode} 
            currentMode={feedbackMode} 
            onPlaceFeedback={(x, y) => handlePlaceFeedback(x, y)}
            lessonId={0} // Dummy or ignored
            slideIndex={0} // Dummy or ignored
          />

          <FeedbackSubmissionModal 
            isOpen={feedbackToPlace !== null}
            onClose={() => {
              setFeedbackToPlace(null);
              setFeedbackMode('idle');
            }}
            onSubmitSuccess={() => {
              setFeedbackToPlace(null);
              setFeedbackMode('idle');
            }}
            x={feedbackToPlace?.x || 0}
            y={feedbackToPlace?.y || 0}
          />

          <FeedbackDetailModal 
            isOpen={selectedFeedback !== null}
            onClose={() => setSelectedFeedback(null)}
            feedbackItem={selectedFeedback}
            onVote={handleVote}
            onReply={handleReply}
            onDelete={handleDelete}
            onUpdate={() => {}} 
          />

          {/* Markers */}
          {feedbackMode === 'viewing' && (
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden h-full w-full">
                 {feedbackItems.map((item) => (
                    <div key={item.id} className="pointer-events-auto">
                      <FeedbackMarker 
                        x={item.x_pos} 
                        y={item.y_pos} 
                        type={item.type} 
                        message={item.message} 
                        author={item.author}
                        isResolved={item.is_resolved}
                        onClick={() => setSelectedFeedback(item)}
                      />
                    </div>
                 ))}
              </div>
            )}
        </>
      )}
    </div>
  )
}