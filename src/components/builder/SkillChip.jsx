import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function SkillChip({ label, onRemove, color = "primary" }) {
  const colors = {
    primary: "bg-primary-50/80 text-primary-700 border-primary-200/60",
    violet: "bg-violet-50/80 text-violet-700 border-violet-200/60",
    emerald: "bg-emerald-50/80 text-emerald-700 border-emerald-200/60",
    amber: "bg-amber-50/80 text-amber-700 border-amber-200/60",
    sky: "bg-sky-50/80 text-sky-700 border-sky-200/60",
    rose: "bg-rose-50/80 text-rose-700 border-rose-200/60",
    slate: "bg-slate-50/80 text-slate-600 border-slate-200/60",
  };
  const c = colors[color] || colors.primary;

  return (
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-medium border shadow-sm ${c}`}
    >
      {label}
      {onRemove && (
        <button
          onClick={() => onRemove(label)}
          className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors"
        >
          <X size={9} strokeWidth={2.5} />
        </button>
      )}
    </motion.span>
  );
}
