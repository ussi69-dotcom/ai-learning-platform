import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async (params: any) => {
  // Handle both new (requestLocale) and potential legacy/misconfigured parameter names
  // In Next.js 15/16 with next-intl v4, it should be requestLocale, but we want to be safe.
  const _requestLocale = params.requestLocale || params.locale;
  
  let locale = await _requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});