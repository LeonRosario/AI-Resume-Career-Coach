import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Circle, CheckCircle2, Clock } from "lucide-react";
import Badge from "../ui/Badge";

const statusConfig = {
  not_started: { label: "Not started", tone: "neutral",  Icon: Circle },
  in_progress:  { label: "In progress", tone: "warning",  Icon: Clock },
  completed:    { label: "Completed",   tone: "success",  Icon: CheckCircle2 },
};

export default function RoadmapCard({ step, expanded, onToggle, index = 0 }) {
  const cfg = statusConfig[step.status] ?? statusConfig.not_started;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Vertical connector */}
      {index > 0 && (
        <div
          className="absolute -top-4 left-5 w-px h-4 roadmap-connector"
          aria-hidden="true"
        />
      )}

      <motion.button
        type="button"
        onClick={onToggle}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.995 }}
        className={[
          "w-full rounded-[18px] border text-left transition-all duration-200",
          expanded
            ? "border-primary-200 bg-white shadow-glass-md"
            : "border-slate-200/80 bg-white/70 shadow-card hover:shadow-glass hover:border-primary-200/50",
          "backdrop-blur-[20px] p-5",
        ].join(" ")}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Step number */}
            <span
              className={[
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold border transition-all",
                expanded
                  ? "bg-brand-gradient text-white border-transparent shadow-glow-sm"
                  : "bg-slate-50 border-slate-200 text-muted",
              ].join(" ")}
            >
              {step.step}
            </span>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary-500 mb-0.5">
                {step.week ?? `Step ${step.step}`}
              </p>
              <h4 className="font-heading text-base text-ink leading-tight">{step.title}</h4>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 mt-0.5">
            {step.status !== "not_started" && (
              <Badge tone={cfg.tone} size="sm">{cfg.label}</Badge>
            )}
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.22 }}
              className="text-muted"
            >
              <ChevronDown size={17} />
            </motion.span>
          </div>
        </div>

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 border-t border-slate-100 pt-4 pl-14">
                {step.description && (
                  <p className="text-sm leading-relaxed text-muted">{step.description}</p>
                )}
                {step.topics?.length > 0 && (
                  <div className={step.description ? "mt-4" : ""}>
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-placeholder">
                      Topics covered
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.topics.map((topic) => (
                        <span
                          key={topic}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary-400 shrink-0" />
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}
