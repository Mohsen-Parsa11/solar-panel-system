'use client';
import { ArrowLeft, Eye, EyeOff, KeyRound } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { authClient } from '@/libs/AuthClient';

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const t = useTranslations('login');
  const locale = useLocale();
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError(t('passwordMismatch') || 'Passwords do not match.');
      return;
    }
    setIsPending(true);
    const result = await authClient.resetPassword({
      newPassword: password,
      token,
    });
    setIsPending(false);
    if (result.error) {
      setError(result.error.message ?? (t('resetError') || 'An error occurred while resetting the password.'));
      return;
    }
    router.push(`/${locale}/forgot-password`);
  }
  return (
    <div className="w-full max-w-145 border border-gray-50 bg-white px-4 py-6 shadow-sm sm:px-6 sm:py-9">
      <div className="mb-6 flex">
        <Link
          href={`/${locale}/forgot-password`}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#686868] transition-colors hover:text-[#131313]"
        >
          <ArrowLeft size={18} className="rtl:rotate-180" />
          {t('back')}
        </Link>
      </div>
      <div className="mb-10 flex flex-col items-start text-left">
        <h1 className="text-[32px] font-semibold text-[#131313]">{t('resetTitle')}</h1>
        <p className="mt-2 text-[16px] font-medium text-[#686868]">{t('resetSubtitle')}</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-[#344054]">
            {t('newPassword')}
          </label>
          <div className="group flex h-12 items-center gap-4 rounded-sm border border-[#E4E4E4] px-3.5 transition-all focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
            <KeyRound size={20} className="text-[#686868] group-focus-within:text-sky-500" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              placeholder="******"
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
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
        </div>
        <div>
          <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-semibold text-[#344054]">
            {t('confirmPassword')}
          </label>
          <div className="group flex h-12 items-center gap-4 rounded-sm border border-[#E4E4E4] px-3.5 transition-all focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
            <KeyRound size={20} className="text-[#686868] group-focus-within:text-sky-500" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              minLength={8}
              placeholder="******"
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="cursor-pointer text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        {(!token || error) && (
          <p className="mt-4 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {!token ? t('missingToken') : error}
          </p>
        )}
        <button
          type="submit"
          disabled={isPending || !token}
          className="mt-8 flex h-11 w-full cursor-pointer items-center justify-center rounded-sm bg-[#00496E] text-sm font-semibold text-white transition hover:bg-[#003a5a] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? t('resetting') : (t('resetButton') || t('resetTitle'))}
        </button>
      </form>
    </div>
  );
}
