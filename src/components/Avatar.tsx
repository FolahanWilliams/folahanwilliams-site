"use client";

import { useState } from "react";
import { content } from "@/content/content";

/** Headshot with a graceful monogram fallback — shows initials until
 *  public/headshot.jpg loads (and stays graceful if it isn't there yet). */
export function Avatar({ size = 104 }: { size?: number }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const initials = content.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
        background: "var(--color-paper-2)",
        border: "1px solid var(--color-line)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 6px 24px -12px rgba(33,28,23,0.4)",
      }}
    >
      <span style={{ fontFamily: "var(--font-display), serif", fontSize: size * 0.38, color: "var(--color-clay)" }}>
        {initials}
      </span>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/headshot.jpg"
          alt={content.name}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity 400ms ease",
          }}
        />
      )}
    </div>
  );
}
