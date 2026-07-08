import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function CountUp({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1.5,
  delay = 0,
  className = "",
  ...props
}) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (v) => prefix + v.toFixed(decimals).replace(/\.0$/, "") + suffix);

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [count, to, duration, delay]);

  return <motion.span className={className} {...props}>{rounded}</motion.span>;
}
