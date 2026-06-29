import { motion } from "framer-motion";
import Aurora from "../ui/Aurora";
import Logo from "../ui/Logo";

export default function AuthLayout({ children, eyebrow, title, subtitle, side }) {
  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center px-4 py-10 overflow-hidden">
      <Aurora variant="auth" />
      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-[1fr,1.1fr] gap-8 items-center">
        {/* Form side */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong rounded-glass p-8 sm:p-10 shadow-glass-lg w-full max-w-md mx-auto lg:mx-0"
        >
          <Logo size="md" />
          <span className="block text-xs font-bold tracking-widest text-primary-600 uppercase mt-7">
            {eyebrow}
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink mt-2">
            {title}
          </h1>
          <p className="text-sm text-muted mt-2 mb-7">{subtitle}</p>
          {children}
        </motion.div>

        {/* Visual side */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
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
