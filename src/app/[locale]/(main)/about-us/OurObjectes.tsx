'use client';

import { useTranslations } from 'next-intl';

function OurObjectes() {
  const t = useTranslations('about-us.futureSolutions');
  const cardsIcons = [
    {
      id: 1,
      keyName: 'features.0',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#0091D0" className="h-7 w-7">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ),
    },
    {
      id: 2,
      keyName: 'features.1',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#0091D0" className="h-7 w-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h3M3 10h1M3 14h2" />
        </svg>
      ),
    },
    {
      id: 3,
      keyName: 'features.2',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#0091D0" className="h-7 w-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      id: 4,
      keyName: 'features.3',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#0091D0" className="h-7 w-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-4a1 1 0 011-1h2a1 1 0 011 1v4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-360 px-4 md:px-8">
        <div className="mb-10 md:mb-12">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2 md:mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-[#00496E]" />
              <span className="text-[16px] font-medium tracking-wide text-[#00496E] uppercase">
                {t('subTitle')}
              </span>
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-[#030303] md:text-[32px]">
              {t('title')}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cardsIcons.map(card => (
            <div
              key={card.id}
              className="flex flex-col gap-5 rounded-sm border border-[#F3F4F6] bg-[#F9FAFB80] p-6"
            >
              <div className="flex items-center justify-start">
                {card.icon}
              </div>
              <div className="flex flex-col gap-2.5">
                <h3 className="text-[16px] leading-snug font-semibold text-[#030303]">
                  {t(`${card.keyName}.title`)}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#686868]">
                  {t(`${card.keyName}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurObjectes;
