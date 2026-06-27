import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logo({ size = "md", to = "/" }) {
  const textSize = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-xl";
  const iconBox = size === "lg" ? "w-10 h-10" : size === "sm" ? "w-7 h-7" : "w-8 h-8";
  const iconSize = size === "lg" ? 20 : size === "sm" ? 14 : 16;

  return (
    <Link to={to} className="inline-flex items-center gap-2.5 group">
      <span
        className={`${iconBox} rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform`}
      >
        <Sparkles size={iconSize} className="text-white" strokeWidth={2.5} />
      </span>
      <span className={`font-heading font-extrabold ${textSize} text-ink tracking-tight`}>
        Career<span className="text-gradient">AI</span>
      </span>
    </Link>
  );
}
