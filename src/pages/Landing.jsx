import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/landing/Hero";
import LogoCloud from "../components/ui/logo-cloud";
import DashboardShowcase from "../components/landing/DashboardShowcase";
import CareerStoryScroll from "../components/landing/CareerStoryScroll";
import Features from "../components/landing/Features";

import HowItWorks from "../components/landing/HowItWorks";
import Pricing from "../components/landing/Pricing";
import TestimonialsMarquee from "../components/landing/TestimonialsMarquee";
import CtaBand from "../components/landing/CtaBand";
import BackToTop from "../components/ui/BackToTop";
import SectionDivider from "../components/ui/SectionDivider";

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">

      <div className="relative z-10">
        {/* ── Navigation ── */}
        <Navbar />

        {/* ── Hero ── */}
        <Hero />

        {/* ── Premium Storytelling Scroll ── */}
        <CareerStoryScroll />

        {/* ── Trusted Technologies ── */}
        <LogoCloud />

        {/* ── Product Showcase (Container Scroll) ── */}
        <DashboardShowcase />

        {/* ── Wave divider ── */}
        <SectionDivider />

        {/* ── Feature cards ── */}
        {/* bg: white */}
        <Features />



        {/* ── How it works ── */}
        {/* bg: #F4F7FF */}
        <HowItWorks />

        {/* ── Wave divider ── */}
        <SectionDivider />

        {/* ── Pricing ── */}
        {/* bg: white */}
        <Pricing />

        {/* ── Scrolling testimonials marquee ── */}
        {/* bg: white */}
        <TestimonialsMarquee />

        {/* ── CTA band ── */}
        <CtaBand />

        {/* ── Footer ── */}
        <Footer />
      </div>

      {/* ── Back to top button ── */}
      <BackToTop />


    </div>
  );
}
