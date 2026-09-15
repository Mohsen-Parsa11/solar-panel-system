import { Mail, Phone } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import FacebookIcon from './icons/FacebookIcon';
import InstagramIcon from './icons/InstagramIcon';
import XIcon from './icons/XIcon';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('footer');
  const locale = useLocale();
  const indices = [0, 1, 2, 3, 4];

  const localizeHref = (href: string) => {
    if (!href) {
      return href;
    }
    if (href.startsWith('http') || href.startsWith(`/${locale}/`)) {
      return href;
    }
    return `/${locale}${href}`;
  };

  return (
    <footer className="bg-[#030303] text-white">
      <div className=" mx-auto max-w-360 px-4 pt-10 pb-5 md:px-8 md:pt-15 md:pb-7.5">
        <div className="border-b border-white/10 pb-10">
          <div className="flex flex-col justify-between gap-12 lg:flex-row">
            <div className="max-w-107.5 shrink-0">
              <Link
                href="/"
                className="relative block h-16 w-16"
                aria-label="our-logo"
              >
                <Image
                  src="/assets/images/logo-white.svg"
                  alt="Logo facebook"
                  fill
                  className="object-contain"
                />
              </Link>

              <p className="mt-4 text-[14px] leading-loose text-[#EBEBEB]">
                {t('description')}
              </p>

              <div className="mt-8 flex items-center gap-4">
                <Link target="_blank" href="https://www.facebook.com/p/Hewad-Wal-Solar-Ltd-Main-Office-61570092310512/">
                  <FacebookIcon
                    size={20}
                    color="#CECECE"
                    className="transition hover:opacity-70"
                  />
                </Link>

                <Link target="_blank" href="https://www.instagram.com">
                  <InstagramIcon
                    size={18}
                    color="#CECECE"
                    className="transition hover:opacity-70"
                  />
                </Link>

                <Link target="_blank" href="https://www.x.com">
                  <XIcon
                    size={18}
                    color="#CECECE"
                    className="transition hover:opacity-70"
                  />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-10 lg:mt-0">
              <div>
                <h3 className="mb-5 text-[16px] font-medium">
                  {t('quickLinksTitle')}
                </h3>
                <ul className="space-y-4">
                  {indices.map(i => (
                    <li key={i}>
                      <Link
                        href={localizeHref(t(`quickLinks.${i}.href`))}
                        className="text-[15px] text-[#B9B9B9] transition hover:text-white"
                      >
                        {t(`quickLinks.${i}.label`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-5 text-[16px] font-medium">
                  {t('contactTitle')}
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <Phone
                      size={18}
                      className="mt-0.5 shrink-0 text-white"
                    />
                    <span
                      dir="ltr"
                      className="text-[15px] text-[#B9B9B9]"
                    >
                      {t('contact.phone')}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail
                      size={18}
                      className="mt-0.5 shrink-0 text-white"
                    />
                    <span className="text-[15px] break-all text-[#B9B9B9]">
                      {t('contact.email')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center">
          <p className="text-[14px] text-[#EBEBEB]">
            ©
            {' '}
            {currentYear}
            {' '}
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
