"use client";

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface TryItYourselfProps {
  task: string;
  prompt: string;
  hint?: string;
}

export default function TryItYourself({ task, prompt, hint }: TryItYourselfProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-xl p-6 my-8 shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">🎯</span>
        <h3 className="text-xl font-bold text-indigo-900">Try It Yourself!</h3>
      </div>

      {/* Task */}
      <p className="text-slate-700 mb-5 text-lg">{task}</p>

      {/* Prompt Box */}
      <div className="bg-white rounded-lg border-2 border-indigo-200 overflow-hidden shadow-sm">
        <div className="bg-indigo-100 px-4 py-2 flex justify-between items-center border-b border-indigo-200">
          <span className="text-sm font-semibold text-indigo-900">Prompt to Copy:</span>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium transition-all ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Prompt</span>
              </>
            )}
          </button>
        </div>
        <div className="p-4">
          <code className="text-sm text-slate-800 whitespace-pre-wrap block font-mono">
            {prompt}
          </code>
        </div>
      </div>

      {/* Hint */}
      {hint && (
        <p className="text-xs text-slate-600 mt-3 flex items-start gap-2">
          <span>💡</span>
          <span>{hint}</span>
        </p>
      )}

      {/* Footer */}
      <p className="text-sm text-indigo-700 mt-4 font-medium">
        → Open ChatGPT, paste this prompt, and see what happens!
      </p>
    </div>
  );
}
