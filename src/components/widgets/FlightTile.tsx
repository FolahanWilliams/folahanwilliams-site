"use client";

import { useReducedMotion } from "framer-motion";
import { journey } from "@/content/content";

// A top-down airliner silhouette — swept wings, fuselage, tailplane — drawn
// nose-first along +x so SMIL rotate="auto" banks it into every turn it flies.
const PLANE =
  "M12,0 L4,-1.3 L3.5,-1.3 L-1,-9 L-3,-8.4 L-1,-2 L-7,-1.4 L-9,-5 L-10.5,-4.6 " +
  "L-9.5,-1 L-11,0 L-9.5,1 L-10.5,4.6 L-9,5 L-7,1.4 L-1,2 L-3,8.4 L-1,9 " +
  "L3.5,1.3 L4,1.3 Z";

/**
 * The journey — U.S. → Lagos → London — as a looping flight along a
 * great-circle route. The plane flies the path (SMIL animateMotion, which
 * auto-rotates it along the tangent and holds briefly over Lagos), a dotted
 * contrail drifts toward London, and each city pings as the plane arrives.
 *
 * Reduced-motion: nothing animates — the plane simply rests at London with the
 * full route drawn, so the story still reads as a static map.
 */
export function FlightTile() {
  const reduce = useReducedMotion() ?? false;
  const { eyebrow, heading, caption, path, stops } = journey;
  const end = stops[stops.length - 1];

  return (
    <div>
      <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-clay)" }}>
        {eyebrow}
      </div>
      <h3 style={{ fontSize: "1.25rem", margin: "0.4rem 0 0.7rem" }}>{heading}</h3>

      <svg
        viewBox="0 0 300 160"
        width="100%"
        style={{ display: "block", maxWidth: 340, marginInline: "auto" }}
        role="img"
        aria-label="A looping flight from the United States to Lagos to London"
      >
        {/* the route — a faint solid base (also the motion path) + drifting dots */}
        <path id="fw-route" d={path} fill="none" stroke="var(--color-line)" strokeWidth={3} strokeLinecap="round" />
        <path className="flight-route" d={path} fill="none" stroke="var(--color-clay-soft)" strokeWidth={1.6} opacity={0.55} />

        {/* cities: a ping ring that fires on arrival, then the solid dot + label */}
        {stops.map((s, i) => (
          <g key={s.id}>
            <circle className={`flight-ping flight-ping-${i + 1}`} cx={s.x} cy={s.y} r={5} fill="var(--color-clay)" />
            <circle cx={s.x} cy={s.y} r={3.4} fill="var(--color-clay)" stroke="var(--color-paper)" strokeWidth={1.4} />
            <text
              x={s.x}
              y={s.id === "uk" ? s.y - 14 : s.y + 20}
              textAnchor="middle"
              style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
            >
              <tspan style={{ fontSize: 11, fontWeight: 700, fill: "var(--color-ink)" }}>{s.label}</tspan>
              <tspan style={{ fontSize: 10, fill: "var(--color-ink-soft)" }}>{`  ·  ${s.role}`}</tspan>
            </text>
          </g>
        ))}

        {/* the plane */}
        {reduce ? (
          <g transform={`translate(${end.x},${end.y}) rotate(16)`}>
            <path d={PLANE} transform="scale(0.82)" fill="var(--color-clay)" />
          </g>
        ) : (
          <g>
            <path d={PLANE} transform="scale(0.82)" fill="var(--color-clay)" />
            <animateMotion
              dur="7s"
              repeatCount="indefinite"
              rotate="auto"
              calcMode="spline"
              keyTimes="0;0.46;0.54;1"
              keyPoints="0;0.5;0.5;1"
              keySplines="0.42 0 0.2 1;0 0 1 1;0.42 0 0.2 1"
            >
              <mpath href="#fw-route" />
            </animateMotion>
            <animate
              attributeName="opacity"
              dur="7s"
              repeatCount="indefinite"
              values="0;1;1;1;0"
              keyTimes="0;0.07;0.5;0.93;1"
            />
          </g>
        )}
      </svg>

      <p style={{ margin: "0.6rem 0 0", color: "var(--color-ink-soft)", fontSize: "0.9rem", lineHeight: 1.55 }}>{caption}</p>
    </div>
  );
}
