import type { ReactNode } from 'react';
import { Box, ShoppingCart } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/libs/Auth';
import { isRTL } from '@/utils/Helpers';
import { LanguageSwitcher } from './LanguageSwitcher';
import SignOutButton from './Logout';

type AdminShellProps = {
  active: 'products' | 'orders';
  children: ReactNode;
};

const navItems = [
  { href: '/dashboard/products', key: 'products', icon: Box, id: 'products' },
  { href: '/dashboard/orders', key: 'orders', icon: ShoppingCart, id: 'orders' },
] as const;

export async function AdminShell({ active, children }: AdminShellProps) {
  const locale = await getLocale();
  const t = await getTranslations('shell');
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isRtl = isRTL(locale);
  const adminName = session?.user.name || 'Admin';
  const sidebarPosition = isRtl ? 'right-0 border-l' : 'left-0 border-r';
  const contentPadding = isRtl ? 'lg:pr-[232px]' : 'lg:pl-[232px]';
  const activeBorder = isRtl ? 'border-r-4' : 'border-l-4';

  return (
    <div className="min-h-screen bg-white text-[#182438]">
      <aside className={`fixed inset-y-0 z-20 hidden w-58 border-[#e5e9ef] bg-secondary-50 lg:flex lg:flex-col ${sidebarPosition}`}>
        <div className="px-6 pt-8">
          <Image
            src="/assets/images/dawood-hewadwal-logo.png"
            alt="Dawood Hewadwal"
            width={76}
            height={76}
            className="h-19 w-19 object-contain"
            priority
          />
          <div className="mt-8 border-t border-[#e1e6ee]" />
        </div>

        <nav className="mt-9 space-y-2 px-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const selected = active === item.id;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  `flex h-[52px] items-center gap-4 px-5 text-[15px] font-semibold transition ${activeBorder}`,
                  selected
                    ? 'border-primary-400 bg-[#e8f1ff] text-primary-400'
                    : 'border-transparent text-[#6c7077] hover:bg-white hover:text-primary-400',
                ].join(' ')}
              >
                <Icon size={21} strokeWidth={2} />
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-6 pb-8">
          <div className="mb-8 border-t border-[#e1e6ee]" />
          <SignOutButton />
        </div>
      </aside>

      <div className={contentPadding}>
        <header className="sticky top-0 z-10 flex h-20.5 items-center justify-between border-b border-[#e5e9ef] bg-white px-5 sm:px-8 lg:px-10">
          <LanguageSwitcher />
          <div className="ml-5 flex shrink-0 items-center gap-6">

            <div className="hidden h-9 w-px bg-[#d9d9d9] sm:block" />
            <div className="hidden items-center gap-3 sm:flex">
              <div>
                <p className="text-[15px] leading-5 font-bold text-[#2d2d2d]">{adminName}</p>
                <p className="text-[14px] leading-5 text-[#979797]">{t('role')}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto min-h-[calc(100vh-82px)] w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
