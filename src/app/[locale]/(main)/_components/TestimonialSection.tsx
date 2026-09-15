'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

type Testimonial = {
  id?: number | string;
  title?: string;
  quote?: string;
  name?: string;
  avatar?: string;
};

function TestimonialSection(props: {
  subTitle?: string;
  mainTitle?: string;
  description?: string;
  testimonials?: Testimonial[];
}) {
  const t = useTranslations('home.testimonial');
  const indices = [0, 1, 2];

  const subTitle = props.subTitle ?? t('subTitle');
  const mainTitle = props.mainTitle ?? t('mainTitle');
  const description = props.description ?? t('description');
  const testimonials: Testimonial[] = props.testimonials ?? indices.map(i => ({
    id: i,
    title: t(`items.${i}.title`),
    quote: t(`items.${i}.quote`),
    name: t(`items.${i}.name`),
    avatar: t(`items.${i}.avatar`),
  }));

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-360 px-4 md:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#00496E]" />
            <span className="text-[16px] font-medium tracking-wide text-[#00496E] uppercase">
              {subTitle}
            </span>
          </div>
          <h2 className="mb-2 text-2xl font-semibold text-[#030303] md:text-[32px]">
            {mainTitle}
          </h2>
          <p className="text-[14px] leading-relaxed text-[#030303c5] md:text-[16px]">
            {description}
          </p>
        </div>
        <div className="w-full">
          <style jsx global>
            {`
            .testimonial-section-swiper .swiper-pagination {
              position: relative !important;
              bottom: 0px !important;
              margin-top: 20px !important;
              display: flex !important;
              justify-content: center !important;
              align-items: center !important;
              gap: 8px !important;
            }
            .testimonial-section-swiper .swiper-pagination-bullet {
              width: 8px !important;
              height: 8px !important;
              background-color: #E4E7EC !important; 
              opacity: 1 !important;
              margin: 0 !important;
              border-radius: 50% !important;
              transition: all 0.3s ease;
              cursor: pointer;
            }
            .testimonial-section-swiper .swiper-pagination-bullet-active {
              width: 12px !important; */
              height: 12px !important;
              background-color: #0071A5 !important; 
              border-radius: 50% !important;
            }
          `}
          </style>

          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1.15}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="w-full"
          >
            {testimonials.map(item => (
              <SwiperSlide key={item.id} className="h-auto py-2">
                <div className="flex h-full flex-col justify-between rounded-sm border border-[#EFF0F6] bg-white p-6 shadow-[0px_4px_14px_rgba(8,15,52,0.03)] md:p-8">
                  <div>
                    <h2 className="mb-3 text-[18px] leading-snug font-semibold text-[#170F49] md:text-[21px]">
                      {item.title}
                    </h2>
                    <p className="text-[13px] leading-relaxed text-[#6F6C90] md:text-[15px]">
                      {item.quote}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-100">
                      {item.avatar && (
                        <Image
                          src={item.avatar}
                          alt={item.name || 'Avatar'}
                          fill
                          sizes="800px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <span className="text-[15px] font-semibold text-[#170F49] md:text-[16px]">
                      {item.name}
                    </span>
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

export default TestimonialSection;
