import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

export default function SkillGapRoadmap({ role, roadmap }) {
  return (
    <GlassCard className="p-7">
      <h3 className="font-heading font-bold text-lg text-ink mb-1">AI Learning Roadmap</h3>
      <p className="text-sm text-muted mb-6">
        A focused plan to become job-ready for {role} in 4 weeks.
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={role}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="relative"
        >
          <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-[rgba(0,132,255,0.1)]" />

          <div className="space-y-5">
            {roadmap.map((item, i) => (
              <motion.div
                key={item.week}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.28 }}
                className="relative flex gap-4"
              >
                <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 glass-soft shadow-sm">
                  {item.done ? (
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  ) : (
                    <Circle size={18} className="text-primary-400" />
                  )}
                </div>
                <div className="glass-soft rounded-2xl p-4 flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold text-primary-600 tracking-wide uppercase">
                      {item.week}
                    </span>
                    {item.done && <Badge tone="success">Complete</Badge>}
                  </div>
                  <h4 className="font-heading font-bold text-ink mt-1">{item.title}</h4>
                  {item.detail && <p className="text-sm text-muted mt-1">{item.detail}</p>}
                  {Array.isArray(item.details) && (
                    <ul className="mt-3 space-y-1 text-sm text-muted list-disc list-inside">
                      {item.details.map((entry) => (
                        <li key={entry}>{entry}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <Button variant="primary" className="mt-7">
        Start this roadmap
      </Button>
    </GlassCard>
  );
}
