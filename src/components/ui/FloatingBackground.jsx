import { motion } from "framer-motion";

const blobs = [
  {
    size: 500,
    color: "rgba(37,99,235,0.06)",
    positions: [
      { top: "-10%", left: "-5%" },
      { bottom: "-15%", right: "-8%" },
      { top: "20%", right: "10%" },
    ],
  },
  {
    size: 400,
    color: "rgba(124,58,237,0.05)",
    positions: [
      { top: "40%", left: "15%" },
      { bottom: "10%", left: "30%" },
      { top: "5%", right: "-5%" },
    ],
  },
  {
    size: 350,
    color: "rgba(99,102,241,0.04)",
    positions: [
      { top: "60%", right: "20%" },
      { bottom: "30%", left: "10%" },
      { top: "-5%", left: "50%" },
    ],
  },
];

const movements = [
  { x: [0, 40, -20, 30, 0], y: [0, -30, 20, -15, 0] },
  { x: [0, -30, 35, -20, 0], y: [0, 25, -40, 15, 0] },
  { x: [0, 25, -40, 35, 0], y: [0, -20, 30, -35, 0] },
];

export default function FloatingBackground({ className = "" }) {
  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`} aria-hidden="true">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            filter: "blur(80px)",
            willChange: "transform",
            ...blob.positions[i],
          }}
          animate={{
            x: movements[i].x,
            y: movements[i].y,
            scale: [1, 1.08, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
}
