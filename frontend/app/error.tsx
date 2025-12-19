"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console in development
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-2">
          Something went wrong!
        </h1>

        {/* Description */}
        <p className="text-slate-400 mb-6">
          An unexpected error occurred. Don&apos;t worry, our droids are
          investigating the disturbance in the Force.
        </p>

        {/* Error digest (for debugging) */}
        {error.digest && (
          <p className="text-xs text-slate-500 mb-6 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-violet-600 hover:bg-violet-700 dark:bg-red-600 dark:hover:bg-red-700 text-white gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>

          <Link href="/">
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 gap-2 w-full sm:w-auto"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Decorative element */}
        <div className="mt-12 flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-slate-700 animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
