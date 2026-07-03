import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function SkillChip({ label, onRemove, color = "primary" }) {
  const colors = {
    primary: "bg-primary-50 text-primary-700 border-primary-200",
    violet: "bg-violet-50 text-violet-700 border-violet-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    sky: "bg-sky-50 text-sky-700 border-sky-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
    slate: "bg-slate-50 text-slate-600 border-slate-200",
  };
  const c = colors[color] || colors.primary;

  return (
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.2 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${c}`}
    >
      {label}
      {onRemove && (
        <button
          onClick={() => onRemove(label)}
          className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
        >
          <X size={10} strokeWidth={2.5} />
        </button>
      )}
    </motion.span>
  );
}
