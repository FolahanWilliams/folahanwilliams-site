import { experience, education, skills } from "@/content/content";

/** The record — experience, education, and skills. */
export function RecordTile() {
  return (
    <div>
      <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-clay)" }}>
        The record
      </div>
      <h3 style={{ fontSize: "1.25rem", margin: "0.4rem 0 0.8rem" }}>Experience</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
        {experience.map((r) => (
          <div key={r.org}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.96rem" }}>
                <strong>{r.org}</strong> <span style={{ color: "var(--color-ink-soft)" }}>· {r.title}</span>
              </span>
              <span style={{ fontSize: "0.78rem", color: "var(--color-ink-soft)", fontVariantNumeric: "tabular-nums" }}>{r.when}</span>
            </div>
            <div style={{ fontSize: "0.86rem", color: "var(--color-ink-soft)", marginTop: 3, lineHeight: 1.5 }}>{r.line}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "1rem", borderTop: "1px solid var(--color-line)", paddingTop: "0.8rem", fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>
        {education.school} <span style={{ opacity: 0.7 }}>· {education.detail} · {education.when}</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.9rem" }}>
        {skills.map((s) => (
          <span key={s} className="skill-chip">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
