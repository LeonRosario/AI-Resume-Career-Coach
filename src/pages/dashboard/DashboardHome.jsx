import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Upload, FileSearch, Briefcase, Sparkles, ArrowRight,
  RefreshCw, Clock, MapPin, DollarSign,
  BarChart3, Lightbulb, PenTool, Bot, GraduationCap, FileText, Star,
  Target, ChevronRight, Zap, Award, Activity, LineChart, PieChart,
  BrainCircuit
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  BarChart, Bar, Cell,   PieChart as RePieChart, Pie
} from "recharts";
import CareerAnalytics from "../../components/dashboard/CareerAnalytics";
import Button from "../../components/ui/Button";
import ProgressBar from "../../components/ui/ProgressBar";
import Badge from "../../components/ui/Badge";
import { SkeletonLine, SkeletonCircle } from "../../components/ui/Skeleton";
import { jobs, activity, resumeHistory } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import { useResume } from "../../context/ResumeContext";

const chartData = [
  { name: "Jan", score: 62 },
  { name: "Feb", score: 68 },
  { name: "Mar", score: 71 },
  { name: "Apr", score: 78 },
  { name: "May", score: 84 },
  { name: "Jun", score: 92 },
];

const jobMatchChartData = jobs
  .slice(0, 6)
  .map((j) => ({ name: j.title.split(" ")[0], fullName: j.title, match: j.match }));
const JOB_BAR_COLORS = ["#6366F1", "#818CF8", "#A5B4FC", "#8B5CF6", "#A78BFA", "#C4B5FD"];

const skillDonutData = [
  { name: "Skills", value: 35, color: "#6366F1" },
  { name: "Experience", value: 28, color: "#8B5CF6" },
  { name: "Keywords", value: 22, color: "#A5B4FC" },
  { name: "Formatting", value: 15, color: "#C7D2FE" },
];

const quickActions = [
  { label: "Upload Resume", icon: Upload, path: "/app/resume-analyzer", desc: "PDF, DOCX supported" },
  { label: "ATS Checker", icon: Target, path: "/app/ats-checker", desc: "Match job descriptions" },
  { label: "Resume Builder", icon: PenTool, path: "/app/resume-builder", desc: "Build from scratch" },
  { label: "Cover Letter", icon: FileText, path: "/app/resume-builder", desc: "AI-generated letters" },
  { label: "Mock Interview", icon: Bot, path: "/app/interview-prep", desc: "AI-powered practice" },
  { label: "Career Roadmap", icon: GraduationCap, path: "/app/skill-gap", desc: "Personalized path" },
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

function ChartTooltip({ active, payload, label, suffix = "" }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-xs shadow-card-lg">
      <p className="text-gray-500 font-medium">{label}</p>
      <p className="text-indigo-600 font-bold text-sm">{payload[0].value}{suffix}</p>
    </div>
  );
}

function DonutTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-xs shadow-card-lg">
      <p className="text-gray-500 font-medium">{d.name}</p>
      <p className="text-indigo-600 font-bold text-sm">{d.value}%</p>
    </div>
  );
}

function CustomBarShape(props) {
  const { x, y, width, height, fill } = props;
  return <rect x={x} y={y} width={width} height={height} rx={6} ry={6} fill={fill} />;
}

