import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export function DiaText({
  text = [],
  repeat = false,
  repeatDelay = 2,
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    if (text.length <= 1) return;

    const timer = setInterval(() => {
      if (!repeat && indexRef.current >= text.length - 1) {
        clearInterval(timer);
        return;
      }
      indexRef.current = (indexRef.current + 1) % text.length;
      setIndex(indexRef.current);
    }, repeatDelay * 1000);

    return () => clearInterval(timer);
  }, [text, repeat, repeatDelay]);

  return (
    <span className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {text[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
