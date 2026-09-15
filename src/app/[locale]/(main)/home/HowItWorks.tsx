/* eslint-disable react/no-array-index-key */
import { getTranslations } from 'next-intl/server';
import React from 'react';

export default async function HowItWorks() {
  const t = await getTranslations('home.howItWorks');
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-360 px-4 md:px-8">
        <div className="mb-10 md:mb-12">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2 md:mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-[#00496E]" />
              <span className="text-[16px] font-medium tracking-wide text-[#00496E] uppercase">
                {t('sectionLabel')}
              </span>
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-[#030303] md:text-[32px]">
              {t('title')}
            </h2>
            <p className="text-[14px] leading-relaxed text-gray-600 md:text-[16px]">
              {t('description')}
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-12 md:flex-row md:items-start md:justify-between md:gap-0">
          {[0, 1, 2, 3].map((_, idx) => (
            <React.Fragment key={`step-${idx}`}>
              <div className="flex w-full flex-1 flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute top-4 left-1/2 -z-10 h-20 w-20 -translate-x-1/2 rounded-full bg-[#D4A5FF] opacity-30 blur-xl"></div>
                  <div className="flex h-15 w-15 items-center justify-center rounded bg-[#006699] text-[32px] font-bold text-white shadow-sm md:h-20 md:w-20">
                    {t(`steps.${idx}.num`)}
                  </div>
                </div>
                <h3 className="mb-3 text-[18px] font-semibold text-[#030303] md:text-[20px]">
                  {t(`steps.${idx}.title`)}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#464646]">
                  {t(`steps.${idx}.desc`)}
                </p>
              </div>
              {idx < 3 && (
                <div className="hidden h-20 w-8 shrink-0 items-center justify-center md:flex lg:w-16 xl:w-20">
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#006699]"></div>
                  <div className="h-0.5 w-full border-t-2 border-dashed border-[#B8D4E3]"></div>
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#006699]"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
