// ─────────────────────────────────────────────────────────────────────
// SEO / AEO — the machine-readable layer. Update `siteUrl` the moment a
// custom domain (e.g. folahanwilliams.com) is connected; everything derives.
// ─────────────────────────────────────────────────────────────────────
export const seo = {
  // The canonical domain — everything (canonical URL, OG, JSON-LD, sitemap)
  // derives from this single source.
  siteUrl: "https://folahanwilliams.com",
  title: "Folahan Williams — Founder of Decision Intel",
  tagline: "16-year-old founder building AI that audits the reasoning behind decisions",
  description:
    "Folahan Williams is a 16-year-old founder and the creator of Decision Intel, an AI platform that audits the reasoning behind high-stakes decisions — pairing behavioral-economics research with full-stack execution.",
  keywords: [
    "Folahan Williams",
    "Folahan Williams founder",
    "Folahan Williams Decision Intel",
    "Decision Intel",
    "Decision Intel founder",
    "reasoning audit platform",
    "cognitive bias AI",
    "decision quality index",
    "behavioral economics founder",
    "young AI founder",
  ],
  // Authoritative profiles for entity resolution (sameAs). Add LinkedIn + X
  // once the exact URLs are known — keep only valid absolute URLs here.
  sameAs: ["https://github.com/FolahanWilliams", "https://decision-intel.com"],
  jobTitle: "Founder & CEO, Decision Intel",
  knowsAbout: [
    "Behavioral economics",
    "Decision quality",
    "Cognitive bias",
    "Artificial intelligence",
    "Behavioral finance",
    "Metacognition",
  ],
  alumniOf: "TASIS The American School in England",
  // Crawlable + cited by AI answer engines. Crisp, factual, quotable.
  faqs: [
    {
      q: "Who is Folahan Williams?",
      a: "Folahan Williams is a 16-year-old founder and the creator of Decision Intel, an AI platform that audits the reasoning behind high-stakes decisions. Born in the United States and raised between Lagos and the UK, he works at the intersection of behavioral economics, decision quality, and software.",
    },
    {
      q: "What is Decision Intel?",
      a: "Decision Intel is a reasoning-audit platform founded by Folahan Williams. It reads strategic memos and surfaces the cognitive biases and weak assumptions in the reasoning before a decision is made, grading decision quality on logic, evidence, and bias resistance.",
    },
    {
      q: "What is Folahan Williams known for?",
      a: "Founding Decision Intel; published research on the cognitive roots of the 2008 financial crisis; co-founding Finding Finance, a student-led financial-literacy initiative; and a TED-style talk on metacognition.",
    },
    {
      q: "How can I contact Folahan Williams?",
      a: "By email at folahanwilliams@gmail.com, or through the GitHub, LinkedIn, and Decision Intel links on his website.",
    },
  ],
} as const;

export interface WorkItem {
  key: string;
  title: string;
  kindLabel: string;   // the angle this piece explores the question from
  body: string;        // always visible
  detail?: string;     // revealed on hover/focus (the "expand")
  href?: string;       // external link (optional)
  linkLabel?: string;
  pdf?: string;        // /thesis.pdf etc (optional)
}

export interface LinkItem { label: string; href: string }

// ─────────────────────────────────────────────────────────────────────
// CONTENT SSOT.
// The prose below is a first DRAFT in your voice, grounded in real facts —
// edit it until it sounds unmistakably like you (the metacognition talk is the
// voice anchor). The only things left for you to FILL are marked `[confirm …]`:
//   · the internship firm / location / dates
//   · the exact ABRSM grade wording
//   · the verbatim line from the i-Fitness review
//   · the pull-quote (swap in a real line from your talk)
//   · your public contact email
//   · the LinkedIn + Nexus Tracker link targets
// Nothing here is invented; unknowns are flagged, not guessed.
// ─────────────────────────────────────────────────────────────────────

