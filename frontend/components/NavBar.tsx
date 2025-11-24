"use client";

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import JediSithToggle from './JediSithToggle';
import XPProgressBar from './XPProgressBar';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NavBar() {
  const { user, logout, token } = useAuth();
  const [progressStats, setProgressStats] = useState({ level: 1, xp: 0, maxXp: 500 });

      // Fetch simplified progress for the Navbar
  useEffect(() => {
    if (!user || !token) return;

    const fetchStats = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await axios.get(`${API_BASE}/users/me/progress`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Calculate Level based on difficulty
        let level = 1;
        let maxXp = 500;
        if (user.difficulty === 'LETS_ROCK') { level = 2; maxXp = 1000; }
        if (user.difficulty === 'COME_GET_SOME') { level = 3; maxXp = 2000; }
        if (user.difficulty === 'DAMN_IM_GOOD') { level = 4; maxXp = 5000; }

        // Calculate XP (Simple mock: 50 XP per lesson)
        const xp = res.data.length * 50;

        setProgressStats({ level, xp, maxXp });
      } catch (e) {
        console.error("Nav stats error", e);
      }
    };

    fetchStats();
    
    // Poll every 5 seconds to update XP
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, [user, token]);

  return (
    <nav className="border-b bg-white/80 dark:bg-slate-950/90 backdrop-blur-md border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            AI Learning
          </Link>
        </div>
        
        {/* Center: XP Bar (Only when logged in) */}
        {user && (
          <div className="hidden md:flex flex-1 justify-center">
            <XPProgressBar 
              currentXP={progressStats.xp} 
              nextLevelXP={progressStats.maxXp} 
              level={progressStats.level}
              className="w-full max-w-[200px]" // Reduced width significantly
            />
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          
          {/* Theme Toggle */}
          <JediSithToggle />

          {user ? (
            <>
              <Link href="/profile">
                <Button variant="outline" size="sm" className="dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 hidden sm:flex">
                  Profile
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={logout}
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Logout
              </Button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm" className="dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground border-none">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