function DashboardSummaryCards({ hasResume, kpiCards }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {hasResume ? kpiCards.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-gray-200 rounded-2xl p-5 card-hover"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{kpi.label}</span>
            <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
              <kpi.icon size={16} className="text-indigo-600" strokeWidth={2} />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-gray-900 tabular-nums">{kpi.value}</span>
            {kpi.trend && (
              <span className={`text-xs font-semibold mb-1 ${kpi.trend.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}>
                {kpi.trend}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">{kpi.sub}</p>
        </motion.div>
      )) : [1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <SkeletonLine className="w-16 h-3" />
            <SkeletonCircle size={32} />
          </div>
          <SkeletonLine className="w-12 h-7 mb-1" />
          <SkeletonLine className="w-20 h-3" />
        </div>
      ))}
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
    { icon: Star, label: "ATS Score", value: resumeData.atsScore, trend: "+8%", sub: "this month" },
    { icon: Award, label: "Resumes Analyzed", value: resumeHistory.length, trend: "+12%", sub: "this month" },
    { icon: BrainCircuit, label: "Skills Identified", value: resumeData.strengths.length + resumeData.missing.length, trend: "+6%", sub: "this month" },
    { icon: Briefcase, label: "Job Matches", value: jobs.length, trend: "+14%", sub: "this month" },
  ] : [];

  const hasAllData = hasResume;
  const analysisItems = resumeData.analysis ? [
    { label: "Formatting", value: resumeData.analysis.formatting },
    { label: "Keyword Match", value: resumeData.analysis.keywords },
    { label: "Impact Statements", value: resumeData.analysis.impact },
    { label: "ATS Compatibility", value: resumeData.analysis.ats },
  ] : [];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

      {/* ── Welcome Header ── */}
      <motion.div variants={fadeUp}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {userName}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {hasResume
                ? "Here's your career overview and latest updates."
                : "Upload your resume to get started with AI-powered analysis."}
            </p>
          </div>
          <div className="flex gap-2.5">
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
      </motion.div>

      {/* ── Summary Cards ── */}
      <motion.div variants={fadeUp}>
        <DashboardSummaryCards hasResume={hasResume} kpiCards={kpiCards} />
      </motion.div>

      {/* ── Charts Section ── */}
      {hasAllData ? (
        <motion.div variants={fadeUp} className="grid lg:grid-cols-3 gap-5">
          {/* ATS Score Trend */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <LineChart size={15} className="text-indigo-600" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">ATS Score Performance</h3>
                  <p className="text-xs text-gray-500">Score improvement over time</p>
                </div>
              </div>
              <Badge tone="success" size="sm">+30 pts</Badge>
            </div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                  <defs>
                    <linearGradient id="atsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" horizontal vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip suffix="/100" />} cursor={{ stroke: "rgba(99,102,241,0.12)", strokeWidth: 1 }} />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#6366F1"
                    strokeWidth={2.5}
                    fill="url(#atsGradient)"
                    dot={{ r: 3, fill: "#6366F1", stroke: "#fff", strokeWidth: 2 }}
                    activeDot={{ r: 5, fill: "#6366F1", stroke: "#fff", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Resume Analysis Breakdown */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <PieChart size={15} className="text-indigo-600" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Resume Breakdown</h3>
                <p className="text-xs text-gray-500">Analysis categories</p>
              </div>
            </div>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={skillDonutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {skillDonutData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<DonutTooltip />} />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {skillDonutData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: d.color }} />
                  <span className="text-xs text-gray-500">{d.name}</span>
                  <span className="text-xs font-semibold text-gray-700 ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}

      {/* ── Job Match Chart + Skill Analysis ── */}
      <motion.div variants={fadeUp} className="grid lg:grid-cols-3 gap-5">
        {/* Job Match Bar Chart */}
        {hasResume ? (
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <BarChart3 size={15} className="text-indigo-600" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Job Match Overview</h3>
                  <p className="text-xs text-gray-500">Match rate by position</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/app/job-match")}
                className="text-xs font-semibold text-indigo-600 flex items-center gap-1 hover:gap-1.5 transition-all"
              >
                View all <ArrowRight size={12} />
              </button>
            </div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobMatchChartData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" horizontal vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip suffix="%" />} cursor={{ fill: "rgba(99,102,241,0.04)" }} />
                  <Bar dataKey="match" shape={<CustomBarShape />}>
                    {jobMatchChartData.map((entry, i) => (
                      <Cell key={i} fill={JOB_BAR_COLORS[i % JOB_BAR_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <BarChart3 size={15} className="text-gray-400" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Job Match Overview</h3>
                <p className="text-xs text-gray-500">Upload your resume to see matches</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
                <Briefcase size={20} className="text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-500">No resume uploaded yet</p>
              <p className="text-xs text-gray-400 mt-1 mb-3">Upload to see job match analysis</p>
              <Button variant="outline" size="sm" onClick={() => navigate("/app/resume-analyzer")}>
                Upload now
              </Button>
            </div>
          </div>
        )}

        {/* Skill Analysis */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <BarChart3 size={15} className="text-indigo-600" strokeWidth={2} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Skill Analysis</h3>
            </div>
            {hasResume && (
              <Badge tone="brand" icon={Sparkles} size="sm">AI Powered</Badge>
            )}
          </div>

          {hasResume ? (
            <>
              <div className="space-y-3">
                {analysisItems.map((item, i) => (
                  <ProgressBar key={item.label} label={item.label} value={item.value} delay={i * 0.06} />
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">Strengths & Gaps</p>
                <div className="flex flex-wrap gap-1.5">
                  {resumeData.strengths.map((s) => (
                    <Badge key={s} tone="success" icon>{s}</Badge>
                  ))}
                  {resumeData.missing.map((s) => (
                    <Badge key={s} tone="danger" icon>{s}</Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3.5 rounded-xl bg-indigo-50 border border-indigo-100 flex items-start gap-3">
                <Lightbulb size={15} className="text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">
                  Add <strong className="text-gray-900">Docker & AWS</strong> to your Skills section — these appear in 70% of
                  top-match job descriptions. This could boost your ATS score by <strong className="text-indigo-600">+8 points</strong>.
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
                <FileSearch size={20} className="text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-500">No resume uploaded yet</p>
              <p className="text-xs text-gray-400 mt-1 mb-3">Upload to see skill analysis</p>
              <Button variant="outline" size="sm" onClick={() => navigate("/app/resume-analyzer")}>
                Analyze now
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Recent Activity + Recommended Jobs ── */}
      <motion.div variants={fadeUp} className="grid lg:grid-cols-2 gap-5">
        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <Clock size={15} className="text-indigo-600" strokeWidth={2} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <button className="text-xs font-semibold text-indigo-600 flex items-center gap-1 hover:gap-1.5 transition-all">
              View all <ChevronRight size={12} />
            </button>
          </div>

          {hasResume ? (
            <div className="space-y-0">
              {activity.map((item, i) => {
                const dotColors = {
                  analyze: "bg-indigo-500",
                  match: "bg-emerald-500",
                  interview: "bg-violet-500",
                  skill: "bg-amber-500",
                };
                const dotColor = dotColors[item.type] || "bg-indigo-500";
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="relative flex items-start gap-3.5 pb-4 pl-1 last:pb-0"
                  >
                    {i < activity.length - 1 && (
                      <div className="absolute left-[13px] top-7 bottom-0 w-px bg-gray-200" aria-hidden="true" />
                    )}
                    <div className={`w-[10px] h-[10px] rounded-full mt-1.5 shrink-0 ${dotColor}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 leading-snug">{item.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
                <Activity size={20} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">No activity yet</p>
              <p className="text-xs text-gray-400 mt-1">Actions will appear here</p>
            </div>
          )}
        </div>

        {/* Recommended Jobs */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <Briefcase size={15} className="text-indigo-600" strokeWidth={2} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Recommended Jobs</h3>
            </div>
            {hasResume && (
              <button
                onClick={() => navigate("/app/job-match")}
                className="text-xs font-semibold text-indigo-600 flex items-center gap-1 hover:gap-1.5 transition-all"
              >
                View all <ArrowRight size={12} />
              </button>
            )}
          </div>

          {hasResume ? (
            <div className="space-y-3">
              {topJobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ y: -2 }}
                  onClick={() => navigate("/app/job-match")}
                  className="p-3.5 rounded-xl bg-white border border-gray-100 hover:border-indigo-100 hover:shadow-card cursor-pointer transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-gray-900 leading-tight">{job.title}</h4>
                        <Badge tone={job.match >= 90 ? "success" : job.match >= 80 ? "brand" : "neutral"}>{job.match}%</Badge>
                      </div>
                      <p className="text-xs text-gray-500">{job.company}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <MapPin size={10} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
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
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
                <Briefcase size={20} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">Upload your resume first</p>
              <p className="text-xs text-gray-400 mt-1">Jobs matched to your profile will appear here</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Quick Actions ── */}
      <motion.div variants={fadeUp}>
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
              <Zap size={15} className="text-indigo-600" strokeWidth={2} />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Quick Actions</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.03 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(action.path)}
                className="rounded-xl p-4 text-left hover:shadow-card transition-all duration-200 group bg-white border border-gray-100 hover:border-indigo-100"
              >
                <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
                  <action.icon size={16} className="text-indigo-600" strokeWidth={2} />
                </div>
                <p className="text-sm font-semibold text-gray-900">{action.label}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-tight">{action.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Career Analytics ── */}
      {hasResume && (
        <CareerAnalytics />
      )}

      {/* ── Footer ── */}
      <motion.p variants={fadeUp} className="text-center text-xs text-gray-400 pt-2 pb-4">
        Need help? <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium hover:underline">Chat with us on WhatsApp</a>
      </motion.p>
    </motion.div>
  );
}
