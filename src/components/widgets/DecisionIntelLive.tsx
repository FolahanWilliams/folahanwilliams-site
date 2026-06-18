"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { reasoningLab, type LabBias } from "@/content/content";

/**
 * Decision Intel — the single, merged showcase. The faithful product window
 * (the real 270° DQI arc gauge + severity-banded finding cards, in DI's own
 * slate/green palette) AND the interactive lab in one widget: toggle the
 * biases hiding in a sound-looking recommendation and watch the Decision
 * Quality Index fall, the verdict turn, and the audit's findings populate —
 * exactly the move the real platform makes on a real memo.
 *
 * Built from the real DqiRadialGauge + FindingCard grammar in the Decision
 * Intel codebase. Reduced-motion-safe; touch + keyboard friendly.
 */

const DI = {
  card: "#ffffff",
  shell: "#f1f5f9",
  soft: "#f8fafc",
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
function severityFor(penalty: number): { key: string; label: string; color: string } {
  if (penalty >= 20) return { key: "critical", label: "Critical", color: DI.crit };
  if (penalty >= 16) return { key: "high", label: "High", color: DI.red };
  if (penalty >= 12) return { key: "medium", label: "Medium", color: DI.amber };
  return { key: "low", label: "Low", color: DI.green };
}

// ── Faithful port of DqiRadialGauge geometry (animated to the live score) ──
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
function arcFwd(cx: number, cy: number, r: number, a0: number, a1: number) {
  const s = polar(cx, cy, r, a0);
  const e = polar(cx, cy, r, a1);
  const large = a1 - a0 <= 180 ? 0 : 1;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

function LiveDqiGauge({ score, size = 190 }: { score: number; size?: number }) {
  const reduce = useReducedMotion() ?? false;
  const clamped = Math.max(0, Math.min(100, score));
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 16;
  const sw = 16;
  const color = gradeColor(clamped);
  const frac = clamped / 100;
  const ticks = [40, 55, 70, 85];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Decision Quality Index ${Math.round(clamped)} of 100, grade ${gradeLetter(clamped)}`} style={{ display: "block", flexShrink: 0 }}>
      {BANDS.map((b) => (
        <path key={b.min} d={arcFwd(cx, cy, r, ARC_START + (b.min / 100) * ARC_LEN, ARC_START + (b.max / 100) * ARC_LEN)} fill="none" stroke={b.color} strokeWidth={sw} strokeOpacity={0.18} strokeLinecap="butt" />
      ))}
      <motion.path
        d={arcFwd(cx, cy, r, ARC_START, ARC_END)}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        initial={false}
        animate={{ strokeDashoffset: 1 - frac, stroke: color }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 18 }}
      />
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

export function DecisionIntelLive() {
  const lab = reasoningLab;
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState<string[]>([]);
  const [last, setLast] = useState<string | null>(null);

  const toggle = (id: string) => {
    setLast(id);
    setActive((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));
  };
  const reset = () => {
    setActive([]);
    setLast(null);
  };

  const penalty = lab.biases.filter((b) => active.includes(b.id)).reduce((s, b) => s + b.penalty, 0);
  const score = Math.max(lab.scoreFloor, lab.baseScore - penalty);
  const verdict =
    active.length === 0
      ? lab.baseVerdict
      : active.length >= 3
        ? lab.floorVerdict
        : lab.biases.find((b) => b.id === last && active.includes(b.id))?.rewrites ?? lab.floorVerdict;

  const stepText = (id: string) => lab.steps.find((s) => s.id === id)?.text ?? "";
  const activeBiases: LabBias[] = lab.biases.filter((b) => active.includes(b.id));
  const flaggedStep = (stepId: string) => lab.biases.find((b) => b.flagsStep === stepId && active.includes(b.id)) ?? null;

  return (
    <div>
      <div className="eyebrow">{lab.eyebrow}</div>
      <h2 style={{ fontSize: "clamp(1.6rem, 3.6vw, 2.3rem)", margin: "0 0 0.6rem" }}>{lab.title}</h2>
      <p style={{ color: "var(--color-ink-soft)", margin: "0 0 1.6rem", maxWidth: "42rem", lineHeight: 1.6 }}>{lab.intro}</p>

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
            <span className="di-memo-text">{lab.decision}</span>
          </div>

          <div className="di-live-grid">
            {/* left — the reasoning chain, flagged live */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: DI.muted, marginBottom: 10 }}>
                The reasoning
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {lab.steps.map((s) => {
                  const flag = flaggedStep(s.id);
                  return (
                    <div
                      key={s.id}
                      style={{
                        display: "flex",
                        gap: 9,
                        alignItems: "baseline",
                        padding: "8px 11px",
                        borderRadius: 9,
                        background: flag ? `${severityFor(flag.penalty).color}0f` : DI.soft,
                        borderLeft: `3px solid ${flag ? severityFor(flag.penalty).color : "transparent"}`,
                        transition: reduce ? "none" : "background 280ms ease, border-color 280ms ease",
                      }}
                    >
                      <span style={{ color: DI.muted, fontSize: 13, flexShrink: 0 }}>→</span>
                      <span style={{ fontSize: 13.5, color: DI.ink, lineHeight: 1.5 }}>{s.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* right — the live DQI + verdict */}
            <div className="di-live-gauge">
              <LiveDqiGauge score={score} />
              <div style={{ minHeight: "3rem", textAlign: "center" }}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={verdict}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: reduce ? 0 : 0.26 }}
                    style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: gradeColor(score), lineHeight: 1.45 }}
                  >
                    {verdict}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* the toggles */}
          <div style={{ marginTop: "1.4rem" }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: DI.muted, marginBottom: 9 }}>
              Switch on the biases hiding inside it
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
              {lab.biases.map((b) => {
                const on = active.includes(b.id);
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => toggle(b.id)}
                    aria-pressed={on}
                    style={{
                      cursor: "pointer",
                      borderRadius: 999,
                      padding: "7px 14px",
                      fontSize: 13,
                      fontWeight: 600,
                      border: `1px solid ${on ? DI.ink : DI.border}`,
                      background: on ? DI.ink : DI.card,
                      color: on ? "#fff" : DI.sub,
                      transition: reduce ? "none" : "all 180ms ease",
                    }}
                  >
                    {b.label}
                  </button>
                );
              })}
              {active.length > 0 && (
                <button type="button" onClick={reset} style={{ cursor: "pointer", border: "none", background: "transparent", color: DI.muted, fontSize: 12.5, textDecoration: "underline", textUnderlineOffset: 3 }}>
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* findings — the real product surfacing what the audit caught */}
          <div style={{ marginTop: "1.4rem" }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: DI.muted, marginBottom: 10 }}>
              {activeBiases.length > 0 ? `${activeBiases.length} finding${activeBiases.length > 1 ? "s" : ""}` : "Findings"}
            </div>
            {activeBiases.length === 0 ? (
              <p style={{ margin: 0, fontSize: 13, color: DI.muted, fontStyle: "italic" }}>
                Nothing flagged yet. Toggle a bias above and the audit surfaces it here.
              </p>
            ) : (
              <div className="di-findings">
                <AnimatePresence>
                  {activeBiases.map((b) => {
                    const sev = severityFor(b.penalty);
                    return (
                      <motion.article
                        key={b.id}
                        layout={!reduce}
                        initial={reduce ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                        transition={{ duration: reduce ? 0 : 0.32, ease: "easeOut" }}
                        style={{
                          background: DI.card,
                          border: `1px solid ${DI.border}`,
                          borderTop: `3px solid ${sev.color}`,
                          borderRadius: 12,
                          padding: "14px 16px 12px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                          boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
                        }}
                      >
                        <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: DI.muted }}>Cognitive bias</div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                          <h4 style={{ fontSize: 15, fontWeight: 700, color: DI.ink, margin: 0, letterSpacing: "-0.012em" }}>{b.label}</h4>
                          <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: sev.color, background: `${sev.color}14`, border: `1px solid ${sev.color}33`, borderRadius: 999, padding: "2px 9px", whiteSpace: "nowrap" }}>
                            {sev.label} · −{b.penalty} DQI
                          </span>
                        </div>
                        <p style={{ margin: 0, fontSize: 13, color: DI.sub, lineHeight: 1.55 }}>{b.note}</p>
                        <blockquote style={{ margin: 0, paddingLeft: 11, borderLeft: `3px solid ${sev.color}55`, fontSize: 12.5, fontStyle: "italic", color: DI.sub, lineHeight: 1.55 }}>
                          &ldquo;{stepText(b.flagsStep)}&rdquo;
                        </blockquote>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

          <p className="di-footnote">{lab.caption}</p>
        </div>
      </div>
    </div>
  );
}
