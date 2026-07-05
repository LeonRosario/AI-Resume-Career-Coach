import { motion } from "framer-motion";

/**
 * HeroBackground — decorative full-bleed background used behind hero sections.
 * Matches the CareerAI electric-blue + indigo/violet design system.
 */
export default function HeroBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Base page tint */}
      <div className="absolute inset-0" style={{ background: "#F4F7FF" }} />

      {/* Radial wash — top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(37,99,235,0.1) 0%, rgba(79,70,229,0.06) 50%, transparent 80%)",
        }}
      />

      {/* Primary glow — top left */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.68, 0.5] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-28 -top-20 w-[560px] h-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.16) 0%, rgba(37,99,235,0.05) 55%, transparent 80%)",
          filter: "blur(70px)",
        }}
      />

      {/* Violet accent — bottom right */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.58, 0.4] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -right-32 -bottom-24 w-[620px] h-[620px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(79,70,229,0.07) 55%, transparent 80%)",
          filter: "blur(80px)",
        }}
      />

      {/* Indigo mid-page accent */}
      <motion.div
        animate={{ x: [0, 28, 0], y: [0, -18, 0], opacity: [0.22, 0.38, 0.22] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-[38%] top-[28%] w-[360px] h-[360px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Top edge sheen */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.3) 30%, rgba(99,102,241,0.4) 55%, rgba(124,58,237,0.25) 75%, transparent 100%)",
        }}
      />

      {/* Floating micro-orbs */}
      {[
        { left: "11%", top: "17%", size: 6, delay: 0,   opacity: 0.3  },
        { left: "54%", top: "11%", size: 5, delay: 1.5, opacity: 0.25 },
        { left: "79%", top: "24%", size: 7, delay: 0.7, opacity: 0.28 },
        { left: "31%", top: "63%", size: 5, delay: 2.1, opacity: 0.2  },
        { left: "89%", top: "47%", size: 6, delay: 1.2, opacity: 0.24 },
        { left: "21%", top: "44%", size: 4, delay: 0.4, opacity: 0.18 },
      ].map((orb, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.size,
            height: orb.size,
            background: i % 2 === 0 ? "rgba(37,99,235,0.55)" : "rgba(124,58,237,0.45)",
            opacity: orb.opacity,
            boxShadow: `0 0 8px ${i % 2 === 0 ? "rgba(37,99,235,0.4)" : "rgba(124,58,237,0.35)"}`,
          }}
          animate={{
            y: [0, -14, 0],
            opacity: [orb.opacity, orb.opacity * 0.35, orb.opacity],
          }}
          transition={{ duration: 7 + i, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
        />
      ))}
    </div>
  );
}
