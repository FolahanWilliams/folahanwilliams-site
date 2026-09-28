import { portfolio } from "@/content/content";
import { Section } from "../Section";

/** The payoff of one bet: the loss stops at a floor, the gain runs off the
 *  top of the chart. Pure SVG; the words live in the caption below it. */
function AsymmetryChart() {
  return (
    <svg
      viewBox="0 0 300 250"
      width="100%"
      className="pf-payoff-svg"
      role="img"
      aria-label="The most a bet can lose is 100 percent, down to zero. The most it can gain has no ceiling."
    >
      <defs>
        <linearGradient id="pf-up" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-clay)" stopOpacity="0.95" />
          <stop offset="75%" stopColor="var(--color-clay)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--color-clay)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* upside: open-ended, fading off the top, with a chevron that keeps going */}
      <rect x="170" y="8" width="74" height="146" rx="6" fill="url(#pf-up)" />
      <path className="pf-payoff-arrow" d="M195 22 l12 -12 l12 12" fill="none" stroke="var(--color-clay)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* downside: capped, stopping hard at the floor */}
      <rect x="56" y="154" width="74" height="58" rx="6" fill="color-mix(in srgb, var(--color-ink) 16%, transparent)" />
      <line x1="40" y1="214" x2="146" y2="214" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" />
      <text x="93" y="236" textAnchor="middle" className="pf-payoff-t">−100%</text>

      {/* where you start */}
      <line x1="24" y1="154" x2="276" y2="154" stroke="var(--color-line)" strokeWidth="1.5" strokeDasharray="4 5" />
      <text x="24" y="146" className="pf-payoff-t pf-payoff-muted">0%</text>
      <text x="252" y="30" className="pf-payoff-t pf-payoff-inf">+∞</text>
    </svg>
  );
}

/**
 * The differentiator, placed before any project: not a list of wins but the
 * one rule I use to choose what to work on. Every case study below then
 * shows the bet it was ("The bet" rows), so the page reads as evidence of
 * how I think rather than a trophy shelf.
 */
export function Philosophy() {
  const { eyebrow, heading, source, quote, body, vision, chart } = portfolio.philosophy;
  return (
    <div id="philosophy" className="anchor">
      <Section className="pf-philo">
        <div className="pf-philo-grid">
          <div className="pf-philo-copy">
            <div className="eyebrow">{eyebrow}</div>
            <h2 id="philosophy-title" className="pf-philo-title">
              {heading}
            </h2>

            {quote && (
              <blockquote className="pf-philo-quote">
                <p>&ldquo;{quote}&rdquo;</p>
                <cite>
                  {source.author}, <i>{source.title}</i>
                </cite>
              </blockquote>
            )}

            {body.map((p) => (
              <p key={p} className="pf-philo-p">
                {p}
              </p>
            ))}

            <div className="pf-philo-vision">
              <h3>{vision.heading}</h3>
              <p>{vision.body}</p>
            </div>
          </div>

          <figure className="bento-tile pf-payoff">
            <AsymmetryChart />
            <figcaption>
              <span data-side="down">{chart.down}</span>
              <span data-side="up">{chart.up}</span>
            </figcaption>
          </figure>
        </div>
      </Section>
    </div>
  );
}
