import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, ChevronDown } from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";
import SkillAnalysis from "../../components/dashboard/SkillAnalysis";
import { roadmapData, roleOptions, getRoleData } from "../../data/roadmapData";

export default function SkillGap() {
  const [role, setRole] = useState(roadmapData.defaultRole);
  const roleData = getRoleData(role);

  return (
    <div className="space-y-5">

      {/* Role selector */}
      <GlassCard className="p-6" accent>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft border border-primary-100 flex items-center justify-center shrink-0">
              <Map size={18} className="text-primary-600" />
            </div>
            <div>
              <h2 className="font-heading text-xl text-ink">Skill Gap Analysis</h2>
              <p className="text-sm text-muted mt-0.5">
                Select your target role to see what you're missing
              </p>
            </div>
          </div>

          {/* Custom styled select */}
          <div className="relative min-w-[220px]">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="glass-input w-full rounded-xl py-2.5 pl-4 pr-10 text-sm font-medium text-ink outline-none appearance-none cursor-pointer"
            >
              {roleOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <ChevronDown
              size={15}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />
          </div>
        </div>
      </GlassCard>

      {/* Skill analysis */}
      <AnimatePresence mode="wait">
        <motion.div
          key={role}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <SkillAnalysis role={role} roleData={roleData} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
