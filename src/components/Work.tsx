import { Section } from "./Section";
import { content } from "@/content/content";
import { MiniGauge } from "./widgets/MiniGauge";
import { SignalTicker } from "./widgets/SignalTicker";
import { CrisisTimeline } from "./widgets/CrisisTimeline";
import { BiasTaxonomy } from "./widgets/BiasTaxonomy";

// bento column spans on the 6-col desktop grid (collapse to 1 col on mobile)
const SPAN: Record<string, number> = {
  "decision-intel": 3,
  sentinel: 3,
  "thesis-2008": 6,
  "finding-finance": 3,
  "investment-internship": 3,
};

const WIDGET_KEYS = new Set(["decision-intel", "sentinel", "thesis-2008"]);

function Widget({ k }: { k: string }) {
  if (k === "decision-intel") return <MiniGauge />;
  if (k === "sentinel") return <SignalTicker />;
  if (k === "thesis-2008") return <CrisisTimeline />;
  return null;
}

export function Work() {
  const { heading, subhead } = content.workIntro;
  return (
    <Section>
      <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", marginBottom: "0.75rem" }}>{heading}</h2>
      <p style={{ color: "var(--color-ink-soft)", marginBottom: "2.5rem", maxWidth: "34rem" }}>{subhead}</p>

      <div className="bento">
        {content.work.map((w) => {
          const link = w.href ?? w.pdf;
          const hasWidget = WIDGET_KEYS.has(w.key);
          return (
            <article key={w.key} className="bento-tile" style={{ gridColumn: `span ${SPAN[w.key] ?? 3}` }}>
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
              <h3 style={{ fontSize: "1.3rem", margin: "0 0 0.5rem" }}>{w.title}</h3>
              <p style={{ margin: 0, color: "var(--color-ink-soft)", fontSize: "0.98rem", lineHeight: 1.55 }}>{w.body}</p>

              {hasWidget ? (
                <Widget k={w.key} />
              ) : (
                w.detail && (
                  <p style={{ marginTop: "0.9rem", marginBottom: 0, color: "var(--color-ink-soft)", fontSize: "0.9rem", lineHeight: 1.55 }}>
                    {w.detail}
                  </p>
                )
              )}

              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-block", marginTop: "1rem", fontSize: "0.92rem" }}
                >
                  {w.linkLabel ?? "Learn more"} →
                </a>
              )}
            </article>
          );
        })}

        <article className="bento-tile" style={{ gridColumn: "span 6" }}>
          <BiasTaxonomy />
        </article>
      </div>
    </Section>
  );
}
