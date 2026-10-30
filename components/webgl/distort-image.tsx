"use client";

import Image from "next/image";
import { useRef } from "react";

/**
 * Screenshot with a WebGL hover effect: the image ripples outward from the cursor with a fine
 * colour split. The WebGL context only exists while the pointer is over the image (one at a time),
 * and is released after the effect fades out. Fine pointers only; reduced motion keeps the plain
 * image, which is always rendered underneath as the fallback.
 */
const VERT = `attribute vec2 p; varying vec2 vUv; void main(){ vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;
const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uMouse;
uniform float uHover;
uniform float uTime;
uniform vec2 uCover; // scale applied to UVs for object-fit: cover, aligned to the top
uniform float uAspect;
void main(){
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);
  vec2 d = (uv - uMouse) * vec2(uAspect, 1.0);
  float dist = length(d);
  vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0);
  float ripple = sin(dist * 38.0 - uTime * 7.0) * exp(-dist * 5.5) * 0.008 * uHover;
  vec2 off = dir * ripple / vec2(uAspect, 1.0);
  vec2 base = vec2((uv.x - 0.5) * uCover.x + 0.5, uv.y * uCover.y);
  float split = 0.0035 * uHover * exp(-dist * 3.0);
  float r = texture2D(uTex, base + off * 1.6 + vec2(split, 0.0)).r;
  float g = texture2D(uTex, base + off).g;
  float b = texture2D(uTex, base + off * 0.4 - vec2(split, 0.0)).b;
  gl_FragColor = vec4(r, g, b, uHover);
}`;

let activeRelease: (() => void) | null = null;

export function DistortImage({ src, alt, sizes, className }: { src: string; alt: string; sizes: string; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const state = useRef<{ mouse: [number, number]; target: number; release: (() => void) | null }>({ mouse: [0.5, 0.5], target: 0, release: null });

  const enabled = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const begin = () => {
    const st = state.current;
    st.target = 1;
    if (st.release || !enabled()) return;
    activeRelease?.();
    const el = canvas.current!;
    const gl = el.getContext("webgl", { premultipliedAlpha: false, alpha: true, antialias: false });
    if (!gl) return;
    const sh = (type: number, code: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, code); gl.compileShader(s); return s; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const tex = gl.createTexture();
    let ready = false;
    let imgAspect = 16 / 9;
    const img = new window.Image();
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      imgAspect = img.naturalWidth / img.naturalHeight;
      ready = true;
    };
    img.src = src;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let hover = 0;
    let raf = 0;
    const t0 = performance.now();
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const r = el.getBoundingClientRect();
      const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
      if (el.width !== w || el.height !== h) { el.width = w; el.height = h; gl.viewport(0, 0, w, h); }
      hover += (st.target - hover) * 0.1;
      if (!ready) return;
      const boxAspect = r.width / r.height;
      // object-fit: cover, top aligned
      const cover: [number, number] = imgAspect > boxAspect ? [boxAspect / imgAspect, 1] : [1, imgAspect / boxAspect];
      gl.uniform2f(u("uMouse"), st.mouse[0], st.mouse[1]);
      gl.uniform1f(u("uHover"), hover);
      gl.uniform1f(u("uTime"), (t - t0) / 1000);
      gl.uniform2f(u("uCover"), cover[0], cover[1]);
      gl.uniform1f(u("uAspect"), boxAspect);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (st.target === 0 && hover < 0.01) release();
    };
    raf = requestAnimationFrame(frame);
    const release = () => {
      cancelAnimationFrame(raf);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      st.release = null;
      if (activeRelease === release) activeRelease = null;
    };
    st.release = release;
    activeRelease = release;
  };

  const move = (e: React.PointerEvent) => {
    const r = wrap.current!.getBoundingClientRect();
    state.current.mouse = [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height];
  };

  return (
    <div
      ref={wrap}
      className={className}
      onPointerEnter={(e) => { if (e.pointerType === "mouse") { move(e); begin(); } }}
      onPointerMove={move}
      onPointerLeave={() => { state.current.target = 0; }}
    >
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
      <canvas ref={canvas} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
    </div>
  );
}
