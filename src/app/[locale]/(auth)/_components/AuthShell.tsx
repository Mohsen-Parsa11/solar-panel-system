'use client';

import Image from 'next/image';
import { LanguageSwitcher } from '../../dashboard/_components/LanguageSwitcher';

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="flex min-h-screen w-full bg-secondary-50"
    >
      <div className="grid w-full lg:grid-cols-2">
        <div className="relative hidden bg-[#89d3cc] lg:block">
          <Image
            src="/assets/images/auth-visual.jpg"
            alt="Solar energy display"
            fill
            sizes="100%"
            priority
            className="object-cover"
          />
        </div>
        <div className="relative flex items-center justify-center px-4 py-6 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <div className="absolute top-5 ltr:right-24 rtl:left-24">
            <LanguageSwitcher />
          </div>

          {children}
        </div>
      </div>
    </main>
  );
}
