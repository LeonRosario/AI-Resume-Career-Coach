import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target, CheckCircle2, XCircle,
  Wand2, Scan, TrendingUp,
} from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import ScoreRing from "../../components/ui/ScoreRing";
import AnalyzingState from "../../components/ui/AnalyzingState";
import { atsResult } from "../../data/mockData";

const placeholder = `e.g. "We're looking for a Full Stack Developer with 3+ years of experience in React, Node.js, and SQL. Familiarity with AWS and Docker is a plus..."`;

export default function AtsChecker() {
  const [jd, setJd]         = useState("");
  const [status, setStatus] = useState("idle"); // idle | analyzing | done

  const handleAnalyze = () => {
    if (!jd.trim()) return;
    setStatus("analyzing");
    setTimeout(() => setStatus("done"), 1900);
  };

  const handleReset = () => {
    setJd("");
    setStatus("idle");
  };

  return (
    <div className="space-y-5">

      {/* Input card */}
      <GlassCard className="p-7" accent>
        <div className="flex items-start gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft border border-primary-100 flex items-center justify-center shrink-0">
            <Target size={18} className="text-primary-600" />
          </div>
          <div>
            <h2 className="font-heading text-xl text-ink">Paste Job Description</h2>
            <p className="text-sm text-muted mt-0.5">
              We'll compare it against your most recent resume and score the match.
            </p>
          </div>
        </div>

        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder={placeholder}
          rows={7}
          className="glass-input w-full rounded-xl p-4 text-sm text-ink placeholder:text-placeholder outline-none resize-none transition-all duration-200 focus:border-primary-400"
          style={{ lineHeight: 1.7 }}
        />

        <div className="flex items-center gap-3 mt-4">
          <Button
            variant="primary"
            icon={Scan}
            typewriter
            onClick={handleAnalyze}
            disabled={!jd.trim() || status === "analyzing"}
          >
            Analyze Match
          </Button>
          {status !== "idle" && (
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Reset
            </Button>
          )}
          <span className="text-xs text-muted ml-auto">
            {jd.length > 0 && `${jd.trim().split(/\s+/).length} words`}
          </span>
        </div>
      </GlassCard>

      {/* Results */}
      <AnimatePresence mode="wait">
        {status === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AnalyzingState label="Comparing your resume to this role..." />
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
            {/* Match score */}
            <GlassCard variant="strong" className="p-7 md:p-9" accent>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <ScoreRing
                  value={atsResult.matchScore}
                  size={160}
                  stroke={11}
                  label="Match Score"
                  showToneLabel
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={18} className="text-emerald-500" />
                    <h3 className="font-heading text-xl text-ink">Strong match for this role</h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed max-w-md">
                    Your resume covers most of the core requirements. Add the missing
                    skills below to push past 90% and stand out from other applicants.
                  </p>

                  {/* Mini stat pills */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="brand-pill text-[10px]">
                      ✓ {atsResult.matched.length} skills matched
                    </span>
                    <span className="brand-pill brand-pill-violet text-[10px]">
                      ✗ {atsResult.missing.length} skills missing
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Matched & Missing */}
            <div className="grid md:grid-cols-2 gap-5">
              <GlassCard className="p-6">
                <h4 className="font-heading text-base text-ink mb-4 flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-emerald-500" />
                  Matched Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {atsResult.matched.map((s) => (
                    <Badge key={s} tone="success" icon size="md">{s}</Badge>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h4 className="font-heading text-base text-ink mb-4 flex items-center gap-2">
                  <XCircle size={17} className="text-red-500" />
                  Missing Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {atsResult.missing.map((s) => (
                    <Badge key={s} tone="danger" icon size="md">{s}</Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" icon={Wand2} className="mt-5">
                  Add these to my roadmap
                </Button>
              </GlassCard>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
