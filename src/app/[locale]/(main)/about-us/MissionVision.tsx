'use client';

import { useLocale, useTranslations } from 'next-intl';
import { isRTL } from '@/utils/Helpers';

export default function MissionVision() {
  const t = useTranslations('about-us.missionVision');
  const locale = useLocale();
  const isRtl = isRTL(locale);

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto grid max-w-360 grid-cols-1 items-stretch gap-8 px-4 md:grid-cols-2 md:px-8">
        <div className="relative flex min-h-73 flex-col justify-between overflow-hidden rounded-sm bg-[#0A2540] p-6 sm:p-8 md:p-10">
          <div className={`pointer-events-none absolute bottom-0 opacity-20 mix-blend-lighten
            ${isRtl ? 'left-0' : 'right-0'}`}
          >
            <svg width="160" height="150" viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M160 180H40L120 40L160 180Z" fill="#ffffff" />
              <path d="M160 180H0L100 0L160 180Z" fill="#ffffff" className="opacity-40" />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-sm bg-white/10 text-white backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12S5.25 5.25 12 5.25 21.75 12 21.75 12 18.75 18.75 12 18.75 2.25 12 2.25 12Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                />
              </svg>
            </div>
            <div className="mb-4 flex items-center gap-3 text-xl font-bold tracking-widest text-[#0091D0] uppercase md:text-2xl">
              <span className="h-0.5 w-6 bg-[#0091D0]"></span>
              <span>{t('visionTitle')}</span>
            </div>
            <p className="max-w-[90%] text-[16px] leading-normal text-white sm:text-xl">
              {t('visionDesc')}
            </p>
          </div>
        </div>
        <div className="relative flex min-h-73 flex-col justify-between overflow-hidden rounded-sm border border-[#F3F4F6] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] sm:p-8 md:p-10">
          <div className={`pointer-events-none absolute bottom-0 z-0 h-56 w-56 translate-y-12 rounded-full bg-[#EAF5FA]/60
            ${isRtl ? 'left-0 -translate-x-12' : 'right-0 translate-x-12'}`}
          >
          </div>
          <div className="relative z-10">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-sm bg-[#EAF5FA] text-[#0091D0]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-6 w-6 fill-current">
                <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
              </svg>
            </div>
            <div className="mb-4 flex items-center gap-3 text-xl font-bold tracking-widest text-[#0091D0] uppercase md:text-2xl">
              <span className="h-0.5 w-6 bg-[#0091D0]"></span>
              <span>{t('missionTitle')}</span>
            </div>
            <p className="text-[16px] leading-normal text-[#0A2540] sm:text-xl">
              {t('missionDesc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
