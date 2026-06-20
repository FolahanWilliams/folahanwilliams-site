import { Section } from "./Section";
import { content } from "@/content/content";
import { AvailabilityTile } from "./widgets/AvailabilityTile";
import { PianoTile } from "./widgets/PianoTile";
import { GuitarTile } from "./widgets/GuitarTile";
import { GymTile } from "./widgets/GymTile";
import { RecordTile } from "./widgets/RecordTile";
import { BooksTile } from "./widgets/BooksTile";
import { FlightTile } from "./widgets/FlightTile";
import { FaithTile } from "./widgets/FaithTile";

/** The human, as a small bento: the story prose, when I'm around, the piano,
 *  and quiet proof — the age reveal lives in the prose, near the bottom. */
export function About() {
  const { heading, paragraphs } = content.whoIAm;
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
        </article>

        <article className="bento-tile" style={{ gridColumn: "span 2" }}>
          <AvailabilityTile />
        </article>

        <article className="bento-tile" style={{ gridColumn: "span 3" }}>
          <RecordTile />
        </article>

        {/* right column beside the taller record: two separate panels stacked */}
        <div className="bento-stack">
          <article className="bento-tile">
            <BooksTile />
          </article>
          <article className="bento-tile">
            <FlightTile />
          </article>
        </div>

        <article className="bento-tile" style={{ gridColumn: "span 3" }}>
          <PianoTile />
        </article>

        <article className="bento-tile" style={{ gridColumn: "span 3" }}>
          <GuitarTile />
        </article>

        <article className="bento-tile" style={{ gridColumn: "span 3" }}>
          <GymTile />
        </article>

        <article className="bento-tile" style={{ gridColumn: "span 3" }}>
          <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-clay)", marginBottom: "0.8rem" }}>
            Quiet proof
          </div>
          <p style={{ fontFamily: "var(--font-display), serif", fontSize: "1.25rem", lineHeight: 1.4, margin: 0 }}>
            {content.proof.review}
          </p>
        </article>

        <article className="bento-tile faith-tile" style={{ gridColumn: "span 6" }}>
          <FaithTile />
        </article>
      </div>
    </Section>
  );
}
