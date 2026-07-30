import { motion } from "framer-motion";

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
    default: "card",
    strong:  "card",
    soft:    "card",
    flat:    "bg-white border border-gray-100 rounded-2xl shadow-card",
  }[variant] ?? "card";

  const baseMotionProps = animate
    ? {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-48px" },
        transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
      }
    : {};

  const hoverMotionProps = hover
    ? {
        whileHover: {
          y: -4,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        },
      }
    : {};

  return (
    <Component
      {...baseMotionProps}
      {...hoverMotionProps}
      className={[
        variantClass,
        hover ? "cursor-pointer card-hover" : "",
        gradient ? "bg-gradient-to-br from-white via-white to-indigo-50/40" : "",
        "relative",
        className,
      ].filter(Boolean).join(" ")}
      {...props}
    >
      {accent && (
        <div
          className="absolute inset-x-0 top-0 h-[3px] rounded-t-[16px]"
          style={{ background: "linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)" }}
          aria-hidden="true"
        />
      )}
      {children}
    </Component>
  );
}
