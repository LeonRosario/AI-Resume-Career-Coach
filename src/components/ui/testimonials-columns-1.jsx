import { motion } from "motion/react";

const testimonials = [
  { name: "Aarav Sharma",    role: "Software Engineer",       text: "CareerAI helped me improve my resume score from 62 to 91 and land more interviews with top tech companies." },
  { name: "Priya Patel",     role: "Frontend Developer",      text: "Skill gap analysis showed exactly what I needed to learn before applying. It saved me months of directionless study." },
  { name: "Rahul Verma",     role: "CS Graduate",             text: "The AI interview coach helped me prepare with real company questions. I felt super confident going into my final rounds." },
  { name: "Sneha Kapoor",    role: "Data Analyst",            text: "The ATS checker was a game changer. I got immediate feedback on keywords and formatting that actually get noticed." },
  { name: "Arjun Mehta",     role: "DevOps Engineer",         text: "CareerAI's personalized roadmap highlighted the cloud certifications I was missing, helping me pivot seamlessly." },
  { name: "Neha Singh",      role: "Full Stack Developer",    text: "I loved the mock interview analysis. The AI feedback on tone and body language was incredibly detailed and helpful." },
  { name: "Kabir Malhotra",  role: "Product Manager",         text: "My resume went from a generic list of duties to an impact-driven narrative. Within two weeks, I had three interviews." },
  { name: "Riya Sen",        role: "UX Researcher",           text: "Having AI scan my resume against specific job descriptions made tailoring applications incredibly fast and efficient." },
  { name: "Aditya Roy",      role: "QA Engineer",             text: "The transition from QA to development was made clear by the AI's step-by-step roadmap. Highly recommended!" },
];

// Distinct avatar gradient colors
const avatarGradients = [
  "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)",
  "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
  "linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)",
  "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
  "linear-gradient(135deg, #1D4ED8 0%, #4338CA 100%)",
  "linear-gradient(135deg, #6D28D9 0%, #7C3AED 100%)",
  "linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)",
  "linear-gradient(135deg, #4338CA 0%, #6366F1 100%)",
  "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)",
];

function initials(name) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

const col1 = [testimonials[0], testimonials[1], testimonials[2]];
const col2 = [testimonials[3], testimonials[4], testimonials[5]];
const col3 = [testimonials[6], testimonials[7], testimonials[8]];

function TestimonialCard({ item, gradientIndex = 0 }) {
  return (
    <div
      className="p-6 rounded-[20px] transition-transform duration-300 hover:scale-[1.025] hover:-translate-y-1"
      style={{
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        border: "1px solid rgba(37,99,235,0.12)",
        boxShadow: "0 8px 32px rgba(37,99,235,0.07), 0 2px 4px rgba(37,99,235,0.04)",
      }}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-amber-400 text-xs">★</span>
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm leading-relaxed text-body mb-4">
        &ldquo;{item.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ background: avatarGradients[gradientIndex % avatarGradients.length] }}
        >
          {initials(item.name)}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink leading-tight">{item.name}</p>
          <p className="text-xs text-muted mt-0.5">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

function Column({ items, direction, startIndex = 0 }) {
  const isUp = direction === "up";
  return (
    <motion.div
      animate={{ y: isUp ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{
        y: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" },
      }}
      className="flex flex-col gap-5"
    >
      {items.map((item, idx) => (
        <TestimonialCard key={`a-${idx}`} item={item} gradientIndex={startIndex + idx} />
      ))}
      {items.map((item, idx) => (
        <TestimonialCard key={`b-${idx}`} item={item} gradientIndex={startIndex + idx} />
      ))}
    </motion.div>
  );
}

export default function TestimonialsColumns() {
  return (
    <section id="testimonials" className="relative bg-white py-24 px-6 overflow-hidden">
      {/* Ambient blobs */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="brand-pill mb-4 inline-flex"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl text-ink mt-4"
          >
            Trusted by job seekers worldwide
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base text-muted leading-relaxed"
          >
            See how CareerAI helps people build stronger resumes and careers.
          </motion.p>
        </div>

        {/* Scrolling columns */}
        <div className="relative h-[640px] overflow-hidden rounded-[28px]">
          {/* Top fade */}
          <div
            className="absolute top-0 inset-x-0 h-24 z-20 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, rgba(255,255,255,0.9) 50%, transparent 100%)" }}
          />
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 inset-x-0 h-24 z-20 pointer-events-none"
            style={{ background: "linear-gradient(to top, #FFFFFF 0%, rgba(255,255,255,0.9) 50%, transparent 100%)" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-full">
            <div className="h-full overflow-hidden">
              <Column items={col1} direction="up" startIndex={0} />
            </div>
            <div className="h-full overflow-hidden hidden md:block">
              <Column items={col2} direction="down" startIndex={3} />
            </div>
            <div className="h-full overflow-hidden hidden lg:block">
              <Column items={col3} direction="up" startIndex={6} />
            </div>
          </div>
        </div>

        {/* Stats row below testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-14 grid grid-cols-3 gap-6 max-w-xl mx-auto"
        >
          {[
            { value: "4.9/5",    label: "Average rating" },
            { value: "10,000+",  label: "Happy users" },
            { value: "93%",      label: "Got interviews" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-2xl text-ink">{s.value}</p>
              <p className="text-xs text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
