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
    <div className="my-8">
      <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
        <img 
          src={finalSrc} 
          alt={alt} 
          className="w-full h-auto object-cover"
          onError={(e) => {
            // Fallback or error handling could go here
            console.warn(`Failed to load image: ${finalSrc}`);
          }}
        />
      </div>
      {alt && (
        <p className="text-center text-sm text-slate-500 mt-2 italic">
          {alt}
        </p>
      )}
    </div>
  );
}
