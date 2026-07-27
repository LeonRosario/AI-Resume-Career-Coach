import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  BarChart3,
  Briefcase,
  MessageSquare,
  Target,
  Zap,
  ChevronRight,
  TrendingUp,
  Award,
  Mic,
  Star,
  User,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const P = {
  primary: "#4F8CFF",
  accent: "#6BA8FF",
  ink: "#0A0F1E",
  muted: "#5B6B82",
};

const card = {
  background: "rgba(255,255,255,0.96)",
  border: "1px solid rgba(79,140,255,0.12)",
  boxShadow:
    "0 32px 80px rgba(79,140,255,0.12), 0 8px 16px rgba(79,140,255,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
};

const badge = {
  background: "rgba(255,255,255,0.96)",
  border: "1px solid rgba(79,140,255,0.16)",
  boxShadow:
    "0 8px 28px rgba(79,140,255,0.1), 0 2px 8px rgba(79,140,255,0.05)",
};

const pill = {
  background: "rgba(79,140,255,0.08)",
  border: "1px solid rgba(79,140,255,0.15)",
  color: P.primary,
};

function FloatBadge({ children, className = "", float = false }) {
  return <div className={`${float ? "animate-float-slow" : "animate-float-md"} ${className}`}>{children}</div>;
}

function Dots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-red-400" />
      <span className="w-2 h-2 rounded-full bg-amber-400" />
      <span className="w-2 h-2 rounded-full bg-emerald-400" />
    </div>
  );
}

function CardHeader({ label }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <span
        className="text-[10px] uppercase tracking-[0.28em] font-semibold"
        style={{ color: P.primary }}
      >
        {label}
      </span>
      <Dots />
    </div>
  );
}

