import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import useMeasure from "react-use-measure";
import useReducedMotion from "../../hooks/useReducedMotion";

type SliderItem = {
  id: string;
  label: string;
  icon: JSX.Element;
};

type InfiniteSliderProps = {
  items: SliderItem[];
  speed?: number;
  className?: string;
  itemClassName?: string;
};

export default function InfiniteSlider({
  items,
  speed = 38,
  className = "",
  itemClassName = "",
}: InfiniteSliderProps) {
  const [measureRef, { width }] = useMeasure();
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);

  const duplicatedItems = useMemo(() => [...items, ...items], [items]);
  const effectiveSpeed = reducedMotion ? 9999 : hovered ? speed * 0.72 : speed;

  useEffect(() => {
    x.set(0);
  }, [width, x]);

  useEffect(() => {
    if (!width || reducedMotion) return;

    const controls = animate(x, -width, {
      duration: width / effectiveSpeed,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });

    return controls.stop;
  }, [effectiveSpeed, reducedMotion, width, x]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
        <div ref={measureRef} className="flex w-max items-center gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex min-w-[176px] items-center justify-center rounded-2xl border border-slate-200/70 bg-white/90 px-5 py-3.5 shadow-[0_6px_24px_rgba(15,23,42,0.06)] ${itemClassName}`} 
            >
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className="flex w-max items-center gap-4"
        style={{ x }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className={`flex min-w-[176px] items-center justify-center rounded-2xl border border-slate-200/70 bg-white/90 px-5 py-3.5 shadow-[0_6px_24px_rgba(15,23,42,0.06)] ${itemClassName}`}
          >
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
