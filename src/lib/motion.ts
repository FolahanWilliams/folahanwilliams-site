"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Hydration-safe `prefers-reduced-motion`. framer-motion's own hook reads
 * matchMedia during the client's first render, so for anyone with reduced
 * motion switched on the server HTML ("no preference") and the client
 * disagreed — React threw #418 and re-rendered the whole page on the client.
 * This reports `false` on the server AND during hydration, then flips to the
 * real preference right after mount (and tracks later changes).
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}
