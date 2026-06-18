import { Section } from "./Section";
import { content } from "@/content/content";
import { AvailabilityTile } from "./widgets/AvailabilityTile";
import { PianoTile } from "./widgets/PianoTile";

/** The human, as a small bento: the story prose, when I'm around, the piano,
 *  and quiet proof — the age reveal lives in the prose, near the bottom. */
export function About() {
  const { heading, paragraphs, valuesLine } = content.whoIAm;
  return (
    <Section>
      <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", marginBottom: "1.5rem" }}>{heading}</h2>

      <div className="bento">
        <article className="bento-tile" style={{ gridColumn: "span 4" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.05rem", fontSize: "1.05rem" }}>
            {paragraphs.map((p, i) => (
              <p key={i} style={{ margin: 0, lineHeight: 1.6 }}>
                {p}
              </p>
            ))}
          </div>
          {valuesLine && (
            <p style={{ marginTop: "1.4rem", marginBottom: 0, color: "var(--color-ink-soft)", fontStyle: "italic", lineHeight: 1.6 }}>
              {valuesLine}
            </p>
          )}
        </article>

        <article className="bento-tile" style={{ gridColumn: "span 2" }}>
          <AvailabilityTile />
        </article>

        <article className="bento-tile" style={{ gridColumn: "span 3" }}>
          <PianoTile />
        </article>

        <article className="bento-tile" style={{ gridColumn: "span 3" }}>
          <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-clay)", marginBottom: "0.8rem" }}>
            Quiet proof
          </div>
          <p style={{ fontFamily: "var(--font-display), serif", fontSize: "1.25rem", lineHeight: 1.4, margin: "0 0 1rem" }}>
            {content.proof.review}
          </p>
          <p style={{ color: "var(--color-ink-soft)", margin: 0, fontSize: "0.95rem" }}>{content.proof.advisor}</p>
        </article>
      </div>
    </Section>
  );
}
