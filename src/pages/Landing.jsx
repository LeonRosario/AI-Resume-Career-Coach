import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/landing/Hero";
import DashboardShowcase from "../components/landing/DashboardShowcase";
import Features from "../components/landing/Features";
import ShowcaseSection from "../components/landing/ShowcaseSection";
import HowItWorks from "../components/landing/HowItWorks";
import TestimonialsSection from "../components/ui/testimonials-columns-1";
import Pricing from "../components/landing/Pricing";
import CtaBand from "../components/landing/CtaBand";

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: "#F4F7FF" }}>

      {/* Global subtle grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* ── Navigation ── */}
        <Navbar />

        {/* ── Hero ── */}
        <Hero />

        {/* ── Product Showcase (Container Scroll) ── */}
        <DashboardShowcase />

        {/* ── Feature cards ── */}
        {/* bg: white */}
        <Features />

        {/* ── AI Dashboard Showcase ── */}
        {/* bg: #F4F7FF */}
        <ShowcaseSection />

        {/* ── How it works ── */}
        {/* bg: #F4F7FF */}
        <HowItWorks />

        {/* ── Scrolling testimonials ── */}
        {/* bg: white */}
        <TestimonialsSection />

        {/* ── Pricing ── */}
        {/* bg: white */}
        <Pricing />

        {/* ── CTA band ── */}
        <CtaBand />

        {/* ── Footer ── */}
        <Footer />
      </div>
    </div>
  );
}
