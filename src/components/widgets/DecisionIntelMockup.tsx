"use client";

import { motion, useReducedMotion } from "framer-motion";
import { productAudit, type Severity } from "@/content/content";

/**
 * A faithful Decision Intel product view, recreated from the real audit
 * grammar — the 270° DQI arc gauge and the severity-banded finding cards,
 * using the actual 85/70/55/40 grade thresholds and the product's own
 * slate/green palette (NOT the warm page palette), so it reads as the
 * shipped product framed inside the page. Built straight from the real
 * DqiRadialGauge + FindingCard components in the Decision Intel codebase.
 */

// Decision Intel's own product palette (intentionally not the page's cream/clay).
const DI = {
  shell: "#f1f5f9",
  card: "#ffffff",
  border: "#e2e8f0",
  ink: "#0f172a",
  sub: "#475569",
  muted: "#64748b",
  green: "#16a34a",
  emerald: "#10b981",
  amber: "#d97706",
  red: "#ef4444",
  crit: "#b91c1c",
};

const SEVERITY_COLOR: Record<Severity, string> = {
  critical: DI.crit,
  high: DI.red,
  medium: DI.amber,
  low: DI.green,
};
const SEVERITY_LABEL: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

function gradeColor(s: number) {
  if (s >= 85) return DI.emerald;
  if (s >= 70) return DI.green;
  if (s >= 55) return DI.amber;
  if (s >= 40) return DI.red;
  return DI.crit;
}
function gradeLetter(s: number) {
  if (s >= 85) return "A";
  if (s >= 70) return "B";
  if (s >= 55) return "C";
  if (s >= 40) return "D";
  return "F";
}

// ── Faithful port of DqiRadialGauge geometry ──────────────────────────
const ARC_START = 135;
const ARC_END = 405;
const ARC_LEN = ARC_END - ARC_START;
const BANDS = [
  { min: 0, max: 40, color: DI.crit },
  { min: 40, max: 55, color: DI.red },
  { min: 55, max: 70, color: DI.amber },
  { min: 70, max: 85, color: DI.green },
  { min: 85, max: 100, color: DI.emerald },
];
function polar(cx: number, cy: number, r: number, angle: number) {
  const a = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}
function arcPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const s = polar(cx, cy, r, a1);
  const e = polar(cx, cy, r, a0);
  const large = a1 - a0 <= 180 ? 0 : 1;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y}`;
}

function DqiGauge({ score, size = 188 }: { score: number; size?: number }) {
  const reduce = useReducedMotion();
  const clamped = Math.max(0, Math.min(100, score));
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 16;
  const sw = 16;
  const color = gradeColor(clamped);
  const scoreAngle = ARC_START + (clamped / 100) * ARC_LEN;
  const ticks = [40, 55, 70, 85];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Decision Quality Index ${Math.round(clamped)} of 100, grade ${gradeLetter(clamped)}`} style={{ display: "block", flexShrink: 0 }}>
      {BANDS.map((b) => (
        <path key={b.min} d={arcPath(cx, cy, r, ARC_START + (b.min / 100) * ARC_LEN, ARC_START + (b.max / 100) * ARC_LEN)} fill="none" stroke={b.color} strokeWidth={sw} strokeOpacity={0.18} strokeLinecap="butt" />
      ))}
      {clamped > 0 && (
        <motion.path
          d={arcPath(cx, cy, r, ARC_START, scoreAngle)}
          fill="none"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduce ? 0 : 1.1, ease: "easeOut" }}
        />
      )}
      {ticks.map((p) => {
        const ang = ARC_START + (p / 100) * ARC_LEN;
        const o = polar(cx, cy, r + sw / 2 + 2, ang);
        const i = polar(cx, cy, r - sw / 2 - 2, ang);
        return <line key={p} x1={i.x} y1={i.y} x2={o.x} y2={o.y} stroke={DI.card} strokeWidth={2} />;
      })}
      <text x={cx} y={cy + 4} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: size * 0.28, fontWeight: 800, fill: color, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.025em" }}>
        {Math.round(clamped)}
      </text>
      <text x={cx} y={cy + size * 0.18} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: size * 0.072, fontWeight: 700, fill: DI.muted, letterSpacing: "0.12em" }}>
        DQI · {gradeLetter(clamped)}
      </text>
    </svg>
  );
}

function ProductFindingCard({ f, i }: { f: (typeof productAudit.findings)[number]; i: number }) {
  const reduce = useReducedMotion();
  const top = SEVERITY_COLOR[f.severity];
  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : i * 0.1, ease: "easeOut" }}
      style={{
        background: DI.card,
        border: `1px solid ${DI.border}`,
        borderTop: `3px solid ${top}`,
        borderRadius: 12,
        padding: "14px 16px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
      }}
    >
      <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: DI.muted }}>{f.eyebrow}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <h4 style={{ fontSize: 15, fontWeight: 700, color: DI.ink, margin: 0, letterSpacing: "-0.012em" }}>{f.title}</h4>
        <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: top, background: `${top}14`, border: `1px solid ${top}33`, borderRadius: 999, padding: "2px 9px", whiteSpace: "nowrap" }}>
          {SEVERITY_LABEL[f.severity]} · {f.confidence}%
        </span>
      </div>
      <blockquote style={{ margin: 0, paddingLeft: 11, borderLeft: `3px solid ${top}55`, fontSize: 12.5, fontStyle: "italic", color: DI.sub, lineHeight: 1.55 }}>
        &ldquo;{f.excerpt}&rdquo;
      </blockquote>
    </motion.article>
  );
}

export function DecisionIntelMockup() {
  const { eyebrow, heading, intro, memo, score, verdict, findings, footnote } = productAudit;
  return (
    <div style={{ marginTop: "clamp(2.5rem, 6vw, 4rem)" }}>
      <div className="eyebrow">{eyebrow}</div>
      <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", margin: "0 0 0.6rem" }}>{heading}</h3>
      <p style={{ color: "var(--color-ink-soft)", margin: "0 0 1.6rem", maxWidth: "40rem", lineHeight: 1.6 }}>{intro}</p>

      {/* the product window — DI's own palette, framed on the warm page */}
      <div className="di-window">
        <div className="di-chrome">
          <span className="di-dot" style={{ background: "#f87171" }} />
          <span className="di-dot" style={{ background: "#fbbf24" }} />
          <span className="di-dot" style={{ background: "#34d399" }} />
          <span className="di-chrome-label">Decision Intel · Reasoning Audit</span>
        </div>

        <div className="di-body">
          <div className="di-memo">
            <span className="di-memo-tag">MEMO</span>
            <span className="di-memo-text">{memo}</span>
          </div>

          <div className="di-mock-grid">
            <div className="di-gauge-col">
              <DqiGauge score={score} />
              <div className="di-verdict" style={{ color: gradeColor(score) }}>{verdict}</div>
            </div>
            <div className="di-findings">
              {findings.map((f, i) => (
                <ProductFindingCard key={f.title} f={f} i={i} />
              ))}
            </div>
          </div>

          <p className="di-footnote">{footnote}</p>
        </div>
      </div>
    </div>
  );
}
