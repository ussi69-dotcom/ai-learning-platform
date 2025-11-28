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
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage}
      className="text-xs font-bold w-12"
    >
      {locale.toUpperCase()}
    </Button>
  );
}