export const content = {
  name: "Folahan Williams",

  // §3.1 hero — the throughline, not a résumé line (no age here — it reveals later)
  heroLine:
    "I’m fascinated by how people reason and decide — so I keep building things that put the answer under pressure.",

  // §3.2 How I think (the heaviest section). Make this truly yours.
  howIThink: {
    heading: "How I think",
    paragraphs: [
      "The same question has followed me into everything I do: why do smart, well-resourced people get important decisions so wrong? I don’t think it’s a lack of intelligence. I think good reasoning has to be built and pressure-tested, not assumed — and most of the time, nobody does the building. The mistake is already in the thinking long before it shows up in the result.",
      "So I work the question from every side I can reach. I read the cognitive science and the market history. I write. I build software that audits the reasoning behind a decision before the outcome can punish it. And I teach it to people younger than me, because explaining something is the fastest way to find out whether you actually understand it. The thread isn’t finance, or psychology, or code — it’s the quality of the thinking underneath all three.",
    ],
    // [confirm] swap this for a real line from your metacognition talk
    pullQuote:
      "Most of us never audit our own thinking. We just trust it — and find out later whether we should have.",
  },

  // §3.3 The work — one question, every angle. (content.test enforces ≥4 valid items.)
  workIntro: {
    heading: "One question, every angle I can reach",
    subhead:
      "The same obsession — how people reason and decide — pursued as research, as companies I’ve built, as teaching, and on a live desk.",
  },
  work: [
    {
      key: "decision-intel",
      title: "Decision Intel",
      kindLabel: "the question, as a company",
      body:
        "A reasoning-audit platform. It reads a high-stakes strategic memo and surfaces the cognitive biases, blind spots, and weak assumptions in the reasoning — before the decision gets made, not after the outcome punishes it. I built it because the most expensive mistakes I kept reading about weren’t failures of data; they were failures of thinking that no one checked.",
      detail:
        "Under the hood: a 22-bias taxonomy, a multi-agent reasoning pipeline, and a Decision Quality Index that scores the thinking, not just the conclusion.",
      href: "https://decision-intel.com",
      linkLabel: "decision-intel.com",
    },
    {
      key: "sentinel",
      title: "Sentinel",
      kindLabel: "the question, as an autonomous system",
      body:
        "An autonomous market-intelligence platform built on a multi-agent AI architecture. It doesn’t just flag what moved — it argues why, runs every thesis past an adversarial “red team” agent that tries to tear it down, and calibrates its own confidence against its real track record. The same obsession as everything else here, turned on the market and on itself.",
      detail:
        "A 5-agent pipeline with self-critique and a closed learning loop; raw confidence is remapped to actual win-rates by isotonic regression, so “78%” genuinely means ~78%. A single-developer build of an intelligence pipeline usually found inside a quant fund.",
    },
    {
      key: "thesis-2008",
      title: "The cognitive roots of the 2008 crisis",
      kindLabel: "the question, as research",
      body:
        "A published paper tracing the 2008 financial crisis to its cognitive roots — the biases, and the cortisol and testosterone feedback loops, that turned individually rational people into a collectively irrational market. It’s where the whole obsession started.",
      detail:
        "It pairs the cognitive-bias literature with the endocrinology of risk-taking — the argument that the crash was as much physiological as financial.",
      pdf: "/thesis.pdf",
      linkLabel: "Read the paper (PDF)",
    },
    {
      key: "finding-finance",
      title: "Finding Finance",
      kindLabel: "the question, as teaching",
      body:
        "A student-led initiative I co-founded to teach younger students how money actually works — and, just as importantly, the psychology that quietly drives the decisions they’ll make about it.",
      detail:
        "Built and run with other students, because the fastest way to find out whether you understand something is to teach it to someone younger.",
    },
    {
      key: "investment-internship",
      title: "Investment Analyst — [confirm: firm · location · dates]",
      kindLabel: "the question, in practice",
      body:
        "The same lens, applied to live markets: building a portfolio-intelligence view that makes a fund’s exposure, its risk, and the real drivers of its returns legible at a glance — so the people making the calls can actually see what they’re deciding on.",
      detail:
        "A portfolio-intelligence dashboard — exposure, risk metrics, and performance attribution — assembled into one view a manager can act on.",
    },
  ] as WorkItem[],

  // §3.4 Who I am — the reveal
  whoIAm: {
    heading: "Who I am",
    paragraphs: [
      "I was born in the United States and raised between Lagos and the UK — Lagos is home. San Francisco is where I’m headed next.",
      "I’m sixteen — which I mention here, near the bottom, rather than at the top, because I’d rather the work spoke first.",
      "Away from the screen, I’ve played piano for twelve years: ABRSM Grade 6 piano, Grade 6 guitar, and Grade 5 music theory with distinction. Practising something for years before you’re any good at it turns out to be the same discipline everything else here needed.",
    ],
    // §3.4 faith — lightly present: ONE honest line. Yours to keep, cut, or reword.
    valuesLine:
      "I’m a Christian, and it’s the quiet foundation under all of this — the reason I care about building things that are honest, not only clever.",
  },

  // §3.5 quiet proof — understated
  proof: {
    review:
      "Rated “Excellent” across quality of work, timekeeping, work relationships, and competency in role during a finance internship — cited for math and communication, and for being receptive to feedback. Objectives signed off as fully met.",
    advisor:
      "Advised by a senior advisor who helped take Wiz to a $32B outcome.", // never named — §7
  },

  // §3.6 reach me
  // [confirm] this is your Gmail as a working default — swap it for whatever address
  // you actually want public (a personal site invites some spam to whatever you list).
  contactEmail: "folahanwilliams@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/FolahanWilliams" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/[confirm]" }, // [confirm target]
    { label: "Decision Intel", href: "https://decision-intel.com" },
    { label: "Nexus Tracker", href: "https://github.com/FolahanWilliams/nexus-tracker" }, // [confirm target]
  ] as LinkItem[],
  cv: "/cv.pdf",
} as const;

