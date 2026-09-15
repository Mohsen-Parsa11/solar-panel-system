import { getTranslations } from 'next-intl/server';
import Hero from '../_components/CommonHero';
import Products from './_components/Products';

export default async function Page() {
  const heroTranslation = await getTranslations('product');
  return (
    <>
      <Hero
        bgImage="/assets/images/home-hero.jpg"
        subtitle={heroTranslation('heroSubtitle')}
        titleLight={heroTranslation('heroTitleLight')}
        titleBold={heroTranslation('heroTitleBold')}
        description={heroTranslation('heroDescription')}
        heroHeight="h-[500px]"
        heroHeightMd="md:h-[500px]"
      />

      <Products />
    </>
  );
}
