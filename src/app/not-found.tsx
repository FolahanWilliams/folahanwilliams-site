import Link from "next/link";
import { FloatingNav } from "@/components/FloatingNav";

export default function NotFound() {
  return (
    <>
      <FloatingNav />
      <main style={{ minHeight: "70vh", display: "flex", alignItems: "center", padding: "7rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "var(--measure)", margin: "0 auto" }}>
          <div className="eyebrow">404</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)", margin: "0 0 1rem" }}>This page doesn&rsquo;t exist.</h1>
          <p style={{ color: "var(--color-ink-soft)", margin: "0 0 1.6rem" }}>
            The link may be old, or mistyped. Everything lives on one of two pages.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/" className="pf-btn" data-primary>
              The main page →
            </Link>
            <Link href="/portfolio" className="pf-btn">
              The portfolio →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
