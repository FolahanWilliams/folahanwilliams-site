import { faith } from "@/content/content";

/** A quiet, full-width closing note for the About section: the foundation
 *  under the work, lightly held. Static and understated by design. */
export function FaithTile() {
  const { eyebrow, heading, body, verse } = faith;
  return (
    <div className="faith-inner">
      <span className="faith-mark" aria-hidden>
        <svg width="22" height="28" viewBox="0 0 22 28" fill="currentColor">
          <rect x="9" y="1" width="4" height="26" rx="1.4" />
          <rect x="3" y="8" width="16" height="4" rx="1.4" />
        </svg>
      </span>

      <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-clay)" }}>
        {eyebrow}
      </div>
      <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)", margin: "0.3rem 0 0.6rem" }}>{heading}</h3>

      <p style={{ margin: 0, color: "var(--color-ink-soft)", lineHeight: 1.65, maxWidth: "40rem" }}>{body}</p>

      <blockquote className="faith-verse">
        “{verse.text}”
        <span className="faith-ref">{verse.ref}</span>
      </blockquote>
    </div>
  );
}
