import { motion } from "framer-motion";

const colorMap = {
  brand:  "bg-brand-gradient",
  green:  "bg-gradient-to-r from-emerald-400 to-emerald-500",
  amber:  "bg-gradient-to-r from-amber-400 to-amber-500",
  red:    "bg-gradient-to-r from-red-400 to-red-500",
  violet: "bg-gradient-to-r from-violet-500 to-violet-600",
};

const heightMap = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-2.5",
};

export default function ProgressBar({
  value,
  completed,
  total,
  label = "Progress",
  showValue = true,
  size = "md",
  color = "brand",
  delay = 0,
}) {
  const hasCount = typeof completed === "number" && typeof total === "number";
  const percent  = hasCount
    ? total > 0 ? Math.round((completed / total) * 100) : 0
    : value ?? 0;

  return (
    <div className="w-full min-w-[160px]">
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <span className="text-xs font-medium text-muted">{label}</span>
        {showValue && (
          <span className="text-xs font-semibold text-body tabular-nums">
            {hasCount ? `${completed} / ${total}` : `${percent}%`}
          </span>
        )}
      </div>

      {/* Track */}
      <div className={`w-full rounded-full bg-primary-100/60 overflow-hidden ${heightMap[size] ?? heightMap.md}`}>
        {/* Fill */}
        <motion.div
          className={`h-full rounded-full ${colorMap[color] ?? colorMap.brand}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
