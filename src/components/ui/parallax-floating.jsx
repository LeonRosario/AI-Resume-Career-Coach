import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export function ParallaxContainer({
  children,
  className = "",
  speed = 0.03,
  ...props
}) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (mobile) return;
    const onMove = (e) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const px = r.width > 0 ? (e.clientX - r.left) / r.width : 0.5;
      const py = r.height > 0 ? (e.clientY - r.top) / r.height : 0.5;
      mouseX.set(px);
      mouseY.set(py);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mobile, mouseX, mouseY]);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25 });

  const dx = useTransform(springX, [0, 1], [-speed * 100, speed * 100]);
  const dy = useTransform(springY, [0, 1], [-speed * 100, speed * 100]);

  return (
    <div ref={ref} className={className} {...props}>
      <motion.div
        style={mobile ? {} : { x: dx, y: dy }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function FloatingCard({
  children,
  className = "",
  floatY = 8,
  duration = 6,
  delay = 0,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: delay * 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...props}
    >
      <motion.div
        animate={{ y: [0, -floatY, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.5,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
