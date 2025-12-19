import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

type Locale = (typeof routing.locales)[number];

interface RequestConfigParams {
  requestLocale?: Promise<string | undefined>;
  locale?: string;
}

export default getRequestConfig(async (params: RequestConfigParams) => {
  // Handle both new (requestLocale) and potential legacy/misconfigured parameter names
  // In Next.js 15/16 with next-intl v4, it should be requestLocale, but we want to be safe.
  const _requestLocale = params.requestLocale || params.locale;

  let locale = await _requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});