import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Upload, FileSearch, Briefcase, TrendingUp, Sparkles, ArrowRight,
  RefreshCw, CheckCircle2, AlertTriangle, Clock, MapPin, DollarSign,
  BarChart3, Lightbulb, PenTool, Bot, GraduationCap, FileText, Star,
  Target, ChevronRight, Zap, Award, Activity
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import ProgressBar from "../../components/ui/ProgressBar";
import ScoreRing from "../../components/ui/ScoreRing";
import Badge from "../../components/ui/Badge";
import { SkeletonLine, SkeletonCircle } from "../../components/ui/Skeleton";
import { Typewriter } from "../../components/ui/TypewriterText";
import { jobs, activity, resumeHistory } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import { useResume } from "../../context/ResumeContext";

const chartData = resumeHistory.map((h) => ({
  name: h.date.split(",")[0].trim(),
  score: h.score,
}));

const activityColors = {
  analyze: "bg-primary-500 shadow-[0_0_8px_rgba(37,99,235,0.35)]",
  match: "bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.35)]",
  interview: "bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.35)]",
  skill: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.35)]",
};

const quickActions = [
  { label: "Upload Resume", icon: Upload, path: "/app/resume-analyzer", desc: "PDF, DOCX supported", color: "from-primary-500 to-blue-600" },
  { label: "ATS Checker", icon: Target, path: "/app/ats-checker", desc: "Match job descriptions", color: "from-indigo-500 to-violet-500" },
  { label: "Resume Builder", icon: PenTool, path: "/app/resume-builder", desc: "Build from scratch", color: "from-emerald-500 to-emerald-600" },
  { label: "Cover Letter", icon: FileText, path: "/app/resume-builder", desc: "AI-generated letters", color: "from-amber-500 to-orange-500" },
  { label: "Mock Interview", icon: Bot, path: "/app/interview-prep", desc: "AI-powered practice", color: "from-violet-500 to-purple-600" },
  { label: "Career Roadmap", icon: GraduationCap, path: "/app/skill-gap", desc: "Personalized path", color: "from-cyan-500 to-blue-600" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

function ScoreTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong px-3 py-2 rounded-xl text-xs shadow-glass-lg">
      <p className="text-muted font-medium">{label}</p>
      <p className="text-primary-600 font-bold text-sm">{payload[0].value}/100</p>
    </div>
  );
}

