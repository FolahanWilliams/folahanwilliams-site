import Link from "next/link";
import { content, portfolio } from "@/content/content";
import { Section } from "../Section";
import { CalendarIcon, GitHubIcon, LinkedInIcon, MailIcon, PaperIcon } from "../icons";

const find = (label: string) => content.links.find((l) => l.label === label)?.href;
const paper = content.work.find((w) => w.key === "thesis-2008");

/** "Also include links to any other online work": every other place my work
 *  lives, as the same channel rail the home page uses, then a way back. */
export function Elsewhere() {
  const { elsewhere, closing } = portfolio;
  const channels = [
    { label: "GitHub", sub: "FolahanWilliams", href: find("GitHub"), icon: GitHubIcon, external: true },
    { label: "LinkedIn", sub: "Folahan Williams", href: find("LinkedIn"), icon: LinkedInIcon, external: true },
    { label: "My research paper", sub: "The 2008 crisis, as a failure of minds", href: paper?.href, icon: PaperIcon, external: true },
    { label: "Email", sub: content.contactEmail, href: `mailto:${content.contactEmail}`, icon: MailIcon, external: false },
    { label: "Book a call", sub: "30 minutes, free", href: content.calendly, icon: CalendarIcon, external: true },
  ].filter((c): c is typeof c & { href: string } => Boolean(c.href));

  return (
    <Section className="pf-case-section">
      <div id="elsewhere" className="anchor">
        <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", marginBottom: "0.75rem" }}>{elsewhere.heading}</h2>
        <p style={{ margin: 0, color: "var(--color-ink-soft)", maxWidth: "32rem" }}>{elsewhere.intro}</p>

        <div className="reach-channels pf-channels">
          {channels.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                className="reach-channel"
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="reach-channel-icon">
                  <Icon />
                </span>
                <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                  <span className="reach-channel-label">{c.label}</span>
                  <span className="reach-channel-sub">{c.sub}</span>
                </span>
                <span className="reach-channel-arrow" aria-hidden>
                  →
                </span>
              </a>
            );
          })}
        </div>

        <div className="pf-closing">
          <div>
            <h3 className="pf-closing-title">{closing.heading}</h3>
            <p>{closing.body}</p>
          </div>
          <Link href="/" className="pf-btn" data-primary>
            {closing.cta} →
          </Link>
        </div>
      </div>
    </Section>
  );
}
