"use client";

import React, { useState } from 'react';
import { Play, RotateCcw, Terminal, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { executeCode, SandboxResponse } from '@/lib/sandboxApi';

interface SandboxProps {
  defaultCode?: string;
  height?: string;
}

export default function Sandbox({ defaultCode = "print('Hello World')", height = "h-64" }: SandboxProps) {
  const { token } = useAuth();
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState<SandboxResponse | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    if (!token) {
      setOutput({ status: 'error', error: 'You must be logged in to run code.' });
      return;
    }

    setIsRunning(true);
    setOutput(null);

    try {
      const result = await executeCode(code, token);
      setOutput(result);
    } catch (err) {
      let errorMessage = 'Failed to execute code';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setOutput({ status: 'error', error: errorMessage });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 shadow-sm group transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <Terminal className="w-4 h-4" />
          <span className="text-sm font-semibold">Python Sandbox</span>
        </div>
        <button
          onClick={handleRun}
          disabled={isRunning}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all
            ${isRunning 
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40 active:scale-95'
            }`}
        >
          {isRunning ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Play className="w-3 h-3 fill-current" />
          )}
          {isRunning ? 'Running...' : 'Run Code'}
        </button>
      </div>

      {/* Editor Area */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={`w-full p-4 font-mono text-sm bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 resize-none focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-900 transition-colors ${height}`}
          spellCheck={false}
        />
      </div>

      {/* Output Area */}
      {(output || isRunning) && (
        <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-black/40 p-4">
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-wider font-bold text-slate-500">
                <span>Output</span>
                {output?.status === 'success' && <CheckCircle2 className="w-3 h-3 text-green-500"/>}
                {output?.status === 'error' && <AlertCircle className="w-3 h-3 text-red-500"/>}
                {output?.status === 'timeout' && <RotateCcw className="w-3 h-3 text-amber-500"/>}
            </div>
            
            {isRunning ? (
                <div className="animate-pulse space-y-2 opacity-50">
                    <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/4"></div>
                    <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/2"></div>
                </div>
            ) : (
                <pre className={`font-mono text-sm whitespace-pre-wrap break-words p-2 rounded border
                    ${output?.status === 'error' 
                        ? 'text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10' 
                        : 'text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 bg-white dark:bg-black/20'}
                `}>
                    {output?.output || output?.error || 'No output'}
                </pre>
            )}
        </div>
      )}
    </div>
  );
}
