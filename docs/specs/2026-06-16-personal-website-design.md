# Folahan Williams — Personal Website · Design Spec

**Date:** 2026-06-16
**Status:** Approved design → ready for implementation planning
**Live target:** `folahanwilliams.vercel.app` (free Vercel subdomain; no paid domain)
**Repo:** new, separate from Decision Intel (`FolahanWilliams/folahanwilliams-site`)

---

## 1. Purpose

A personal website about Folahan — who he is, how his mind works, and everything he's built. One surface he can send when applying for **internships, opportunities, or to VCs**. It is a *portrait of a thinker* first and a portfolio second.

**The one thing a visitor should leave with:** *This is not a 16-year-old with a list of achievements — it's a mind that has been circling one big question about how people reason and decide, from four different angles, and the age makes it astonishing.*

### Audience

One site, usable for three uses (no separate variants):

- VCs / investors — founder substance + a coherent worldview.
- Internships / structured opportunities — demonstrated competence + credibility.
- General opportunities — a memorable, human portrait.

The site does not pander to any one; the work + the story do the persuading, and the contact section serves all three.

---

## 2. The spine (the organizing idea)

**Throughline:** *Everything I've built is about how people reason and decide.*

This is literally true across his work and is the device that makes the breadth read as one exceptional person rather than a scattered overachiever:

- The 2008-crisis thesis → the question as **research** (cognitive bias + the cortisol/testosterone feedback loop).
- Decision Intel → the question as **a company** (a reasoning-audit platform).
- Finding Finance → the question as **teaching** (finance *and* psychology to younger students).
- Investment Analyst internship → the question **in practice**.

**Weighting (explicit founder steer):** the *story* — him, his mind, how he thinks — carries **more weight than the project cards**. The portfolio is the *evidence* a real mind is behind the story, not the headline. Do not let the page tip into a product/projects wall.

---

## 3. Narrative & sections (single scrolling page)

Arc: **essence → how I think → the evidence → who I am (the reveal) → quiet proof → reach me.** Story brackets the work.

1. **Hero — essence, not résumé.**
   Name, headshot, one quiet line that *is* the throughline (e.g. *"I'm fascinated by how people think and decide — so I keep building things that put the answer under pressure."*). No age, no title-stacking. Generous air. One soft CTA: *Get in touch.*

2. **How I think — the heart of the site (heaviest section).**
   A few short paragraphs in Folahan's own voice (anchored to the metacognition talk): the obsession with reasoning, noise, and bias; how he actually sees problems; what he's curious about. Includes a pull-quote from the speech. This section is longer and more considered than the project cards — it is what makes a reader feel they've *met his mind*.

3. **The work — one question, explored four ways.**
   Framed as evidence of the throughline, not a portfolio wall. Four quiet pieces, each tied back to the same obsession:
   - **Decision Intel** (flagship) — what it *is* and *why* he built it. No named prospects, no valuation/exit talk (see §7).
   - **The 2008-crisis thesis** — links the public PDF.
   - **Finding Finance** — finance + psychology to younger students.
   - **Investment Analyst internship (current)** — *placeholder: firm, location, dates to confirm.*

4. **Who I am — the reveal.**
   The human lands here: born in the US, raised between **Lagos and the UK**, SF-bound. The **age ("I'm 16") arrives here**, after the mind and the work have already been taken seriously, so it recontextualizes rather than pre-frames. Breadth that signals discipline: **12 years at the piano**, ABRSM Grade 6 piano / Grade 5 Music Theory (Distinction) / Grade 6 guitar in progress (exact wording to confirm). Faith **lightly present** — a single honest values line, perhaps one verse, never a section. What drives him.

5. **Quiet proof.**
   Understated, not a logo wall: the i-Fitness "Excellent" review as a short quote; "a senior advisor who helped take Wiz to a $32B outcome" (unnamed); the verifiable credentials. Restraint reads as confidence.

6. **Reach me.**
   Warm close. Email (`mailto:`) + GitHub + LinkedIn + Decision Intel + Nexus Tracker; CV download; thesis PDF. One closing line echoing the throughline.

**Voice throughout:** warm, literary, unhurried — a person talking, not a brand selling. Anchored to the metacognition speech as the voice reference.

---

## 4. Look & feel

The feeling: *a beautifully-set personal essay that happens to also be a portfolio.* Deliberately nothing like Decision Intel's green/clinical product UI.

