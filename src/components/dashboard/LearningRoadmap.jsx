import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import ProgressBar from "../ui/ProgressBar";
import RoadmapCard from "./RoadmapCard";

export default function LearningRoadmap({
  role,
  roadmap,
  progress,
  expandedStep,
  onToggleStep,
}) {
  return (
    <GlassCard className="p-6 shadow-glass md:p-7" variant="soft" delay={0.15}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-heading text-lg font-bold text-ink">AI Learning Roadmap</h3>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-body">
            A personalized roadmap to become job-ready for{" "}
            <span className="font-semibold text-primary-600">{role}</span>.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`progress-${role}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.3 }}
            className="w-full sm:max-w-[220px]"
          >
            <ProgressBar completed={progress.completed} total={progress.total} />
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={role}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5"
        >
          {roadmap.map((step, index) => (
            <RoadmapCard
              key={`${role}-${step.step}`}
              step={step}
              index={index}
              expanded={expandedStep === step.step}
              onToggle={() => onToggleStep(step.step)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </GlassCard>
  );
}
