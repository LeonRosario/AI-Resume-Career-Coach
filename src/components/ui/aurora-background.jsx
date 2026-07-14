import { motion } from "motion/react";
import { cn } from "../../lib/utils";

const auroraColors = [
  "var(--aurora-1)",
  "var(--aurora-2)",
  "var(--aurora-3)",
  "var(--aurora-4)",
  "var(--aurora-5)",
];

const positions = [
  { top: "-15%",  left: "-10%" },
  { top: "5%",    right: "-8%" },
  { bottom: "-10%", left: "15%" },
  { top: "25%",   left: "40%" },
  { bottom: "10%", right: "5%" },
];

const movements = [
  { x: [0, 55, -25, 38, 0], y: [0, -45, 28, -18, 0] },
  { x: [0, -35, 48, -28, 0], y: [0, 28, -55, 18, 0] },
  { x: [0, 28, -55, 45, 0], y: [0, -28, 38, -48, 0] },
  { x: [0, -45, 38, -18, 0], y: [0, 55, -28, 38, 0] },
  { x: [0, 38, -38, 55, 0], y: [0, -38, 48, -28, 0] },
];

export default function AuroraBackground({ className, variant = "default", ...props }) {
  const isSubtle = variant === "subtle";

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        isSubtle && "opacity-70",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      {...props}
    >
      {/* Base radial wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% -15%, rgba(37,99,235,0.09) 0%, transparent 65%)",
        }}
      />

      {/* Animated orbs */}
      {auroraColors.map((color, i) => (
        <motion.div
          key={i}
          className={cn("absolute rounded-full", isSubtle ? "hidden md:block" : "")}
          style={{
            width:  `${420 + i * 160}px`,
            height: `${420 + i * 160}px`,
            background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 70%)`,
            filter: "blur(90px)",
            willChange: "transform, opacity",
            ...positions[i],
          }}
          animate={{
            x: movements[i].x,
            y: movements[i].y,
            scale: [1, 1.1, 0.96, 1.07, 1],
            opacity: isSubtle
              ? [0.18, 0.28, 0.16, 0.25, 0.18]
              : [0.32, 0.5, 0.28, 0.46, 0.32],
          }}
          transition={{
            duration: 18 + i * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.3,
          }}
        />
      ))}

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-36 pointer-events-none"
        style={{ background: "linear-gradient(to top, #FFFFFF 0%, transparent 100%)" }}
      />
      {/* Top fade */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, transparent 100%)" }}
      />
    </motion.div>
  );
}
