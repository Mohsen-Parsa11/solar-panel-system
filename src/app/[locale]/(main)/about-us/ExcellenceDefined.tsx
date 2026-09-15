'use client';

import { useLocale, useTranslations } from 'next-intl';
import { isRTL } from '@/utils/Helpers';

export default function ExcellenceDefined() {
  const t = useTranslations('about-us.awards');
  const locale = useLocale();
  const isRtl = isRTL(locale);
  const timelineConfig = [
    { id: 1, year: '2025', isLeft: true, keyName: 'items.0' },
    { id: 2, year: '2024', isLeft: false, keyName: 'items.1' },
    { id: 3, year: '2023', isLeft: true, keyName: 'items.2' },
    { id: 4, year: '2022', isLeft: false, keyName: 'items.3' },
    { id: 5, year: '2021', isLeft: true, keyName: 'items.4' },
  ];

  return (
    <section className="w-full bg-[#0D141D] py-16 md:py-20">
      <div className="mx-auto max-w-360 px-4 md:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#00AEF9]" />
            <span className="text-[14px] font-semibold tracking-wide text-[#00AEF9] uppercase">
              {t('subTitle')}
            </span>
          </div>
          <h2 className="mb-4 text-2xl font-semibold text-[#FAFAFA] md:text-[32px]">
            {t('title')}
          </h2>
          <p className="text-[14px] leading-relaxed text-[#949494] md:text-[15px]">
            {t('description')}
          </p>
        </div>
        <div className="relative flex w-full flex-col gap-8 md:gap-12">
          <div className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-[#D0D7E2]/15 shadow-[-1px_0_0_rgba(255,255,255,0.05)] md:block" />

          {timelineConfig.map(item => (
            <div
              key={item.id}
              className="flex w-full flex-row items-center justify-between gap-4 md:gap-0"
            >
              <div
                className={`flex items-center ${
                  item.isLeft
                    ? 'w-[76%] justify-end md:w-[calc(50%-28px)]'
                    : 'w-[20%] justify-end md:w-[calc(50%-28px)]'
                }`}
              >
                {item.isLeft
                  ? (
                      <div className={`w-full rounded-sm border border-[#FFFFFF14] bg-[#111721] p-5 shadow-md md:p-6 ${isRtl ? 'text-right' : 'text-left'}`}>
                        <h3 className="mb-2 text-[18px] font-medium text-[#0091D0] md:text-[24px] md:font-semibold">
                          {t(`${item.keyName}.title`)}
                        </h3>
                        <p className="text-[14px] leading-relaxed text-[#D0D0D0] md:text-[16px]">
                          {t(`${item.keyName}.desc`)}
                        </p>
                      </div>
                    )
                  : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-[#FFFFFF] bg-[#0091D0] text-[13px] font-bold text-[#251A00] shadow-[0_0_12px_rgba(0,174,249,0.15)] select-none md:text-[14px]">
                        {item.year}
                      </div>
                    )}
              </div>
              <div
                className={`flex items-center ${
                  item.isLeft
                    ? 'w-[20%] justify-start md:w-[calc(50%-28px)]'
                    : 'w-[76%] justify-start md:w-[calc(50%-28px)]'
                }`}
              >
                {!item.isLeft
                  ? (
                      <div className={`w-full rounded-sm border border-[#FFFFFF14] bg-[#111721] p-5 shadow-md md:p-6 ${isRtl ? 'text-right' : 'text-left'}`}>
                        <h3 className="mb-2 text-[18px] font-medium text-[#0091D0] md:text-[24px] md:font-semibold">
                          {t(`${item.keyName}.title`)}
                        </h3>
                        <p className="text-[14px] leading-relaxed text-[#D0D0D0] md:text-[16px]">
                          {t(`${item.keyName}.desc`)}
                        </p>
                      </div>
                    )
                  : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-[#FFFFFF] bg-[#0091D0] text-[13px] font-bold text-[#251A00] shadow-[0_0_12px_rgba(0,174,249,0.15)] select-none md:text-[14px]">
                        {item.year}
                      </div>
                    )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
