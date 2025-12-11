"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import confetti from "canvas-confetti";
import LabBadge from "./mdx/LabBadge";

interface LessonCompleteProps {
  lessonId: number;
  courseId: number;
  lessonTitle?: string;
  onComplete?: () => void;
}

export default function LessonComplete({
  lessonId,
  courseId,
  lessonTitle = "This Lesson",
  onComplete,
}: LessonCompleteProps) {
  const { token } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    // Check if already completed
    const checkStatus = async () => {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:8000/users/me/progress", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const progress = await res.json();
          const completed = progress.some((p: any) => p.lesson_id === lessonId);
          setIsCompleted(completed);
        }
      } catch (err) {
        console.error("Failed to check progress", err);
      }
    };
    checkStatus();
  }, [lessonId, token]);

  const handleComplete = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/lessons/${lessonId}/complete`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setIsCompleted(true);
        setShowBadge(true);
        if (onComplete) onComplete();
      }
    } catch (err) {
      console.error("Failed to complete lesson", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isCompleted && !showBadge) {
    return (
      <div className="mt-8 p-6 bg-violet-500/10 border border-violet-500/20 rounded-xl text-center animate-fade-in glass-panel">
        <div className="text-4xl mb-2">🎉</div>
        <h3 className="text-xl font-bold text-violet-600 mb-1">
          Lesson Completed!
        </h3>
        <p className="text-muted-foreground">
          Great job! You're making progress.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 flex justify-center relative">
      {showBadge && (
        <LabBadge
          title={lessonTitle}
          onClose={() => setShowBadge(false)}
          type="lesson"
          xp={100}
        />
      )}

      {!isCompleted && (
        <button
          onClick={handleComplete}
          disabled={isLoading}
          className={`
            px-8 py-4 rounded-full text-lg font-bold shadow-lg transform transition-all duration-200
            ${
              isLoading
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-500 hover:scale-105 hover:shadow-xl active:scale-95 hover:shadow-green-500/20 " +
                  "dark:bg-yellow-500 dark:text-yellow-950 dark:hover:bg-yellow-400 dark:hover:shadow-yellow-500/20" /* Sith Gold */
            }
          `}
        >
          {isLoading ? "Marking..." : "Mark as Complete ✅"}
        </button>
      )}
    </div>
  );
}
