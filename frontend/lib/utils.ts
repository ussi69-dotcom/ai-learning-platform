import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Smart API URL detection:
 * - localhost:3333 (dev direct) → http://localhost:8000
 * - nginx (port 80, learnai.cz, etc.) → /api (relative)
 */
export function getApiBaseUrl(): string {
  if (typeof window === 'undefined') {
    // Server-side: use env var or default
    return process.env.NEXT_PUBLIC_API_URL || 'http://backend:8000';
  }

  const { hostname, port } = window.location;

  // Direct dev access on port 3333 → use localhost backend
  if (hostname === 'localhost' && port === '3333') {
    return 'http://localhost:8000';
  }

  // Any other access (nginx, production) → use /api relative path
  return '/api';
}

export function getErrorMessage(err: any, fallback: string = 'An unexpected error occurred'): string {
  const detail = err.response?.data?.detail;
  if (Array.isArray(detail)) {
    // Handle Pydantic validation errors (array of objects)
    return detail.map((e: any) => e.msg).join(', ');
  } else if (typeof detail === 'string') {
    // Handle standard string errors
    return detail;
  }
  return fallback;
}