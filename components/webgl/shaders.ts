/*
  Fragment shaders for ShaderCanvas. Shared uniforms:
    uTime (seconds), uRes (pixels), uMouse (0–1, origin bottom-left), uIntensity (0–1+).
  Palette: graphite #08090B base, Zenyro orange #FF6B35 highlights. Output is premultiplied-free RGBA
  over a transparent canvas so the section's own background shows through.
*/

const common = `
precision mediump float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uIntensity;
const vec3 EMBER = vec3(1.0, 0.42, 0.21);
const vec3 STEEL = vec3(0.58, 0.60, 0.64);
float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.02; a *= 0.5; } return v; }
`;

/** Domain-warped noise ribbons: slow, molten, pulled gently toward the pointer. */
const ember = `${common}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec2 m = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float t = uTime * 0.06;
  p += (m - p) * 0.08 * exp(-length(p - m) * 2.0);
  vec2 q = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t + 4.7));
  vec2 r = vec2(fbm(p * 1.6 + 2.0 * q + vec2(1.7, 9.2) + t * 1.3), fbm(p * 1.6 + 2.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.2 + 2.4 * r);
  float ribbon = smoothstep(0.55, 0.92, f) * (0.6 + 0.4 * sin(f * 18.0 + uTime * 0.4));
  float glow = smoothstep(0.35, 1.0, f) * 0.35;
  vec3 col = EMBER * ribbon * 0.55 + STEEL * glow * 0.12;
  float vignette = smoothstep(1.25, 0.2, length(uv - vec2(0.55, 0.45)) * 1.4);
  float a = clamp((ribbon * 0.7 + glow * 0.4) * vignette * uIntensity, 0.0, 0.85);
  gl_FragColor = vec4(col * vignette, a);
}`;

/** Dot grid with ripples radiating from the pointer and from a slow pulse: "signal" and reach. */
const grid = `${common}
void main(){
  vec2 frag = gl_FragCoord.xy;
  float cell = 26.0 * (uRes.y / 900.0 + 0.4);
  vec2 g = frag / cell;
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;
  vec2 center = (id + 0.5) * cell / uRes;
  vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
  float dm = length((center - uMouse) * aspect);
  float dp = length((center - vec2(0.72, 0.42)) * aspect);
  float wave = sin(dm * 22.0 - uTime * 2.6) * exp(-dm * 3.2);
  float pulse = sin(dp * 16.0 - uTime * 1.4) * exp(-dp * 2.4) * 0.6;
  float energy = max(wave, 0.0) + max(pulse, 0.0);
  float size = 0.07 + energy * 0.12;
  float dotMask = smoothstep(size, size - 0.04, length(f));
  float base = 0.10 + 0.05 * noise(id * 0.3 + uTime * 0.05);
  vec3 col = mix(STEEL * base, EMBER, clamp(energy * 1.4, 0.0, 1.0));
  float fade = smoothstep(0.0, 0.25, gl_FragCoord.y / uRes.y) * smoothstep(1.0, 0.6, gl_FragCoord.y / uRes.y);
  float a = dotMask * (base * 1.6 + energy * 0.9) * fade * uIntensity;
  gl_FragColor = vec4(col, clamp(a, 0.0, 0.9));
}`;

/** Slowly shifting topographic contour lines with one orange elevation band: a growth map. */
const contour = `${common}
void main(){
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec2 m = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float h = fbm(p * 1.8 + vec2(uTime * 0.03, -uTime * 0.02));
  h += 0.25 * exp(-length(p - m) * 3.0);
  float d = abs(fract(h * 14.0) - 0.5);          // 0.5 on a contour line, 0 between lines
  float lineMask = smoothstep(0.40, 0.49, d);
  float highlight = smoothstep(0.60, 0.64, h) * (1.0 - smoothstep(0.64, 0.68, h));
  vec3 col = mix(STEEL * 0.4, EMBER, highlight);
  float edge = smoothstep(1.1, 0.25, length(p - vec2(0.35, 0.05)));
  float a = lineMask * (0.20 + highlight * 0.65) * edge * uIntensity;
  gl_FragColor = vec4(col, clamp(a, 0.0, 0.8));
}`;

export const shaders = { ember, grid, contour } as const;
export type ShaderName = keyof typeof shaders;
