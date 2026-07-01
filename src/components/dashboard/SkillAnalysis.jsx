import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SkillCard from "./SkillCard";
import LearningRoadmap from "./LearningRoadmap";
import { getRoleProgress } from "../../data/roadmapData";

export default function SkillAnalysis({ role, roleData }) {
  const [expandedStep, setExpandedStep] = useState(null);
  const progress = getRoleProgress(roleData);

  useEffect(() => {
    setExpandedStep(null);
  }, [role]);

  const handleToggleStep = (stepNumber) => {
    setExpandedStep((current) => (current === stepNumber ? null : stepNumber));
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr,1.2fr]">
      {/* Left: skill cards */}
      <div className="grid auto-rows-min gap-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${role}-skills`}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 14 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-5"
          >
            <SkillCard title="Current Skills"  skills={roleData.current} tone="success" />
            <SkillCard title="Missing Skills"  skills={roleData.missing} tone="danger" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right: roadmap */}
      <LearningRoadmap
        role={role}
        roadmap={roleData.roadmap}
        progress={progress}
        expandedStep={expandedStep}
        onToggleStep={handleToggleStep}
      />
    </div>
  );
}
