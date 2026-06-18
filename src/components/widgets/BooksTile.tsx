"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { books } from "@/content/content";

const SPINES = ["#b5532a", "#8a6d3b", "#6f5536", "#9b3b2f", "#7a6248"];

/** An interactive shelf — hover a spine to read why the book matters. */
export function BooksTile() {
  const reduce = useReducedMotion() ?? false;
  const [sel, setSel] = useState(0);
  const b = books[sel];

  return (
    <div>
      <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-clay)" }}>
        What&rsquo;s shaped me
      </div>
      <h3 style={{ fontSize: "1.25rem", margin: "0.4rem 0 0.9rem" }}>On the shelf</h3>

      <div className="shelf">
        {books.map((bk, i) => (
          <button
            key={bk.title}
            className="book-spine"
            data-active={sel === i}
            onMouseEnter={() => setSel(i)}
            onFocus={() => setSel(i)}
            onClick={() => setSel(i)}
            style={{ background: SPINES[i % SPINES.length] }}
            aria-label={bk.title}
          >
            <span>{bk.title}</span>
          </button>
        ))}
      </div>

      <div style={{ minHeight: "4.2rem", marginTop: "0.9rem" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={b.title}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduce ? 0 : 0.22 }}
          >
            <div style={{ fontFamily: "var(--font-display), serif", fontSize: "1.05rem" }}>{b.title}</div>
            <div style={{ fontSize: "0.8rem", color: "var(--color-ink-soft)" }}>{b.author}</div>
            <div style={{ fontSize: "0.9rem", color: "var(--color-ink-soft)", marginTop: 5, lineHeight: 1.5 }}>{b.why}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
