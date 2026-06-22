import { motion } from "framer-motion";

export default function ProgressBar({
  value = 0,
  label,
  showValue = true,
  size = "md",
  color = "brand",
  delay = 0,
}) {
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-3.5" };
  const colorMap = {
    brand: "bg-brand-gradient",
    green: "bg-gradient-to-r from-emerald-400 to-emerald-500",
    amber: "bg-gradient-to-r from-amber-400 to-amber-500",
    red: "bg-gradient-to-r from-rose-400 to-rose-500",
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-sm font-medium text-ink/75">{label}</span>}
          {showValue && (
            <span className="text-sm font-semibold text-ink/90">{value}%</span>
          )}
        </div>
      )}
      <div className={`w-full ${heights[size]} rounded-full bg-primary-900/8 overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
          className={`${heights[size]} rounded-full ${colorMap[color]}`}
        />
      </div>
    </div>
  );
}
