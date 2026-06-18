import { content } from "@/content/content";
import { Avatar } from "./Avatar";

export function Hero() {
  const { name, building, heroIntro } = content;
  return (
    <header style={{ padding: "clamp(4rem, 11vw, 8rem) 1.5rem clamp(2rem, 6vw, 4rem)" }}>
      <div style={{ maxWidth: "44rem", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Avatar size={96} />

        <h1 style={{ fontSize: "clamp(2.1rem, 5.5vw, 3.2rem)", margin: 0, lineHeight: 1.05 }}>{name}</h1>

        {/* the orienting line: what I'm building, right now */}
        <p
          style={{
            fontSize: "clamp(1.2rem, 2.6vw, 1.6rem)",
            lineHeight: 1.45,
            color: "var(--color-ink)",
            margin: 0,
            maxWidth: "36rem",
            fontFamily: "var(--font-display), Georgia, serif",
          }}
        >
          I&rsquo;m building{" "}
          <a href={building.href} target="_blank" rel="noopener noreferrer" style={{ borderBottom: "2px solid var(--color-clay)", paddingBottom: 1 }}>
            {building.product}
          </a>{" "}
          — {building.what}
        </p>

        {/* who I am + the throughline */}
        <p style={{ fontSize: "1.05rem", lineHeight: 1.65, color: "var(--color-ink-soft)", margin: 0, maxWidth: "36rem" }}>
          {heroIntro}
        </p>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
          <a
            href="#reach"
            style={{
              padding: "0.7rem 1.3rem",
              border: "1px solid var(--color-clay)",
              borderRadius: "999px",
              color: "var(--color-clay)",
              fontSize: "0.95rem",
            }}
          >
            Get in touch
          </a>
          <a
            href="#lab"
            style={{
              padding: "0.7rem 1.3rem",
              borderRadius: "999px",
              color: "var(--color-ink-soft)",
              fontSize: "0.95rem",
            }}
          >
            See it in action ↓
          </a>
        </div>
      </div>
    </header>
  );
}
