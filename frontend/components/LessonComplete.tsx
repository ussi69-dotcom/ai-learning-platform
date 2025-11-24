'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

interface LessonCompleteProps {
  lessonId: number;
  courseId: number;
  onComplete?: () => void;
}

export default function LessonComplete({ lessonId, courseId, onComplete }: LessonCompleteProps) {
  const { token } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already completed
    const checkStatus = async () => {
      if (!token) return;
      try {
        const res = await fetch('http://localhost:8000/users/me/progress', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const progress = await res.json();
          const completed = progress.some((p: any) => p.lesson_id === lessonId);
          setIsCompleted(completed);
        }
      } catch (err) {
        console.error('Failed to check progress', err);
      }
    };
    checkStatus();
  }, [lessonId, token]);

  const handleComplete = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/lessons/${lessonId}/complete`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        setIsCompleted(true);
        triggerConfetti();
        if (onComplete) onComplete();
      }
    } catch (err) {
      console.error('Failed to complete lesson', err);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  if (isCompleted) {
    return (
      <div className="mt-8 p-6 bg-secondary/10 border border-secondary/20 rounded-xl text-center animate-fade-in">
        <div className="text-4xl mb-2">🎉</div>
        <h3 className="text-xl font-bold text-secondary mb-1">Lesson Completed!</h3>
        <p className="text-secondary/80">Great job! You're making progress.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 flex justify-center">
      <button
        onClick={handleComplete}
        disabled={isLoading}
        className={`
          px-8 py-4 rounded-full text-lg font-bold shadow-lg transform transition-all duration-200
          ${isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:scale-105 hover:shadow-xl active:scale-95'}
        `}
      >
        {isLoading ? 'Marking...' : 'Mark as Complete ✅'}
      </button>
    </div>
  );
}
