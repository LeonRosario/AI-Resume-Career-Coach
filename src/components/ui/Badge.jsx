import { Check, X, AlertCircle, Info, Zap } from "lucide-react";

const tones = {
  neutral: "bg-slate-50 text-slate-600 border-slate-200",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  danger:  "bg-red-50 text-red-600 border-red-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  brand:   "bg-primary-50 text-primary-700 border-primary-200",
  violet:  "bg-violet-50 text-violet-700 border-violet-200",
  indigo:  "bg-indigo-50 text-indigo-700 border-indigo-200",
  dark:    "bg-ink/8 text-ink border-ink/10",
};

const icons = {
  success: Check,
  danger:  X,
  warning: AlertCircle,
  brand:   Zap,
  violet:  Zap,
  indigo:  Info,
};

export default function Badge({
  children,
  tone = "neutral",
  icon = false,
  size = "sm",
  className = "",
}) {
  const Icon = icon ? icons[tone] : null;
  const sizeClass = size === "md"
    ? "px-3.5 py-1.5 text-xs"
    : "px-2.5 py-1 text-[11px]";

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full font-semibold border",
        "tracking-wide leading-none",
        tones[tone] ?? tones.neutral,
        sizeClass,
        className,
      ].join(" ")}
    >
      {Icon && <Icon size={11} strokeWidth={2.8} className="shrink-0" />}
      {children}
    </span>
  );
}
