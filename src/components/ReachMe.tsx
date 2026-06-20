import { Section } from "./Section";
import { content } from "@/content/content";
import { ReachAudit } from "./widgets/ReachAudit";

const linkedin = content.links.find((l) => l.label === "LinkedIn")?.href ?? "#";
const github = content.links.find((l) => l.label === "GitHub")?.href ?? "#";

/** The three ways to actually reach me, as one smooth rail: book a call,
 *  email, or LinkedIn. GitHub sits quietly beneath as a secondary link. */
const channels = [
  {
    label: "Book a call",
    sub: "30 minutes, free",
    href: content.calendly,
    icon: CalendarIcon,
    external: true,
  },
  {
    label: "Email",
    sub: content.contactEmail,
    href: `mailto:${content.contactEmail}`,
    icon: MailIcon,
    external: false,
  },
  {
    label: "LinkedIn",
    sub: "Folahan Williams",
    href: linkedin,
    icon: LinkedInIcon,
    external: true,
  },
];

export function ReachMe() {
  return (
    <Section measure className="">
      <div id="reach" style={{ scrollMarginTop: "2rem" }}>
        <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", marginBottom: "0.75rem" }}>Get in touch</h2>
        <p style={{ marginBottom: "1.75rem", color: "var(--color-ink-soft)", maxWidth: "32rem" }}>
          If any of this resonates, I&rsquo;d love to talk. Naturally, I ran the decision through my own auditor first.
        </p>

        <ReachAudit />

        <div className="reach-channels">
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
                <span className="reach-channel-arrow" aria-hidden>→</span>
              </a>
            );
          })}
        </div>

        <div style={{ marginTop: "1.4rem" }}>
          <a href={github} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.9rem", color: "var(--color-ink-soft)" }}>
            Also on GitHub ↗
          </a>
        </div>
      </div>
    </Section>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M3 6.5l9 6 9-6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.1c0-1.22-.02-2.8-1.7-2.8-1.7 0-1.96 1.32-1.96 2.7V21H9z" />
    </svg>
  );
}
