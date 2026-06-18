"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { sentinelSignals } from "@/content/content";

/** Sentinel's conviction feed — the highlighted signal advances on a timer.
 *  Illustrative, not advice; the last row is the red-team killing a thesis. */
export function SignalTicker() {
  const reduce = useReducedMotion() ?? false;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((x) => (x + 1) % sentinelSignals.length), 2800);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div style={{ marginTop: "0.9rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "0.6rem" }}>
        <span className="ticker-pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: "#3f7d62", display: "inline-block" }} />
        <span style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-ink-soft)" }}>
          live conviction feed
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
        {sentinelSignals.map((s, idx) => {
          const on = idx === i;
          const color = s.killed ? "#a8322a" : "#3f7d62";
          return (
            <motion.div
              key={s.agent}
              animate={reduce ? {} : { opacity: on ? 1 : 0.5 }}
              transition={{ duration: 0.4 }}
              style={{
                border: `1px solid ${on ? "color-mix(in srgb, " + color + " 35%, var(--color-line))" : "var(--color-line)"}`,
                borderRadius: 9,
                padding: "0.55rem 0.7rem",
                background: on ? "var(--color-paper)" : "transparent",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 600, color }}>{s.agent}</span>
                <span style={{ fontSize: "0.72rem", color: "var(--color-ink-soft)", fontVariantNumeric: "tabular-nums" }}>
                  {s.killed ? "killed" : `${s.confidence}%`}
                </span>
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--color-ink-soft)", marginTop: 2, lineHeight: 1.4 }}>{s.line}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
