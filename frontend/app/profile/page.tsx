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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
          <CardDescription>Your account information and settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Email</label>
              <p className="text-lg font-medium">{user.email}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">Account Status</label>
              <p className="text-lg font-medium">
                {user.is_active ? (
                  <span className="text-green-600">✓ Active</span>
                ) : (
                  <span className="text-red-600">✗ Inactive</span>
                )}
              </p>
            </div>
          </div>

          {/* My Learning Section */}
          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">My Learning 📚</h3>
            {myProgress.length === 0 ? (
              <p className="text-muted-foreground">You haven't completed any lessons yet. Start learning!</p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-2">
                  You have completed <span className="font-bold text-blue-600">{myProgress.length}</span> lessons!
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-700">{myProgress.length}</div>
                    <div className="text-xs text-blue-600">Lessons Done</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-700">
                      {new Set(myProgress.map((p: any) => p.course_id)).size}
                    </div>
                    <div className="text-xs text-green-600">Active Courses</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Difficulty Switcher Section */}
          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Difficulty Level</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Choose your learning level to see courses tailored to your experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {DIFFICULTY_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedDifficulty(option.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedDifficulty === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-lg">{option.label}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                  {option.value === user.difficulty && (
                    <div className="text-xs text-blue-600 mt-1">✓ Current</div>
                  )}
                </button>
              ))}
            </div>

            {message && (
              <div className={`p-3 rounded-lg mb-4 ${
                message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                {message}
              </div>
            )}

            <Button
              onClick={handleDifficultyChange}
              disabled={!hasChanges || updating}
              className="w-full"
            >
              {updating ? 'Updating...' : hasChanges ? 'Update Difficulty' : 'No Changes'}
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t space-y-3">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => router.push('/')}
            >
              Back to Home
            </Button>
            <Button 
              variant="destructive" 
              className="w-full"
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
