"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AvatarSelector, { getAvatar } from '@/components/AvatarSelector';
import { X } from 'lucide-react'; // Import X icon
import { useTranslations } from 'next-intl';

// ... (DIFFICULTY_LABELS and DIFFICULTY_OPTIONS remain unchanged) ...
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
  const { user, logout, isLoading, token, refreshUser } = useAuth();
  const router = useRouter();
  const t = useTranslations('Profile');
  const tCommon = useTranslations('Common');
  
  const [selectedDifficulty, setSelectedDifficulty] = useState(user?.difficulty || 'LETS_ROCK');
  // ... (rest of state) ...
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || 'jedi_1');
  const [showAvatarModal, setShowAvatarModal] = useState(false); // Modal state
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [myProgress, setMyProgress] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);

  // ... (useEffect hooks remain same) ...
  // Handle redirect in useEffect to avoid React error
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
    if (user && user.difficulty) setSelectedDifficulty(user.difficulty);
    if (user && user.avatar) setSelectedAvatar(user.avatar);
  }, [isLoading, user, router]);

  useEffect(() => {
    async function fetchProgress() {
      if (!token) return;
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const progressRes = await axios.get(`${API_BASE}/users/me/progress`, { headers: { Authorization: `Bearer ${token}` } });
        setMyProgress(progressRes.data);
        const coursesRes = await axios.get(`${API_BASE}/courses/`, { headers: { Authorization: `Bearer ${token}` } });
        setCourses(coursesRes.data);
      } catch (err) { console.error('Error fetching progress:', err); }
    }
    fetchProgress();
  }, [token]);

  if (isLoading) return <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white"><p>{tCommon('loading')}</p></div>;
  if (!user) return null;

  const handleAvatarChange = async (newAvatar: string) => {
    // ... (logic remains same) ...
    setSelectedAvatar(newAvatar);
    setShowAvatarModal(false); // Close modal immediately on select
    setUpdating(true);
    setMessage('');

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      await axios.put(`${API_BASE}/users/me/avatar`, { avatar: newAvatar }, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
      setMessage('✅ Avatar updated!');
      await refreshUser();
      // setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      console.error('Error updating avatar:', error);
      setMessage('❌ Failed to update avatar.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDifficultyChange = async () => {
    if (selectedDifficulty === user.difficulty) { setMessage(t('no_changes')); return; }
    const confirmed = window.confirm(`Are you sure you want to switch to ${DIFFICULTY_LABELS[selectedDifficulty]}?\n\nYou\'ll see different courses suited to your new difficulty level.`);
    if (!confirmed) return;
    setUpdating(true); setMessage('');
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      await axios.put(`${API_BASE}/users/me/difficulty`, { difficulty: selectedDifficulty }, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, params: { difficulty: selectedDifficulty } });
      setMessage('✅ Difficulty updated!');
      await refreshUser();
      // setTimeout(() => { window.location.reload(); }, 1000);
    } catch (error: any) { console.error('Error updating difficulty:', error); setMessage('❌ Failed to update difficulty. Please try again.'); } finally { setUpdating(false); }
  };

  const handleLogout = () => { logout(); router.push('/'); };
  const hasChanges = selectedDifficulty !== user.difficulty;
  
  const avatarObj = getAvatar(selectedAvatar);
  const AvatarIcon = avatarObj.type === 'ICON' ? avatarObj.icon : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 transition-colors duration-300 relative">
      
      {/* Inject Gradients */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="grad-jedi" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#ffffff" /></linearGradient>
          <linearGradient id="grad-sith" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ef4444" /><stop offset="100%" stopColor="#f59e0b" /></linearGradient>
          <linearGradient id="grad-cyber" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#d946ef" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient>
          <linearGradient id="grad-gold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fbbf24" /><stop offset="100%" stopColor="#fef3c7" /></linearGradient>
          <linearGradient id="grad-tech" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient>
        </defs>
      </svg>

      {/* --- AVATAR MODAL --- */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-lg font-bold dark:text-white">{t('choose_avatar')}</h3>
              <button onClick={() => setShowAvatarModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <X className="w-5 h-5 dark:text-slate-400" />
              </button>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-950/50">
               <AvatarSelector selectedAvatar={selectedAvatar} onSelect={handleAvatarChange} />
            </div>
          </div>
        </div>
      )}

      <Card className="w-full max-w-2xl dark:bg-slate-900 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold dark:text-white">{t('title')}</CardTitle>
          <CardDescription className="dark:text-slate-400">{t('description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
               <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Email</label>
                  <p className="text-lg font-medium dark:text-slate-200">{user.email}</p>
               </div>
               {/* Avatar Button */}
               <div className="text-center">
                  <button 
                    onClick={() => setShowAvatarModal(true)}
                    className={`group relative w-24 h-24 rounded-2xl border-4 ${avatarObj.bg} border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all duration-300 flex items-center justify-center overflow-hidden shadow-lg`}
                  >
                    {avatarObj.type === 'IMAGE' ? (
                      <img src={avatarObj.src} alt={avatarObj.label} className="w-20 h-20 object-contain group-hover:scale-110 transition-transform" />
                    ) : (
                      <AvatarIcon 
                        className="w-14 h-14 group-hover:scale-110 transition-transform" 
                        style={{ stroke: avatarObj.gradient, strokeWidth: 1.5 }}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-xs text-white font-bold">EDIT</span>
                    </div>
                  </button>
                  <p className="text-xs text-slate-500 mt-2">{avatarObj.label}</p>
               </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">{t('account_status')}</label>
              <p className="text-lg font-medium dark:text-slate-200">
                {user.is_active ? (
                  <span className="text-green-600 dark:text-green-400">✓ {t('active')}</span>
                ) : (
                  <span className="text-red-600 dark:text-red-400">✗ {t('inactive')}</span>
                )}
              </p>
            </div>
          </div>

          {/* My Learning Section */}
          <div className="pt-6 border-t dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">{t('my_learning')}</h3>
            {myProgress.length === 0 ? (
              <p className="text-slate-600 dark:text-slate-400">{t('no_lessons')}</p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {t.rich('lessons_completed', {
                    count: myProgress.length,
                    bold: (chunks) => <span className="font-bold text-blue-600 dark:text-blue-400">{chunks}</span>
                  })}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg text-center border border-blue-100 dark:border-blue-800">
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{myProgress.length}</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">{t('lessons_done')}</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg text-center border border-green-100 dark:border-green-800">
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {new Set(myProgress.map((p: any) => p.course_id)).size}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">{t('active_courses')}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Difficulty Switcher Section */}
          <div className="pt-6 border-t dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">{t('difficulty_level')}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {t('difficulty_desc')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {DIFFICULTY_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedDifficulty(option.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${selectedDifficulty === option.value
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-400'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 dark:bg-slate-800'
                  }`}
                >
                  <div className="font-semibold text-lg dark:text-slate-200">{option.label}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{option.description}</div>
                  {option.value === user.difficulty && (
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">✓ {t('current')}</div>
                  )}
                </button>
              ))}
            </div>

            {message && (
              <div className={`p-3 rounded-lg mb-4 ${message.includes('✅') 
                  ? 'bg-green-50 text-green-800 dark:bg-green-950/30 dark:text-green-200 border border-green-200 dark:border-green-800' 
                  : 'bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-200 border border-red-200 dark:border-red-800'
              }`}>
                {message}
              </div>
            )}

            <Button
              onClick={handleDifficultyChange}
              disabled={!hasChanges || updating}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
            >
              {updating ? t('updating') : hasChanges ? t('update_difficulty') : t('no_changes')}
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t dark:border-slate-700 space-y-3">
            <Button 
              variant="outline" 
              className="w-full dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              onClick={() => router.push('/')}
            >
              {t('back_home')}
            </Button>
            <Button 
              variant="destructive" 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={handleLogout}
            >
              {tCommon('logout') || 'Logout'} 
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}