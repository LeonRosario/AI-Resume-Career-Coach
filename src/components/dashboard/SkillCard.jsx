import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import Badge from "../ui/Badge";

export default function SkillCard({ title, skills, tone }) {
  return (
    <GlassCard className="p-6 shadow-glass" variant="soft">
      <h4 className="font-heading mb-4 font-bold text-ink">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.25 }}
          >
            <Badge tone={tone} icon>
              {skill}
            </Badge>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
