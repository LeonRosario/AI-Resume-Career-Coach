import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div
      id="home-hero-background"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* Pure white base */}
      <div className="absolute inset-0 bg-white" />

      {/* Soft radial gradient wash */}
      <div className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #EAF5FF 0%, #F4FAFF 55%, #ffffff 100%)",
        }}
      />

      {/* Top-left light blue glow blob */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.72, 0.55] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-28 -top-20 w-[520px] h-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,132,255,0.18) 0%, rgba(0,132,255,0.06) 55%, transparent 80%)",
          filter: "blur(60px)",
        }}
      />

      {/* Bottom-right soft sky blue glow blob */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.68, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -right-32 -bottom-24 w-[580px] h-[580px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.16) 0%, rgba(0,132,255,0.07) 55%, transparent 80%)",
          filter: "blur(70px)",
        }}
      />

      {/* Subtle mid-page accent blob */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.28, 0.42, 0.28] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-[38%] top-[30%] w-[340px] h-[340px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,132,255,0.10) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Very subtle grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,132,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,132,255,0.04) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          opacity: 0.7,
        }}
      />

      {/* Top sheen highlight */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,132,255,0.25) 30%, rgba(56,189,248,0.35) 55%, rgba(0,132,255,0.25) 75%, transparent 100%)",
        }}
      />

      {/* Floating light orbs */}
      {[
        { left: "12%", top: "18%", size: 6, delay: 0, opacity: 0.35 },
        { left: "55%", top: "12%", size: 5, delay: 1.5, opacity: 0.3 },
        { left: "78%", top: "22%", size: 7, delay: 0.7, opacity: 0.32 },
        { left: "30%", top: "65%", size: 5, delay: 2.1, opacity: 0.25 },
        { left: "88%", top: "48%", size: 6, delay: 1.2, opacity: 0.28 },
        { left: "22%", top: "45%", size: 4, delay: 0.4, opacity: 0.22 },
      ].map((orb, i) => (
        <motion.span
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: orb.left,
            top: orb.top,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: "rgba(0,132,255,0.5)",
            opacity: orb.opacity,
            boxShadow: "0 0 8px rgba(0,132,255,0.4)",
          }}
          animate={{ y: [0, -12, 0], opacity: [orb.opacity, orb.opacity * 0.4, orb.opacity] }}
          transition={{ duration: 7 + i, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
        />
      ))}
    </div>
  );
}
