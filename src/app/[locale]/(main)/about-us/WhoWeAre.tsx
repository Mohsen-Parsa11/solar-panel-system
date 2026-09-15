'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function WhoWeAre() {
  const t = useTranslations('about-us.whoWeAre');
  const featuresIcons = [
    {
      id: 'quality',
      keyName: 'features.0',
      icon: (
        <svg className="h-6 w-6 text-[#0091D0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      id: 'expert',
      keyName: 'features.1',
      icon: (
        <svg className="h-6 w-6 text-[#0091D0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: 'trusted',
      keyName: 'features.2',
      icon: (
        <svg className="h-6 w-6 text-[#0091D0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 014.5 9l-4.5 9-4.5-9A15.3 15.3 0 0112 3z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-360 px-4 md:px-8">
        <div className="grid grid-cols-1 items-start gap-8 text-[#0F172A] lg:grid-cols-2 lg:gap-12">
          <div className="order-3 flex h-full flex-col justify-center py-4 lg:order-1">
            <div className="mb-4 flex items-center gap-2 md:mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-[#00496E]" />
              <span className="text-[16px] font-medium tracking-wide text-[#00496E] uppercase">
                {t('subTitle')}
              </span>
            </div>
            <h2 className="mb-2 text-2xl font-semibold whitespace-pre-line text-[#030303] md:text-[32px]">
              {t('title')}
            </h2>
            <p className="text-[14px] leading-relaxed text-[#949494] md:text-[16px]">
              {t('description')}
            </p>
          </div>
          <div className="order-1 flex w-full flex-col gap-6 lg:order-2">
            <div className="w-full overflow-hidden rounded-sm shadow-sm">
              <Image
                src="/assets/images/who-are-img.svg"
                height={500}
                width={500}
                alt="Hewadwal Green Building"
                className="aspect-16/10 h-auto w-full object-cover lg:aspect-video"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {featuresIcons.map(item => (
                <div key={item.id} className="rounded-sm border border-[#C6C6CD4D] bg-white p-3 md:p-4">
                  <div className="mb-4 flex items-start justify-start">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-[#0B1C30] md:text-base">
                    {t(`${item.keyName}.title`)}
                  </h3>
                  <p className="mt-2 text-xs leading-normal text-[#686868]">
                    {t(`${item.keyName}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
