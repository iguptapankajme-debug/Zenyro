import { ImageResponse } from "next/og";

export const alt = "Zenyro: Build. Grow. Convert.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

/** Default social sharing image, generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#08090B", color: "#F7F7F5", padding: 72, fontFamily: "sans-serif", position: "relative" }}>
        <div style={{ position: "absolute", right: -120, top: -80, width: 640, height: 640, borderRadius: 640, background: "radial-gradient(circle, rgba(255,107,53,.28), rgba(255,107,53,0) 65%)" }} />
        <div style={{ position: "absolute", right: 90, top: 150, width: 330, height: 330, borderRadius: 330, border: "3px solid #3a3d44" }} />
        <div style={{ position: "absolute", right: 30, top: 255, width: 450, height: 120, borderRadius: 450, border: "2px solid #34373f", transform: "rotate(-24deg)" }} />
        <div style={{ position: "absolute", right: 60, top: 222, width: 26, height: 26, borderRadius: 26, background: "#FF6B35" }} />
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 8, fontWeight: 600 }}>ZENYRO</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 700, lineHeight: 0.95, letterSpacing: -3 }}>
          <span>BUILD. GROW.</span>
          <span style={{ color: "#FF6B35" }}>CONVERT.</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#9699A1" }}>Websites · Performance marketing · AI sales automation</div>
      </div>
    ),
    size,
  );
}
