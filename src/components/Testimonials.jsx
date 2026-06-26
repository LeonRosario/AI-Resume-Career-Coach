import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Software Engineer",
    text: "CareerAI helped me improve my resume score from 62% to 91% and guided me on missing skills for my target role.",
  },
  {
    name: "Priya Patel",
    role: "Frontend Developer",
    text: "The AI skill analysis showed exactly what I needed to learn to become job-ready.",
  },
  {
    name: "Rahul Verma",
    role: "Computer Science Student",
    text: "The interview preparation feature gave me realistic questions and helped me prepare confidently.",
  },
  {
    name: "Sneha Kapoor",
    role: "Data Analyst",
    text: "The career roadmap helped me create a clear learning path instead of randomly learning skills.",
  },
  {
    name: "Arjun Mehta",
    role: "DevOps Engineer",
    text: "The platform identified my missing cloud skills and created a practical roadmap.",
  },
  {
    name: "Neha Singh",
    role: "Full Stack Developer",
    text: "ATS analysis improved my resume visibility and helped me target better roles.",
  },
];

const cardMotion = {
  offscreen: { opacity: 0, y: 30 },
  onscreen: { opacity: 1, y: 0 },
};

function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-slate-950/90 px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(96,177,255,0.16),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),_transparent_28%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center mx-auto mb-14 max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary-600">
            USER SUCCESS STORIES
          </span>
          <h2 className="font-heading mt-4 text-3xl font-extrabold text-ink sm:text-4xl">
            Trusted by job seekers building their careers with AI
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ink/60 sm:text-base">
            See how CareerAI helps students and professionals improve resumes, prepare interviews, and reach their career goals.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              variants={cardMotion}
              whileHover={{ scale: 1.035, y: -6 }}
              className="relative overflow-hidden rounded-[28px] border border-slate-600/20 bg-slate-900/80 p-7 shadow-[0_28px_100px_rgba(49,154,255,0.12)] transition-all duration-300 hover:shadow-[0_32px_110px_rgba(49,154,255,0.18)]"
            >
              <div className="absolute inset-x-6 top-0 h-24 rounded-b-[32px] bg-gradient-to-br from-[#60B1FF]/20 to-[#0084FF]/10 blur-3xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#60B1FF]/20 to-[#0084FF]/15 text-lg font-semibold text-primary-700 ring-1 ring-white/60">
                    {initials(testimonial.name)}
                  </div>
                  <div>
                    <p className="font-medium text-ink">{testimonial.name}</p>
                    <p className="text-sm text-ink/55">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-slate-900/90 px-3 py-1 text-sm font-semibold text-primary-200 shadow-sm shadow-primary-400/15">
                  <span className="mr-1">5.0</span>
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={14} className="fill-primary-400 text-primary-400" />
                  ))}
                </div>
              </div>

              <div className="relative mt-6 rounded-[26px] border border-slate-600/40 bg-slate-900/70 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <p className="text-sm leading-7 text-ink/70">“{testimonial.text}”</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
