import { motion } from "framer-motion";

const starParticles = [
  { left: "8%", top: "12%", size: 2, delay: 0 },
  { left: "20%", top: "28%", size: 1.5, delay: 1.8 },
  { left: "45%", top: "8%", size: 2.5, delay: 1.2 },
  { left: "70%", top: "18%", size: 1.75, delay: 0.8 },
  { left: "85%", top: "26%", size: 2, delay: 2.4 },
  { left: "60%", top: "42%", size: 1.5, delay: 1.4 },
];

const floatDots = [
  { left: "14%", top: "60%", size: 12, opacity: 0.18, delay: 0 },
  { left: "34%", top: "75%", size: 10, opacity: 0.14, delay: 1.2 },
  { left: "82%", top: "55%", size: 14, opacity: 0.16, delay: 0.6 },
  { left: "92%", top: "30%", size: 8, opacity: 0.2, delay: 1.6 },
];

export default function HeroBackground() {
  return (
    <div
      id="home-hero-background"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.28),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.24),transparent_18%),linear-gradient(180deg,#050816_0%,#0B1026_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(96,165,250,0.08),transparent_18%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.14),transparent_18%)] opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:140px_140px] opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_24%)] opacity-30" />

      <div className="absolute -left-20 top-12 w-72 h-72 rounded-full bg-violet-500/20 blur-[120px]" />
      <div className="absolute -right-24 bottom-12 w-80 h-80 rounded-full bg-sky-500/20 blur-[140px]" />
      <div className="absolute left-4 top-4 w-28 h-28 rounded-full bg-slate-200/5 blur-[90px]" />
      <div className="absolute right-4 bottom-20 w-24 h-24 rounded-full bg-cyan-300/10 blur-[80px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.03),transparent_35%)]" />

      {starParticles.map((star, index) => (
        <motion.span
          key={`star-${index}`}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: 0.85,
          }}
          animate={{ y: [0, -10, 0], opacity: [0.85, 0.4, 0.85] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: star.delay }}
        />
      ))}

      {floatDots.map((dot, index) => (
        <motion.span
          key={`dot-${index}`}
          className="absolute rounded-full bg-slate-200"
          style={{
            left: dot.left,
            top: dot.top,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
          }}
          animate={{ y: [0, -18, 0], opacity: [dot.opacity, dot.opacity * 0.18, dot.opacity] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
        />
      ))}
    </div>
  );
}
