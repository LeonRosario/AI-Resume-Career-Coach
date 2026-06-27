import { motion } from "framer-motion";

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
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-3" };
  const colorMap = {
    brand: "bg-brand-gradient",
    green: "bg-gradient-to-r from-emerald-400 to-emerald-500",
    amber: "bg-gradient-to-r from-amber-400 to-amber-500",
    red: "bg-gradient-to-r from-rose-400 to-rose-500",
  };

  const hasCount = typeof completed === "number" && typeof total === "number";
  const percent = hasCount
    ? total > 0
      ? Math.round((completed / total) * 100)
      : 0
    : value ?? 0;

  return (
    <div className="w-full min-w-[180px]">
      <div className="mb-2 flex items-end justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/50">
          {label}
        </span>
        {showValue && hasCount && (
          <span className="text-xs font-semibold text-ink/70">
            {completed} / {total} skills completed
          </span>
        )}
        {showValue && !hasCount && (
          <span className="text-xs font-semibold text-ink/70">{percent}%</span>
        )}
      </div>
      <div className={`w-full overflow-hidden rounded-full bg-ink/10 ${heights[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
          className={`${heights[size]} rounded-full ${colorMap[color]}`}
        />
      </div>
    </div>
  );
}
