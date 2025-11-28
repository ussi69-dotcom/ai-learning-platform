"use client";

import { useState } from 'react';
import { useRouter } from '@/i18n/routing'; // Updated import
import { Link } from '@/i18n/routing'; // Updated import
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AvatarSelector from '@/components/AvatarSelector';
import { useTranslations, useLocale } from 'next-intl';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [difficulty, setDifficulty] = useState('LETS_ROCK');
  const [avatar, setAvatar] = useState('jedi_1'); // Default avatar
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const router = useRouter();
  const t = useTranslations('Auth');
  const tCommon = useTranslations('Common');
  const locale = useLocale();

  // Ideally move this to messages.json, but for now logic is here
  const DIFFICULTY_LEVELS = [
    { value: 'PIECE_OF_CAKE', label: '🍰 Piece of Cake', description: locale === 'cs' ? 'Snadný režim pro začátečníky' : 'Easy mode for beginners' },
    { value: 'LETS_ROCK', label: '🎸 Let\'s Rock', description: locale === 'cs' ? 'Normální obtížnost' : 'Normal difficulty' },
    { value: 'COME_GET_SOME', label: '💪 Come Get Some', description: locale === 'cs' ? 'Těžký režim pro zkušené' : 'Hard mode for experienced learners' },
    { value: 'DAMN_IM_GOOD', label: '🔥 Damn I\'m Good', description: locale === 'cs' ? 'Expert mód - žádná pomoc' : 'Expert mode - no hand-holding' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(locale === 'cs' ? 'Hesla se neshodují' : 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError(locale === 'cs' ? 'Heslo musí mít alespoň 6 znaků' : 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password, difficulty, avatar);
      router.push('/'); // Redirect to home after successful registration
    } catch (err: any) {
      setError(err.response?.data?.detail || tCommon('error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 transition-colors duration-300">
      <Card className="w-full max-w-md dark:bg-slate-900 dark:border-slate-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{t('register_title')}</CardTitle>
          <CardDescription>
            {locale === 'cs' ? 'Vytvořte si účet a začněte se učit' : 'Create an account to start learning'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg">
                {error}
              </div>
            )}
            
            {/* --- Avatar Selection --- */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block">
                {locale === 'cs' ? 'Vyberte si avatara' : 'Choose your Avatar'}
              </label>
              <AvatarSelector 
                selectedAvatar={avatar} 
                onSelect={setAvatar} 
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('confirm_password')}
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {locale === 'cs' ? 'Obtížnost' : 'Difficulty Level'}
              </label>
              <div className="space-y-2">
                {DIFFICULTY_LEVELS.map((level) => (
                  <label
                    key={level.value}
                    className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${difficulty === level.value
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-400'
                        : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 dark:bg-slate-800'}`}
                  >
                    <input
                      type="radio"
                      name="difficulty"
                      value={level.value}
                      checked={difficulty === level.value}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="mt-1 mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-slate-900 dark:text-white">{level.label}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">{level.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
              disabled={isLoading}
            >
              {isLoading ? tCommon('loading') : t('submit_register')}
            </Button>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              {t('has_account')}{' '}
              <Link href="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                {t('login_link')}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}