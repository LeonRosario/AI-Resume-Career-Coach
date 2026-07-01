import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Upload, FileSearch, Briefcase, TrendingUp,
  Sparkles, ArrowRight, Zap, Target,
} from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import ProgressBar from "../../components/ui/ProgressBar";
import ScoreRing from "../../components/ui/ScoreRing";
import Badge from "../../components/ui/Badge";
import { SkeletonLine, SkeletonCircle } from "../../components/ui/Skeleton";
import { Typewriter } from "../../components/ui/TypewriterText";
import { jobs } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import { useResume } from "../../context/ResumeContext";

const statCards = (resumeData, hasResume) => [
  {
    icon: Target,
    label: "ATS Score",
    value: hasResume ? `${resumeData.atsScore}` : null,
    sub: hasResume ? (resumeData.atsScore >= 85 ? "Excellent" : resumeData.atsScore >= 70 ? "Good" : "Needs work") : null,
    accent: "from-primary-500 to-primary-600",
    ring: true,
    ringValue: hasResume ? resumeData.atsScore : 0,
  },
  {
    icon: Briefcase,
    label: "Top job match",
    value: hasResume ? `${resumeData.jobMatch}%` : null,
    sub: hasResume ? `${resumeData.topJobTitle || "—"} · ${resumeData.topJobCompany || "—"}` : null,
    accent: "from-indigo-500 to-violet-500",
    ring: false,
  },
  {
    icon: TrendingUp,
    label: "Skills tracked",
    value: hasResume ? `${resumeData.skillsTracked} / ${resumeData.totalSkills}` : null,
    sub: hasResume ? `${resumeData.totalSkills - resumeData.skillsTracked} gaps identified` : null,
    accent: "from-violet-500 to-violet-600",
    ring: false,
  },
];

