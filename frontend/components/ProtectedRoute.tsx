"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading: authIsLoading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!authIsLoading) {
      if (!user) {
        // Redirect to login if not authenticated
        router.push('/login');
      } else {
        setIsChecking(false);
      }
    } 
  }, [user, authIsLoading, router]);

  // Show loading state while checking authentication
  if (authIsLoading || isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Checking access...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated (should be caught by redirect, but as a fallback)
  if (!user) {
    return null;
  }

  return <>{children}</>;
}
