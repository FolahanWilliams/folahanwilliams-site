"use client";

/**
 * ReasoningLab — the signature interactive. A recommendation that looks
 * airtight; toggle the biases hiding inside it and watch the reasoning, the
 * verdict, and a Decision-Quality score come undone. Decision Intel in one tile.
 *
 * Pure renderer over `reasoningLab` in content.ts. Reduced-motion aware.
 */

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { reasoningLab } from "@/content/content";

const GOOD = "#3f7d62"; // calm green
const MID = "#c8784f"; // clay
const BAD = "#a8322a"; // muted oxblood

function toneFor(score: number) {
  if (score >= 70) return GOOD;
  if (score >= 45) return MID;
  return BAD;
}

function Gauge({ score, tone, reduce }: { score: number; tone: string; reduce: boolean }) {
  // 200-wide semicircle arc; fraction filled = score/100.
  const r = 86;
  const cx = 100;
  const cy = 96;
  const circumference = Math.PI * r; // semicircle length
  const filled = (score / 100) * circumference;
  return (
    <svg viewBox="0 0 200 110" width="100%" style={{ maxWidth: 240, display: "block", margin: "0 auto" }}>
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke="var(--color-line)"
        strokeWidth={12}
        strokeLinecap="round"
      />
      <motion.path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke={tone}
        strokeWidth={12}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={false}
        animate={{ strokeDashoffset: circumference - filled, stroke: tone }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 18 }}
      />
      <text x={cx} y={cy - 16} textAnchor="middle" style={{ fontFamily: "var(--font-display), serif", fontSize: 38, fill: "var(--color-ink)" }}>
        {Math.round(score)}
      </text>
      <text x={cx} y={cy + 4} textAnchor="middle" style={{ fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", fill: "var(--color-ink-soft)" }}>
        Decision quality
      </text>
    </svg>
  );
}

export function ReasoningLab() {
  const reduce = useReducedMotion() ?? false;
  const lab = reasoningLab;
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
  const tone = toneFor(score);

  const verdict =
    active.length === 0
      ? lab.baseVerdict
      : active.length >= 3
        ? lab.floorVerdict
        : (lab.biases.find((b) => b.id === last && active.includes(b.id))?.rewrites ?? lab.floorVerdict);

  // step id -> the active bias flagging it (if any)
  const flagFor = (stepId: string) =>
    lab.biases.find((b) => b.flagsStep === stepId && active.includes(b.id)) ?? null;

  return (
    <div
      style={{
        background: "var(--color-paper-2)",
        border: "1px solid var(--color-line)",
        borderRadius: 18,
        padding: "clamp(1.4rem, 3vw, 2.2rem)",
        boxShadow: "0 24px 60px -40px rgba(33,28,23,0.5)",
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-clay)" }}>
        {lab.eyebrow}
      </div>
      <h2 style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.1rem)", margin: "0.5rem 0 0.6rem" }}>{lab.title}</h2>
      <p style={{ margin: "0 0 1.4rem", color: "var(--color-ink-soft)", maxWidth: "40rem", fontSize: "0.98rem" }}>
        {lab.intro}
      </p>

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)",
          alignItems: "start",
        }}
        className="lab-grid"
      >
        {/* left: the decision + reasoning chain */}
        <div>
          <div
            style={{
              background: "var(--color-paper)",
              border: "1px solid var(--color-line)",
              borderRadius: 12,
              padding: "0.9rem 1.1rem",
              marginBottom: "1rem",
            }}
          >
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-ink-soft)", marginBottom: 4 }}>
              The recommendation
            </div>
            <div style={{ fontFamily: "var(--font-display), serif", fontSize: "1.2rem" }}>{lab.decision}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            {lab.steps.map((s) => {
              const flag = flagFor(s.id);
              return (
                <div key={s.id}>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.6rem",
                      alignItems: "baseline",
                      padding: "0.55rem 0.7rem",
                      borderRadius: 9,
                      borderLeft: `3px solid ${flag ? BAD : "var(--color-line)"}`,
                      background: flag ? "color-mix(in srgb, #a8322a 7%, transparent)" : "transparent",
                      transition: reduce ? "none" : "background 280ms ease, border-color 280ms ease",
                    }}
                  >
                    <span style={{ color: "var(--color-ink-soft)", fontSize: "0.82rem", flexShrink: 0 }}>→</span>
                    <span style={{ fontSize: "0.96rem" }}>{s.text}</span>
                  </div>
                  <AnimatePresence initial={false}>
                    {flag && (
                      <motion.div
                        initial={reduce ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        transition={{ duration: reduce ? 0 : 0.32, ease: "easeOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          style={{
                            margin: "0.4rem 0 0.1rem 1.3rem",
                            paddingLeft: "0.75rem",
                            borderLeft: `2px solid ${BAD}`,
                            fontSize: "0.86rem",
                            lineHeight: 1.5,
                            color: "var(--color-ink-soft)",
                          }}
                        >
                          <strong style={{ color: BAD }}>{flag.label}.</strong> {flag.note}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* right: the gauge + verdict */}
        <div style={{ position: "sticky", top: "5rem" }}>
          <Gauge score={score} tone={tone} reduce={reduce} />
          <div style={{ minHeight: "3.4rem", marginTop: "0.6rem", textAlign: "center" }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={verdict}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: reduce ? 0 : 0.28 }}
                style={{ margin: 0, fontSize: "0.98rem", color: score >= 70 ? "var(--color-ink)" : BAD, lineHeight: 1.45 }}
              >
                {verdict}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* bias toggles */}
      <div style={{ marginTop: "1.5rem" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-ink-soft)", marginBottom: "0.6rem" }}>
          Switch on the biases hiding inside it
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          {lab.biases.map((b) => {
            const on = active.includes(b.id);
            return (
              <button
                key={b.id}
                onClick={() => toggle(b.id)}
                aria-pressed={on}
                style={{
                  cursor: "pointer",
                  borderRadius: 999,
                  padding: "0.5rem 0.95rem",
                  fontSize: "0.88rem",
                  border: `1px solid ${on ? BAD : "var(--color-line)"}`,
                  background: on ? BAD : "var(--color-paper)",
                  color: on ? "#fff" : "var(--color-ink)",
                  transition: reduce ? "none" : "all 200ms ease",
                }}
              >
                {b.label}
              </button>
            );
          })}
          {active.length > 0 && (
            <button
              onClick={reset}
              style={{
                cursor: "pointer",
                borderRadius: 999,
                padding: "0.5rem 0.8rem",
                fontSize: "0.82rem",
                border: "1px solid transparent",
                background: "transparent",
                color: "var(--color-ink-soft)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <p style={{ marginTop: "1.4rem", marginBottom: 0, fontSize: "0.85rem", color: "var(--color-ink-soft)", fontStyle: "italic" }}>
        {lab.caption}
      </p>

      <style>{`
        @media (max-width: 720px) {
          .lab-grid { grid-template-columns: 1fr !important; }
          .lab-grid > div:last-child { position: static !important; }
        }
      `}</style>
    </div>
  );
}
