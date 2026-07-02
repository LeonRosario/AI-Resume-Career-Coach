import { motion } from "framer-motion";
import { BarChart3, Target, Bot, Sparkles } from "lucide-react";
import StatCard from "../ui/StatCard";
import Badge from "../ui/Badge";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-48px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

function FloatingCard({ children, className = "", delay = 0, direction = "y" }) {
  const floatMap = {
    y: { y: [0, -10, 0] },
    xy: { x: [0, 6, 0], y: [0, -8, 0] },
    x: { x: [0, -8, 0] },
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <motion.div
        animate={floatMap[direction] || floatMap.y}
        transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
        whileHover={{ scale: 1.02 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function ShowcaseSection() {
  return (
    <section className="relative px-6 py-24 overflow-hidden bg-white">
      {/* Top divider */}
      <div className="section-divider max-w-6xl mx-auto mb-24" />

      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="lg:grid lg:grid-cols-[1fr,1.2fr] lg:gap-16 lg:items-center">

          {/* ─── LEFT: Text ─── */}
          <motion.div
            {...fadeUp}
            className="mb-12 lg:mb-0"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="brand-pill mb-6 inline-flex"
            >
              <Sparkles size={13} />
              AI-Powered Insights
            </motion.span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3rem] leading-[1.08] text-ink mt-4">
              Everything you need to build your career
            </h2>

            <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed max-w-lg">
              From resume analysis to interview prep, CareerAI gives you
              the tools and insights to land your next role faster.
            </p>

            {/* Trust stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6 mt-8"
            >
              {[
                { value: "50K+", label: "Resumes analyzed" },
                { value: "94%", label: "Interview success" },
                { value: "2.4x", label: "More callbacks" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <span className="font-heading text-xl sm:text-2xl text-ink">{s.value}</span>
                  <span className="block text-[11px] text-muted mt-0.5 font-medium">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── RIGHT: Dashboard Mockup ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ── Desktop layout ── */}
            <div className="hidden lg:block relative w-full h-[540px]">
              {/* Center glow behind cards */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden="true"
              >
                <div
                  className="w-[320px] h-[320px] rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
                    filter: "blur(50px)",
                  }}
                />
              </div>

              {/* Card 1: Resume Analysis - centered (main) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <FloatingCard delay={0.2} direction="y">
                  <StatCard
                    icon={BarChart3}
                    title="Resume Analysis"
                    value="92%"
                    label="Resume Score"
                    variant="strong"
                    accent
                    className="w-[340px]"
                  >
                    <div className="pt-1">
                      <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                        Strengths
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <Badge tone="brand" size="sm" icon>React</Badge>
                        <Badge tone="brand" size="sm" icon>Projects</Badge>
                        <Badge tone="brand" size="sm" icon>Experience</Badge>
                      </div>
                    </div>
                  </StatCard>
                </FloatingCard>
              </div>

              {/* Card 2: ATS Match - top right */}
              <div className="absolute top-8 right-4 z-20">
                <FloatingCard delay={0.6} direction="xy">
                  <StatCard
                    icon={Target}
                    title="ATS Match"
                    value="94%"
                    label="Job Match"
                    variant="default"
                    className="w-[280px]"
                  >
                    <div className="pt-1">
                      <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                        Matched Skills
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <Badge tone="violet" size="sm" icon>JavaScript</Badge>
                        <Badge tone="violet" size="sm" icon>React</Badge>
                        <Badge tone="violet" size="sm" icon>Node</Badge>
                      </div>
                    </div>
                  </StatCard>
                </FloatingCard>
              </div>

              {/* Card 3: AI Coach - bottom left */}
              <div className="absolute bottom-8 left-4 z-20">
                <FloatingCard delay={1.0} direction="x">
                  <div
                    className="glass-strong rounded-[24px] p-5 w-[280px] relative overflow-hidden"
                    style={{
                      boxShadow: "0 16px 56px rgba(37,99,235,0.12), 0 4px 8px rgba(37,99,235,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
                    }}
                  >
                    {/* Accent */}
                    <div
                      className="absolute inset-x-0 top-0 h-[2px]"
                      style={{ background: "linear-gradient(90deg, #2563EB 0%, #6366F1 50%, #7C3AED 100%)" }}
                      aria-hidden="true"
                    />
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 flex items-center justify-center shrink-0">
                        <Bot size={17} className="text-violet-600" strokeWidth={2} />
                      </div>
                      <span className="text-sm font-semibold text-ink">AI Coach</span>
                    </div>
                    <div className="relative pl-5 border-l-2 border-primary-200/60">
                      <p className="text-sm text-body leading-relaxed">
                        <span className="text-primary-600 font-semibold">Your next improvement:</span>{" "}
                        Learn Docker
                      </p>
                    </div>
                  </div>
                </FloatingCard>
              </div>
            </div>

            {/* ── Mobile layout ── */}
            <div className="lg:hidden space-y-5">
              <StatCard
                icon={BarChart3}
                title="Resume Analysis"
                value="92%"
                label="Resume Score"
                variant="strong"
                accent
              >
                <div className="pt-1">
                  <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                    Strengths
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <Badge tone="brand" size="sm" icon>React</Badge>
                    <Badge tone="brand" size="sm" icon>Projects</Badge>
                    <Badge tone="brand" size="sm" icon>Experience</Badge>
                  </div>
                </div>
              </StatCard>

              <StatCard
                icon={Target}
                title="ATS Match"
                value="94%"
                label="Job Match"
                variant="default"
              >
                <div className="pt-1">
                  <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                    Matched Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <Badge tone="violet" size="sm" icon>JavaScript</Badge>
                    <Badge tone="violet" size="sm" icon>React</Badge>
                    <Badge tone="violet" size="sm" icon>Node</Badge>
                  </div>
                </div>
              </StatCard>

              <div
                className="glass-strong rounded-[24px] p-5 sm:p-6 relative overflow-hidden"
                style={{
                  boxShadow: "0 16px 56px rgba(37,99,235,0.12), 0 4px 8px rgba(37,99,235,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-[2px]"
                  style={{ background: "linear-gradient(90deg, #2563EB 0%, #6366F1 50%, #7C3AED 100%)" }}
                  aria-hidden="true"
                />
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 flex items-center justify-center shrink-0">
                    <Bot size={17} className="text-violet-600" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-semibold text-ink">AI Coach</span>
                </div>
                <div className="relative pl-5 border-l-2 border-primary-200/60">
                  <p className="text-sm text-body leading-relaxed">
                    <span className="text-primary-600 font-semibold">Your next improvement:</span>{" "}
                    Learn Docker
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
