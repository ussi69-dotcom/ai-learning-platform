"use client";

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  children: string;
  language?: string;
}

export default function CodeBlock({ children, language = 'text' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md border border-slate-200/50 dark:border-white/10 shadow-sm transition-all hover:shadow-md">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-100/50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400/30" />
          <div className="w-3 h-3 rounded-full bg-amber-400/20 border border-amber-400/30" />
          <div className="w-3 h-3 rounded-full bg-emerald-400/20 border border-emerald-400/30" />
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 border border-slate-200/50 dark:border-white/10 transition-all text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-slate-800 dark:text-slate-100 leading-relaxed">
          {children}
        </code>
      </pre>
    </div>
  );
}
