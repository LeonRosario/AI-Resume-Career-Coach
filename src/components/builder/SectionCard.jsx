import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const colorMap = {
    primary: { bg: "bg-primary-50", text: "text-primary-600", border: "border-primary-100" },
    violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-100" },
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
    indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-100" },
    amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
    rose: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100" },
    sky: { bg: "bg-sky-50", text: "text-sky-600", border: "border-sky-100" },
    slate: { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-100" },
  };
  const c = colorMap[color] || colorMap.primary;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-2xl overflow-hidden"
    >
      <div
        className="flex items-start justify-between p-5 cursor-pointer select-none"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-start gap-3.5">
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${c.bg} ${c.border}`}>
            <Icon size={17} className={c.text} />
          </div>
          <div>
            <h3 className="font-heading text-lg text-ink leading-tight">{title}</h3>
            {description && (
              <p className="text-xs text-muted mt-0.5">{description}</p>
            )}
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-ink hover:bg-white/50 transition-all shrink-0"
        >
          {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
      </div>

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
            <div className="px-5 pb-5 space-y-4">{children}</div>

            {actions && actions.length > 0 && (
              <div className="px-5 pb-5 flex flex-wrap gap-2">
                {actions}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
