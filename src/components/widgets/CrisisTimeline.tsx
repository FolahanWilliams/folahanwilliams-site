"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { crisisTimeline } from "@/content/content";

/** The 2008 crash as a descending line; hover/click a point to read the event
 *  and the cognitive bias behind it — the thesis, made interactive. */
export function CrisisTimeline() {
  const reduce = useReducedMotion() ?? false;
  const [sel, setSel] = useState(crisisTimeline.length - 1); // default: Lehman
  const W = 460;
  const H = 132;
  const padX = 34;
  const padY = 16;
  const n = crisisTimeline.length;
  const x = (idx: number) => padX + (idx / (n - 1)) * (W - padX * 2);
  const y = (drop: number) => padY + (drop / 100) * (H - padY * 2 - 14);
  const linePts = crisisTimeline.map((e, idx) => `${x(idx)},${y(e.drop)}`).join(" ");
  const active = crisisTimeline[sel];

  return (
    <div style={{ marginTop: "0.9rem" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }}>
        <motion.polyline
          points={linePts}
          fill="none"
          stroke="#a8322a"
          strokeWidth={2.5}
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduce ? 0 : 1.1, ease: "easeInOut" }}
        />
        {crisisTimeline.map((e, idx) => (
          <g
            key={e.date}
            onMouseEnter={() => setSel(idx)}
            onFocus={() => setSel(idx)}
            onClick={() => setSel(idx)}
            tabIndex={0}
            role="button"
            aria-label={`${e.date}: ${e.label}`}
            style={{ cursor: "pointer" }}
          >
            <circle cx={x(idx)} cy={y(e.drop)} r={14} fill="transparent" />
            <circle
              cx={x(idx)}
              cy={y(e.drop)}
              r={sel === idx ? 7 : 5}
              fill={sel === idx ? "#a8322a" : "var(--color-paper)"}
              stroke="#a8322a"
              strokeWidth={2}
              style={{ transition: reduce ? "none" : "r 180ms ease" }}
            />
            <text x={x(idx)} y={H - 2} textAnchor="middle" style={{ fontSize: 9, fill: sel === idx ? "var(--color-ink)" : "var(--color-ink-soft)" }}>
              {e.date}
            </text>
          </g>
        ))}
      </svg>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.date}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          style={{ marginTop: "0.7rem", borderTop: "1px solid var(--color-line)", paddingTop: "0.7rem" }}
        >
          <div style={{ fontFamily: "var(--font-display), serif", fontSize: "1.05rem" }}>
            {active.label} <span style={{ color: "var(--color-ink-soft)", fontSize: "0.85rem" }}>· {active.date}</span>
          </div>
          <div style={{ fontSize: "0.88rem", color: "var(--color-ink-soft)", marginTop: 3, lineHeight: 1.5 }}>{active.detail}</div>
          <div style={{ fontSize: "0.85rem", marginTop: 6 }}>
            <strong style={{ color: "#a8322a" }}>The bias:</strong>{" "}
            <span style={{ color: "var(--color-ink-soft)" }}>{active.bias}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
