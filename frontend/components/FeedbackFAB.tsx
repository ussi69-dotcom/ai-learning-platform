import React, { useState, useEffect } from 'react';
import { AlertCircle, Flag, MessageCircle, X, MousePointer2, Plus, List, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

type FeedbackMode = 'idle' | 'placing' | 'viewing'; // idle: default, placing: drag&drop, viewing: show existing

interface FeedbackFABProps {
  onModeChange: (mode: FeedbackMode) => void;
  currentMode: FeedbackMode;
  onPlaceFeedback: (x: number, y: number, slideIndex: number) => void;
  lessonId: number;
  slideIndex: number;
}

export default function FeedbackFAB({ onModeChange, currentMode, onPlaceFeedback, lessonId, slideIndex }: FeedbackFABProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedPosition, setDraggedPosition] = useState<{ x: number; y: number } | null>(null);
  const t = useTranslations('Feedback');

  const toggleMode = () => {
    if (currentMode === 'placing') {
      onModeChange('idle'); // Cancel placing
    } else if (currentMode === 'viewing') {
      onModeChange('idle'); // Stop viewing
    } else {
      onModeChange('placing'); // Start placing
    }
  };

  const startDrag = (e: React.MouseEvent) => {
    if (currentMode !== 'placing') return;
    e.preventDefault(); // Prevent text selection
    setIsDragging(true);
    setDraggedPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (!isDragging) return;

    const onDrag = (e: MouseEvent) => {
      setDraggedPosition({ x: e.clientX, y: e.clientY });
    };

    const endDrag = (e: MouseEvent) => {
      setIsDragging(false);
      
      // Try to find either lesson container OR course container
      const contentContainer = document.getElementById('lesson-content-container') || document.getElementById('course-content-container');
      
      if (contentContainer) {
        const rect = contentContainer.getBoundingClientRect();
        
        // Check if drop is within the container
        if (
          e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom
        ) {
          const relativeX = (e.clientX - rect.left) / rect.width;
          const relativeY = (e.clientY - rect.top) / rect.height;
          
          onPlaceFeedback(relativeX, relativeY, slideIndex);
          onModeChange('idle');
        } else {
            // Dropped outside
            setDraggedPosition(null);
        }
      }
      setDraggedPosition(null);
    };

    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', endDrag);

    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', endDrag);
    };
  }, [isDragging, currentMode, onPlaceFeedback, slideIndex, onModeChange]);


  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-4">
      {/* Instructions (Always above) */}
      {currentMode === 'placing' && (
        <div className="bg-black/60 backdrop-blur-xl border border-primary/50 text-primary-foreground px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(var(--primary),0.3)] text-sm flex items-center gap-2 animate-in slide-in-from-right fade-in duration-300 mb-2">
          <MousePointer2 className="w-4 h-4 text-primary" /> 
          <span className="font-medium tracking-wide text-zinc-100">{t('drag_drop')}</span>
        </div>
      )}
       {currentMode === 'viewing' && (
        <div className="bg-black/60 backdrop-blur-xl border border-primary/50 text-primary-foreground px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(var(--primary),0.3)] text-sm flex items-center gap-2 animate-in slide-in-from-right fade-in duration-300 mb-2">
          <Eye className="w-4 h-4 text-primary" /> 
          <span className="font-medium tracking-wide text-zinc-100">{t('viewing_feedback')}</span>
        </div>
      )}

      <div className="flex items-center gap-1">
        {/* View Feedback (Eye) */}
        {currentMode !== 'placing' && (
          <Button
            variant="outline"
            className={cn(
              "!rounded-full w-14 h-14 shadow-lg border-2 backdrop-blur-md flex items-center justify-center p-0 transition-all duration-300 hover:scale-110",
              currentMode === 'viewing'
                ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(var(--primary),0.4)]"
                : "bg-black/20 border-primary/30 text-primary/80 hover:text-primary hover:border-primary hover:bg-primary/10"
            )}
            onClick={() => onModeChange(currentMode === 'viewing' ? 'idle' : 'viewing')}
            title={currentMode === 'viewing' ? t('hide_feedback') : t('view_feedback')}
          >
             {currentMode === 'viewing' ? <X size={32} /> : <Eye size={32} />}
          </Button>
        )}

        {/* Add Feedback (AlertCircle) */}
        <Button
          variant="outline"
          className={cn(
            "!rounded-full w-14 h-14 shadow-lg border-2 backdrop-blur-md flex items-center justify-center p-0 transition-all duration-300 hover:scale-110",
            currentMode === 'placing' 
              ? "bg-primary hover:bg-primary/90 text-primary-foreground border-primary scale-110 animate-pulse cursor-grab active:cursor-grabbing shadow-[0_0_25px_rgba(var(--primary),0.6)]" 
              : "bg-black/20 border-primary/50 text-primary hover:scale-105 hover:bg-primary/10 hover:border-primary shadow-[0_0_20px_rgba(var(--primary),0.2)]"
          )}
          onClick={toggleMode}
          onMouseDown={startDrag}
          title={t('report_bug')}
        >
          {currentMode === 'placing' ? <X size={32} /> : <AlertCircle size={32} />}
        </Button>
      </div>

      {/* Draggable Icon for Placing mode */}
      {currentMode === 'placing' && draggedPosition && (
        <div
          className="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-4 shadow-[0_0_25px_rgba(var(--primary),0.8)] cursor-grabbing animate-bounce-slow pointer-events-none flex items-center justify-center border border-white/20"
          style={{ left: draggedPosition.x, top: draggedPosition.y }}
        >
          <AlertCircle className="w-8 h-8" />
        </div>
      )}
    </div>
  );
}
