import { motion } from "framer-motion";
import {
  BarChart3, Target, Bot, Sparkles,
  CheckCircle2, TrendingUp, Zap, ArrowRight,
} from "lucide-react";
import Badge from "../ui/Badge";
import { useNavigate } from "react-router-dom";
import CountUp from "../ui/CountUp";

/* ─── Shared easing ─── */
const ease = [0.16, 1, 0.3, 1];

/* ─── Floating animation wrapper ─── */
function Float({ children, y = [-10, 0], duration = 6, delay = 0, className = "" }) {
  return (
    <motion.div
      animate={{ y }}
      transition={{ duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Appear wrapper ─── */
function Appear({ children, delay = 0, y = 20, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Glass card primitive used inside the mockup ─── */
function MockCard({ children, className = "", style = {}, accent = false }) {
  return (
    <div
      className={["relative rounded-[20px] overflow-hidden", className].join(" ")}
      style={{
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        border: "1px solid rgba(37,99,235,0.14)",
        boxShadow:
          "0 16px 48px rgba(37,99,235,0.12), 0 4px 8px rgba(37,99,235,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
        ...style,
      }}
    >
      {accent && (
        <div
          className="absolute inset-x-0 top-0 h-[2.5px]"
          style={{ background: "linear-gradient(90deg,#2563EB 0%,#6366F1 50%,#7C3AED 100%)" }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}

/* ─── Animated score ring (SVG) ─── */
function ScoreRing({ value = 92, size = 52, stroke = 5, color = "#22C55E" }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(37,99,235,0.08)" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={color} strokeWidth={stroke} fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease }}
        />
      </svg>
      <span
        className="absolute font-heading text-ink leading-none"
        style={{ fontSize: size * 0.25 }}
      >
        {value}
      </span>
    </div>
  );
}

/* ─── Mini animated progress bar ─── */
function MiniBar({ value, color = "bg-primary-500", delay = 0 }) {
  return (
    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────
   CARD 1 — Resume Analysis (main / center)
   ────────────────────────────────────────── */
function ResumeAnalysisCard() {
  return (
    <MockCard accent className="p-6 w-[320px] sm:w-[360px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-100 flex items-center justify-center">
            <BarChart3 size={16} className="text-primary-600" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink leading-tight">Resume Analysis</p>
            <p className="text-[10px] text-muted">AI-powered insights</p>
          </div>
        </div>
        <span className="brand-pill text-[10px]">
          <Sparkles size={11} /> Live
        </span>
      </div>

      {/* Score row */}
      <div className="flex items-center gap-5 mb-5">
        <ScoreRing value={92} size={64} stroke={6} color="#22C55E" />
        <div className="flex-1 space-y-2.5">
          {[
            { label: "Formatting",    val: 95, color: "bg-emerald-400" },
            { label: "Keywords",      val: 88, color: "bg-primary-500" },
            { label: "Impact",        val: 91, color: "bg-violet-500" },
          ].map((item, i) => (
            <div key={item.label}>
              <div className="flex justify-between mb-1">
                <span className="text-[10px] font-medium text-muted">{item.label}</span>
                <span className="text-[10px] font-semibold text-ink">{item.val}%</span>
              </div>
              <MiniBar value={item.val} color={item.color} delay={i * 0.12} />
            </div>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div className="pt-4 border-t border-slate-100">
        <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-2">Strengths</p>
        <div className="flex flex-wrap gap-1.5">
          <Badge tone="success" icon size="sm">React</Badge>
          <Badge tone="success" icon size="sm">Projects</Badge>
          <Badge tone="success" icon size="sm">Experience</Badge>
          <Badge tone="danger" icon size="sm">Docker</Badge>
        </div>
      </div>
    </MockCard>
  );
}

/* ──────────────────────────────────────────
   CARD 2 — ATS Match (top right)
   ────────────────────────────────────────── */
function ATSMatchCard() {
  return (
    <MockCard accent className="p-5 w-[256px]">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 flex items-center justify-center">
          <Target size={15} className="text-violet-600" strokeWidth={2} />
        </div>
        <div>
          <p className="text-sm font-semibold text-ink leading-tight">ATS Match</p>
          <p className="text-[10px] text-muted">vs. job description</p>
        </div>
      </div>

      {/* Big percentage */}
      <div className="flex items-end gap-2 mb-3">
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="font-heading text-4xl text-ink leading-none"
        >
          <CountUp from={0} to={94} suffix="%" duration={1.5} />
        </motion.span>
        <span className="text-xs text-emerald-600 font-semibold mb-1 flex items-center gap-1">
          <TrendingUp size={12} /> Job Match
        </span>
      </div>

      <div className="mb-4">
        <MiniBar value={94} color="bg-gradient-to-r from-violet-500 to-primary-500" />
      </div>

      <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-2">Matched Skills</p>
      <div className="flex flex-wrap gap-1.5">
        <Badge tone="violet" icon size="sm">JavaScript</Badge>
        <Badge tone="violet" icon size="sm">React</Badge>
        <Badge tone="violet" icon size="sm">Node</Badge>
      </div>
    </MockCard>
  );
}

/* ──────────────────────────────────────────
   CARD 3 — AI Coach (bottom left)
   ────────────────────────────────────────── */
function AICoachCard() {
  return (
    <MockCard accent className="p-5 w-[256px]">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 flex items-center justify-center">
          <Bot size={15} className="text-indigo-600" strokeWidth={2} />
        </div>
        <div>
          <p className="text-sm font-semibold text-ink leading-tight">AI Coach</p>
          <p className="text-[10px] text-muted flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Online
          </p>
        </div>
      </div>

      {/* Coach message */}
      <div className="glass-soft rounded-xl p-3.5 mb-3">
        <p className="text-xs text-body leading-relaxed">
          <span className="font-semibold text-primary-600">Your next improvement: </span>
          Learn Docker to unlock 40% more job matches in your target range.
        </p>
      </div>

      {/* CTA hint */}
      <div className="flex items-center gap-2 mt-3">
        <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-500"
            initial={{ width: 0 }}
            whileInView={{ width: "62%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          />
        </div>
        <span className="text-[10px] font-semibold text-muted">62% complete</span>
      </div>
    </MockCard>
  );
}

/* ──────────────────────────────────────────
   MAIN EXPORT
   ────────────────────────────────────────── */
export default function ShowcaseSection() {
  const navigate = useNavigate();

  return (
    <section
      id="showcase"
      className="relative px-6 py-24 overflow-hidden"
      style={{ background: "#F4F7FF" }}
    >
      {/* ── Background glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 -right-32 w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-40 -left-32 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="lg:grid lg:grid-cols-[1fr_1.25fr] lg:gap-16 xl:gap-20 items-center">

          {/* ─────────────────────────────
              LEFT — Text content
              ───────────────────────────── */}
          <div className="mb-16 lg:mb-0">

            {/* Pill */}
            <Appear delay={0}>
              <span className="brand-pill mb-5 inline-flex">
                <Sparkles size={13} />
                AI-Powered Career Tools
              </span>
            </Appear>

            {/* Heading */}
            <Appear delay={0.08}>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.1rem] leading-[1.08] tracking-tight text-ink mt-4">
                Everything you need{" "}
                <span className="font-heading-italic gradient-text-animated">
                  to build your career
                </span>
              </h2>
            </Appear>

            {/* Description */}
            <Appear delay={0.14}>
              <p className="mt-5 text-base sm:text-[1.05rem] text-muted leading-relaxed max-w-lg">
                From resume analysis to AI interview coaching, CareerAI gives you the tools
                and real-time insights to land your next role faster — all in one place.
              </p>
            </Appear>

            {/* Feature bullets */}
            <Appear delay={0.2}>
              <ul className="mt-7 space-y-3">
                {[
                  { icon: BarChart3, text: "Instant ATS score + line-by-line suggestions",   color: "text-primary-600",  bg: "bg-primary-50 border-primary-100" },
                  { icon: Target,    text: "Match any job description in seconds",            color: "text-violet-600",   bg: "bg-violet-50 border-violet-100" },
                  { icon: Bot,       text: "AI coach that adapts to your exact skill gaps",   color: "text-indigo-600",   bg: "bg-indigo-50 border-indigo-100" },
                  { icon: Zap,       text: "Week-by-week roadmap to close skill gaps fast",   color: "text-emerald-600",  bg: "bg-emerald-50 border-emerald-100" },
                ].map((item, i) => (
                  <motion.li
                    key={item.text}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.22 + i * 0.08, duration: 0.45, ease }}
                    className="flex items-center gap-3 text-sm text-body"
                  >
                    <span className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${item.bg}`}>
                      <item.icon size={14} className={item.color} strokeWidth={2} />
                    </span>
                    {item.text}
                  </motion.li>
                ))}
              </ul>
            </Appear>

            {/* Stats row */}
            <Appear delay={0.3}>
              <div className="flex flex-wrap gap-6 mt-9 pt-7 border-t border-slate-200/60">
                {[
                  { value: "50K+", label: "Resumes analyzed" },
                  { value: "94%",  label: "Interview success" },
                  { value: "2.4×", label: "More callbacks" },
                ].map((s) => (
                  <div key={s.label} className="text-center min-w-[72px]">
                    <span className="font-heading text-2xl text-ink">{s.value}</span>
                    <span className="block text-[11px] text-muted mt-0.5 font-medium">{s.label}</span>
                  </div>
                ))}
              </div>
            </Appear>

            {/* CTA */}
            <Appear delay={0.36}>
              <div className="flex flex-wrap gap-3 mt-8">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/register")}
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 60%, #7C3AED 100%)",
                    boxShadow: "0 8px 28px rgba(37,99,235,0.32)",
                  }}
                >
                  <Sparkles size={15} strokeWidth={2.2} />
                  Try it free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-1.5 rounded-xl px-6 py-3 text-sm font-semibold text-ink"
                  style={{
                    background: "rgba(255,255,255,0.80)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(37,99,235,0.16)",
                    boxShadow: "0 2px 12px rgba(37,99,235,0.06)",
                  }}
                >
                  See all features
                  <ArrowRight size={15} strokeWidth={2.2} />
                </motion.button>
              </div>
            </Appear>
          </div>

          {/* ─────────────────────────────
              RIGHT — Dashboard mockup
              ───────────────────────────── */}

          {/* DESKTOP layout */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: 0.15, ease }}
              className="relative h-[520px]"
            >
              {/* Center glow */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden="true"
              >
                <div
                  className="w-80 h-80 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, rgba(124,58,237,0.06) 50%, transparent 75%)",
                    filter: "blur(60px)",
                  }}
                />
              </div>

              {/* ── Card 1: Resume Analysis — center ── */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <Float y={[-12, 0]} duration={7} delay={0.2}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6, ease }}
                    whileHover={{ scale: 1.025 }}
                  >
                    <ResumeAnalysisCard />
                  </motion.div>
                </Float>
              </div>

              {/* ── Card 2: ATS Match — top right ── */}
              <div className="absolute top-4 right-0 z-20">
                <Float y={[-10, 2]} duration={8} delay={0.6}>
                  <motion.div
                    initial={{ opacity: 0, x: 20, y: -10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.55, ease }}
                    whileHover={{ scale: 1.025 }}
                  >
                    <ATSMatchCard />
                  </motion.div>
                </Float>
              </div>

              {/* ── Card 3: AI Coach — bottom left ── */}
              <div className="absolute bottom-4 left-0 z-20">
                <Float y={[0, -10]} duration={9} delay={1.0}>
                  <motion.div
                    initial={{ opacity: 0, x: -20, y: 10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.65, duration: 0.55, ease }}
                    whileHover={{ scale: 1.025 }}
                  >
                    <AICoachCard />
                  </motion.div>
                </Float>
              </div>

              {/* ── Floating micro-badges ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.4, ease }}
                className="absolute top-40 left-2 z-30"
              >
                <Float y={[-8, 4]} duration={5.5} delay={0.4}>
                  <div
                    className="rounded-full px-3.5 py-2 flex items-center gap-2"
                    style={{
                      background: "rgba(255,255,255,0.88)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(34,197,94,0.22)",
                      boxShadow: "0 4px 16px rgba(34,197,94,0.12)",
                    }}
                  >
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                    <span className="text-[11px] font-semibold text-ink">ATS Ready</span>
                  </div>
                </Float>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.05, duration: 0.4, ease }}
                className="absolute bottom-36 right-0 z-30"
              >
                <Float y={[4, -8]} duration={6} delay={1.2}>
                  <div
                    className="rounded-full px-3.5 py-2 flex items-center gap-2"
                    style={{
                      background: "rgba(255,255,255,0.88)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(37,99,235,0.22)",
                      boxShadow: "0 4px 16px rgba(37,99,235,0.12)",
                    }}
                  >
                    <Sparkles size={13} className="text-primary-500 shrink-0" />
                    <span className="text-[11px] font-semibold text-ink">AI Coaching</span>
                  </div>
                </Float>
              </motion.div>
            </motion.div>
          </div>

          {/* MOBILE layout — stacked cards */}
          <div className="lg:hidden space-y-4">
            {[
              { Component: ResumeAnalysisCard, delay: 0.1 },
              { Component: ATSMatchCard,       delay: 0.18 },
              { Component: AICoachCard,        delay: 0.26 },
            ].map(({ Component, delay }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay, duration: 0.5, ease }}
                className="w-full"
              >
                {/* Force full width on mobile by overriding fixed widths */}
                <div className="[&>div]:w-full [&>div]:max-w-full">
                  <Component />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
