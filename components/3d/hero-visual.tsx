"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SculptureFallback } from "./sculpture-fallback";
import { cn } from "@/lib/cn";

const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

type Tier = "high" | "low" | "none";

function detectTier(): Tier {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "none";
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return "none";
  try {
    const c = document.createElement("canvas");
    if (!(c.getContext("webgl2") || c.getContext("webgl"))) return "none";
  } catch {
    return "none";
  }
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  if (cores <= 2 || memory < 2) return "none";
  // Phones get the static sculpture: on mid-range Android over mobile data, a fast first
  // interaction matters more than real-time reflections.
  if (window.matchMedia("(max-width: 767px)").matches) return "none";
  return cores <= 4 || memory <= 4 ? "low" : "high";
}

export function HeroVisual() {
  const [tier, setTier] = useState<Tier | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait until the browser is idle so the 3D bundle never competes with the headline for first paint.
    const start = () => setTier(detectTier());
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative aspect-square w-full">
      <div className={cn("absolute inset-0 transition-opacity duration-1000", ready ? "opacity-0" : "opacity-100")}>
        <SculptureFallback />
      </div>
      {tier && tier !== "none" && (
        <div className={cn("absolute inset-0 transition-opacity duration-1000", ready ? "opacity-100" : "opacity-0")}>
          <HeroScene tier={tier} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
