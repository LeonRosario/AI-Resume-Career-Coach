import { motion } from "framer-motion";
import {
  Target, FileText, Layout, BookOpen, Layers, SpellCheck,
  Lightbulb, AlertCircle,
} from "lucide-react";

function ScoreGauge({ label, value, icon: Icon, color = "primary" }) {
  const colorMap = {
    primary: { text: "text-primary-600", bg: "bg-primary-100", ring: "stroke-primary-500" },
    emerald: { text: "text-emerald-600", bg: "bg-emerald-100", ring: "stroke-emerald-500" },
    amber: { text: "text-amber-600", bg: "bg-amber-100", ring: "stroke-amber-500" },
    rose: { text: "text-rose-600", bg: "bg-rose-100", ring: "stroke-rose-500" },
    violet: { text: "text-violet-600", bg: "bg-violet-100", ring: "stroke-violet-500" },
  };
  const c = colorMap[color] || colorMap.primary;
  const r = 18;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 shrink-0">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r={r} fill="none" stroke="#E2E8F0" strokeWidth="4" />
          <motion.circle
            cx="24" cy="24" r={r}
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            className={c.ring}
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-ink">{value}</span>
        </div>
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <Icon size={12} className={c.text} />
          <span className="text-xs font-medium text-ink">{label}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="h-1.5 flex-1 rounded-full bg-slate-200/60 max-w-[80px]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`h-full rounded-full ${
                value >= 80 ? "bg-emerald-400" : value >= 50 ? "bg-amber-400" : "bg-rose-400"
              }`}
            />
          </div>
          <span className={`text-[10px] font-semibold ${
            value >= 80 ? "text-emerald-600" : value >= 50 ? "text-amber-600" : "text-rose-600"
          }`}>
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
      className="glass rounded-2xl p-5 space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center">
            <Target size={15} className="text-primary-600" />
          </div>
          <div>
            <h3 className="font-heading text-sm text-ink">ATS Analysis</h3>
            <p className="text-[10px] text-muted">Live scores as you type</p>
          </div>
        </div>
        <motion.div
          key={ats.atsScore}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className={`text-lg font-heading font-bold ${
            ats.atsScore >= 80 ? "text-emerald-600" :
            ats.atsScore >= 50 ? "text-amber-600" : "text-rose-600"
          }`}
        >
          {ats.atsScore}%
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <ScoreGauge label="ATS Score" value={ats.atsScore} icon={Target} color="primary" />
        <ScoreGauge label="Keywords" value={ats.keywordScore} icon={FileText} color="violet" />
        <ScoreGauge label="Formatting" value={ats.formattingScore} icon={Layout} color="emerald" />
        <ScoreGauge label="Readability" value={ats.readability} icon={BookOpen} color="amber" />
        <ScoreGauge label="Sections" value={ats.sectionCoverage} icon={Layers} color="indigo" />
        <ScoreGauge label="Grammar" value={ats.grammar} icon={SpellCheck} color="rose" />
      </div>

      {ats.suggestions.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-200/60">
          <div className="flex items-center gap-1.5">
            <Lightbulb size={12} className="text-amber-500" />
            <span className="text-xs font-semibold text-ink">Suggestions</span>
          </div>
          <div className="space-y-1.5">
            {ats.suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-muted">
                <AlertCircle size={10} className="text-amber-500 mt-0.5 shrink-0" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
