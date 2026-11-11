/**
 * A dotted WebGL globe with animated arcs from a home city to each market. Raw WebGL, no three.js:
 * one point program for the sphere and city markers, one line program for the arcs with a travelling
 * pulse. Dots face the viewer brighter than those on the far side. Drag to spin; it eases back to
 * auto-rotation. Renders only while visible, capped DPR and ~45fps.
 */
export type LatLon = [number, number];

const POINT_VS = `
attribute vec3 aPos; attribute float aKind;
uniform mat3 uRot; uniform float uScale; uniform vec2 uAspect; uniform float uDpr; uniform float uTime;
varying float vDepth; varying float vKind;
void main(){
  vec3 p = uRot * aPos;
  vDepth = p.z; vKind = aKind;
  gl_Position = vec4(p.xy * uScale / uAspect, -p.z * 0.5, 1.0);
  float pulse = aKind > 0.5 ? 1.0 + 0.35 * sin(uTime * 3.0 + aPos.x * 10.0) : 1.0;
  gl_PointSize = (aKind > 0.5 ? 12.0 * pulse : 2.4) * uDpr * (0.75 + 0.25 * (p.z + 1.0));
}`;
const POINT_FS = `
precision mediump float;
varying float vDepth; varying float vKind;
void main(){
  vec2 c = gl_PointCoord - 0.5; float d = length(c);
  if (d > 0.5) discard;
  float front = smoothstep(-0.35, 0.6, vDepth);
  if (vKind > 0.5) {
    float core = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(mix(vec3(0.08,0.37,0.94), vec3(1.0), core * 0.5), core * (0.25 + 0.75 * front));
  } else {
    gl_FragColor = vec4(0.08, 0.37, 0.94, 0.08 + 0.55 * front);
  }
}`;
const LINE_VS = `
attribute vec3 aPos; attribute float aT;
uniform mat3 uRot; uniform float uScale; uniform vec2 uAspect; uniform vec2 uNudge;
varying float vT; varying float vDepth;
void main(){
  vec3 p = uRot * aPos; vT = aT; vDepth = p.z;
  gl_Position = vec4(p.xy * uScale / uAspect + uNudge, -p.z * 0.5, 1.0);
}`;
const LINE_FS = `
precision mediump float;
uniform float uTime; uniform float uOffset;
varying float vT; varying float vDepth;
void main(){
  float head = fract(uTime * 0.28 + uOffset);
  float trail = smoothstep(0.22, 0.0, head - vT) * step(vT, head);
  float front = smoothstep(-0.5, 0.4, vDepth);
  float a = (0.35 + 0.65 * trail) * (0.3 + 0.7 * front);
  gl_FragColor = vec4(mix(vec3(0.08,0.37,0.94), vec3(0.45,0.65,1.0), trail), a);
}`;

const toVec = ([lat, lon]: LatLon, r = 1): [number, number, number] => {
  const la = (lat * Math.PI) / 180, lo = (lon * Math.PI) / 180;
  return [r * Math.cos(la) * Math.sin(lo), r * Math.sin(la), r * Math.cos(la) * Math.cos(lo)];
};

function arc(a: LatLon, b: LatLon, n = 64) {
  const A = toVec(a), B = toVec(b);
  const dot = A[0] * B[0] + A[1] * B[1] + A[2] * B[2];
  const om = Math.acos(Math.min(Math.max(dot, -1), 1));
  const lift = 0.06 + om * 0.1;
  const out: number[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const s1 = Math.sin((1 - t) * om) / Math.sin(om), s2 = Math.sin(t * om) / Math.sin(om);
    const h = 1 + lift * Math.sin(Math.PI * t);
    out.push((A[0] * s1 + B[0] * s2) * h, (A[1] * s1 + B[1] * s2) * h, (A[2] * s1 + B[2] * s2) * h, t);
  }
  return out;
}

