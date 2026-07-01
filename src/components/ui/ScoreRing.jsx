import { motion } from "framer-motion";

const getTone = (value) => {
  if (value >= 80) return { color: "#22C55E", bg: "rgba(34,197,94,0.08)", label: "Excellent" };
  if (value >= 65) return { color: "#2563EB", bg: "rgba(37,99,235,0.08)", label: "Good" };
  if (value >= 45) return { color: "#F59E0B", bg: "rgba(245,158,11,0.08)", label: "Fair" };
  return { color: "#EF4444", bg: "rgba(239,68,68,0.08)", label: "Needs work" };
};

export default function ScoreRing({
  value = 0,
  size = 160,
  stroke = 10,
  label = "Score",
  showToneLabel = false,
}) {
  const radius       = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset       = circumference - (Math.min(value, 100) / 100) * circumference;
  const tone         = getTone(value);
  const fontSize     = Math.round(size * 0.24);
  const labelSize    = Math.round(size * 0.088);

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${label}: ${value}`}
    >
      {/* Background circle */}
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={tone.bg}
          strokeWidth={stroke}
          fill="none"
        />
        {/* Animated fill */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={tone.color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="font-heading font-normal text-ink leading-none"
          style={{ fontSize }}
        >
          {value}
        </motion.span>
        <span
          className="text-muted font-medium leading-none mt-1"
          style={{ fontSize: labelSize }}
        >
          {label}
        </span>
        {showToneLabel && (
          <span
            className="mt-1 font-semibold leading-none"
            style={{ fontSize: labelSize, color: tone.color }}
          >
            {tone.label}
          </span>
        )}
      </div>
    </div>
  );
}
