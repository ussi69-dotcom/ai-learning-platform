"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  difficulty: string;
  is_active: boolean;
  xp: number;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, difficulty: string, avatar: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

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

  const fetchCurrentUser = async (authToken: string) => {
    try {
      const response = await axios.get(`${API_BASE}/users/me?t=${Date.now()}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUser(response.data);
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

  const register = async (email: string, password: string, difficulty: string, avatar: string) => {
    const response = await axios.post(`${API_BASE}/auth/register`, {
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
      await fetchCurrentUser(token);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
