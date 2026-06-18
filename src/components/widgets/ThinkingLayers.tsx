"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { thinkingLayers } from "@/content/content";

/**
 * The "How I think" viz: a confident decision, drilled down layer by layer to
 * the root — the assumption nobody checked. Each band opens on hover/focus or
 * click (so it works on touch + keyboard). The deepest band is clay-marked,
 * because that is the whole argument: the expensive mistake lives in the
 * thinking, not at the surface. Reduced-motion users get instant reveals.
 */
export function ThinkingLayers() {
  const { prompt, layers, payoff } = thinkingLayers;
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div className="strata" role="group" aria-label="A decision, drilled to its root">
      <p className="strata-prompt">{prompt}</p>

      <div className="strata-stack">
        {layers.map((l, i) => {
          const isOpen = open === i;
          const isRoot = i === layers.length - 1;
          return (
            <button
              key={l.label}
              type="button"
              className="strata-row"
              data-open={isOpen}
              data-root={isRoot}
              style={{ marginLeft: `${i * 12}px` }}
              onClick={() => setOpen(i)}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              aria-expanded={isOpen}
            >
              <div className="strata-head">
                <span className="strata-depth">{l.depth}</span>
                <span className="strata-label">{l.label}</span>
              </div>
              <motion.div
                className="strata-reveal"
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : 0.32, ease: "easeOut" }}
                style={{ overflow: "hidden" }}
              >
                <p className="strata-text">{l.text}</p>
              </motion.div>
            </button>
          );
        })}
      </div>

      <p className="strata-payoff">{payoff}</p>
    </div>
  );
}
