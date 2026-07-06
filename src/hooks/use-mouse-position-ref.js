import { useRef, useEffect, useCallback } from "react";

export function useMousePositionRef() {
  const ref = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      mouseRef.current = {
        x: rect.width > 0 ? (e.clientX - rect.left) / rect.width : 0.5,
        y: rect.height > 0 ? (e.clientY - rect.top) / rect.height : 0.5,
      };
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return { ref, mouseRef };
}
