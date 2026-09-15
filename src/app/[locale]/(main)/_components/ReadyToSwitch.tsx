'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Button from '@/app/components/common/Button';
import { isRTL } from '@/utils/Helpers';

type ReadyToSwitchProps = Readonly<{
  onBtnClick?: () => void;
}>;
function ReadyToSwitch({ onBtnClick }: ReadyToSwitchProps) {
  const readyToSwitch = useTranslations('home.readyToSwitch');
  const locale = useLocale();
  const isCurrentLocaleRTL = isRTL(locale);
  return (
    <section className="w-full px-4 pb-8 md:px-8 md:pb-12">
      <div className="mx-auto max-w-360">
        <div className="relative min-h-95 w-full overflow-hidden rounded-sm bg-[#111625] md:min-h-100">
          <Image
            src="/assets/images/home-hero.jpg"
            alt="Solar Energy Background"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 z-10 bg-linear-to-b from-black/85 via-black/70 to-black/50 md:bg-linear-to-r md:from-black/90 md:via-black/60 md:to-transparent" />
          <div
            className={`relative z-20 flex h-full min-h-95 w-full flex-col justify-center px-6 py-10 md:min-h-100 md:px-10 md:py-12 ${
              isCurrentLocaleRTL ? 'items-start text-right' : 'items-start text-left'
            }`}
          >
            <h2 className="mb-4 text-2xl leading-tight font-bold text-white sm:text-3xl md:text-[40px]">
              {readyToSwitch('title')}
            </h2>
            <p className="mb-8 max-w-xl text-[14px] leading-relaxed text-gray-300 opacity-90 md:text-[16px]">
              {readyToSwitch('description')}
            </p>
            <div className="w-full md:w-auto">
              <Button
                variant="primary"
                onClick={onBtnClick}
                className="group flex w-full px-6 py-3.5 sm:w-fit md:px-7 md:py-4"
              >
                <span>{readyToSwitch('button')}</span>
                {!isCurrentLocaleRTL
                  ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

                  : <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReadyToSwitch;
