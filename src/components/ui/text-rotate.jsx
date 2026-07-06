import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export function TextRotate({
  texts = [],
  interval = 3000,
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    if (texts.length <= 1) return;
    const timer = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % texts.length;
      setIndex(indexRef.current);
    }, interval);
    return () => clearInterval(timer);
  }, [texts, interval]);

  return (
    <span className="relative inline-block">
      <span className="invisible" aria-hidden="true">
        {texts.reduce((a, b) => (a.length > b.length ? a : b), "")}
      </span>
      <span className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`inline-block ${className}`}
          >
            {texts[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
