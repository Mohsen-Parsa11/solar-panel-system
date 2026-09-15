'use client';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { isRTL } from '@/utils/Helpers';

export default function OurStory() {
  const t = useTranslations('about-us.ourJourney');
  const locale = useLocale();
  const isRtl = isRTL(locale);
  const statsIcons = [
    {
      id: 'stat-1',
      keyName: 'stats.0',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732V4l-3.114.732a9 9 0 01-6.086-.71l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
        </svg>
      ),
    },
    {
      id: 'stat-2',
      keyName: 'stats.1',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 text-white">
          <path d="M4 14h4v6H4zM10 10h4v10h-4zM16 6h4v14h-4z" />
        </svg>
      ),
    },
    {
      id: 'stat-3',
      keyName: 'stats.2',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
    },
    {
      id: 'stat-4',
      keyName: 'stats.3',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.738.09-1.454.257-2.137" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#0D141D] py-16 md:py-20">
      <div className="mx-auto max-w-360 px-4 md:px-8">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="relative w-full pr-0 pb-4 lg:col-span-6 lg:pr-4 lg:pb-0">
            <div className="relative aspect-4/3 w-full sm:aspect-16/11 lg:aspect-16/13">
              <Image
                height={600}
                width={600}
                src="/assets/images/store-img.jpg"
                alt="Solar energy panels"
                className="h-full w-full rounded-sm object-cover"
                priority
              />
              <div
                className={`absolute flex min-w-35 flex-col items-center justify-center rounded-sm border border-gray-100 bg-white px-5 py-6 text-black shadow-lg select-none sm:min-w-40 lg:-bottom-6
    ${
    isRtl
      ? '-bottom-6 -left-2 sm:-bottom-8 sm:-left-4 lg:-left-3'
      : '-right-2 -bottom-6 sm:-right-4 sm:-bottom-8 lg:-right-3'
    }`}
              >
                <span
                  dir="ltr"
                  className="inline-block text-4xl font-black tracking-tighter text-[#0071A5] sm:text-5xl"
                >
                  6+
                </span>

                <span className="mt-2 text-center text-[10px] leading-tight font-bold tracking-widest text-[#464646] uppercase">
                  {t('experienceBadge')}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center lg:col-span-6">
            <div className="mb-4 flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-[#0081C9] uppercase">
              <span className="h-0.5 w-8 bg-[#0081C9]"></span>
              <span>{t('subTitle')}</span>
            </div>
            <h2 className="mb-5 text-3xl leading-[1.15] font-bold tracking-tight text-white sm:text-4xl lg:text-[38px]">
              {t('title')}
            </h2>
            <p className="mb-8 text-justify text-sm leading-relaxed font-normal text-[#D0D0D0] sm:text-[15px]">
              {t('description')}
            </p>
            <div className="relative mb-10 hidden h-[1.5px] w-full bg-[#0077E6] md:flex"></div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 lg:gap-x-2">
              {statsIcons.map(item => (
                <div key={item.id} className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-white bg-white">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0071A5]">
                      {item.icon}
                    </div>
                  </div>
                  <span className="mb-0.5 text-center text-lg font-bold tracking-wide text-white">
                    {t(`${item.keyName}.value`)}
                  </span>
                  <span className="text-center text-[10px] font-bold tracking-widest text-[#D0D0D0] uppercase">
                    {t(`${item.keyName}.label`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
