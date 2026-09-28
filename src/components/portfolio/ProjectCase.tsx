import { portfolio, type PortfolioProject } from "@/content/content";
import { Section } from "../Section";
import { SignalTicker } from "../widgets/SignalTicker";
import { Bet } from "./Bet";
import { DraftText } from "./DraftText";
import { DecisionFlow, QuestCard, SankoreSketch } from "./visuals";

function Visual({ project }: { project: PortfolioProject }) {
  if (project.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={project.image.src} alt={project.image.alt} className="pf-shot" loading="lazy" />;
  }
  switch (project.visual) {
    case "decision-intel":
      return <DecisionFlow />;
    case "sentinel":
      return <SignalTicker />;
    case "sankore":
      return <SankoreSketch />;
    case "nexus":
      return <QuestCard />;
  }
}

const tone = (status: string) => (/^(live|shipped)/i.test(status) ? "go" : "neutral");

/**
 * One project, told the way the application asks for it: what I built, the
 * hard part, what I learned, where it stands. The header + one-line summary
 * let a skimming reader get it in seconds, "The bet" ties it back to the
 * philosophy section, and the visual, numbers and tools sit beside the story
 * (above it on phones).
 */
export function ProjectCase({ project: p, index }: { project: PortfolioProject; index: number }) {
  const { labels } = portfolio;
  const titleId = `${p.key}-title`;
  return (
    <div id={p.key} className="anchor pf-case">
      <Section className="pf-case-section">
        <header className="pf-case-head">
          <div className="eyebrow">
            {String(index + 1).padStart(2, "0")} · {p.kicker}
          </div>
          <h2 id={titleId} className="pf-case-title">
            {p.name}
            {p.aka && <span className="pf-aka">{p.aka}</span>}
          </h2>
          <div className="pf-meta">
            <span>{p.role}</span>
            <span>{p.when}</span>
            <span className="pf-status" data-tone={tone(p.status)}>
              {p.status}
            </span>
          </div>
          <p className="pf-summary">{p.summary}</p>
          {p.links.length > 0 && (
            <div className="pf-links">
              {p.links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pf-btn"
                  data-primary={i === 0}
                >
                  {l.label} <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          )}
        </header>

        <Bet bet={p.bet} />

        <div className="pf-case-grid">
          <div className="pf-qa">
            <div className="pf-q">
              <h3>{labels.built}</h3>
              <ul className="pf-built">
                {/* index keys: a text key would be serialised into the page
                    payload, "[add: …]" reminders and all */}
                {p.built.map((b, i) => (
                  <li key={i}>
                    <DraftText text={b} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="pf-q">
              <h3>{labels.hard}</h3>
              <p>
                <DraftText text={p.hard} />
              </p>
            </div>
            <div className="pf-q">
              <h3>{labels.learned}</h3>
              <p>
                <DraftText text={p.learned} />
              </p>
            </div>
            <div className="pf-q">
              <h3>{labels.result}</h3>
              <p>
                <DraftText text={p.result} />
              </p>
            </div>
          </div>

          <aside className="pf-side" aria-label={`${p.name} at a glance`}>
            <figure className="pf-visual">
              <Visual project={p} />
              <figcaption>{p.visualCaption}</figcaption>
            </figure>

            <dl className="pf-stats">
              {p.stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="pf-tools">
              <span className="pf-tools-label">Built with</span>
              <ul>
                {p.tools.map((t) => (
                  <li key={t} className="skill-chip">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </div>
  );
}
