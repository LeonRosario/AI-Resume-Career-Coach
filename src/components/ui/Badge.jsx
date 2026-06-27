import { Check, X } from "lucide-react";

export default function Badge({ children, tone = "neutral", icon = false, className = "" }) {
  const tones = {
    neutral: "bg-primary-900/5 text-ink/70 border-black/5",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
    brand: "bg-primary-50 text-primary-700 border-primary-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${tones[tone]} ${className}`}
    >
      {icon && tone === "success" && <Check size={13} strokeWidth={3} />}
      {icon && tone === "danger" && <X size={13} strokeWidth={3} />}
      {children}
    </span>
  );
}