export default function DashboardHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { resumeData } = useResume();
  const hasResume = resumeData.hasAnalysis;
  const topJobs = jobs.slice(0, 3);

  return (
    <div className="space-y-6">

      {/* ── Welcome banner ── */}
      <GlassCard
        variant="strong"
        accent
        className="p-7 md:p-8"
        delay={0}
      >
        {/* BG decoration */}
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)", filter: "blur(40px)" }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-[0.12em] mb-1">
              Welcome back
            </p>
            <h2 className="font-heading text-2xl md:text-3xl text-ink">
              {user?.name || "there"} 👋
            </h2>
            <p className="text-muted mt-2 max-w-md text-sm leading-relaxed">
              <Typewriter
                text={
                  hasResume
                    ? ["Your resume is scoring well — let's keep pushing.", "Ready to close those skill gaps today?", "A top job match is waiting for you."]
                    : ["Upload your resume to unlock AI analysis.", "Get your ATS score in under 60 seconds.", "Find out which skills are holding you back."]
                }
                speed={50}
                deleteSpeed={28}
                delay={2200}
                loop
                cursor="|"
              />
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            icon={Upload}
            onClick={() => navigate("/app/resume-analyzer")}
          >
            {hasResume ? "Upload new resume" : "Upload resume"}
          </Button>
        </div>
      </GlassCard>

      {/* ── Stat cards ── */}
      <div className="grid sm:grid-cols-3 gap-5">
        {statCards(resumeData, hasResume).map((stat, i) => (
          <GlassCard
            key={stat.label}
            hover
            className="p-6 stat-card"
            delay={0.06 * (i + 1)}
          >
            {stat.ring && hasResume ? (
              <div className="flex items-center gap-4">
                <ScoreRing value={resumeData.atsScore} size={68} stroke={7} label="" />
                <div>
                  <p className="text-xs text-muted font-medium mb-0.5">{stat.label}</p>
                  <p className="font-heading text-xl text-ink">{stat.sub}</p>
                  <p className="text-xs text-muted">{resumeData.atsScore}/100</p>
                </div>
              </div>
            ) : hasResume ? (
              <>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.accent} flex items-center justify-center shrink-0`}>
                    <stat.icon size={16} className="text-white" strokeWidth={2} />
                  </div>
                  <p className="text-xs text-muted font-medium">{stat.label}</p>
                </div>
                <p className="font-heading text-2xl text-ink">{stat.value}</p>
                <p className="text-xs text-muted mt-1 truncate">{stat.sub}</p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2.5 mb-3">
                  <SkeletonCircle size={36} />
                  <SkeletonLine className="w-20" />
                </div>
                <SkeletonLine className="w-16 h-7 mb-2" />
                <SkeletonLine className="w-32 h-3" />
              </>
            )}
          </GlassCard>
        ))}
      </div>

      {/* ── Skill analysis + activity ── */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Skill analysis */}
        <GlassCard className="p-6 lg:col-span-2" delay={0.1}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading text-lg text-ink">Skill Analysis</h3>
            <div className="flex items-center gap-1.5 text-xs text-primary-600 font-medium">
              <Sparkles size={13} />
              AI Powered
            </div>
          </div>

          {hasResume ? (
            <>
              <div className="space-y-4">
                {[
                  { label: "Formatting",       value: resumeData.analysis.formatting },
                  { label: "Keyword Match",    value: resumeData.analysis.keywords  },
                  { label: "Impact Statements", value: resumeData.analysis.impact   },
                  { label: "ATS Compatibility", value: resumeData.analysis.ats      },
                ].map((item, i) => (
                  <ProgressBar
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    delay={i * 0.08}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-100">
                {resumeData.strengths.map((s) => (
                  <Badge key={s} tone="success" icon>{s}</Badge>
                ))}
                {resumeData.missing.map((s) => (
                  <Badge key={s} tone="danger" icon>{s}</Badge>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <div className="w-14 h-14 rounded-2xl bg-brand-gradient-soft border border-primary-100 flex items-center justify-center mx-auto mb-4">
                <FileSearch size={22} className="text-primary-600" />
              </div>
              <p className="text-sm font-medium text-body">No resume uploaded yet</p>
              <p className="text-xs text-muted mt-1 mb-4">Upload your resume to see skill analysis</p>
              <Button variant="outline" size="sm" onClick={() => navigate("/app/resume-analyzer")}>
                Analyze now
              </Button>
            </div>
          )}
        </GlassCard>

        {/* Recent activity */}
        <GlassCard className="p-6" delay={0.14}>
          <h3 className="font-heading text-lg text-ink mb-5">Recent Activity</h3>
          {hasResume ? (
            <div className="space-y-4">
              {[
                { text: "Resume analyzed successfully", time: "Just now", color: "bg-primary-500" },
                { text: "ATS score updated — 92/100", time: "Just now", color: "bg-emerald-500" },
                { text: "Skills gap identified — 3 items", time: "Just now", color: "bg-violet-500" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className={`w-2 h-2 rounded-full ${item.color} mt-1.5 shrink-0`} />
                  <div>
                    <p className="text-sm text-body leading-snug">{item.text}</p>
                    <p className="text-xs text-muted mt-0.5">{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <Zap size={18} className="text-muted" />
              </div>
              <p className="text-sm text-muted">No activity yet</p>
              <p className="text-xs text-placeholder mt-1">Actions will appear here</p>
            </div>
          )}
        </GlassCard>
      </div>

      {/* ── Quick actions ── */}
      {!hasResume && (
        <GlassCard className="p-6" delay={0.18}>
          <h3 className="font-heading text-lg text-ink mb-4">Get started</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { label: "Analyze resume",  icon: FileSearch, path: "/app/resume-analyzer", desc: "Upload and score your resume" },
              { label: "Check ATS fit",   icon: Target,     path: "/app/ats-checker",    desc: "Match against job descriptions" },
              { label: "Find skill gaps", icon: TrendingUp, path: "/app/skill-gap",      desc: "Get a personalized roadmap" },
            ].map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                whileHover={{ y: -3 }}
                onClick={() => navigate(action.path)}
                className="glass-soft rounded-xl p-4 text-left hover:shadow-glass-md transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-gradient-soft border border-primary-100 flex items-center justify-center mb-3">
                  <action.icon size={15} className="text-primary-600" />
                </div>
                <p className="text-sm font-semibold text-ink">{action.label}</p>
                <p className="text-xs text-muted mt-0.5">{action.desc}</p>
              </motion.button>
            ))}
          </div>
        </GlassCard>
      )}

      {/* ── Recommended jobs ── */}
      {hasResume && (
        <GlassCard className="p-6" delay={0.2}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading text-lg text-ink">Recommended Jobs</h3>
            <button
              onClick={() => navigate("/app/job-match")}
              className="text-sm font-semibold text-primary-600 flex items-center gap-1 hover:gap-2 transition-all"
            >
              View all <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {topJobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 + i * 0.06 }}
                whileHover={{ y: -3 }}
                onClick={() => navigate("/app/job-match")}
                className="glass-soft rounded-xl p-4 cursor-pointer hover:shadow-glass-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge tone={job.match >= 85 ? "success" : "brand"}>{job.match}% match</Badge>
                </div>
                <h4 className="font-heading text-sm text-ink leading-tight">{job.title}</h4>
                <p className="text-xs text-muted mt-0.5">{job.company}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
