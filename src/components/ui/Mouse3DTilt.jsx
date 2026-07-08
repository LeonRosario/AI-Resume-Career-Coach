import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Mouse3DTilt({
  children,
  className = "",
  intensity = 10,
  ...props
}) {
  const ref = useRef(null);
  const [mobile, setMobile] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

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

  const springX = useSpring(mouseX, { stiffness: 80, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 30 });

  const rotateX = useTransform(springY, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(springX, [0, 1], [-intensity, intensity]);

  return (
    <motion.div
      ref={ref}
      style={mobile ? {} : { rotateX, rotateY, perspective: 1000 }}
      className={`will-change-transform ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
