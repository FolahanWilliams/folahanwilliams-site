import { Section } from "./Section";
import { content } from "@/content/content";
import { FounderLoop } from "./widgets/FounderLoop";

export function HowIThink() {
  const { heading, paragraphs, pullQuote } = content.howIThink;
  return (
    <Section>
      <div className="howi-grid">
        {/* left — the prose + the pull-quote */}
        <div className="howi-copy">
          <div className="eyebrow">The throughline</div>
          <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", margin: "0 0 1.5rem" }}>{heading}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", fontSize: "1.08rem" }}>
            {paragraphs.map((p, i) => (
              <p key={i} style={{ margin: 0 }}>{p}</p>
            ))}
          </div>
          <blockquote
            style={{
              margin: "2.25rem 0 0",
              paddingLeft: "1.25rem",
              borderLeft: "2px solid var(--color-clay)",
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "1.4rem",
              lineHeight: 1.4,
              color: "var(--color-ink)",
            }}
          >
            {pullQuote}
          </blockquote>
        </div>

        {/* right — the operating loop behind the founder mindset */}
        <div className="howi-viz">
          <FounderLoop />
        </div>
      </div>
    </Section>
  );
}
