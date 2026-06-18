import { Section } from "./Section";
import { content } from "@/content/content";

export function ReachMe() {
  return (
    <Section measure className="">
      <div id="reach" style={{ scrollMarginTop: "2rem" }}>
        <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", marginBottom: "1rem" }}>Get in touch</h2>
        <p style={{ marginBottom: "1.5rem", color: "var(--color-ink-soft)", maxWidth: "32rem" }}>
          If any of this resonates, I&rsquo;d love to talk.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem", alignItems: "center" }}>
          <a
            href={content.calendly}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.75rem 1.4rem",
              borderRadius: "999px",
              background: "var(--color-clay)",
              color: "var(--color-paper)",
              fontSize: "0.98rem",
              fontWeight: 600,
            }}
          >
            Book a 30-min call →
          </a>
          <a href={`mailto:${content.contactEmail}`} style={{ fontSize: "1.05rem" }}>
            {content.contactEmail}
          </a>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", marginTop: "1.75rem" }}>
          {content.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
          ))}
          <a href={content.cv} target="_blank" rel="noopener noreferrer">CV (PDF)</a>
        </div>
      </div>
    </Section>
  );
}
