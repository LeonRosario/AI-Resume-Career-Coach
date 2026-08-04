import { motion } from "framer-motion";
import {
  Sparkles, Shield, Target, Zap, FileText,
  CheckCircle2, Briefcase, TrendingUp, BookOpen,
  ChevronRight, Clock, Lightbulb, GraduationCap,
  BarChart3, Users, Award,
} from "lucide-react";
import ContainerScrollAnimation from "../ui/container-scroll-animation";
import Badge from "../ui/Badge";
import ProgressBar from "../ui/ProgressBar";
import ScoreRing from "../ui/ScoreRing";

const resumeSkills = ["AI Strategy", "UX Design", "Product Ops", "Leadership", "Data Analysis"];
const resumeExp = [
  { title: "Lead Product Designer", company: "Nexa Labs", date: "2024–Now", desc: "Leading AI-powered product design initiatives across the platform." },
  { title: "Senior UX Consultant", company: "Pulse AI", date: "2022–2024", desc: "Redesigned core user experience, improving retention by 34%." },
];

const currentSkills = ["AI Strategy", "UX Research", "Product Design", "Design Systems", "Data Analysis", "Prototyping"];
const missingSkills = ["Cloud Architecture", "Agile Leadership", "ML Fundamentals", "Technical Writing"];

const analysisItems = [
  { label: "Formatting", value: 82, color: "brand" },
  { label: "Keyword Match", value: 68, color: "amber" },
  { label: "Impact Statements", value: 75, color: "violet" },
  { label: "ATS Compatibility", value: 92, color: "green" },
];

const activities = [
  { text: "Resume analyzed successfully", time: "Just now", color: "bg-primary-500" },
  { text: "ATS score updated — 92/100", time: "Just now", color: "bg-emerald-500" },
  { text: "Skill gaps identified — 4 items", time: "Just now", color: "bg-violet-500" },
  { text: "AI interview prep session ready", time: "2h ago", color: "bg-amber-500" },
];

const roadmapSteps = [
  { step: 1, title: "Optimize Resume", desc: "Improve ATS keywords and impact statements", done: true },
  { step: 2, title: "Fill Skill Gaps", desc: "Complete missing skills with guided learning", done: false },
  { step: 3, title: "AI Interview Prep", desc: "Practice with AI mock interviews", done: false },
  { step: 4, title: "Job Match & Apply", desc: "Get matched to best-fit roles", done: false },
];

const statCards = [
  { icon: FileText, label: "Resume Score", value: "82/100", sub: "Good — room for improvement", color: "from-primary-500 to-blue-600" },
  { icon: Briefcase, label: "Job Match", value: "86%", sub: "Senior Product Designer", color: "from-green-500 to-emerald-600" },
  { icon: Users, label: "Interview Readiness", value: "9.2", sub: "Excellent — well prepared", color: "from-violet-500 to-purple-600" },
  { icon: TrendingUp, label: "Skill Coverage", value: "6/10", sub: "4 gaps identified", color: "from-amber-500 to-orange-600" },
];

