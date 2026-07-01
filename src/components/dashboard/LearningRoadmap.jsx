import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import ProgressBar from "../ui/ProgressBar";
import RoadmapCard from "./RoadmapCard";

export default function LearningRoadmap({ role, roadmap, progress, expandedStep, onToggleStep }) {
  return (
    <GlassCard className="p-6 md:p-7" variant="soft">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-heading text-lg text-ink">AI Learning Roadmap</h3>
          <p className="mt-1 text-sm text-muted leading-relaxed max-w-xs">
            Personalized plan for{" "}
            <span className="font-semibold text-primary-600">{role}</span>
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`progress-${role}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full sm:max-w-[210px]"
          >
            <ProgressBar
              completed={progress.completed}
              total={progress.total}
              label="Progress"
              size="md"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Roadmap steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={role}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
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
