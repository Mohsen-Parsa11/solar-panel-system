import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';

import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Toaster } from 'sonner';
import { cn } from '@/libs/cn';
import { geist, sahel, vazir_matn } from '@/libs/fonts';
import { routing } from '@/libs/I18nRouting';
import { isRTL } from '@/utils/Helpers';

import '@/styles/global.css';
import 'react-loading-skeleton/dist/skeleton.css';

function parseSeoKeywords(input: string): string[] {
  try {
    const parsed = JSON.parse(input);
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === 'string');
    }
  } catch {
    // Fallback below
  }

  return input
    .split(',')
    .map(keyword => keyword.trim())
    .filter(Boolean);
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('seo.layout');
  return {
    title: {
      template: '%s - Dawood Hewadwal',
      default: 'Dawood Hewadwal',
    },
    description: t('description'),
    keywords: parseSeoKeywords(t('keywords')),
    publisher: 'MarsCoders',
    authors: [
      { name: 'Sayeed Mahdi Mousavi', url: 'https://github.com/SayeedMahdi' },
      { name: 'Mohsen Pars', url: 'https://github.com/Mohsen-Parsa11' },
      { name: 'Ali Yasir Mousavi', url: 'https://github.com/Aliyaser-Mousavi' },
    ],
    icons: [
      {
        rel: 'apple-touch-icon',
        url: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
  };
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const rtl = isRTL(locale);

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = (await import(`@/locales/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body
        dir={rtl ? 'rtl' : 'ltr'}
        className={cn(
          'relative overflow-x-hidden',
          locale === 'en' ? geist.className : '',
          locale === 'fa' ? sahel.className : '',
          locale === 'ps' ? vazir_matn.className : '',
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {props.children}
          <Toaster
            dir={rtl ? 'rtl' : 'ltr'}
            richColors
            toastOptions={{
              classNames: {
                success: 'bg-white text-green-500',
                error: 'bg-white text-red-500',
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
