import { Section } from "./Section";
import { content } from "@/content/content";

export function Work() {
  return (
    <Section>
      <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", marginBottom: "0.75rem" }}>
        One question, four ways
      </h2>
      <p style={{ color: "var(--color-ink-soft)", marginBottom: "2.5rem", maxWidth: "34rem" }}>
        The same obsession — how people reason and decide — as research, a company, teaching, and practice.
      </p>
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))" }}>
        {content.work.map((w) => (
          <article
            key={w.key}
            style={{
              background: "var(--color-paper-2)", border: "1px solid var(--color-line)",
              borderRadius: "14px", padding: "1.4rem",
            }}
          >
            <div style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-clay)", marginBottom: "0.6rem" }}>
              {w.kindLabel}
            </div>
            <h3 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem" }}>{w.title}</h3>
            <p style={{ margin: 0, color: "var(--color-ink-soft)", fontSize: "0.98rem" }}>{w.body}</p>
            {(w.href || w.pdf) && (
              <a
                href={w.href ?? w.pdf}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", marginTop: "0.9rem", fontSize: "0.92rem" }}
              >
                {w.linkLabel ?? "Learn more"} →
              </a>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
