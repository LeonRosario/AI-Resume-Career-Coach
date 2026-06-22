import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, FileSearch, Briefcase, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import ProgressBar from "../../components/ui/ProgressBar";
import ScoreRing from "../../components/ui/ScoreRing";
import Badge from "../../components/ui/Badge";
import { resumeAnalysis, jobs, activity } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";

export default function DashboardHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const topJobs = jobs.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome + upload CTA */}
      <GlassCard variant="strong" className="p-7 md:p-9 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-brand-gradient-soft rounded-full blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-ink">
              Welcome back, {user?.name || "there"} 👋
            </h2>
            <p className="text-ink/55 mt-2 max-w-md">
              Your resume is scoring well. Let's find what's standing between you and
              your next interview.
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={Upload}
            onClick={() => navigate("/app/resume-analyzer")}
          >
            Upload resume
          </Button>
        </div>
      </GlassCard>

      {/* Stat row */}
      <div className="grid sm:grid-cols-3 gap-5">
        <GlassCard hover className="p-6 flex items-center gap-4" delay={0.05}>
          <ScoreRing value={resumeAnalysis.score} size={72} label="" />
          <div>
            <p className="text-xs text-ink/45 font-medium">ATS Score</p>
            <p className="font-heading font-bold text-lg text-ink">Excellent</p>
          </div>
        </GlassCard>

        <GlassCard hover className="p-6" delay={0.1}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft flex items-center justify-center">
              <Briefcase size={18} className="text-primary-600" />
            </div>
            <p className="text-xs text-ink/45 font-medium">Top job match</p>
          </div>
          <p className="font-heading font-bold text-2xl text-ink">94%</p>
          <p className="text-xs text-ink/45 mt-1">Software Engineer · Nimbus Labs</p>
        </GlassCard>

        <GlassCard hover className="p-6" delay={0.15}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft flex items-center justify-center">
              <TrendingUp size={18} className="text-primary-600" />
            </div>
            <p className="text-xs text-ink/45 font-medium">Skills tracked</p>
          </div>
          <p className="font-heading font-bold text-2xl text-ink">8 / 11</p>
          <p className="text-xs text-ink/45 mt-1">3 gaps left for Full Stack role</p>
        </GlassCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Skill analysis */}
        <GlassCard className="p-7 lg:col-span-2" delay={0.1}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-bold text-lg text-ink">Skill Analysis</h3>
            <Sparkles size={18} className="text-primary-500" />
          </div>
          <div className="space-y-4">
            {resumeAnalysis.breakdown.map((item, i) => (
              <ProgressBar key={item.label} label={item.label} value={item.value} delay={i * 0.1} />
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {resumeAnalysis.strengths.slice(0, 3).map((s) => (
              <Badge key={s} tone="success" icon>
                {s}
              </Badge>
            ))}
            {resumeAnalysis.missing.map((s) => (
              <Badge key={s} tone="danger" icon>
                {s}
              </Badge>
            ))}
          </div>
        </GlassCard>

        {/* Recent activity */}
        <GlassCard className="p-7" delay={0.15}>
          <h3 className="font-heading font-bold text-lg text-ink mb-5">Recent Activity</h3>
          <div className="space-y-4">
            {activity.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm text-ink/75 leading-snug">{a.text}</p>
                  <p className="text-xs text-ink/40 mt-0.5">{a.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recommended jobs */}
      <GlassCard className="p-7" delay={0.2}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-heading font-bold text-lg text-ink">Recommended Jobs</h3>
          <button
            onClick={() => navigate("/app/job-match")}
            className="text-sm font-semibold text-primary-600 flex items-center gap-1 hover:gap-1.5 transition-all"
          >
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {topJobs.map((job, i) => (
            <GlassCard
              key={job.id}
              variant="soft"
              hover
              delay={0.05 * i}
              className="p-5"
              onClick={() => navigate("/app/job-match")}
            >
              <div className="flex items-center justify-between mb-2">
                <Badge tone="brand">{job.match}% match</Badge>
              </div>
              <h4 className="font-heading font-bold text-ink">{job.title}</h4>
              <p className="text-xs text-ink/45 mt-0.5">{job.company}</p>
            </GlassCard>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
