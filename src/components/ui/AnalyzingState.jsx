import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AnalyzingState({ label = "Analyzing your resume..." }) {
  return (
    <div className="glass rounded-glass p-10 flex flex-col items-center text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-glow mb-5"
      >
        <Sparkles size={24} className="text-white" />
      </motion.div>
      <p className="font-heading font-bold text-ink mb-4">{label}</p>
      <div className="w-full max-w-xs space-y-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="skeleton h-3 rounded-lg" style={{ width: `${90 - i * 15}%`, margin: "0 auto" }} />
        ))}
      </div>
    </div>
  );
}
