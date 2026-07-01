import { motion } from "framer-motion";
import { Sparkles, Brain, Zap } from "lucide-react";

const steps = [
  { label: "Parsing document structure...", icon: Brain },
  { label: "Extracting skills & keywords...", icon: Zap },
  { label: "Running AI analysis...", icon: Sparkles },
];

export default function AnalyzingState({ label = "Analyzing your resume..." }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="glass-strong rounded-[24px] p-10 flex flex-col items-center text-center"
    >
      {/* Spinning icon */}
      <div className="relative mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-glow"
        >
          <Sparkles size={26} className="text-white" strokeWidth={2} />
        </motion.div>
        {/* Orbit ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-3 rounded-full border-2 border-dashed border-primary-300/40"
        />
      </div>

      <p className="font-heading text-xl text-ink mb-1">{label}</p>
      <p className="text-sm text-muted mb-7">This usually takes a few seconds</p>

      {/* Animated step list */}
      <div className="w-full max-w-xs space-y-3">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.4 }}
            className="flex items-center gap-3 glass-soft rounded-xl px-4 py-2.5"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
              className="w-6 h-6 rounded-lg bg-brand-gradient-soft border border-primary-100 flex items-center justify-center shrink-0"
            >
              <step.icon size={12} className="text-primary-600" />
            </motion.div>
            <span className="text-xs text-muted text-left">{step.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs mt-6">
        <div className="h-1.5 rounded-full bg-primary-100 overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="h-full rounded-full bg-brand-gradient"
          />
        </div>
      </div>
    </motion.div>
  );
}
