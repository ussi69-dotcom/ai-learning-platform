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
import { BookOpen, CheckCircle, Trophy, Settings, AlertTriangle } from 'lucide-react';
import DifficultyIcon from '@/components/DifficultyIcon';
import AvatarSelector from '@/components/AvatarSelector';
import axios from 'axios';

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

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t('title')}</h1>
          <p className="text-slate-600 dark:text-slate-400">{t('description')}</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/')}>
          {t('back_home')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: User Info */}
        <div className="md:col-span-1 space-y-6">
          <Card className="dark:bg-slate-900 dark:border-slate-800 overflow-hidden">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-32"></div>
            <CardContent className="pt-0 relative">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <div className="relative group cursor-pointer" onClick={() => setIsEditingAvatar(!isEditingAvatar)}>
                  <div className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-900 bg-slate-200 overflow-hidden">
                     {/* Avatar Image */}
                     <img 
                       src={`/images/avatars/${user.avatar || 'droid_1'}.webp`} 
                       alt="User Avatar"
                       className="w-full h-full object-cover"
                       onError={(e) => {e.currentTarget.src = '/images/avatars/droid_1.webp'}}
                     />
                  </div>
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="mt-14 text-center space-y-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white truncate">{user.email.split('@')[0]}</h2>
                <Badge variant={user.is_active ? "default" : "secondary"} className="bg-emerald-500 hover:bg-emerald-600">
                  {user.is_active ? t('active') : t('inactive')}
                </Badge>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mt-2">
                   <Trophy className="w-4 h-4 text-yellow-500" />
                   <span className="font-medium">{user.xp} XP</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Avatar Selector Modal/Area */}
          {isEditingAvatar && (
            <Card className="dark:bg-slate-900 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
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
          <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="w-5 h-5" />
                {t('difficulty_level')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isEditingDifficulty ? (
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
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
                <div className="space-y-3">
                  {DIFFICULTY_LEVELS.map((level) => (
                     <div 
                       key={level.value}
                       className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer border ${selectedDifficulty === level.value ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                       onClick={() => setSelectedDifficulty(level.value)}
                     >
                       <DifficultyIcon level={level.value} size={20} />
                       <span className="text-sm">{level.label}</span>
                     </div>
                  ))}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1" onClick={handleUpdateDifficulty} disabled={isUpdating}>
                      {isUpdating ? t('updating') : tCommon('save')}
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => setIsEditingDifficulty(false)}>
                      {tCommon('cancel')}
                    </Button>
                  </div>
                </div>
              )}
              <p className="text-xs text-slate-500">
                {t('difficulty_desc')}
              </p>
            </CardContent>
          </Card>

           {/* Danger Zone */}
           <Card className="border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 mt-6">
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
                variant="destructive" 
                className="w-full"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                {locale === 'cs' ? 'Smazat účet' : 'Delete Account'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Stats & Learning */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="dark:bg-slate-900 dark:border-slate-800">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t('lessons_done')}</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {/* Mock Data - needs API */}
                    0
                  </h3>
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-slate-900 dark:border-slate-800">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t('active_courses')}</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {/* Mock Data - needs API */}
                    4
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Learning Section */}
          <Card className="dark:bg-slate-900 dark:border-slate-800 min-h-[300px]">
            <CardHeader>
              <CardTitle>{t('my_learning')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-slate-500">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>{t('no_lessons')}</p>
                <Button className="mt-4" variant="outline" onClick={() => router.push('/')}>
                  Browse Courses
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-500">
              <AlertTriangle className="w-8 h-8" />
              <h3 className="text-xl font-bold">{locale === 'cs' ? 'Smazat účet?' : 'Delete Account?'}</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              {locale === 'cs' 
                ? 'Opravdu chcete smazat svůj účet? Tato akce je nevratná.' 
                : 'Are you sure you want to delete your account? This action cannot be undone.'}
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} disabled={isDeleting}>
                {tCommon('cancel')}
              </Button>
              <Button variant="destructive" onClick={handleDeleteAccount} disabled={isDeleting}>
                {isDeleting ? (locale === 'cs' ? 'Mažu...' : 'Deleting...') : (locale === 'cs' ? 'Ano, smazat' : 'Yes, Delete')}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
