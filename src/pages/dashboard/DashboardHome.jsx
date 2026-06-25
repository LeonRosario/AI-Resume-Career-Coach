import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, FileSearch, Briefcase, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import ProgressBar from "../../components/ui/ProgressBar";
import ScoreRing from "../../components/ui/ScoreRing";
import Badge from "../../components/ui/Badge";
import { SkeletonLine, SkeletonCircle } from "../../components/ui/Skeleton";
import { jobs } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import { useResume } from "../../context/ResumeContext";

export default function DashboardHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { resumeData } = useResume();

  const topJobs = jobs.slice(0, 3);
  const hasResume = resumeData.hasAnalysis;

  // Determine status text color
  const getStatusColor = (score) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="space-y-6">
      {/* Welcome + upload CTA */}
      <GlassCard variant="strong" className="p-7 md:p-9 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-brand-gradient-soft rounded-full blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-ink">
              Welcome back, {user?.name || "there"}
            </h2>
            <p className="text-ink/55 mt-2 max-w-md">
              {hasResume
                ? "Your resume is scoring well. Let's find what's standing between you and your next interview."
                : "Upload your resume to get started with AI-powered career analysis."}
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
        {/* ATS Score */}
        <GlassCard hover className="p-6 flex items-center gap-4" delay={0.05}>
          {hasResume ? (
            <>
              <ScoreRing value={resumeData.atsScore} size={72} label="" />
              <div>
                <p className="text-xs text-ink/45 font-medium">ATS Score</p>
                <p className="font-heading font-bold text-lg text-ink">
                  {getStatusColor(resumeData.atsScore)}
                </p>
              </div>
            </>
          ) : (
            <>
              <SkeletonCircle size={72} />
              <div className="flex-1">
                <SkeletonLine className="w-20 mb-2" />
                <SkeletonLine className="w-24" />
              </div>
            </>
          )}
        </GlassCard>

        {/* Top Job Match */}
        <GlassCard hover className="p-6" delay={0.1}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft flex items-center justify-center">
              <Briefcase size={18} className="text-primary-600" />
            </div>
            <p className="text-xs text-ink/45 font-medium">Top job match</p>
          </div>
          {hasResume ? (
            <>
              <p className="font-heading font-bold text-2xl text-ink">{resumeData.jobMatch}%</p>
              <p className="text-xs text-ink/45 mt-1">
                {resumeData.topJobTitle || "—"} · {resumeData.topJobCompany || "—"}
              </p>
            </>
          ) : (
            <>
              <SkeletonLine className="w-16 h-7 mb-2" />
              <SkeletonLine className="w-32 h-3 mt-3" />
            </>
          )}
        </GlassCard>

        {/* Skills Tracked */}
        <GlassCard hover className="p-6" delay={0.15}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft flex items-center justify-center">
              <TrendingUp size={18} className="text-primary-600" />
            </div>
            <p className="text-xs text-ink/45 font-medium">Skills tracked</p>
          </div>
          {hasResume ? (
            <>
              <p className="font-heading font-bold text-2xl text-ink">
                {resumeData.skillsTracked} / {resumeData.totalSkills}
              </p>
              <p className="text-xs text-ink/45 mt-1">
                {resumeData.totalSkills - resumeData.skillsTracked} gaps identified
              </p>
            </>
          ) : (
            <>
              <SkeletonLine className="w-16 h-7 mb-2" />
              <SkeletonLine className="w-32 h-3 mt-3" />
            </>
          )}
        </GlassCard>
      </div>

      {/* Skill Analysis + Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Skill analysis */}
        <GlassCard className="p-7 lg:col-span-2" delay={0.1}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-bold text-lg text-ink">Skill Analysis</h3>
            <Sparkles size={18} className="text-primary-500" />
          </div>

          {hasResume ? (
            <>
              <div className="space-y-4">
                {[
                  { label: "Formatting", value: resumeData.analysis.formatting },
                  { label: "Keyword Match", value: resumeData.analysis.keywords },
                  { label: "Impact Statements", value: resumeData.analysis.impact },
                  { label: "ATS Compatibility", value: resumeData.analysis.ats },
                ].map((item, i) => (
                  <ProgressBar key={item.label} label={item.label} value={item.value} delay={i * 0.1} />
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {resumeData.strengths.map((s) => (
                  <Badge key={s} tone="success" icon>
                    {s}
                  </Badge>
                ))}
                {resumeData.missing.map((s) => (
                  <Badge key={s} tone="danger" icon>
                    {s}
                  </Badge>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="text-center py-8">
                <p className="text-sm text-ink/50">No resume uploaded yet</p>
                <p className="text-xs text-ink/35 mt-1">Upload your resume to see skill analysis</p>
              </div>
            </div>
          )}
        </GlassCard>

        {/* Recent activity */}
        <GlassCard className="p-7" delay={0.15}>
          <h3 className="font-heading font-bold text-lg text-ink mb-5">Recent Activity</h3>

          {hasResume ? (
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-3"
              >
                <span className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm text-ink/75 leading-snug">Resume analyzed successfully</p>
                  <p className="text-xs text-ink/40 mt-0.5">Just now</p>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm text-ink/50">No resume uploaded yet</p>
              <p className="text-xs text-ink/35 mt-1">Upload your resume to start analysis</p>
            </div>
          )}
        </GlassCard>
      </div>

      {/* Recommended jobs - only show if resume analyzed */}
      {hasResume && (
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
      )}
    </div>
  );
}
