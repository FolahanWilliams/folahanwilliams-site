import { content, portfolio } from "@/content/content";
import { hasPublicFile } from "@/lib/public-assets";
import { Avatar } from "../Avatar";
import { Reveal } from "../Reveal";

const github = content.links.find((l) => l.label === "GitHub")?.href;
const linkedin = content.links.find((l) => l.label === "LinkedIn")?.href;

/**
 * The top of /portfolio: who I am in two lines, then every project as a card
 * (name, one-line summary, dates, status) so a reader skimming for 60 seconds
 * sees all four before scrolling. Cards jump to the full case study below.
 */
export function PortfolioHero() {
  const { eyebrow, heading, intro, howIBuild, projects, philosophy, talk } = portfolio;
  return (
    <header className="pf-hero">
      <div className="pf-wrap">
        <Reveal>
          <div className="pf-hero-id">
            <Avatar size={64} src={hasPublicFile("headshot.jpg") ? "/headshot.jpg" : undefined} />
            <div>
              <div className="eyebrow" style={{ marginBottom: "0.2rem" }}>
                {eyebrow}
              </div>
              <div className="pf-hero-name">{content.name}</div>
            </div>
          </div>

          <h1 className="pf-hero-title">{heading}</h1>
          <div className="pf-hero-intro">
            {intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="pf-hero-links">
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            )}
            <a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <nav className="pf-index" aria-label="Projects on this page">
            {projects.map((p, i) => (
              <a key={p.key} href={`#${p.key}`} className="bento-tile pf-index-card">
                <span className="pf-index-top">
                  <span className="pf-index-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="pf-index-kicker">{p.kicker}</span>
                </span>
                <span className="pf-index-name">{p.name}</span>
                <span className="pf-index-summary">{p.summary}</span>
                <span className="pf-index-meta">
                  {p.when} · {p.status}
                  <span className="pf-index-arrow" aria-hidden>
                    ↓
                  </span>
                </span>
              </a>
            ))}
            <a href={`#${talk.key}`} className="bento-tile pf-index-card pf-index-wide">
              <span className="pf-index-kicker">{talk.eyebrow}</span>
              <span className="pf-index-name">{talk.heading}</span>
              <span className="pf-index-arrow" aria-hidden>
                ↓
              </span>
            </a>
          </nav>
          <a href="#philosophy" className="pf-hero-start">
            Start with how I think: {philosophy.heading.toLowerCase()} <span aria-hidden>↓</span>
          </a>
        </Reveal>

        <Reveal delay={200}>
          <aside className="pf-howi" aria-labelledby="how-i-build">
            <h2 id="how-i-build" className="pf-howi-title">
              {howIBuild.heading}
            </h2>
            <p>{howIBuild.body}</p>
          </aside>
        </Reveal>
      </div>
    </header>
  );
}
