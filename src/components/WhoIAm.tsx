import { Section } from "./Section";
import { content } from "@/content/content";

export function WhoIAm() {
  const { heading, paragraphs, valuesLine } = content.whoIAm;
  return (
    <Section measure>
      <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", marginBottom: "1.5rem" }}>{heading}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", fontSize: "1.1rem" }}>
        {paragraphs.map((p, i) => (
          <p key={i} style={{ margin: 0 }}>{p}</p>
        ))}
      </div>
      {valuesLine && (
        <p style={{ marginTop: "1.75rem", color: "var(--color-ink-soft)", fontStyle: "italic" }}>
          {valuesLine}
        </p>
      )}
    </Section>
  );
}
