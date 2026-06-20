import { Section } from "./Section";
import { content } from "@/content/content";

export function QuietProof() {
  return (
    <Section measure>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <p style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.35rem", lineHeight: 1.4, margin: 0 }}>
          {content.proof.review}
        </p>
      </div>
    </Section>
  );
}
