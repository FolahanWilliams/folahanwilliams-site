import { ImageResponse } from "next/og";
import { portfolio } from "@/content/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Folahan Williams: how I think, and what I’ve built";

/** The link preview for /portfolio (the page that gets pasted into applications). */
export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#faf6ef", color: "#211c17",
        display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, fontFamily: "serif" }}>
        <div style={{ fontSize: 26, color: "#a84c25", letterSpacing: 4, textTransform: "uppercase" }}>
          Folahan Williams · Portfolio
        </div>
        <div style={{ fontSize: 64, marginTop: 18, maxWidth: 980 }}>{portfolio.heading}</div>
        <div style={{ fontSize: 28, color: "#5b5147", marginTop: 20 }}>
          {portfolio.projects.map((p) => p.name.replace(/ Dashboard$/, "")).join("  ·  ")}
        </div>
        <div style={{ width: 90, height: 6, background: "#a84c25", marginTop: 30 }} />
      </div>
    ),
    { ...size }
  );
}
