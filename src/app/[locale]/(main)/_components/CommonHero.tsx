import { useLocale } from 'next-intl';
import Image from 'next/image';
import { isRTL } from '@/utils/Helpers';
import ScrollButton from './ScrollButton';

type TranslationProps = {
  subtitle?: string;
  titleLight?: string;
  titleBold?: string;
  description?: string;
  heroHeight?: string;
  heroHeightMd?: string;

};

type CommonHeroProps = Readonly<{
  bgImage: string;
}> & TranslationProps;

export default function CommonHero({
  bgImage,
  subtitle = 'Clean Energy For A Better Future',
  titleLight = 'Request Premium',
  titleBold = 'Solar Products',
  description = 'We provide high quality solar products and professional solutions for homes, businesses and industries.',
}: CommonHeroProps) {
  const direction = useLocale();
  const isRtl = isRTL(direction);

  return (
    <section
      className="relative flex h-90 w-full items-center justify-between pt-8 md:h-110"
    >
      <Image
        src={bgImage}
        alt="Hero Background"
        fill
        priority
        quality={75}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent md:from-black/80 md:via-black/40 rtl:bg-linear-to-l"></div>
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>

      <div className={`relative z-10 mx-auto flex h-full w-full max-w-360 flex-col justify-center px-4 md:px-8 ${isRtl ? 'text-right' : 'items-start text-left'}`}>
        <div className="max-w-2xl">
          <h3 className="mb-3 text-[14px] font-medium tracking-wide text-[#00AEF9] capitalize md:mb-5 md:text-[16px] md:uppercase">
            {subtitle}
          </h3>

          <h1 className="mb-3 text-3xl leading-[1.3] font-semibold text-[#F1F9FF] md:mb-4 md:text-4xl lg:text-5xl">
            {titleLight}
            {' '}
            <br />
            <span className="text-[#0091D0]">{titleBold}</span>
          </h1>

          <p className="mb-8 max-w-[90%] text-base leading-relaxed text-[#D0D0D0] md:mb-10 md:max-w-xl md:text-lg">
            {description}
          </p>
        </div>
      </div>

      <ScrollButton />

    </section>
  );
}