export default function DashboardShowcase() {
  return (
    <ContainerScrollAnimation
      title="AI Resume Builder"
      subtitle="Build ATS-Friendly Resumes That Recruiters Love"
      description="Create professional resumes, improve ATS scores, identify missing skills, receive AI-powered recommendations, and land more interviews—all in one intelligent platform."
    >
      <div
        className="relative overflow-hidden rounded-[24px] md:rounded-[28px]"
        style={{
          background: "rgba(255,255,255,0.82)",
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
          style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(37,99,235,0.05) 0%, transparent 65%)" }}
          aria-hidden="true"
        />

        {/* ── Dashboard Top Bar ── */}
        <div className="relative flex items-center justify-between px-5 py-3 md:px-7 md:py-4 border-b border-primary-100/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 60%, #7C3AED 100%)" }}>
              <Sparkles size={15} className="text-white" />
            </div>
            <span className="font-heading text-lg text-ink hidden sm:block">
              Career<span style={{ color: "#2563EB" }}>AI</span>
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-semibold text-emerald-700 bg-emerald-50/80 border border-emerald-200/60 px-2.5 py-1.5 rounded-full">
              <Shield size={11} className="shrink-0" />
              <span className="hidden sm:inline">ATS</span> 92
            </div>
            <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-semibold text-primary-700 bg-primary-50/80 border border-primary-200/60 px-2.5 py-1.5 rounded-full">
              <Target size={11} className="shrink-0" />
              <span className="hidden sm:inline">Match</span> 86%
            </div>
            <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-semibold text-violet-700 bg-violet-50/80 border border-violet-200/60 px-2.5 py-1.5 rounded-full">
              <Zap size={11} className="shrink-0" />
              <span className="hidden sm:inline">Ready</span> 9.2
            </div>
            <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-semibold text-amber-700 bg-amber-50/80 border border-amber-200/60 px-2.5 py-1.5 rounded-full">
              <Award size={11} className="shrink-0" />
              <span className="hidden sm:inline">Gaps</span> 4
            </div>
          </div>
        </div>

        {/* ── Dashboard Body ── */}
        <div className="relative p-4 md:p-6 lg:p-7">
          {/* Analytics Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
            {statCards.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl p-3.5 md:p-4"
                style={{
                  background: "rgba(248,250,255,0.8)",
                  border: "1px solid rgba(37,99,235,0.08)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shrink-0`}>
                    <stat.icon size={13} className="text-white" strokeWidth={2.2} />
                  </div>
                  <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">{stat.label}</span>
                </div>
                <p className="font-heading text-xl md:text-2xl text-ink">{stat.value}</p>
                <p className="text-[11px] text-muted/80 mt-0.5 truncate">{stat.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Main Two-Column Layout */}
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-5 md:gap-6">
            {/* ── Left: Resume Preview ── */}
            <ResumePreviewSection />

            {/* ── Right: Scores + Analysis ── */}
            <div className="space-y-4 md:space-y-5">
              <ScoreSection />
              <SkillAnalysisSection />
            </div>
          </div>

          {/* Bottom: Activity + Roadmap */}
          <div className="grid md:grid-cols-2 gap-5 md:gap-6 mt-5 md:mt-6">
            <RecentActivitySection />
            <RoadmapSection />
          </div>
        </div>

        {/* ── Bottom branding bar ── */}
        <div
          className="px-5 md:px-7 py-3 border-t border-primary-100/30 flex items-center justify-between text-[11px] text-muted"
          style={{ background: "rgba(248,250,255,0.5)" }}
        >
          <span className="flex items-center gap-1.5">
            <Sparkles size={12} className="text-primary-500" />
            AI-powered analysis · Updated just now
          </span>
          <span className="hidden sm:flex items-center gap-1.5 font-medium text-primary-600">
            View full dashboard <ChevronRight size={12} />
          </span>
        </div>
      </div>
    </ContainerScrollAnimation>
  );
}

