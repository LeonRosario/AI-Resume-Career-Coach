import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, CheckCircle2, XCircle, Wand2 } from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import ScoreRing from "../../components/ui/ScoreRing";
import AnalyzingState from "../../components/ui/AnalyzingState";
import { atsResult } from "../../data/mockData";

const placeholder = `e.g. "We're looking for a Full Stack Developer with 3+ years of experience in React, Node.js, and SQL. Familiarity with AWS and Docker is a plus..."`;

export default function AtsChecker() {
  const [jd, setJd] = useState("");
  const [status, setStatus] = useState("idle"); // idle | analyzing | done

  const handleAnalyze = () => {
    if (!jd.trim()) return;
    setStatus("analyzing");
    setTimeout(() => setStatus("done"), 1800);
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-7">
        <div className="flex items-center gap-2 mb-1">
          <Target size={20} className="text-primary-600" />
          <h2 className="font-heading font-bold text-lg text-ink">Paste Job Description</h2>
        </div>
        <p className="text-sm text-muted mb-5">
          We'll compare it against your most recent resume and score the match.
        </p>

        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder={placeholder}
          rows={7}
          className="glass-input w-full rounded-2xl p-4 text-sm text-ink placeholder:text-placeholder outline-none focus:ring-2 focus:ring-primary-400/60 resize-none transition-shadow"
        />

        <Button
          variant="primary"
          className="mt-4"
          onClick={handleAnalyze}
          disabled={!jd.trim() || status === "analyzing"}
        >
          Analyze Match
        </Button>
      </GlassCard>

      <AnimatePresence mode="wait">
        {status === "analyzing" && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AnalyzingState label="Comparing your resume to this role..." />
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
            <GlassCard variant="strong" className="p-7 md:p-9 flex flex-col md:flex-row items-center gap-8">
              <ScoreRing value={atsResult.matchScore} size={170} label="Match Score" />
              <div className="flex-1">
                <h3 className="font-heading font-bold text-xl text-ink mb-2">
                  Strong match for this role
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Your resume covers most of the core requirements. Add the missing
                  skills below to push past 90%.
                </p>
              </div>
            </GlassCard>

            <div className="grid md:grid-cols-2 gap-5">
              <GlassCard className="p-6">
                <h4 className="font-heading font-bold text-ink mb-4 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500" /> Matched
                </h4>
                <div className="flex flex-wrap gap-2">
                  {atsResult.matched.map((s) => (
                    <Badge key={s} tone="success" icon>
                      {s}
                    </Badge>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h4 className="font-heading font-bold text-ink mb-4 flex items-center gap-2">
                  <XCircle size={18} className="text-rose-500" /> Missing
                </h4>
                <div className="flex flex-wrap gap-2">
                  {atsResult.missing.map((s) => (
                    <Badge key={s} tone="danger" icon>
                      {s}
                    </Badge>
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
