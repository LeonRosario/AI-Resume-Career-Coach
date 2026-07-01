import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logo({ size = "md", to = "/" }) {
  const textSize  = { lg: "text-2xl",  md: "text-xl",  sm: "text-base" }[size] ?? "text-xl";
  const iconBox   = { lg: "w-10 h-10", md: "w-8 h-8",  sm: "w-7 h-7"  }[size];
  const iconPx    = { lg: 20,           md: 16,          sm: 14          }[size];

  return (
    <Link to={to} className="inline-flex items-center gap-2.5 group focus-visible:outline-none">
      {/* Icon mark */}
      <span
        className={[
          iconBox,
          "rounded-xl bg-brand-gradient",
          "flex items-center justify-center",
          "shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300",
          "group-hover:scale-105 transition-transform duration-200",
        ].join(" ")}
      >
        <Sparkles size={iconPx} className="text-white" strokeWidth={2.5} />
      </span>

      {/* Wordmark */}
      <span className={`font-heading font-normal ${textSize} text-ink tracking-tight leading-none`}>
        Career
        <span className="text-gradient-blue font-normal">AI</span>
      </span>
    </Link>
  );
}
