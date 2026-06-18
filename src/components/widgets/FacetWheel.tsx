"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { facets } from "@/content/content";

/**
 * The hero's right column: a radial menu of the six facets of the same
 * obsession. Hover / focus / tap a slice and it pushes outward, names itself
 * in the hub, AND a floating content box slides in below the wheel with a
 * fuller blurb + a link into that section. The push follows the *hovered*
 * slice; the box follows the *active* (last-chosen) slice, so it stays put
 * long enough to click its link. Reduced-motion users get no push — the
 * brightened fill + rim is the cue. Touch: tapping a slice fills the box;
 * the box's link navigates. All geometry derives from `facets.length`.
 */

const SIZE = 320;
const C = SIZE / 2;
const R_OUT = 152;
const R_IN = 82;
const PAD_DEG = 2;
const START = -90;

const rad = (deg: number) => (deg * Math.PI) / 180;
const polar = (r: number, deg: number): [number, number] => [C + r * Math.cos(rad(deg)), C + r * Math.sin(rad(deg))];

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
  const [active, setActive] = useState<number | null>(null); // box follows this
  const [hovered, setHovered] = useState<number | null>(null); // push follows this
  const reduce = useReducedMotion();
  const seg = 360 / facets.length;
  const current = active === null ? null : facets[active];

  const choose = (i: number) => {
    setActive(i);
    setHovered(i);
  };

  return (
    <div className="facet-wrap">
      <div className="facet-wheel">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="group" aria-label="What I spend my time on" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          {facets.map((f, i) => {
            const start = START + i * seg;
            const mid = start + seg / 2;
            const [lx, ly] = polar((R_OUT + R_IN) / 2, mid);
            const isHover = hovered === i;
            const isActive = active === i;
            const push = reduce ? 0 : 9;
            const dx = isHover ? Math.cos(rad(mid)) * push : 0;
            const dy = isHover ? Math.sin(rad(mid)) * push : 0;
            return (
              <g
                key={f.verb}
                role="button"
                tabIndex={0}
                aria-label={`${f.title} — ${f.line}`}
                aria-pressed={isActive}
                className="facet-seg"
                onMouseEnter={() => choose(i)}
                onMouseLeave={() => setHovered((p) => (p === i ? null : p))}
                onFocus={() => choose(i)}
                onBlur={() => setHovered((p) => (p === i ? null : p))}
                onClick={() => choose(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    choose(i);
                  }
                }}
                style={{ cursor: "pointer", outline: "none" }}
              >
                <motion.g animate={{ x: dx, y: dy }} transition={{ type: "spring", stiffness: 320, damping: 24 }}>
                  <path
                    d={donutSlice(start, start + seg)}
                    fill={f.color}
                    fillOpacity={isHover || isActive ? 1 : 0.84}
                    stroke={isActive ? "var(--color-paper)" : "transparent"}
                    strokeWidth={isActive ? 3 : 0}
                  />
                  <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="13.5" fontWeight={600} fill="#fff" style={{ letterSpacing: "0.03em", pointerEvents: "none", fontFamily: "var(--font-inter), sans-serif" }}>
                    {f.verb}
                  </text>
                </motion.g>
              </g>
            );
          })}
        </svg>

        {/* hub */}
        <div className="facet-center" aria-hidden>
          <AnimatePresence mode="wait" initial={false}>
            {current ? (
              <motion.div key={current.verb} initial={{ opacity: 0, y: reduce ? 0 : 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduce ? 0 : -4 }} transition={{ duration: reduce ? 0 : 0.18 }}>
                <div className="facet-center-eyebrow" style={{ color: current.color }}>{current.verb}</div>
                <div className="facet-center-title">{current.title}</div>
              </motion.div>
            ) : (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.18 }}>
                <div className="facet-center-eyebrow">My world</div>
                <div className="facet-center-title" style={{ fontSize: "1.12rem" }}>Six facets,<br />one question</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* floating content box — slides in below the wheel for the active slice */}
      <div className="facet-box">
        <AnimatePresence mode="wait" initial={false}>
          {current ? (
            <motion.div
              key={current.verb}
              className="facet-box-card"
              style={{ borderLeftColor: current.color }}
              initial={{ opacity: 0, y: reduce ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -6 }}
              transition={{ duration: reduce ? 0 : 0.24, ease: "easeOut" }}
            >
              <div className="facet-box-eyebrow" style={{ color: current.color }}>{current.verb} · {current.title}</div>
              <p className="facet-box-blurb">{current.blurb}</p>
              <a className="facet-box-link" href={current.href} style={{ color: current.color }} target={current.href.startsWith("#") ? undefined : "_blank"} rel={current.href.startsWith("#") ? undefined : "noopener noreferrer"}>
                {current.linkLabel} →
              </a>
            </motion.div>
          ) : (
            <motion.div key="prompt" className="facet-box-prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.2 }}>
              Hover or tap a slice — each opens up here.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
