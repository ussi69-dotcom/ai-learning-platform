"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DIFFICULTY_LABELS: Record<string, string> = {
  'PIECE_OF_CAKE': '🍰 Piece of Cake',
  'LETS_ROCK': '🎸 Let\'s Rock',
  'COME_GET_SOME': '💪 Come Get Some',
  'DAMN_IM_GOOD': '🔥 Damn I\'m Good',
};

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Email</label>
              <p className="text-lg font-medium">{user.email}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">Difficulty Level</label>
              <p className="text-lg font-medium">
                {DIFFICULTY_LABELS[user.difficulty] || user.difficulty}
              </p>
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
