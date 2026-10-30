"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A thin orange line that fills as the reader moves through the process. */
export function ProcessLine({ children, className }: { children: ReactNode; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fill.current!.style.transform = "scaleY(1)";
      return;
    }
    let raf = 0;
    const update = () => {
      const r = wrap.current!.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh * 0.6 - r.top) / r.height, 0), 1);
      fill.current!.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={wrap} className={cn("relative", className)}>
      <span aria-hidden="true" className="absolute bottom-0 left-3 top-2 w-px bg-line">
        <span ref={fill} className="absolute inset-0 origin-top bg-ember [transform:scaleY(0)]" />
      </span>
      {children}
    </div>
  );
}