function StoryProgress({ activeStep, total }: { activeStep: number; total: number }) {
  return (
    <div className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 lg:flex">
      <div className="flex flex-col items-center gap-3 rounded-full border border-white/70 bg-white/80 px-2.5 py-3 shadow-[0_12px_40px_rgba(79,140,255,0.12)] backdrop-blur-xl">
        {Array.from({ length: total }).map((_, index) => {
          const isActive = index === activeStep;
          return (
            <div
              key={index}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                isActive ? "scale-125 bg-[color:var(--blue-600)]" : "bg-slate-200"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

function ResumeCard() {
  return (
    <div className="relative w-full max-w-[480px]">
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(79,140,255,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />
      <div
        data-visual
        className="relative overflow-hidden rounded-[28px]"
        style={card}
      >
        <div
          className="absolute inset-x-0 top-0 h-[2.5px]"
          style={{
            background: `linear-gradient(90deg, ${P.primary}, ${P.accent}, ${P.primary})`,
          }}
          aria-hidden="true"
        />
        <div className="relative p-6 sm:p-8">
          <CardHeader label="AI Resume Preview" />
          <div className="mb-4">
            <h3 className="font-heading text-xl" style={{ color: P.ink }}>
              Alex Chen
            </h3>
            <p className="text-sm" style={{ color: P.muted }}>
              Senior Product Designer
            </p>
          </div>
          <div
            className="rounded-2xl p-4 mb-4"
            style={{
              background: "rgba(248,250,255,0.8)",
              border: "1px solid rgba(79,140,255,0.1)",
            }}
          >
            <div className="flex flex-wrap gap-2">
              {["AI Strategy", "UX Design", "Product Ops", "Leadership"].map(
                (s) => (
                  <span
                    key={s}
                    className="rounded-full px-3 py-1 text-[11px] font-medium"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      border: "1px solid rgba(79,140,255,0.16)",
                      color: P.primary,
                    }}
                  >
                    {s}
                  </span>
                )
              )}
            </div>
          </div>
          <div className="space-y-2">
            <p
              className="text-[10px] uppercase tracking-[0.24em] font-medium"
              style={{ color: P.muted }}
            >
              Experience
            </p>
            {[
              { title: "Lead Product Designer", co: "Nexa Labs", date: "2024–Now" },
              { title: "Senior UX Consultant", co: "Pulse AI", date: "2022–2024" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-3.5"
                style={{
                  background: "rgba(248,250,255,0.8)",
                  border: "1px solid rgba(79,140,255,0.06)",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: P.ink }}>
                      {item.title}
                    </p>
                    <p className="text-xs" style={{ color: P.muted }}>
                      {item.co}
                    </p>
                  </div>
                  <span
                    className="text-[10px] tracking-wide whitespace-nowrap"
                    style={{ color: P.muted }}
                  >
                    {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FloatBadge className="absolute -top-4 -left-4 hidden md:block" float>
        <div className="rounded-2xl px-4 py-3 min-w-[150px]" style={badge}>
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] mb-1.5" style={{ color: P.muted }}>
            <ShieldCheck size={12} style={{ color: P.primary }} />
            ATS Score
          </div>
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9">
              <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14.5" fill="none" stroke="rgba(79,140,255,0.1)" strokeWidth="3" />
                <circle cx="18" cy="18" r="14.5" fill="none" stroke={P.primary} strokeWidth="3" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 14.5}`} strokeDashoffset={2 * Math.PI * 14.5 * 0.08} />
              </svg>
            </div>
            <span className="text-lg font-bold" style={{ color: P.ink }}>
              92<span className="text-xs font-medium" style={{ color: P.muted }}>/100</span>
            </span>
          </div>
        </div>
      </FloatBadge>
      <FloatBadge className="absolute -bottom-3 -right-3 hidden md:block" float>
        <div className="rounded-2xl px-4 py-3 min-w-[150px]" style={badge}>
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] mb-1.5" style={{ color: P.muted }}>
            <Award size={12} className="text-emerald-500" />
            Job Match
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-lg font-bold" style={{ color: P.ink }}>
              87%
            </span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(79,140,255,0.08)" }}>
              <div className="h-full rounded-full" style={{ width: "87%", background: "linear-gradient(90deg, #22C55E, #16A34A)" }} />
            </div>
          </div>
        </div>
      </FloatBadge>
      <FloatBadge className="absolute -top-2 -right-2 hidden lg:block">
        <div className="rounded-2xl px-4 py-3" style={badge}>
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] mb-1" style={{ color: P.muted }}>
            <Zap size={12} className="text-amber-500" />
            AI Optimized
          </div>
          <p className="text-xs font-semibold" style={{ color: P.ink }}>
            3 improvements found
          </p>
        </div>
      </FloatBadge>
    </div>
  );
}

function EditorVisual() {
  const tabs = ["Experience", "Education", "Skills", "Projects"];
  return (
    <div data-visual className="relative w-full max-w-[480px] overflow-hidden rounded-[28px]" style={card}>
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${P.primary}, ${P.accent}, ${P.primary})` }}
        aria-hidden="true"
      />
      <div className="p-5 sm:p-6">
        <CardHeader label="Resume Editor" />
        <div className="grid grid-cols-[1fr,2fr] gap-3">
          <div className="space-y-2">
            {tabs.map((t, i) => (
              <div
                key={t}
                className="rounded-lg px-3 py-2 text-xs font-medium"
                style={{
                  background: i === 0 ? "rgba(79,140,255,0.12)" : "rgba(79,140,255,0.04)",
                  border: `1px solid rgba(79,140,255,${i === 0 ? 0.2 : 0.08})`,
                  color: i === 0 ? P.primary : P.muted,
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div
            className="rounded-xl p-3"
            style={{
              background: "rgba(248,250,255,0.8)",
              border: "1px solid rgba(79,140,255,0.08)",
            }}
          >
            <div className="space-y-3">
              <div>
                <div className="h-2.5 rounded-full w-3/4 mb-2" style={{ background: "rgba(79,140,255,0.14)" }} />
                <div className="h-2 rounded-full w-1/2 mb-1.5" style={{ background: "rgba(79,140,255,0.08)" }} />
                <div className="h-2 rounded-full w-5/6" style={{ background: "rgba(79,140,255,0.08)" }} />
              </div>
              <div className="h-px" style={{ background: "rgba(79,140,255,0.06)" }} />
              <div>
                <div className="h-2.5 rounded-full w-2/3 mb-2" style={{ background: "rgba(79,140,255,0.14)" }} />
                <div className="h-2 rounded-full w-4/5" style={{ background: "rgba(79,140,255,0.08)" }} />
              </div>
            </div>
          </div>
        </div>
        <FloatBadge className="absolute -bottom-2 -right-2 hidden sm:block">
          <div className="rounded-xl px-4 py-3" style={{ ...badge, boxShadow: "0 8px 24px rgba(79,140,255,0.15), 0 2px 6px rgba(79,140,255,0.08)" }}>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider mb-1" style={{ color: P.muted }}>
              <Sparkles size={11} style={{ color: P.primary }} />
              AI Suggestion
            </div>
            <p className="text-xs font-medium" style={{ color: P.ink }}>
              Add action verbs for impact
            </p>
          </div>
        </FloatBadge>
      </div>
    </div>
  );
}

function GaugeVisual() {
  const R = 58;
  const C = 2 * Math.PI * R;
  const score = 87;
  const bars = [
    { label: "Formatting", val: 92, color: P.primary },
    { label: "Keywords", val: 78, color: "#6BA8FF" },
    { label: "Readability", val: 85, color: "#818CF8" },
    { label: "Compatibility", val: 94, color: "#22C55E" },
  ];
  const keywords = ["React", "TypeScript", "Node.js", "AWS", "Leadership"];

  return (
    <div data-visual className="relative w-full max-w-[480px] overflow-hidden rounded-[28px] p-6 sm:p-8" style={card}>
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${P.primary}, ${P.accent}, ${P.primary})` }}
        aria-hidden="true"
      />
      <CardHeader label="ATS Analysis" />
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-36 h-36 mb-3">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(79,140,255,0.08)" strokeWidth="8" />
            <circle cx="70" cy="70" r={R} fill="none" stroke={P.primary} strokeWidth="8" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - score / 100)} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading text-3xl" style={{ color: P.ink }}>
              {score}
              <span className="text-sm font-medium" style={{ color: P.muted }}>/100</span>
            </span>
          </div>
        </div>
        <p className="text-xs font-medium" style={{ color: P.muted }}>
          Overall ATS Score
        </p>
      </div>
      <div className="space-y-3">
        {bars.map((b) => (
          <div key={b.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium" style={{ color: P.ink }}>
                {b.label}
              </span>
              <span className="text-xs font-semibold" style={{ color: b.color }}>
                {b.val}%
              </span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "rgba(79,140,255,0.06)" }}>
              <div className="h-full rounded-full" style={{ width: `${b.val}%`, background: b.color }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {keywords.map((kw) => (
          <span
            key={kw}
            className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
            style={{
              background: "rgba(79,140,255,0.06)",
              border: "1px solid rgba(79,140,255,0.12)",
              color: P.primary,
            }}
          >
            ✓ {kw}
          </span>
        ))}
      </div>
    </div>
  );
}

function MatchVisual() {
  return (
    <div data-visual className="relative w-full max-w-[480px] overflow-hidden rounded-[28px] p-6 sm:p-8" style={card}>
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, #22C55E, #4F8CFF, #22C55E)" }}
        aria-hidden="true"
      />
      <CardHeader label="Job Match" />
      <div
        className="rounded-2xl p-5 mb-4 text-center"
        style={{
          background: "rgba(34,197,94,0.04)",
          border: "1px solid rgba(34,197,94,0.12)",
        }}
      >
        <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-2" style={{ color: P.muted }}>
          Compatibility Score
        </p>
        <p className="font-heading text-4xl" style={{ color: P.ink }}>
          86<span className="text-lg font-semibold text-emerald-500">%</span>
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <CheckCircle2 size={13} className="text-emerald-500" />
          <span className="text-xs font-medium text-emerald-600">Strong Match</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div
          className="rounded-xl p-3"
          style={{
            background: "rgba(34,197,94,0.04)",
            border: "1px solid rgba(34,197,94,0.1)",
          }}
        >
          <p className="text-[10px] uppercase tracking-wider font-semibold mb-2 text-emerald-600">
            Your Skills
          </p>
          {["React", "TypeScript", "Node.js"].map((s) => (
            <div key={s} className="flex items-center gap-1.5 mb-1 last:mb-0">
              <CheckCircle2 size={11} className="text-emerald-500" />
              <span className="text-xs font-medium" style={{ color: P.ink }}>
                {s}
              </span>
            </div>
          ))}
        </div>
        <div
          className="rounded-xl p-3"
          style={{
            background: "rgba(245,158,11,0.04)",
            border: "1px solid rgba(245,158,11,0.1)",
          }}
        >
          <p className="text-[10px] uppercase tracking-wider font-semibold mb-2 text-amber-600">
            Missing
          </p>
          {["Docker", "GraphQL", "CI/CD"].map((s) => (
            <div key={s} className="flex items-center gap-1.5 mb-1 last:mb-0">
              <Target size={11} className="text-amber-500" />
              <span className="text-xs font-medium" style={{ color: P.ink }}>
                {s}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        className="rounded-xl p-3 flex items-start gap-3"
        style={{
          background: "rgba(79,140,255,0.04)",
          border: "1px solid rgba(79,140,255,0.1)",
        }}
      >
        <div
          className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(79,140,255,0.1)" }}
        >
          <Sparkles size={14} style={{ color: P.primary }} />
        </div>
        <div>
          <p className="text-xs font-semibold mb-0.5" style={{ color: P.ink }}>
            AI Recommendation
          </p>
          <p className="text-[11px] leading-relaxed" style={{ color: P.muted }}>
            Add Docker and CI/CD experience to boost match score to 94%.
          </p>
        </div>
      </div>
    </div>
  );
}

function InterviewVisual() {
  const wave = [40, 70, 55, 85, 45, 90, 60, 75, 50, 80, 65, 70, 40, 55, 85, 70];

  return (
    <div
      data-visual
      className="relative w-full max-w-[480px] overflow-hidden rounded-[28px] p-6 sm:p-8"
      style={card}
    >
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${P.primary}, #818CF8, ${P.primary})` }}
        aria-hidden="true"
      />
      <CardHeader label="Interview Coach" />
      <div className="space-y-3 mb-4">
        <div className="flex gap-2.5">
          <div
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "rgba(79,140,255,0.1)" }}
          >
            <Sparkles size={14} style={{ color: P.primary }} />
          </div>
          <div
            className="rounded-2xl rounded-tl-md px-4 py-2.5 max-w-[85%]"
            style={{
              background: "rgba(248,250,255,0.9)",
              border: "1px solid rgba(79,140,255,0.08)",
            }}
          >
            <p className="text-xs leading-relaxed" style={{ color: P.ink }}>
              Tell me about a time you led a cross-functional team to ship a product under a tight deadline.
            </p>
          </div>
        </div>
        <div className="flex gap-2.5 justify-end">
          <div
            className="rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[85%]"
            style={{ background: `linear-gradient(135deg, ${P.primary} 0%, #2563EB 100%)` }}
          >
            <p className="text-xs text-white leading-relaxed">
              At Nexa Labs, I coordinated a team of 8 across design, engineering, and QA to launch our dashboard redesign 2 weeks ahead of schedule…
            </p>
          </div>
          <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-indigo-100">
            <User size={14} className="text-indigo-600" />
          </div>
        </div>
      </div>
      <div
        className="rounded-xl p-3 mb-4 flex items-center gap-3"
        style={{
          background: "rgba(248,250,255,0.8)",
          border: "1px solid rgba(79,140,255,0.08)",
        }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "rgba(79,140,255,0.1)" }}
        >
          <Mic size={14} style={{ color: P.primary }} />
        </div>
        <div className="flex items-end gap-[3px] h-5">
          {wave.map((h, i) => (
            <div
              key={i}
              className="w-[3px] rounded-full"
              style={{
                height: `${h}%`,
                background: P.primary,
                opacity: 0.35 + (h / 100) * 0.65,
              }}
            />
          ))}
        </div>
        <span className="text-[10px] font-medium ml-auto" style={{ color: P.muted }}>
          0:42
        </span>
      </div>
      <div
        className="rounded-xl p-3"
        style={{
          background: "rgba(34,197,94,0.04)",
          border: "1px solid rgba(34,197,94,0.1)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Star size={12} className="text-amber-500 fill-amber-500" />
            <span className="text-xs font-semibold" style={{ color: P.ink }}>
              AI Feedback
            </span>
          </div>
          <span className="text-sm font-bold" style={{ color: "#22C55E" }}>
            9.2/10
          </span>
        </div>
        <p className="text-[11px] leading-relaxed" style={{ color: P.muted }}>
          Excellent STAR method usage. Strong metrics. Consider mentioning stakeholder management.
        </p>
      </div>
    </div>
  );
}

function FeatureGrid() {
  const items = [
    { icon: FileText, label: "Resume Builder" },
    { icon: ShieldCheck, label: "ATS Checker" },
    { icon: Zap, label: "AI Resume Rewrite" },
    { icon: Briefcase, label: "Job Match" },
    { icon: FileText, label: "Cover Letter" },
    { icon: BarChart3, label: "Skill Gap Analysis" },
    { icon: MessageSquare, label: "Interview Coach" },
    { icon: TrendingUp, label: "Career Roadmap" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {items.map((f) => (
        <div
          key={f.label}
          data-visual
          className="rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1"
          style={{
            background: "rgba(248,250,255,0.8)",
            border: "1px solid rgba(79,140,255,0.1)",
          }}
        >
          <div
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3"
            style={{ background: "rgba(79,140,255,0.1)", color: P.primary }}
          >
            <f.icon size={20} strokeWidth={1.8} />
          </div>
          <p className="text-sm font-semibold" style={{ color: P.ink }}>
            {f.label}
          </p>
        </div>
      ))}
    </div>
  );
}

const sections = [
  {
    id: "hero",
    badge: "AI Resume Platform",
    heading: ["Land your next role.", "With confidence."],
    desc: "Create an ATS-friendly resume in minutes using AI-powered suggestions, professional templates, and recruiter-approved formatting.",
    bg: "bg-white",
    Visual: ResumeCard,
    hasBadgeIcon: true,
    showCta: true,
  },
  {
    id: "build",
    badge: "STEP 01",
    heading: ["Build a Resume", "that recruiters notice."],
    desc: "Generate a professional resume using AI. Choose modern templates. Import existing resumes. Export as ATS-friendly PDF.",
    bg: "bg-[#F8FBFF]",
    Visual: EditorVisual,
  },
  {
    id: "analyze",
    badge: "STEP 02",
    heading: ["Analyze your", "ATS Score"],
    desc: "Upload your resume. Our AI checks formatting, keywords, readability, job compatibility, and grammar.",
    bg: "bg-white",
    Visual: GaugeVisual,
  },
  {
    id: "match",
    badge: "STEP 03",
    heading: ["Match jobs", "instantly."],
    desc: "Paste any job description. See your compatibility score, missing skills, and recommended improvements.",
    bg: "bg-[#F8F9FB]",
    Visual: MatchVisual,
  },
  {
    id: "interview",
    badge: "STEP 04",
    heading: ["Practice interviews", "with AI."],
    desc: "Generate personalized interview questions. Receive instant AI feedback. Practice until you're confident.",
    bg: "bg-[#F5F9FF]",
    Visual: InterviewVisual,
    hasCta: true,
  },
  {
    id: "features",
    badge: "STEP 05",
    heading: ["Everything you need", "to get hired."],
    desc: null,
    bg: "bg-white",
    Visual: FeatureGrid,
    isGrid: true,
  },
];

export default function CareerStoryScroll() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(() => {
    const panels = gsap.utils.toArray(".cs-panel");

    panels.forEach((panel, i) => {
      const isLast = i === panels.length - 1;
      const ambient = panel.querySelector("[data-ambient]");

      if (i > 0) {
        gsap.set(panel, {
          rotateX: isMobile ? 8 : 20,
          scale: isMobile ? 0.97 : 0.92,
          transformOrigin: "50% 0%",
          transformPerspective: 1600,
          opacity: 0,
        });
      }

      const content = panel.querySelectorAll("[data-animate]");
      const visuals = panel.querySelectorAll("[data-visual]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: "top 82%",
          end: "bottom 20%",
          toggleActions: "restart none none reverse",
        },
      });

      if (i > 0) {
        tl.to(
          panel,
          {
            rotateX: 0,
            scale: 1,
            opacity: 1,
            transformPerspective: 1600,
            duration: 0.9,
            ease: "power3.out",
          },
          0
        );
      }

      const t0 = i === 0 ? 0 : 0.2;

      if (content.length) {
        tl.fromTo(
          content,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.07,
            duration: 0.55,
            ease: "power2.out",
          },
          t0
        );
      }

      if (visuals.length) {
        tl.fromTo(
          visuals,
          { y: 36, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            duration: 0.55,
            ease: "power2.out",
          },
          t0 + 0.08
        );
      }

      if (ambient) {
        gsap.to(ambient, {
          yPercent: -8,
          xPercent: 3,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      ScrollTrigger.create({
        trigger: panel,
        start: i === 0 ? "top top" : "top bottom",
        end: "+=120%",
        pin: !isLast,
        pinSpacing: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        preventOverlaps: true,
        onEnter: () => setActiveStep(i),
        onEnterBack: () => setActiveStep(i),
      });
    });

    ScrollTrigger.refresh();
  }, { scope: containerRef, dependencies: [isMobile] });

  const goRegister = () => navigate("/register");
  const goFeatures = () =>
    document
      .getElementById("features")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <StoryProgress activeStep={activeStep} total={sections.length + 1} />
      {sections.map((s) => (
        <section
          key={s.id}
          className={`cs-panel relative min-h-screen flex items-center px-6 py-12 sm:py-16 overflow-hidden ${s.bg}`}
          style={{ willChange: "transform" }}
        >
          {s.id === "hero" && (
            <>
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true" data-ambient>
                <div
                  className="absolute top-[-20%] left-[-10%] w-[120%] h-[80%] opacity-60"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(79,140,255,0.12) 0%, transparent 70%)",
                    filter: "blur(80px)",
                  }}
                />
              </div>
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div
                  className="absolute inset-0 opacity-[0.25]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(79,140,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(79,140,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                  }}
                />
              </div>
            </>
          )}

          {s.id === "features" ? (
            <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
              <span
                data-animate
                className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-widest mb-8"
                style={pill}
              >
                {s.badge}
              </span>
              <div className="space-y-2 mb-12">
                {s.heading.map((l, i) => (
                  <h2
                    key={i}
                    data-animate
                    className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.08] tracking-tight"
                    style={{ color: P.ink }}
                  >
                    {l}
                  </h2>
                ))}
              </div>
              <s.Visual />
            </div>
          ) : (
            <div className="relative z-10 w-full max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-12 lg:gap-20 items-center">
                <div className="max-w-xl">
                  <span
                    data-animate
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide mb-8 ${s.id === "hero" ? "" : "tracking-widest text-[11px]"}`}
                    style={pill}
                  >
                    {s.hasBadgeIcon && <Sparkles size={12} />}
                    {s.badge}
                  </span>
                  <div className="space-y-2">
                    {s.heading.map((l, i) => (
                      <h2
                        key={i}
                        data-animate
                        className={`font-heading leading-[1.08] tracking-tight ${s.id === "hero" ? "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl" : "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"}`}
                        style={{ color: P.ink }}
                      >
                        {l}
                      </h2>
                    ))}
                  </div>
                  {s.desc && (
                    <p
                      data-animate
                      className="text-base sm:text-lg mt-6 leading-relaxed max-w-lg"
                      style={{ color: P.muted }}
                    >
                      {s.desc}
                    </p>
                  )}
                  {s.showCta && (
                    <div data-animate className="flex flex-wrap gap-3 mt-10">
                      <button
                        onClick={goRegister}
                        className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110"
                        style={{
                          background: `linear-gradient(135deg, ${P.primary} 0%, #2563EB 100%)`,
                          boxShadow:
                            "0 8px 32px rgba(79,140,255,0.35), 0 2px 8px rgba(79,140,255,0.2)",
                        }}
                      >
                        Start Building Free
                        <ArrowRight size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  )}
                  {s.hasCta && (
                    <div data-animate className="flex flex-wrap gap-3 mt-10">
                      <button
                        onClick={goRegister}
                        className="inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110"
                        style={{
                          background: `linear-gradient(135deg, ${P.primary} 0%, #2563EB 100%)`,
                          boxShadow:
                            "0 8px 32px rgba(79,140,255,0.35), 0 2px 8px rgba(79,140,255,0.2)",
                        }}
                      >
                        Try AI Interview
                        <ChevronRight size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="relative flex justify-center lg:justify-end">
                  <s.Visual />
                </div>
              </div>
            </div>
          )}
        </section>
      ))}

      <section className="cs-panel relative min-h-screen flex items-center px-6 py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" data-ambient>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(79,140,255,0.2) 0%, rgba(37,99,235,0.08) 40%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-[10%] left-[5%] w-72 h-72 rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(79,140,255,0.25) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute bottom-[15%] right-[8%] w-96 h-96 rounded-full opacity-25"
            style={{
              background: "radial-gradient(circle, rgba(107,168,255,0.2) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <div
            data-animate
            className="rounded-[32px] p-10 sm:p-14 md:p-20"
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow:
                "0 32px 80px rgba(79,140,255,0.12), 0 8px 24px rgba(79,140,255,0.06), inset 0 1px 0 rgba(255,255,255,0.95)",
            }}
          >
            <div className="space-y-3 mb-6">
              {["Your dream job starts", "with a better resume."].map(
                (l, i) => (
                  <h2
                    key={i}
                    data-animate
                    className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.08] tracking-tight"
                    style={{ color: P.ink }}
                  >
                    {l}
                  </h2>
                )
              )}
            </div>
            <p
              data-animate
              className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
              style={{ color: P.muted }}
            >
              Join thousands of job seekers using CareerAI to build resumes that
              pass ATS filters and impress recruiters.
            </p>
            <div
              data-animate
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={goRegister}
                className="inline-flex items-center gap-2 rounded-2xl px-10 py-4 text-base font-semibold text-white transition-all duration-300 hover:brightness-110"
                style={{
                  background: `linear-gradient(135deg, ${P.primary} 0%, #2563EB 100%)`,
                  boxShadow:
                    "0 8px 32px rgba(79,140,255,0.35), 0 2px 8px rgba(79,140,255,0.2)",
                }}
              >
                Start Free
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
              <button
                onClick={goFeatures}
                className="inline-flex items-center gap-2 rounded-2xl px-10 py-4 text-base font-semibold transition-all duration-300"
                style={{
                  background: "rgba(248,250,255,0.8)",
                  border: "1px solid rgba(79,140,255,0.18)",
                  color: "#1E2A3B",
                  boxShadow:
                    "0 4px 16px rgba(79,140,255,0.06), 0 1px 4px rgba(79,140,255,0.04)",
                }}
              >
                View Demo
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        <FloatBadge className="absolute top-[12%] right-[8%] hidden lg:block" float>
          <div className="rounded-2xl px-5 py-4" style={badge}>
            <div className="flex items-center gap-2 text-xs mb-1" style={{ color: P.muted }}>
              <ShieldCheck size={14} style={{ color: P.primary }} />
              ATS Score
            </div>
            <p className="font-heading text-xl" style={{ color: P.ink }}>
              92<span className="text-sm" style={{ color: P.muted }}>/100</span>
            </p>
          </div>
        </FloatBadge>
        <FloatBadge className="absolute bottom-[18%] left-[6%] hidden lg:block" float>
          <div className="rounded-2xl px-5 py-4" style={badge}>
            <div className="flex items-center gap-2 text-xs mb-1" style={{ color: P.muted }}>
              <Star size={14} className="text-amber-500" />
              Interview Ready
            </div>
            <p className="font-heading text-xl" style={{ color: P.ink }}>
              9.2 / 10
            </p>
          </div>
        </FloatBadge>
      </section>
    </div>
  );
}
