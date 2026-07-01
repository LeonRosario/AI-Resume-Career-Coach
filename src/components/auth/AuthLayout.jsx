import { motion } from "framer-motion";
import Logo from "../ui/Logo";

export default function AuthLayout({ children, eyebrow, title, subtitle, side }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden" style={{ background: "#F4F7FF" }}>
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(37,99,235,0.1) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(79,70,229,0.08) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-[1fr,1.15fr] gap-8 items-center">
        {/* ── Form panel ── */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong rounded-[24px] p-8 sm:p-10 shadow-glass-xl w-full max-w-md mx-auto lg:mx-0"
        >
          <Logo size="md" />

          <div className="mt-8 mb-7">
            <span className="text-[10px] font-bold tracking-[0.16em] text-primary-600 uppercase block mb-1.5">
              {eyebrow}
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl text-ink">{title}</h1>
            <p className="text-sm text-muted mt-2">{subtitle}</p>
          </div>

          {children}
        </motion.div>

        {/* ── Visual panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block"
        >
          {side}
        </motion.div>
      </div>
    </div>
  );
}
