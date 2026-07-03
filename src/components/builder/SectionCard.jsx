import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const colorMap = {
  primary: { iconBg: "bg-primary-50", iconText: "text-primary-600", iconBorder: "border-primary-200/60", accent: "from-primary-500/30 via-primary-400/20 to-transparent", dot: "bg-primary-500" },
  violet: { iconBg: "bg-violet-50", iconText: "text-violet-600", iconBorder: "border-violet-200/60", accent: "from-violet-500/30 via-violet-400/20 to-transparent", dot: "bg-violet-500" },
  emerald: { iconBg: "bg-emerald-50", iconText: "text-emerald-600", iconBorder: "border-emerald-200/60", accent: "from-emerald-500/30 via-emerald-400/20 to-transparent", dot: "bg-emerald-500" },
  indigo: { iconBg: "bg-indigo-50", iconText: "text-indigo-600", iconBorder: "border-indigo-200/60", accent: "from-indigo-500/30 via-indigo-400/20 to-transparent", dot: "bg-indigo-500" },
  amber: { iconBg: "bg-amber-50", iconText: "text-amber-600", iconBorder: "border-amber-200/60", accent: "from-amber-500/30 via-amber-400/20 to-transparent", dot: "bg-amber-500" },
  rose: { iconBg: "bg-rose-50", iconText: "text-rose-600", iconBorder: "border-rose-200/60", accent: "from-rose-500/30 via-rose-400/20 to-transparent", dot: "bg-rose-500" },
  sky: { iconBg: "bg-sky-50", iconText: "text-sky-600", iconBorder: "border-sky-200/60", accent: "from-sky-500/30 via-sky-400/20 to-transparent", dot: "bg-sky-500" },
  slate: { iconBg: "bg-slate-50", iconText: "text-slate-600", iconBorder: "border-slate-200/60", accent: "from-slate-500/20 via-slate-400/10 to-transparent", dot: "bg-slate-400" },
};

export default function SectionCard({
  icon: Icon,
  title,
  description,
  color = "primary",
  actions,
  children,
  defaultOpen = true,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const c = colorMap[color] || colorMap.primary;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="relative bg-white/80 backdrop-blur-xl rounded-[24px] border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Top accent gradient */}
        <div className={`absolute inset-x-0 top-0 h-[3px] rounded-t-[24px] bg-gradient-to-r ${c.accent}`} />

        {/* Header */}
        <div
          className="flex items-start justify-between px-6 pt-5 pb-4 cursor-pointer select-none"
          onClick={() => setOpen((o) => !o)}
        >
          <div className="flex items-start gap-4">
            <div className={`w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 mt-0.5 ${c.iconBg} ${c.iconBorder} border shadow-sm`}>
              <Icon size={18} className={c.iconText} />
            </div>
            <div className="pt-0.5">
              <h3 className="font-heading text-xl text-ink leading-tight tracking-tight">{title}</h3>
              {description && (
                <p className="text-sm text-muted/80 mt-0.5 font-normal leading-snug">{description}</p>
              )}
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 mt-1 ${
              open
                ? "bg-slate-100 text-slate-500"
                : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            }`}
          >
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ChevronDown size={16} strokeWidth={2} />
            </motion.div>
          </button>
        </div>

        {/* Body */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 space-y-5">{children}</div>

              {actions && (
                <div className="px-6 pb-6 flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                  {actions}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