- **Palette:** soft warm **cream/paper** background; **warm near-black ink** text (never pure `#000`); one accent only — a **terracotta / warm clay (hint of gold)**, used sparingly (links, a rule, the CTA, the pull-quote mark). Earthy, quietly Lagos, distinct from DI green.
- **Type:** headlines in a warm literary **serif — Fraunces** (distinct from DI's Instrument Serif); body in a clean **humanist sans — default Inter** (swappable on the live preview if it reads too neutral against Fraunces), generous size + line-height. A real reading measure (~640–700px) for the prose sections.
- **Motion:** gentle fade-and-rise on section enter, smooth-scroll, soft hover transitions; nothing decorative; **`prefers-reduced-motion` fully respected**. Pacing slow and confident; whitespace does the work.
- **Layout:** single warm column, wide margins; headshot integrated softly (a real portrait, not a corporate avatar); the work shown as a few clean quiet cards, not a busy grid.

These are the starting direction; final tuning happens on the live preview.

---

## 5. Technical shape

- **Repo:** new, separate (`FolahanWilliams/folahanwilliams-site`). Keeps DI history clean.
- **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS 4. Static; one route (`/`). **No backend, no database, no auth.**
- **Content SSOT:** all copy, links, and credentials in one typed `content.ts` so text/links/credentials can be edited without touching layout (mirrors the founder's SSOT discipline). Each section is its own small, focused component.
- **Assets:** `public/` holds the headshot, thesis PDF, CV PDF. **Self-hosted fonts** (Fraunces + body sans) for speed + privacy.
- **Contact:** `mailto:` link for v1 (no backend, no spam surface). A real form is a future option, not v1.
- **Theme:** one warm light theme. **No dark mode** (scope creep for a personal site).
- **A11y / quality:** semantic HTML, strong contrast, reduced-motion, keyboard-friendly. A clean title/description + an **OG/social preview card** (name + throughline line — generate it *after* the final hero line is locked, since it reuses that copy) so the link previews beautifully.
- **Deploy:** new GitHub repo → connect Vercel → `folahanwilliams.vercel.app`.

### Proposed file structure

```
folahanwilliams-site/
  src/
    app/
      layout.tsx          # fonts, metadata, OG
      page.tsx            # composes the sections in order
      globals.css         # tokens (cream/ink/clay), type scale, base
    components/
      Hero.tsx
      HowIThink.tsx
      Work.tsx            # renders the four pieces from content
      WhoIAm.tsx
      QuietProof.tsx
      ReachMe.tsx
      Section.tsx         # shared section shell (measure, motion, spacing)
    content/
      content.ts          # SSOT: hero line, paragraphs, work[], credentials, links
  public/
    headshot.*            # provided
    thesis.pdf            # provided (public-OK)
    cv.pdf                # provided
    og.png                # generated
  docs/specs/             # this spec
```

---

## 6. Content inventory

**Have (provided / confirmed):**
- Headshot.
- 2008-crisis thesis PDF — shareable, OK to link publicly.
- Resume / CV.
- Metacognition speech — text (voice anchor + pull-quote source).
- Links: GitHub (`FolahanWilliams`), LinkedIn, Decision Intel (`decision-intel.com`), Nexus Tracker.
- i-Fitness "Excellent" review — usable as a quote.

**Confirm before publish (placeholders until then — do not guess):**
- Investment Analyst internship: **firm name, location, dates** (voice-captured ambiguously; verify).
- Music: exact ABRSM grade wording (piano Grade 6, Theory Grade 5 Distinction, guitar Grade 6 in progress).
- The hero throughline line (final wording) + the "How I think" paragraphs (draft → founder edit; must sound like him).
- The single faith values line / verse choice.
- Email address for the `mailto:`.

---

## 7. Confidentiality & honesty constraints (load-bearing)

The personal site inherits the same discipline as everything else Folahan ships:

- **No named prospects** (no "Sankore" or any active-conversation firm).
- **No valuation / exit math / fundraise arc** on this public surface.
- **Advisor referenced only as** "a senior advisor who helped take Wiz to a $32B outcome" — never named.
- **Only verifiable credentials.** Do **not** claim: PhD, prior exit, co-founder, or paying customers. Decision Intel is described honestly as a platform he has built (pre-revenue is not stated, but nothing implies traction it doesn't have).
- The metacognition speech is the voice reference; drafted prose must read as Folahan, then is founder-edited before publish.

---

## 8. Goals / non-goals

**Goals**
- A single, elegant, fast static page that makes a serious reader want to talk to him.
- Story/mind-forward; portfolio as evidence.
- Trivial to edit (content SSOT) and to keep current.

**Non-goals (YAGNI)**
- No CMS, no blog engine, no backend form (v1), no auth, no database.
- No dark mode.
- No multi-page site (single page for v1; can grow later).
- No analytics/marketing instrumentation in v1.

---

## 9. Verification

Static site — verification is light but real:

- `next build` passes; no type errors.
- Lighthouse: strong performance + a11y (target ≥95 each) on the deployed preview.
- `prefers-reduced-motion` disables the entrance motion (checked).
- All links resolve (GitHub / LinkedIn / DI / Nexus Tracker / CV / thesis); no dead hrefs.
- Renders cleanly mobile + desktop (single column reflows; headshot + cards stack).
- OG card previews correctly when the URL is shared.
- Final founder read-through of every line before publish (voice + credential accuracy).

---

## 10. Open items to resolve before "publish"

1. Internship firm / location / dates.
2. Exact music grade wording.
3. Final hero line + "How I think" prose (draft → founder edit).
4. Faith values line / verse.
5. Contact email.
6. Nexus Tracker link target (exact URL/handle — needed for the §9 "all links resolve" check; the other links are already known).
7. Repo name confirmation (`folahanwilliams-site` proposed).

These do not block building the structure + styling; they are the content fills before going live.
