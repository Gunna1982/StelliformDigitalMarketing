import Navigation from '@/components/Navigation';
import Portfolio from '@/components/Portfolio';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
// PageLoader removed (no spinner on internal navigation)
import LogoCarouselParticles from '@/components/LogoCarousel3D';
import Hero2 from '@/components/Hero2';
import SpaceBackdrop from '@/components/SpaceBackdrop';
import HowItWorks from '@/components/Howitworks';
import ExitIntentPopup from '@/components/ExitIntentPopup';

export default function Home() {
  return (
    <>
      {/* Space background is now handled inside Hero only */}
      <Navigation />
      <main className="bg-[#070A10]">
        {/* Space backdrop continues through Trusted Partners */}
        <section className="relative">
          <SpaceBackdrop className="opacity-100" />
          <Hero2 />
          <LogoCarouselParticles />
        </section>

        {/* Readable content: ink background + glass panels */}
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_55%)]" />

          <section className="relative">
            <HowItWorks />
          </section>

          <section className="relative">
            <Portfolio />
          </section>

          <section className="relative">
            <ContactForm />
          </section>
        </div>
      </main>
      <Footer />
      <ExitIntentPopup />
    </>
  );
}