"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { shaders, type ShaderName } from "./shaders";

/**
 * Lightweight full-bleed WebGL backdrop: one quad, one fragment shader, no three.js.
 *
 * - The WebGL context is only created when the canvas first comes near the viewport, so pages
 *   with several backdrops don't pay for the ones the visitor never reaches.
 * - Renders only while on screen and the tab is visible, with capped DPR and a 40fps ceiling.
 * - Skipped on phones, low-memory devices, Save-Data and reduced motion: the CSS fallback
 *   (passed as `className` on the wrapper) is what those visitors see.
 * - Uniforms: uTime, uRes, uMouse (0–1), uIntensity, uScroll (page scroll in viewport heights).
 */
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

function canAnimate() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.matchMedia("(max-width: 767px)").matches) return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return false;
  if ((nav.deviceMemory ?? 4) < 4 || (nav.hardwareConcurrency ?? 4) <= 2) return false;
  return true;
}

function start(el: HTMLCanvasElement, shader: ShaderName, intensity: number, onFirstFrame: () => void) {
  const gl = el.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: false, powerPreference: "low-power" });
  if (!gl) return () => {};
  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, shaders[shader]);
  if (!vs || !fs) return () => {};
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return () => {};
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = (n: string) => gl.getUniformLocation(prog, n);
  const uTime = u("uTime"), uRes = u("uRes"), uMouse = u("uMouse"), uIntensity = u("uIntensity"), uScroll = u("uScroll");

  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  const resize = () => {
    const r = el.getBoundingClientRect();
    el.width = Math.max(1, Math.round(r.width * dpr));
    el.height = Math.max(1, Math.round(r.height * dpr));
    gl.viewport(0, 0, el.width, el.height);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(el);

  const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
  const onMove = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    mouse.tx = (e.clientX - r.left) / r.width;
    mouse.ty = 1 - (e.clientY - r.top) / r.height;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  let visible = true;
  let drawn = false;
  let raf = 0;
  let last = 0;
  let scroll = window.scrollY / window.innerHeight;
  const t0 = performance.now();
  const frame = (t: number) => {
    raf = 0;
    if (!visible || document.hidden) return;
    raf = requestAnimationFrame(frame);
    if (t - last < 25) return; // ~40fps ceiling
    last = t;
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;
    scroll += (window.scrollY / window.innerHeight - scroll) * 0.12;
    gl.uniform1f(uTime, (t - t0) / 1000);
    gl.uniform2f(uRes, el.width, el.height);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.uniform1f(uIntensity, intensity);
    gl.uniform1f(uScroll, scroll);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!drawn) {
      drawn = true;
      onFirstFrame();
    }
  };
  const io = new IntersectionObserver(([e]) => {
    visible = !!e?.isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(frame);
  }, { rootMargin: "100px" });
  io.observe(el);
  const onVis = () => { if (!document.hidden && visible && !raf) raf = requestAnimationFrame(frame); };
  document.addEventListener("visibilitychange", onVis);
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("visibilitychange", onVis);
    gl.deleteProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.deleteBuffer(buf);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
}

export function ShaderCanvas({ shader, className, intensity = 1 }: { shader: ShaderName; className?: string; intensity?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!canAnimate()) return;
    const el = canvas.current!;
    let stop: (() => void) | null = null;
    // Defer context creation until the backdrop is close to the viewport.
    const gate = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting || stop) return;
      gate.disconnect();
      stop = start(el, shader, intensity, () => setLive(true));
    }, { rootMargin: "300px" });
    gate.observe(el);
    return () => {
      gate.disconnect();
      stop?.();
    };
  }, [shader, intensity]);

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <canvas ref={canvas} className={cn("absolute inset-0 h-full w-full transition-opacity duration-[1500ms]", live ? "opacity-100" : "opacity-0")} />
    </div>
  );
}
