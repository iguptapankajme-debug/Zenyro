"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Subtle perspective tilt that follows a fine pointer. Does nothing on touch or with reduced motion. */
export function Tilt({ children, className, max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--rx", `${(-py * max).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(px * max).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
    });
  };
  const reset = () => {
    const el = ref.current!;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="[perspective:1200px]">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className={cn(
          "relative transition-transform duration-700 ease-out-expo motion-reduce:transform-none [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] [transform-style:preserve-3d]",
          className,
        )}
      >
        {children}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 [background:radial-gradient(500px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,107,53,.08),transparent_45%)] group-hover/tilt:opacity-100"
        />
      </div>
    </div>
  );
}
