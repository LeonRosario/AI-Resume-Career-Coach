import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const springX = useSpring(cursorX, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const springY = useSpring(cursorY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible, cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: springX,
        y: springY,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.04) 0%, rgba(124,58,237,0.02) 40%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
      aria-hidden="true"
    />
  );
}
