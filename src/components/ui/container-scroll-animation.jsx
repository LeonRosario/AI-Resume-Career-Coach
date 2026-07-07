import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function ContainerScrollAnimation({
  children,
  title,
  subtitle,
  description,
}) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: isMobile ? 120 : 80,
    damping: 30,
    restDelta: 0.001,
  });

  const rotateX = useTransform(
    smoothProgress,
    [0, 0.75],
    [isMobile ? 5 : 32, 0]
  );
  const scale = useTransform(
    smoothProgress,
    [0, 0.75],
    [isMobile ? 0.92 : 0.85, 1]
  );
  const translateY = useTransform(
    smoothProgress,
    [0, 0.75],
    [isMobile ? 30 : 100, 0]
  );
  const titleOpacity = useTransform(
    smoothProgress,
    [0, 0.15, 0.5, 0.85],
    [0, 1, 1, 0]
  );
  const titleY = useTransform(
    smoothProgress,
    [0, 0.85],
    [isMobile ? 20 : 40, isMobile ? -20 : -60]
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ height: isMobile ? "140vh" : "150vh" }}
    >
      <div
        className="sticky top-0 flex flex-col items-center justify-start md:justify-center overflow-hidden"
        style={{ height: "100vh", paddingTop: isMobile ? "100px" : "80px" }}
      >
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center max-w-3xl mx-auto px-6 mb-6 md:mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink leading-tight">
            {title}
          </h2>
          <p className="text-muted text-base md:text-lg lg:text-xl mt-3 md:mt-4 font-medium">
            {subtitle}
          </p>
          {description && (
            <p className="text-muted/80 text-sm md:text-base mt-3 md:mt-4 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>

        <div className="w-full max-w-5xl mx-auto px-3 md:px-6 origin-top" style={{ perspective: isMobile ? "600px" : "1200px" }}>
          <motion.div
            style={{
              rotateX,
              scale,
              y: translateY,
              transformStyle: "preserve-3d",
            }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
