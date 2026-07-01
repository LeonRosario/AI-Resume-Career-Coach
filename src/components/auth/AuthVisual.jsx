import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";
import ScoreRing from "../ui/ScoreRing";

const features = [
  { icon: TrendingUp, text: "94% match on 12 saved jobs",    color: "text-emerald-500" },
  { icon: CheckCircle2, text: "3 skill gaps mapped + roadmap", color: "text-emerald-500" },
  { icon: Zap,         text: "2 mock interviews scored 9.2",  color: "text-primary-500" },
];

export default function AuthVisual() {
  return (
    <div className="relative pl-4">
      {/* Glow blob */}
      <div
        className="absolute -inset-8 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 70%)", filter: "blur(40px)" }}
        aria-hidden="true"
      />

      {/* Career snapshot card */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="glass-strong rounded-[24px] p-7 shadow-glass-xl relative"
      >
        {/* Accent top bar */}
        <div
          className="absolute inset-x-0 top-0 h-[2px] rounded-t-[24px]"
          style={{ background: "linear-gradient(90deg, #2563EB, #6366F1, #7C3AED)" }}
          aria-hidden="true"
        />

        <div className="flex items-center justify-between mb-5">
          <span className="text-sm font-semibold text-body">Your career snapshot</span>
          <span className="flex items-center gap-1.5 text-xs text-primary-600 font-medium">
            <Sparkles size={13} /> AI Powered
          </span>
        </div>

        <div className="flex items-center gap-5">
          <ScoreRing value={92} size={100} stroke={8} label="Resume" />
          <div className="space-y-2.5 flex-1">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-2 text-sm text-body"
              >
                <f.icon size={14} className={f.color} strokeWidth={2.2} />
                {f.text}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Testimonial card */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="glass rounded-[20px] px-6 py-5 shadow-glass-lg mt-5 ml-8 max-w-sm"
      >
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-amber-400 text-xs">★</span>
          ))}
        </div>
        <p className="text-sm text-body leading-relaxed">
          "I rewrote two bullet points after CareerAI's feedback and started getting callbacks
          the same week."
        </p>
        <div className="flex items-center gap-2 mt-3">
          <div className="w-7 h-7 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xs font-bold">M</div>
          <div>
            <p className="text-xs font-semibold text-ink">Maya Chen</p>
            <p className="text-[11px] text-muted">Software Engineer</p>
          </div>
        </div>
      </motion.div>

      {/* Shield badge */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -right-4 top-20 glass rounded-2xl px-4 py-3 shadow-glass-md"
      >
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-emerald-500" />
          <div>
            <p className="text-xs font-semibold text-ink">ATS Verified</p>
            <p className="text-[10px] text-muted">92% pass rate</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
