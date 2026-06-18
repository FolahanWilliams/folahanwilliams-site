"use client";

/**
 * FloatingNav — a small fixed pill that tracks the section in view and scrolls
 * to it on click. Sections are the `navSections` SSOT; each id is an anchor on
 * the page. Keyboard + reduced-motion friendly (uses native smooth scroll,
 * which globals.css disables under prefers-reduced-motion).
 */

import { useEffect, useState } from "react";
import { navSections } from "@/content/content";

export function FloatingNav() {
  const [activeId, setActiveId] = useState<string>(navSections[0].id);

  useEffect(() => {
    const els = navSections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav className="floating-nav" aria-label="Sections">
      {navSections.map((s) => (
        <button
          key={s.id}
          onClick={() => go(s.id)}
          data-active={activeId === s.id}
          className="floating-nav-item"
        >
          {s.label}
        </button>
      ))}
    </nav>
  );
}
