import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import Badge from "../ui/Badge";

export default function SkillCard({ title, skills, tone }) {
  const isSuccess = tone === "success";

  return (
    <GlassCard className="p-6" variant="soft">
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
          isSuccess
            ? "bg-emerald-50 border-emerald-100"
            : "bg-red-50 border-red-100"
        }`}>
          {isSuccess
            ? <CheckCircle2 size={15} className="text-emerald-600" />
            : <XCircle     size={15} className="text-red-500" />
          }
        </div>
        <h4 className="font-heading text-base text-ink">{title}</h4>
        <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${
          isSuccess ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
        }`}>
          {skills.length}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
          >
            <Badge tone={tone} icon size="md">{skill}</Badge>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
