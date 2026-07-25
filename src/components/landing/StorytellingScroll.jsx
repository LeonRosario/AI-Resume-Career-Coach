import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Sparkles, ShieldCheck, CheckCircle2,
  FileText, BarChart3, Briefcase, MessageSquare,
  Target, Star, Zap, ChevronRight,
  TrendingUp, Award,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: FileText, label: "Resume Builder" },
  { icon: ShieldCheck, label: "ATS Checker" },
  { icon: Zap, label: "AI Resume Rewrite" },
  { icon: Briefcase, label: "Job Match" },
  { icon: FileText, label: "Cover Letter Generator" },
  { icon: BarChart3, label: "Skill Gap Analysis" },
  { icon: MessageSquare, label: "Interview Coach" },
  { icon: TrendingUp, label: "Career Roadmap" },
];

const steps = [
  {
    id: "hero",
    badge: "✨ AI Resume Platform",
    heading: ["Land your next role.", "With confidence."],
    description:
      "Create an ATS-friendly resume in minutes using AI-powered suggestions, professional templates, and recruiter-approved formatting.",
    bg: "white",
    hasGlow: true,
    hasGrid: true,
  },
  {
    id: "build",
    badge: "STEP 01",
    heading: ["Build a Resume", "that recruiters notice."],
    description:
      "Generate a professional resume using AI. Choose modern templates. Import existing resumes. Export as ATS-friendly PDF.",
    bg: "career-light",
  },
  {
    id: "analyze",
    badge: "STEP 02",
    heading: ["Analyze your", "ATS Score"],
    description:
      "Upload your resume. Our AI checks formatting, keywords, readability, job compatibility, and grammar.",
    bg: "white",
  },
  {
    id: "match",
    badge: "STEP 03",
    heading: ["Match jobs", "instantly."],
    description:
      "Paste any job description. See your compatibility score, missing skills, and recommended improvements.",
    bg: "gray",
  },
  {
    id: "interview",
    badge: "STEP 04",
    heading: ["Practice interviews", "with AI."],
    description:
      "Generate personalized interview questions. Receive instant AI feedback. Practice until you are confident.",
    bg: "blue-light",
  },
  {
    id: "features",
    badge: "STEP 05",
    heading: ["Everything you need", "to get hired."],
    description: null,
    bg: "white",
  },
];

const bgMap = {
  white: "bg-white",
  "career-light": "bg-[#F8FBFF]",
  gray: "bg-[#F8F9FB]",
  "blue-light": "bg-[#F5F9FF]",
};

const cardBg = "rgba(255,255,255,0.96)";
const cardBorder = "1px solid rgba(79,140,255,0.12)";

function FloatBadge({ children, className = "" }) {
  return (
    <div className={`animate-float-md ${className}`}>
      {children}
    </div>
  );
}

