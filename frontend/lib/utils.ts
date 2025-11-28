import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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