import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import en from '@/locales/en.json';
import fa from '@/locales/fa.json';
import ps from '@/locales/ps.json';
import { routing } from './I18nRouting';

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});

const dictionaries: Record<string, any> = {
  en,
  fa,
  ps,
};

function getByNamespace(obj: any, namespace: string) {
  return namespace
    .split('.')
    .reduce((acc, key) => acc?.[key], obj);
}

export async function getApiTranslations(
  language: string,
  namespace: string,
) {
  const dict = dictionaries[language] || dictionaries.en;
  const scoped = getByNamespace(dict, namespace);

  if (!scoped) {
    throw new Error(`Missing namespace: ${namespace}`);
  }

  return (key: string) => scoped[key] ?? key;
}
