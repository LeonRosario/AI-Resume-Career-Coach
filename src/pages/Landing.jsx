import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/landing/Hero";
import LogoCloud from "../components/ui/logo-cloud";
import DashboardShowcase from "../components/landing/DashboardShowcase";
import Features from "../components/landing/Features";
import ShowcaseSection from "../components/landing/ShowcaseSection";
import HowItWorks from "../components/landing/HowItWorks";
import TestimonialsSection from "../components/ui/testimonials-columns-1";
import Pricing from "../components/landing/Pricing";
import CtaBand from "../components/landing/CtaBand";
import FloatingBackground from "../components/ui/FloatingBackground";
import Particles from "../components/ui/Particles";
import BackToTop from "../components/ui/BackToTop";
import CursorGlow from "../components/ui/CursorGlow";
import SectionDivider from "../components/ui/SectionDivider";

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* Floating gradient blobs */}
      <FloatingBackground />

      {/* Subtle floating particles */}
      <Particles />

      <div className="relative z-10">
        {/* ── Navigation ── */}
        <Navbar />

        {/* ── Hero ── */}
        <Hero />

        {/* ── Trusted Technologies ── */}
        <LogoCloud />

        {/* ── Product Showcase (Container Scroll) ── */}
        <DashboardShowcase />

        {/* ── Wave divider ── */}
        <SectionDivider />

        {/* ── Feature cards ── */}
        {/* bg: white */}
        <Features />

        {/* ── Wave divider ── */}
        <SectionDivider flip />

        {/* ── AI Dashboard Showcase ── */}
        {/* bg: #F4F7FF */}
        <ShowcaseSection />

        {/* ── How it works ── */}
        {/* bg: #F4F7FF */}
        <HowItWorks />

        {/* ── Wave divider ── */}
        <SectionDivider />

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

      {/* ── Back to top button ── */}
      <BackToTop />

      {/* ── Cursor glow ── */}
      <CursorGlow />
    </div>
  );
}
