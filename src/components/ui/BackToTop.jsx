import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 60%, #7C3AED 100%)",
            boxShadow: "0 8px 24px rgba(37,99,235,0.35)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
          aria-label="Back to top"
        >
          <ArrowUp size={18} className="text-white" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
