import { getTranslations } from 'next-intl/server';
import Hero from '../_components/CommonHero';
import OurOffice from '../_components/OurOffice';
import TestimonialSection from '../_components/TestimonialSection';
import GetInTouch from './GetInTouch';

export default async function page() {
  const t = await getTranslations('contact.hero');

  return (
    <>
      <Hero
        bgImage="/assets/images/about-hero.jpg"
        subtitle={t('subtitle')}
        titleLight={t('titleLight')}
        titleBold={t('titleBold')}
        description={t('description')}
        heroHeight="h-[500px]"
        heroHeightMd="md:h-[500px]"
      />
      <GetInTouch />
      <OurOffice />
      <TestimonialSection />
    </>
  );
}
