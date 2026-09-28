"use client";

/**
 * FloatingNav — the small fixed pill at the top of every page.
 *
 * Home-page sections come from the `navSections` SSOT and are real anchors
 * (`#work` on the home page, `/#work` from any other page), so they work
 * without JS, can be shared, and scroll smoothly via CSS (which globals.css
 * turns off under prefers-reduced-motion). On the home page the pill tracks
 * the section in view. Separate pages (`navPages`, e.g. Portfolio) sit after
 * a hairline divider and light up on their own route.
 *
 * On narrow phones each item swaps to its `short` label so the whole pill
 * fits; if it still overflows, the active item is kept scrolled into view.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navPages, navSections } from "@/content/content";

export function FloatingNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [activeId, setActiveId] = useState<string>(navSections[0].id);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!onHome) return;
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
  }, [onHome]);

  // Keep the active pill visible when the rail overflows (the smallest phones).
  // Scrolls the rail only, never the page.
  useEffect(() => {
    const nav = navRef.current;
    const el = nav?.querySelector<HTMLElement>('[data-active="true"]');
    if (!nav || !el || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollLeft = el.offsetLeft - (nav.clientWidth - el.offsetWidth) / 2;
  }, [activeId, pathname]);

  return (
    <nav ref={navRef} className="floating-nav" aria-label="Site">
      {navSections.map((s) => {
        const active = onHome && activeId === s.id;
        const cls = "floating-nav-item";
        const inner = (
          <>
            <span className="nav-full">{s.label}</span>
            <span className="nav-short" aria-hidden>
              {s.short}
            </span>
          </>
        );
        // same page: a plain anchor (native smooth scroll + scroll-margin);
        // other pages: a client-side link back to the home-page section.
        return onHome ? (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={cls}
            data-active={active}
            aria-label={s.label}
            aria-current={active ? "location" : undefined}
          >
            {inner}
          </a>
        ) : (
          <Link key={s.id} href={`/#${s.id}`} className={cls} data-active={false} aria-label={s.label}>
            {inner}
          </Link>
        );
      })}

      <span className="floating-nav-sep" aria-hidden />

      {navPages.map((p) => {
        const active = pathname === p.href;
        return (
          <Link
            key={p.href}
            href={p.href}
            className="floating-nav-item floating-nav-page"
            data-active={active}
            aria-label={p.label}
            aria-current={active ? "page" : undefined}
          >
            <span className="nav-full">{p.label}</span>
            <span className="nav-short" aria-hidden>
              {p.short}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
