import { motion } from "framer-motion";
import {
  Target, FileText, Layout, BookOpen, Layers, SpellCheck,
  Lightbulb, AlertCircle,
} from "lucide-react";

function ScoreGauge({ label, value, icon: Icon, color = "primary" }) {
  const colorMap = {
    primary: { text: "text-primary-600", ring: "stroke-primary-500", bar: "bg-primary-400" },
    emerald: { text: "text-emerald-600", ring: "stroke-emerald-500", bar: "bg-emerald-400" },
    amber: { text: "text-amber-600", ring: "stroke-amber-500", bar: "bg-amber-400" },
    rose: { text: "text-rose-600", ring: "stroke-rose-500", bar: "bg-rose-400" },
    violet: { text: "text-violet-600", ring: "stroke-violet-500", bar: "bg-violet-400" },
    indigo: { text: "text-indigo-600", ring: "stroke-indigo-500", bar: "bg-indigo-400" },
  };
  const c = colorMap[color] || colorMap.primary;
  const r = 16;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;

  const labelColor = value >= 80 ? "text-emerald-600" : value >= 50 ? "text-amber-600" : "text-rose-600";
  const barColor = value >= 80 ? "bg-emerald-400" : value >= 50 ? "bg-amber-400" : "bg-rose-400";

  return (
    <div className="flex items-center gap-2.5 bg-white/50 rounded-xl p-2.5 border border-slate-100/60">
      <div className="relative w-10 h-10 shrink-0">
        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r={r} fill="none" stroke="#E2E8F0" strokeWidth="3.5" />
          <motion.circle
            cx="20" cy="20" r={r}
            fill="none"
            strokeWidth="3.5"
            strokeLinecap="round"
            className={c.ring}
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-bold text-ink tabular-nums">{value}</span>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <Icon size={11} className={c.text} />
          <span className="text-[11px] font-medium text-ink/80">{label}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`h-full rounded-full ${barColor}`}
            />
          </div>
          <span className={`text-[10px] font-semibold ${labelColor}`}>
            {value >= 80 ? "Great" : value >= 50 ? "Okay" : "Low"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ATSPanel({ ats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/80 backdrop-blur-xl rounded-[20px] p-5 border border-slate-200/60 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center shadow-sm">
            <Target size={16} className="text-white" strokeWidth={2.2} />
          </div>
          <div>
            <h3 className="font-heading text-base text-ink tracking-tight">ATS Analysis</h3>
            <p className="text-[11px] text-muted/70">Live scores as you type</p>
          </div>
        </div>
        <motion.div
          key={ats.atsScore}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className={`text-2xl font-heading font-bold tabular-nums ${
            ats.atsScore >= 80 ? "text-emerald-600" :
            ats.atsScore >= 50 ? "text-amber-600" : "text-rose-600"
          }`}
        >
          {ats.atsScore}
          <span className="text-sm font-body font-semibold text-muted/50">%</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <ScoreGauge label="ATS Score" value={ats.atsScore} icon={Target} color="primary" />
        <ScoreGauge label="Keywords" value={ats.keywordScore} icon={FileText} color="violet" />
        <ScoreGauge label="Formatting" value={ats.formattingScore} icon={Layout} color="emerald" />
        <ScoreGauge label="Readability" value={ats.readability} icon={BookOpen} color="amber" />
        <ScoreGauge label="Sections" value={ats.sectionCoverage} icon={Layers} color="indigo" />
        <ScoreGauge label="Grammar" value={ats.grammar} icon={SpellCheck} color="rose" />
      </div>

      {ats.suggestions && ats.suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 pt-4 border-t border-slate-100 space-y-3"
        >
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-lg bg-amber-50 flex items-center justify-center">
              <Lightbulb size={11} className="text-amber-500" />
            </div>
            <span className="text-xs font-semibold text-ink">Suggestions</span>
            <span className="text-[10px] text-muted/50 ml-auto">{ats.suggestions.length} items</span>
          </div>
          <div className="space-y-1.5">
            {ats.suggestions.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-start gap-2.5 text-xs text-muted/80 bg-white/50 rounded-xl px-3 py-2 border border-slate-100/60"
              >
                <AlertCircle size={11} className="text-amber-500 mt-0.5 shrink-0" />
                <span className="leading-snug">{s}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
