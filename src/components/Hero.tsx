import Image from "next/image";
import { content } from "@/content/content";

export function Hero() {
  return (
    <header style={{ padding: "clamp(4rem, 12vw, 9rem) 1.5rem clamp(2rem, 6vw, 4rem)" }}>
      <div style={{ maxWidth: "var(--measure)", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Image
          src="/headshot.jpg"
          alt={content.name}
          width={104}
          height={104}
          priority
          style={{ borderRadius: "50%", objectFit: "cover", boxShadow: "0 6px 24px -12px rgba(33,28,23,0.4)" }}
        />
        <h1 style={{ fontSize: "clamp(2.2rem, 6vw, 3.4rem)", margin: 0 }}>{content.name}</h1>
        <p style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.5rem)", lineHeight: 1.5, color: "var(--color-ink)", margin: 0, maxWidth: "34rem" }}>
          {content.heroLine}
        </p>
        <a
          href="#reach"
          style={{
            alignSelf: "start", marginTop: "0.5rem", padding: "0.7rem 1.3rem",
            border: "1px solid var(--color-clay)", borderRadius: "999px",
            color: "var(--color-clay)", fontSize: "0.95rem",
          }}
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
