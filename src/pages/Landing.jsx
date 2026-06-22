import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Aurora from "../components/ui/Aurora";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Testimonials from "../components/landing/Testimonials";
import Pricing from "../components/landing/Pricing";
import CtaBand from "../components/landing/CtaBand";

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-base overflow-hidden">
      <Aurora />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CtaBand />
        <Footer />
      </div>
    </div>
  );
}
