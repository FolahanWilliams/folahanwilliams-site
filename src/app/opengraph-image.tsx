import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#faf6ef", color: "#211c17",
        display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, fontFamily: "serif" }}>
        <div style={{ fontSize: 64 }}>Folahan Williams</div>
        <div style={{ fontSize: 30, color: "#5b5147", marginTop: 16, maxWidth: 820 }}>
          I&rsquo;m fascinated by how people think and decide.
        </div>
        <div style={{ width: 90, height: 6, background: "#b5532a", marginTop: 28 }} />
      </div>
    ),
    { ...size }
  );
}
