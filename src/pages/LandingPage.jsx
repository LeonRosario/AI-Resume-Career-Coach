import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustedLogos from '../components/TrustedLogos';
import Features from '../components/landing/Features';
import UploadCTA from '../components/landing/UploadCTA';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import Footer from '../components/landing/Footer';
import BackgroundGlow from '../components/layout/BackgroundGlow';
import PageTransition from '../components/ui/PageTransition';

export default function LandingPage() {
  return (
    <PageTransition className="relative min-h-screen overflow-hidden bg-white text-slate-800 selection:bg-blue-100 selection:text-blue-900">
      <BackgroundGlow />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <TrustedLogos />
          <Features />
          <UploadCTA />
          <Testimonials />
          <Pricing />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
