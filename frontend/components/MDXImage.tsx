import React from 'react';

interface MDXImageProps {
  src: string;
  alt: string;
  courseSlug?: string;
  lessonSlug?: string;
}

const API_BASE_URL = "http://localhost:8000";

export default function MDXImage({ src, alt, courseSlug, lessonSlug }: MDXImageProps) {
  let finalSrc = src;

  // If it's a relative path and we have context, rewrite it
  if (!src.startsWith('http') && !src.startsWith('/') && courseSlug && lessonSlug) {
    // Remove leading ./ if present
    const cleanSrc = src.replace(/^\.\//, '');
    finalSrc = `${API_BASE_URL}/content/courses/${courseSlug}/lessons/${lessonSlug}/${cleanSrc}`;
  }

  return (
    <div className="my-8 group">
      <div className="p-2 rounded-2xl bg-white/30 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl transition-all hover:scale-[1.01] hover:shadow-2xl">
        <img 
          src={finalSrc} 
          alt={alt} 
          className="w-full h-auto object-cover rounded-xl"
          onError={(e) => {
            // Fallback or error handling could go here
            console.warn(`Failed to load image: ${finalSrc}`);
          }}
        />
      </div>
      {alt && (
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 font-medium tracking-wide">
          {alt}
        </p>
      )}
    </div>
  );
}