export function startGlobe(el: HTMLCanvasElement, home: LatLon, targets: LatLon[], onFirstFrame: () => void) {
  const gl = el.getContext("webgl", { antialias: true, alpha: true, premultipliedAlpha: false, powerPreference: "low-power" });
  if (!gl) return () => {};
  const mk = (vs: string, fs: string) => {
    const sh = (t: number, src: string) => { const s = gl.createShader(t)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const p = gl.createProgram()!;
    gl.attachShader(p, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(p);
    return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null;
  };
  const pp = mk(POINT_VS, POINT_FS), lp = mk(LINE_VS, LINE_FS);
  if (!pp || !lp) return () => {};

  // Sphere: Fibonacci points, then city markers (kind 1).
  const pts: number[] = [];
  const N = 1800, golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = golden * i;
    pts.push(Math.cos(th) * r, y, Math.sin(th) * r, 0);
  }
  for (const c of [home, ...targets]) pts.push(...toVec(c, 1.005), 1);
  const pBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pBuf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pts), gl.STATIC_DRAW);
  const pCount = pts.length / 4;

  const arcs = targets.map((t) => { const d = arc(home, t); const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(d), gl.STATIC_DRAW); return { b, n: d.length / 4 }; });

  const loc = (p: WebGLProgram, n: string) => gl.getUniformLocation(p, n);
  const attr = (p: WebGLProgram, n: string) => gl.getAttribLocation(p, n);

  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  let aspect: [number, number] = [1, 1];
  const resize = () => {
    const r = el.getBoundingClientRect();
    el.width = Math.max(1, Math.round(r.width * dpr)); el.height = Math.max(1, Math.round(r.height * dpr));
    gl.viewport(0, 0, el.width, el.height);
    aspect = r.width > r.height ? [r.width / r.height, 1] : [1, r.height / r.width];
  };
  resize();
  const ro = new ResizeObserver(resize); ro.observe(el);

  // Rotation: start with home facing the viewer, then spin. Dragging adds velocity.
  let yaw = -(home[1] * Math.PI) / 180 + 0.5, pitch = 0.32, vel = 0;
  let dragging = false, lx = 0, ly = 0;
  const down = (e: PointerEvent) => { dragging = true; lx = e.clientX; ly = e.clientY; el.setPointerCapture(e.pointerId); };
  const move = (e: PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY;
    yaw += dx * 0.006; vel = dx * 0.006; pitch = Math.min(Math.max(pitch + dy * 0.004, -0.9), 0.9);
  };
  const up = () => { dragging = false; };
  el.addEventListener("pointerdown", down); el.addEventListener("pointermove", move); el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  let visible = true, drawn = false, raf = 0, last = 0;
  const t0 = performance.now();
  const frame = (t: number) => {
    raf = 0;
    if (!visible || document.hidden) return;
    raf = requestAnimationFrame(frame);
    if (t - last < 22) return;
    const dt = Math.min((t - (last || t)) / 1000, 0.05); last = t;
    if (!dragging) { vel *= 0.94; yaw += 0.12 * dt + vel; }
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    // R = Rx(pitch) * Ry(yaw), column-major for GLSL.
    const rot = new Float32Array([cy, sp * sy, -cp * sy, 0, cp, sp, sy, -sp * cy, cp * cy]);
    const time = (t - t0) / 1000, scale = 0.72;
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(lp);
    gl.uniformMatrix3fv(loc(lp, "uRot"), false, rot); gl.uniform1f(loc(lp, "uScale"), scale); gl.uniform2f(loc(lp, "uAspect"), aspect[0], aspect[1]); gl.uniform1f(loc(lp, "uTime"), time);
    const lPos = attr(lp, "aPos"), lT = attr(lp, "aT");
    arcs.forEach((a, i) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, a.b);
      gl.enableVertexAttribArray(lPos); gl.vertexAttribPointer(lPos, 3, gl.FLOAT, false, 16, 0);
      gl.enableVertexAttribArray(lT); gl.vertexAttribPointer(lT, 1, gl.FLOAT, false, 16, 12);
      gl.uniform1f(loc(lp, "uOffset"), i / arcs.length);
      for (const [ox, oy] of [[0, 0], [1, 0], [0, 1]]) {
        gl.uniform2f(loc(lp, "uNudge"), (ox! * 2) / el.width, (oy! * 2) / el.height);
        gl.drawArrays(gl.LINE_STRIP, 0, a.n);
      }
    });

    gl.useProgram(pp);
    gl.uniformMatrix3fv(loc(pp, "uRot"), false, rot); gl.uniform1f(loc(pp, "uScale"), scale); gl.uniform2f(loc(pp, "uAspect"), aspect[0], aspect[1]);
    gl.uniform1f(loc(pp, "uDpr"), dpr); gl.uniform1f(loc(pp, "uTime"), time);
    gl.bindBuffer(gl.ARRAY_BUFFER, pBuf);
    const pPos = attr(pp, "aPos"), pKind = attr(pp, "aKind");
    gl.enableVertexAttribArray(pPos); gl.vertexAttribPointer(pPos, 3, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(pKind); gl.vertexAttribPointer(pKind, 1, gl.FLOAT, false, 16, 12);
    gl.drawArrays(gl.POINTS, 0, pCount);

    if (!drawn) { drawn = true; onFirstFrame(); }
  };
  const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame); });
  io.observe(el);
  const onVis = () => { if (!document.hidden && visible && !raf) raf = requestAnimationFrame(frame); };
  document.addEventListener("visibilitychange", onVis);
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move); el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
}
