import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Badge from "../ui/Badge";

const statusConfig = {
  not_started: { label: "Not Started", tone: "neutral" },
  in_progress: { label: "In Progress", tone: "warning" },
  completed: { label: "Completed", tone: "success" },
};

export default function RoadmapCard({ step, expanded, onToggle, index = 0 }) {
  const status = statusConfig[step.status] ?? statusConfig.not_started;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {index > 0 && (
        <div className="absolute -top-5 left-6 h-5 w-px bg-[rgba(0,132,255,0.12)]" aria-hidden="true" />
      )}

      <motion.button
        type="button"
        onClick={onToggle}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.995 }}
        className={`w-full rounded-[24px] border text-left transition-shadow duration-300 ${
          expanded
            ? "border-[rgba(0,132,255,0.3)] bg-white/60 shadow-glass-lg"
            : "border-[rgba(0,132,255,0.12)] bg-white/50 shadow-glass hover:shadow-glass-lg"
        } backdrop-blur-[30px] p-5`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[rgba(0,132,255,0.15)] bg-white/60 text-sm font-bold text-primary-600">
              {step.step}
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-600/80">
                {step.week ?? `Step ${step.step}`}
              </p>
              <h4 className="font-heading mt-0.5 text-base font-bold text-ink md:text-lg">
                {step.title}
              </h4>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {step.status !== "not_started" && <Badge tone={status.tone}>{status.label}</Badge>}
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-ink/40"
            >
              <ChevronDown size={18} />
            </motion.span>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 border-t border-[rgba(0,132,255,0.1)] pt-4 pl-14">
                {step.description && (
                  <p className="text-sm leading-relaxed text-ink/60">{step.description}</p>
                )}

                {step.topics?.length > 0 && (
                  <div className={step.description ? "mt-4" : ""}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink/45">
                      Topics
                    </p>
                    <ul className="space-y-1.5">
                      {step.topics.map((topic) => (
                        <li
                          key={topic}
                          className="flex items-center gap-2 text-sm text-ink/70"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                          {topic}
                        </li>
                      ))}
                    </ul>
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