// ─────────────────────────────────────────────────────────────────────
// The signature interactive: a sound-looking decision you can take apart.
// Toggle the biases hiding inside the reasoning and watch the conviction —
// and a Decision-Quality score — come undone. This is Decision Intel in one
// tile. Edit the scenario here; the component is purely a renderer.
// ─────────────────────────────────────────────────────────────────────

export interface LabBias {
  id: string;
  label: string;
  flagsStep: string; // which step id it annotates
  note: string;      // the flaw it exposes
  penalty: number;   // points it knocks off the quality score
  rewrites: string;  // how it bends the verdict
}

export const reasoningLab = {
  eyebrow: "The reasoning lab",
  title: "Watch a sound decision fall apart",
  intro:
    "Here is a recommendation that looks airtight. Switch on the biases hiding inside it and watch the conviction — and the quality of the thinking — come undone. It is the thing I build, in miniature.",
  decision: "Acquire our largest competitor for $420M.",
  baseScore: 84,
  scoreFloor: 19,
  baseVerdict: "Proceed — high conviction.",
  floorVerdict: "Pause. The conviction was manufactured, not earned.",
  steps: [
    { id: "s1", text: "Their revenue is growing 40% a year." },
    { id: "s2", text: "$420M is in line with what the last three deals in the space paid." },
    { id: "s3", text: "Our team has closed six acquisitions — this is familiar ground." },
    { id: "s4", text: "If we walk, a rival buys them instead." },
  ],
  biases: [
    {
      id: "anchoring",
      label: "Anchoring",
      flagsStep: "s2",
      note: "“In line with the last three deals” anchors the price to what others paid — not to what the business is intrinsically worth.",
      penalty: 18,
      rewrites: "Proceed — but the price is borrowed from a number nobody verified.",
    },
    {
      id: "overconfidence",
      label: "Overconfidence",
      flagsStep: "s1",
      note: "40% growth is extrapolated straight out. No one asked what happens when it reverts toward the market’s mean.",
      penalty: 16,
      rewrites: "Proceed — but the upside rests on a trend that may already be ending.",
    },
    {
      id: "inside-view",
      label: "Inside view",
      flagsStep: "s3",
      note: "“We’ve done six” trusts the inside story over the base rate — most acquisitions this size miss their thesis.",
      penalty: 20,
      rewrites: "Proceed cautiously — experience is being used to skip the outside view.",
    },
    {
      id: "loss-aversion",
      label: "Loss aversion",
      flagsStep: "s4",
      note: "“A rival might buy them” is fear of a loss, not evidence of value. The threat is doing the persuading.",
      penalty: 14,
      rewrites: "The case for the deal is now mostly the fear of not doing it.",
    },
  ] as LabBias[],
  caption: "This is Decision Intel, in one tile — but it runs on real strategic memos, not a toy.",
};

