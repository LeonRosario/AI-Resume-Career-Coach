import { useState, useEffect, useRef, useCallback } from "react";
import useReducedMotion from "./useReducedMotion";

export default function useTypewriter(text, { speed = 45, enabled = true } = {}) {
  const reduced = useReducedMotion();
  const [displayText, setDisplayText] = useState(() => (reduced || !enabled ? text : ""));
  const [isTyping, setIsTyping] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(() => reduced || !enabled);
  const intervalRef = useRef(null);
  const indexRef = useRef(0);
  const textRef = useRef(text);

  textRef.current = text;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (reduced) {
      setDisplayText(textRef.current);
      setIsTyping(false);
      setHasCompleted(true);
      return;
    }

    clearTimer();
    setIsTyping(true);
    setHasCompleted(false);
    indexRef.current = 0;
    setDisplayText("");

    intervalRef.current = setInterval(() => {
      if (indexRef.current < textRef.current.length) {
        setDisplayText(textRef.current.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearTimer();
        setIsTyping(false);
        setHasCompleted(true);
      }
    }, speed);
  }, [speed, reduced, clearTimer]);

  useEffect(() => {
    if (enabled) {
      start();
    }
    return clearTimer;
  }, [enabled, start, clearTimer]);

  return { displayText, isTyping, hasCompleted, start };
}
