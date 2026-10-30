/**
 * Static drawing of the hero sculpture in its BUILD state: an interlocking tower of brushed
 * beams with the orange core glowing inside. Server-rendered, so the hero is complete before any
 * JavaScript loads; it remains the visual on phones and devices without WebGL.
 */
const C = 0.866;
const iso = (x: number, y: number, z: number): [number, number] => [200 + (x - z) * C * 92, 230 + (x + z) * 0.5 * 92 - y * 92];
const pts = (p: [number, number][]) => p.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ");

function Beam({ x, y, z, w, d }: { x: number; y: number; z: number; w: number; d: number }) {
  const h = 0.16;
  const top = [iso(x, y + h, z), iso(x + w, y + h, z), iso(x + w, y + h, z + d), iso(x, y + h, z + d)];
  const left = [iso(x, y + h, z + d), iso(x + w, y + h, z + d), iso(x + w, y, z + d), iso(x, y, z + d)];
  const right = [iso(x + w, y + h, z), iso(x + w, y + h, z + d), iso(x + w, y, z + d), iso(x + w, y, z)];
  return (
    <g>
      <polygon points={pts(top)} fill="url(#fb-top)" stroke="#4a4e57" strokeWidth=".6" />
      <polygon points={pts(left)} fill="#1b1d22" stroke="#2c2f36" strokeWidth=".6" />
      <polygon points={pts(right)} fill="#121418" stroke="#2c2f36" strokeWidth=".6" />
    </g>
  );
}

export function SculptureFallback() {
  const beams: { x: number; y: number; z: number; w: number; d: number }[] = [];
  for (let f = 0; f < 9; f++) {
    for (let s = 0; s < 3; s++) {
      const y = (f - 4) * 0.19;
      beams.push(f % 2 === 0 ? { x: -0.63, y, z: -0.57 + s * 0.4, w: 1.26, d: 0.34 } : { x: -0.57 + s * 0.4, y, z: -0.63, w: 0.34, d: 1.26 });
    }
  }
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="fb-top" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3c4048" />
          <stop offset=".5" stopColor="#6c7079" />
          <stop offset="1" stopColor="#2f3238" />
        </linearGradient>
        <radialGradient id="fb-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ff6b35" stopOpacity=".35" />
          <stop offset="1" stopColor="#ff6b35" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="215" r="170" fill="url(#fb-glow)" />
      {beams.map((b, i) => <Beam key={i} {...b} />)}
      <ellipse cx="200" cy="215" rx="150" ry="52" fill="none" stroke="#ff6b35" strokeOpacity=".5" strokeWidth="1" transform="rotate(-12 200 215)" />
    </svg>
  );
}
