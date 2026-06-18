"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { fitness } from "@/content/content";

const FOCUS_COLOR: Record<string, string> = {
  Push: "#b5532a",
  Pull: "#3f7d62",
  Legs: "#c07f2f",
  Rest: "#a89b8c",
};

/** A live training-split week: tap or hover a day to see the focus. Same
 *  compounding-discipline thread as the rest of the page. Interactive,
 *  reduced-motion-safe, touch + keyboard friendly. */
export function GymTile() {
  const { eyebrow, heading, daysPerWeek, body, split } = fitness;
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const current = split[active];

  return (
    <div>
      <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-clay)" }}>
        {eyebrow}
      </div>
      <h3 style={{ fontSize: "1.25rem", margin: "0.4rem 0 0.2rem" }}>{heading}</h3>
      <div style={{ fontSize: "0.78rem", color: "var(--color-ink-soft)", marginBottom: "0.85rem" }}>
        {daysPerWeek} days a week · push / pull / legs
      </div>

      <div className="gym-week" role="group" aria-label="Weekly training split">
        {split.map((d, i) => {
          const on = active === i;
          const color = FOCUS_COLOR[d.focus] ?? "var(--color-clay)";
          const isRest = d.focus === "Rest";
          return (
            <button
              key={d.day}
              type="button"
              className="gym-day"
              data-on={on}
              aria-pressed={on}
              aria-label={`${d.day}: ${d.focus}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              style={{
                background: on ? color : isRest ? "var(--color-paper)" : `${color}1f`,
                borderColor: on ? color : "var(--color-line)",
                color: on ? "#fff" : isRest ? "var(--color-ink-soft)" : color,
              }}
            >
              {d.day[0]}
            </button>
          );
        })}
      </div>

      <div className="gym-detail">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.day}
            initial={reduce ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -5 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          >
            <span className="gym-focus" style={{ color: FOCUS_COLOR[current.focus] }}>{current.day} · {current.focus}</span>
            <span className="gym-note">{current.note}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <p style={{ margin: "0.85rem 0 0", color: "var(--color-ink-soft)", fontSize: "0.9rem", lineHeight: 1.55 }}>{body}</p>
    </div>
  );
}
