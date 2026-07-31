"use client"

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  BriefcaseBusiness,
  FileUp,
  ScanSearch,
  Sparkles,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import useReducedMotion from "../../hooks/useReducedMotion";
import HowItWorksCard, { type HowItWorksStep } from "./how-it-works-card";

const ACCENT = "#2563EB";
const ease = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────
   Content (data-driven)
───────────────────────────────────────── */
const steps: HowItWorksStep[] = [
  {
    number: "01",
    title: "Upload Your Resume",
    description:
      "Upload your existing resume and let CareerAI analyze your experience, skills, structure, and content.",
    icon: FileUp,
  },
  {
    number: "02",
    title: "Get Your ATS Score",
    description:
      "Get an AI-powered ATS score with detailed feedback on formatting, keywords, skills, and resume quality.",
    icon: ScanSearch,
  },
  {
    number: "03",
    title: "Discover Your Skill Gaps",
    description:
      "Compare your skills with your target role and identify the most important skills you need to improve.",
    icon: Target,
  },
  {
    number: "04",
    title: "Find Better Job Matches",
    description:
      "Discover suitable job roles based on your resume, skills, experience, and career goals.",
    icon: BriefcaseBusiness,
  },
  {
    number: "05",
    title: "Prepare & Apply With Confidence",
    description:
      "Improve your resume, generate tailored content, practice AI mock interviews, and get ready to apply.",
    icon: Sparkles,
  },
];

const TRAVEL_DOTS = [
  { delay: 0, duration: 7 },
  { delay: 1.8, duration: 8.5 },
  { delay: 3.4, duration: 10 },
];

interface Point {
  x: number;
  y: number;
}

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );

  useLayoutEffect(() => {
    const mql = window.matchMedia(query);
    const handleChange = () => setMatches(mql.matches);
    handleChange();
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

function buildJourneyPath(points: Point[], width: number): string {
  if (points.length < 2 || width <= 0) return "";
  const midX = width / 2;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const dy = Math.max(b.y - a.y, 40);
    d += ` C ${midX} ${a.y + dy / 2}, ${midX} ${b.y - dy / 2}, ${b.x} ${b.y}`;
  }
  return d;
}

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
export default function HowItWorks() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [geometry, setGeometry] = useState({
    width: 0,
    height: 0,
    points: [] as (Point | null)[],
  });

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const points = cardRefs.current.map((el) =>
      el
        ? { x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + el.offsetHeight / 2 }
        : null,
    );
    setGeometry({
      width: container.offsetWidth,
      height: container.offsetHeight,
      points,
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const registerCard = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el;
    },
    [],
  );

  const pathData = useMemo(() => {
    const pts = geometry.points.filter((p): p is Point => Boolean(p));
    return buildJourneyPath(pts, geometry.width);
  }, [geometry]);

  const showJourneyPath = isDesktop && geometry.width > 0 && pathData.length > 0;

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[#F4F7FF] py-24">
      {/* Soft background accent */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-160px] h-80 w-[44rem] max-w-full -translate-x-1/2 rounded-full bg-[#2563EB]/[0.06] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* ── Header ── */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#2563EB]"
          >
            How it works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.55, ease }}
            className="font-heading mt-5 text-3xl tracking-tight text-ink sm:text-4xl"
          >
            How CareerAI Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16, duration: 0.5, ease }}
            className="mt-4 text-base leading-relaxed text-muted"
          >
            From your resume to your next opportunity — CareerAI helps you build, improve,
            and prepare for your career.
          </motion.p>
        </div>

        {/* ── Journey ── */}
        <div ref={containerRef} className="relative">
          {/* Desktop: animated curved connection path */}
          {showJourneyPath && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 hidden md:block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.9, delay: 0.25, ease }}
            >
              <svg
                className="h-full w-full"
                viewBox={`0 0 ${geometry.width} ${geometry.height}`}
                fill="none"
              >
                {/* Soft underlay that draws in */}
                <motion.path
                  d={pathData}
                  stroke={ACCENT}
                  strokeWidth={10}
                  strokeLinecap="round"
                  strokeOpacity={0.07}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }}
                />
                {/* Marching dashed flow */}
                <motion.path
                  d={pathData}
                  stroke={ACCENT}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeOpacity={0.35}
                  strokeDasharray="10 14"
                  animate={
                    reducedMotion
                      ? { strokeDashoffset: 0 }
                      : { strokeDashoffset: -24 }
                  }
                  transition={{
                    duration: 1.4,
                    ease: "linear",
                    repeat: reducedMotion ? 0 : Infinity,
                  }}
                />
                {/* Traveling dots */}
                {!reducedMotion &&
                  TRAVEL_DOTS.map((dot) => (
                    <motion.circle
                      key={dot.delay}
                      r={3.5}
                      fill={ACCENT}
                      opacity={0.85}
                      style={{ offsetPath: `path("${pathData}")` }}
                      animate={{ offsetDistance: ["0%", "100%"] }}
                      transition={{
                        duration: dot.duration,
                        delay: dot.delay,
                        ease: "linear",
                        repeat: Infinity,
                      }}
                    />
                  ))}
              </svg>
            </motion.div>
          )}

          {/* Mobile: simple vertical connector line */}
          <motion.span
            aria-hidden="true"
            className="absolute bottom-8 left-5 top-8 z-0 w-px bg-gradient-to-b from-[#93C5FD] via-[#2563EB] to-[#93C5FD] md:hidden"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease }}
            style={{ transformOrigin: "top" }}
          />

          {/* Steps */}
          <div className="relative z-10 grid gap-9 md:grid-cols-2 md:items-start md:gap-x-14 md:gap-y-0">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={step.number} className="relative pl-11 md:contents">
                  <span
                    aria-hidden="true"
                    className="absolute left-5 top-9 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white bg-[#2563EB] shadow-[0_0_0_4px_rgba(37,99,235,0.12)] md:hidden"
                  />
                  <HowItWorksCard
                    ref={registerCard(index)}
                    step={step}
                    index={index}
                    side={isDesktop ? (isLeft ? "left" : "right") : undefined}
                    className={cn(
                      isLeft ? "md:w-[88%]" : "md:ml-auto md:mt-24 md:w-[88%]",
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
