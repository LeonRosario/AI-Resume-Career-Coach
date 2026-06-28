import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, TrendingUp } from "lucide-react";
import ScoreRing from "../ui/ScoreRing";

export default function AuthVisual() {
  return (
    <div className="relative">
      <motion.div
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="glass rounded-glass p-8 shadow-glass-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-semibold text-ink/70">Your career snapshot</span>
          <Sparkles size={18} className="text-primary-500" />
        </div>

        <div className="flex items-center gap-6">
          <ScoreRing value={92} size={110} label="Resume" />
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 text-sm text-ink/65">
              <TrendingUp size={15} className="text-emerald-500" />
              94% match on 12 saved jobs
            </div>
            <div className="flex items-center gap-2 text-sm text-ink/65">
              <CheckCircle2 size={15} className="text-emerald-500" />
              3 skills gaps mapped
            </div>
            <div className="flex items-center gap-2 text-sm text-ink/65">
              <CheckCircle2 size={15} className="text-emerald-500" />
              2 mock interviews scored
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="glass-strong rounded-2xl px-5 py-4 shadow-glass-lg mt-5 ml-10 max-w-xs"
      >
        <p className="text-sm font-medium text-ink/75 leading-relaxed">
          "I rewrote two bullet points after CareerAI's feedback and started getting callbacks
          the same week."
        </p>
        <p className="text-xs text-ink/45 mt-3">— Maya Chen, Software Engineer</p>
      </motion.div>
    </div>
  );
}
