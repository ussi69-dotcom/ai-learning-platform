"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import axios from "axios";
import LabBadge from "./mdx/LabBadge"; 

export interface QuizQuestion {
  id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation: string;
  order: number;
}

interface QuizProps {
  quizzes: QuizQuestion[];
  onComplete?: (score: number) => void;
}

export default function Quiz({ quizzes, onComplete }: QuizProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [storedScore, setStoredScore] = useState<number | null>(null); // 0-100
  
  const { token, refreshUser } = useAuth();
  const params = useParams();
  const lessonId = parseInt(params.lessonId as string);

  // Check initial status
  useEffect(() => {
    if (!token || !lessonId) return;
    const checkStatus = async () => {
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const res = await axios.get(`${API_BASE}/users/me/progress`, {
               headers: { Authorization: `Bearer ${token}` }
            });
            const progress = res.data.find((p: any) => p.lesson_id === lessonId);
            
            if (progress && progress.quiz_score !== null && progress.quiz_score !== undefined) {
                setStoredScore(progress.quiz_score);
                setSubmitted(true);
            }
        } catch (e) {
            console.error("Failed to check quiz status", e);
        }
    };
    checkStatus();
  }, [token, lessonId]);

  // Reset state when quizzes change
  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
    setShowBadge(false);
    setStoredScore(null);
  }, [quizzes]);

  const handleAnswer = (quizId: number, answer: string) => {
    if (!submitted) {
      setAnswers({ ...answers, [quizId]: answer });
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizzes.forEach(quiz => {
      if (answers[quiz.id] === quiz.correct_answer) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length === quizzes.length) {
      setSubmitted(true);
      const correct = calculateScore();
      const percentage = Math.round((correct / quizzes.length) * 100);
      
      if (token && lessonId) {
        try {
          const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
          await axios.post(`${API_BASE}/lessons/${lessonId}/quiz/complete`, 
            { score: percentage },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          refreshUser();
        } catch (e) {
          console.error("Failed to save quiz score", e);
        }
      }

      if (percentage >= 70) {
        setShowBadge(true);
      }

      if (onComplete) {
        onComplete(correct);
      }
    } else {
      alert("Please answer all questions before submitting!");
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowBadge(false);
    setStoredScore(null);
  };

  if (quizzes.length === 0) {
    return null; // No quiz for this lesson
  }

  // Logic: If storedScore is present, use it. Otherwise calculate from current answers.
  const percentage = storedScore !== null ? storedScore : (submitted ? Math.round((calculateScore() / quizzes.length) * 100) : 0);
  // Reverse engineer correct count from percentage if restored
  const correctCount = storedScore !== null ? Math.round((storedScore / 100) * quizzes.length) : (submitted ? calculateScore() : 0);

  return (
    <div className="mt-16 border-t border-border pt-12 relative">
      {showBadge && (
        <LabBadge 
          title="Quiz Master" 
          onClose={() => setShowBadge(false)}
          type="lesson"
          xp={50}
        />
      )}
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-foreground">Test Your Knowledge 🧠</h2>
        <p className="text-muted-foreground">
          Answer all {quizzes.length} questions to see how well you understood this lesson!
        </p>
      </div>

      {submitted && (
        <div className="p-6 mb-8 glass-panel rounded-xl text-center animate-in fade-in zoom-in duration-300">
            <h3 className="text-2xl font-bold mb-2 text-primary">
              Your Score: {correctCount}/{quizzes.length} ({percentage}%)
            </h3>
            <p className="text-lg mb-4 text-foreground">
              {percentage >= 80 ? "🎉 Excellent work!" :
               percentage >= 60 ? "✅ Good job!" :
               "📚 Keep practicing!"}
            </p>
            {/* Only show 'Try Again' if score is low */}
            {percentage < 70 && (
              <Button onClick={handleReset} variant="outline">
                Try Again
              </Button>
            )}
        </div>
      )}

      <div className="space-y-8">
        {quizzes.map((quiz, index) => {
          const userAnswer = answers[quiz.id];
          const isCorrect = submitted && userAnswer === quiz.correct_answer;
          const isWrong = submitted && userAnswer && userAnswer !== quiz.correct_answer;

          return (
            <div key={quiz.id} className={`p-6 rounded-xl glass-panel transition-all duration-300 ${
              submitted && isCorrect ? 'border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]' :
              submitted && isWrong ? 'border-destructive/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' :
              'hover:border-primary/30'
            }`}>
              <h3 className="text-lg font-bold mb-4 text-foreground">
                Question {index + 1}: {quiz.question}
              </h3>

              <div className="space-y-3 mb-4">
                {['A', 'B', 'C', 'D'].map(option => {
                  const optionText = quiz[`option_${option.toLowerCase()}` as keyof QuizQuestion] as string;
                  const isSelected = userAnswer === option;
                  const isCorrectAnswer = quiz.correct_answer === option;

                  let buttonStyle = "border-border hover:bg-accent hover:text-accent-foreground"; // Default
                  
                  if (submitted) {
                    if (isCorrectAnswer) buttonStyle = "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
                    else if (isSelected && !isCorrectAnswer) buttonStyle = "border-destructive bg-destructive/10 text-destructive dark:text-red-400";
                    else buttonStyle = "border-border opacity-50";
                  } else if (isSelected) {
                    buttonStyle = "border-primary bg-primary/10 text-primary ring-1 ring-primary/20";
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswer(quiz.id, option)}
                      disabled={submitted}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${buttonStyle} ${submitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <span className="font-semibold">{option}.</span> {optionText}
                      {submitted && isCorrectAnswer && (
                        <span className="ml-2 text-green-600 dark:text-green-400">✓ Correct</span>
                      )}
                      {submitted && isSelected && !isCorrectAnswer && (
                        <span className="ml-2 text-destructive">✗ Wrong</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="mt-4 p-4 rounded bg-muted/50 border-l-4 border-primary">
                  <p className="text-sm font-semibold text-primary mb-1">Explanation:</p>
                  <p className="text-sm text-muted-foreground">{quiz.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div className="mt-8 text-center">
          <Button 
            onClick={handleSubmit}
            size="lg"
            disabled={Object.keys(answers).length < quizzes.length}
            className="w-full sm:w-auto min-w-[200px]"
          >
            Submit Quiz ({Object.keys(answers).length}/{quizzes.length} answered)
          </Button>
        </div>
      )}
    </div>
  );
}