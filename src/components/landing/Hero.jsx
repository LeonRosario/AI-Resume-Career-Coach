import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Upload, ArrowRight, CheckCircle2,
  ShieldCheck, Award, Zap, Sparkles, TrendingUp,
} from "lucide-react";
import AuroraBackground from "../ui/aurora-background";
import { DiaText } from "../ui/dia-text";

const resumeSkills = ["AI Strategy", "UX Design", "Product Ops", "Leadership"];
const resumeExp = [
  { title: "Lead Product Designer", company: "Nexa Labs", date: "2024–Now" },
  { title: "Senior UX Consultant",  company: "Pulse AI",  date: "2022–2024" },
];

const floatingBadges = [
  { icon: ShieldCheck, label: "ATS Score", value: "92%",           pos: "top-[-18px] left-4",         delay: 0,   dx: [0,-10,0], dy: [0,-12,0] },
  { icon: Award,       label: "AI Analysis", value: "Skills match", pos: "bottom-[-20px] right-6",      delay: 0.8, dx: [0,-8,0],  dy: [0,12,0]  },
  { icon: Zap,         label: "Matched",    value: "8 key tags",   pos: "top-28 -right-4 hidden sm:block", delay: 1.2, dx: [0,8,0],   dy: [0,-10,0] },
  { icon: TrendingUp,  label: "Interview",  value: "Score 9.2",    pos: "bottom-20 left-0 hidden sm:block", delay: 1.6, dx: [0,10,0],  dy: [0,10,0]  },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 px-6 overflow-hidden" style={{ background: "#F4F7FF" }}>
      <AuroraBackground />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid gap-16 lg:grid-cols-[1.1fr,0.9fr] items-center">

          {/* ─── LEFT: Text ─── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="brand-pill mb-6 w-fit"
            >
              <Sparkles size={13} />
              Your AI career coach, on demand
            </motion.div>

            {/* Headline */}
            <h1
              className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] leading-[1.06] text-ink"
            >
              Land your next role with a{" "}
              <DiaText
                repeat
                repeatDelay={1.2}
                className="gradient-text-animated font-heading-italic"
                text={[
                  "resume that actually works",
                  "better resume.",
                  "stronger career.",
                  "ATS-friendly resume.",
                  "job-winning profile.",
                  "professional portfolio.",
                ]}
              />
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-base sm:text-lg text-muted leading-relaxed max-w-xl">
              CareerAI scans your resume against real job descriptions, closes your
              skill gaps with a guided roadmap, and rehearses your interview answers
              — so you walk in ready.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-9">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/register")}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 60%, #7C3AED 100%)",
                  boxShadow: "0 8px 32px rgba(37,99,235,0.35), 0 2px 8px rgba(37,99,235,0.2)",
                }}
              >
                <Upload size={17} strokeWidth={2.2} />
                Upload your resume — free
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold text-ink"
                style={{
                  background: "rgba(255,255,255,0.80)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(37,99,235,0.18)",
                  boxShadow: "0 4px 16px rgba(37,99,235,0.08)",
                }}
              >
                See how it works
                <ArrowRight size={17} strokeWidth={2.2} />
              </motion.button>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-5 mt-9 text-sm text-muted"
            >
              {["No credit card", "60-second scan", "AI-powered analysis"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-primary-500 shrink-0" />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── RIGHT: Floating card ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.90, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Glow behind card */}
            <div
              className="absolute inset-0 rounded-[40px] pointer-events-none"
              style={{ filter: "blur(60px)", background: "radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.18) 0%, rgba(79,70,229,0.12) 50%, transparent 80%)" }}
              aria-hidden="true"
            />

            <motion.div
              animate={{ y: [0, -14, 0], rotate: [0, -1.2, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[500px]"
            >
              {/* Main resume card */}
              <div
                className="relative overflow-hidden rounded-[32px]"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(32px) saturate(180%)",
                  WebkitBackdropFilter: "blur(32px) saturate(180%)",
                  border: "1px solid rgba(37,99,235,0.16)",
                  boxShadow: "0 32px 80px rgba(37,99,235,0.16), 0 8px 16px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.95)",
                }}
              >
                {/* Top accent bar */}
                <div
                  className="absolute inset-x-0 top-0 h-[2.5px]"
                  style={{ background: "linear-gradient(90deg, #2563EB 0%, #6366F1 50%, #7C3AED 100%)" }}
                  aria-hidden="true"
                />

                {/* Inner glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(37,99,235,0.06) 0%, transparent 65%)" }}
                  aria-hidden="true"
                />

                <div className="relative p-6 sm:p-8">
                  {/* Window dots */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-placeholder font-medium">
                      Resume Preview
                    </span>
                  </div>

                  {/* Name / title */}
                  <div className="mb-5">
                    <p className="text-[10px] uppercase tracking-[0.28em] font-semibold text-primary-600 mb-1">
                      Career Resume
                    </p>
                    <h2 className="font-heading text-2xl text-ink">Jordan Ellis</h2>
                    <p className="text-sm text-muted mt-0.5">Senior Product Designer · AI Resume Coach</p>
                  </div>

                  {/* Skills */}
                  <div
                    className="rounded-2xl p-4 mb-5"
                    style={{ background: "rgba(239,246,255,0.7)", border: "1px solid rgba(37,99,235,0.1)" }}
                  >
                    <div className="flex flex-wrap gap-2">
                      {resumeSkills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full px-3 py-1 text-[11px] font-medium"
                          style={{
                            background: "rgba(255,255,255,0.9)",
                            border: "1px solid rgba(37,99,235,0.18)",
                            color: "#2563EB",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] uppercase tracking-[0.24em] font-medium text-placeholder">
                      Experience
                    </p>
                    {resumeExp.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-2xl p-3.5"
                        style={{ background: "rgba(248,250,255,0.9)", border: "1px solid rgba(37,99,235,0.08)" }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-ink">{item.title}</p>
                            <p className="text-xs text-muted">{item.company}</p>
                          </div>
                          <span className="text-[10px] tracking-wide text-placeholder whitespace-nowrap">{item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating stat badges */}
              {floatingBadges.map((badge) => (
                <motion.div
                  key={badge.label}
                  animate={{ x: badge.dx, y: badge.dy }}
                  transition={{ duration: 8 + badge.delay, repeat: Infinity, ease: "easeInOut", delay: badge.delay }}
                  className={`absolute ${badge.pos} rounded-[999px] px-4 py-2.5`}
                  style={{
                    background: "rgba(255,255,255,0.78)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(37,99,235,0.18)",
                    boxShadow: "0 6px 20px rgba(37,99,235,0.12)",
                  }}
                >
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-muted mb-0.5">
                    <badge.icon size={12} className="text-primary-500 shrink-0" />
                    {badge.label}
                  </div>
                  <p className="text-sm font-semibold text-ink">{badge.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ─── Stats bar ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "50,000+", label: "Resumes analyzed" },
            { value: "94%",     label: "Interview success rate" },
            { value: "2.4×",    label: "More callbacks on avg" },
            { value: "< 60s",   label: "Time to first insight" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.08 }}
              className="glass rounded-xl p-4 text-center"
            >
              <p className="font-heading text-2xl md:text-3xl text-ink">{stat.value}</p>
              <p className="text-xs text-muted mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
