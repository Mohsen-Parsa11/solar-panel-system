'use client';

import { ChevronDown, Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fa', name: 'فارسی' },
  { code: 'ps', name: 'پښتو' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (langCode: string) => {
    if (langCode === locale) {
      return;
    }

    const currentUrl = new URL(window.location.href);

    const newPath
      = pathname.replace(`/${locale}`, `/${langCode}`)
        + currentUrl.search
        + currentUrl.hash;

    router.replace(newPath);
  };
  return (
    <div className="group relative inline-block text-left">
      <button
        type="button"
        className="flex cursor-pointer items-center gap-1.5 py-2 text-gray-800 transition-colors hover:text-[#005b82] focus:outline-none"
        aria-label="Change Language"
      >
        <Globe className="h-5 w-5 text-gray-700" strokeWidth={1.5} />
        <span className="text-[15px] font-semibold uppercase">{locale}</span>
        <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-300 group-focus-within:rotate-180 group-hover:rotate-180" />
      </button>
      <div
        className="invisible absolute left-1/2 z-50 mt-2 w-40 -translate-x-1/2 translate-y-1 scale-95 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
      >
        <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-t border-l border-gray-100 bg-white shadow-[-2px_-2px_5px_rgba(0,0,0,0.02)]"></div>
        <div className="relative overflow-hidden rounded-sm border border-gray-100 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col py-1">
            {languages.map(lang => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                  locale === lang.code ? 'font-bold text-[#005b82]' : 'text-gray-600'
                }`}
              >
                <span className="text-[13px] font-medium">{lang.name}</span>
                {locale === lang.code && <div className="h-1.5 w-1.5 rounded-full bg-[#005b82]" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
