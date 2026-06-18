"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { biasTaxonomy } from "@/content/content";

/** A cloud of the biases the audit hunts — hover one to read what it does. */
export function BiasTaxonomy() {
  const reduce = useReducedMotion() ?? false;
  const [sel, setSel] = useState<number | null>(null);
  const active = sel != null ? biasTaxonomy[sel] : null;

  return (
    <div>
      <div style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-clay)" }}>
        The method
      </div>
      <h3 style={{ fontSize: "1.3rem", margin: "0.4rem 0 0.4rem" }}>The biases I audit</h3>
      <p style={{ margin: "0 0 1rem", color: "var(--color-ink-soft)", fontSize: "0.92rem" }}>
        A dozen of the twenty-two. Hover one.
      </p>

      <div className="bias-cloud">
        {biasTaxonomy.map((b, i) => (
          <button
            key={b.name}
            className="bias-chip"
            data-active={sel === i}
            onMouseEnter={() => setSel(i)}
            onFocus={() => setSel(i)}
            onClick={() => setSel(i === sel ? null : i)}
          >
            {b.name}
          </button>
        ))}
      </div>

      <div style={{ minHeight: "2.8rem", marginTop: "1rem" }}>
        <AnimatePresence mode="wait">
          {active ? (
            <motion.p
              key={active.name}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.18 }}
              style={{ margin: 0, color: "var(--color-ink-soft)", fontSize: "0.95rem", lineHeight: 1.5 }}
            >
              <strong style={{ color: "var(--color-clay)" }}>{active.name}.</strong> {active.note}
            </motion.p>
          ) : (
            <motion.p
              key="hint"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.18 }}
              style={{ margin: 0, color: "var(--color-ink-soft)", fontStyle: "italic", fontSize: "0.95rem" }}
            >
              Each one is a way a confident decision goes quietly wrong.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
