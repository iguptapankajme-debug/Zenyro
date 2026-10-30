/**
 * Particle stream for the system walkthroughs: leads flow as light along a curved pipeline,
 * from the first node to the current stage, and gather in an orbit around the stage that is live.
 * A few dim travellers drift along the part of the pipeline that hasn't been reached yet.
 *
 * Raw WebGL points with additive blending; positions are computed on the CPU (a few hundred
 * particles) and streamed each frame. Renders only while on screen.
 */
import type { Pt } from "@/components/solutions/morph-shapes";

const VERT = `
attribute vec4 a; // x, y (px), alpha, size (px)
uniform vec2 uRes;
uniform float uDpr;
varying float vA;
void main(){
  vA = a.z;
  gl_Position = vec4(a.x / uRes.x * 2.0 - 1.0, 1.0 - a.y / uRes.y * 2.0, 0.0, 1.0);
  gl_PointSize = a.w * uDpr;
}`;
const FRAG = `
precision mediump float;
varying float vA;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float core = smoothstep(0.5, 0.0, d);
  vec3 col = mix(vec3(1.0, 0.42, 0.21), vec3(1.0, 0.86, 0.74), core * core * 0.7);
  gl_FragColor = vec4(col, core * vA);
}`;

/** Catmull-Rom through the nodes, parameterised by segment so u = i / (n - 1) lands on node i. */
export function pathPoint(nodes: Pt[], u: number): Pt {
  const n = nodes.length;
  const f = Math.min(Math.max(u, 0), 1) * (n - 1);
  const i = Math.min(Math.floor(f), n - 2);
  const t = f - i;
  const p0 = nodes[Math.max(i - 1, 0)]!, p1 = nodes[i]!, p2 = nodes[i + 1]!, p3 = nodes[Math.min(i + 2, n - 1)]!;
  const t2 = t * t, t3 = t2 * t;
  const c = (a: number, b: number, c2: number, d: number) =>
    0.5 * (2 * b + (-a + c2) * t + (2 * a - 5 * b + 4 * c2 - d) * t2 + (-a + 3 * b - 3 * c2 + d) * t3);
  return [c(p0[0], p1[0], p2[0], p3[0]), c(p0[1], p1[1], p2[1], p3[1])];
}

const STREAM = 260;
const ORBIT = 70;
const AHEAD = 36;
const COUNT = STREAM + ORBIT + AHEAD;

export function startFlowParticles(canvas: HTMLCanvasElement, nodes: Pt[], getHead: () => number) {
  const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: false, powerPreference: "low-power" });
  if (!gl) return () => {};
  const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return () => {};
  gl.useProgram(prog);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

  const data = new Float32Array(COUNT * 4);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, data.byteLength, gl.DYNAMIC_DRAW);
  const loc = gl.getAttribLocation(prog, "a");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(prog, "uRes");
  const uDpr = gl.getUniformLocation(prog, "uDpr");

  // Deterministic per-particle seeds.
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const phase = Float32Array.from({ length: COUNT }, rnd);
  const speed = Float32Array.from({ length: COUNT }, () => 0.12 + rnd() * 0.22);
  const jit = Float32Array.from({ length: COUNT }, () => rnd() * 2 - 1);
  const size = Float32Array.from({ length: COUNT }, () => 2 + rnd() * 3.5);

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 1, h = 1;
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    w = Math.max(1, r.width);
    h = Math.max(1, r.height);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const at = (u: number): Pt => { const p = pathPoint(nodes, u); return [p[0] * w, p[1] * h]; };
  const normal = (u: number): Pt => {
    const a = at(u - 0.004), b = at(u + 0.004);
    const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
    return [-dy / l, dx / l];
  };

  let head = getHead();
  let raf = 0, last = 0, visible = true;
  const t0 = performance.now();
  const frame = (t: number) => {
    raf = 0;
    if (!visible || document.hidden) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min((t - (last || t)) / 1000, 1 / 20);
    last = t;
    const time = (t - t0) / 1000;
    head += (getHead() - head) * Math.min(1, dt * 6);
    const hp = at(head);
    let k = 0;
    for (let i = 0; i < COUNT; i++) {
      phase[i] = (phase[i]! + speed[i]! * dt) % 1;
      const s = phase[i]!;
      let x: number, y: number, a: number;
      if (i < STREAM) {
        // Leads flowing from the start to the live stage.
        const u = s * head;
        const p = at(u), nrm = normal(u);
        const wob = jit[i]! * (5 + 4 * Math.sin(time * 1.7 + i)) * (1 - s * 0.6);
        x = p[0] + nrm[0] * wob;
        y = p[1] + nrm[1] * wob;
        a = Math.min(s / 0.06, 1) * (0.25 + 0.75 * s) * (head > 0.002 ? 1 : 0);
      } else if (i < STREAM + ORBIT) {
        // Gathered around the live stage.
        const ang = s * Math.PI * 2 * (jit[i]! > 0 ? 1 : -1) + i;
        const r = 14 + Math.abs(jit[i]!) * 22 + Math.sin(time * 2 + i) * 3;
        x = hp[0] + Math.cos(ang) * r;
        y = hp[1] + Math.sin(ang) * r * 0.8;
        a = 0.55;
      } else {
        // Dim travellers on the path still ahead.
        const u = head + s * (1 - head);
        const p = at(u);
        x = p[0];
        y = p[1] + jit[i]! * 3;
        a = 0.14 * Math.sin(s * Math.PI);
      }
      data[k++] = x; data[k++] = y; data[k++] = a; data[k++] = size[i]!;
    }
    gl.uniform2f(uRes, w, h);
    gl.uniform1f(uDpr, dpr);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, COUNT);
  };
  const io = new IntersectionObserver(([e]) => {
    visible = !!e?.isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  });
  io.observe(canvas);
  const onVis = () => { if (!document.hidden && visible && !raf) { last = 0; raf = requestAnimationFrame(frame); } };
  document.addEventListener("visibilitychange", onVis);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    gl.deleteBuffer(buf);
    gl.deleteProgram(prog);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
}
