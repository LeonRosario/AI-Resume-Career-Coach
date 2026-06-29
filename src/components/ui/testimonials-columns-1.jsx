import { motion } from "motion/react";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Software Engineer",
    text: "CareerAI helped me improve my resume score from 62 to 91 and land more interviews with top tech companies.",
  },
  {
    name: "Priya Patel",
    role: "Frontend Developer",
    text: "Skill gap analysis showed exactly what I needed to learn before applying. It saved me months of directionless study.",
  },
  {
    name: "Rahul Verma",
    role: "Computer Science Graduate",
    text: "The AI interview coach helped me prepare with real company questions. I felt super confident going into my final rounds.",
  },
  {
    name: "Sneha Kapoor",
    role: "Data Analyst",
    text: "The ATS checker was a game changer. I got immediate feedback on keywords and formatting that actually get noticed.",
  },
  {
    name: "Arjun Mehta",
    role: "DevOps Engineer",
    text: "CareerAI's personalized roadmap highlighted the cloud certifications I was missing, helping me pivot seamlessly.",
  },
  {
    name: "Neha Singh",
    role: "Full Stack Developer",
    text: "I loved the mock interview analysis. The AI feedback on tone and body language was incredibly detailed and helpful.",
  },
  {
    name: "Kabir Malhotra",
    role: "Product Manager",
    text: "My resume went from a generic list of duties to an impact-driven narrative. Within two weeks, I had three interviews lined up.",
  },
  {
    name: "Riya Sen",
    role: "UX Researcher",
    text: "Having AI scan my resume against specific job descriptions made tailoring applications incredibly fast and efficient.",
  },
  {
    name: "Aditya Roy",
    role: "QA Engineer",
    text: "The transition from QA to development was made clear by the AI's step-by-step roadmap. Highly recommended!",
  },
];

function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

const col1 = [testimonials[0], testimonials[1], testimonials[2]];
const col2 = [testimonials[3], testimonials[4], testimonials[5]];
const col3 = [testimonials[6], testimonials[7], testimonials[8]];

function TestimonialCard({ item }) {
  return (
    <div
      className="p-6 transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
        border: "1px solid rgba(0, 132, 255, 0.15)",
        borderRadius: "24px",
        boxShadow: "0 20px 50px rgba(0, 132, 255, 0.12)",
      }}
    >
      <div className="flex items-center gap-3.5 mb-4">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(0,132,255,0.15) 0%, rgba(56,189,248,0.15) 100%)",
            border: "1.5px solid rgba(0,132,255,0.2)",
            color: "#0084FF",
          }}
        >
          {initials(item.name)}
        </div>
        <div>
          <h4
            className="text-sm font-semibold leading-tight"
            style={{ color: "#0F172A", fontFamily: "Poppins, sans-serif" }}
          >
            {item.name}
          </h4>
          <p
            className="text-xs mt-0.5"
            style={{ color: "#64748B", fontFamily: "Poppins, sans-serif" }}
          >
            {item.role}
          </p>
        </div>
      </div>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "#475569", fontFamily: "Poppins, sans-serif" }}
      >
        &ldquo;{item.text}&rdquo;
      </p>
    </div>
  );
}

function Column({ items, direction }) {
  const isUp = direction === "up";
  return (
    <motion.div
      animate={{ y: isUp ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 18,
          ease: "linear",
        },
      }}
      className="flex flex-col gap-6"
    >
      {items.map((item, idx) => (
        <TestimonialCard key={`a-${idx}`} item={item} />
      ))}
      {items.map((item, idx) => (
        <TestimonialCard key={`b-${idx}`} item={item} />
      ))}
    </motion.div>
  );
}

export default function TestimonialsColumns() {
  return (
    <section
      id="testimonials"
      className="relative bg-white py-24 px-6 overflow-hidden"
    >
      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,132,255,0.08) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className="inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.32em] mb-4"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(0,132,255,0.2)",
              color: "#0084FF",
              boxShadow: "0 2px 12px rgba(0,132,255,0.08)",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Testimonials
          </span>
          <h2
            className="text-3xl font-extrabold sm:text-4xl mt-2 tracking-tight"
            style={{ color: "#0F172A", fontFamily: "Poppins, sans-serif" }}
          >
            Trusted by job seekers worldwide
          </h2>
          <p
            className="mt-4 text-sm sm:text-base leading-relaxed"
            style={{ color: "#64748B", fontFamily: "Poppins, sans-serif" }}
          >
            See how CareerAI helps people build stronger resumes and careers.
          </p>
        </div>

        {/* Scrolling columns */}
        <div className="relative h-[660px] overflow-hidden rounded-[32px]">
          {/* Fade mask - top */}
          <div
            className="absolute top-0 inset-x-0 h-28 z-20 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, #FFFFFF 0%, rgba(255,255,255,0.95) 40%, transparent 100%)",
            }}
          />
          {/* Fade mask - bottom */}
          <div
            className="absolute bottom-0 inset-x-0 h-28 z-20 pointer-events-none"
            style={{
              background: "linear-gradient(to top, #FFFFFF 0%, rgba(255,255,255,0.95) 40%, transparent 100%)",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
            {/* Column 1 - scroll upward */}
            <div className="h-full overflow-hidden">
              <Column items={col1} direction="up" />
            </div>

            {/* Column 2 - scroll downward (hidden on mobile) */}
            <div className="h-full overflow-hidden hidden md:block">
              <Column items={col2} direction="down" />
            </div>

            {/* Column 3 - scroll upward (hidden on tablet) */}
            <div className="h-full overflow-hidden hidden lg:block">
              <Column items={col3} direction="up" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
