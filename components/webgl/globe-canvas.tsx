"use client";

import { useEffect, useRef, useState } from "react";
import { canAnimate } from "./shader-canvas";
import { startGlobe, type LatLon } from "./globe";
import { Icon3D } from "@/components/home/primitives";
import { cn } from "@/lib/cn";

/** Chandigarh, and the markets we serve. */
const HOME: LatLon = [30.73, 76.78];
const MARKETS: LatLon[] = [
  [40.71, -74.0], // New York
  [51.51, -0.13], // London
  [25.2, 55.27], // Dubai
  [43.65, -79.38], // Toronto
  [-33.87, 151.21], // Sydney
  [1.35, 103.82], // Singapore
];

/**
 * The interactive WebGL globe. Phones, reduced motion and low-power devices see the 3D globe
 * artwork instead, so the section never looks empty.
 */
export function GlobeCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<"pending" | "webgl" | "static">("pending");

  useEffect(() => {
    const el = ref.current!;
    if (!canAnimate()) { const t = setTimeout(() => setMode("static"), 0); return () => clearTimeout(t); }
    let stop: (() => void) | null = null;
    const gate = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting || stop) return;
      gate.disconnect();
      stop = startGlobe(el, HOME, MARKETS, () => setMode("webgl"));
    }, { rootMargin: "200px" });
    gate.observe(el);
    return () => { gate.disconnect(); stop?.(); };
  }, []);

  return (
    <div aria-hidden="true" className={cn("relative aspect-square w-full", className)}>
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgb(21_94_239/.14),transparent_70%)]" />
      <canvas ref={ref} className={cn("absolute inset-0 h-full w-full cursor-grab touch-pan-y transition-opacity duration-1000 active:cursor-grabbing", mode === "webgl" ? "opacity-100" : "opacity-0")} />
      {mode === "static" && (
        <div className="orbit-float absolute inset-[18%] grid place-items-center">
          <Icon3D name="globe" size={360} className="h-auto w-full drop-shadow-[0_30px_40px_rgba(9,9,11,.18)]" />
        </div>
      )}
    </div>
  );
}
