"use client";

import React, { useState } from 'react';
import { Check, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LabBadge from './LabBadge';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';

interface LabSectionProps {
  title: string;
  difficulty?: string;
  children: React.ReactNode;
}

export default function LabSection({ title, difficulty = "Builder", children }: LabSectionProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const { token, refreshUser } = useAuth();
  const params = useParams();
  const lessonId = parseInt(params.lessonId as string);
  const locale = useLocale();
  
  // Generate stable ID from title
  const labId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Check initial status from server
  React.useEffect(() => {
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
    if (!isCompleted && token && lessonId) {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        // Call secure endpoint with lab_id
        await axios.post(`${API_BASE}/lessons/${lessonId}/lab/complete`, 
          { lab_id: labId }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setIsCompleted(true);
        setShowBadge(true);
        refreshUser(); // Update XP bar
      } catch (e) {
        console.error("Failed to complete lab", e);
      }
    }
  };

  return (
    <div className="my-10 relative">
      {/* Lab Container */}
      <div className={`
        relative overflow-hidden rounded-3xl
        glass-panel
        transition-all duration-500
        ${isCompleted ? 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.15)]' : 'hover:border-primary/50'}
      `}>
        
        {/* Header */}
        <div className={`
          p-6 flex items-center justify-between
          border-b border-border
          ${isCompleted ? 'bg-green-500/5' : 'bg-muted/30'}
        `}>
          <div className="flex items-center gap-3">
            <div className={`
              w-10 h-10 rounded-xl flex items-center justify-center shadow-lg
              ${isCompleted ? 'bg-green-500 text-white dark:bg-yellow-500 dark:text-yellow-950' : 'bg-primary text-primary-foreground'}
            `}>
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {locale === 'cs' ? 'Interaktivní laboratoř' : 'Interactive Lab'}
              </div>
              <h3 className="text-xl font-bold text-foreground">{title}</h3>
            </div>
          </div>
          
          {isCompleted && (
            <div className="flex items-center gap-2 text-green-600 dark:text-yellow-400 font-bold bg-background/80 px-3 py-1 rounded-full shadow-sm border border-border">
              <Check className="w-4 h-4" />
              {locale === 'cs' ? 'Hotovo' : 'Completed'}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="prose prose-lg max-w-none dark:prose-invert
            prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground
            prose-pre:bg-muted prose-pre:border prose-pre:border-border
          ">
            {children}
          </div>
        </div>

        {/* Footer / Action */}
        <div className="p-6 bg-muted/30 border-t border-border flex justify-end">
          <Button 
            size="lg"
            onClick={handleComplete}
            disabled={isCompleted}
            className={`
              font-bold text-base px-8 h-12 transition-all shadow-lg
              ${isCompleted 
                ? 'bg-green-600 text-white hover:bg-green-700 dark:bg-yellow-500 dark:text-yellow-950 dark:hover:bg-yellow-400' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95'
              }
            `}
          >
            {isCompleted
              ? (locale === 'cs' ? 'Lab dokončen!' : 'Lab Completed!')
              : (locale === 'cs' ? 'Dokončil jsem tento Lab' : 'I Finished This Lab')}
          </Button>
        </div>
      </div>

      {/* Celebration Modal */}
      {showBadge && (
        <LabBadge 
          title={title} 
          onClose={() => setShowBadge(false)} 
        />
      )}
    </div>
  );
}