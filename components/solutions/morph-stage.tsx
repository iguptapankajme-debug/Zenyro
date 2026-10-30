"use client";

import { useEffect, useRef } from "react";
import { getShape, POINTS, type Pt } from "./morph-shapes";
import { cn } from "@/lib/cn";

/*
  One shape, never cut. A single outline of POINTS vertices morphs between industry emblems.

  - Every vertex rides its own damped spring (ζ≈0.82: a hint of overshoot, never bouncy).
  - Stiffness varies around the perimeter as a wave whose phase rotates on every change, so one
    side of the shape leads and stretches ahead while the other trails: a liquid morph.
  - A ghost outline follows on a much softer spring, tracing the motion.
  - The pointer pushes the surface away within a radius, which springs back on leave.
  - The loop sleeps when the shape is settled or off screen; reduced motion snaps to the target.
*/

type Props = {
  shape: string;
  className?: string;
  /** Draw from a circle into the first shape on mount. */
  intro?: boolean;
  /** Fill colour of the shape. */
  color?: string;
};

const K_MIN = 90;
const K_MAX = 230;
const ZETA = 0.82;
const GHOST_K = 26;
const POINTER_RADIUS = 0.55;
const POINTER_PUSH = 0.16;

export function MorphStage({ shape, className, intro = true, color = "#FF6B35" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engine = useRef<{ setTarget: (s: string) => void } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const start = getShape(intro && !reduce ? "circle" : shape);
    const pos: Pt[] = start.map((p) => [p[0], p[1]]);
    const vel: Pt[] = start.map(() => [0, 0]);
    const ghost: Pt[] = start.map((p) => [p[0], p[1]]);
    const ghostVel: Pt[] = start.map(() => [0, 0]);
    let target = getShape(shape);
    let phase = 0;
    const stiffness = new Float32Array(POINTS);
    const setPhase = (ph: number) => {
      for (let i = 0; i < POINTS; i++) {
        const w = 0.5 + 0.5 * Math.cos(((i / POINTS) * 2 - ph) * Math.PI);
        stiffness[i] = K_MIN + (K_MAX - K_MIN) * w;
      }
    };
    setPhase(0);

    let w = 1, h = 1, scale = 1, cx = 0, cy = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      scale = Math.min(w, h) * 0.36;
      cx = w / 2;
      cy = h / 2;
      wake();
    };

    const pointer = { x: 0, y: 0, active: false };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - r.left - cx) / scale;
      pointer.y = (e.clientY - r.top - cy) / scale;
      pointer.active = e.pointerType === "mouse";
      wake();
    };
    const onLeave = () => { pointer.active = false; wake(); };

    let raf = 0;
    let last = 0;
    let visible = true;
    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const path = (pts: Pt[]) => {
        ctx.beginPath();
        // Quadratic curves through midpoints keep the outline smooth at any size.
        const n = pts.length;
        const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        let m = mid(pts[n - 1]!, pts[0]!);
        ctx.moveTo(cx + m[0] * scale, cy + m[1] * scale);
        for (let i = 0; i < n; i++) {
          const p = pts[i]!;
          m = mid(p, pts[(i + 1) % n]!);
          ctx.quadraticCurveTo(cx + p[0] * scale, cy + p[1] * scale, cx + m[0] * scale, cy + m[1] * scale);
        }
        ctx.closePath();
      };
      path(ghost);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(247,247,245,0.28)";
      ctx.stroke();
      path(pos);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const step = (t: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min((t - (last || t)) / 1000, 1 / 30);
      last = t;
      let energy = 0;
      for (let i = 0; i < POINTS; i++) {
        const tgt = target[i]!;
        let tx = tgt[0];
        let ty = tgt[1];
        if (pointer.active) {
          const dx = pos[i]![0] - pointer.x;
          const dy = pos[i]![1] - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < POINTER_RADIUS && d > 1e-4) {
            const f = POINTER_PUSH * (1 - d / POINTER_RADIUS) ** 2;
            tx += (dx / d) * f;
            ty += (dy / d) * f;
          }
        }
        const k = stiffness[i]!;
        const c = 2 * ZETA * Math.sqrt(k);
        const p = pos[i]!;
        const v = vel[i]!;
        v[0] += (k * (tx - p[0]) - c * v[0]) * dt;
        v[1] += (k * (ty - p[1]) - c * v[1]) * dt;
        p[0] += v[0] * dt;
        p[1] += v[1] * dt;
        const g = ghost[i]!;
        const gv = ghostVel[i]!;
        const gc = 2 * 0.9 * Math.sqrt(GHOST_K);
        gv[0] += (GHOST_K * (p[0] - g[0]) - gc * gv[0]) * dt;
        gv[1] += (GHOST_K * (p[1] - g[1]) - gc * gv[1]) * dt;
        g[0] += gv[0] * dt;
        g[1] += gv[1] * dt;
        energy += Math.abs(v[0]) + Math.abs(v[1]) + Math.abs(gv[0]) + Math.abs(gv[1]) + Math.abs(tx - p[0]) + Math.abs(ty - p[1]);
      }
      draw();
      if (energy > 0.002 || pointer.active) raf = requestAnimationFrame(step);
      else last = 0;
    };
    function wake() {
      if (reduce) {
        target.forEach((p, i) => { pos[i] = [p[0], p[1]]; ghost[i] = [p[0], p[1]]; });
        draw();
        return;
      }
      if (!raf && visible) raf = requestAnimationFrame(step);
    }

    engine.current = {
      setTarget: (s: string) => {
        target = getShape(s);
        phase = (phase + 0.6) % 2; // rotate the stiffness wave so each morph leads from a new side
        setPhase(phase);
        wake();
      },
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible) wake();
    });
    io.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      engine.current = null;
    };
    // The engine is created once; later shape changes go through setTarget below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    engine.current?.setTarget(shape);
  }, [shape]);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("block h-full w-full touch-pan-y", className)} />;
}
