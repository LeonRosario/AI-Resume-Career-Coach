import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CtaBand() {
  const navigate = useNavigate();

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
            background: "linear-gradient(135deg, #1D4ED8 0%, #4338CA 50%, #6D28D9 100%)",
            boxShadow: "0 24px 80px rgba(37,99,235,0.35), 0 8px 16px rgba(79,70,229,0.2)",
          }}
        >
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
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80 border border-white/20 bg-white/10 mb-5">
              <Sparkles size={12} /> Free forever — no card required
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl text-white">
              Ready to see your resume's real score?
            </h2>
            <p className="text-white/75 mt-4 max-w-lg mx-auto text-base">
              Upload it free — no credit card, no commitment. Just a clear next step toward your next role.
            </p>

            <motion.button
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: "0 16px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,1)",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => navigate("/register")}
              className="mt-8 inline-flex items-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-semibold"
              style={{
                background: "rgba(255,255,255,0.95)",
                color: "#1D4ED8",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,1)",
              }}
            >
              Get my free score
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
