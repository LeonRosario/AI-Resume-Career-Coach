import GlassCard from "./GlassCard";
import { motion } from "framer-motion";

export default function StatCard({
  icon: Icon,
  title,
  value,
  label,
  children,
  className = "",
  variant = "strong",
  delay = 0,
  accent = false,
}) {
  return (
    <GlassCard
      variant={variant}
      delay={delay}
      hover
      accent={accent}
      className={["p-5 sm:p-6", className].join(" ")}
    >
      {Icon && (
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-100 flex items-center justify-center shrink-0">
            <Icon size={17} className="text-primary-600" strokeWidth={2} />
          </div>
          <span className="text-sm font-semibold text-ink">{title}</span>
        </div>
      )}
      {!Icon && title && (
        <span className="block text-sm font-semibold text-ink mb-4">{title}</span>
      )}
      <div className="mb-3">
        <span className="font-heading text-3xl sm:text-4xl text-ink">{value}</span>
        {label && (
          <span className="block text-xs text-muted mt-0.5 font-medium">{label}</span>
        )}
      </div>
      {children}
    </GlassCard>
  );
}
