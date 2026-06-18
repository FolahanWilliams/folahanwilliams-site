import { availability, content } from "@/content/content";

/** A "when I'm generally around" grid — illustrative, editable in content.ts. */
export function AvailabilityTile() {
  const { timezone, note, days, slots, grid } = availability;
  return (
    <div>
      <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-clay)" }}>
        Availability · {timezone}
      </div>
      <h3 style={{ fontSize: "1.25rem", margin: "0.4rem 0 0.5rem" }}>When I&rsquo;m around</h3>
      <p style={{ margin: "0 0 1rem", color: "var(--color-ink-soft)", fontSize: "0.88rem", lineHeight: 1.5 }}>{note}</p>

      <div className="avail-grid" role="table" aria-label="Weekly availability">
        <div />
        {slots.map((s) => (
          <div key={s} className="avail-head">
            {s}
          </div>
        ))}
        {days.map((d, di) => (
          <div key={d} style={{ display: "contents" }}>
            <div className="avail-day">{d}</div>
            {slots.map((s, si) => (
              <div
                key={s}
                className={grid[di]?.[si] ? "avail-cell avail-free" : "avail-cell avail-busy"}
                title={grid[di]?.[si] ? `Free · ${d} ${s}` : `Busy · ${d} ${s}`}
              >
                {grid[di]?.[si] ? "free" : ""}
              </div>
            ))}
          </div>
        ))}
      </div>

      <a href={content.calendly} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: "1rem", fontSize: "0.9rem" }}>
        Find a time →
      </a>
    </div>
  );
}
