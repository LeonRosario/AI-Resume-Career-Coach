import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Upload, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Award, Zap } from "lucide-react";
import Button from "../ui/Button";
import { Typewriter } from "../ui/TypewriterText";
import HeroBackground from "../HeroBackground";

const resumeSkills = ["AI Strategy", "UX Design", "Product Ops", "Leadership"];
const resumeExperience = [
  { title: "Lead Product Designer", company: "Nexa Labs", date: "2024" },
  { title: "Senior UX Consultant", company: "Pulse AI", date: "2022" },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-40 pb-24 px-6 overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.05fr,0.95fr] items-center">
        {/* ── Left: Hero text ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Pill badge */}
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-6"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(0,132,255,0.2)",
              color: "#0084FF",
              boxShadow: "0 2px 12px rgba(0,132,255,0.1)",
            }}
          >
            <Sparkles size={14} /> Your AI career coach, on demand
          </span>

          {/* Headline */}
          <h1
            className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.04] tracking-tight"
            style={{ color: "#111827" }}
          >
            Land your next role with a resume that actually{" "}
            <Typewriter
              text={["gets read", "gets noticed", "gets interviews", "gets you hired"]}
              speed={90}
              deleteSpeed={45}
              delay={1800}
              loop={true}
              cursor="|"
              className="text-gradient-blue"
            />
          </h1>

          {/* Subtitle */}
          <p
            className="mt-6 text-lg leading-relaxed max-w-xl"
            style={{ color: "#4B5563" }}
          >
            CareerAI scans your resume against real job descriptions, closes your
            skill gaps with a guided roadmap, and rehearses your interview answers
            — so you walk in ready.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-9">
            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-semibold text-white transition-all"
              style={{
                background: "#0084FF",
                boxShadow: "0 8px 30px rgba(0,132,255,0.35)",
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,132,255,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,132,255,0.35)")}
            >
              <Upload size={18} strokeWidth={2.25} />
              Upload your resume — free
            </button>
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-semibold transition-all"
              style={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid #DCEEFF",
                color: "#111827",
                boxShadow: "0 4px 16px rgba(0,132,255,0.08)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.9)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.7)")}
            >
              See how it works <ArrowRight size={18} strokeWidth={2.25} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col sm:flex-row gap-6 mt-10 text-sm" style={{ color: "#6B7280" }}>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} style={{ color: "#0084FF" }} /> No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} style={{ color: "#0084FF" }} /> 60-second scan
            </span>
          </div>
        </motion.div>

        {/* ── Right: Floating resume card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div
            animate={{ y: [0, -16, 0], rotate: [0, -1.5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[520px]"
          >
            {/* Main resume card — white glass */}
            <div
              className="relative overflow-hidden rounded-[36px]"
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                border: "1px solid rgba(0,132,255,0.15)",
                boxShadow: "0 30px 80px rgba(0,132,255,0.15), 0 2px 0 rgba(255,255,255,0.9) inset",
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute inset-x-0 top-0 h-[2px]"
                style={{
                  background: "linear-gradient(90deg, #60B1FF 0%, #0084FF 50%, #38BDF8 100%)",
                }}
              />
              {/* Subtle inner glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,132,255,0.07) 0%, transparent 70%)",
                }}
              />

              <div className="relative p-6 sm:p-8">
                {/* Window dots + label */}
                <div className="flex items-center justify-between mb-7">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span
                    className="text-[11px] uppercase tracking-[0.3em]"
                    style={{ color: "#9CA3AF" }}
                  >
                    PDF PREVIEW
                  </span>
                </div>

                {/* Name / title */}
                <div className="space-y-2 mb-6">
                  <p
                    className="text-xs uppercase tracking-[0.26em] font-semibold"
                    style={{ color: "#0084FF" }}
                  >
                    Career Resume
                  </p>
                  <h2
                    className="text-3xl font-semibold"
                    style={{ color: "#111827" }}
                  >
                    Jordan Ellis
                  </h2>
                  <p className="text-sm" style={{ color: "#6B7280" }}>
                    Senior Product Designer · AI Resume Coach
                  </p>
                </div>

                {/* Skills */}
                <div
                  className="rounded-3xl p-4 mb-6"
                  style={{
                    background: "rgba(240,248,255,0.8)",
                    border: "1px solid rgba(0,132,255,0.12)",
                  }}
                >
                  <div className="flex flex-wrap gap-2">
                    {resumeSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] font-medium"
                        style={{
                          background: "rgba(255,255,255,0.85)",
                          border: "1px solid rgba(0,132,255,0.2)",
                          color: "#0084FF",
                          boxShadow: "0 1px 4px rgba(0,132,255,0.08)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p
                      className="text-xs uppercase tracking-[0.22em] font-medium"
                      style={{ color: "#9CA3AF" }}
                    >
                      Experience
                    </p>
                    {resumeExperience.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-3xl p-4"
                        style={{
                          background: "rgba(248,252,255,0.9)",
                          border: "1px solid rgba(0,132,255,0.1)",
                        }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p
                              className="text-sm font-semibold"
                              style={{ color: "#111827" }}
                            >
                              {item.title}
                            </p>
                            <p className="text-xs" style={{ color: "#6B7280" }}>
                              {item.company}
                            </p>
                          </div>
                          <span
                            className="text-[11px] uppercase tracking-[0.18em]"
                            style={{ color: "#9CA3AF" }}
                          >
                            {item.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Projects / Education */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        label: "Projects",
                        title: "AI hiring dashboard",
                        sub: "Resume analytics for hiring teams.",
                      },
                      {
                        label: "Education",
                        title: "M.S. Design Systems",
                        sub: "Stanford University · 2020",
                      },
                    ].map((card) => (
                      <div
                        key={card.label}
                        className="rounded-3xl p-4"
                        style={{
                          background: "rgba(248,252,255,0.9)",
                          border: "1px solid rgba(0,132,255,0.1)",
                        }}
                      >
                        <p
                          className="text-xs uppercase tracking-[0.24em] font-medium"
                          style={{ color: "#9CA3AF" }}
                        >
                          {card.label}
                        </p>
                        <p
                          className="mt-3 text-sm font-semibold"
                          style={{ color: "#111827" }}
                        >
                          {card.title}
                        </p>
                        <p className="text-xs mt-1" style={{ color: "#6B7280" }}>
                          {card.sub}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Floating badges (glass white) ── */}

            {/* ATS Score — top left */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 left-3 rounded-[999px] px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(0,132,255,0.2)",
                boxShadow: "0 8px 24px rgba(0,132,255,0.12)",
              }}
            >
              <div
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] mb-1"
                style={{ color: "#6B7280" }}
              >
                <ShieldCheck size={14} style={{ color: "#0084FF" }} />
                <span>ATS Score</span>
              </div>
              <p className="text-xl font-semibold" style={{ color: "#0084FF" }}>
                92%
              </p>
            </motion.div>

            {/* AI Analysis — bottom right */}
            <motion.div
              animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute -bottom-8 right-6 rounded-[999px] px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(0,132,255,0.2)",
                boxShadow: "0 8px 24px rgba(0,132,255,0.12)",
              }}
            >
              <div
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] mb-1"
                style={{ color: "#6B7280" }}
              >
                <Award size={14} style={{ color: "#0084FF" }} />
                <span>AI Analysis</span>
              </div>
              <p className="text-sm font-semibold" style={{ color: "#111827" }}>
                Skills match
              </p>
            </motion.div>

            {/* Skills Matched — right side */}
            <motion.div
              animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
              transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="absolute top-28 right-0 rounded-[999px] px-4 py-3 hidden sm:block"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(0,132,255,0.2)",
                boxShadow: "0 8px 24px rgba(0,132,255,0.12)",
              }}
            >
              <div
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] mb-1"
                style={{ color: "#6B7280" }}
              >
                <Zap size={14} style={{ color: "#0084FF" }} />
                <span>Skills Matched</span>
              </div>
              <p className="text-sm font-semibold" style={{ color: "#111827" }}>
                8 key tags
              </p>
            </motion.div>

            {/* Interview Ready — bottom left */}
            <motion.div
              animate={{ y: [0, 10, 0], x: [0, 10, 0] }}
              transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
              className="absolute bottom-16 left-0 rounded-[999px] px-4 py-3 hidden sm:block"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(0,132,255,0.2)",
                boxShadow: "0 8px 24px rgba(0,132,255,0.12)",
              }}
            >
              <div
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] mb-1"
                style={{ color: "#6B7280" }}
              >
                <Sparkles size={14} style={{ color: "#0084FF" }} />
                <span>Interview Ready</span>
              </div>
              <p className="text-sm font-semibold" style={{ color: "#111827" }}>
                Confidence boost
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
