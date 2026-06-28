import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, RefreshCw, CheckCircle2, XCircle } from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";
import DropzoneUpload from "../../components/ui/DropzoneUpload";
import AnalyzingState from "../../components/ui/AnalyzingState";
import ScoreRing from "../../components/ui/ScoreRing";
import ProgressBar from "../../components/ui/ProgressBar";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { useResume } from "../../context/ResumeContext";
import { useAuth } from "../../context/AuthContext";
import { uploadResume } from "../../lib/api";

export default function ResumeAnalyzer() {
  const { resumeData, updateResumeData, clearResumeData } = useResume();
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | analyzing | done
  const [error, setError] = useState("");

  const handleFile = async (f) => {
    setFile(f);
    setStatus("analyzing");
    setError("");

    const formData = new FormData();
    formData.append("file", f);

    try {
      const result = await uploadResume(formData, token);
      const score = result.analysis.ats_score ?? 0;
      const breakdownValue = Math.round(score);

      updateResumeData({
        atsScore: score,
        status: score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs improvement",
        jobMatch: score,
        topJobTitle: "Resume Analysis",
        topJobCompany: "CareerAI",
        skillsTracked: result.analysis.strengths.length,
        totalSkills: result.analysis.strengths.length + result.analysis.weaknesses.length,
        analysis: {
          formatting: breakdownValue,
          keywords: breakdownValue,
          impact: breakdownValue,
          ats: breakdownValue,
        },
        strengths: result.analysis.strengths,
        missing: result.analysis.weaknesses,
      });
      setStatus("done");
    } catch (err) {
      setError(err.message || "Unable to analyze resume.");
      setStatus("idle");
    }
  };

  const handleClear = () => {
    setFile(null);
    setStatus("idle");
    clearResumeData();
    setError("");
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-7">
        <h2 className="font-heading font-bold text-lg text-ink mb-1">Upload your resume</h2>
        <p className="text-sm text-body mb-5">
          We'll score it for ATS compatibility and flag what to improve.
        </p>
        <DropzoneUpload file={status === "idle" ? null : file} onFile={handleFile} onClear={handleClear} />
        {error && <p className="text-sm text-rose-500 mt-4">{error}</p>}
      </GlassCard>

      <AnimatePresence mode="wait">
        {status === "analyzing" && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AnalyzingState />
          </motion.div>
        )}

        {status === "done" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <GlassCard variant="strong" className="p-7 md:p-9">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <ScoreRing value={resumeData.atsScore} size={170} label="Resume Score" />
                <div className="flex-1 w-full">
                  <h3 className="font-heading font-bold text-xl text-ink mb-1">
                    {resumeData.status} — a few quick wins left
                  </h3>
                  <p className="text-sm text-body mb-5">
                    {file?.name || "Your resume"} scores {resumeData.atsScore} on ATS compatibility.
                  </p>
                  <div className="space-y-3">
                    {Object.entries(resumeData.analysis).map(([label, value], i) => (
                      <ProgressBar key={label} label={label} value={value} delay={i * 0.1} />
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            <div className="grid md:grid-cols-2 gap-5">
              <GlassCard className="p-6">
                <h4 className="font-heading font-bold text-ink mb-4 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500" /> Strengths
                </h4>
                <div className="flex flex-wrap gap-2">
                  {resumeData.strengths.map((s) => (
                    <Badge key={s} tone="success" icon>
                      {s}
                    </Badge>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h4 className="font-heading font-bold text-ink mb-4 flex items-center gap-2">
                  <XCircle size={18} className="text-rose-500" /> Missing Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {resumeData.missing.map((s) => (
                    <Badge key={s} tone="danger" icon>
                      {s}
                    </Badge>
                  ))}
                </div>
              </GlassCard>
            </div>

            <GlassCard className="p-7">
              <h4 className="font-heading font-bold text-ink mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-primary-500" /> AI Suggestions
              </h4>
              <div className="space-y-3">
                {resumeData.missing.length === 0 && resumeData.strengths.length === 0 ? (
                  <p className="text-sm text-body">No analysis details are available yet.</p>
                ) : (
                  resumeData.strengths.map((s, i) => (
                    <motion.div
                      key={`${s}-${i}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-soft rounded-2xl p-4 text-sm text-label leading-relaxed"
                    >
                      {s}
                    </motion.div>
                  ))
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button variant="primary" icon={Wand2}>
                  Apply AI improvements
                </Button>
                <Button variant="glass" icon={RefreshCw} onClick={handleClear}>
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
