"use client";

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AvatarSelector from '@/components/AvatarSelector';
import { useTranslations, useLocale } from 'next-intl';
import { getErrorMessage } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';

const MIN_PASSWORD_LENGTH = 8;

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState('jedi_1');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();
  const t = useTranslations('Auth');
  const tCommon = useTranslations('Common');
  const locale = useLocale();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(locale === 'cs' ? 'Hesla se neshodují' : 'Passwords do not match');
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(t('password_min_length', { min_length: MIN_PASSWORD_LENGTH }));
      return;
    }
    if (!/\d/.test(password)) {
      setError(t('password_one_number'));
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError(t('password_one_uppercase'));
      return;
    }

    setIsLoading(true);

    try {
      // New users start at PIECE_OF_CAKE, level up automatically via XP
      await register(email, password, 'PIECE_OF_CAKE', avatar);
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(getErrorMessage(err, tCommon('error')));
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

            {/* Password Requirements */}
            <div className="space-y-2 text-sm">
              <p className="font-medium text-slate-700 dark:text-slate-300">{t('password_requirements')}</p>
              <ul className="space-y-1">
                <li className={`flex items-center gap-2 ${password.length >= MIN_PASSWORD_LENGTH ? 'text-green-500' : 'text-red-500'}`}>
                  {password.length >= MIN_PASSWORD_LENGTH ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {t('password_min_length', { min_length: MIN_PASSWORD_LENGTH })}
                </li>
                <li className={`flex items-center gap-2 ${/\d/.test(password) ? 'text-green-500' : 'text-red-500'}`}>
                  {/\d/.test(password) ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {t('password_one_number')}
                </li>
                <li className={`flex items-center gap-2 ${/[A-Z]/.test(password) ? 'text-green-500' : 'text-red-500'}`}>
                  {/[A-Z]/.test(password) ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {t('password_one_uppercase')}
                </li>
              </ul>
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

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 hover:opacity-90 text-white dark:bg-none dark:bg-red-600 dark:hover:bg-red-700" 
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