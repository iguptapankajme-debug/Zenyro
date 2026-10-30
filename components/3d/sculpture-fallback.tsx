/**
 * Static drawing of the hero sculpture. Rendered on the server so the hero is complete before any
 * JavaScript loads, and kept as the final visual when WebGL is unavailable or the device is low-powered.
 */
export function SculptureFallback() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="sf-chrome" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6b6f78" />
          <stop offset=".45" stopColor="#1d2026" />
          <stop offset=".7" stopColor="#8a8e96" />
          <stop offset="1" stopColor="#1a1c21" />
        </linearGradient>
        <radialGradient id="sf-core" cx=".4" cy=".35" r=".7">
          <stop offset="0" stopColor="#3a3d44" />
          <stop offset="1" stopColor="#0d0e11" />
        </radialGradient>
        <radialGradient id="sf-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ff6b35" stopOpacity=".28" />
          <stop offset="1" stopColor="#ff6b35" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="150" fill="url(#sf-glow)" />
      <g className="origin-center animate-[spin_120s_linear_infinite] [transform-box:view-box]">
      <ellipse cx="200" cy="200" rx="168" ry="60" transform="rotate(-24 200 200)" fill="none" stroke="url(#sf-chrome)" strokeWidth="3" />
      <ellipse cx="200" cy="200" rx="58" ry="140" transform="rotate(18 200 200)" fill="none" stroke="url(#sf-chrome)" strokeWidth="4" />
      <ellipse cx="200" cy="200" rx="112" ry="40" transform="rotate(32 200 200)" fill="none" stroke="url(#sf-chrome)" strokeWidth="5" />
      <circle cx="348" cy="150" r="6" fill="#ff6b35" />
      </g>
      <polygon points="200,148 245,174 245,226 200,252 155,226 155,174" fill="url(#sf-core)" stroke="#2a2d33" />
      <polygon points="200,148 245,174 200,200 155,174" fill="#24272e" opacity=".8" />
      <ellipse cx="200" cy="200" rx="80" ry="14" transform="rotate(-10 200 200)" fill="none" stroke="#ff6b35" strokeWidth="1.2" />
      <circle cx="262" cy="77" r="4" fill="#8a8e96" />
      <circle cx="113" cy="250" r="4" fill="#8a8e96" />
    </svg>
  );
}
