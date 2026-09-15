'use client';
import type { Swiper as SwiperType } from 'swiper';
import { MapPin, Phone } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperNavButtons } from '@/app/components/common/SwiperNavButtons';
import { isRTL } from '@/utils/Helpers';

import 'swiper/css';
import 'swiper/css/pagination';

function OurOffice() {
  const t = useTranslations('offices');
  const locale = useLocale();
  const isRtl = isRTL(locale);
  const swiperRef = useRef<SwiperType | null>(null);
  const indices = [0, 1, 2, 3, 4, 5];

  return (
    <section className="w-full bg-[#0D141D] py-16 md:py-20">
      <div className="mx-auto max-w-360 px-4 md:px-8">
        <div className="mb-10 flex max-w-3xl flex-col gap-6 sm:max-w-none sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#00AEF9]" />
              <span className="text-[14px] font-semibold tracking-wide text-[#00AEF9] uppercase">
                {t('sectionLabel')}
              </span>
            </div>
            <h2 className="mb-4 text-2xl font-semibold text-[#FAFAFA] md:text-[32px]">
              {t('title')}
            </h2>
            <p className="text-[14px] leading-relaxed text-[#949494] md:text-[15px]">
              {t('description')}
            </p>
          </div>
          <SwiperNavButtons
            variant="dark"
            onPrev={() => swiperRef.current?.slidePrev()}
            onNext={() => swiperRef.current?.slideNext()}
          />
        </div>
        <div className="w-full">
          <style jsx global>
            {`
            .office-section-swiper .swiper-pagination {
              position: relative !important;
              bottom: 0px !important;
              margin-top: 20px !important;
              display: flex !important;
              justify-content: center !important;
              align-items: center !important;
              gap: 8px !important;
            }
            .office-section-swiper .swiper-pagination-bullet {
              width: 10px !important;
              height: 10px !important;
              background-color: #4B5563 !important;
              opacity: 1 !important;
              margin: 0 !important;
              border-radius: 50% !important;
              transform: scale(0.9);
              border: 1px solid transparent;
              transition: all 0.28s ease;
              cursor: pointer;
            }
            .office-section-swiper .swiper-pagination-bullet:hover {
              background-color: #617285 !important;
              transform: scale(1);
            }
            .office-section-swiper .swiper-pagination-bullet-active {
              width: 24px !important;
              height: 10px !important;
              background-color: #00AEF9 !important; 
              border-radius: 999px !important;
              box-shadow: 0 0 0 3px rgba(0, 174, 249, 0.2);
              transform: scale(1);
            }
          `}
          </style>
          <Swiper
            key={locale}
            dir={isRtl ? 'rtl' : 'ltr'}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1.1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="office-section-swiper w-full"
          >
            {indices.map(idx => (
              <SwiperSlide key={`office-${idx}`} className="h-auto">
                <div className="flex h-full flex-col overflow-hidden rounded-sm border border-gray-800/20 bg-[#141B24]">
                  <div className="relative h-58 w-full bg-gray-800">
                    {t(`items.${idx}.image`)
                      ? (
                          <Image
                            src={t(`items.${idx}.image`)}
                            alt={t(`items.${idx}.city`)}
                            fill
                            sizes="800px"
                            className="object-cover"
                          />
                        )
                      : (
                          <div className="h-full w-full bg-[#1c2736]" />
                        )}
                  </div>
                  <div className="flex grow flex-col px-4 py-6">
                    <h3 className="text-[20px] font-semibold text-white">
                      {t(`items.${idx}.city`)}
                    </h3>
                    <span className="mt-1 text-[13px] font-medium text-[#00AEF9]">
                      {t(`items.${idx}.type`)}
                    </span>
                    <p className="mt-4 min-h-18 text-[14px] leading-relaxed text-[#949494]">
                      {t(`items.${idx}.details`)}
                    </p>
                    <hr className="my-5 border-[#464646]" />
                    <div className="mt-auto flex flex-col gap-3.5">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 shrink-0 text-[#F1F9FF]" strokeWidth={2} />
                        <span className="text-[14px] text-[#FAFAFA]/90">
                          {t(`items.${idx}.location`)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone
                          className="h-5 w-5 shrink-0 text-[#F1F9FF]"
                          strokeWidth={2}
                        />

                        <span
                          dir="ltr"
                          className="text-[14px] text-[#FAFAFA]/90"
                        >
                          {t(`items.${idx}.phone`)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}

export default OurOffice;
