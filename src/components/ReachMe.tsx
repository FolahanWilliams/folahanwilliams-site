import { Section } from "./Section";
import { content } from "@/content/content";
import { ReachAudit } from "./widgets/ReachAudit";
import { CalendarIcon, LinkedInIcon, MailIcon } from "./icons";

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
