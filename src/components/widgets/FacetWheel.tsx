"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { facets } from "@/content/content";

/**
 * The hero's right column: a radial menu of the six facets of the same
 * obsession. Each slice is a focusable link; hover/focus pushes the slice
 * outward and reveals its title + line in the hub. Touch / no-hover devices
 * get a colourful, tappable wheel (slices are real <a> links). Reduced-motion
 * users get no push animation — the brightened fill + thick rim is the focus
 * cue instead. All geometry derives from `facets.length`.
 */

const SIZE = 320;
const C = SIZE / 2; // centre
const R_OUT = 152;
const R_IN = 82;
const PAD_DEG = 2; // gap between slices
const START = -90; // first slice begins at the top

const rad = (deg: number) => (deg * Math.PI) / 180;
const polar = (r: number, deg: number): [number, number] => [
  C + r * Math.cos(rad(deg)),
  C + r * Math.sin(rad(deg)),
];

function donutSlice(startDeg: number, endDeg: number): string {
  const s = startDeg + PAD_DEG;
  const e = endDeg - PAD_DEG;
  const [x1, y1] = polar(R_OUT, s);
  const [x2, y2] = polar(R_OUT, e);
  const [x3, y3] = polar(R_IN, e);
  const [x4, y4] = polar(R_IN, s);
  const large = e - s <= 180 ? 0 : 1;
  return `M ${x1} ${y1} A ${R_OUT} ${R_OUT} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${R_IN} ${R_IN} 0 ${large} 0 ${x4} ${y4} Z`;
}

export function FacetWheel() {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const seg = 360 / facets.length;
  const current = active === null ? null : facets[active];

  return (
    <div className="facet-wheel">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="group" aria-label="What I spend my time on" style={{ width: "100%", height: "100%", overflow: "visible" }}>
        {facets.map((f, i) => {
          const start = START + i * seg;
          const mid = start + seg / 2;
          const [lx, ly] = polar((R_OUT + R_IN) / 2, mid);
          const on = active === i;
          const push = reduce ? 0 : 9;
          const dx = on ? Math.cos(rad(mid)) * push : 0;
          const dy = on ? Math.sin(rad(mid)) * push : 0;
          return (
            <a
              key={f.verb}
              href={f.href}
              aria-label={`${f.title} — ${f.line}`}
              className="facet-seg"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive((p) => (p === i ? null : p))}
              onFocus={() => setActive(i)}
              onBlur={() => setActive((p) => (p === i ? null : p))}
            >
              <motion.g animate={{ x: dx, y: dy }} transition={{ type: "spring", stiffness: 320, damping: 24 }}>
                <path
                  d={donutSlice(start, start + seg)}
                  fill={f.color}
                  fillOpacity={on ? 1 : 0.84}
                  stroke={on ? "var(--color-paper)" : "transparent"}
                  strokeWidth={on ? 3 : 0}
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="13.5"
                  fontWeight={600}
                  fill="#fff"
                  style={{ letterSpacing: "0.03em", pointerEvents: "none", fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {f.verb}
                </text>
              </motion.g>
            </a>
          );
        })}
      </svg>

      {/* hub — the centre of the donut. Crossfades to the active facet. */}
      <div className="facet-center" aria-hidden>
        <AnimatePresence mode="wait" initial={false}>
          {current ? (
            <motion.div
              key={current.verb}
              initial={{ opacity: 0, y: reduce ? 0 : 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -4 }}
              transition={{ duration: reduce ? 0 : 0.18 }}
            >
              <div className="facet-center-eyebrow" style={{ color: current.color }}>{current.verb}</div>
              <div className="facet-center-title">{current.title}</div>
              <div className="facet-center-line">{current.line}</div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.18 }}
            >
              <div className="facet-center-eyebrow">My world</div>
              <div className="facet-center-title" style={{ fontSize: "1.15rem" }}>Six facets,<br />one question</div>
              <div className="facet-center-line">Hover or tap a slice</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
