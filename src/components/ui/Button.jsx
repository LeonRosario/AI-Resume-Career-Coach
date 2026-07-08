import { motion } from "framer-motion";

const variants = {
  primary: [
    "bg-brand-gradient text-white",
    "shadow-glow-sm hover:shadow-glow",
    "border border-white/20",
    "hover:brightness-110",
  ].join(" "),

  secondary: [
    "bg-white text-primary-700",
    "border border-primary-200 hover:border-primary-300",
    "shadow-card hover:shadow-card-hover",
    "hover:bg-primary-50",
  ].join(" "),

  glass: [
    "glass-strong text-body",
    "hover:bg-white/60",
    "hover:border-primary-300/40",
  ].join(" "),

  outline: [
    "bg-transparent",
    "border border-primary-500/30 hover:border-primary-500/60",
    "text-primary-600",
    "hover:bg-primary-50",
  ].join(" "),

  ghost: [
    "bg-transparent text-muted",
    "hover:text-ink hover:bg-white/50",
    "border border-transparent hover:border-primary-100",
  ].join(" "),

  danger: [
    "bg-red-50 text-red-600",
    "border border-red-200 hover:border-red-300",
    "hover:bg-red-100",
  ].join(" "),

  violet: [
    "bg-gradient-to-r from-violet-600 to-violet-500 text-white",
    "border border-white/20",
    "shadow-glow-violet hover:brightness-110",
  ].join(" "),
};

const sizes = {
  xs:  "px-3 py-1.5 text-xs gap-1.5",
  sm:  "px-4 py-2 text-sm gap-2",
  md:  "px-6 py-2.5 text-sm gap-2",
  lg:  "px-8 py-3.5 text-base gap-2.5",
  xl:  "px-10 py-4 text-lg gap-3",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon: Icon,
  iconPosition = "left",
  full = false,
  loading = false,
  ...props
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.03,
        boxShadow: variant === "primary"
          ? "0 12px 40px rgba(37,99,235,0.35), 0 4px 12px rgba(37,99,235,0.2)"
          : undefined,
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      className={[
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        full ? "w-full" : "",
        "rounded-xl font-semibold inline-flex items-center justify-center",
        "transition-all duration-200",
        "disabled:opacity-50 disabled:pointer-events-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2",
        className,
      ].filter(Boolean).join(" ")}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>{children}</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === "left" && (
            <motion.span
              className="shrink-0"
              whileHover={{ x: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Icon size={size === "lg" || size === "xl" ? 20 : 17} strokeWidth={2.2} />
            </motion.span>
          )}
          {children}
          {Icon && iconPosition === "right" && (
            <motion.span
              className="shrink-0"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <Icon size={size === "lg" || size === "xl" ? 20 : 17} strokeWidth={2.2} />
            </motion.span>
          )}
        </>
      )}
    </motion.button>
  );
}
