/**
 * Shape library for the solutions morph engine. Every emblem is a closed outline in a
 * [-1, 1] square (y grows downward), resampled to the same number of points with the same
 * winding and start point, so any shape can morph into any other without the outline crossing.
 */

export type Pt = [number, number];
export const POINTS = 192;

function arc(cx: number, cy: number, r: number, from: number, to: number, steps = 24): Pt[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const a = from + ((to - from) * i) / steps;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  });
}

function quad(a: Pt, c: Pt, b: Pt, steps = 16): Pt[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const u = 1 - t;
    return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
  });
}

const outlines: Record<string, Pt[]> = {
  circle: arc(0, 0, 0.78, -Math.PI / 2, (3 * Math.PI) / 2, 64),
  // Real estate: a cluster of towers
  "real-estate": [
    [-0.88, 0.82], [-0.88, 0.12], [-0.56, 0.12], [-0.56, -0.38], [-0.2, -0.38], [-0.2, -0.86],
    [0.16, -0.86], [0.16, -0.22], [0.46, -0.22], [0.46, -0.52], [0.82, -0.52], [0.82, 0.82],
  ],
  // Hospitality: a grand arch
  hospitality: [[-0.6, 0.84], [-0.6, -0.12], ...arc(0, -0.12, 0.6, Math.PI, 2 * Math.PI, 36), [0.6, 0.84]],
  // Healthcare: a softened cross
  healthcare: [
    [-0.22, -0.82], [0.22, -0.82], [0.22, -0.22], [0.82, -0.22], [0.82, 0.22], [0.22, 0.22],
    [0.22, 0.82], [-0.22, 0.82], [-0.22, 0.22], [-0.82, 0.22], [-0.82, -0.22], [-0.22, -0.22],
  ],
  // Interior design & retail: an L-shaped floor plan
  "interior-design": [[-0.82, -0.82], [0.18, -0.82], [0.18, -0.08], [0.82, -0.08], [0.82, 0.82], [-0.82, 0.82]],
  // Education: an open book
  education: [
    ...quad([-0.9, -0.48], [-0.45, -0.78], [0, -0.32]),
    ...quad([0, -0.32], [0.45, -0.78], [0.9, -0.48]),
    [0.9, 0.56],
    ...quad([0.9, 0.56], [0.45, 0.36], [0, 0.72]),
    ...quad([0, 0.72], [-0.45, 0.36], [-0.9, 0.56]),
  ],
  // Home improvement: a house with a door
  "home-improvement": [
    [-0.76, 0.8], [-0.76, -0.1], [0, -0.82], [0.76, -0.1], [0.76, 0.8],
    [0.2, 0.8], [0.2, 0.22], [-0.2, 0.22], [-0.2, 0.8],
  ],
  // Travel: a mountain range
  "travel-tourism": [[-0.9, 0.72], [-0.48, -0.18], [-0.24, 0.12], [0.16, -0.78], [0.9, 0.72]],
  // Financial services: a shield
  "financial-services": [[0, -0.86], [0.72, -0.6], [0.68, 0.1], [0.36, 0.6], [0, 0.86], [-0.36, 0.6], [-0.68, 0.1], [-0.72, -0.6]],
};

function signedArea(p: Pt[]) {
  let a = 0;
  for (let i = 0; i < p.length; i++) {
    const [x1, y1] = p[i]!;
    const [x2, y2] = p[(i + 1) % p.length]!;
    a += x1 * y2 - x2 * y1;
  }
  return a / 2;
}

/** Resample a closed outline to n points evenly spaced by arc length, clockwise on screen, starting at the top. */
function resample(raw: Pt[], n: number): Pt[] {
  let pts = raw.slice();
  if (signedArea(pts) < 0) pts.reverse();
  const segs = pts.map((p, i) => {
    const q = pts[(i + 1) % pts.length]!;
    return Math.hypot(q[0] - p[0], q[1] - p[1]);
  });
  const total = segs.reduce((a, b) => a + b, 0);
  const out: Pt[] = [];
  let seg = 0;
  let acc = 0;
  for (let k = 0; k < n; k++) {
    const target = (k / n) * total;
    while (acc + segs[seg]! < target && seg < segs.length - 1) acc += segs[seg++]!;
    const t = segs[seg]! ? (target - acc) / segs[seg]! : 0;
    const a = pts[seg]!;
    const b = pts[(seg + 1) % pts.length]!;
    out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
  }
  // Align the start to the point closest to "straight up" from the centroid, so all shapes correspond.
  const cx = out.reduce((s, p) => s + p[0], 0) / n;
  const cy = out.reduce((s, p) => s + p[1], 0) / n;
  let best = 0;
  let bestScore = Infinity;
  out.forEach(([x, y], i) => {
    const ang = Math.atan2(y - cy, x - cx) + Math.PI / 2;
    const score = Math.abs(Math.atan2(Math.sin(ang), Math.cos(ang)));
    if (score < bestScore) { bestScore = score; best = i; }
  });
  pts = [...out.slice(best), ...out.slice(0, best)];
  // Light smoothing softens hard corners into a premium, slightly rounded silhouette.
  for (let pass = 0; pass < 2; pass++) {
    pts = pts.map((p, i) => {
      const a = pts[(i - 1 + n) % n]!;
      const b = pts[(i + 1) % n]!;
      return [p[0] * 0.5 + (a[0] + b[0]) * 0.25, p[1] * 0.5 + (a[1] + b[1]) * 0.25];
    });
  }
  return pts;
}

const cache = new Map<string, Pt[]>();

export type ShapeKey = keyof typeof outlines;

export function getShape(key: string): Pt[] {
  const k = key in outlines ? key : "circle";
  if (!cache.has(k)) cache.set(k, resample(outlines[k]!, POINTS));
  return cache.get(k)!;
}
