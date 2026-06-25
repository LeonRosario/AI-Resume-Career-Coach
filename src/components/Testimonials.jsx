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
    <section id="testimonials" className="relative overflow-hidden bg-white px-6 py-24">
      <div className="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full bg-[#60B1FF]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-80 w-80 rounded-full bg-[#0084FF]/20 blur-3xl" />

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
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              variants={cardMotion}
              whileHover={{ scale: 1.03, y: -4 }}
              className="glass relative overflow-hidden rounded-glass border border-white/40 bg-white/30 p-7 shadow-glass transition-all duration-300 hover:shadow-glass-lg"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#60B1FF]/20 to-[#0084FF]/15 text-lg font-semibold text-primary-700">
                    {initials(testimonial.name)}
                  </div>
                  <div>
                    <p className="font-medium text-ink">{testimonial.name}</p>
                    <p className="text-sm text-ink/55">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={16}
                      className="fill-primary-400 text-primary-400"
                    />
                  ))}
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-ink/70">“{testimonial.text}”</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
