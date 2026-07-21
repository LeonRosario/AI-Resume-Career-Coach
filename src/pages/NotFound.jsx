import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import Aurora from "../components/ui/Aurora";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden">
      <Aurora />

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[140px] md:text-[180px] leading-none font-bold text-transparent bg-clip-text bg-brand-gradient select-none">
            404
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-ink mt-2">
            Page not found
          </h1>
          <p className="text-muted mt-2 text-base leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-brand-gradient shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Home size={16} />
            Back to Home
          </Link>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-ink bg-primary-50 hover:bg-primary-100 transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            Go to Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
