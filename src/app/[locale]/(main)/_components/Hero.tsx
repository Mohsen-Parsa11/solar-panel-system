import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { isRTL } from '@/utils/Helpers';
import ScrollButton from './ScrollButton';

export default function Hero() {
  const locale = useLocale();
  const isRtl = isRTL(locale);

  const heroContent = useTranslations('home.hero');
  return (
    <section className="relative h-125 md:h-150">
      <Image
        src="/assets/images/home-hero.jpg"
        alt="Hero Background"
        fill
        priority
        quality={75}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent md:from-black/80 md:via-black/40 rtl:bg-linear-to-l"></div>
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>

      <div className={`relative z-10 mx-auto flex h-full w-full max-w-360 flex-col justify-center px-4 md:px-8 ${isRtl ? 'items-start text-right' : 'items-start text-left'}`}>
        <div className="max-w-2xl">
          <h3 className="mb-3 text-[14px] font-medium tracking-wide text-[#00AEF9] capitalize md:mb-5 md:text-[16px] md:uppercase">
            {heroContent('subtitle')}
          </h3>

          <h1 className="mb-3 text-3xl leading-[1.3] font-semibold text-[#F1F9FF] md:mb-4 md:text-4xl lg:text-5xl">
            {heroContent('titleLight')}
            {' '}
            <br />
            <span className="text-[#0091D0]">{heroContent('titleBold')}</span>
          </h1>

          <p className="mb-8 max-w-[90%] text-base leading-relaxed text-[#D0D0D0] md:mb-10 md:max-w-xl md:text-lg">
            {heroContent('description')}
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href={`/${locale}/products`}
            className="group flex w-full items-center justify-center gap-2 rounded-sm bg-[#0071A5] px-8 py-3.5 text-[14px] font-medium text-white transition-all duration-300 hover:bg-[#00496E] sm:w-auto"
          >
            {heroContent('primaryBtnText')}
            {!isRTL(locale)
              ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

              : <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />}
          </Link>

          <Link
            href={`/${locale}/about-us`}
            className="flex w-full items-center justify-center rounded-sm border border-[#686868] bg-transparent px-8 py-3.5 text-[14px] font-medium text-white transition-all duration-300 hover:bg-[#00496E] sm:w-auto"
          >
            {heroContent('secondaryBtnText')}
          </Link>
        </div>
        <div
          className="mt-10 flex items-center gap-10 md:mt-12 md:gap-20 lg:mt-14"
        >
          <div className="flex flex-col">
            <span dir="ltr" className="inline-block text-2xl font-bold text-white md:text-[32px]">
              6+
            </span>
            <span className="mt-1 text-sm text-[#949494] md:text-base">
              {heroContent('office')}
            </span>
          </div>

          <div className="flex flex-col">
            <span dir="ltr" className="inline-block text-2xl font-bold text-white md:text-[32px]">
              13+
            </span>
            <span className="mt-1 text-sm text-[#949494] md:text-base">
              {heroContent('yearsExperience')}
            </span>
          </div>

          <div className="flex flex-col">
            <span dir="ltr" className="inline-block text-2xl font-bold text-white md:text-[32px]">
              850+
            </span>
            <span className="mt-1 text-sm text-[#949494] md:text-base">
              {heroContent('professionalsTrustUs')}
            </span>
          </div>
        </div>
      </div>

      <ScrollButton />

    </section>
  );
}
