import { motion } from "motion/react";
import { cn } from "../../lib/utils";

const auroraColors = [
  "var(--aurora-1)",
  "var(--aurora-2)",
  "var(--aurora-3)",
  "var(--aurora-4)",
  "var(--aurora-5)",
];

export default function AuroraBackground({
  className,
  variant = "default",
  ...props
}) {
  const isSubtle = variant === "subtle";

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        isSubtle && "md:opacity-60",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      {...props}
    >
      {/* Base wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% -20%, var(--aurora-glow) 0%, transparent 70%)",
        }}
      />

      {/* Animated aurora gradient orbs */}
      {auroraColors.map((color, i) => (
        <motion.div
          key={i}
          className={cn(
            "absolute rounded-full",
            isSubtle ? "hidden md:block" : ""
          )}
          style={{
            width: `${400 + i * 180}px`,
            height: `${400 + i * 180}px`,
            background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 70%)`,
            filter: "blur(80px)",
            willChange: "transform, opacity",
            ...positions[i],
          }}
          animate={{
            x: movements[i].x,
            y: movements[i].y,
            scale: [1, 1.12, 0.95, 1.08, 1],
            opacity: isSubtle
              ? [0.2, 0.3, 0.18, 0.28, 0.2]
              : [0.35, 0.55, 0.3, 0.5, 0.35],
          }}
          transition={{
            duration: 18 + i * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2,
          }}
        />
      ))}

      {/* Gradient overlay at bottom to fade edges */}
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            "linear-gradient(to top, #F8FBFF 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-24"
        style={{
          background:
            "linear-gradient(to bottom, #F8FBFF 0%, transparent 100%)",
        }}
      />
    </motion.div>
  );
}

const positions = [
  { top: "-15%", left: "-10%" },
  { top: "5%", right: "-8%" },
  { bottom: "-10%", left: "15%" },
  { top: "25%", left: "40%" },
  { bottom: "10%", right: "5%" },
];

const movements = [
  { x: [0, 60, -30, 40, 0], y: [0, -50, 30, -20, 0] },
  { x: [0, -40, 50, -30, 0], y: [0, 30, -60, 20, 0] },
  { x: [0, 30, -60, 50, 0], y: [0, -30, 40, -50, 0] },
  { x: [0, -50, 40, -20, 0], y: [0, 60, -30, 40, 0] },
  { x: [0, 40, -40, 60, 0], y: [0, -40, 50, -30, 0] },
];