// ── Live project-tile data (Stage 2) ──────────────────────────────────

// Decision Intel — a representative Decision Quality Index, animated in.
export const dqiDemo = { score: 72, label: "Decision Quality Index" };

// Sentinel — illustrative conviction feed (NOT real advice; the agents are
// named for the patterns they hunt). The "killed" row shows the red-team.
export interface SentinelSignal {
  agent: string;
  line: string;
  confidence: number; // 0 = killed by the red team
  killed?: boolean;
}
export const sentinelSignals: SentinelSignal[] = [
  { agent: "Overreaction", line: "A profitable name dragged down 14% in a sector selloff — on no company news.", confidence: 76 },
  { agent: "Catalyst", line: "A quiet supply deal the market hasn't priced into the multiple yet.", confidence: 71 },
  { agent: "Contagion", line: "A peer's fraud headline is bleeding into a clean balance sheet next door.", confidence: 68 },
  { agent: "Red team", line: "Thesis killed — the 'cheap' multiple is cheap because earnings are about to reset.", confidence: 0, killed: true },
];

// The 2008 crisis, through the cognitive-bias lens of the thesis. `drop` is the
// cumulative fall used to draw the descending line.
export interface CrisisEvent {
  date: string;
  label: string;
  detail: string;
  bias: string;
  drop: number; // 0–100, cumulative
}
export const crisisTimeline: CrisisEvent[] = [
  { date: "Feb 2007", label: "Subprime cracks", detail: "Early-payment defaults spike. The market treats it as contained.", bias: "Optimism — “housing never falls nationally.”", drop: 4 },
  { date: "Aug 2007", label: "BNP freezes funds", detail: "BNP Paribas halts withdrawals from three funds; liquidity seizes overnight.", bias: "Herding — everyone held the same trade, so everyone ran at once.", drop: 14 },
  { date: "Mar 2008", label: "Bear Stearns falls", detail: "Bear is sold to JPMorgan for $2 a share over a weekend.", bias: "Anchoring — risk was still priced off pre-crisis spreads.", drop: 34 },
  { date: "Sep 2008", label: "Lehman", detail: "Lehman files for bankruptcy and the system goes into cardiac arrest.", bias: "Overconfidence + cortisol — the desks that won biggest doubled down hardest.", drop: 78 },
];

// ── Stage 3: availability + piano ──────────────────────────────────────

// A "when I'm generally around" display — illustrative, editable, not a live
// calendar feed. grid[day][slot] = free?  (day rows · slot cols)
export const availability = {
  timezone: "London · GMT/BST",
  note: "When I'm generally reachable. Term keeps weekdays busy — evenings and weekends are best.",
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  slots: ["Morning", "Afternoon", "Evening"],
  grid: [
    [false, false, true],
    [false, false, true],
    [false, false, true],
    [false, false, true],
    [false, false, true],
    [true, true, true],
    [false, true, true],
  ] as boolean[][],
};

