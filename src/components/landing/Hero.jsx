import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Upload, ArrowRight, CheckCircle2,
  ShieldCheck, Award, Zap, Sparkles, TrendingUp,
} from "lucide-react";
import AuroraBackground from "../ui/aurora-background";
import { TextRotate } from "../ui/text-rotate";
import { ParallaxContainer, FloatingCard } from "../ui/parallax-floating";
import TextInertia from "../ui/text-inertia";

const resumeSkills = ["AI Strategy", "UX Design", "Product Ops", "Leadership"];
const resumeExp = [
  { title: "Lead Product Designer", company: "Nexa Labs", date: "2024–Now" },
  { title: "Senior UX Consultant",  company: "Pulse AI",  date: "2022–2024" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const statData = [
  { value: "50,000+", label: "Resumes analyzed" },
  { value: "94%",     label: "Interview success rate" },
  { value: "2.4×",    label: "More callbacks on avg" },
  { value: "< 60s",   label: "Time to first insight" },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 px-6 overflow-hidden" style={{ background: "#F4F7FF" }}>
      <AuroraBackground />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />

      {/* Scanning line */}
      <motion.div
        className="absolute inset-x-0 h-px pointer-events-none z-[1]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.15) 50%, transparent 100%)",
        }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid gap-16 lg:grid-cols-[1.1fr,0.9fr] items-center">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemFadeUp} className="brand-pill mb-6 w-fit">
              <Sparkles size={13} />
              Your AI career coach, on demand
            </motion.div>

            <motion.h1
              variants={itemFadeUp}
              className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] leading-[1.06] text-ink"
            >
              Land your next role with a{" "}
              <TextRotate
                interval={2800}
                className="gradient-text-animated font-heading-italic"
                texts={[
                  "resume that actually works",
                  "better resume.",
                  "stronger career.",
                  "ATS-friendly resume.",
                  "job-winning profile.",
                  "professional portfolio.",
                ]}
              />
            </motion.h1>

            <motion.div
              variants={itemFadeUp}
              className="mt-6 max-w-xl"
            >
              <TextInertia
                className="text-base sm:text-lg text-muted leading-relaxed text-left justify-start"
                intensity={0.3}
                text="Crafting refined, pixel-perfect web experiences that balance design clarity with technical excellence. Every interaction should feel responsive, intentional, and calm enough to disappear into the work. Motion adds a quiet layer of feedback, helping people sense where they are and what just changed."
              />
            </motion.div>

            <motion.div variants={itemFadeUp} className="flex flex-col sm:flex-row gap-3 mt-9">
              <motion.button
                whileHover={{
                  scale: 1.04,
                  y: -3,
                  boxShadow: "0 24px 56px rgba(37,99,235,0.5), 0 4px 16px rgba(37,99,235,0.35), 0 0 40px rgba(37,99,235,0.15)",
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={() => navigate("/register")}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 60%, #7C3AED 100%)",
                  boxShadow: "0 8px 32px rgba(37,99,235,0.35), 0 2px 8px rgba(37,99,235,0.2)",
                }}
              >
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Upload size={17} strokeWidth={2.2} />
                </motion.span>
                Upload your resume — free
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.03,
                  y: -2,
                  boxShadow: "0 16px 40px rgba(37,99,235,0.18), 0 4px 12px rgba(37,99,235,0.1)",
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight size={17} strokeWidth={2.2} />
                </motion.span>
              </motion.button>
            </motion.div>

            <motion.div variants={itemFadeUp} className="flex flex-wrap gap-5 mt-9 text-sm text-muted">
              {["No credit card", "60-second scan", "AI-powered analysis"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-primary-500 shrink-0" />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <ParallaxContainer speed={0.025} className="relative flex justify-center lg:justify-end">
            <div
              className="absolute inset-0 rounded-[40px] pointer-events-none"
              style={{ filter: "blur(60px)", background: "radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.18) 0%, rgba(79,70,229,0.12) 50%, transparent 80%)" }}
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.90, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[500px]"
            >
              <div
                className="relative overflow-hidden rounded-[32px] transition-shadow duration-500 hover:shadow-[0_40px_100px_rgba(37,99,235,0.22),0_12px_24px_rgba(37,99,235,0.1)]"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(32px) saturate(180%)",
                  WebkitBackdropFilter: "blur(32px) saturate(180%)",
                  border: "1px solid rgba(37,99,235,0.16)",
                  boxShadow: "0 32px 80px rgba(37,99,235,0.16), 0 8px 16px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.95)",
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-[2.5px]"
                  style={{ background: "linear-gradient(90deg, #2563EB 0%, #6366F1 50%, #7C3AED 100%)" }}
                  aria-hidden="true"
                />

                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(37,99,235,0.06) 0%, transparent 65%)" }}
                  aria-hidden="true"
                />

                <div className="relative p-6 sm:p-8">
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

                  <div className="mb-5">
                    <p className="text-[10px] uppercase tracking-[0.28em] font-semibold text-primary-600 mb-1">
                      Career Resume
                    </p>
                    <h2 className="font-heading text-2xl text-ink">Jordan Ellis</h2>
                    <p className="text-sm text-muted mt-0.5">Senior Product Designer · AI Resume Coach</p>
                  </div>

                  <div
                    className="rounded-2xl p-4 mb-5"
                    style={{ background: "rgba(239,246,255,0.7)", border: "1px solid rgba(37,99,235,0.1)" }}
                  >
                    <div className="flex flex-wrap gap-2">
                      {resumeSkills.map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.08, duration: 0.4, ease: "easeOut" }}
                          className="rounded-full px-3 py-1 text-[11px] font-medium"
                          style={{
                            background: "rgba(255,255,255,0.9)",
                            border: "1px solid rgba(37,99,235,0.18)",
                            color: "#2563EB",
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <p className="text-[10px] uppercase tracking-[0.24em] font-medium text-placeholder">
                      Experience
                    </p>
                    {resumeExp.map((item, i) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.1, duration: 0.5, ease: "easeOut" }}
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
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <FloatingCard
                className="absolute -top-3 -left-4 hidden md:block"
                floatY={10}
                duration={7}
                delay={0}
              >
                <div
                  className="rounded-2xl px-4 py-3 min-w-[150px]"
                  style={{
                    background: "rgba(255,255,255,0.90)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(37,99,235,0.18)",
                    boxShadow: "0 8px 28px rgba(37,99,235,0.12), 0 2px 8px rgba(37,99,235,0.06)",
                  }}
                >
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-muted mb-1.5">
                    <ShieldCheck size={12} className="text-primary-500 shrink-0" />
                    ATS Score
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9">
                      <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="14.5" fill="none" stroke="rgba(37,99,235,0.1)" strokeWidth="3" />
                        <motion.circle
                          cx="18" cy="18" r="14.5" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 14.5}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 14.5 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 14.5 * 0.08 }}
                          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                        />
                      </svg>
                    </div>
                    <span className="text-lg font-bold text-ink">
                      92<span className="text-xs text-muted font-medium">/100</span>
                    </span>
                  </div>
                </div>
              </FloatingCard>

              <FloatingCard
                className="absolute -bottom-2 -right-2 hidden md:block"
                floatY={-8}
                duration={8}
                delay={0.5}
              >
                <div
                  className="rounded-2xl px-4 py-3 min-w-[160px]"
                  style={{
                    background: "rgba(255,255,255,0.90)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(37,99,235,0.18)",
                    boxShadow: "0 8px 28px rgba(37,99,235,0.12), 0 2px 8px rgba(37,99,235,0.06)",
                  }}
                >
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-muted mb-1.5">
                    <Award size={12} className="text-emerald-500 shrink-0" />
                    Job Match
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg font-bold text-ink">86%</span>
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(37,99,235,0.08)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, #22C55E, #16A34A)" }}
                        initial={{ width: 0 }}
                        animate={{ width: "86%" }}
                        transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </FloatingCard>

              <FloatingCard
                className="absolute -top-1 -right-1 hidden lg:block"
                floatY={6}
                duration={9}
                delay={1}
              >
                <div
                  className="rounded-2xl px-4 py-3 min-w-[140px]"
                  style={{
                    background: "rgba(255,255,255,0.90)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(37,99,235,0.18)",
                    boxShadow: "0 8px 28px rgba(37,99,235,0.12), 0 2px 8px rgba(37,99,235,0.06)",
                  }}
                >
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-muted mb-1.5">
                    <Zap size={12} className="text-amber-500 shrink-0" />
                    Skill Gap
                  </div>
                  <p className="text-sm font-semibold text-ink">3 areas found</p>
                  <p className="text-[10px] text-muted mt-0.5">AI-powered analysis</p>
                </div>
              </FloatingCard>

              <FloatingCard
                className="absolute bottom-16 -left-5 hidden lg:block"
                floatY={-7}
                duration={10}
                delay={1.5}
              >
                <div
                  className="rounded-2xl px-4 py-3 min-w-[150px]"
                  style={{
                    background: "rgba(255,255,255,0.90)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(37,99,235,0.18)",
                    boxShadow: "0 8px 28px rgba(37,99,235,0.12), 0 2px 8px rgba(37,99,235,0.06)",
                  }}
                >
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-muted mb-1.5">
                    <TrendingUp size={12} className="text-violet-500 shrink-0" />
                    Interview Ready
                  </div>
                  <p className="text-sm font-semibold text-ink">Score 9.2 / 10</p>
                </div>
              </FloatingCard>
            </motion.div>
          </ParallaxContainer>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {statData.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.08 }}
              className="glass stat-card rounded-xl p-4 text-center cursor-default"
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
