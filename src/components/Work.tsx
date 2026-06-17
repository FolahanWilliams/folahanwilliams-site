import { Section } from "./Section";
import { content } from "@/content/content";

export function Work() {
  const { heading, subhead } = content.workIntro;
  return (
    <Section>
      <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", marginBottom: "0.75rem" }}>
        {heading}
      </h2>
      <p style={{ color: "var(--color-ink-soft)", marginBottom: "2.5rem", maxWidth: "34rem" }}>
        {subhead}
      </p>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
          alignItems: "start",
        }}
      >
        {content.work.map((w) => {
          const link = w.href ?? w.pdf;
          return (
            <article key={w.key} className="work-card">
              <div
                style={{
                  fontSize: "0.78rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-clay)",
                  marginBottom: "0.6rem",
                }}
              >
                {w.kindLabel}
              </div>
              <h3 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem" }}>{w.title}</h3>
              <p style={{ margin: 0, color: "var(--color-ink-soft)", fontSize: "0.98rem" }}>
                {w.body}
              </p>

              {/* the "expand": detail + link, revealed on hover/focus (or always, on touch) */}
              {(w.detail || link) && (
                <div className="work-card-reveal">
                  <div className="work-card-reveal-inner">
                    {w.detail && (
                      <p
                        style={{
                          margin: "0.85rem 0 0",
                          color: "var(--color-ink-soft)",
                          fontSize: "0.92rem",
                          lineHeight: 1.55,
                        }}
                      >
                        {w.detail}
                      </p>
                    )}
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: "inline-block", marginTop: "0.85rem", fontSize: "0.92rem" }}
                      >
                        {w.linkLabel ?? "Learn more"} →
                      </a>
                    )}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </Section>
  );
}
