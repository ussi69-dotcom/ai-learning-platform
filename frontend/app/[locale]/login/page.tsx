"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { getErrorMessage } from '@/lib/utils';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();
  const t = useTranslations('Auth');
  const tCommon = useTranslations('Common');
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccess(t('registration_success_check_email')); // You might need to add this key to en.json/cs.json
    }
    if (searchParams.get('verified') === 'true') {
      setSuccess(t('email_verified_success')); // Add this key too
    }
    if (searchParams.get('error') === 'invalid_token') {
      setError(t('invalid_verification_token'));
    }
  }, [searchParams, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      // If the error is 401, it might be "User not verified" if backend distinguishes it.
      // Currently backend returns generic 401 for bad creds.
      setError(getErrorMessage(err, tCommon('error')));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 transition-colors duration-300">
      <Card className="w-full max-w-md dark:bg-slate-900 dark:border-slate-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{t('login_title')}</CardTitle>
          <CardDescription>
            {t('login_subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg">
                {success}
              </div>
            )}
            
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t('password')}
                </label>
                <Link href="#" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                  {t('forgot_password')}
                </Link>
              </div>
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

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 hover:opacity-90 text-white dark:bg-none dark:bg-red-600 dark:hover:bg-red-700"
              disabled={isLoading}
            >
              {isLoading ? tCommon('loading') : t('submit_login')}
            </Button>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              {t('no_account')}{' '}
              <Link href="/register" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                {t('register_link')}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}