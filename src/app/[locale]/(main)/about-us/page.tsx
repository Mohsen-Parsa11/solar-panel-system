import { getTranslations } from 'next-intl/server';
import Switcher from '../_components/about/Switcher';
import CommonHero from '../_components/CommonHero';
import ExcellenceDefined from './ExcellenceDefined';
import MissionVision from './MissionVision';
import OurImpact from './OurImpact';
import OurObjectes from './OurObjectes';
import OurStory from './OurStory';
import OurTeam from './OurTeam';
import WhoWeAre from './WhoWeAre';

export async function generateMetadata() {
  const t = await getTranslations('seo.about');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page() {
  const hero = await getTranslations('about-us.hero');

  return (
    <>
      <CommonHero
        bgImage="/assets/images/about-hero.jpg"
        subtitle={hero('subtitle')}
        titleLight={hero('titleLight')}
        titleBold={hero('titleBold')}
        description={hero('description')}
      />
      <WhoWeAre />
      <OurStory />
      <MissionVision />
      <OurImpact />
      <OurObjectes />
      <ExcellenceDefined />
      <OurTeam />
      <Switcher />
    </>
  );
}
