import { motion } from "framer-motion";
import { Upload, ScanLine, TrendingUp, ArrowRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload your resume",
    desc: "Drop in a PDF — we parse your experience, skills, and projects in seconds.",
    gradient: "from-[#2563EB] to-[#4F46E5]",
    glow: "rgba(37,99,235,0.30)",
    accent: "#2563EB",
    detail: "PDF · DOCX · Any format",
  },
  {
    icon: ScanLine,
    step: "02",
    title: "Get scanned & scored",
    desc: "See your ATS score, matched skills, and exactly what's missing for your target role.",
    gradient: "from-[#4F46E5] to-[#7C3AED]",
    glow: "rgba(99,102,241,0.30)",
    accent: "#6366F1",
    detail: "Results in under 60 seconds",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Close the gap & apply",
    desc: "Follow your roadmap, rehearse interviews, and apply to roles ranked by real fit.",
    gradient: "from-[#7C3AED] to-[#9333EA]",
    glow: "rgba(124,58,237,0.30)",
    accent: "#7C3AED",
    detail: "AI-guided every step",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-6 py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 20% 50%, rgba(37,99,235,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 40%, rgba(124,58,237,0.05) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.025) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="brand-pill mb-5 inline-flex"
          >
            How it works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.55, ease }}
            className="font-heading text-3xl sm:text-4xl text-ink mt-4"
          >
            Three steps to your next offer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14, duration: 0.5, ease }}
            className="text-muted mt-4 text-base"
          >
            From upload to offer — the whole process guided by AI.
          </motion.p>
        </div>

        {/* ── Steps ── */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connector line — desktop only */}
          <div className="absolute top-[52px] left-[calc(16.67%+40px)] right-[calc(16.67%+40px)] h-px hidden md:flex items-center" aria-hidden="true">
            <motion.div
              className="w-full h-px"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease }}
              style={{
                background: "linear-gradient(90deg, #2563EB 0%, #6366F1 50%, #7C3AED 100%)",
                transformOrigin: "left",
                opacity: 0.3,
              }}
            />
            {/* Arrow dots along the line */}
            <div className="absolute inset-0 flex items-center justify-center gap-12 pointer-events-none">
              {[0.2, 0.5, 0.8].map((pos, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.3, ease }}
                  className="w-1.5 h-1.5 rounded-full bg-primary-400"
                  style={{ position: "absolute", left: `${pos * 100}%` }}
                />
              ))}
            </div>
          </div>

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.14, duration: 0.6, ease }}
              whileHover={{ y: -8, transition: { duration: 0.28, ease } }}
              className="relative group"
            >
              {/* Card */}
              <div
                className="rounded-[28px] p-8 h-full flex flex-col transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.80)",
                  backdropFilter: "blur(24px) saturate(160%)",
                  WebkitBackdropFilter: "blur(24px) saturate(160%)",
                  border: `1px solid rgba(${i === 0 ? "37,99,235" : i === 1 ? "99,102,241" : "124,58,237"},0.14)`,
                  boxShadow: `0 4px 24px rgba(${i === 0 ? "37,99,235" : i === 1 ? "99,102,241" : "124,58,237"},0.07)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 60px ${s.glow}, 0 4px 12px ${s.glow}`;
                  e.currentTarget.style.borderColor = `${s.accent}30`;
                  e.currentTarget.style.background = "rgba(255,255,255,0.95)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 4px 24px rgba(${i === 0 ? "37,99,235" : i === 1 ? "99,102,241" : "124,58,237"},0.07)`;
                  e.currentTarget.style.borderColor = `rgba(${i === 0 ? "37,99,235" : i === 1 ? "99,102,241" : "124,58,237"},0.14)`;
                  e.currentTarget.style.background = "rgba(255,255,255,0.80)";
                }}
              >
                {/* Step number top-right */}
                <div className="flex items-start justify-between mb-6">
                  {/* Icon */}
                  <motion.div
                    className={`w-[60px] h-[60px] rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shrink-0`}
                    style={{ boxShadow: `0 8px 24px ${s.glow}` }}
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  >
                    <s.icon size={26} className="text-white" strokeWidth={1.8} />
                  </motion.div>

                  {/* Step badge */}
                  <span
                    className="text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                    style={{
                      background: `${s.accent}12`,
                      color: s.accent,
                      border: `1px solid ${s.accent}22`,
                    }}
                  >
                    Step {s.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl text-ink mb-3 leading-snug">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed flex-1">{s.desc}</p>

                {/* Detail chip */}
                <div
                  className="mt-5 pt-5 border-t flex items-center gap-2"
                  style={{ borderColor: `${s.accent}14` }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: s.accent }}
                  />
                  <span
                    className="text-xs font-semibold"
                    style={{ color: s.accent }}
                  >
                    {s.detail}
                  </span>
                  <motion.span
                    className="ml-auto"
                    style={{ color: s.accent, opacity: 0 }}
                    whileHover={{ opacity: 1, x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={14} strokeWidth={2.2} />
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom mini-stat row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.55, ease }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {[
            { value: "< 60s",  label: "Analysis time",     color: "#2563EB" },
            { value: "9.2/10", label: "Interview score",   color: "#6366F1" },
            { value: "3×",     label: "More interviews",   color: "#7C3AED" },
            { value: "Free",   label: "To get started",    color: "#22C55E" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 + i * 0.07, duration: 0.45, ease }}
              className="text-center"
            >
              <span
                className="font-heading text-2xl font-bold block"
                style={{ color: s.color }}
              >
                {s.value}
              </span>
              <span className="text-xs text-muted mt-0.5 block font-medium">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
