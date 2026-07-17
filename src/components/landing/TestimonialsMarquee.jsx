import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";
import useTypewriter from "../../hooks/useTypewriter";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Google",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "CareerAI helped me increase my ATS score from 52% to 91%. I finally started getting interview calls.",
  },
  {
    name: "Michael Lee",
    role: "Computer Science Student",
    company: "MIT",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "The AI suggestions completely transformed my resume. The feedback was incredibly accurate.",
  },
  {
    name: "Priya Sharma",
    role: "Frontend Developer",
    company: "Shopify",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "I loved the Resume Builder and ATS Checker. Everything is in one place.",
  },
  {
    name: "Rahul Verma",
    role: "Final Year Student",
    company: "IIT Delhi",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    review:
      "The Interview Preparation feature gave me confidence before my placement interviews.",
  },
  {
    name: "Emily Chen",
    role: "UI/UX Designer",
    company: "Figma",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    review:
      "The Resume Rewrite feature saved me hours of editing.",
  },
  {
    name: "David Wilson",
    role: "Backend Developer",
    company: "AWS",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    review:
      "The Job Match feature showed exactly which skills I was missing.",
  },
  {
    name: "Jessica Martinez",
    role: "Product Manager",
    company: "Airbnb",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    review:
      "My ATS score went from 45 to 88 in just one revision. The keyword suggestions were spot on.",
  },
  {
    name: "Alex Kim",
    role: "Data Scientist",
    company: "Netflix",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    review:
      "The skill gap analysis was eye-opening. I knew exactly what to learn next for my career growth.",
  },
  {
    name: "Olivia Brown",
    role: "Marketing Manager",
    company: "HubSpot",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    review:
      "Building a resume that actually gets past ATS filters felt impossible until I used CareerAI.",
  },
  {
    name: "James Thompson",
    role: "Full Stack Developer",
    company: "Stripe",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    review:
      "The AI rewrote my bullet points to be impact-driven. My interview rate tripled within weeks.",
  },
  {
    name: "Ananya Gupta",
    role: "Business Analyst",
    company: "McKinsey",
    avatar: "https://randomuser.me/api/portraits/women/91.jpg",
    review:
      "I appreciated how the tool tailored suggestions to my specific industry. Highly recommended.",
  },
  {
    name: "Ryan Torres",
    role: "DevOps Engineer",
    company: "Microsoft",
    avatar: "https://randomuser.me/api/portraits/men/83.jpg",
    review:
      "CareerAI guided me through the entire resume rewrite process. The results were immediate.",
  },
];

function TestimonialCard({ t }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="glass rounded-[24px] p-7 shrink-0 w-[340px] sm:w-[360px] lg:w-[380px] flex flex-col hover:shadow-glass-xl transition-shadow duration-300 cursor-default"
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-amber-400 text-sm leading-none">
            ★
          </span>
        ))}
      </div>

      <p className="text-sm text-body leading-relaxed flex-1 mb-5">
        &ldquo;{t.review}&rdquo;
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <img
          src={t.avatar}
          alt={t.name}
          className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-white"
          loading="lazy"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink leading-tight truncate">
            {t.name}
          </p>
          <p className="text-xs text-muted mt-0.5 truncate">
            {t.role} &middot; {t.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialsRow({ items, direction = "left", speed = 40, className = "" }) {
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const isLeft = direction === "left";

  const allItems = useMemo(() => [...items, ...items], [items]);

  if (reducedMotion) {
    return (
      <div className={`flex gap-5 ${className}`}>
        {items.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-5 w-max"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        animate={
          paused
            ? {}
            : { x: isLeft ? ["0%", "-50%"] : ["-50%", "0%"] }
        }
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {allItems.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialsMarquee() {
  const navigate = useNavigate();
  const getStartedText = "Get Started Free";
  const { displayText: gsDisplay, isTyping: gsTyping, start: gsStart } = useTypewriter(getStartedText, { speed: 45 });

  const row1 = useMemo(() => testimonials.slice(0, 4), []);
  const row2 = useMemo(() => testimonials.slice(4, 8), []);
  const row3 = useMemo(() => testimonials.slice(8, 12), []);

  return (
    <section id="testimonials" className="relative px-6 py-24 bg-white overflow-hidden">
      <div
        className="pointer-events-none absolute -left-40 top-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="brand-pill mb-4 inline-flex"
          >
            ⭐ Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl text-ink mt-4"
          >
            Trusted by Students &<br className="hidden sm:block" /> Professionals
            Worldwide
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted mt-4 text-base"
          >
            Join thousands of users who improved their resumes, increased ATS
            scores, and landed interviews using CareerAI.
          </motion.p>
        </div>

        <div className="space-y-5">
          <TestimonialsRow items={row1} speed={45} direction="left" />
          <TestimonialsRow
            items={row2}
            speed={50}
            direction="right"
            className="hidden md:block"
          />
          <TestimonialsRow
            items={row3}
            speed={42}
            direction="left"
            className="hidden lg:block"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="text-center mt-16"
        >
          <h3 className="font-heading text-2xl sm:text-3xl text-ink">
            Ready to Build a Resume That Gets Interviews?
          </h3>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onHoverStart={gsStart}
            onClick={() => navigate("/register")}
            className="mt-6 inline-flex items-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-semibold text-white bg-brand-gradient shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-shadow"
          >
            <span className="relative inline-flex items-center shrink-0">
              <span className="invisible whitespace-nowrap" aria-hidden="true">
                Get Started Free
              </span>
              <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
                {gsDisplay}
                {gsTyping && (
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
        </motion.div>
      </div>
    </section>
  );
}
