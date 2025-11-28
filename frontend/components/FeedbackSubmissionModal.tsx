import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bug, Lightbulb, StickyNote, HelpCircle, X } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { useTranslations } from 'next-intl';

type FeedbackType = 'BUG' | 'FEATURE' | 'NOTE' | 'QUESTION';

interface FeedbackSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  lessonId?: number; // Optional now
  slideIndex?: number; // Optional now
  x: number;
  y: number;
}

export default function FeedbackSubmissionModal({
  isOpen,
  onClose,
  onSubmitSuccess,
  lessonId,
  slideIndex,
  x,
  y
}: FeedbackSubmissionModalProps) {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<FeedbackType>('NOTE');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { token } = useAuth();
  const t = useTranslations('Feedback');

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!message.trim()) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      await axios.post(
        `${API_BASE}/feedback`,
        {
          lesson_id: lessonId, // Can be undefined
          slide_index: slideIndex, // Can be undefined
          x_pos: x,
          y_pos: y,
          type: type,
          message: message
        },
        {
          headers: { "Authorization": `Bearer ${token}` }
        }
      );
      
      setMessage('');
      setType('NOTE');
      onSubmitSuccess();
    } catch (err) {
      console.error("Feedback submission failed:", err);
      setError(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const types: { id: FeedbackType; label: string; icon: React.ElementType; color: string }[] = [
    { id: 'BUG', label: t('bug'), icon: Bug, color: 'text-red-400' },
    { id: 'FEATURE', label: t('feature'), icon: Lightbulb, color: 'text-yellow-400' },
    { id: 'NOTE', label: t('note'), icon: StickyNote, color: 'text-blue-400' },
    { id: 'QUESTION', label: t('question'), icon: HelpCircle, color: 'text-purple-400' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <Card className="w-full max-w-md bg-card border-primary/20 shadow-[0_0_50px_rgba(var(--primary),0.1)] relative animate-in zoom-in-95 duration-200 overflow-hidden ring-1 ring-white/5">
        
        {/* Header Image / Gradient */}
        <div className="h-32 bg-gradient-to-b from-primary/20 to-background relative flex items-center justify-center overflow-hidden border-b border-primary/10">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
           
           <div className="relative z-10 text-center space-y-1">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20 mb-2 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                <Bug className="text-primary" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-foreground drop-shadow-sm tracking-tight">
                {t('title')}
              </h2>
              <p className="text-muted-foreground text-xs font-medium tracking-wide">{t('subtitle')}</p>
           </div>
           
           <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors hover:bg-white/5 p-2 rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono bg-secondary/10 py-1.5 px-3 rounded-full w-fit mx-auto border border-secondary/20">
            <span>{t('marker_location')}:</span>
            <span className="text-primary">{Math.round(x * 100)}%, {Math.round(y * 100)}%</span>
          </div>

          <div className="space-y-5">
            
            {/* Type Selector */}
            <div className="grid grid-cols-4 gap-3">
              {types.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setType(t.id)}
                  className={`relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 group overflow-hidden ${
                    type === t.id 
                      ? 'bg-primary/10 border-primary/50 shadow-[0_0_20px_rgba(var(--primary),0.2)]' 
                      : 'bg-secondary/5 border-transparent hover:bg-secondary/10 hover:border-primary/20 hover:scale-105'
                  }`}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${
                      type === t.id ? 'from-primary/10 to-transparent' : 'from-white/5 to-transparent'
                  }`} />
                  
                  <t.icon 
                    className={`mb-2 transition-all duration-300 ${
                        type === t.id ? 'text-primary scale-110 drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]' : 'text-muted-foreground group-hover:text-foreground'
                    }`} 
                    size={24} 
                  />
                  <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      type === t.id ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>
                    {t.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Message Input */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t(`placeholder_${type.toLowerCase()}`)}
                className="relative w-full min-h-[140px] p-4 rounded-xl bg-background/50 border border-input focus:border-primary/50 outline-none resize-none text-sm text-foreground placeholder:text-muted-foreground transition-all shadow-inner"
                autoFocus
              />
              {error && <p className="text-destructive text-xs mt-2 absolute -bottom-6 left-1 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-destructive inline-block" /> {error}</p>}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <Button 
                variant="ghost" 
                onClick={onClose} 
                disabled={isSubmitting} 
                className="text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full px-6"
              >
                {t('cancel')}
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting || !message.trim()} 
                className="min-w-[140px] rounded-full bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all duration-300"
              >
                {isSubmitting ? (
                   <span className="flex items-center gap-2">
                     <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></span>
                     <span>{t('sending')}</span>
                   </span>
                ) : (
                    <span className="flex items-center gap-2 font-semibold tracking-wide">
                        {t('submit')} <span className="text-primary-foreground/60">→</span>
                    </span>
                )}
              </Button>
            </div>

          </div>
        </div>
      </Card>
    </div>
  );
}
