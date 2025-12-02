"use client";

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useTranslations, useLocale } from 'next-intl';
import { BookOpen, CheckCircle, Trophy, Settings, AlertTriangle, Sparkles, Zap, Shield, Crown } from 'lucide-react';
import DifficultyIcon from '@/components/DifficultyIcon';
import AvatarSelector, { getAvatar } from '@/components/AvatarSelector';
import axios from 'axios';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const { user, logout, refreshUser, token } = useAuth();
  const t = useTranslations('Profile');
  const tCommon = useTranslations('Common');
  const router = useRouter();
  const locale = useLocale();

  const [isEditingDifficulty, setIsEditingDifficulty] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(user?.difficulty || 'LETS_ROCK');
  const [isUpdating, setIsUpdating] = useState(false);

  // Delete Account State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Ideally move this to messages.json, but for now logic is here
  const DIFFICULTY_LEVELS = [
    { value: 'PIECE_OF_CAKE', label: 'Piece of Cake' },
    { value: 'LETS_ROCK', label: 'Let\'s Rock' },
    { value: 'COME_GET_SOME', label: 'Come Get Some' },
    { value: 'DAMN_IM_GOOD', label: 'Damn I\'m Good' },
  ];

  const handleUpdateDifficulty = async () => {
    if (!user || selectedDifficulty === user.difficulty) {
      setIsEditingDifficulty(false);
      return;
    }

    setIsUpdating(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      await axios.put(
        `${API_BASE}/users/me/difficulty`,
        { difficulty: selectedDifficulty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await refreshUser();
      setIsEditingDifficulty(false);
    } catch (error) {
      console.error('Failed to update difficulty', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateAvatar = async (avatarId: string) => {
    setIsUpdating(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      await axios.put(
        `${API_BASE}/users/me/avatar`,
        { avatar: avatarId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await refreshUser();
      setIsEditingAvatar(false);
    } catch (error) {
      console.error('Failed to update avatar', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      await axios.delete(
        `${API_BASE}/users/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      logout();
      router.push('/');
    } catch (error) {
      console.error('Failed to delete account', error);
      alert(tCommon('error') + ': Failed to delete account');
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{tCommon('loading')}</h2>
          <Button onClick={() => router.push('/login')}>{t('login')}</Button>
        </div>
      </div>
    );
  }

  const currentAvatar = getAvatar(user.avatar || 'droid_1');

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Ensure Gradients are available for the profile avatar even when selector is closed */}
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <div>
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 mb-2">{t('title')}</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">{t('description')}</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/')} className="backdrop-blur-sm bg-white/50 dark:bg-slate-900/50">
          {t('back_home')}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: User Info */}
        <div className="lg:col-span-4 space-y-6">

          {/* User Card */}
          <Card className="relative overflow-hidden border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl group">
            {/* Ambient Background Glow - Corrected for Dark Mode (Red/Sith) */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-red-900/10 dark:via-orange-900/10 dark:to-slate-900/10 opacity-100 transition-opacity duration-500"></div>

            {/* Decorative Circles - Corrected for Dark Mode */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 dark:bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/20 dark:bg-orange-500/10 rounded-full blur-3xl"></div>

            <CardContent className="pt-12 pb-8 relative z-10 flex flex-col items-center text-center">

              {/* Avatar Container */}
              <div className="relative mb-6 group-hover:scale-105 transition-transform duration-300">
                <div className={cn(
                  "w-32 h-32 rounded-full p-1 shadow-2xl bg-white dark:bg-slate-800",
                  currentAvatar.bg.replace('/10', '/30') // Make bg slightly stronger for border effect
                )}>
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center relative">
                    {currentAvatar.type === 'IMAGE' ? (
                      <img
                        src={currentAvatar.src}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <currentAvatar.icon
                        className="w-16 h-16"
                        style={{ stroke: currentAvatar.color, strokeWidth: 1.5 }}
                      />
                    )}

                    {/* Edit Overlay */}
                    <div
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                    >
                      <Settings className="w-8 h-8 text-white animate-spin-slow" />
                    </div>
                  </div>
                </div>
                {/* Status Indicator */}
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-slate-900 rounded-full" title="Online"></div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{user.email.split('@')[0]}</h2>
              <div className="flex items-center gap-2 mb-6">
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                  {user.is_active ? t('active') : t('inactive')}
                </Badge>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  {user.xp} XP
                </Badge>
              </div>

              <div className="w-full grid grid-cols-2 gap-4 text-left">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                  <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-1">Level</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Crown className="w-4 h-4 text-yellow-500" />
                    1
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                  <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-1">Rank</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-indigo-500 dark:text-red-500" />
                    Novice
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Avatar Selector Modal/Area */}
          {isEditingAvatar && (
            <Card className="dark:bg-slate-900 dark:border-slate-800 animate-in fade-in zoom-in duration-200 shadow-2xl border-indigo-500/20 dark:border-red-500/20">
              <CardHeader>
                <CardTitle className="text-lg">{t('choose_avatar')}</CardTitle>
              </CardHeader>
              <CardContent>
                <AvatarSelector
                  selectedAvatar={user.avatar || 'droid_1'}
                  onSelect={(avatar) => handleUpdateAvatar(avatar)}
                />
                <Button
                  variant="ghost"
                  className="w-full mt-4"
                  onClick={() => setIsEditingAvatar(false)}
                >
                  {tCommon('cancel')}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Difficulty Settings */}
          <Card className="dark:bg-slate-900/50 dark:border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="w-5 h-5 text-slate-500" />
                {t('difficulty_level')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isEditingDifficulty ? (
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 transition-colors hover:border-indigo-500/30 dark:hover:border-red-500/30">
                  <div className="flex items-center gap-3">
                    <DifficultyIcon level={user.difficulty} />
                    <span className="font-medium">{DIFFICULTY_LEVELS.find(l => l.value === user.difficulty)?.label}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => {
                    setSelectedDifficulty(user.difficulty);
                    setIsEditingDifficulty(true);
                  }}>
                    Edit
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                  {DIFFICULTY_LEVELS.map((level) => (
                    <div
                      key={level.value}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all duration-200",
                        selectedDifficulty === level.value
                          ? 'border-indigo-500 bg-indigo-50 dark:border-red-500 dark:bg-red-900/20 shadow-sm'
                          : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
                      )}
                      onClick={() => setSelectedDifficulty(level.value)}
                    >
                      <DifficultyIcon level={level.value} size={20} />
                      <span className="text-sm font-medium">{level.label}</span>
                    </div>
                  ))}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-red-600 dark:hover:bg-red-700" onClick={handleUpdateDifficulty} disabled={isUpdating}>
                      {isUpdating ? t('updating') : tCommon('save')}
                    </Button>
                    <Button size="sm" variant="ghost" className="flex-1" onClick={() => setIsEditingDifficulty(false)}>
                      {tCommon('cancel')}
                    </Button>
                  </div>
                </div>
              )}
              <p className="text-xs text-slate-500 px-1">
                {t('difficulty_desc')}
              </p>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/10 mt-6 overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <CardHeader>
              <CardTitle className="text-lg text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {locale === 'cs' ? 'Smazání účtu je nevratné. Přijdete o veškerý postup a získané XP.' : 'Deleting your account is irreversible. You will lose all progress and XP.'}
              </p>
              <Button
                variant="outline"
                className="w-full border-red-200 hover:bg-red-50 text-red-600 dark:border-red-900/50 dark:hover:bg-red-900/20 dark:text-red-400"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                {locale === 'cs' ? 'Smazat účet' : 'Delete Account'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Stats & Learning */}
        <div className="lg:col-span-8 space-y-6">

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="dark:bg-slate-900/50 dark:border-slate-800 backdrop-blur-sm hover:border-indigo-500/30 dark:hover:border-red-500/30 transition-colors group">
              <CardContent className="p-6 flex items-center gap-5">
                <div className="p-4 rounded-2xl bg-indigo-100 dark:bg-red-500/10 text-indigo-600 dark:text-red-400 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('lessons_done')}</p>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                    {/* Mock Data - needs API */}
                    0
                  </h3>
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-slate-900/50 dark:border-slate-800 backdrop-blur-sm hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-colors group">
              <CardContent className="p-6 flex items-center gap-5">
                <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('active_courses')}</p>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                    {/* Mock Data - needs API */}
                    4
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Learning Section */}
          <Card className="dark:bg-slate-900/50 dark:border-slate-800 min-h-[400px] backdrop-blur-sm flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500 dark:text-red-500" />
                {t('my_learning')}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center py-12 max-w-md mx-auto">
                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <BookOpen className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {t('no_lessons')}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                  {locale === 'cs' ? 'Zatím jste nedokončili žádné lekce. Vydejte se na cestu poznání!' : 'You haven\'t completed any lessons yet. Embark on your journey of knowledge!'}
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-red-600 dark:to-orange-600 dark:hover:from-red-700 dark:hover:to-orange-700 text-white shadow-lg shadow-indigo-500/25 dark:shadow-red-500/25"
                  onClick={() => router.push('/')}
                >
                  {locale === 'cs' ? 'Procházet kurzy' : 'Browse Courses'}
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{locale === 'cs' ? 'Smazat účet?' : 'Delete Account?'}</h3>
              <p className="text-slate-600 dark:text-slate-300">
                {locale === 'cs'
                  ? 'Opravdu chcete smazat svůj účet? Tato akce je nevratná a přijdete o všechna data.'
                  : 'Are you sure you want to delete your account? This action cannot be undone and you will lose all data.'}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setIsDeleteModalOpen(false)} disabled={isDeleting}>
                {tCommon('cancel')}
              </Button>
              <Button variant="destructive" className="flex-1" onClick={handleDeleteAccount} disabled={isDeleting}>
                {isDeleting ? (locale === 'cs' ? 'Mažu...' : 'Deleting...') : (locale === 'cs' ? 'Ano, smazat' : 'Yes, Delete')}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
