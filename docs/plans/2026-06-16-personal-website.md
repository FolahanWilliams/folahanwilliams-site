# Folahan Williams Personal Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a warm, elegant, single-page static personal website for Folahan Williams (`folahanwilliams.vercel.app`) — a portrait of how he thinks, with his work as evidence.

**Architecture:** Next.js App Router static site, one route (`/`). All copy/links/credentials in a typed `content.ts` SSOT; each narrative section is a small focused component reading from it. A shared `Section`/`Reveal` shell carries spacing + reduced-motion-safe entrance motion. No backend, no DB, no auth. Warm cream/ink/clay design tokens; Fraunces serif headlines + Inter body.

**Tech Stack:** Next.js 15+ (App Router) · TypeScript · Tailwind CSS 4 · `next/font/google` (self-hosted Fraunces + Inter) · Vitest (one content-integrity test) · Vercel.

**Spec:** `docs/specs/2026-06-16-personal-website-design.md` (approved). The §7 confidentiality constraints are load-bearing: no named prospects, no valuation/exit talk, advisor unnamed, only verifiable credentials.

**Voice/placeholder rule:** all human copy in this plan is *draft placeholder* clearly marked `[DRAFT — founder edit]`. The build is structure + styling; the founder edits the words in `content.ts` before publish. Never invent a firm name, a date, or a credential.

---

## File structure (what gets built)

```
folahanwilliams-site/
  src/
    app/
      layout.tsx          # fonts, metadata, OG; wraps page
      page.tsx            # composes the six sections in order
      globals.css         # @theme tokens (cream/ink/clay), type scale, base, reduced-motion
      opengraph-image.tsx # generated OG card (name + throughline) — built last
    components/
      Section.tsx         # shared section shell: measure, vertical rhythm
      Reveal.tsx          # client: IntersectionObserver fade-rise, reduced-motion-safe
      Hero.tsx
      HowIThink.tsx
      Work.tsx            # renders the 4 pieces from content.work[]
      WhoIAm.tsx
      QuietProof.tsx
      ReachMe.tsx
    content/
      content.ts          # SSOT: hero, howIThink, work[], whoIAm, quietProof, links, credentials
      content.test.ts     # content-integrity test (the one real unit test)
  public/
    headshot.jpg          # founder drops in
    thesis.pdf            # founder drops in (public-OK)
    cv.pdf                # founder drops in
  docs/{specs,plans}/
```

