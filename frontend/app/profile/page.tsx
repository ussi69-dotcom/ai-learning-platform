"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import axios from 'axios';

const DIFFICULTY_LABELS: Record<string, string> = {
  'PIECE_OF_CAKE': '🍰 Piece of Cake',
  'LETS_ROCK': '🎸 Let\'s Rock',
  'COME_GET_SOME': '💪 Come Get Some',
  'DAMN_IM_GOOD': '🔥 Damn I\'m Good',
};

const DIFFICULTY_OPTIONS = [
  { value: 'PIECE_OF_CAKE', label: '🍰 Piece of Cake', description: 'AI basics for absolute beginners' },
  { value: 'LETS_ROCK', label: '🎸 Let\'s Rock', description: 'Practical prompt engineering' },
  { value: 'COME_GET_SOME', label: '💪 Come Get Some', description: 'Advanced AI techniques' },
  { value: 'DAMN_IM_GOOD', label: '🔥 Damn I\'m Good', description: 'AI engineering deep dive' },
];

export default function ProfilePage() {
  const { user, logout, isLoading, token } = useAuth();
  const router = useRouter();
  const [selectedDifficulty, setSelectedDifficulty] = useState(user?.difficulty || 'LETS_ROCK');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [myProgress, setMyProgress] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);

  // Handle redirect in useEffect to avoid React error
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    async function fetchProgress() {
      if (!token) return;
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        
        // Fetch user progress
        const progressRes = await axios.get(`${API_BASE}/users/me/progress`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMyProgress(progressRes.data);

        // Fetch all courses to map IDs to titles
        const coursesRes = await axios.get(`${API_BASE}/courses/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(coursesRes.data);
      } catch (err) {
        console.error('Error fetching progress:', err);
      }
    }
    fetchProgress();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  const handleDifficultyChange = async () => {
    if (selectedDifficulty === user.difficulty) {
      setMessage('This is already your current difficulty!');
      return;
    }

    // Confirmation
    const confirmed = window.confirm(
      `Are you sure you want to switch to ${DIFFICULTY_LABELS[selectedDifficulty]}?\n\nYou'll see different courses suited to your new difficulty level.`
    );

    if (!confirmed) return;

    setUpdating(true);
    setMessage('');

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      await axios.put(
        `${API_BASE}/users/me/difficulty`,
        { difficulty: selectedDifficulty },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          params: { difficulty: selectedDifficulty }
        }
      );

      setMessage('✅ Difficulty updated! Redirecting...');
      
      // Refresh page to reload user data
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      console.error('Error updating difficulty:', error);
      setMessage('❌ Failed to update difficulty. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const hasChanges = selectedDifficulty !== user.difficulty;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-12">
      <Card className="w-full max-w-2xl dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold dark:text-white">Profile</CardTitle>
          <CardDescription className="dark:text-slate-400">Your account information and settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Email</label>
              <p className="text-lg font-medium dark:text-slate-200">{user.email}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Account Status</label>
              <p className="text-lg font-medium dark:text-slate-200">
                {user.is_active ? (
                  <span className="text-green-600 dark:text-green-400">✓ Active</span>
                ) : (
                  <span className="text-red-600 dark:text-red-400">✗ Inactive</span>
                )}
              </p>
            </div>
          </div>

          {/* My Learning Section */}
          <div className="pt-6 border-t dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">My Learning 📚</h3>
            {myProgress.length === 0 ? (
              <p className="text-slate-600 dark:text-slate-400">You haven't completed any lessons yet. Start learning!</p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  You have completed <span className="font-bold text-blue-600 dark:text-blue-400">{myProgress.length}</span> lessons!
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg text-center border dark:border-blue-800">
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{myProgress.length}</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">Lessons Done</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg text-center border dark:border-green-800">
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {new Set(myProgress.map((p: any) => p.course_id)).size}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">Active Courses</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Difficulty Switcher Section */}
          <div className="pt-6 border-t dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Difficulty Level</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Choose your learning level to see courses tailored to your experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {DIFFICULTY_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedDifficulty(option.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedDifficulty === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 dark:border-blue-400'
                      : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 dark:bg-slate-900'
                  }`}
                >
                  <div className="font-semibold text-lg dark:text-slate-200">{option.label}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{option.description}</div>
                  {option.value === user.difficulty && (
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">✓ Current</div>
                  )}
                </button>
              ))}
            </div>

            {message && (
              <div className={`p-3 rounded-lg mb-4 ${
                message.includes('✅') 
                  ? 'bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200 dark:border dark:border-green-800' 
                  : 'bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200 dark:border dark:border-red-800'
              }`}>
                {message}
              </div>
            )}

            <Button
              onClick={handleDifficultyChange}
              disabled={!hasChanges || updating}
              className="w-full dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {updating ? 'Updating...' : hasChanges ? 'Update Difficulty' : 'No Changes'}
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t dark:border-slate-700 space-y-3">
            <Button 
              variant="outline" 
              className="w-full dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
              onClick={() => router.push('/')}
            >
              Back to Home
            </Button>
            <Button 
              variant="destructive" 
              className="w-full dark:bg-red-700 dark:hover:bg-red-800"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
