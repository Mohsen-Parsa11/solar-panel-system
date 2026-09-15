/* eslint-disable react/no-array-index-key */
import type { Metadata } from 'next';
import { BadgeCheck, Handshake, Sprout, TrendingUp } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const featureIcons = [Sprout, BadgeCheck, TrendingUp, Handshake] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('seo.about');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function WhyChooseUs() {
  const t = await getTranslations('home.whyChooseUs');
  return (
    <section className="bg-[#0D141D] py-16 md:py-20">
      <div className="mx-auto max-w-360 px-4 md:px-8">
        <div className="mb-6 flex flex-col md:mb-10">
          <h2 className="mb-2 text-2xl font-semibold text-white md:text-[32px]">
            {t('title')}
          </h2>
          <p className="text-[14px] leading-relaxed text-[#dfdfdf] md:text-[16px]">
            {t('description')}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {[0, 1, 2, 3].map((_, index) => {
            const Icon = featureIcons[index]!;
            return (
              <div
                key={`feature-${index}`}
                className="flex flex-col rounded-sm border border-gray-700/60 bg-gray-950/80 p-4 md:p-6"
              >
                <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#002A42]">
                  <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                </div>
                <h3 className="mb-2 text-[15px] font-semibold text-white md:text-[18px]">
                  {t(`features.${index}.title`)}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#D0D0D0] md:text-[15px]">
                  {t(`features.${index}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
