import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import UserAvatar from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, ThumbsUp, ThumbsDown, Trash2, Edit2, Send, CornerDownRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { cn } from '@/lib/utils';

interface FeedbackUser {
  id: number;
  email: string;
  avatar: string;
}

interface FeedbackItem {
  id: number;
  lesson_id: number;
  slide_index: number;
  x_pos: number;
  y_pos: number;
  type: 'BUG' | 'FEATURE' | 'NOTE' | 'QUESTION';
  message: string;
  created_at: string;
  is_resolved: boolean;
  parent_id: number | null;
  votes: number;
  user_id: number;
  author: FeedbackUser;
  replies?: FeedbackItem[]; 
  user_vote?: 'up' | 'down' | null;
}

interface FeedbackDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedbackItem: FeedbackItem | null;
  onVote: (id: number, direction: 'up' | 'down') => void;
  onReply: (parentId: number, message: string) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, message: string, type: string) => void; // Simplified update
}

export default function FeedbackDetailModal({ 
  isOpen, 
  onClose, 
  feedbackItem, 
  onVote, 
  onReply, 
  onDelete,
  onUpdate 
}: FeedbackDetailModalProps) {
  const { user } = useAuth();
  const [replyMessage, setReplyMessage] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  if (!isOpen || !feedbackItem) return null;

  const isAdmin = user?.email === 'admin@ai-platform.com' || user?.email === 'ussi@seznam.cz';
  const isAuthor = user?.id === feedbackItem.user_id;
  const canManage = isAdmin || isAuthor;

  const handleReplySubmit = () => {
    if (!replyMessage.trim()) return;
    onReply(feedbackItem.id, replyMessage);
    setReplyMessage('');
    setIsReplying(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <Card className="w-full max-w-2xl bg-card border-primary/20 shadow-[0_0_50px_rgba(var(--primary),0.1)] relative animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[80vh] ring-1 ring-white/5">
        
        {/* Header */}
        <div className="p-4 border-b border-primary/10 flex justify-between items-center bg-primary/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
             <UserAvatar 
                avatarId={feedbackItem.author.avatar} 
                email={feedbackItem.author.email} 
                className="w-10 h-10 border border-primary/20 shadow-lg"
             />
             <div>
                <h3 className="font-bold text-sm text-foreground">{feedbackItem.author.email}</h3>
                <span className="text-[10px] text-primary uppercase tracking-wider font-bold bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                  {feedbackItem.type}
                </span>
             </div>
          </div>
          <Button variant="ghost" className="h-9 w-9 p-0 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>

        {/* Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
           
           {/* Main Post */}
           <div className="space-y-4">
              <p className="text-lg leading-relaxed text-foreground font-light">{feedbackItem.message}</p>
              
              <div className="flex items-center justify-between pt-2">
                 <div className="flex items-center gap-2 bg-secondary/10 p-1 rounded-full border border-secondary/20">
                     <Button 
                        variant="ghost"
                        size="sm" 
                        className={`gap-2 rounded-full h-8 px-4 transition-all duration-300 ${
                            feedbackItem.user_vote === 'up' 
                            ? 'bg-primary/20 text-primary hover:bg-primary/30' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                        }`}
                        onClick={() => onVote(feedbackItem.id, 'up')}
                     >
                        <ThumbsUp size={14} className={feedbackItem.user_vote === 'up' ? 'fill-current' : ''} /> 
                        <span className="font-mono font-bold">{feedbackItem.votes}</span>
                     </Button>
                     <div className="w-px h-4 bg-white/10"></div>
                     <Button 
                        variant="ghost"
                        size="sm" 
                        className={`gap-2 rounded-full h-8 px-3 transition-all duration-300 ${
                            feedbackItem.user_vote === 'down' 
                            ? 'bg-destructive/20 text-destructive hover:bg-destructive/30' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                        }`}
                        onClick={() => onVote(feedbackItem.id, 'down')}
                     >
                        <ThumbsDown size={14} className={feedbackItem.user_vote === 'down' ? 'fill-current' : ''} />
                     </Button>
                 </div>

                 <div className="flex gap-2">
                    {canManage && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full h-8 w-8 p-0" 
                        onClick={() => onDelete(feedbackItem.id)}
                      >
                           <Trash2 size={14} />
                      </Button>
                    )}
                 </div>
              </div>
           </div>

           {/* Replies Section */}
           <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/10 to-transparent"></div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6 flex items-center gap-2 pl-4">
                <CornerDownRight size={14} /> Discussion
              </h4>
              
              <div className="space-y-4 pl-4">
                  {(!feedbackItem.replies || feedbackItem.replies.length === 0) && (
                     <div className="text-center py-8 border border-dashed border-primary/10 rounded-xl bg-primary/5">
                        <p className="text-sm text-muted-foreground">No replies yet.</p>
                        <p className="text-xs text-muted-foreground/80 mt-1">Start the conversation below!</p>
                     </div>
                  )}
                  {feedbackItem.replies?.map(reply => (
                     <div key={reply.id} className="group relative bg-card/50 hover:bg-card border border-primary/10 hover:border-primary/20 p-4 rounded-xl transition-all duration-300">
                         <div className="flex items-start justify-between gap-4">
                            <div className="flex gap-3 w-full">
                               <UserAvatar 
                                 avatarId={reply.author.avatar} 
                                 email={reply.author.email} 
                                 className="w-8 h-8 border border-primary/20 mt-1"
                               />
                               <div className="space-y-1 w-full">
                                   <div className="flex items-center justify-between">
                                       <span className="text-xs font-bold text-foreground">{reply.author.email}</span>
                                       {(isAdmin || user?.id === reply.user_id) && (
                                          <button 
                                            onClick={() => onDelete(reply.id)} 
                                            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all p-1"
                                          >
                                             <Trash2 size={12} />
                                          </button>
                                       )}
                                   </div>
                                   <p className="text-sm text-foreground/90 leading-relaxed">{reply.message}</p>
                               </div>
                            </div>
                         </div>
                     </div>
                  ))}
              </div>
           </div>

        </div>

        {/* Footer: Reply Input */}
        <div className="p-4 bg-card border-t border-primary/10">
           <div className="relative flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full p-1 focus-within:border-primary/50 focus-within:bg-secondary/20 transition-all duration-300 focus-within:shadow-[0_0_15px_rgba(var(--primary),0.1)]">
              <input 
                className="flex-1 bg-transparent border-none px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 h-10"
                placeholder="Write a reply..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleReplySubmit()}
              />
              <Button 
                className={`rounded-full w-10 h-10 p-0 transition-all duration-300 ${
                    replyMessage.trim() 
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg scale-100' 
                    : 'bg-secondary/20 text-muted-foreground scale-90'
                }`} 
                onClick={handleReplySubmit} 
                disabled={!replyMessage.trim()}
              >
                 <Send size={16} className={replyMessage.trim() ? 'ml-0.5' : ''} />
              </Button>
           </div>
        </div>

      </Card>
    </div>
  );
}
