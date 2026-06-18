import { content } from "@/content/content";
import { Avatar } from "./Avatar";
import { FacetWheel } from "./widgets/FacetWheel";

export function Hero() {
  const { name, building, heroIntro } = content;
  return (
    <header style={{ padding: "clamp(3.5rem, 10vw, 7rem) 1.5rem clamp(2rem, 6vw, 4rem)" }}>
      <div className="hero-grid" style={{ maxWidth: "75rem", margin: "0 auto" }}>
        {/* left — who I am + what I'm building, right now */}
        <div className="hero-copy">
          <Avatar size={88} />

          <h1 style={{ fontSize: "clamp(2.1rem, 5.2vw, 3.1rem)", margin: 0, lineHeight: 1.05 }}>{name}</h1>

          <p
            style={{
              fontSize: "clamp(1.15rem, 2.4vw, 1.55rem)",
              lineHeight: 1.45,
              color: "var(--color-ink)",
              margin: 0,
              maxWidth: "34rem",
              fontFamily: "var(--font-display), Georgia, serif",
            }}
          >
            I&rsquo;m building{" "}
            <a href={building.href} target="_blank" rel="noopener noreferrer" style={{ borderBottom: "2px solid var(--color-clay)", paddingBottom: 1 }}>
              {building.product}
            </a>
            <span>: {building.what}</span>
          </p>

          <p style={{ fontSize: "1.02rem", lineHeight: 1.65, color: "var(--color-ink-soft)", margin: 0, maxWidth: "34rem" }}>
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

        {/* right — the wheel: six facets of the same question */}
        <div className="hero-wheel">
          <FacetWheel />
        </div>
      </div>
    </header>
  );
}
