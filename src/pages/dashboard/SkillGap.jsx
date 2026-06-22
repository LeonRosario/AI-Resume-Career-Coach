import { motion } from "framer-motion";
import { Target, CheckCircle2, Circle, ChevronDown } from "lucide-react";
import { useState } from "react";
import GlassCard from "../../components/ui/GlassCard";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { skillGap } from "../../data/mockData";

export default function SkillGap() {
  const [role, setRole] = useState(skillGap.targetRole);

  return (
    <div className="space-y-6">
      {/* Target role */}
      <GlassCard className="p-7">
        <div className="flex items-center gap-2 mb-4">
          <Target size={20} className="text-primary-600" />
          <h2 className="font-heading font-bold text-lg text-ink">Target Role</h2>
        </div>
        <div className="relative max-w-sm">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="glass-input w-full rounded-2xl py-3 px-4 pr-10 text-sm font-medium text-ink outline-none focus:ring-2 focus:ring-primary-400/60 appearance-none cursor-pointer"
          >
            <option>Full Stack Developer</option>
            <option>Frontend Developer</option>
            <option>Backend Engineer</option>
            <option>Data Scientist</option>
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
        </div>
      </GlassCard>

      <div className="grid md:grid-cols-2 gap-5">
        <GlassCard className="p-6">
          <h4 className="font-heading font-bold text-ink mb-4">Current Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skillGap.current.map((s) => (
              <Badge key={s} tone="success" icon>
                {s}
              </Badge>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h4 className="font-heading font-bold text-ink mb-4">Missing</h4>
          <div className="flex flex-wrap gap-2">
            {skillGap.missing.map((s) => (
              <Badge key={s} tone="danger" icon>
                {s}
              </Badge>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* AI Learning Roadmap */}
      <GlassCard className="p-7">
        <h3 className="font-heading font-bold text-lg text-ink mb-1">AI Learning Roadmap</h3>
        <p className="text-sm text-ink/50 mb-6">
          A focused plan to become job-ready for {role} in 4 weeks.
        </p>

        <div className="relative">
          {/* connecting line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-primary-900/8" />

          <div className="space-y-5">
            {skillGap.roadmap.map((item, i) => (
              <motion.div
                key={item.week}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative flex gap-4"
              >
                <div
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    item.done ? "bg-brand-gradient shadow-glow" : "glass-soft"
                  }`}
                >
                  {item.done ? (
                    <CheckCircle2 size={18} className="text-white" />
                  ) : (
                    <Circle size={18} className="text-primary-400" />
                  )}
                </div>
                <div className="glass-soft rounded-2xl p-4 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary-600 tracking-wide uppercase">
                      {item.week}
                    </span>
                    {item.done && <Badge tone="success">Complete</Badge>}
                  </div>
                  <h4 className="font-heading font-bold text-ink mt-1">{item.title}</h4>
                  <p className="text-sm text-ink/55 mt-1">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Button variant="primary" className="mt-7">
          Start this roadmap
        </Button>
      </GlassCard>
    </div>
  );
}
