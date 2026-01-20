import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import LogoCarousel from '@/components/LogoCarousel';
import Features from '@/components/Features';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import ParticlesBackground from '@/components/ParticlesBackground';
import LogoCarouselParticles from '@/components/LogoCarousel3D';

export default function Home() {
  return (
    <>
      <PageLoader />
      <ParticlesBackground />
      <Navigation />
      <main>
        <Hero />
        <LogoCarouselParticles/>
        <Portfolio />
        <Features />
        <Testimonials />
        <Pricing />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}