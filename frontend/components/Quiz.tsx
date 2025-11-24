"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

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

  // Reset state when quizzes change
  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
  }, [quizzes]);

  const handleAnswer = (quizId: number, answer: string) => {
    if (!submitted) {
      setAnswers({ ...answers, [quizId]: answer });
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === quizzes.length) {
      setSubmitted(true);
      if (onComplete) {
        // Calculate score immediately
        let correct = 0;
        quizzes.forEach(quiz => {
          if (answers[quiz.id] === quiz.correct_answer) {
            correct++;
          }
        });
        onComplete(correct);
      }
    } else {
      alert("Please answer all questions before submitting!");
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
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



  if (quizzes.length === 0) {
    return null; // No quiz for this lesson
  }

  const score = submitted ? calculateScore() : 0;
  const percentage = submitted ? Math.round((score / quizzes.length) * 100) : 0;

  return (
    <div className="mt-16 border-t pt-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Test Your Knowledge 🧠</h2>
        <p className="text-muted-foreground">
          Answer all {quizzes.length} questions to see how well you understood this lesson!
        </p>
      </div>

      {submitted && (
        <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">
              Your Score: {score}/{quizzes.length} ({percentage}%)
            </h3>
            <p className="text-lg mb-4">
              {percentage >= 80 ? "🎉 Excellent work!" :
               percentage >= 60 ? "✅ Good job!" :
               "📚 Keep practicing!"}
            </p>
            <Button onClick={handleReset} variant="outline">
              Try Again
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-8">
        {quizzes.map((quiz, index) => {
          const userAnswer = answers[quiz.id];
          const isCorrect = submitted && userAnswer === quiz.correct_answer;
          const isWrong = submitted && userAnswer && userAnswer !== quiz.correct_answer;

          return (
            <Card key={quiz.id} className={`p-6 ${
              submitted && isCorrect ? 'border-green-500 bg-green-50' :
              submitted && isWrong ? 'border-red-500 bg-red-50' :
              ''
            }`}>
              <h3 className="text-lg font-bold mb-4">
                Question {index + 1}: {quiz.question}
              </h3>

              <div className="space-y-3 mb-4">
                {['A', 'B', 'C', 'D'].map(option => {
                  const optionText = quiz[`option_${option.toLowerCase()}` as keyof QuizQuestion] as string;
                  const isSelected = userAnswer === option;
                  const isCorrectAnswer = quiz.correct_answer === option;

                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswer(quiz.id, option)}
                      disabled={submitted}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        submitted && isCorrectAnswer ? 'border-green-500 bg-green-100 dark:bg-green-900/30 dark:border-green-500 dark:text-green-300' :
                        submitted && isSelected && !isCorrectAnswer ? 'border-red-500 bg-red-100 dark:bg-red-900/30 dark:border-red-500 dark:text-red-300' :
                        isSelected ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-500 dark:text-white' :
                        'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 dark:text-slate-200'
                      } ${submitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <span className="font-semibold">{option}.</span> {optionText}
                      {submitted && isCorrectAnswer && (
                        <span className="ml-2 text-green-600 dark:text-green-400">✓ Correct</span>
                      )}
                      {submitted && isSelected && !isCorrectAnswer && (
                        <span className="ml-2 text-red-600 dark:text-red-400">✗ Wrong</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                  <p className="text-sm font-semibold text-blue-900 mb-1">Explanation:</p>
                  <p className="text-sm text-blue-800">{quiz.explanation}</p>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {!submitted && (
        <div className="mt-8 text-center">
          <Button 
            onClick={handleSubmit}
            size="lg"
            disabled={Object.keys(answers).length < quizzes.length}
          >
            Submit Quiz ({Object.keys(answers).length}/{quizzes.length} answered)
          </Button>
        </div>
      )}
    </div>
  );
}
