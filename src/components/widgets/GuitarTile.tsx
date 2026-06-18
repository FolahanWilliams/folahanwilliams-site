import { guitar } from "@/content/content";

/** Six strings on a small fretboard, a few plucked in sequence like a chord
 *  ringing out. Separate from the piano on purpose: both matter. CSS-driven,
 *  reduced-motion-safe (the flash is suppressed under prefers-reduced-motion). */
export function GuitarTile() {
  // string y-positions, thickest (low E) at top to thinnest (high E) at bottom
  const strings = [
    { y: 12, w: 2.6 },
    { y: 23, w: 2.2 },
    { y: 34, w: 1.8 },
    { y: 45, w: 1.4 },
    { y: 56, w: 1.1 },
    { y: 67, w: 0.8 },
  ];
  const frets = [52, 100, 148]; // vertical fret lines

  return (
    <div>
      <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-clay)" }}>
        {guitar.pieceLabel}
      </div>
      <h3 style={{ fontSize: "1.25rem", margin: "0.4rem 0 0.7rem" }}>{guitar.heading}</h3>

      <svg viewBox="0 0 210 79" width="100%" style={{ maxWidth: 260, display: "block" }} aria-hidden>
        <rect x={0} y={0} width={210} height={79} rx={6} fill="var(--color-paper)" stroke="var(--color-line)" strokeWidth={1} />
        {/* nut */}
        <rect x={6} y={4} width={4} height={71} rx={1.5} fill="var(--color-line)" />
        {/* frets */}
        {frets.map((x) => (
          <line key={x} x1={x} y1={4} x2={x} y2={75} stroke="var(--color-line)" strokeWidth={1.5} />
        ))}
        {/* strings */}
        {strings.map((s) => (
          <line key={s.y} x1={10} y1={s.y} x2={206} y2={s.y} stroke="var(--color-ink-soft)" strokeWidth={s.w} strokeLinecap="round" opacity={0.5} />
        ))}
        {/* clay "plucks" ringing across, staggered like a chord */}
        <line className="guitar-note guitar-note-1" x1={10} y1={12} x2={206} y2={12} stroke="var(--color-clay)" strokeWidth={2.6} strokeLinecap="round" />
        <line className="guitar-note guitar-note-2" x1={10} y1={34} x2={206} y2={34} stroke="var(--color-clay)" strokeWidth={1.8} strokeLinecap="round" />
        <line className="guitar-note guitar-note-3" x1={10} y1={56} x2={206} y2={56} stroke="var(--color-clay)" strokeWidth={1.1} strokeLinecap="round" />
        <line className="guitar-note guitar-note-4" x1={10} y1={45} x2={206} y2={45} stroke="var(--color-clay)" strokeWidth={1.4} strokeLinecap="round" />
      </svg>

      <p style={{ margin: "0.9rem 0 0", color: "var(--color-ink-soft)", fontSize: "0.9rem", lineHeight: 1.55 }}>{guitar.body}</p>
    </div>
  );
}
