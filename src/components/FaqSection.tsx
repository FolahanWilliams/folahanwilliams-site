import { Section } from "./Section";
import { seo } from "@/content/content";

/** On-page FAQ — crawlable, keyword-rich answers that mirror the FAQPage
 *  schema so search + AI engines have clean, quotable facts to surface. */
export function FaqSection() {
  return (
    <Section measure>
      <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", marginBottom: "1.75rem" }}>Common questions</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.7rem" }}>
        {seo.faqs.map((f) => (
          <div key={f.q}>
            <h3 style={{ fontSize: "1.15rem", margin: "0 0 0.5rem" }}>{f.q}</h3>
            <p style={{ margin: 0, color: "var(--color-ink-soft)", lineHeight: 1.6 }}>{f.a}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
