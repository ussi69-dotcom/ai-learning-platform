"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'cs' : 'en';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="text-sm font-black px-2.5 h-8 min-w-[42px] border-2 border-slate-300 dark:border-slate-600 hover:border-purple-400 dark:hover:border-red-500 hover:bg-purple-50 dark:hover:bg-red-950/30 transition-all"
    >
      {locale.toUpperCase()}
    </Button>
  );
}
