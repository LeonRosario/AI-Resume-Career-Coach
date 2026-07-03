import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AIActionButton({ children, onClick, variant = "default", disabled }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading || disabled) return;
    setLoading(true);
    try {
      await onClick?.();
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  };

  const base =
    "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30";

  const variants = {
    default:
      "bg-gradient-to-r from-primary-500/10 via-primary-400/8 to-violet-500/10 text-primary-700 border border-primary-200/60 hover:border-primary-300/80 hover:from-primary-500/15 hover:to-violet-500/15 hover:shadow-sm active:scale-[0.97]",
    ghost:
      "bg-transparent text-muted/80 hover:text-primary-600 hover:bg-primary-50/60 border border-transparent hover:border-primary-200/40 active:scale-[0.97]",
    outline:
      "bg-white text-primary-600 border border-primary-200/60 hover:bg-primary-50/60 hover:border-primary-300/80 active:scale-[0.97]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      disabled={loading || disabled}
      className={`${base} ${variants[variant] || variants.default} disabled:opacity-50 disabled:pointer-events-none`}
    >
      {loading ? (
        <svg className="animate-spin h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        <Sparkles size={12} className="shrink-0" />
      )}
      {loading ? "Thinking..." : children}
    </motion.button>
  );
}
