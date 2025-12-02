import React from 'react';
import { getAvatar } from '@/components/AvatarSelector';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  avatarId: string;
  email?: string;
  className?: string;
}

export default function UserAvatar({ avatarId, email, className }: UserAvatarProps) {
  const avatarObj = getAvatar(avatarId);
  const AvatarIcon = avatarObj?.type === 'ICON' ? avatarObj.icon : null;

  // If it's an ICON type (Jedi/Sith/etc.)
  if (avatarObj?.type === 'ICON' && AvatarIcon) {
    return (
      <div className={cn("flex items-center justify-center rounded-full bg-secondary/10 border border-white/10 overflow-hidden", className)}>
        <AvatarIcon 
          className="w-2/3 h-2/3" 
          style={{ stroke: avatarObj.color, strokeWidth: 1.5 }} 
        />
      </div>
    );
  }

  // If it's an IMAGE type (DiceBear Droid) or fallback
  return (
    <Avatar className={cn("border border-white/10", className)}>
      <AvatarImage src={avatarObj?.src} />
      <AvatarFallback className="bg-primary/20 text-primary text-[10px] font-bold">
        {email ? email[0].toUpperCase() : '?'}
      </AvatarFallback>
    </Avatar>
  );
}
