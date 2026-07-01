import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Wand2, RefreshCw,
  CheckCircle2, XCircle, TrendingUp,
} from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";
import DropzoneUpload from "../../components/ui/DropzoneUpload";
import AnalyzingState from "../../components/ui/AnalyzingState";
import ScoreRing from "../../components/ui/ScoreRing";
import ProgressBar from "../../components/ui/ProgressBar";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { resumeAnalysis } from "../../data/mockData";
import { useResume } from "../../context/ResumeContext";

export default function ResumeAnalyzer() {
  const { updateResumeData, clearResumeData } = useResume();
  const [file, setFile]     = useState(null);
  const [status, setStatus] = useState("idle"); // idle | analyzing | done

  const handleFile = (f) => {
    setFile(f);
    setStatus("analyzing");
    setTimeout(() => {
      updateResumeData({
        atsScore:       resumeAnalysis.score,
        status:         "Excellent",
        jobMatch:       94,
        topJobTitle:    "Software Engineer",
        topJobCompany:  "Nimbus Labs",
        skillsTracked:  resumeAnalysis.strengths.length,
        totalSkills:    resumeAnalysis.strengths.length + resumeAnalysis.missing.length,
        analysis: {
          formatting: resumeAnalysis.breakdown[0].value,
          keywords:   resumeAnalysis.breakdown[1].value,
          impact:     resumeAnalysis.breakdown[2].value,
          ats:        resumeAnalysis.breakdown[3].value,
        },
        strengths: resumeAnalysis.strengths,
        missing:   resumeAnalysis.missing,
      });
      setStatus("done");
    }, 2400);
  };

  const handleClear = () => {
    setFile(null);
    setStatus("idle");
    clearResumeData();
  };

  return (
    <div className="space-y-5">

      {/* Upload card */}
      <GlassCard className="p-7" accent>
        <div className="mb-5">
          <h2 className="font-heading text-xl text-ink">Upload your resume</h2>
          <p className="text-sm text-muted mt-1">
            We'll score it for ATS compatibility and flag exactly what to improve.
          </p>
        </div>
        <DropzoneUpload
          file={status === "idle" ? null : file}
          onFile={handleFile}
          onClear={handleClear}
        />
      </GlassCard>

      {/* Analyzing / Results */}
      <AnimatePresence mode="wait">
        {status === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AnalyzingState />
          </motion.div>
        )}

        {status === "done" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            {/* Score overview */}
            <GlassCard variant="strong" className="p-7 md:p-9" accent>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <ScoreRing
                  value={resumeAnalysis.score}
                  size={160}
                  stroke={11}
                  label="Resume Score"
                  showToneLabel
                />
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp size={18} className="text-emerald-500" />
                    <h3 className="font-heading text-xl text-ink">
                      Strong resume — a few quick wins left
                    </h3>
                  </div>
                  <p className="text-sm text-muted mb-6">
                    {file?.name ?? "Your resume"} scores above 90% of candidates for this role tier.
                  </p>
                  <div className="space-y-3.5">
                    {resumeAnalysis.breakdown.map((item, i) => (
                      <ProgressBar
                        key={item.label}
                        label={item.label}
                        value={item.value}
                        delay={i * 0.1}
                        size="md"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Strengths & Missing */}
            <div className="grid md:grid-cols-2 gap-5">
              <GlassCard className="p-6">
                <h4 className="font-heading text-base text-ink mb-4 flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-emerald-500" />
                  Strengths
                </h4>
                <div className="flex flex-wrap gap-2">
                  {resumeAnalysis.strengths.map((s) => (
                    <Badge key={s} tone="success" icon size="md">{s}</Badge>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h4 className="font-heading text-base text-ink mb-4 flex items-center gap-2">
                  <XCircle size={17} className="text-red-500" />
                  Missing Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {resumeAnalysis.missing.map((s) => (
                    <Badge key={s} tone="danger" icon size="md">{s}</Badge>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* AI Suggestions */}
            <GlassCard className="p-7">
              <h4 className="font-heading text-base text-ink mb-5 flex items-center gap-2">
                <Sparkles size={17} className="text-primary-500" />
                AI Suggestions
              </h4>
              <div className="space-y-3">
                {resumeAnalysis.suggestions.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12 }}
                    className="flex items-start gap-3.5 glass-soft rounded-xl p-4"
                  >
                    <span className="w-5 h-5 rounded-full bg-brand-gradient-soft border border-primary-100 flex items-center justify-center text-primary-600 text-[10px] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-body leading-relaxed">{s}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-5 border-t border-slate-100">
                <Button variant="primary" icon={Wand2}>
                  Apply AI improvements
                </Button>
                <Button variant="secondary" icon={RefreshCw} onClick={handleClear}>
                  Analyze another resume
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
