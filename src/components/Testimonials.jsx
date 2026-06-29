import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
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
    <section
      id="testimonials"
      className="relative overflow-hidden px-6 py-24"
      style={{
        background:
          "linear-gradient(180deg, #F4FAFF 0%, #EAF5FF 50%, #F4FAFF 100%)",
      }}
    >
      {/* Floating ambient glow blobs */}
      <div
        className="pointer-events-none absolute -left-40 top-0 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(96,177,255,0.25) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,132,255,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mx-auto mb-14 max-w-2xl">
          <span
            className="inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.32em] mb-4"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(0,132,255,0.2)",
              color: "#0084FF",
              boxShadow: "0 2px 12px rgba(0,132,255,0.08)",
            }}
          >
            User Success Stories
          </span>
          <h2
            className="font-heading text-3xl font-extrabold sm:text-4xl mt-3"
            style={{ color: "#0F172A" }}
          >
            Trusted by job seekers building their careers with AI
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-sm leading-7 sm:text-base"
            style={{ color: "#64748B" }}
          >
            See how CareerAI helps students and professionals improve resumes,
            prepare interviews, and reach their career goals.
          </p>
        </div>

        {/* Cards grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -8 }}
              className="relative overflow-hidden rounded-[24px] transition-shadow duration-300 cursor-default"
              style={{
                background: "rgba(255,255,255,0.35)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                border: "1px solid rgba(255,255,255,0.4)",
                boxShadow:
                  "0 8px 40px rgba(0,132,255,0.09), 0 1px 0 rgba(255,255,255,0.9) inset",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 20px 60px rgba(0,132,255,0.18), 0 1px 0 rgba(255,255,255,0.9) inset";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 40px rgba(0,132,255,0.09), 0 1px 0 rgba(255,255,255,0.9) inset";
              }}
            >
              {/* Top blue accent line */}
              <div
                className="absolute inset-x-0 top-0 h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(0,132,255,0.5) 40%, rgba(56,189,248,0.5) 70%, transparent 100%)",
                }}
              />

              {/* Inner radial glow */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,132,255,0.05) 0%, transparent 70%)",
                }}
              />

              <div className="relative p-7">
                {/* Header: avatar + name + rating */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    {/* Avatar circle */}
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(0,132,255,0.15) 0%, rgba(56,189,248,0.15) 100%)",
                        border: "1.5px solid rgba(0,132,255,0.2)",
                        color: "#0084FF",
                        boxShadow: "0 2px 8px rgba(0,132,255,0.12)",
                      }}
                    >
                      {initials(testimonial.name)}
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "#0F172A" }}
                      >
                        {testimonial.name}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "#64748B" }}
                      >
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Star rating pill */}
                  <div
                    className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold shrink-0"
                    style={{
                      background: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(0,132,255,0.15)",
                      color: "#0084FF",
                      boxShadow: "0 2px 8px rgba(0,132,255,0.08)",
                    }}
                  >
                    <span className="mr-0.5">5.0</span>
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={11}
                        fill="#0084FF"
                        color="#0084FF"
                      />
                    ))}
                  </div>
                </div>

                {/* Quote card */}
                <div
                  className="rounded-[20px] p-5 relative"
                  style={{
                    background: "rgba(244,250,255,0.85)",
                    border: "1px solid rgba(0,132,255,0.1)",
                  }}
                >
                  <Quote
                    size={20}
                    className="absolute top-3 left-4"
                    style={{ color: "#0084FF", opacity: 0.2 }}
                  />
                  <p
                    className="text-sm leading-7 pt-4"
                    style={{ color: "#334155" }}
                  >
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
