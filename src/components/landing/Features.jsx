import { motion, useReducedMotion } from "framer-motion";
import {
  FileText,
  ScanSearch,
  Sparkles,
  Target,
  BarChart3,
  MessageSquare,
  PenSquare,
  Briefcase,
  ArrowRight,
} from "lucide-react";

/* ─────────────────────────────────────────
   Feature data
───────────────────────────────────────── */
const features = [
  {
    icon: FileText,
    title: "AI Resume Builder",
    desc: "Create ATS-friendly resumes with AI-generated content, professional formatting, and recruiter-approved layouts.",
    accent: "#4F8CFF",
    accentSoft: "rgba(79,140,255,0.08)",
    accentBorder: "rgba(79,140,255,0.18)",
    iconBg: "rgba(79,140,255,0.10)",
  },
  {
    icon: ScanSearch,
    title: "ATS Resume Scanner",
    desc: "Analyze your resume against ATS algorithms and instantly identify formatting, keyword, and readability issues.",
    accent: "#6366F1",
    accentSoft: "rgba(99,102,241,0.08)",
    accentBorder: "rgba(99,102,241,0.18)",
    iconBg: "rgba(99,102,241,0.10)",
  },
  {
    icon: Sparkles,
    title: "AI Resume Rewrite",
    desc: "Improve weak bullet points, enhance achievements, and rewrite your resume using powerful AI suggestions.",
    accent: "#7C3AED",
    accentSoft: "rgba(124,58,237,0.08)",
    accentBorder: "rgba(124,58,237,0.18)",
    iconBg: "rgba(124,58,237,0.10)",
  },
  {
    icon: Target,
    title: "Job Match Score",
    desc: "Upload a job description and instantly see how well your resume matches the role with a precise score.",
    accent: "#4F8CFF",
    accentSoft: "rgba(79,140,255,0.08)",
    accentBorder: "rgba(79,140,255,0.18)",
    iconBg: "rgba(79,140,255,0.10)",
  },
  {
    icon: BarChart3,
    title: "Skill Gap Analysis",
    desc: "Compare your skills with industry requirements and receive a personalized roadmap to improve your profile.",
    accent: "#6366F1",
    accentSoft: "rgba(99,102,241,0.08)",
    accentBorder: "rgba(99,102,241,0.18)",
    iconBg: "rgba(99,102,241,0.10)",
  },
  {
    icon: MessageSquare,
    title: "AI Mock Interviews",
    desc: "Practice realistic interview questions with AI and receive detailed, constructive feedback after every answer.",
    accent: "#7C3AED",
    accentSoft: "rgba(124,58,237,0.08)",
    accentBorder: "rgba(124,58,237,0.18)",
    iconBg: "rgba(124,58,237,0.10)",
  },
  {
    icon: PenSquare,
    title: "AI Cover Letter Generator",
    desc: "Generate personalized cover letters tailored to each company and job description in seconds.",
    accent: "#4F8CFF",
    accentSoft: "rgba(79,140,255,0.08)",
    accentBorder: "rgba(79,140,255,0.18)",
    iconBg: "rgba(79,140,255,0.10)",
  },
  {
    icon: Briefcase,
    title: "Career Roadmap",
    desc: "Receive AI-generated learning paths, certifications, and career guidance based on your individual goals.",
    accent: "#6366F1",
    accentSoft: "rgba(99,102,241,0.08)",
    accentBorder: "rgba(99,102,241,0.18)",
    iconBg: "rgba(99,102,241,0.10)",
  },
];