export default function StorytellingScroll() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".story-panel");

      panels.forEach((panel, i) => {
        const isFirst = i === 0;
        const isLast = i === panels.length - 1;

        if (!isLast) {
          panel.style.willChange = "transform";
        }

        const contentItems = panel.querySelectorAll("[data-animate]");
        const visualItems = panel.querySelectorAll("[data-visual]");

        if (!isFirst) {
          gsap.set(panel, {
            rotateX: isMobile ? 5 : 12,
            scale: isMobile ? 0.97 : 0.94,
            transformOrigin: "50% 0%",
            opacity: 0.95,
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: isFirst ? "top top" : "top bottom",
            end: "+=100%",
            pin: !isLast,
            pinSpacing: true,
            anticipatePin: 1,
            toggleActions: "play none none reverse",
            fastScrollEnd: true,
            preventOverlaps: true,
          },
        });

        if (!isFirst) {
          tl.to(panel, {
            rotateX: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            force3D: true,
          }, 0);
        }

        const contentStart = isFirst ? 0 : 0.15;

        if (contentItems.length) {
          tl.fromTo(
            contentItems,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 0.4,
              ease: "power2.out",
              force3D: true,
            },
            contentStart
          );
        }

        if (visualItems.length) {
          tl.fromTo(
            visualItems,
            { y: 20, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.06,
              duration: 0.45,
              ease: "power2.out",
              force3D: true,
            },
            contentStart + 0.08
          );
        }
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const handleStartFree = () => navigate("/register");
  const handleViewDemo = () => {
    document
      .getElementById("features")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* ── SECTION 1 ── */}
      <section
        className={`story-panel relative min-h-screen flex items-center px-6 py-24 overflow-hidden ${bgMap[steps[0].bg]}`}
        style={{ willChange: "transform" }}
      >
        {steps[0].hasGlow && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-[-20%] left-[-10%] w-[120%] h-[80%] opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(79,140,255,0.12) 0%, transparent 70%)",
                filter: "blur(80px)",
              }}
            />
          </div>
        )}
        {steps[0].hasGrid && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute inset-0 opacity-[0.25]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(79,140,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(79,140,255,0.06) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />
          </div>
        )}

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-12 lg:gap-20 items-center">
            <div className="max-w-xl">
              <span
                data-animate
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide mb-8"
                style={{
                  background: "rgba(79,140,255,0.1)",
                  border: "1px solid rgba(79,140,255,0.2)",
                  color: "#4F8CFF",
                }}
              >
                <Sparkles size={12} />
                {steps[0].badge}
              </span>

              <div className="space-y-2">
                {steps[0].heading.map((line, li) => (
                  <h2
                    key={li}
                    data-animate
                    className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-ink leading-[1.08] tracking-tight"
                  >
                    {line}
                  </h2>
                ))}
              </div>

              <p
                data-animate
                className="text-base sm:text-lg text-muted mt-6 leading-relaxed max-w-lg"
              >
                {steps[0].description}
              </p>

              <div data-animate className="flex flex-wrap gap-3 mt-10">
                <button
                  onClick={handleStartFree}
                  className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110"
                  style={{
                    background:
                      "linear-gradient(135deg, #4F8CFF 0%, #2563EB 100%)",
                    boxShadow:
                      "0 8px 32px rgba(79,140,255,0.35), 0 2px 8px rgba(79,140,255,0.2)",
                  }}
                >
                  Start Building Free
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Visual */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px]">
                <div
                  className="absolute inset-0 rounded-[32px] pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 40%, rgba(79,140,255,0.15) 0%, transparent 70%)",
                    filter: "blur(60px)",
                  }}
                  aria-hidden="true"
                />

                <div
                  data-visual
                  className="relative overflow-hidden rounded-[28px]"
                  style={{
                    background: cardBg,
                    border: cardBorder,
                    boxShadow:
                      "0 32px 80px rgba(79,140,255,0.12), 0 8px 16px rgba(79,140,255,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-[2.5px]"
                    style={{
                      background:
                        "linear-gradient(90deg, #4F8CFF 0%, #6BA8FF 50%, #4F8CFF 100%)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-[#4F8CFF]">
                        AI Resume Preview
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-heading text-xl text-ink">Alex Chen</h3>
                      <p className="text-sm text-muted">Senior Product Designer</p>
                    </div>
                    <div
                      className="rounded-2xl p-4 mb-4"
                      style={{
                        background: "rgba(248,250,255,0.8)",
                        border: "1px solid rgba(79,140,255,0.1)",
                      }}
                    >
                      <div className="flex flex-wrap gap-2">
                        {["AI Strategy", "UX Design", "Product Ops"].map((s) => (
                          <span
                            key={s}
                            className="rounded-full px-3 py-1 text-[11px] font-medium"
                            style={{
                              background: "rgba(255,255,255,0.9)",
                              border: "1px solid rgba(79,140,255,0.16)",
                              color: "#4F8CFF",
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.24em] font-medium text-placeholder">
                        Experience
                      </p>
                      {[
                        { title: "Lead Product Designer", company: "Nexa Labs" },
                        { title: "Senior UX Consultant", company: "Pulse AI" },
                      ].map((item) => (
                        <div
                          key={item.title}
                          className="rounded-2xl p-3.5"
                          style={{
                            background: "rgba(248,250,255,0.8)",
                            border: "1px solid rgba(79,140,255,0.06)",
                          }}
                        >
                          <p className="text-sm font-semibold text-ink">{item.title}</p>
                          <p className="text-xs text-muted">{item.company}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <FloatBadge className="absolute -top-4 -left-4 hidden md:block">
                  <div
                    className="rounded-2xl px-4 py-3 min-w-[150px]"
                    style={{
                      background: "rgba(255,255,255,0.96)",
                      border: "1px solid rgba(79,140,255,0.16)",
                      boxShadow:
                        "0 8px 28px rgba(79,140,255,0.1), 0 2px 8px rgba(79,140,255,0.05)",
                    }}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-muted mb-1.5">
                      <ShieldCheck size={12} style={{ color: "#4F8CFF" }} />
                      ATS Score
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-9 h-9">
                        <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="14.5" fill="none" stroke="rgba(79,140,255,0.1)" strokeWidth="3" />
                          <circle cx="18" cy="18" r="14.5" fill="none" stroke="#4F8CFF" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 14.5}`} strokeDashoffset={2 * Math.PI * 14.5 * 0.08} />
                        </svg>
                      </div>
                      <span className="text-lg font-bold text-ink">
                        92<span className="text-xs text-muted font-medium">/100</span>
                      </span>
                    </div>
                  </div>
                </FloatBadge>

                <FloatBadge className="absolute -bottom-3 -right-3 hidden md:block">
                  <div
                    className="rounded-2xl px-4 py-3 min-w-[150px]"
                    style={{
                      background: "rgba(255,255,255,0.96)",
                      border: "1px solid rgba(79,140,255,0.16)",
                      boxShadow:
                        "0 8px 28px rgba(79,140,255,0.1), 0 2px 8px rgba(79,140,255,0.05)",
                    }}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-muted mb-1.5">
                      <Award size={12} className="text-emerald-500" />
                      Job Match
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg font-bold text-ink">87%</span>
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(79,140,255,0.08)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: "87%", background: "linear-gradient(90deg, #22C55E, #16A34A)" }}
                        />
                      </div>
                    </div>
                  </div>
                </FloatBadge>

                <FloatBadge className="absolute -top-2 -right-2 hidden lg:block">
                  <div
                    className="rounded-2xl px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.96)",
                      border: "1px solid rgba(79,140,255,0.16)",
                      boxShadow:
                        "0 8px 28px rgba(79,140,255,0.1), 0 2px 8px rgba(79,140,255,0.05)",
                    }}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-muted mb-1">
                      <Zap size={12} className="text-amber-500" />
                      AI Optimized
                    </div>
                    <p className="text-xs font-semibold text-ink">3 improvements found</p>
                  </div>
                </FloatBadge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTIONS 2-5 ── */}
      {steps.slice(1, 5).map((step) => (
        <section
          key={step.id}
          className={`story-panel relative min-h-screen flex items-center px-6 py-24 overflow-hidden ${bgMap[step.bg]}`}
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-12 lg:gap-20 items-center">
              <div className="max-w-xl">
                <span
                  data-animate
                  className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-widest mb-8"
                  style={{
                    background: "rgba(79,140,255,0.08)",
                    border: "1px solid rgba(79,140,255,0.15)",
                    color: "#4F8CFF",
                  }}
                >
                  {step.badge}
                </span>

                <div className="space-y-2">
                  {step.heading.map((line, li) => (
                    <h2
                      key={li}
                      data-animate
                      className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-ink leading-[1.08] tracking-tight"
                    >
                      {line}
                    </h2>
                  ))}
                </div>

                {step.description && (
                  <p
                    data-animate
                    className="text-base sm:text-lg text-muted mt-6 leading-relaxed"
                  >
                    {step.description}
                  </p>
                )}

                {step.id === "interview" && (
                  <div data-animate className="flex flex-wrap gap-3 mt-10">
                    <button
                      onClick={handleStartFree}
                      className="inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110"
                      style={{
                        background: "linear-gradient(135deg, #4F8CFF 0%, #2563EB 100%)",
                        boxShadow: "0 8px 32px rgba(79,140,255,0.35), 0 2px 8px rgba(79,140,255,0.2)",
                      }}
                    >
                      Try AI Interview
                      <ChevronRight size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                )}
              </div>

              <div className="relative flex justify-center lg:justify-end">
                {step.id === "build" && <BuildVisual />}
                {step.id === "analyze" && <AnalyzeVisual />}
                {step.id === "match" && <MatchVisual />}
                {step.id === "interview" && <InterviewVisual />}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── SECTION 6: Feature Grid ── */}
      <section
        className={`story-panel relative min-h-screen flex items-center px-6 py-24 overflow-hidden ${bgMap["white"]}`}
      >
        <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
          <span
            data-animate
            className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-widest mb-8"
            style={{
              background: "rgba(79,140,255,0.08)",
              border: "1px solid rgba(79,140,255,0.15)",
              color: "#4F8CFF",
            }}
          >
            STEP 05
          </span>

          <div className="space-y-2 mb-12">
            {["Everything you need", "to get hired."].map((line, li) => (
              <h2
                key={li}
                data-animate
                className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-ink leading-[1.08] tracking-tight"
              >
                {line}
              </h2>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {features.map((feat) => (
              <div
                key={feat.label}
                data-visual
                className="rounded-2xl p-5 text-center"
                style={{
                  background: "rgba(248,250,255,0.8)",
                  border: "1px solid rgba(79,140,255,0.1)",
                }}
              >
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3"
                  style={{ background: "rgba(79,140,255,0.1)", color: "#4F8CFF" }}
                >
                  <feat.icon size={20} strokeWidth={1.8} />
                </div>
                <p className="text-sm font-semibold text-ink">{feat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="story-panel relative min-h-screen flex items-center px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(79,140,255,0.2) 0%, rgba(37,99,235,0.08) 40%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-[10%] left-[5%] w-72 h-72 rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(79,140,255,0.25) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute bottom-[15%] right-[8%] w-96 h-96 rounded-full opacity-25"
            style={{
              background: "radial-gradient(circle, rgba(107,168,255,0.2) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <div
            data-animate
            className="rounded-[32px] p-10 sm:p-14 md:p-20"
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow:
                "0 32px 80px rgba(79,140,255,0.12), 0 8px 24px rgba(79,140,255,0.06), inset 0 1px 0 rgba(255,255,255,0.95)",
            }}
          >
            <div className="space-y-3 mb-6">
              {["Your dream job starts", "with a better resume."].map((line, li) => (
                <h2
                  key={li}
                  data-animate
                  className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-ink leading-[1.08] tracking-tight"
                >
                  {line}
                </h2>
              ))}
            </div>

            <p
              data-animate
              className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Join thousands of job seekers using CareerAI to build resumes that
              pass ATS filters and impress recruiters.
            </p>

            <div
              data-animate
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={handleStartFree}
                className="inline-flex items-center gap-2 rounded-2xl px-10 py-4 text-base font-semibold text-white transition-all duration-300 hover:brightness-110"
                style={{
                  background: "linear-gradient(135deg, #4F8CFF 0%, #2563EB 100%)",
                  boxShadow: "0 8px 32px rgba(79,140,255,0.35), 0 2px 8px rgba(79,140,255,0.2)",
                }}
              >
                Start Free
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
              <button
                onClick={handleViewDemo}
                className="inline-flex items-center gap-2 rounded-2xl px-10 py-4 text-base font-semibold transition-all duration-300"
                style={{
                  background: "rgba(248,250,255,0.8)",
                  border: "1px solid rgba(79,140,255,0.18)",
                  color: "#1E2A3B",
                  boxShadow: "0 4px 16px rgba(79,140,255,0.06), 0 1px 4px rgba(79,140,255,0.04)",
                }}
              >
                View Demo
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        <FloatBadge className="absolute top-[12%] right-[8%] hidden lg:block">
          <div
            className="rounded-2xl px-5 py-4"
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(79,140,255,0.12)",
              boxShadow: "0 8px 28px rgba(79,140,255,0.08), 0 2px 8px rgba(79,140,255,0.04)",
            }}
          >
            <div className="flex items-center gap-2 text-xs text-muted mb-1">
              <ShieldCheck size={14} style={{ color: "#4F8CFF" }} />
              ATS Score
            </div>
            <p className="font-heading text-xl text-ink">
              92<span className="text-sm text-muted">/100</span>
            </p>
          </div>
        </FloatBadge>
        <FloatBadge className="absolute bottom-[18%] left-[6%] hidden lg:block">
          <div
            className="rounded-2xl px-5 py-4"
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(79,140,255,0.12)",
              boxShadow: "0 8px 28px rgba(79,140,255,0.08), 0 2px 8px rgba(79,140,255,0.04)",
            }}
          >
            <div className="flex items-center gap-2 text-xs text-muted mb-1">
              <Star size={14} className="text-amber-500" />
              Interview Ready
            </div>
            <p className="font-heading text-xl text-ink">9.2 / 10</p>
          </div>
        </FloatBadge>
      </section>
    </div>
  );
}

/* ── Visual sub-components ── */

function BuildVisual() {
  return (
    <div
      data-visual
      className="relative w-full max-w-[480px] overflow-hidden rounded-[28px]"
      style={{
        background: cardBg,
        border: cardBorder,
        boxShadow: "0 32px 80px rgba(79,140,255,0.1), 0 8px 16px rgba(79,140,255,0.05)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, #4F8CFF, #6BA8FF, #4F8CFF)" }}
        aria-hidden="true"
      />
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-[#4F8CFF]">
            Resume Editor
          </span>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
        </div>

        <div className="grid grid-cols-[1fr,2fr] gap-3">
          <div className="space-y-2">
            {["Experience", "Education", "Skills", "Projects"].map((section) => (
              <div
                key={section}
                className="rounded-lg px-3 py-2 text-xs font-medium"
                style={{
                  background: "rgba(79,140,255,0.06)",
                  border: "1px solid rgba(79,140,255,0.1)",
                  color: "#4F8CFF",
                }}
              >
                {section}
              </div>
            ))}
          </div>
          <div
            className="rounded-xl p-3"
            style={{
              background: "rgba(248,250,255,0.8)",
              border: "1px solid rgba(79,140,255,0.08)",
            }}
          >
            <div className="space-y-2">
              <div className="h-2.5 rounded-full w-3/4" style={{ background: "rgba(79,140,255,0.12)" }} />
              <div className="h-2 rounded-full w-1/2" style={{ background: "rgba(79,140,255,0.08)" }} />
              <div className="h-2 rounded-full w-5/6" style={{ background: "rgba(79,140,255,0.08)" }} />
            </div>
          </div>
        </div>

        <FloatBadge className="absolute -bottom-2 -right-2 hidden sm:block">
          <div
            className="rounded-xl px-4 py-3"
            style={{
              background: "rgba(255,255,255,0.96)",
              border: "1px solid rgba(79,140,255,0.2)",
              boxShadow: "0 8px 24px rgba(79,140,255,0.15), 0 2px 6px rgba(79,140,255,0.08)",
            }}
          >
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted mb-1">
              <Sparkles size={11} style={{ color: "#4F8CFF" }} />
              AI Suggestion
            </div>
            <p className="text-xs font-medium text-ink">Add action verbs for impact</p>
          </div>
        </FloatBadge>
      </div>
    </div>
  );
}

function AnalyzeVisual() {
  return (
    <div
      data-visual
      className="relative w-full max-w-[480px] overflow-hidden rounded-[28px] p-6 sm:p-8"
      style={{
        background: cardBg,
        border: cardBorder,
        boxShadow: "0 32px 80px rgba(79,140,255,0.1), 0 8px 16px rgba(79,140,255,0.05)",
      }}
    >
      <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-[#4F8CFF] mb-6 block">
        ATS Analysis
      </span>

      <div className="flex justify-center mb-6">
        <div className="relative w-36 h-36">
          <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(79,140,255,0.08)" strokeWidth="8" />
            <circle cx="60" cy="60" r="52" fill="none" stroke="#4F8CFF" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 52}`} strokeDashoffset={2 * Math.PI * 52 * 0.08} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading text-3xl text-ink">92</span>
            <span className="text-xs text-muted -mt-1">/100</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { label: "Formatting", score: 95 },
          { label: "Keywords", score: 88 },
          { label: "Readability", score: 92 },
          { label: "Job Compatibility", score: 78 },
        ].map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted">{item.label}</span>
              <span className="text-xs font-semibold text-ink">{item.score}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(79,140,255,0.08)" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${item.score}%`, background: "linear-gradient(90deg, #4F8CFF, #6BA8FF)" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MatchVisual() {
  return (
    <div
      data-visual
      className="relative w-full max-w-[480px] overflow-hidden rounded-[28px] p-6 sm:p-8"
      style={{
        background: cardBg,
        border: cardBorder,
        boxShadow: "0 32px 80px rgba(79,140,255,0.1), 0 8px 16px rgba(79,140,255,0.05)",
      }}
    >
      <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-[#4F8CFF] mb-5 block">
        Job Match Dashboard
      </span>

      <div className="flex items-center gap-4 mb-6">
        <div
          className="rounded-2xl px-5 py-4 text-center shrink-0"
          style={{
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.2)",
          }}
        >
          <span className="font-heading text-4xl text-emerald-600">87</span>
          <span className="text-sm text-emerald-600 ml-0.5">%</span>
          <p className="text-[10px] text-emerald-700 font-medium mt-0.5">Match Score</p>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-ink mb-1">Strong Match</p>
          <p className="text-[11px] text-muted">Your resume aligns well with this role</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-wider font-medium text-placeholder mb-2">
          Skill Gaps
        </p>
        {[
          { skill: "TensorFlow", level: "Missing", color: "text-red-500" },
          { skill: "Kubernetes", level: "Needs improvement", color: "text-amber-500" },
          { skill: "Python", level: "Matched", color: "text-emerald-500" },
        ].map((item) => (
          <div
            key={item.skill}
            className="flex items-center justify-between rounded-xl px-4 py-2.5"
            style={{
              background: "rgba(248,250,255,0.8)",
              border: "1px solid rgba(79,140,255,0.06)",
            }}
          >
            <span className="text-sm font-medium text-ink">{item.skill}</span>
            <span className={`text-[11px] font-semibold ${item.color}`}>{item.level}</span>
          </div>
        ))}
      </div>

      <FloatBadge className="absolute -bottom-2 -left-2 hidden sm:block">
        <div
          className="rounded-xl px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.96)",
            border: "1px solid rgba(79,140,255,0.2)",
            boxShadow: "0 8px 24px rgba(79,140,255,0.15), 0 2px 6px rgba(79,140,255,0.08)",
          }}
        >
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted mb-1">
            <Target size={11} style={{ color: "#4F8CFF" }} />
            AI Recommendation
          </div>
          <p className="text-xs font-medium text-ink">Add TensorFlow experience</p>
        </div>
      </FloatBadge>
    </div>
  );
}

function InterviewVisual() {
  return (
    <div
      data-visual
      className="relative w-full max-w-[480px] overflow-hidden rounded-[28px]"
      style={{
        background: cardBg,
        border: cardBorder,
        boxShadow: "0 32px 80px rgba(79,140,255,0.1), 0 8px 16px rgba(79,140,255,0.05)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, #4F8CFF, #6BA8FF, #4F8CFF)" }}
        aria-hidden="true"
      />
      <div className="p-5 sm:p-6">
        <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-[#4F8CFF] mb-4 block">
          AI Interview Coach
        </span>

        <div className="space-y-3 mb-4">
          <div
            className="rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%]"
            style={{
              background: "rgba(79,140,255,0.08)",
              border: "1px solid rgba(79,140,255,0.12)",
            }}
          >
            <p className="text-xs font-medium text-ink">
              Tell me about a time you led a cross-functional team.
            </p>
          </div>
          <div
            className="rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%] ml-auto"
            style={{
              background: "rgba(79,140,255,0.04)",
              border: "1px solid rgba(79,140,255,0.06)",
            }}
          >
            <p className="text-xs text-muted">I led a team of 5 designers and 3 engineers...</p>
          </div>
        </div>

        <div
          className="rounded-xl p-4 mb-4"
          style={{
            background: "rgba(248,250,255,0.8)",
            border: "1px solid rgba(79,140,255,0.06)",
          }}
        >
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted mb-2">
            <MessageSquare size={11} style={{ color: "#4F8CFF" }} />
            Voice Analysis
          </div>
          <div className="flex items-end gap-[3px] h-8">
            {[40, 55, 35, 70, 50, 80, 45, 60, 30, 65, 50, 75, 40, 55, 45, 70].map((h, i) => (
              <div
                key={i}
                className="w-[6px] rounded-full"
                style={{
                  height: `${h}%`,
                  background: i % 3 === 0 ? "#4F8CFF" : "rgba(79,140,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>

        <div
          className="rounded-xl px-4 py-3 flex items-center justify-between"
          style={{
            background: "rgba(34,197,94,0.06)",
            border: "1px solid rgba(34,197,94,0.12)",
          }}
        >
          <div>
            <p className="text-xs font-semibold text-emerald-700">Strong Response</p>
            <p className="text-[10px] text-emerald-600 mt-0.5">
              Clarity: 9/10 · Confidence: 8/10
            </p>
          </div>
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
        </div>
      </div>
    </div>
  );
}
