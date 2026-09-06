import { lazy, Suspense } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/landing/Hero";
import LogoCloud from "../components/ui/logo-cloud";
import BackToTop from "../components/ui/BackToTop";
import SectionDivider from "../components/ui/SectionDivider";

// Lazy load components that appear below the fold
const DashboardShowcase = lazy(() => import("../components/landing/DashboardShowcase"));
const Features = lazy(() => import("../components/landing/Features"));
const HowItWorks = lazy(() => import("../components/ui/how-it-works"));
const Pricing = lazy(() => import("../components/landing/Pricing"));
const TestimonialsMarquee = lazy(() => import("../components/landing/TestimonialsMarquee"));
const CtaBand = lazy(() => import("../components/landing/CtaBand"));

// Minimal loading placeholder
function SectionPlaceholder() {
  return <div className="h-96 bg-gradient-to-b from-white to-gray-50" />;
}

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">

      <div className="relative z-10">
        {/* ── Navigation ── */}
        <Navbar />

        {/* ── Hero (above fold) ── */}
        <Hero />

        {/* ── Trusted Technologies ── */}
        <LogoCloud />

        {/* ── Lazy loaded sections (below fold) ── */}
        <Suspense fallback={<SectionPlaceholder />}>
          {/* ── Product Showcase (Container Scroll) ── */}
          <DashboardShowcase />
        </Suspense>

        {/* ── Wave divider ── */}
        <SectionDivider />

        {/* ── Feature cards ── */}
        <Suspense fallback={<SectionPlaceholder />}>
          <Features />
        </Suspense>

        {/* ── How it works ── */}
        <Suspense fallback={<SectionPlaceholder />}>
          <HowItWorks />
        </Suspense>

        {/* ── Wave divider ── */}
        <SectionDivider />

        {/* ── Pricing ── */}
        <Suspense fallback={<SectionPlaceholder />}>
          <Pricing />
        </Suspense>

        {/* ── Scrolling testimonials marquee ── */}
        <Suspense fallback={<SectionPlaceholder />}>
          <TestimonialsMarquee />
        </Suspense>

        {/* ── CTA band ── */}
        <Suspense fallback={<SectionPlaceholder />}>
          <CtaBand />
        </Suspense>

        {/* ── Footer ── */}
        <Footer />
      </div>

      {/* ── Back to top button ── */}
      <BackToTop />

    </div>
  );
}
