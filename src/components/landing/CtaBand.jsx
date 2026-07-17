import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useTypewriter from "../../hooks/useTypewriter";

export default function CtaBand() {
  const navigate = useNavigate();
  const ctaText = "Get my free score";
  const { displayText: ctaDisplay, isTyping: ctaTyping, start: ctaStart } = useTypewriter(ctaText, { speed: 45 });

  return (
    <section className="relative px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[28px] overflow-hidden p-10 md:p-16 text-center"
          style={{
            boxShadow: "0 24px 80px rgba(37,99,235,0.35), 0 8px 16px rgba(79,70,229,0.2)",
          }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(135deg, #1D4ED8 0%, #4338CA 50%, #6D28D9 100%)",
                "linear-gradient(135deg, #1E40AF 0%, #4F46E5 50%, #7C3AED 100%)",
                "linear-gradient(135deg, #1D4ED8 0%, #4338CA 50%, #6D28D9 100%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Animated glow orb */}
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 20, -30, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{
              x: [0, 20, -20, 0],
              y: [0, -20, 30, 0],
              scale: [1, 0.95, 1.1, 1],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />

          {/* Noise/mesh overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 40%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80 border border-white/20 bg-white/10 mb-5"
            >
              <Sparkles size={12} /> Free forever — no card required
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-heading text-3xl sm:text-4xl text-white"
            >
              Ready to see your resume's real score?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-white/75 mt-4 max-w-lg mx-auto text-base"
            >
              Upload it free — no credit card, no commitment. Just a clear next step toward your next role.
            </motion.p>

            <motion.button
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: "0 16px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,1)",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onHoverStart={ctaStart}
              onClick={() => navigate("/register")}
              className="mt-8 inline-flex items-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-semibold"
              style={{
                background: "rgba(255,255,255,0.95)",
                color: "#1D4ED8",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,1)",
              }}
            >
              <span className="relative inline-flex items-center shrink-0">
                <span className="invisible whitespace-nowrap" aria-hidden="true">
                  Get my free score
                </span>
                <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
                  {ctaDisplay}
                  {ctaTyping && (
                    <span className="ml-px w-[2px] h-[1em] bg-current animate-cursor-blink" />
                  )}
                </span>
              </span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={17} strokeWidth={2.5} />
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
