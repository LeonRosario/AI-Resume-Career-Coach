import { motion } from "motion/react";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    text: "CareerAI helped me improve my resume score from 62 to 91 and land more interviews with top tech companies.",
  },
  {
    name: "Priya Patel",
    role: "Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    text: "Skill gap analysis showed exactly what I needed to learn before applying. It saved me months of directionless study.",
  },
  {
    name: "Rahul Verma",
    role: "Computer Science Graduate",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    text: "The AI interview coach helped me prepare with real company questions. I felt super confident going into my final rounds.",
  },
  {
    name: "Sneha Kapoor",
    role: "Data Analyst",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    text: "The ATS checker was a game changer. I got immediate feedback on keywords and formatting that actually get noticed.",
  },
  {
    name: "Arjun Mehta",
    role: "DevOps Engineer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    text: "CareerAI's personalized roadmap pointed out cloud certifications I was missing, helping me pivot roles seamlessly.",
  },
  {
    name: "Neha Singh",
    role: "Full Stack Developer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    text: "I loved the mock interview analysis. The tone and body language feedback was incredibly detailed and helpful.",
  },
  {
    name: "Kabir Malhotra",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    text: "My resume went from a generic list of duties to an impact-driven narrative. Within two weeks, I had three interviews lined up.",
  },
  {
    name: "Riya Sen",
    role: "UX Researcher",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    text: "Having an AI scan my resume against specific job descriptions made tailoring my applications so fast and painless.",
  },
  {
    name: "Aditya Roy",
    role: "QA Engineer",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face",
    text: "The transition from QA to development was made clear by the AI's step-by-step roadmap. Highly recommended!",
  },
];

const col1 = [testimonials[0], testimonials[1], testimonials[2], testimonials[0], testimonials[1], testimonials[2]];
const col2 = [testimonials[3], testimonials[4], testimonials[5], testimonials[3], testimonials[4], testimonials[5]];
const col3 = [testimonials[6], testimonials[7], testimonials[8], testimonials[6], testimonials[7], testimonials[8]];

function TestimonialCard({ item }) {
  return (
    <div
      className="p-6 mb-6 font-poppins transition-transform duration-300 hover:scale-[1.02]"
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
        <img
          src={item.avatar}
          alt={item.name}
          className="w-11 h-11 rounded-full object-cover border border-blue-100"
        />
        <div>
          <h4 className="font-semibold text-sm text-slate-900 leading-tight">{item.name}</h4>
          <p className="text-xs text-slate-500 mt-0.5">{item.role}</p>
        </div>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed font-normal">
        "{item.text}"
      </p>
    </div>
  );
}

export default function TestimonialsColumns() {
  return (
    <section id="testimonials" className="relative bg-white py-24 px-6 font-poppins overflow-hidden">
      {/* Soft background blue gradient styling to blend with CareerAI */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,132,255,0.06) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
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
            }}
          >
            Testimonials
          </span>
          <h2 className="text-3xl font-extrabold sm:text-4xl text-slate-900 mt-2 tracking-tight">
            Trusted by job seekers worldwide
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed">
            See how CareerAI helps people build stronger resumes and careers.
          </p>
        </div>

        {/* Scrolling Columns Area */}
        <div className="relative h-[660px] overflow-hidden rounded-[32px] px-2">
          {/* Mask layers at top and bottom */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />

          {/* Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
            {/* Column 1: Upward */}
            <div className="h-full overflow-hidden">
              <motion.div
                animate={{ y: [0, -1000] }}
                transition={{
                  y: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 18,
                    ease: "linear",
                  },
                }}
                className="flex flex-col"
              >
                {col1.map((item, idx) => (
                  <TestimonialCard key={`c1-${idx}`} item={item} />
                ))}
                {col1.map((item, idx) => (
                  <TestimonialCard key={`c1-dup-${idx}`} item={item} />
                ))}
              </motion.div>
            </div>

            {/* Column 2: Downward */}
            <div className="h-full overflow-hidden hidden md:block">
              <motion.div
                animate={{ y: [-1000, 0] }}
                transition={{
                  y: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 18,
                    ease: "linear",
                  },
                }}
                className="flex flex-col"
              >
                {col2.map((item, idx) => (
                  <TestimonialCard key={`c2-${idx}`} item={item} />
                ))}
                {col2.map((item, idx) => (
                  <TestimonialCard key={`c2-dup-${idx}`} item={item} />
                ))}
              </motion.div>
            </div>

            {/* Column 3: Upward */}
            <div className="h-full overflow-hidden hidden lg:block">
              <motion.div
                animate={{ y: [0, -1000] }}
                transition={{
                  y: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 18,
                    ease: "linear",
                  },
                }}
                className="flex flex-col"
              >
                {col3.map((item, idx) => (
                  <TestimonialCard key={`c3-${idx}`} item={item} />
                ))}
                {col3.map((item, idx) => (
                  <TestimonialCard key={`c3-dup-${idx}`} item={item} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
