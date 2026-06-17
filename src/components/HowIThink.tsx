import { Section } from "./Section";
import { content } from "@/content/content";

export function HowIThink() {
  const { heading, paragraphs, pullQuote } = content.howIThink;
  return (
    <Section measure>
      <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", marginBottom: "1.5rem" }}>{heading}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", fontSize: "1.1rem" }}>
        {paragraphs.map((p, i) => (
          <p key={i} style={{ margin: 0 }}>{p}</p>
        ))}
      </div>
      <blockquote
        style={{
          margin: "2.5rem 0 0", paddingLeft: "1.25rem",
          borderLeft: "2px solid var(--color-clay)",
          fontFamily: "var(--font-display), Georgia, serif",
          fontSize: "1.5rem", lineHeight: 1.4, color: "var(--color-ink)",
        }}
      >
        {pullQuote}
      </blockquote>
    </Section>
  );
}
