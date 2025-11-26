import React from 'react';
import { Bug, Lightbulb, StickyNote, HelpCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import UserAvatar from '@/components/UserAvatar';
import { cn } from '@/lib/utils';

interface FeedbackMarkerProps {
  x: number;
  y: number;
  type: 'BUG' | 'FEATURE' | 'NOTE' | 'QUESTION';
  message: string;
  author: {
    email: string;
    avatar: string;
  };
  isResolved: boolean;
  onClick: () => void;
}

export default function FeedbackMarker({ x, y, type, message, author, isResolved, onClick }: FeedbackMarkerProps) {
  const getIcon = () => {
    switch (type) {
      case 'BUG': return <Bug size={10} />;
      case 'FEATURE': return <Lightbulb size={10} />;
      case 'NOTE': return <StickyNote size={10} />;
      case 'QUESTION': return <HelpCircle size={10} />;
    }
  };

  const getBadgeColor = () => {
    switch (type) {
      case 'BUG': return 'bg-red-500';
      case 'FEATURE': return 'bg-yellow-500 text-black';
      case 'NOTE': return 'bg-blue-500';
      case 'QUESTION': return 'bg-purple-500';
    }
  };

  return (
    <div 
      className="absolute z-30 group"
      style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
    >
      <div 
        className="relative transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110"
        onClick={onClick}
      >
        {/* Main Avatar Marker */}
        <UserAvatar 
          avatarId={author.avatar} 
          email={author.email} 
          className="w-8 h-8 border-2 border-white/20 shadow-lg ring-2 ring-black/10 bg-card"
        />

        {/* Type Badge (Bottom Right) */}
        <div className={cn(
          "absolute -bottom-1 -right-1 p-1 rounded-full shadow-sm text-white flex items-center justify-center",
          getBadgeColor()
        )}>
          {getIcon()}
        </div>
      </div>

      {/* Tooltip Preview (Hover) */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-black/80 backdrop-blur-md text-white text-xs rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] text-center z-40">
        <span className="font-bold mr-1">{author.email.split('@')[0]}:</span>
        {message}
      </div>
    </div>
  );
}

