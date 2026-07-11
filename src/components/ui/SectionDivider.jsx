import { motion } from "framer-motion";

export default function SectionDivider({ flip = false }) {
  return (
    <div className="relative h-20 md:h-28 w-full overflow-hidden -mb-1" aria-hidden="true">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full"
        style={{ transform: flip ? "rotate(180deg)" : "none" }}
      >
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          fill="none"
          stroke="url(#dividerGrad)"
          strokeWidth="2"
          d="M0,60 C240,0 480,120 720,60 C960,0 1200,120 1440,60"
          opacity="0.4"
        />
        <defs>
          <linearGradient id="dividerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
            <stop offset="25%" stopColor="#2563EB" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#6366F1" stopOpacity="0.2" />
            <stop offset="75%" stopColor="#7C3AED" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full"
        style={{ transform: flip ? "rotate(180deg)" : "none" }}
      >
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          fill="none"
          stroke="url(#dividerGrad2)"
          strokeWidth="1"
          d="M0,80 C360,30 720,130 1440,50"
          opacity="0.25"
        />
        <defs>
          <linearGradient id="dividerGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0" />
            <stop offset="30%" stopColor="#6366F1" stopOpacity="0.12" />
            <stop offset="70%" stopColor="#A78BFA" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
