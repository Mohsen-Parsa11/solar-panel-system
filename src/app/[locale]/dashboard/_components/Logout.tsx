'use client';

import { LogOut } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { cn } from '@/libs/cn';
import { authClient } from '@/utils/auth';

export default function SignOutButton({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations('signOut');
  const router = useRouter();

  return (
    <button
      type="button"
      className={cn(
        'block w-full rounded-md px-4 py-1.5 cursor-pointer text-sm text-red-600 transition-colors duration-200 hover:bg-neutral-25 lg:text-base lg:py-2',
        className,
      )}
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.refresh();
              router.replace(`/${locale}`);
              toast.success(t('signOutSuccess'));
            },
            onError: (error) => {
              console.error(error);
              toast.error(t('signOutError'));
            },
          },
        });
      }}
    >
      <div className="flex items-center gap-2">
        <LogOut className="size-4 md:size-5" />
        <p className="text-sm font-normal lg:text-base">{t('logout')}</p>
      </div>
    </button>
  );
}
