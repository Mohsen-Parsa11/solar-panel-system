'use client';

import { ArrowLeft, Mail } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { authClient } from '@/libs/AuthClient';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const t = useTranslations('login');
  const locale = useLocale();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setMessage('');
    setIsPending(true);

    const result = await authClient.requestPasswordReset({
      email,
      redirectTo: `/${locale}/reset-password`,
    });

    setIsPending(false);

    if (result.error) {
      setError(result.error.message ?? t('resetSendError'));
      return;
    }

    setMessage(t('resetSent'));
  }

  return (
    <div className="w-full max-w-145 border border-gray-50 bg-white px-4 py-6 shadow-sm sm:px-6 sm:py-9">
      <div className="mb-6 flex">
        <Link
          href={`/${locale}/login`}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#686868] transition-colors hover:text-[#131313]"
        >
          <ArrowLeft size={18} className="rtl:rotate-180" />
          {t('back')}
        </Link>
      </div>
      <div className="mb-10 flex flex-col items-center text-center">
        <h1 className="text-[32px] font-semibold text-[#131313]">{t('forgotTitle')}</h1>
        <p className="mt-2 text-[16px] font-medium text-[#686868]">{t('forgotSubtitle')}</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-[#344054]">
            {t('email')}
          </label>
          <div className="group flex h-12 items-center gap-4 rounded-sm border border-[#E4E4E4] px-3.5 transition-all focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
            <Mail size={20} className="text-[#686868] group-focus-within:text-sky-500" />
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder={t('emailPlaceholder')}
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>
        {error && (
          <p className="mt-4 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        {message && (
          <p className="mt-4 rounded-sm border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="mt-8 flex h-11 w-full cursor-pointer items-center justify-center rounded-sm bg-[#00496E] text-sm font-semibold text-white transition hover:bg-[#003a5a] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? t('sending') : t('continue')}
        </button>
      </form>
    </div>
  );
}
