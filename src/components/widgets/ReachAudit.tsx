"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { reachAudit } from "@/content/content";

const GREEN = "#3f7d62";

/**
 * "Get in touch", run through the same reasoning audit as the rest of the
 * site — except the decision to reach out scores an A. The Decision-Quality
 * gauge counts up when scrolled into view, the verdict lands, and each green
 * "signal" (the inverse of a bias finding) reveals in turn.
 *
 * Reduced-motion: everything is shown at its final value, no count-up, no
 * stagger — just the finished audit.
 */
export function ReachAudit() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const { eyebrow, product, memoTag, memo, score, verdict, signals, footnote } = reachAudit;

  // Count the score up (and, with it, fill the gauge arc) once in view.
  const [shown, setShown] = useState(reduce ? score : 0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = reduce ? 0 : 1100; // reduced motion: land on the value at once
    const tick = (t: number) => {
      const p = dur <= 0 ? 1 : Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(eased * score));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, score]);

  // Semicircle gauge geometry (matches the MiniGauge grammar elsewhere).
  const r = 54;
  const cx = 64;
  const cy = 62;
  const circ = Math.PI * r;
  const arc = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  const offset = circ - (shown / 100) * circ;

  return (
    <div ref={ref} className="reach-audit">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
        <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-clay)", fontWeight: 700 }}>
          {eyebrow}
        </div>
        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", fontWeight: 600, color: "var(--color-ink-soft)" }}
        >
          <span style={{ width: 6, height: 6, borderRadius: 999, background: GREEN, display: "inline-block" }} />
          Audited by {product.label} ↗
        </a>
      </div>

      <div className="reach-memo">
        <span style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ink-soft)", flexShrink: 0 }}>
          {memoTag}
        </span>
        <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-ink)" }}>{memo}</span>
      </div>

      <div className="reach-grid">
        {/* the gauge + verdict */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <svg viewBox="0 0 128 78" width="150" aria-hidden style={{ flexShrink: 0 }}>
            <path d={arc} fill="none" stroke="var(--color-line)" strokeWidth={9} strokeLinecap="round" />
            <path
              d={arc}
              fill="none"
              stroke={GREEN}
              strokeWidth={9}
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
            />
            <text x={cx} y={cy - 6} textAnchor="middle" style={{ fontFamily: "var(--font-display), serif", fontSize: 30, fill: "var(--color-ink)" }}>
              {shown}
            </text>
            <text x={cx} y={cy + 12} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", fill: "var(--color-ink-soft)" }}>
              DQI · A
            </text>
          </svg>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: GREEN, fontWeight: 600, fontSize: "0.95rem" }}>
            <Check />
            {verdict}
          </div>
        </div>

        {/* the signals (green "findings") */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
          {signals.map((s, i) => (
            <motion.div
              key={s.label}
              className="reach-signal"
              initial={reduce ? false : { opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={reduce ? { duration: 0 } : { duration: 0.35, delay: 0.2 + i * 0.12, ease: "easeOut" }}
            >
              <Check />
              <span style={{ fontSize: "0.95rem", color: "var(--color-ink)", flex: 1 }}>{s.label}</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: GREEN, fontVariantNumeric: "tabular-nums" }}>+{s.weight}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <p style={{ margin: "1.1rem 0 0", fontSize: "0.82rem", color: "var(--color-ink-soft)", fontStyle: "italic" }}>{footnote}</p>
    </div>
  );
}

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="8" fill={GREEN} opacity={0.16} />
      <path d="M4.5 8.2 L7 10.5 L11.5 5.5" fill="none" stroke={GREEN} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
