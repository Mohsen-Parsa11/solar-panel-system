'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function OurImpact() {
  const t = useTranslations('about-us.realDifference');
  const impactStats = [
    {
      id: 'impact-1',
      keyName: 'stats.0',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-[#0091D0]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.866 8.21 8.21 0 003 2.48z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>
      ),
    },
    {
      id: 'impact-2',
      keyName: 'stats.1',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-[#0091D0]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
    {
      id: 'impact-3',
      keyName: 'stats.2',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-[#00AEF9]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-4l2-2 2 2 4-4" />
        </svg>
      ),
    },
    {
      id: 'impact-4',
      keyName: 'stats.3',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-[#00AEF9]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l4.5 4.5" />
          <circle cx="14.5" cy="14.5" r="2.5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#0D141D] py-16 md:py-20">
      <div className="mx-auto max-w-360 px-4 md:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 flex flex-col lg:order-1">
            <div className="mb-6 max-w-3xl lg:mb-13">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#00AEF9]" />
                <span className="text-[14px] font-semibold tracking-wide text-[#00AEF9] uppercase">
                  {t('subTitle')}
                </span>
              </div>
              <h2 className="mb-4 text-2xl font-semibold text-[#FAFAFA] md:text-[32px]">
                {t('title')}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 gap-x-6 sm:grid-cols-2 md:gap-y-16">
              {impactStats.map(item => (
                <div key={item.id} className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#002A42]">
                      {item.icon}
                    </div>
                    <h3
                      dir="ltr"
                      className="inline-block text-2xl leading-none font-bold text-[#FFFFFF] md:text-[32px]"
                    >
                      {t(`${item.keyName}.value`)}
                    </h3>
                  </div>
                  <p className="text-sm text-[#9CA3AF]">
                    {t(`${item.keyName}.label`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 mb-6 w-full lg:order-2 lg:mb-0">
            <Image
              width={500}
              height={500}
              src="/assets/images/our-impact-img.svg"
              alt="Solar Panels making a difference"
              className="h-auto max-h-128 w-full rounded-sm object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
