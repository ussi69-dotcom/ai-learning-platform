"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useParams } from 'next/navigation';
import axios from 'axios';
import LabBadge from './LabBadge';
import { CheckCircle, Beaker } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Import Shadcn Button

interface LabCompleteProps {
  labId: string;
}

export default function LabComplete({ labId }: LabCompleteProps) {
  const { token, refreshUser } = useAuth();
  const params = useParams();
  const lessonId = params.lessonId ? parseInt(params.lessonId as string) : null;

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  // Check if already completed
  useEffect(() => {
    if (!token || !lessonId) return;

    const checkStatus = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await axios.get(`${API_BASE}/users/me/progress`, {
           headers: { Authorization: `Bearer ${token}` }
        });
        const progress = res.data.find((p: any) => p.lesson_id === lessonId);
        
        if (progress && progress.completed_labs && progress.completed_labs.includes(labId)) {
          setIsCompleted(true);
        }
      } catch (e) {
        console.error("Failed to check lab status", e);
      }
    };
    checkStatus();
  }, [token, lessonId, labId]);

  const handleComplete = async () => {
    if (!token || !lessonId) return;
    setIsLoading(true);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      await axios.post(`${API_BASE}/lessons/${lessonId}/lab/complete`, 
        { lab_id: labId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setIsCompleted(true);
      setShowBadge(true); // Show popup
      refreshUser(); // Update XP in navbar
      
    } catch (e) {
      console.error("Failed to complete lab", e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isCompleted && !showBadge) {
    return (
      <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-4 animate-in fade-in">
        <div className="bg-green-500/20 p-2 rounded-full text-green-600 dark:text-green-400">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-green-700 dark:text-green-400">Lab Completed</h4>
          <p className="text-sm text-muted-foreground">You have mastered this experiment.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {showBadge && (
        <LabBadge 
          title="Experimental Lab" 
          onClose={() => setShowBadge(false)} 
          type="lab"
          xp={25}
        />
      )}

      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleComplete}
          disabled={isLoading || isCompleted}
          variant="outline" // Use outline variant for subtlety
          className="relative group text-lg font-bold shadow-md hover:shadow-lg transition-all duration-300"
        >
          {isLoading ? (
            <span>Saving...</span>
          ) : (
            <>
              <Beaker className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              <span>Mark Lab as Complete</span>
            </>
          )}
        </Button>
      </div>
    </>
  );
}
