import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-[#0084FF] text-white shadow-glow hover:shadow-[0_0_50px_rgba(0,132,255,0.5)] border border-white/40",
  glass:
    "glass-strong text-ink hover:bg-white/10",
  outline:
    "bg-transparent border border-primary-500/30 text-primary-600 hover:bg-primary-50",
  ghost:
    "bg-transparent text-body hover:text-ink hover:bg-white/10",
  danger:
    "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon: Icon,
  iconPosition = "left",
  full = false,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`${variants[variant]} ${sizes[size]} ${full ? "w-full" : ""} rounded-[14px] font-semibold inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon size={18} strokeWidth={2.25} />}
      {children}
      {Icon && iconPosition === "right" && <Icon size={18} strokeWidth={2.25} />}
    </motion.button>
  );
}
