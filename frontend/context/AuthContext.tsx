"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  difficulty: string;  // Legacy field
  is_active: boolean;
  xp: number;
  avatar: string;
  // New XP-based level system
  calculated_level: string;  // Level based on XP
  next_level_xp: number;     // XP needed for next level (-1 if max)
  xp_for_current_level: number;  // XP threshold for current level
  // Streak System (Phase 1.2)
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
  // Achievements System (Phase 1.3)
  achievements: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, difficulty: string, avatar: string, lang?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  // Level-up celebration
  levelUpData: { show: boolean; newLevel: string };
  dismissLevelUp: () => void;
}

const DEFAULT_AUTH_CONTEXT: AuthContextType = {
  user: null,
  token: null,
  login: async () => {
    throw new Error("AuthProvider not mounted.");
  },
  register: async () => {
    throw new Error("AuthProvider not mounted.");
  },
  logout: () => {},
  isLoading: true,
  refreshUser: async () => {},
  levelUpData: { show: false, newLevel: "" },
  dismissLevelUp: () => {},
};

const AuthContext = createContext<AuthContextType>(DEFAULT_AUTH_CONTEXT);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previousLevel, setPreviousLevel] = useState<string | null>(null);
  const [levelUpData, setLevelUpData] = useState<{ show: boolean; newLevel: string }>({
    show: false,
    newLevel: "",
  });
  const router = useRouter();

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const dismissLevelUp = useCallback(() => {
    setLevelUpData({ show: false, newLevel: "" });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    // No redirect here, interceptor will handle it
  }, []);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
      fetchCurrentUser(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Global Axios interceptor for 401 errors
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const originalRequest = error.config;
        // Check for 401, if we have a token (we were logged in), and it's not a login/register request
        if (error.response?.status === 401 && localStorage.getItem('auth_token') && !originalRequest._retry) {
          originalRequest._retry = true; // prevent multiple retries
          if (!originalRequest.url.includes('/auth/token') && !originalRequest.url.includes('/auth/register')) {
            console.log("Session expired, logging out.");
            logout();
            router.push('/login?session_expired=true');
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [logout, router]);

  const fetchCurrentUser = async (authToken: string, checkLevelUp: boolean = false) => {
    try {
      const response = await axios.get(`${API_BASE}/users/me?t=${Date.now()}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const newUser = response.data;

      // Level-up detection: compare with previous level
      if (checkLevelUp && previousLevel && newUser.calculated_level !== previousLevel) {
        // Level changed! Show celebration modal
        const levels = ["PIECE_OF_CAKE", "LETS_ROCK", "COME_GET_SOME", "DAMN_IM_GOOD"];
        const oldIndex = levels.indexOf(previousLevel);
        const newIndex = levels.indexOf(newUser.calculated_level);
        if (newIndex > oldIndex) {
          // User leveled UP (not down)
          setLevelUpData({ show: true, newLevel: newUser.calculated_level });
        }
      }

      // Update previous level for next comparison
      setPreviousLevel(newUser.calculated_level);
      setUser(newUser);
    } catch (error: any) {
      // Silently clear invalid/expired tokens, the interceptor will handle the redirect
      if (error.response?.status !== 401) {
        console.error('Failed to fetch user:', error);
      }
      // The interceptor will handle logout and redirect now
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const formData = new FormData();
    formData.append('username', email); // OAuth2 uses 'username' field
    formData.append('password', password);

    const response = await axios.post(`${API_BASE}/auth/token`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = response.data;
    setToken(access_token);
    localStorage.setItem('auth_token', access_token);

    // Fetch user data
    await fetchCurrentUser(access_token);
  };

  const register = async (email: string, password: string, difficulty: string, avatar: string, lang: string = "cs") => {
    const response = await axios.post(`${API_BASE}/auth/register?lang=${lang}`, {
      email,
      password,
      difficulty,
      avatar,
      is_active: true,
    });

    // Previously we did auto-login here.
    // Now we require email verification, so we just return success.
    // The component will handle the redirect to a "check your email" page or login.
  };

  const refreshUser = useCallback(async () => {
    if (token) {
      // Check for level-up when refreshing user data
      await fetchCurrentUser(token, true);
    }
  }, [token, previousLevel]);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      register,
      logout,
      isLoading,
      refreshUser,
      levelUpData,
      dismissLevelUp,
    }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (context === DEFAULT_AUTH_CONTEXT && process.env.NODE_ENV !== "production") {
    console.warn("useAuth used without AuthProvider.");
  }
  return context;
}