/* ── Resume Preview ── */
function ResumePreviewSection() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl p-4 md:p-5"
      style={{
        background: "rgba(255,255,255,0.7)",
        border: "1px solid rgba(37,99,235,0.1)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
        <span className="text-[9px] uppercase tracking-[0.28em] text-placeholder font-semibold flex items-center gap-1.5">
          <FileText size={12} />
          Resume Preview
        </span>
      </div>

      <div className="mb-3">
        <p className="text-[9px] uppercase tracking-[0.28em] font-semibold text-primary-600 mb-0.5">
          CareerAI Resume
        </p>
        <h3 className="font-heading text-xl md:text-2xl text-ink leading-tight">Jordan Ellis</h3>
        <p className="text-xs md:text-sm text-muted mt-0.5">Senior Product Designer</p>
        <p className="text-[11px] text-muted/70 mt-0.5">jordan.ellis@email.com · San Francisco, CA</p>
      </div>

      <div className="mb-4">
        <p className="text-[9px] uppercase tracking-[0.24em] font-semibold text-placeholder mb-1.5">
          Professional Summary
        </p>
        <p className="text-[11px] md:text-xs text-body/80 leading-relaxed">
          Design leader with 8+ years of experience shaping AI-powered products.
          Proven track record of driving user engagement and leading cross-functional
          teams to deliver impactful design solutions.
        </p>
      </div>

      <div className="mb-3">
        <p className="text-[9px] uppercase tracking-[0.24em] font-semibold text-placeholder mb-2">
          Experience
        </p>
        <div className="space-y-2.5">
          {resumeExp.map((item) => (
            <div
              key={item.title}
              className="rounded-xl p-3"
              style={{ background: "rgba(248,250,255,0.8)", border: "1px solid rgba(37,99,235,0.06)" }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs md:text-sm font-semibold text-ink">{item.title}</p>
                  <p className="text-[11px] text-muted">{item.company}</p>
                </div>
                <span className="text-[9px] tracking-wide text-placeholder whitespace-nowrap">{item.date}</span>
              </div>
              <p className="text-[11px] text-body/70 mt-1.5 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[9px] uppercase tracking-[0.24em] font-semibold text-placeholder mb-2">
          Skills
        </p>
        <div className="flex flex-wrap gap-1.5">
          {resumeSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full px-2.5 py-1 text-[10px] font-medium"
              style={{
                background: "rgba(239,246,255,0.8)",
                border: "1px solid rgba(37,99,235,0.14)",
                color: "#2563EB",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Score Ring Section ── */
function ScoreSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl p-4 md:p-5 flex items-center gap-4 md:gap-5"
      style={{
        background: "rgba(255,255,255,0.7)",
        border: "1px solid rgba(37,99,235,0.1)",
      }}
    >
      <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.24em] font-semibold text-placeholder absolute top-3 left-4">
        <Shield size={11} />
        ATS Score
      </div>
      <div className="flex items-center gap-4 md:gap-6 w-full pt-5">
        <ScoreRing value={92} size={80} stroke={7} label="" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <Badge tone="success" size="sm">Excellent</Badge>
            <span className="text-xs text-muted">92/100</span>
          </div>
          <p className="text-[11px] text-muted/80 leading-relaxed">
            Your resume is well-optimized for ATS systems. A few keyword improvements could push you to 95+.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Lightbulb size={12} className="text-amber-500 shrink-0" />
            <span className="text-[10px] text-amber-700 font-medium">Add 3 missing keywords to improve</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Skill Analysis Section ── */
function SkillAnalysisSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl p-4 md:p-5"
      style={{
        background: "rgba(255,255,255,0.7)",
        border: "1px solid rgba(37,99,235,0.1)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[9px] uppercase tracking-[0.24em] font-semibold text-placeholder flex items-center gap-1.5">
          <BarChart3 size={11} />
          Resume Score
        </span>
        <span className="text-[9px] uppercase tracking-[0.24em] font-semibold text-placeholder flex items-center gap-1.5">
          <Target size={11} />
          Skill Analysis
        </span>
      </div>

      <div className="space-y-2.5 mb-4">
        {analysisItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 0.35 + i * 0.06, duration: 0.4 }}
          >
            <ProgressBar
              label={item.label}
              value={item.value}
              size="sm"
              color={item.color}
              delay={0}
            />
          </motion.div>
        ))}
      </div>

      <div className="pt-3 border-t border-primary-100/30">
        <div className="flex items-center gap-1.5 mb-2.5">
          <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
          <span className="text-[11px] font-semibold text-ink">Current Skills</span>
          <span className="text-[10px] text-muted ml-auto">{currentSkills.length}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {currentSkills.map((skill) => (
            <Badge key={skill} tone="success" icon size="sm">{skill}</Badge>
          ))}
        </div>

        <div className="flex items-center gap-1.5 mb-2.5">
          <Zap size={12} className="text-amber-500 shrink-0" />
          <span className="text-[11px] font-semibold text-ink">Missing Skills</span>
          <span className="text-[10px] text-muted ml-auto">{missingSkills.length}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {missingSkills.map((skill) => (
            <Badge key={skill} tone="warning" size="sm">{skill}</Badge>
          ))}
        </div>

        <div className="mt-3 rounded-xl p-2.5 flex items-center gap-2" style={{ background: "rgba(239,246,255,0.6)", border: "1px solid rgba(37,99,235,0.08)" }}>
          <GraduationCap size={14} className="text-primary-600 shrink-0" />
          <span className="text-[10px] text-primary-700 font-medium">
            AI recommends focusing on Cloud Architecture and Agile Leadership
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Recent Activity ── */
function RecentActivitySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl p-4 md:p-5"
      style={{
        background: "rgba(255,255,255,0.7)",
        border: "1px solid rgba(37,99,235,0.1)",
      }}
    >
      <div className="flex items-center gap-1.5 mb-3">
        <Clock size={13} className="text-muted" />
        <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-placeholder">
          Recent Activity
        </span>
      </div>
      <div className="space-y-3">
        {activities.map((item, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className={`w-1.5 h-1.5 rounded-full ${item.color} mt-1.5 shrink-0`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-body leading-snug">{item.text}</p>
              <p className="text-[10px] text-muted/70 mt-0.5">{item.time}</p>
            </div>
            <CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-1" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── AI Career Roadmap ── */
function RoadmapSection() {
  const doneCount = roadmapSteps.filter((s) => s.done).length;
  const totalSteps = roadmapSteps.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl p-4 md:p-5"
      style={{
        background: "rgba(255,255,255,0.7)",
        border: "1px solid rgba(37,99,235,0.1)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <BookOpen size={13} className="text-muted" />
          <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-placeholder">
            AI Career Roadmap
          </span>
        </div>
        <Badge tone="brand" size="sm">{doneCount}/{totalSteps} done</Badge>
      </div>

      <ProgressBar
        completed={doneCount}
        total={totalSteps}
        label="Progress"
        size="sm"
        showValue
        delay={0}
      />

      <div className="mt-3 space-y-1.5">
        {roadmapSteps.map((step) => (
          <div
            key={step.step}
            className="flex items-center gap-2.5 rounded-xl p-2.5"
            style={{
              background: step.done ? "rgba(239,246,255,0.6)" : "transparent",
              border: step.done ? "1px solid rgba(37,99,235,0.1)" : "1px solid transparent",
            }}
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                step.done ? "bg-emerald-500" : "bg-primary-100"
              }`}
            >
              {step.done ? (
                <CheckCircle2 size={12} className="text-white" />
              ) : (
                <span className="text-[9px] font-bold text-primary-500">{step.step}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-semibold ${step.done ? "text-ink" : "text-muted"}`}>
                {step.title}
              </p>
              <p className="text-[10px] text-muted/70 truncate">{step.desc}</p>
            </div>
            <ChevronRight size={12} className="text-muted/40 shrink-0" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
