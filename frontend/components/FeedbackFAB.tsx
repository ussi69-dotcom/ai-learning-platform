import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, Flag, MessageCircle, X, MousePointer2, Plus, List, Eye, Bug } from 'lucide-react';
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
  const t = useTranslations('Feedback');
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMode = () => {
    if (currentMode === 'placing') {
      onModeChange('idle'); // Cancel placing
    } else if (currentMode === 'viewing') {
      onModeChange('idle'); // Stop viewing
    } else {
      onModeChange('placing'); // Start placing
    }
  };

  // Mobile specific toggle: Idle -> Viewing -> Idle
  // Placing is handled via drag from the viewing state
  const toggleMobileMode = () => {
    if (currentMode === 'idle') {
      onModeChange('viewing');
    } else {
      onModeChange('idle');
    }
  };

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    // On mobile, we can only drag if we are already in 'viewing' mode (which acts as "active" state)
    // On desktop, we can drag if we are in 'placing' mode
    const isMobile = window.innerWidth < 768; // Simple check, can be refined

    if (isMobile) {
      if (currentMode !== 'viewing') return;
      // Switch to placing mode temporarily while dragging
      onModeChange('placing');
    } else {
      if (currentMode !== 'placing') return;
    }

    // e.preventDefault(); // Removed to allow scrolling if not dragging, logic handled below

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      e.preventDefault(); // Prevent text selection on mouse
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    // Prevent default touch behavior to stop scrolling
    if (e.type === 'touchstart') {
      e.preventDefault();
    }

    setIsDragging(true);
    setDraggedPosition({ x: clientX, y: clientY });
  };

  useEffect(() => {
    if (!isDragging) return;

    const onDrag = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      setDraggedPosition({ x: clientX, y: clientY });
    };

    const endDrag = (e: MouseEvent | TouchEvent) => {
      setIsDragging(false);

      // Try to find either lesson container OR course container
      const contentContainer = document.getElementById('lesson-content-container') || document.getElementById('course-content-container');

      if (contentContainer) {
        const rect = contentContainer.getBoundingClientRect();

        let clientX, clientY;
        if ('changedTouches' in e) {
          clientX = e.changedTouches[0].clientX;
          clientY = e.changedTouches[0].clientY;
        } else {
          clientX = (e as MouseEvent).clientX;
          clientY = (e as MouseEvent).clientY;
        }

        // Calculate relative position even if outside
        // This allows placing markers in margins/whitespace
        const relativeX = (clientX - rect.left) / rect.width;
        const relativeY = (clientY - rect.top) / rect.height;

        onPlaceFeedback(relativeX, relativeY, slideIndex);
        onModeChange('idle');
      } else {
        // If we didn't drop on content, revert to idle or viewing?
        // Let's revert to idle to be safe
        onModeChange('idle');
      }
      setDraggedPosition(null);
    };

    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchmove', onDrag, { passive: false });
    window.addEventListener('touchend', endDrag);

    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('touchmove', onDrag);
      window.removeEventListener('touchend', endDrag);
    };
  }, [isDragging, currentMode, onPlaceFeedback, slideIndex, onModeChange]);


  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col items-end space-y-4">
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
          <span className="font-medium tracking-wide text-zinc-100 hidden md:inline">{t('viewing_feedback')}</span>
          <span className="font-medium tracking-wide text-zinc-100 md:hidden">Drag to report / Tap to close</span>
        </div>
      )}

      {/* DESKTOP VIEW: Two Buttons */}
      <div className="hidden md:flex items-center gap-1">
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

      {/* MOBILE VIEW: Single Unified Button */}
      <div className="flex md:hidden items-center gap-1">
        <Button
          ref={mobileButtonRef}
          variant="ghost"
          className={cn(
            "!rounded-full w-20 h-20 flex items-center justify-center p-0 transition-all duration-300 touch-none border",
            currentMode === 'viewing' || currentMode === 'placing'
              ? "bg-primary/10 border-primary/50 text-primary shadow-[0_0_15px_rgba(var(--primary),0.3)] scale-110"
              : "bg-transparent border-primary/20 text-primary hover:border-primary/30 hover:bg-transparent"
          )}
          onClick={toggleMobileMode}
          onTouchStart={startDrag}
          title="Report Bug / View Feedback"
        >
          {/* Show X if viewing/placing, otherwise show Split Bug/Eye icon (3x larger) */}
          {(currentMode === 'viewing' || currentMode === 'placing') ? <X size={32} /> : <SplitBugEyeIcon size={72} />}
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
