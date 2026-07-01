import { motion } from "framer-motion";

/**
 * GlassCard — the universal surface primitive.
 *
 * variant: "default" | "strong" | "soft" | "flat"
 * hover: enables lift + subtle scale on hover
 * gradient: adds a faint brand gradient tint to the background
 * accent: adds a top border gradient line
 */
export default function GlassCard({
  children,
  className = "",
  variant = "default",
  hover = false,
  gradient = false,
  accent = false,
  as: Component = motion.div,
  delay = 0,
  animate = true,
  ...props
}) {
  const variantClass = {
    default: "glass",
    strong:  "glass-strong",
    soft:    "glass-soft",
    flat:    "bg-white border border-slate-100 rounded-[20px] shadow-card",
  }[variant] ?? "glass";

  const baseMotionProps = animate
    ? {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-48px" },
        transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
      }
    : {};

  const hoverMotionProps = hover
    ? { whileHover: { y: -5, scale: 1.01 } }
    : {};

  return (
    <Component
      {...baseMotionProps}
      {...hoverMotionProps}
      className={[
        variantClass,
        hover ? "cursor-pointer transition-shadow duration-300 hover:shadow-glass-lg" : "",
        gradient ? "bg-gradient-to-br from-white via-white to-blue-50/60" : "",
        "relative overflow-hidden",
        className,
      ].filter(Boolean).join(" ")}
      {...props}
    >
      {/* Optional top accent gradient bar */}
      {accent && (
        <div
          className="absolute inset-x-0 top-0 h-[2px] rounded-t-[20px]"
          style={{ background: "linear-gradient(90deg, #2563EB 0%, #6366F1 50%, #7C3AED 100%)" }}
          aria-hidden="true"
        />
      )}
      {children}
    </Component>
  );
}
