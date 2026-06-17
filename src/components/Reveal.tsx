"use client";
import { useEffect, useRef, useState } from "react";

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // setState happens only inside the observer callback (a subscription),
    // never synchronously in the effect body. Reduced-motion users need no
    // observer at all: the `.reveal` base class is opaque and the animated
    // start state is gated behind `@media (prefers-reduced-motion: no-preference)`
    // in globals.css, so content is visible immediately regardless of `shown`.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={shown ? "reveal is-shown" : "reveal"}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