export const piano = {
  heading: "At the piano",
  body:
    "Twelve years in — ABRSM Grade 6 piano, Grade 5 theory with distinction, and Grade 6 guitar on the way. [confirm exact grades] Practising something for years before you’re any good at it turns out to be the same discipline everything else here needed.",
  // Drop a recording at public/piano.mp3 to light up the player.
  audio: "/piano.mp3",
  pieceLabel: "A piece I keep coming back to",
};

// ── The record (CV), favourite reading, and the bias taxonomy ──────────

export interface Role {
  org: string;
  title: string;
  when: string;
  line: string;
}
export const experience: Role[] = [
  {
    org: "Decision Intel",
    title: "Founder & CEO",
    when: "2025 — present",
    line: "Shipped the platform end-to-end, solo — web app, browser extension, and a multi-stage AI pipeline that audits 22 cognitive biases and grades a decision’s quality.",
  },
  {
    org: "i-Fitness Centre",
    title: "Finance Intern",
    when: "Jul – Aug 2025",
    line: "Inside the finance function through a growth phase — revenue, opex, EBITDA, budgeting, forecasting, and modelling.",
  },
  {
    org: "Finding Finance",
    title: "Co-Founder",
    when: "Ongoing",
    line: "Built a financial-literacy curriculum from scratch and teach it — translating behavioural-economics work into hands-on lessons for younger students.",
  },
];
export const education = { school: "TASIS, The American School in England", detail: "Honors Modern World History · behavioural-economics track", when: "Expected 2027" };
export const skills = [
  "Python", "LangGraph", "Gemini", "Prompt engineering", "Evaluation & calibration (Brier scoring)",
  "PostgreSQL", "Supabase", "Prisma", "REST APIs", "Chrome extensions", "D3.js",
  "Behavioural economics", "Decision-quality measurement",
];

export interface Book {
  title: string;
  author: string;
  why: string;
}
export const books: Book[] = [
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", why: "The two-system model everything I build rests on." },
  { title: "Noise", author: "Kahneman · Sibony · Sunstein", why: "Why two experts disagree — and why that variance is its own kind of error." },
  { title: "The Psychology of Money", author: "Morgan Housel", why: "Behaviour beats spreadsheets; money is a story we tell ourselves." },
  { title: "Dopamine Nation", author: "Anna Lembke", why: "The neuroscience of why the easy escape always wins in the moment." },
  { title: "Changing World Order", author: "Ray Dalio", why: "Cycles repeat because the people inside them forget the last one." },
];

export interface BiasChip {
  name: string;
  note: string;
}
export const biasTaxonomy: BiasChip[] = [
  { name: "Anchoring", note: "The first number you hear quietly sets every number after it." },
  { name: "Confirmation", note: "You go looking for the evidence you already believe." },
  { name: "Overconfidence", note: "Certainty that outruns the actual track record." },
  { name: "Sunk cost", note: "Throwing good money after bad to justify the bad." },
  { name: "Halo effect", note: "One impressive trait makes you trust all the others." },
  { name: "Herding", note: "Safety in numbers — until everyone runs for the same exit." },
  { name: "Loss aversion", note: "A loss hurts about twice as much as the same gain feels good." },
  { name: "Availability", note: "What comes to mind easily feels more likely than it is." },
  { name: "Optimism", note: "The plan assumes the best case and quietly prices out the rest." },
  { name: "Inside view", note: "Trusting your own story over what happened to everyone like you." },
  { name: "Narrative", note: "A clean story feels true even when the data is a mess." },
  { name: "Status quo", note: "Doing nothing feels safe even when it’s the riskiest option." },
];

// Floating-nav sections (anchor ids on the page).
export const navSections = [
  { id: "top", label: "Folahan" },
  { id: "lab", label: "The lab" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "reach", label: "Contact" },
] as const;