export default function DashboardHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { resumeData } = useResume();
  const hasResume = resumeData.hasAnalysis;
  const topJobs = jobs.slice(0, 3);
  const userName = user?.name || "there";
  const whatsappLink = "https://wa.me/918197830093";

  const kpiCards = hasResume ? [
    { icon: Star, label: "ATS Score", value: resumeData.atsScore, sub: resumeData.atsScore >= 85 ? "Excellent" : resumeData.atsScore >= 70 ? "Good" : "Needs work", ring: true, ringValue: resumeData.atsScore, accent: "from-primary-500 to-primary-600" },
    { icon: Award, label: "Resume Health", value: `${Math.round((resumeData.analysis.formatting + resumeData.analysis.keywords + resumeData.analysis.impact + resumeData.analysis.ats) / 4)}%`, sub: "Overall score", accent: "from-emerald-500 to-emerald-600" },
    { icon: Briefcase, label: "Applications", value: jobs.length.toString(), sub: `${topJobs.filter(j => j.match >= 85).length} high match`, accent: "from-indigo-500 to-violet-500" },
    { icon: Lightbulb, label: "AI Suggestions", value: resumeData.suggestions?.length?.toString() || "3", sub: "Improvements ready", accent: "from-amber-500 to-orange-500" },
  ] : [];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">

      {/* ── Welcome Banner ── */}
      <motion.div variants={fadeUp}>
        <GlassCard variant="strong" accent className="p-6 md:p-7">
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)", filter: "blur(50px)" }}
            aria-hidden="true"
          />

          <div className="relative flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-xs font-semibold text-primary-600 uppercase tracking-[0.1em]">Welcome back</p>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl text-ink">
                {userName}
                <span className="inline-block ml-1.5 text-primary-600">✦</span>
              </h2>
              <p className="text-muted mt-1.5 text-sm leading-relaxed max-w-lg">
                <Typewriter
                  text={
                    hasResume
                      ? ["Your resume scores well — keep pushing.", "Ready to close skill gaps?", "A top job match awaits you."]
                      : ["Upload your resume for AI analysis.", "Get your ATS score in 60 seconds.", "Discover skills holding you back."]
                  }
                  speed={50}
                  deleteSpeed={28}
                  delay={2200}
                  loop
                  cursor="|"
                />
              </p>
            </div>

            {hasResume && (
              <div className="flex items-center gap-4 shrink-0">
                <ScoreRing value={resumeData.atsScore} size={72} stroke={6} label="" />
                <div className="hidden xs:block">
                  <p className="text-xs text-muted font-medium">ATS Score</p>
                  <p className="font-heading text-lg text-ink leading-tight">{resumeData.atsScore}/100</p>
                  <p className="text-xs text-muted">{resumeData.status || "Last analyzed recently"}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
              <Button variant="primary" size="md" icon={Upload} onClick={() => navigate("/app/resume-analyzer")}>
                {hasResume ? "Upload New" : "Upload Resume"}
              </Button>
              {hasResume && (
                <Button variant="secondary" size="md" icon={RefreshCw} onClick={() => navigate("/app/resume-analyzer")}>
                  Analyze Again
                </Button>
              )}
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* ── KPI Cards ── */}
      {hasResume ? (
        <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((kpi, i) => (
            <GlassCard
              key={kpi.label}
              hover
              className="p-5"
              delay={0.04 * i}
            >
              {kpi.ring ? (
                <div className="flex items-center gap-3.5">
                  <ScoreRing value={kpi.ringValue} size={60} stroke={5} label="" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted font-medium">{kpi.label}</p>
                    <p className="font-heading text-xl text-ink">{kpi.value}</p>
                    <p className="text-xs text-muted truncate">{kpi.sub}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-muted font-medium">{kpi.label}</p>
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${kpi.accent} flex items-center justify-center shrink-0`}>
                      <kpi.icon size={14} className="text-white" strokeWidth={2.2} />
                    </div>
                  </div>
                  <p className="font-heading text-2xl text-ink">{kpi.value}</p>
                  <p className="text-xs text-muted mt-1">{kpi.sub}</p>
                  <div className="mt-2.5 h-1 rounded-full bg-primary-100/60 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${kpi.accent}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(parseInt(kpi.value) || 0, 100)}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </>
              )}
            </GlassCard>
          ))}
        </motion.div>
      ) : (
        <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <GlassCard key={i} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <SkeletonLine className="w-16 h-3" />
                <SkeletonCircle size={32} />
              </div>
              <SkeletonLine className="w-12 h-7 mb-1" />
              <SkeletonLine className="w-20 h-3" />
            </GlassCard>
          ))}
        </motion.div>
      )}

      {/* ── Skill Analysis + AI Insights ── */}
      <motion.div variants={fadeUp} className="grid lg:grid-cols-3 gap-5">
        {/* Skill Analysis */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-primary-600" />
              <h3 className="font-heading text-base text-ink">Skill Analysis</h3>
            </div>
            <Badge tone="brand" icon={Sparkles} size="sm">AI Powered</Badge>
          </div>

          {hasResume ? (
            <>
              <div className="space-y-3.5">
                {[
                  { label: "Formatting", value: resumeData.analysis.formatting },
                  { label: "Keyword Match", value: resumeData.analysis.keywords },
                  { label: "Impact Statements", value: resumeData.analysis.impact },
                  { label: "ATS Compatibility", value: resumeData.analysis.ats },
                ].map((item, i) => (
                  <ProgressBar key={item.label} label={item.label} value={item.value} delay={i * 0.06} />
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-primary-100/50">
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2.5">Strengths & Gaps</p>
                <div className="flex flex-wrap gap-2">
                  {resumeData.strengths.map((s) => (
                    <Badge key={s} tone="success" icon>{s}</Badge>
                  ))}
                  {resumeData.missing.map((s) => (
                    <Badge key={s} tone="danger" icon>{s}</Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-primary-50/60 border border-primary-100/50 flex items-start gap-3">
                <Lightbulb size={16} className="text-primary-600 shrink-0 mt-0.5" />
                <p className="text-xs text-body leading-relaxed">
                  Add <strong className="text-ink">Docker & AWS</strong> to your Skills section — these appear in 70% of
                  top-match job descriptions. This could boost your ATS score by <strong className="text-primary-600">+8 points</strong>.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center mx-auto mb-4">
                <FileSearch size={22} className="text-primary-600" />
              </div>
              <p className="text-sm font-medium text-body">No resume uploaded yet</p>
              <p className="text-xs text-muted mt-1 mb-4">Upload to see skill analysis</p>
              <Button variant="outline" size="sm" onClick={() => navigate("/app/resume-analyzer")}>
                Analyze now
              </Button>
            </div>
          )}
        </GlassCard>

        {/* AI Insights */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Activity size={16} className="text-primary-600" />
            <h3 className="font-heading text-base text-ink">AI Insights</h3>
          </div>

          {hasResume ? (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100/60">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                  </div>
                  <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Strengths</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {resumeData.strengths.slice(0, 4).map((s) => (
                    <span key={s} className="text-[11px] font-medium text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md">{s}</span>
                  ))}
                  {resumeData.strengths.length > 4 && (
                    <span className="text-[11px] font-medium text-emerald-600">+{resumeData.strengths.length - 4}</span>
                  )}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-red-50/60 border border-red-100/60">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center">
                    <AlertTriangle size={14} className="text-red-500" />
                  </div>
                  <p className="text-xs font-semibold text-red-600 uppercase tracking-wider">Weaknesses</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {resumeData.missing.map((s) => (
                    <span key={s} className="text-[11px] font-medium text-red-600 bg-red-100/60 px-2 py-0.5 rounded-md">{s}</span>
                  ))}
                  {resumeData.missing.length < 3 && (
                    <span className="text-[11px] font-medium text-red-500">—</span>
                  )}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-primary-50/60 border border-primary-100/60">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-primary-100 flex items-center justify-center">
                    <TrendingUp size={14} className="text-primary-600" />
                  </div>
                  <p className="text-xs font-semibold text-primary-700 uppercase tracking-wider">ATS Improvement</p>
                </div>
                <p className="font-heading text-2xl text-primary-600">+15%</p>
                <p className="text-xs text-muted mt-0.5">Estimated by addressing gaps</p>
                <div className="mt-2 h-1.5 rounded-full bg-primary-100 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary-500"
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="py-10 text-center">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <Activity size={18} className="text-muted" />
              </div>
              <p className="text-sm text-muted">Upload a resume first</p>
              <p className="text-xs text-placeholder mt-1">Insights will appear here</p>
            </div>
          )}
        </GlassCard>
      </motion.div>

      {/* ── Resume Progress Chart ── */}
      {hasResume && (
        <motion.div variants={fadeUp}>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <BarChart3 size={16} className="text-primary-600" />
                <h3 className="font-heading text-base text-ink">Resume Progress</h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Clock size={12} />
                Last 3 versions
              </div>
            </div>

            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(37,99,235,0.06)" horizontal vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#8A9BB0" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: "#8A9BB0" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ScoreTooltip />} cursor={{ stroke: "rgba(37,99,235,0.12)", strokeWidth: 1 }} />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    fill="url(#scoreGradient)"
                    dot={{ r: 4, fill: "#2563EB", stroke: "#fff", strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: "#2563EB", stroke: "#fff", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* ── Recent Activity + Recommended Jobs ── */}
      <motion.div variants={fadeUp} className="grid lg:grid-cols-2 gap-5">
        {/* Recent Activity */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary-600" />
              <h3 className="font-heading text-base text-ink">Recent Activity</h3>
            </div>
            <button className="text-xs font-semibold text-primary-600 flex items-center gap-1 hover:gap-1.5 transition-all">
              View all <ChevronRight size={12} />
            </button>
          </div>

          {hasResume ? (
            <div className="space-y-0">
              {activity.map((item, i) => {
                const dotColor = activityColors[item.type] || "bg-primary-500";
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="relative flex items-start gap-3.5 pb-4 pl-1 last:pb-0"
                  >
                    {i < activity.length - 1 && (
                      <div className="absolute left-[13px] top-7 bottom-0 w-px bg-primary-100/60" aria-hidden="true" />
                    )}
                    <div className={`w-[10px] h-[10px] rounded-full mt-1.5 shrink-0 ${dotColor}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-body leading-snug">{item.text}</p>
                      <p className="text-xs text-muted mt-0.5">{item.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <Activity size={18} className="text-muted" />
              </div>
              <p className="text-sm text-muted">No activity yet</p>
              <p className="text-xs text-placeholder mt-1">Actions will appear here</p>
            </div>
          )}
        </GlassCard>

        {/* Recommended Jobs */}
        {hasResume ? (
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-primary-600" />
                <h3 className="font-heading text-base text-ink">Recommended Jobs</h3>
              </div>
              <button
                onClick={() => navigate("/app/job-match")}
                className="text-xs font-semibold text-primary-600 flex items-center gap-1 hover:gap-1.5 transition-all"
              >
                View all <ArrowRight size={12} />
              </button>
            </div>

            <div className="space-y-3">
              {topJobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ y: -2, scale: 1.005 }}
                  onClick={() => navigate("/app/job-match")}
                  className="p-3.5 rounded-xl bg-white border border-primary-100/60 hover:border-primary-200/80 hover:shadow-glass-md cursor-pointer transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-heading text-sm text-ink leading-tight">{job.title}</h4>
                        <Badge tone={job.match >= 90 ? "success" : job.match >= 80 ? "brand" : "neutral"}>{job.match}%</Badge>
                      </div>
                      <p className="text-xs text-muted">{job.company}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1 text-[11px] text-placeholder">
                          <MapPin size={10} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-placeholder">
                          <DollarSign size={10} /> {job.salary}
                        </span>
                      </div>
                    </div>
                    <Button variant="secondary" size="xs" className="shrink-0">
                      Apply
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        ) : (
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <Briefcase size={16} className="text-primary-600" />
              <h3 className="font-heading text-base text-ink">Recommended Jobs</h3>
            </div>
            <div className="py-8 text-center">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <Briefcase size={18} className="text-muted" />
              </div>
              <p className="text-sm text-muted">Upload your resume first</p>
              <p className="text-xs text-placeholder mt-1">Jobs matched to your profile will appear here</p>
            </div>
          </GlassCard>
        )}
      </motion.div>

      {/* ── Quick Actions ── */}
      <motion.div variants={fadeUp}>
        <GlassCard className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Zap size={16} className="text-primary-600" />
            <h3 className="font-heading text-base text-ink">Quick Actions</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.03 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(action.path)}
                className="glass-soft rounded-xl p-4 text-left hover:shadow-glass-md transition-all duration-200 group"
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-shadow`}>
                  <action.icon size={16} className="text-white" strokeWidth={2.2} />
                </div>
                <p className="text-sm font-semibold text-ink">{action.label}</p>
                <p className="text-[11px] text-muted mt-0.5 leading-tight">{action.desc}</p>
              </motion.button>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* ── Footer note ── */}
      <motion.p variants={fadeUp} className="text-center text-xs text-placeholder pt-2 pb-4">
        Need help? <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-primary-600 font-medium hover:underline">Chat with us on WhatsApp</a>
      </motion.p>
    </motion.div>
  );
}
