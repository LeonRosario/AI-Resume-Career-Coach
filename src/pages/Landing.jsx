import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import TestimonialsSection from "../components/ui/testimonials-columns-1";
import Pricing from "../components/landing/Pricing";
import CtaBand from "../components/landing/CtaBand";

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#F8FBFF" }}>
      {/* Page-level grid background pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(33,150,243,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(33,150,243,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <TestimonialsSection />
        <Pricing />
        <CtaBand />
        <Footer />
      </div>
    </div>
  );
}
