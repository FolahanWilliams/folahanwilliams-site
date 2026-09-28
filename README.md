# folahanwilliams.com — personal site

Static personal website: the home page (`/`) and the proof-of-work portfolio (`/portfolio`). Next.js (App Router) + Tailwind 4, deployed on Vercel.

- All copy/links live in `src/content/content.ts` (edit there, not in components).
- Portfolio copy is the `portfolio` export there. `[add: …]` notes are highlighted in `npm run dev` and stripped from production builds.
- Optional assets light up when dropped into `public/`: `headshot.jpg`, `piano.mp3`, `portfolio/women-in-tech-london.jpg`.
- `npm run dev` · `npm run build` · `npm test`
- Design spec: `docs/specs/2026-06-16-personal-website-design.md`
