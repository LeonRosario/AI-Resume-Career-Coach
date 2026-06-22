import { motion } from "framer-motion";

/**
 * GlassCard — the base surface used throughout the app.
 * variant: "default" | "strong" | "soft"
 * hover: enables a gentle lift + scale on hover
 */
export default function GlassCard({
  children,
  className = "",
  variant = "default",
  hover = false,
  as: Component = motion.div,
  delay = 0,
  ...props
}) {
  const variantClass =
    variant === "strong" ? "glass-strong" : variant === "soft" ? "glass-soft" : "glass";

  return (
    <Component
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { y: -6, scale: 1.012 } : undefined}
      className={`${variantClass} shadow-glass ${hover ? "transition-shadow hover:shadow-glass-lg cursor-pointer" : ""} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
