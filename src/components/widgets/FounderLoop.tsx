"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { operatingLoop } from "@/content/content";

/**
 * "The loop I run" — the operating method behind the founder mindset, as an
 * animated ring. Five nodes (Notice → Build → Ship → Pressure-test →
 * Compound) with a pulse travelling the cycle; hover / focus / tap a node to
 * read the principle and how it shows up in the real work. Complements the
 * "how I think" prose. Reduced-motion-safe (no travelling pulse, instant
 * reveals); touch + keyboard navigable.
 */

const SIZE = 300;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RING = 106;
const NODE_R = 30;

const rad = (d: number) => (d * Math.PI) / 180;
const at = (r: number, deg: number): [number, number] => [CX + r * Math.cos(rad(deg)), CY + r * Math.sin(rad(deg))];

export function FounderLoop() {
  const { eyebrow, caption, nodes } = operatingLoop;
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const n = nodes.length;
  const angleOf = (i: number) => -90 + i * (360 / n);
  const current = nodes[active];

  return (
    <div className="loop">
      <div className="eyebrow" style={{ marginBottom: "0.4rem" }}>{eyebrow}</div>

      <div className="loop-wheel">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="group" aria-label="The five-step loop I run" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          {/* the ring */}
          <circle cx={CX} cy={CY} r={RING} fill="none" stroke="var(--color-line)" strokeWidth={2} />

          {/* travelling pulse (motion only) */}
          {!reduce && (
            <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 9, ease: "linear" }} style={{ transformOrigin: `${CX}px ${CY}px` }}>
              <circle cx={CX} cy={CY - RING} r={5} fill="var(--color-clay)" />
            </motion.g>
          )}

          {/* nodes */}
          {nodes.map((node, i) => {
            const [x, y] = at(RING, angleOf(i));
            const on = active === i;
            return (
              <g
                key={node.key}
                tabIndex={0}
                role="button"
                aria-label={`${node.label}: ${node.line}`}
                aria-pressed={on}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{ cursor: "pointer", outline: "none" }}
              >
                <motion.circle
                  cx={x}
                  cy={y}
                  r={NODE_R}
                  fill={on ? "var(--color-clay)" : "var(--color-paper)"}
                  stroke="var(--color-clay)"
                  strokeWidth={2}
                  animate={{ scale: on && !reduce ? 1.08 : 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                />
                <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 12, fontWeight: 600, fill: on ? "#fff" : "var(--color-ink)", pointerEvents: "none", fontFamily: "var(--font-inter), sans-serif" }}>
                  {node.label.length > 9 ? node.label.split("-")[0] : node.label}
                </text>
              </g>
            );
          })}

          {/* hub — step index */}
          <text x={CX} y={CY - 8} textAnchor="middle" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fill: "var(--color-ink-soft)" }}>
            Step {active + 1} / {n}
          </text>
          <text x={CX} y={CY + 14} textAnchor="middle" style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 19, fill: "var(--color-ink)" }}>
            {current.label}
          </text>
        </svg>
      </div>

      {/* detail card */}
      <div className="loop-detail">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduce ? 0 : 0.22 }}
          >
            <p className="loop-line">{current.line}</p>
            <p className="loop-example"><span>In practice</span> {current.example}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="loop-caption">{caption}</p>
    </div>
  );
}