/* ─────────────────────────────────────────
   Single feature card
───────────────────────────────────────── */
function FeatureCard({ feature, index }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: reduce ? 0 : (index % 4) * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={
        reduce
          ? undefined
          : { y: -8, scale: 1.03, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }
      }
      className="group relative flex flex-col rounded-3xl cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF]/50"
      style={{
        background: "#FFFFFF",
        border: "1px solid #E6EEFF",
        boxShadow: "0 2px 12px rgba(79,140,255,0.06), 0 1px 2px rgba(79,140,255,0.04)",
        transition: "box-shadow 0.28s ease, background 0.28s ease, border-color 0.28s ease",
      }}
      /* Hover: applied via inline style via onMouse for glow — framer handles y/scale */
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 16px 48px rgba(79,140,255,0.14), 0 4px 12px rgba(79,140,255,0.08)`;
        e.currentTarget.style.background = "#F8FAFF";
        e.currentTarget.style.borderColor = feature.accentBorder;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(79,140,255,0.06), 0 1px 2px rgba(79,140,255,0.04)";
        e.currentTarget.style.background = "#FFFFFF";
        e.currentTarget.style.borderColor = "#E6EEFF";
      }}
      tabIndex={0}
      role="article"
      aria-label={feature.title}
    >
      {/* Animated left-border accent */}
      <motion.div
        className="absolute left-0 top-6 bottom-6 w-0 rounded-r-full"
        style={{ background: feature.accent }}
        initial={{ width: 0, opacity: 0 }}
        whileHover={
          reduce ? undefined : { width: 4, opacity: 1, transition: { duration: 0.22, ease: "easeOut" } }
        }
        aria-hidden="true"
      />

      <div className="relative p-7 flex flex-col h-full">
        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shrink-0"
          style={{ background: feature.iconBg }}
          whileHover={reduce ? undefined : { scale: 1.12, transition: { duration: 0.22 } }}
          aria-hidden="true"
        >
          <feature.icon
            size={22}
            strokeWidth={1.8}
            style={{ color: feature.accent }}
          />
        </motion.div>

        {/* Title */}
        <motion.h3
          className="font-heading text-[1.05rem] font-bold text-[#0A0F1E] leading-snug mb-2.5 tracking-tight"
          whileHover={
            reduce ? undefined : { y: -3, transition: { duration: 0.22, ease: "easeOut" } }
          }
        >
          {feature.title}
        </motion.h3>

        {/* Description */}
        <p className="text-sm text-[#5B6B82] leading-[1.7] flex-1">
          {feature.desc}
        </p>

        {/* Learn more row */}
        <div
          className="mt-5 pt-4 border-t flex items-center gap-1.5"
          style={{ borderColor: "#EEF5FF" }}
        >
          <span
            className="text-xs font-semibold transition-colors duration-200"
            style={{ color: feature.accent }}
          >
            Learn more
          </span>
          <motion.span
            aria-hidden="true"
            initial={{ x: 0 }}
            whileHover={reduce ? undefined : { x: 5 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ color: feature.accent }}
          >
            <ArrowRight size={13} strokeWidth={2.4} />
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────
   Main section
───────────────────────────────────────── */
export default function Features() {
  const reduce = useReducedMotion();

  return (
    <section
      id="features"
      className="relative px-6 py-24 bg-white overflow-hidden"
      aria-labelledby="features-heading"
    >
      {/* Faint radial glow behind section — 8% opacity */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,140,255,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Subtle grid — matches site global pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(79,140,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,140,255,0.03) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <div className="text-center max-w-[700px] mx-auto mb-16">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-5"
          >
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
              style={{
                background: "rgba(79,140,255,0.08)",
                border: "1px solid rgba(79,140,255,0.18)",
                color: "#4F8CFF",
              }}
            >
              <Sparkles size={12} strokeWidth={2.2} aria-hidden="true" />
              AI Powered Career Platform
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            id="features-heading"
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-bold text-[#0A0F1E] tracking-tight"
            style={{ fontSize: "clamp(28px, 5vw, 44px)", lineHeight: 1.12 }}
          >
            Everything you need to land your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #4F8CFF 0%, #7CB8FF 50%, #6366F1 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              dream job
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-base text-[#5B6B82] leading-relaxed max-w-[600px] mx-auto"
          >
            Powerful AI tools that help you build ATS-friendly resumes, optimize every
            section, prepare for interviews, and discover your perfect career path — all
            from one intelligent platform.
          </motion.p>
        </div>

        {/* ── Feature grid ── */}
        {/*
          Breakpoints:
          - Mobile  (< 640px):  1 column
          - Tablet  (640-1023): 2 columns
          - Desktop (≥ 1024px): 4 columns
        */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>

        {/* ── Bottom trust bar ── */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {[
            { value: "50K+",  label: "Resumes analyzed" },
            { value: "94%",   label: "Interview success rate" },
            { value: "2.4×",  label: "More callbacks" },
            { value: "< 60s", label: "First insight" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span
                className="font-heading font-bold block text-xl"
                style={{ color: "#0A0F1E" }}
              >
                {stat.value}
              </span>
              <span className="text-xs text-[#5B6B82] mt-0.5 block font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
