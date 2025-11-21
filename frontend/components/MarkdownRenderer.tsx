"use client";

import React from 'react';
import MDXImage from './MDXImage';

interface MarkdownRendererProps {
  content: string;
  courseSlug?: string;
  lessonSlug?: string;
}

export default function MarkdownRenderer({ content, courseSlug, lessonSlug }: MarkdownRendererProps) {
  // Helper to parse content line by line
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // ... (code blocks handling remains same) ...

    // 5. Handle Images
    if (line.match(/^!\[.*\]\(.*\)/)) {
      const match = line.match(/^!\[(.*)\]\((.*)\)/);
      if (match) {
        const alt = match[1];
        const src = match[2];
        elements.push(
          <MDXImage 
            key={`img-${i}`} 
            src={src} 
            alt={alt} 
            courseSlug={courseSlug}
            lessonSlug={lessonSlug}
          />
        );
        i++; continue;
      }
    }

    // 6. Handle Lists
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const items: string[] = [];
      let j = i;
      while (j < lines.length && (lines[j].trim().startsWith('- ') || lines[j].trim().startsWith('* '))) {
        items.push(lines[j].trim().substring(2));
        j++;
      }
      
      elements.push(
        <ul key={`ul-${i}`} className="list-disc ml-6 mb-4 space-y-2 text-slate-700">
          {items.map((item, k) => (
            <li key={k}>
              {item.includes('**') ? (
                <span>
                  {item.split('**').map((part, p) => p % 2 === 1 ? <strong key={p}>{part}</strong> : part)}
                </span>
              ) : item}
            </li>
          ))}
        </ul>
      );
      
      i = j;
      continue;
    }

    // 7. Regular Paragraphs
    if (line.trim() !== '') {
      // Handle bold text inside paragraphs
      if (line.includes('**')) {
        const parts = line.split('**');
        elements.push(
          <p key={`p-${i}`} className="mb-4 text-slate-700 leading-relaxed">
            {parts.map((part, k) => k % 2 === 1 ? <strong key={k}>{part}</strong> : part)}
          </p>
        );
      } else {
        elements.push(<p key={`p-${i}`} className="mb-4 text-slate-700 leading-relaxed">{line}</p>);
      }
    } else {
      // Empty line
      // elements.push(<br key={`br-${i}`} />);
    }

    i++;
  }

  return <div className="markdown-content">{elements}</div>;
}
