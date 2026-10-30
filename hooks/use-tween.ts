"use client";

import { useEffect, useRef, useState } from "react";

/** Tweens a displayed number toward its target so results count rather than jump. */
export function useTween(target: number, ms = 550, initial?: number) {
  const [value, setValue] = useState(initial ?? target);
  const from = useRef(initial ?? target);
  const shown = useRef(initial ?? target);
  useEffect(() => {
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : ms;
    from.current = shown.current;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = duration ? Math.min((t - start) / duration, 1) : 1;
      const eased = 1 - Math.pow(1 - k, 4);
      const v = from.current + (target - from.current) * eased;
      shown.current = v;
      setValue(v);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return value;
}
