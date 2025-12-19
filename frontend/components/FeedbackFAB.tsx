import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, X, MousePointer2, Eye } from 'lucide-react';
import SplitBugEyeIcon from './SplitBugEyeIcon';
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
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number } | null>(null);
  const t = useTranslations('Feedback');
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Unified toggle: Idle -> Viewing -> Idle
  // Placing is handled via drag from ANY state
  const toggleMode = () => {
    if (currentMode === 'idle') {
      onModeChange('viewing');
    } else {
      onModeChange('idle');
    }
  };

  // Start drag - works from any mode (idle or viewing)
  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    // Store initial position to detect if it's a click vs drag
    setDragStartPos({ x: clientX, y: clientY });
  };

  // Global event listeners for drag tracking
  useEffect(() => {
    if (!dragStartPos) return;

    const onGlobalMove = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      // Check if moved enough to be considered a drag (5px threshold)
      const dx = Math.abs(clientX - dragStartPos.x);
      const dy = Math.abs(clientY - dragStartPos.y);

      if (dx > 5 || dy > 5) {
        if (!isDragging) {
          setIsDragging(true);
          onModeChange('placing');
        }
        setDraggedPosition({ x: clientX, y: clientY });
      }
    };

    const onGlobalEnd = (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        // Was dragging - place feedback
        let clientX, clientY;
        if ('changedTouches' in e) {
          clientX = (e as TouchEvent).changedTouches[0].clientX;
          clientY = (e as TouchEvent).changedTouches[0].clientY;
        } else {
          clientX = (e as MouseEvent).clientX;
          clientY = (e as MouseEvent).clientY;
        }

        const contentContainer = document.getElementById('lesson-content-container') || document.getElementById('course-content-container');

        if (contentContainer) {
          const rect = contentContainer.getBoundingClientRect();
          const relativeX = (clientX - rect.left) / rect.width;
          const relativeY = (clientY - rect.top) / rect.height;
          onPlaceFeedback(relativeX, relativeY, slideIndex);
        }

        onModeChange('idle');
        setIsDragging(false);
        setDraggedPosition(null);
      }

      setDragStartPos(null);
    };

    window.addEventListener('mousemove', onGlobalMove);
    window.addEventListener('mouseup', onGlobalEnd);
    window.addEventListener('touchmove', onGlobalMove, { passive: false });
    window.addEventListener('touchend', onGlobalEnd);

    return () => {
      window.removeEventListener('mousemove', onGlobalMove);
      window.removeEventListener('mouseup', onGlobalEnd);
      window.removeEventListener('touchmove', onGlobalMove);
      window.removeEventListener('touchend', onGlobalEnd);
    };
  }, [dragStartPos, isDragging, onModeChange, onPlaceFeedback, slideIndex]);


  return (
    <div className="fixed bottom-28 md:bottom-20 right-4 md:right-6 z-40 flex flex-col items-end space-y-2 group/fab pointer-events-none">
      {/* Instructions - placing and viewing always visible, idle only on hover */}
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
      {/* Idle hint - only visible on hover */}
      {currentMode === 'idle' && (
        <div className="bg-black/60 backdrop-blur-xl border border-primary/50 text-primary-foreground px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(var(--primary),0.3)] text-sm flex items-center gap-2 mb-2 opacity-0 group-hover/fab:opacity-100 transition-opacity duration-300 pointer-events-none">
          <MousePointer2 className="w-4 h-4 text-primary" />
          <span className="font-medium tracking-wide text-zinc-100">{t('idle_hint')}</span>
        </div>
      )}

      {/* UNIFIED BUTTON: Works on both desktop and mobile */}
      {/* Click = toggle viewing mode, Drag = report bug */}
      <Button
        ref={buttonRef}
        variant="ghost"
        className={cn(
          "!rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center p-0 transition-all duration-300 touch-none border-2 backdrop-blur-md select-none pointer-events-auto",
          currentMode === 'placing'
            ? "bg-primary hover:bg-primary/90 text-primary-foreground border-primary scale-110 cursor-grabbing shadow-[0_0_25px_rgba(var(--primary),0.6)]"
            : currentMode === 'viewing'
            ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(var(--primary),0.4)] hover:scale-105"
            : "bg-black/20 border-primary/50 text-primary hover:scale-105 hover:bg-primary/10 hover:border-primary shadow-[0_0_20px_rgba(var(--primary),0.2)] cursor-grab"
        )}
        onClick={() => {
          // Only toggle if we weren't dragging
          if (!isDragging) {
            toggleMode();
          }
        }}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        title={t('report_bug')}
      >
        {currentMode === 'placing' ? (
          <AlertCircle size={24} />
        ) : currentMode === 'viewing' ? (
          <X size={24} />
        ) : (
          <SplitBugEyeIcon size={36} />
        )}
      </Button>

      {/* Draggable Icon following cursor */}
      {isDragging && draggedPosition && (
        <div
          className="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-4 shadow-[0_0_25px_rgba(var(--primary),0.8)] cursor-grabbing pointer-events-none flex items-center justify-center border border-white/20"
          style={{ left: draggedPosition.x, top: draggedPosition.y }}
        >
          <AlertCircle className="w-8 h-8" />
        </div>
      )}
    </div>
  );
}
