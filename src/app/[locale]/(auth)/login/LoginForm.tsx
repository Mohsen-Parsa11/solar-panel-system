'use client';
import { Eye, EyeOff, KeyRound, Mail } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { authClient } from '@/libs/AuthClient';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const t = useTranslations('login');
  const locale = useLocale();
  async function onSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setError('');
    setIsPending(true);
    const result = await authClient.signIn.email({
      email,
      password,
      callbackURL: `/${locale}/dashboard`,
    });
    setIsPending(false);
    if (result.error) {
      setError(result.error.message ?? t('invalidLogin'));
      return;
    }
    router.push(`/${locale}/dashboard`);
    router.refresh();
  }

  return (
    <div className="w-full max-w-145 border border-gray-50 bg-white px-4 py-6 shadow-sm sm:px-6 sm:py-9">
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="relative mb-4 h-20 w-20">
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-sky-100 shadow-sm">
            <Image
              src="/assets/images/login-logo.png"
              alt="Dawood Hewadwal Logo"
              fill
              sizes="80px"
              className="object-contain p-2"
            />
          </div>
        </div>
        <h1 className="text-[32px] font-semibold text-[#131313]">{t('welcome')}</h1>
        <p className="mt-2 text-[16px] font-medium text-[#686868]">{t('loginSubtitle')}</p>
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
              placeholder={t('emailPlaceholder')}
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-[#344054]">
            {t('password')}
          </label>
          <div className="group flex h-12 items-center gap-4 rounded-sm border border-[#E4E4E4] px-3.5 transition-all focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
            <KeyRound size={20} className="text-[#686868] group-focus-within:text-sky-500" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder={t('passwordPlaceholder')}
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-[#727E8D]"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="mt-1.75 text-right">
            <Link
              href={`/${locale}/forgot-password`}
              className="text-sm font-medium text-[#0091D0] hover:underline"
            >
              {t('forgotPassword')}
            </Link>
          </div>
        </div>
        {error && (
          <p className="mt-4 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="mt-8 flex h-11 w-full cursor-pointer items-center justify-center rounded-sm bg-[#00496E] text-sm font-semibold text-white transition hover:bg-[#003a5a] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? t('loggingIn') : t('login')}
        </button>
      </form>
    </div>
  );
}