Each section component has ONE responsibility: render its slice of `content.ts`. The math/logic surface is near-zero (it's a content site), so the single meaningful automated test is **content integrity** (required fields non-empty, links well-formed, exactly four work items). Component correctness is verified by `next build` + dev-server render + founder eyeball (this is a design surface) + a final Lighthouse pass.

---

## Task 1: Scaffold the Next.js app

**Files:**
- Create: whole Next.js skeleton via CLI, then prune.
- Create: `.gitignore` (CLI provides), `README.md`

- [ ] **Step 1: Scaffold into the existing repo**

Run (from repo root `/Users/folahan/folahanwilliams-site`):
```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --eslint --no-turbopack --use-npm
```
If it refuses because the dir isn't empty (the `docs/` folder + git exist), scaffold in a temp dir and copy in:
```bash
npx create-next-app@latest /tmp/fw-site --typescript --tailwind --app --src-dir --import-alias "@/*" --eslint --no-turbopack --use-npm
rsync -a --exclude='.git' /tmp/fw-site/ ./
rm -rf /tmp/fw-site
```

- [ ] **Step 2: Prune boilerplate**

Delete the demo content so we start clean:
```bash
rm -f public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg
```
Empty `src/app/page.tsx` to a placeholder:
```tsx
export default function Home() {
  return <main>placeholder</main>;
}
```

- [ ] **Step 3: Verify dev + build**

Run: `npm run dev` → open `http://localhost:3000` → shows "placeholder".
Run: `npm run build`
Expected: build PASSES, no type errors.

- [ ] **Step 4: README + commit**

Create `README.md`:
```markdown
# folahanwilliams.com — personal site

Static single-page personal website. Next.js (App Router) + Tailwind 4, deployed on Vercel.

- All copy/links live in `src/content/content.ts` (edit there, not in components).
- `npm run dev` · `npm run build` · `npm test`
- Design spec: `docs/specs/2026-06-16-personal-website-design.md`
```

```bash
git add -A
git commit -m "chore: scaffold Next.js + Tailwind app"
```

---

## Task 2: Design tokens, fonts, base styles

**Files:**
- Modify: `src/app/globals.css` (replace contents)
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Write the token system in `globals.css`**

Replace `src/app/globals.css` with:
```css
@import "tailwindcss";

@theme {
  /* palette — warm cream / ink / clay */
  --color-paper: #faf6ef;       /* background */
  --color-paper-2: #f3ece0;     /* soft raised */
  --color-ink: #211c17;         /* warm near-black text */
  --color-ink-soft: #5b5147;    /* secondary text */
  --color-clay: #b5532a;        /* terracotta accent */
  --color-clay-soft: #c8784f;
  --color-line: #e6ddcf;        /* hairline rules */

  /* type */
  --font-display: var(--font-fraunces);
  --font-body: var(--font-inter);

  /* reading measure */
  --measure: 41rem; /* ~660px */
}

:root { color-scheme: light; }

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-body), system-ui, sans-serif;
  font-size: 1.0625rem;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

h1, h2, h3 {
  font-family: var(--font-display), Georgia, serif;
  font-weight: 400;
  line-height: 1.12;
  letter-spacing: -0.01em;
}

a { color: var(--color-clay); text-decoration: none; }
a:hover { text-decoration: underline; text-underline-offset: 3px; }

::selection { background: color-mix(in srgb, var(--color-clay) 22%, transparent); }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

- [ ] **Step 2: Wire the fonts in `layout.tsx`**

Replace `src/app/layout.tsx` with:
```tsx
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Folahan Williams",
  description: "I'm fascinated by how people think and decide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify**

Temporarily set `page.tsx` to `<main><h1>Folahan</h1><p>body text</p></main>`, run `npm run dev`:
Expected: warm cream background, `Folahan` in a serif (Fraunces), body in Inter, clay-colored selection highlight.
Run `npm run build` → PASSES.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: warm design tokens + Fraunces/Inter fonts"
```

---

## Task 3: Content SSOT + the content-integrity test

**Files:**
- Create: `src/content/content.ts`
- Create: `src/content/content.test.ts`
- Modify: `package.json` (add vitest + test script)

- [ ] **Step 1: Add vitest**

```bash
npm i -D vitest
```
Add to `package.json` scripts: `"test": "vitest run"`.

- [ ] **Step 2: Write the content SSOT** `src/content/content.ts`

All strings are `[DRAFT — founder edit]`. Structure is final; words are not.
```ts
export interface WorkItem {
  key: string;
  title: string;
  kindLabel: string; // "as research" | "as a company" | "as teaching" | "in practice"
  body: string;
  href?: string;        // external link (optional)
  linkLabel?: string;
  pdf?: string;         // /thesis.pdf etc (optional)
}

export interface LinkItem { label: string; href: string }

export const content = {
  name: "Folahan Williams",

  // §3.1 hero — the throughline, not a résumé line
  heroLine:
    "I'm fascinated by how people think and decide — so I keep building things that put the answer under pressure. [DRAFT — founder edit]",

  // §3.2 How I think (the heaviest section). Anchored to the metacognition talk.
  howIThink: {
    heading: "How I think",
    paragraphs: [
      "[DRAFT — founder edit] One or two paragraphs in Folahan's own voice about the obsession with reasoning, noise, and bias — how he actually sees problems.",
      "[DRAFT — founder edit] A second paragraph on what he's curious about and the way he works a question.",
    ],
    pullQuote: "[DRAFT — pull-quote from the metacognition speech]",
  },

  // §3.3 The work — one question, four angles. EXACTLY 4 items (content.test enforces).
  work: [
    {
      key: "decision-intel",
      title: "Decision Intel",
      kindLabel: "the question as a company",
      body: "[DRAFT] A reasoning-audit platform — what it is and why I built it. No named customers, no valuation talk.",
      href: "https://decision-intel.com",
      linkLabel: "decision-intel.com",
    },
    {
      key: "thesis-2008",
      title: "The cognitive roots of the 2008 crisis",
      kindLabel: "the question as research",
      body: "[DRAFT] A published paper on the cognitive biases — and the cortisol/testosterone feedback loop — behind the crash.",
      pdf: "/thesis.pdf",
      linkLabel: "Read the paper (PDF)",
    },
    {
      key: "finding-finance",
      title: "Finding Finance",
      kindLabel: "the question as teaching",
      body: "[DRAFT] A student-led initiative teaching finance and the psychology behind decisions to younger students.",
    },
    {
      key: "investment-internship",
      title: "Investment Analyst — [FIRM, LOCATION · DATES — confirm]",
      kindLabel: "the question in practice",
      body: "[DRAFT] Building a portfolio-intelligence view of exposure, risk, and what's actually driving returns.",
    },
  ] as WorkItem[],

  // §3.4 Who I am — the reveal
  whoIAm: {
    heading: "Who I am",
    paragraphs: [
      "[DRAFT] Born in the US, raised between Lagos and the UK, headed to San Francisco.",
      "[DRAFT — the age lands HERE] I'm 16.",
      "[DRAFT] Twelve years at the piano — ABRSM Grade 6 piano, Grade 5 Music Theory with Distinction, Grade 6 guitar in progress. [confirm exact grade wording]",
    ],
    // §3.4 faith — lightly present: ONE honest line, never a section
    valuesLine: "[DRAFT — one honest values line; optional single verse]",
  },

  // §3.5 quiet proof — understated
  proof: {
    review:
      "[DRAFT] “Excellent” — a short, usable line from the i-Fitness internship review.",
    advisor:
      "Advised by a senior advisor who helped take Wiz to a $32B outcome.", // never named — §7
  },

  // §3.6 reach me
  contactEmail: "hello@example.com", // [confirm]
  links: [
    { label: "GitHub", href: "https://github.com/FolahanWilliams" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/[confirm]" },
    { label: "Decision Intel", href: "https://decision-intel.com" },
    { label: "Nexus Tracker", href: "https://github.com/FolahanWilliams/nexus-tracker" }, // [confirm target]
  ] as LinkItem[],
  cv: "/cv.pdf",
} as const;
```

- [ ] **Step 3: Write the failing content-integrity test** `src/content/content.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { content } from "./content";

describe("content integrity", () => {
  it("has a name and a hero line", () => {
    expect(content.name.trim().length).toBeGreaterThan(0);
    expect(content.heroLine.trim().length).toBeGreaterThan(0);
  });

  it("has exactly four work items, each with title + body + kindLabel", () => {
    expect(content.work).toHaveLength(4);
    for (const w of content.work) {
      expect(w.title.trim().length).toBeGreaterThan(0);
      expect(w.body.trim().length).toBeGreaterThan(0);
      expect(w.kindLabel.trim().length).toBeGreaterThan(0);
    }
  });

  it("has How-I-think paragraphs and a pull-quote", () => {
    expect(content.howIThink.paragraphs.length).toBeGreaterThan(0);
    expect(content.howIThink.pullQuote.trim().length).toBeGreaterThan(0);
  });

  it("every link is an absolute http(s) URL", () => {
    for (const l of content.links) {
      expect(l.href).toMatch(/^https?:\/\/.+/);
      expect(l.label.trim().length).toBeGreaterThan(0);
    }
  });

  it("contact email is a mailto-able address", () => {
    expect(content.contactEmail).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });

  it("never names the advisor (confidentiality §7)", () => {
    expect(content.proof.advisor.toLowerCase()).not.toContain("reiner");
    expect(content.proof.advisor).toMatch(/\$32B|Wiz/);
  });
});
```

- [ ] **Step 4: Run test → verify it passes**

Run: `npm test`
Expected: PASS (6 tests). (The placeholders are non-empty, so integrity passes; the test guards against a future empty required field or a malformed link.)

- [ ] **Step 5: Commit**

```bash
git add src/content/ package.json package-lock.json
git commit -m "feat: typed content SSOT + content-integrity test"
```

---

## Task 4: Shared `Reveal` + `Section` shells

**Files:**
- Create: `src/components/Reveal.tsx`
- Create: `src/components/Section.tsx`

- [ ] **Step 1: `Reveal.tsx` (client, IntersectionObserver, reduced-motion-safe)**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(14px)",
        transition: "opacity 700ms ease, transform 700ms ease",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: `Section.tsx` (vertical rhythm + reading measure)**

```tsx
import { Reveal } from "./Reveal";

export function Section({
  children,
  measure = false,
  className = "",
}: {
  children: React.ReactNode;
  measure?: boolean; // constrain to reading width for prose sections
  className?: string;
}) {
  return (
    <section className={className} style={{ padding: "clamp(3.5rem, 9vw, 7rem) 1.5rem" }}>
      <div style={{ maxWidth: measure ? "var(--measure)" : "64rem", margin: "0 auto" }}>
        <Reveal>{children}</Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify**

`npm run build` → PASSES (these are imported next task). No render check yet.

- [ ] **Step 4: Commit**

```bash
git add src/components/Reveal.tsx src/components/Section.tsx
git commit -m "feat: Section + reduced-motion-safe Reveal shells"
```

---

## Task 5: Hero

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Write `Hero.tsx`**

```tsx
import Image from "next/image";
import { content } from "@/content/content";

export function Hero() {
  return (
    <header style={{ padding: "clamp(4rem, 12vw, 9rem) 1.5rem clamp(2rem, 6vw, 4rem)" }}>
      <div style={{ maxWidth: "var(--measure)", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Image
          src="/headshot.jpg"
          alt={content.name}
          width={104}
          height={104}
          priority
          style={{ borderRadius: "50%", objectFit: "cover", boxShadow: "0 6px 24px -12px rgba(33,28,23,0.4)" }}
        />
        <h1 style={{ fontSize: "clamp(2.2rem, 6vw, 3.4rem)", margin: 0 }}>{content.name}</h1>
        <p style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.5rem)", lineHeight: 1.5, color: "var(--color-ink)", margin: 0, maxWidth: "34rem" }}>
          {content.heroLine}
        </p>
        <a
          href="#reach"
          style={{
            alignSelf: "start", marginTop: "0.5rem", padding: "0.7rem 1.3rem",
            border: "1px solid var(--color-clay)", borderRadius: "999px",
            color: "var(--color-clay)", fontSize: "0.95rem",
          }}
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
```
> Note: `headshot.jpg` is dropped into `public/` in Task 11. Until then `next/image` will 404 in dev — that's expected; build still passes. If the founder's file is a different extension, update the `src` + filename together.

- [ ] **Step 2: Verify**

Set `page.tsx` to render `<Hero />` (temporary), `npm run dev`: name in Fraunces, the throughline line, a clay pill CTA, lots of air. (Headshot may be a broken image until Task 11.)
`npm run build` → PASSES.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: hero — essence + throughline + CTA"
```

---

## Task 6: How I Think (the heart)

**Files:**
- Create: `src/components/HowIThink.tsx`

- [ ] **Step 1: Write `HowIThink.tsx`**

```tsx
import { Section } from "./Section";
import { content } from "@/content/content";

export function HowIThink() {
  const { heading, paragraphs, pullQuote } = content.howIThink;
  return (
    <Section measure>
      <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", marginBottom: "1.5rem" }}>{heading}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", fontSize: "1.1rem" }}>
        {paragraphs.map((p, i) => (
          <p key={i} style={{ margin: 0 }}>{p}</p>
        ))}
      </div>
      <blockquote
        style={{
          margin: "2.5rem 0 0", paddingLeft: "1.25rem",
          borderLeft: "2px solid var(--color-clay)",
          fontFamily: "var(--font-display), Georgia, serif",
          fontSize: "1.5rem", lineHeight: 1.4, color: "var(--color-ink)",
        }}
      >
        {pullQuote}
      </blockquote>
    </Section>
  );
}
```

- [ ] **Step 2: Verify** — render via `page.tsx`, confirm the prose sits at reading width, the pull-quote has a clay rule. `npm run build` PASSES.

- [ ] **Step 3: Commit**
```bash
git add src/components/HowIThink.tsx
git commit -m "feat: How-I-think — the heaviest, voice-led section"
```

---

## Task 7: Work

**Files:**
- Create: `src/components/Work.tsx`

- [ ] **Step 1: Write `Work.tsx`** (renders all four `content.work` items as quiet cards)

```tsx
import { Section } from "./Section";
import { content } from "@/content/content";

export function Work() {
  return (
    <Section>
      <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", marginBottom: "0.75rem" }}>
        One question, four ways
      </h2>
      <p style={{ color: "var(--color-ink-soft)", marginBottom: "2.5rem", maxWidth: "34rem" }}>
        The same obsession — how people reason and decide — as research, a company, teaching, and practice.
      </p>
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))" }}>
        {content.work.map((w) => (
          <article
            key={w.key}
            style={{
              background: "var(--color-paper-2)", border: "1px solid var(--color-line)",
              borderRadius: "14px", padding: "1.4rem",
            }}
          >
            <div style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-clay)", marginBottom: "0.6rem" }}>
              {w.kindLabel}
            </div>
            <h3 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem" }}>{w.title}</h3>
            <p style={{ margin: 0, color: "var(--color-ink-soft)", fontSize: "0.98rem" }}>{w.body}</p>
            {(w.href || w.pdf) && (
              <a
                href={w.href ?? w.pdf}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", marginTop: "0.9rem", fontSize: "0.92rem" }}
              >
                {w.linkLabel ?? "Learn more"} →
              </a>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
```
> Static `public/` PDFs (thesis, cv) are plain `<a>` — never `next/link` (RSC prefetch 404s on static assets).

- [ ] **Step 2: Verify** — all four cards render, each with its kind label + optional link. `npm run build` PASSES.

- [ ] **Step 3: Commit**
```bash
git add src/components/Work.tsx
git commit -m "feat: work — four angles on one question"
```

---

## Task 8: Who I Am

**Files:**
- Create: `src/components/WhoIAm.tsx`

- [ ] **Step 1: Write `WhoIAm.tsx`**

```tsx
import { Section } from "./Section";
import { content } from "@/content/content";

export function WhoIAm() {
  const { heading, paragraphs, valuesLine } = content.whoIAm;
  return (
    <Section measure>
      <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", marginBottom: "1.5rem" }}>{heading}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", fontSize: "1.1rem" }}>
        {paragraphs.map((p, i) => (
          <p key={i} style={{ margin: 0 }}>{p}</p>
        ))}
      </div>
      {valuesLine && (
        <p style={{ marginTop: "1.75rem", color: "var(--color-ink-soft)", fontStyle: "italic" }}>
          {valuesLine}
        </p>
      )}
    </Section>
  );
}
```

- [ ] **Step 2: Verify** — origin/age/music paragraphs render; the values line sits quiet and italic. `npm run build` PASSES.

- [ ] **Step 3: Commit**
```bash
git add src/components/WhoIAm.tsx
git commit -m "feat: who I am — the reveal (origin, age, breadth, values line)"
```

---

## Task 9: Quiet Proof

**Files:**
- Create: `src/components/QuietProof.tsx`

- [ ] **Step 1: Write `QuietProof.tsx`**

```tsx
import { Section } from "./Section";
import { content } from "@/content/content";

export function QuietProof() {
  return (
    <Section measure>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <p style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.35rem", lineHeight: 1.4, margin: 0 }}>
          {content.proof.review}
        </p>
        <p style={{ color: "var(--color-ink-soft)", margin: 0 }}>{content.proof.advisor}</p>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify** — review quote + unnamed-advisor line render; nothing names the advisor (the content test guards this). `npm run build` PASSES.

- [ ] **Step 3: Commit**
```bash
git add src/components/QuietProof.tsx
git commit -m "feat: quiet proof — restrained credibility"
```

---

## Task 10: Reach Me + page composition

**Files:**
- Create: `src/components/ReachMe.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write `ReachMe.tsx`**

```tsx
import { Section } from "./Section";
import { content } from "@/content/content";

export function ReachMe() {
  return (
    <Section measure className="">
      <div id="reach" style={{ scrollMarginTop: "2rem" }}>
        <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", marginBottom: "1rem" }}>Get in touch</h2>
        <p style={{ marginBottom: "1.5rem", color: "var(--color-ink-soft)", maxWidth: "32rem" }}>
          If any of this resonates, I&rsquo;d love to talk.
        </p>
        <a href={`mailto:${content.contactEmail}`} style={{ fontSize: "1.2rem" }}>
          {content.contactEmail}
        </a>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", marginTop: "1.75rem" }}>
          {content.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
          ))}
          <a href={content.cv} target="_blank" rel="noopener noreferrer">CV (PDF)</a>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Compose the page** — replace `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/Hero";
import { HowIThink } from "@/components/HowIThink";
import { Work } from "@/components/Work";
import { WhoIAm } from "@/components/WhoIAm";
import { QuietProof } from "@/components/QuietProof";
import { ReachMe } from "@/components/ReachMe";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowIThink />
      <Work />
      <WhoIAm />
      <QuietProof />
      <ReachMe />
    </main>
  );
}
```

- [ ] **Step 3: Verify the whole page** — `npm run dev`: scroll top→bottom, every section fades in on enter, the `#reach` anchor scrolls smoothly from the hero CTA. `npm run build` PASSES. `npm test` PASSES.

- [ ] **Step 4: Commit**
```bash
git add src/components/ReachMe.tsx src/app/page.tsx
git commit -m "feat: reach-me + full single-page composition"
```

---

## Task 11: Assets

**Files:**
- Create: `public/headshot.jpg`, `public/thesis.pdf`, `public/cv.pdf` (founder-supplied)

- [ ] **Step 1: Drop in the real files**

Founder action: copy the headshot → `public/headshot.jpg` (match the extension used in `Hero.tsx`), the thesis PDF → `public/thesis.pdf`, the CV → `public/cv.pdf`.

- [ ] **Step 2: Verify**

`npm run dev`: headshot renders crisp in the hero; the thesis card link and the CV link open the real PDFs in a new tab.

- [ ] **Step 3: Commit**
```bash
git add public/headshot.jpg public/thesis.pdf public/cv.pdf
git commit -m "chore: add headshot, thesis, and CV assets"
```

---

## Task 12: Metadata + OG card

**Files:**
- Create: `src/app/opengraph-image.tsx`
- Modify: `src/app/layout.tsx` (metadata)

> Do this AFTER the final hero line is locked — the OG card reuses that copy (spec §5).

- [ ] **Step 1: Finalize metadata** in `layout.tsx`:
```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://folahanwilliams.vercel.app"),
  title: "Folahan Williams",
  description: content.heroLine.replace(" [DRAFT — founder edit]", ""),
  openGraph: { title: "Folahan Williams", description: "How people think and decide.", type: "website" },
};
```
(Import `content` from `@/content/content`.)

- [ ] **Step 2: Generated OG image** `src/app/opengraph-image.tsx`:
```tsx
import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#faf6ef", color: "#211c17",
        display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, fontFamily: "serif" }}>
        <div style={{ fontSize: 64 }}>Folahan Williams</div>
        <div style={{ fontSize: 30, color: "#5b5147", marginTop: 16, maxWidth: 820 }}>
          I&rsquo;m fascinated by how people think and decide.
        </div>
        <div style={{ width: 90, height: 6, background: "#b5532a", marginTop: 28 }} />
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 3: Verify** — `npm run build` PASSES; visiting `/opengraph-image` returns the PNG; `<head>` has title/description/OG tags.

- [ ] **Step 4: Commit**
```bash
git add src/app/opengraph-image.tsx src/app/layout.tsx
git commit -m "feat: metadata + generated OG social card"
```

---

## Task 13: Accessibility, responsive, final polish

**Files:** (touch-ups across components as needed)

- [ ] **Step 1: Mobile pass** — narrow the viewport to 360px: single column reflows, hero/cards/prose readable, no overflow, work grid collapses to one column.
- [ ] **Step 2: Reduced-motion** — enable OS "reduce motion": entrance reveals show immediately, no fade/translate, smooth-scroll off.
- [ ] **Step 3: Keyboard + contrast** — tab through (CTA, all links focus-visible); confirm ink-on-paper and clay-on-paper meet WCAG AA.
- [ ] **Step 4: Lighthouse** — `npm run build && npm start`, run Lighthouse on `localhost:3000`: Performance ≥95, Accessibility ≥95. Fix regressions (alt text, heading order, link names).
- [ ] **Step 5: Commit** any fixes:
```bash
git add -A
git commit -m "polish: mobile reflow, reduced-motion, a11y + lighthouse"
```

---

## Task 14: Deploy to Vercel

- [ ] **Step 1: Create the GitHub repo + push**
```bash
gh repo create FolahanWilliams/folahanwilliams-site --private --source=. --remote=origin --push
```
(or create on github.com and `git remote add origin … && git push -u origin main`)

- [ ] **Step 2: Connect Vercel** — import the repo at vercel.com (framework auto-detected: Next.js). Set the project name so the URL is `folahanwilliams.vercel.app`.

- [ ] **Step 3: Verify production** — open `folahanwilliams.vercel.app`: page loads < 2s, all links/PDFs resolve, OG card previews when the URL is pasted into a chat/social box, mobile + desktop both clean.

- [ ] **Step 4: Final founder read-through** — every line in `content.ts` is the founder's real words (no remaining `[DRAFT]`/`[confirm]`), the internship firm/dates + music grades are exact, the email is right. Commit the content edits, auto-redeploys.

---

## Pre-publish checklist (the §10 open items)

- [ ] Internship **firm / location / dates** filled in `content.ts`.
- [ ] Exact **music grade** wording confirmed.
- [ ] Final **hero line** + **How I think** prose (founder's voice).
- [ ] **Faith** values line / verse.
- [ ] **Contact email**.
- [ ] **Nexus Tracker** + **LinkedIn** link targets confirmed (the content test checks shape, not that they resolve — eyeball them).
- [ ] No `[DRAFT]` / `[confirm]` / `[FIRM…]` strings remain (grep `src/content/content.ts`).
