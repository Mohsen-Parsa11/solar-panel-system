'use client';

import type { Swiper as SwiperType } from 'swiper';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperNavButtons } from '@/app/components/common/SwiperNavButtons';
import { isRTL } from '@/utils/Helpers';
import 'swiper/css';
import 'swiper/css/pagination';

export default function OurTeam() {
  const t = useTranslations('about-us.team');
  const locale = useLocale();
  const isRtl = isRTL(locale);
  const swiperRef = useRef<SwiperType | null>(null);
  const teamStaticData = [
    { id: 1, image: '/assets/images/Mohammad-Nasim.svg', keyName: 'members.0' },
    { id: 2, image: '/assets/images/Mohammad-Dawood.svg', keyName: 'members.1' },
    { id: 3, image: '/assets/images/Haji-Mohammad-Qasim-Havdwal.svg', keyName: 'members.2' },
    { id: 4, image: '/assets/images/Haji-Zialhaq-Melpal.svg', keyName: 'members.3' },
    { id: 6, image: '/assets/images/Mohammad-Ishaq-Alizi.svg', keyName: 'members.4' },
    { id: 7, image: '/assets/images/Abdul-Halim-Noorzai.svg', keyName: 'members.5' },
  ];

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-360 px-4 md:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between md:mb-12">
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
            <p className="text-[14px] leading-relaxed text-[#949494] md:text-[16px]">
              {t('description')}
            </p>
          </div>
          <SwiperNavButtons
            variant="light"
            onPrev={() => swiperRef.current?.slidePrev()}
            onNext={() => swiperRef.current?.slideNext()}
          />
        </div>
        <div className="w-full">
          <style jsx global>
            {`
              .team-section-swiper .swiper-pagination {
                position: relative !important;
                bottom: 0px !important;
                margin-top: 20px !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                gap: 8px !important;
              }
              .team-section-swiper .swiper-pagination-bullet {
                width: 10px !important;
                height: 10px !important;
                background-color: #E4E7EC !important;
                opacity: 1 !important;
                margin: 0 !important;
                border-radius: 50% !important;
                transform: scale(0.9);
                border: 1px solid transparent;
                transition: all 0.28s ease;
                cursor: pointer;
              }
              .team-section-swiper .swiper-pagination-bullet:hover {
                background-color: #C9D3DD !important;
                transform: scale(1);
              }
              .team-section-swiper .swiper-pagination-bullet-active {
                width: 24px !important;
                height: 10px !important;
                background-color: #0071A5 !important;
                border-radius: 999px !important;
                box-shadow: 0 0 0 3px rgba(0, 113, 165, 0.16);
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
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            loop={false}
            spaceBetween={24}
            slidesPerView={1.15}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="team-section-swiper w-full"
          >
            {teamStaticData.map(member => (
              <SwiperSlide key={member.id} className="h-auto pb-2">
                <div className="flex h-full min-h-125 flex-col overflow-hidden rounded-sm border border-[#EAEBEC] bg-white shadow-[0px_4px_14px_rgba(8,15,52,0.03)]">
                  <div className="relative aspect-5/6 w-full bg-[#F2F4F7]">
                    {member.image && (
                      <Image
                        src={member.image}
                        alt={t(`${member.keyName}.name`)}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col p-3.5 text-start md:p-4">
                    <h3 className="text-[16px] font-bold text-[#19191B] md:text-[18px]">
                      {t(`${member.keyName}.name`)}
                    </h3>
                    <p className="mt-1 text-[12px] font-medium text-[#0071A5] md:text-[14px]">
                      {t(`${member.keyName}.role`)}
                    </p>
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
