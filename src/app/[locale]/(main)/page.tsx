import Hero from './_components/Hero';
import ModalOpen from './_components/ModalOpen';
import OurOffice from './_components/OurOffice';
import TestimonialSection from './_components/TestimonialSection';
import HowItWorks from './home/HowItWorks';
import PremiumProducts from './home/PremiumProducts';
import WhyChooseUs from './home/WhyChooseUs';

export default async function HomePage() {
  return (
    <main>
      <Hero />
      <PremiumProducts />
      <WhyChooseUs />
      <HowItWorks />
      <OurOffice />
      <TestimonialSection />
      <ModalOpen />
    </main>
  );
}
