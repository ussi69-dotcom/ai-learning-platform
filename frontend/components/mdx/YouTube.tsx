import React from 'react';

interface YouTubeProps {
  id: string;
  title: string;
}

export const YouTube = ({ id, title }: YouTubeProps) => {
  return (
    <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl my-8 bg-black/50">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
