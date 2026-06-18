"use client";

import { motion, useReducedMotion } from "framer-motion";
import { dqiDemo } from "@/content/content";

/** A compact Decision-Quality gauge that fills when scrolled into view. */
export function MiniGauge() {
  const reduce = useReducedMotion() ?? false;
  const { score, label } = dqiDemo;
  const r = 52;
  const cx = 64;
  const cy = 60;
  const circ = Math.PI * r;
  const filled = (score / 100) * circ;
  const tone = score >= 70 ? "#3f7d62" : score >= 45 ? "#c8784f" : "#a8322a";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", marginTop: "0.9rem" }}>
      <svg viewBox="0 0 128 70" width="120" style={{ flexShrink: 0 }} aria-hidden>
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth={9}
          strokeLinecap="round"
        />
        <motion.path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={tone}
          strokeWidth={9}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: circ - filled }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 80, damping: 18, delay: 0.1 }}
        />
        <text
          x={cx}
          y={cy - 9}
          textAnchor="middle"
          style={{ fontFamily: "var(--font-display), serif", fontSize: 26, fill: "var(--color-ink)" }}
        >
          {score}
        </text>
      </svg>
      <div style={{ fontSize: "0.84rem", color: "var(--color-ink-soft)", lineHeight: 1.45 }}>
        <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.68rem", color: "var(--color-clay)", marginBottom: 2 }}>
          {label}
        </div>
        the number every audit ends on — the reasoning, graded.
      </div>
    </div>
  );
}
