// ─────────────────────────────────────────────────────────────────────
// SEO / AEO: the machine-readable layer. Update `siteUrl` the moment a
// custom domain (e.g. folahanwilliams.com) is connected; everything derives.
// ─────────────────────────────────────────────────────────────────────
export const seo = {
  // The canonical domain: everything (canonical URL, OG, JSON-LD, sitemap)
  // derives from this single source.
  siteUrl: "https://folahanwilliams.com",
  title: "Folahan Williams, Founder of Decision Intel",
  tagline: "16-year-old founder building AI that audits the reasoning behind decisions",
  description:
    "Folahan Williams is a 16-year-old founder and the creator of Decision Intel, an AI platform that audits the reasoning behind high-stakes decisions, pairing behavioral-economics research with full-stack execution.",
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
  // once the exact URLs are known. Keep only valid absolute URLs here.
  sameAs: [
    "https://github.com/FolahanWilliams",
    "https://www.linkedin.com/in/folahan-williams-13a7b03a2/",
    "https://decision-intel.com",
  ],
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
      a: "Founding Decision Intel; published research on the neuro-cognitive roots of the UK's 2008 banking crisis; co-founding Finding Finance, a student-led financial-literacy initiative; and a TED-style talk on metacognition.",
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
// The prose below is a first DRAFT in your voice, grounded in real facts.
// Edit it until it sounds unmistakably like you (the metacognition talk is the
// voice anchor). The only things left for you to FILL are marked `[confirm …]`:
//   · the internship firm / location / dates
//   · the verbatim line from the i-Fitness review
//   · the pull-quote (swap in a real line from your talk)
//   · your public contact email
//   · the Nexus Tracker link target
// Nothing here is invented; unknowns are flagged, not guessed.
// ─────────────────────────────────────────────────────────────────────

export const content = {
  name: "Folahan Williams",

  // §3.1 hero: clarity-first (a stranger should grok who/what in ~4 seconds).
  heroLine:
    "I’m fascinated by how people reason and decide, so I keep building things that put the answer under pressure.",
  // What I'm building right now: the orienting line (Marco-style "is building X").
  building: {
    product: "Decision Intel",
    href: "https://decision-intel.com",
    what: "AI that audits the reasoning behind your biggest decisions, and catches the blind spots before the committee does.",
  },
  heroIntro:
    "I’m 16, raised between Lagos and the UK. For the last few years I’ve chased one question: why do smart, well-resourced people get important calls so wrong? Everything below is me putting the answer under pressure, as a company, as research, as teaching.",

  // §3.2 How I think (the heaviest section). Make this truly yours.
  howIThink: {
    heading: "How I think",
    paragraphs: [
      "One question has followed me into everything: why do smart, well-resourced people get important decisions so wrong? I don’t think it’s a lack of intelligence. Good reasoning has to be built and pressure-tested, not assumed, and most of the time nobody does the building. The mistake is already in the thinking long before it shows up in the result.",
      "But I’m not content to just diagnose it. When I see a flawed way of reasoning, my instinct is to build the system that catches it, and ship it. Decision Intel and Sentinel are both that instinct made real: full products, built end-to-end and solo, put in front of real memos and real markets instead of left as ideas. I’d rather pressure-test a thing in the world than perfect it on paper.",
      "And that instinct isn’t tied to one place or one field. Raised between Lagos and the UK and headed for San Francisco, I think in global markets by default. The thread running through the company, the research, the teaching, and a live trading desk isn’t finance, or psychology, or code. It’s the quality of the thinking underneath all of them.",
    ],
    // [confirm] swap this for a real line from your metacognition talk
    pullQuote:
      "Most of us never audit our own thinking. We just trust it, and find out later whether we should have.",
  },

  // §3.3 The work: one question, every angle. (content.test enforces ≥4 valid items.)
  workIntro: {
    heading: "One question, every angle I can reach",
    subhead:
      "The same obsession, how people reason and decide, pursued as research, as companies I’ve built, as teaching, and on a live desk.",
  },
  work: [
    {
      key: "decision-intel",
      title: "Decision Intel",
      kindLabel: "the question, as a company",
      body:
        "A reasoning-audit platform. It reads a high-stakes strategic memo and surfaces the cognitive biases, blind spots, and weak assumptions in the reasoning before the decision gets made, not after the outcome punishes it. I built it because the most expensive mistakes I kept reading about weren’t failures of data; they were failures of thinking that no one checked.",
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
        "An autonomous market-intelligence platform built on a multi-agent AI architecture. It doesn’t just flag what moved, it argues why, runs every thesis past an adversarial “red team” agent that tries to tear it down, and calibrates its own confidence against its real track record. The same obsession as everything else here, turned on the market and on itself.",
      detail:
        "Five specialised agents (overreaction, contagion, catalyst, earnings guard, red team) feed a Think → Critique → Decide loop over 42 live news feeds. Raw confidence is remapped to real win-rates by isotonic regression, so “78%” genuinely means ~78%. A single-developer build of a pipeline usually found inside a quant fund.",
      href: "https://sentinel-nine-sable.vercel.app",
      linkLabel: "See Sentinel live",
    },
    {
      key: "thesis-2008",
      title: "The neuro-cognitive roots of the 2008 UK crisis",
      kindLabel: "the question, as research",
      body:
        "A published paper arguing the UK’s 2008 banking crisis (the run on Northern Rock, a full year before Lehman) was less a failure of maths than a failure of the human mind: bounded rationality, System 1 racing ahead of System 2, and the hormonal “Winner Effect” that biologically dials up a trader’s appetite for risk as the profits roll in. It’s where the whole obsession started.",
      detail:
        "It pairs the cognitive-bias literature with the endocrinology of risk-taking (Coates & Herbert’s London trading-floor study) to argue the crash was as much physiological as financial.",
      href: "https://docs.google.com/document/d/1-Q_aNPdfOi3rElRX6JjzmlMtXGKKKujeHwC1zwb3BQA/edit?usp=sharing",
      linkLabel: "Read the paper",
    },
    {
      key: "finding-finance",
      title: "Finding Finance",
      kindLabel: "the question, as teaching",
      body:
        "A student-led initiative I co-founded to teach younger students how money actually works, and just as importantly, the psychology that quietly drives the decisions they’ll make about it.",
      detail:
        "Built and run with other students, because the fastest way to find out whether you understand something is to teach it to someone younger.",
    },
    {
      key: "investment-internship",
      title: "Investment Analyst, Sankore",
      kindLabel: "the question, in practice",
      body:
        "The same lens, applied to live markets: building a portfolio-intelligence view that makes a fund’s exposure, its risk, and the real drivers of its returns legible at a glance, so the people making the calls can actually see what they’re deciding on.",
      detail:
        "A portfolio-intelligence dashboard: exposure, risk metrics, and performance attribution, assembled into one view a manager can act on.",
    },
  ] as WorkItem[],

  // §3.4 Who I am: the reveal
  whoIAm: {
    heading: "Who I am",
    paragraphs: [
      "I was born in the United States and raised between Lagos and the UK. Lagos is home. San Francisco is where I’m headed next.",
      "I’m sixteen, which I mention here, near the bottom, rather than at the top, because I’d rather the work spoke first.",
      "Away from the screen, I’ve played piano for twelve years: ABRSM Grade 6 piano, Grade 6 guitar, and Grade 5 music theory with distinction. Practising something for years before you’re any good at it turns out to be the same discipline everything else here needed.",
    ],
    // §3.4 faith: lightly present. ONE honest line. Yours to keep, cut, or reword.
    valuesLine:
      "I’m a Christian, and it’s the quiet foundation under all of this, the reason I care about building things that are honest, not only clever.",
  },

  // §3.5 quiet proof: understated
  proof: {
    review:
      "Rated “Excellent” across quality of work, timekeeping, work relationships, and competency in role during a finance internship, cited for math and communication, and for being receptive to feedback. Objectives signed off as fully met.",
  },

  // §3.6 reach me
  // [confirm] this is your Gmail as a working default; swap it for whatever address
  // you actually want public (a personal site invites some spam to whatever you list).
  contactEmail: "folahanwilliams@gmail.com",
  calendly: "https://calendly.com/folahanwilliams/30min",
  links: [
    { label: "GitHub", href: "https://github.com/FolahanWilliams" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/folahan-williams-13a7b03a2/" },
    { label: "Decision Intel", href: "https://decision-intel.com" },
  ] as LinkItem[],
  cv: "/cv.pdf",
} as const;

// ─────────────────────────────────────────────────────────────────────
// The hero wheel: six facets of the same obsession, as a radial menu.
// Each is a verb (the wheel label), a full title + line (shown in the centre
// on hover/focus), an in-page anchor, and a warm earth-tone. The FacetWheel
// component is purely a renderer; edit the world here.
// ─────────────────────────────────────────────────────────────────────
export interface Facet {
  verb: string;   // short label drawn on the wheel slice
  title: string;  // full name shown in the centre
  line: string;   // one line shown in the centre hub
  blurb: string;  // richer paragraph shown in the floating box below the wheel
  href: string;   // in-page anchor (or external)
  linkLabel: string;
  color: string;  // slice fill (white text sits on top)
}
export const facets: Facet[] = [
  {
    verb: "Build",
    title: "Decision Intel",
    line: "AI that audits the reasoning behind high-stakes decisions.",
    blurb: "My company. It reads a strategic memo, surfaces the cognitive biases and weak assumptions hiding in the reasoning before the decision is made, and grades its quality. Built end-to-end, solo.",
    href: "#lab",
    linkLabel: "See it work",
    color: "#b5532a",
  },
  {
    verb: "Ship",
    title: "Side builds",
    line: "Systems I ship in my spare time, usually solo, usually fast.",
    blurb: "Sentinel, an autonomous market-intelligence engine with a five-agent reasoning pipeline that runs live, plus whatever else I'm building. I'd rather ship a thing into the world than perfect it on paper.",
    href: "#work",
    linkLabel: "See the builds",
    color: "#c07f2f",
  },
  {
    verb: "Research",
    title: "Where it started",
    line: "A published paper on the cognitive roots of a financial crisis.",
    blurb: "A published paper arguing a banking crisis was a failure of the human mind, not the maths: bounded rationality, the hormonal Winner Effect, cortisol under stress. The obsession behind everything else started here.",
    href: "#work",
    linkLabel: "Read the research",
    color: "#6f7d4a",
  },
  {
    verb: "Teach",
    title: "Finding Finance",
    line: "Teaching younger students how money, and bias, really work.",
    blurb: "A student-led initiative I co-founded to teach younger students how money works, and the psychology that quietly drives the decisions they'll make about it. Explaining something is how I test that I actually understand it.",
    href: "#work",
    linkLabel: "More on this",
    color: "#3f7d62",
  },
  {
    verb: "Read",
    title: "What I'm reading",
    line: "Kahneman, Cialdini, Dalio: the shelf everything rests on.",
    blurb: "Kahneman, Cialdini, Dalio, Lembke. The behavioural-science and market-history shelf that the company, the research, and the way I think all rest on.",
    href: "#about",
    linkLabel: "See the shelf",
    color: "#a85a6b",
  },
  {
    verb: "Play",
    title: "At the piano",
    line: "Twelve years in. The same discipline as everything else here.",
    blurb: "Twelve years at the piano: Grade 6 piano, Grade 5 theory with distinction, Grade 6 guitar. Practising something for years before you're any good at it turns out to be the same discipline everything else here needed.",
    href: "#about",
    linkLabel: "More about me",
    color: "#9c6b3f",
  },
];

// ─────────────────────────────────────────────────────────────────────
// "How I think" viz: drill a confident decision down to its root. Each layer
// peels back toward where the real error lives: the assumption nobody checked.
// The deepest layer is the point of the whole section.
// ─────────────────────────────────────────────────────────────────────
export interface ThoughtLayer {
  depth: string; // where you are in the drill ("what everyone sees" … "the root")
  label: string; // the layer's name
  text: string;  // revealed when the layer is opened
}
export const thinkingLayers = {
  prompt: "A confident decision, drilled to its root. The expensive mistake is rarely at the surface.",
  layers: [
    { depth: "What everyone sees", label: "The outcome", text: "The acquisition lost $180M." },
    { depth: "One layer down", label: "The decision", text: "We bought our largest competitor for $420M." },
    { depth: "Deeper", label: "The reasoning", text: "Their 40% growth would hold, and the price matched the last three deals." },
    { depth: "The root", label: "The assumption nobody checked", text: "That the future would look like the recent past." },
  ] as ThoughtLayer[],
  payoff: "The mistake was already in the thinking, long before it showed up in the result.",
};

// ─────────────────────────────────────────────────────────────────────
// "The loop I run": the operating method behind the founder mindset. The
// same five-step cycle whether the thing is a company, a paper, or a
// classroom. Rendered as an animated ring; hover a node for how it's lived.
// ─────────────────────────────────────────────────────────────────────
export interface LoopNode {
  key: string;
  label: string;
  line: string;    // the principle
  example: string; // how it shows up in the real work
}
export const operatingLoop = {
  eyebrow: "The loop I run",
  caption: "The same cycle, whether the thing is a company, a paper, or a classroom.",
  nodes: [
    { key: "notice", label: "Notice", line: "Find where smart people reason badly, and no one is checking.", example: "The 2008 paper started here: a crisis everyone blamed on the maths was really a failure of minds." },
    { key: "build", label: "Build", line: "Turn the flaw into a system that catches it. End-to-end, usually solo.", example: "Decision Intel and Sentinel are both this step: full products, not prototypes." },
    { key: "ship", label: "Ship", line: "Put it in front of real people and real markets, fast. Shipped beats perfect.", example: "Sentinel runs live; Decision Intel audits real strategic memos." },
    { key: "test", label: "Pressure-test", line: "Let reality, and an adversary, try to break the thinking before it costs anything.", example: "Both run an adversarial red team against their own conclusions." },
    { key: "compound", label: "Compound", line: "Every outcome sharpens the next call. The loop itself is the edge.", example: "Calibration loops mean each call is a little more right next quarter than this one." },
  ] as LoopNode[],
};

// ─────────────────────────────────────────────────────────────────────
// A faithful Decision Intel product view, recreated from the real audit
// grammar (the 270° DQI arc + severity-banded finding cards, the actual
// 85/70/55/40 grade thresholds). The lab is the idea in one tile; this is
// what the shipped product actually looks like, on the same decision.
// ─────────────────────────────────────────────────────────────────────
export type Severity = "critical" | "high" | "medium" | "low";
export interface AuditFinding {
  eyebrow: string;
  title: string;
  severity: Severity;
  confidence: number; // 0–100
  excerpt: string;
}
export const productAudit = {
  eyebrow: "Decision Intel · the product",
  heading: "And here's the real thing",
  intro:
    "The lab above is the idea in one tile. This is the actual audit: the same engine, on a real strategic memo. A Decision Quality Index, then the biases it found in the reasoning.",
  memo: "Acquire our largest competitor for $420M.",
  score: 56,
  verdict: "Revise before the committee sees it.",
  findings: [
    { eyebrow: "Cognitive bias", title: "Anchoring", severity: "high", confidence: 84, excerpt: "$420M is in line with what the last three deals in the space paid." },
    { eyebrow: "Cognitive bias", title: "Inside-view dominance", severity: "critical", confidence: 79, excerpt: "Our team has closed six acquisitions, this is familiar ground." },
    { eyebrow: "Cognitive bias", title: "Overconfidence", severity: "medium", confidence: 73, excerpt: "Their revenue is growing 40% a year." },
  ] as AuditFinding[],
  footnote: "A representative audit. The real platform runs a multi-agent pipeline over a 22-bias taxonomy.",
};

// ─────────────────────────────────────────────────────────────────────
// The signature interactive: a sound-looking decision you can take apart.
// Toggle the biases hiding inside the reasoning and watch the conviction,
// and a Decision-Quality score, come undone. This is Decision Intel in one
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
  eyebrow: "Decision Intel · live",
  title: "Watch a sound decision fall apart",
  intro:
    "This is what Decision Intel does, in miniature. Here is a recommendation that looks airtight. Switch on the biases hiding inside it and watch the conviction, and the quality of the thinking, come undone.",
  decision: "Acquire our largest competitor for $420M.",
  baseScore: 84,
  scoreFloor: 19,
  baseVerdict: "Proceed, high conviction.",
  floorVerdict: "Pause. The conviction was manufactured, not earned.",
  steps: [
    { id: "s1", text: "Their revenue is growing 40% a year." },
    { id: "s2", text: "$420M is in line with what the last three deals in the space paid." },
    { id: "s3", text: "Our team has closed six acquisitions, this is familiar ground." },
    { id: "s4", text: "If we walk, a rival buys them instead." },
  ],
  biases: [
    {
      id: "anchoring",
      label: "Anchoring",
      flagsStep: "s2",
      note: "“In line with the last three deals” anchors the price to what others paid, not to what the business is intrinsically worth.",
      penalty: 18,
      rewrites: "Proceed, but the price is borrowed from a number nobody verified.",
    },
    {
      id: "overconfidence",
      label: "Overconfidence",
      flagsStep: "s1",
      note: "40% growth is extrapolated straight out. No one asked what happens when it reverts toward the market’s mean.",
      penalty: 16,
      rewrites: "Proceed, but the upside rests on a trend that may already be ending.",
    },
    {
      id: "inside-view",
      label: "Inside view",
      flagsStep: "s3",
      note: "“We’ve done six” trusts the inside story over the base rate; most acquisitions this size miss their thesis.",
      penalty: 20,
      rewrites: "Proceed cautiously; experience is being used to skip the outside view.",
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
  caption: "This is Decision Intel, in one tile, but it runs on real strategic memos, not a toy.",
};

// ── Live project-tile data (Stage 2) ──────────────────────────────────

// Decision Intel: a representative Decision Quality Index, animated in.
export const dqiDemo = { score: 72, label: "Decision Quality Index" };

// Sentinel: illustrative conviction feed (NOT real advice; the agents are
// named for the patterns they hunt). The "killed" row shows the red-team.
export interface SentinelSignal {
  agent: string;
  line: string;
  confidence: number; // 0 = killed by the red team
  killed?: boolean;
}
export const sentinelSignals: SentinelSignal[] = [
  { agent: "Overreaction", line: "A profitable name dragged down 14% in a sector selloff, on no company news.", confidence: 76 },
  { agent: "Catalyst", line: "A quiet supply deal the market hasn't priced into the multiple yet.", confidence: 71 },
  { agent: "Contagion", line: "A peer's fraud headline is bleeding into a clean balance sheet next door.", confidence: 68 },
  { agent: "Red team", line: "Thesis killed: the 'cheap' multiple is cheap because earnings are about to reset.", confidence: 0, killed: true },
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
  { date: "2004–06", label: "The wholesale bet", detail: "Northern Rock funds its mortgage book on short-term wholesale borrowing instead of deposits, chasing near-term profit over long-term stability.", bias: "Short-termism + bounded rationality: System 1 shortcuts skipping System 2 scrutiny.", drop: 7 },
  { date: "2005–07", label: "The Winner Effect", detail: "On London trading floors, winning trades raise testosterone and dopamine, biologically dialling up risk appetite and dulling the sense of danger (Coates & Herbert, 2008).", bias: "The Winner Effect: a hormonal feedback loop that quietly rewards more risk.", drop: 24 },
  { date: "Sep 2007", label: "The Northern Rock run", detail: "Wholesale funding freezes and depositors queue down the street: the first run on a British bank in 140 years, a full year before Lehman.", bias: "Herding + status-quo bias: everyone held the same trade, so everyone ran at once.", drop: 54 },
  { date: "2008", label: "Cortisol takes over", detail: "As the liquidity freeze bites, stress hormones impair the prefrontal cortex, the exact circuitry regulators needed for rational crisis decisions.", bias: "Overconfidence, then cortisol: faith in efficient markets, then brains too stressed to reason.", drop: 84 },
];

// ── Stage 3: availability + piano ──────────────────────────────────────

// A "when I'm generally around" display: illustrative, editable, not a live
// calendar feed. grid[day][slot] = free?  (day rows · slot cols)
export const availability = {
  timezone: "London · GMT/BST",
  note: "When I'm generally reachable. Term keeps weekdays busy; evenings and weekends are best.",
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
    "Twelve years in: ABRSM Grade 6 piano, Grade 5 theory with distinction. Practising something for years before you’re any good at it turns out to be the same discipline everything else here needed.",
  // Drop a recording at public/piano.mp3 to light up the player.
  audio: "/piano.mp3",
  pieceLabel: "A piece I keep coming back to",
};

export const guitar = {
  heading: "And the guitar",
  pieceLabel: "Six strings",
  body:
    "ABRSM Grade 6 guitar, picked up alongside the piano. A different instrument, but the same lesson: the boring reps you put in long before anyone hears you are the whole game.",
};

// [confirm] your real training split. Push-pull-legs is a sensible editable default.
export interface SplitDay {
  day: string;
  focus: "Push" | "Pull" | "Legs" | "Rest";
  note: string;
}
export const fitness = {
  eyebrow: "Outside the screen",
  heading: "In the gym",
  daysPerWeek: 6,
  body:
    "Six days a week, on a push-pull-legs split. It is the same kind of system as everything else here: small, repeatable, and built to run on the days I least feel like it. Discipline compounds.",
  split: [
    { day: "Mon", focus: "Push", note: "Chest, shoulders, triceps." },
    { day: "Tue", focus: "Pull", note: "Back, biceps, rear delts." },
    { day: "Wed", focus: "Legs", note: "Quads, hamstrings, calves." },
    { day: "Thu", focus: "Push", note: "Heavier pressing, lower volume." },
    { day: "Fri", focus: "Pull", note: "Rows, vertical pulls, arms." },
    { day: "Sat", focus: "Legs", note: "Posterior-chain focus." },
    { day: "Sun", focus: "Rest", note: "Recovery. The growth happens here." },
  ] as SplitDay[],
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
    when: "2025 – present",
    line: "Shipped the platform end-to-end, solo: a web app, a browser extension, and a multi-stage AI pipeline that audits 22 cognitive biases and grades a decision’s quality.",
  },
  {
    org: "i-Fitness Centre",
    title: "Finance Intern",
    when: "Jul – Aug 2025",
    line: "Inside the finance function through a growth phase: revenue, opex, EBITDA, budgeting, forecasting, and modelling.",
  },
  {
    org: "Finding Finance",
    title: "Co-Founder",
    when: "Ongoing",
    line: "Built a financial-literacy curriculum from scratch and teach it, translating behavioural-economics work into hands-on lessons for younger students.",
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
  { title: "Noise", author: "Kahneman · Sibony · Sunstein", why: "Why two experts disagree, and why that variance is its own kind of error." },
  { title: "Influence", author: "Robert Cialdini", why: "The six levers that move a decision before the reasoning ever gets a vote." },
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
  { name: "Herding", note: "Safety in numbers, until everyone runs for the same exit." },
  { name: "Loss aversion", note: "A loss hurts about twice as much as the same gain feels good." },
  { name: "Availability", note: "What comes to mind easily feels more likely than it is." },
  { name: "Optimism", note: "The plan assumes the best case and quietly prices out the rest." },
  { name: "Inside view", note: "Trusting your own story over what happened to everyone like you." },
  { name: "Narrative", note: "A clean story feels true even when the data is a mess." },
  { name: "Status quo", note: "Doing nothing feels safe even when it’s the riskiest option." },
];

// ─────────────────────────────────────────────────────────────────────
// The journey: born in the U.S., raised in Lagos, building from London.
// Rendered in the About bento as a looping flight along a great-circle route
// (the FlightTile is a pure renderer — geometry below, motion in globals.css).
// viewBox is 0 0 300 160; the plane flies `path`, pinging each stop on arrival.
// ─────────────────────────────────────────────────────────────────────
export interface JourneyStop { id: string; label: string; role: string; x: number; y: number }
export const journey = {
  eyebrow: "Where I’m from",
  heading: "The long way here",
  caption:
    "Born in the U.S., raised in Lagos, building from London — San Francisco next.",
  path: "M38,64 C70,28 118,70 150,120 C182,86 224,40 258,50",
  stops: [
    { id: "us", label: "U.S.", role: "born", x: 38, y: 64 },
    { id: "ng", label: "Lagos", role: "home", x: 150, y: 120 },
    { id: "uk", label: "London", role: "now", x: 258, y: 50 },
  ] as JourneyStop[],
};

// ─────────────────────────────────────────────────────────────────────
// "Get in touch", on-brand: the decision to reach out, run through the same
// reasoning audit as everything else here — except this one scores an A.
// The signal weights sum to the score (24+22+28+22 = 96). A wink, not a metric.
// ─────────────────────────────────────────────────────────────────────
export interface ReachSignal { label: string; weight: number }
export const reachAudit = {
  eyebrow: "One last audit",
  product: { label: "Decision Intel", href: "https://decision-intel.com" },
  memoTag: "Decision",
  memo: "Reach out to Folahan.",
  score: 96,
  verdict: "Proceed. High conviction.",
  signals: [
    { label: "Replies within a day", weight: 24 },
    { label: "Actually ships what he talks about", weight: 22 },
    { label: "A free 30-minute slot this week", weight: 28 },
    { label: "No pitch required", weight: 22 },
  ] as ReachSignal[],
  footnote: "The lowest-risk decision on this page.",
};

// ─────────────────────────────────────────────────────────────────────
// Faith: a quiet, honest panel — the foundation under the work, lightly held.
// The verse ties to the whole site's thread (don't lean on your own reasoning);
// [confirm] swap it for the verse that means the most to you.
// ─────────────────────────────────────────────────────────────────────
export const faith = {
  eyebrow: "The foundation",
  heading: "Faith",
  body:
    "I’m a Christian. It’s the quiet foundation under all of this — the reason I care about building things that are honest, not just clever, and the thing that keeps the work in proportion whether it’s going well or it isn’t.",
  verse: {
    text: "Trust in the Lord with all your heart, and lean not on your own understanding.",
    ref: "Proverbs 3:5",
  },
};

// Floating-nav sections (anchor ids on the home page). `short` is the label
// used on narrow phones so the whole pill fits without sideways scrolling.
export const navSections = [
  { id: "top", label: "Folahan", short: "Home" },
  { id: "lab", label: "Decision Intel", short: "DI" },
  { id: "work", label: "Work", short: "Work" },
  { id: "about", label: "About", short: "About" },
  { id: "reach", label: "Contact", short: "Contact" },
] as const;

// Separate pages in the same pill (after a hairline divider).
export const navPages = [
  { href: "/portfolio", label: "Portfolio", short: "Portfolio" },
] as const;

// ─────────────────────────────────────────────────────────────────────
// /portfolio: the proof-of-work page (the link for applications).
//
// WHO READS THIS: admissions readers at The Academy (and people like them).
// They weigh "proof of work" and "agency", read fast, and are not engineers,
// so every project answers the same four questions the application asks, in
// plain words: what I built, the hard part, what I learned, where it stands.
//
// ⚠ DRAFT COPY. The Academy's FAQ says: "Do not use AI to write for you;
// write your own story in your own words." Every sentence below is a
// fact-checked starting point (sources: the project repos + live sites),
// NOT final text. Rewrite each one in your own voice before you submit.
// Facts you still need to add are marked [add …].
//
// Order here = order on the page. Each `visual` picks an on-brand
// illustration; set `image` (a file in public/) to show a real screenshot.
// ─────────────────────────────────────────────────────────────────────
export interface PortfolioStat { value: string; label: string }
export type PortfolioVisual = "decision-intel" | "sentinel" | "sankore" | "nexus";
export interface PortfolioProject {
  key: string;          // anchor id: /portfolio#key
  kicker: string;       // what kind of thing this is
  name: string;
  aka?: string;         // a second name it goes by
  role: string;
  when: string;
  status: string;       // short, honest state: "Live", "Shipped", …
  summary: string;      // one plain sentence a non-engineer gets instantly
  built: string[];      // what I personally built
  hard: string;         // the hardest part, and what I did about it
  learned: string;      // what I learned
  result: string;       // where it stands: results, traction, honestly
  stats: PortfolioStat[];
  tools: string[];      // kept short and plain, shown quietly
  links: LinkItem[];
  visual: PortfolioVisual;
  visualCaption: string;
  image?: { src: string; alt: string };
  bet: { downside: string; upside: string }; // the asymmetric bet it was
}

export const portfolio = {
  seo: {
    title: "Portfolio",
    description:
      "How Folahan Williams thinks, and what he has built: Decision Intel, Sentinel, a portfolio dashboard for Sankore, Nexus, and an AI workshop for women in business in London. For each, what he built, the hard part, what he learned, and the bet he was making.",
  },
  eyebrow: "Portfolio",
  heading: "How I think, and what I’ve built",
  intro: [
    "I’m Folahan. I’m 16, I grew up between Lagos and the UK, and I finish school at TASIS in England in 2027.",
    "Most portfolios are a list of wins. I’d rather start with the one idea I use to decide what to work on, then show you the bets it led to: my startup, two projects I built for myself, a tool I built for a fund during my internship, and a workshop I taught in London.",
  ],
  howIBuild: {
    heading: "How I build",
    body:
      "Everything on this page I built solo: no co-founder, no team. I use AI coding tools (mostly Claude Code) for a lot of the typing, which is why Claude shows up on many of my GitHub commits. The parts that are mine: choosing what to build and who it’s for, writing the plans, making the calls when something breaks, and checking the result against reality.",
  },
  labels: {
    built: "What I built",
    hard: "The hard part",
    learned: "What I learned",
    result: "Where it stands",
    bet: "The bet",
    downside: "Worst case",
    upside: "Best case",
  },
  // The differentiator: not what I've done, but how I decide what to do.
  philosophy: {
    eyebrow: "The philosophy I live by",
    heading: "Capped downside, uncapped upside",
    source: { title: "Rule Breaker Investing", author: "David Gardner" },
    // The pull line. It's written from how I explain the idea, so it's shown as
    // a paraphrase of Gardner (no quote marks). If you swap in his exact words
    // from the book, set quoteIsParaphrase to false and it becomes a quotation.
    quote: "The worst a stock can do is go from 100 to zero. The best it can do has no ceiling.",
    quoteIsParaphrase: true,
    body: [
      "It comes from David Gardner’s Rule Breaker Investing, and it means the losses on your worst bets are capped while the gains on your best ones aren’t.",
      "I use the same maths outside the market. When an opportunity comes up, I look at two things: how bad the worst case really is, and whether the best case has a ceiling. When the downside is small and the upside is open-ended, I take it.",
      "I won’t win on accolades, and a list of them wouldn’t tell you much anyway. So under every project below, I’ve written down the bet I was making.",
    ],
    vision: {
      heading: "Where it points",
      body:
        "The thread through all of it is how people reason and decide. The biggest bet I’m making is Decision Intel: a world where no decision worth hundreds of millions gets made without someone checking the reasoning first.",
    },
    chart: {
      down: "Worst case: −100%. It stops at zero.",
      up: "Best case: no ceiling.",
    },
  },
  talk: {
    key: "talk",
    eyebrow: "Teaching · London",
    heading: "Teaching women in business to put AI to work",
    when: "[add: month and year]",
    body: [
      "I spoke at a women in tech event in London, where I taught a room of women how to apply AI and build it into their own businesses. [add: the event name, who organised it, and how many came]",
      "[add: what you covered and how you ran it, e.g. the tools, a live demo, what people built during the session]",
    ],
    learned:
      "[add: what teaching adults who run real businesses taught you]",
    bet: {
      downside: "An hour in front of a room of adults who run their own businesses, as the youngest person there.",
      upside: "Every person in that room leaving with AI working inside their business.",
    },
    // Upload the photo into public/portfolio/talk/ with ANY filename (.jpg,
    // .jpeg, .png, .webp): the first image in that folder is shown, and nothing
    // renders until one is there. Turn off location when you export/share it,
    // since the original file is public.
    image: {
      dir: "portfolio/talk",
      alt: "Folahan giving a thumbs up at the front of a London classroom, with the women from his AI workshop smiling and waving behind him.",
    },
  },
  projects: [
    {
      key: "decision-intel",
      kicker: "My startup",
      name: "Decision Intel",
      role: "Founder, building it solo",
      when: "2025 – now",
      status: "Live",
      summary:
        "Software that checks the reasoning behind a big investment decision before the money is committed.",
      built: [
        "The whole product, end to end: the website, the app investment teams use, and a Chrome extension.",
        "The engine that reads an investment memo, pulls out every assumption the deal depends on, and checks each one against how similar past deals turned out.",
        "A library of 1,307 public merger filings to compare every deal against.",
        "34 automatic checks for structural weak spots, like how a deal is financed or how much rides on a single customer.",
      ],
      hard:
        "Proving it works. If you test an AI on deals that already happened, it may already ‘know’ how they ended, so a good score can be fake. So the engine reads each memo outcome-blind, using only what was known on the day of the decision, and every audit is time-stamped and sealed so it can be checked later.",
      learned:
        "I first aimed it at people buying small businesses. Then I sat in a meeting with one and saw that their whole decision was a single table of numbers, with almost nothing for the product to check. The product wasn’t the problem; the customer was too small for it. So I moved to private-equity firms deciding on $500M to $1B buyouts, where the reasoning is written down in detail and one mistake costs hundreds of millions.",
      result:
        "Live at decision-intel.com. The way in for a firm is a retrospective audit: they give me a deal they’ve already closed, the engine reads it without knowing the outcome, and they grade it against what actually happened. [add: audits run, firms trialling it, anything you can share]",
      stats: [
        { value: "1,307", label: "past merger filings it compares against" },
        { value: "34", label: "automatic checks on every deal" },
        { value: "Solo", label: "from first idea to live product" },
      ],
      tools: ["Next.js", "TypeScript", "PostgreSQL", "Gemini and Claude", "Stripe"],
      links: [{ label: "Visit decision-intel.com", href: "https://decision-intel.com" }],
      visual: "decision-intel",
      visualCaption: "How an audit works, simplified.",
      bet: {
        downside: "My evenings and weekends, if no firm ever buys it. Even then, I’d know how the biggest investment decisions really get made.",
        upside: "Becoming the standard check on the reasoning before money is committed to deals worth hundreds of millions.",
      },
    },
    {
      key: "sentinel",
      kicker: "Personal project",
      name: "Sentinel",
      role: "Solo build",
      when: "Mar – Jun 2026",
      status: "Live · paper money only",
      summary:
        "An AI system that reads the financial news all day, spots when the market has overreacted, and argues with itself before it flags anything.",
      built: [
        "A pipeline that reads 42 news feeds plus Reddit, and pulls out the events that could move a stock.",
        "Five AI ‘analysts’, each hunting one pattern: panic overreactions, healthy companies dragged down by a sector sell-off, good news the market hasn’t priced in, and earnings risk.",
        "A red-team analyst whose only job is to tear down every idea before it reaches me.",
        "A tracker that checks every call after 1, 5, 10 and 30 days and feeds the results back in.",
      ],
      hard:
        "Getting the AI to be honest about how sure it is. Models say ‘80% confident’ about almost everything. So Sentinel keeps score of its own past calls and re-maps its confidence to how often it has actually been right: when it says 78%, it has been right about 78% of the time on calls like that.",
      learned:
        "Feeling confident and being right are different things, for software and for people. It’s the same idea my paper on the 2008 crisis started from, and it’s at the centre of Decision Intel.",
      result:
        "Live, trading paper money only through a broker’s practice account, never real money. The two ideas that mattered most, arguing against itself and keeping score, also run through Decision Intel.",
      stats: [
        { value: "42", label: "news feeds read around the clock" },
        { value: "5", label: "AI analysts, one of them a red team" },
        { value: "4", label: "check-ins on every call: 1, 5, 10, 30 days" },
      ],
      tools: ["React", "TypeScript", "Supabase", "Gemini"],
      links: [
        { label: "See it live", href: "https://sentinel-nine-sable.vercel.app" },
        { label: "Code on GitHub", href: "https://github.com/FolahanWilliams/Sentinel" },
      ],
      visual: "sentinel",
      visualCaption: "An illustrative feed, not advice. The last idea gets killed by the red team.",
      bet: {
        downside: "Paper money only, so the worst it could cost me was time.",
        upside: "A system that knows how often it’s actually right, an idea that became part of Decision Intel.",
      },
    },
    {
      key: "sankore",
      kicker: "Internship work · Sankore",
      name: "Portfolio Intelligence Dashboard",
      role: "Investment Analyst Intern · built it solo",
      when: "Summer 2026 · a three-week build",
      status: "Shipped",
      summary:
        "One screen that shows a fund manager what the fund owns, how much risk it’s carrying, and what drove its returns, instead of rebuilding that by hand in spreadsheets.",
      built: [
        "The whole tool, solo, in three weeks: the engine that does the fund maths and the screen the portfolio manager uses.",
        "Four views on one page: what the fund holds, its exposure by sector and region, its risk, and where its returns came from compared with its benchmark.",
        "The stretch goals too: alerts when the fund breaks one of its own limits, a ‘what if’ tool that shocks the market and re-prices the fund instantly, and one-click PDF export.",
        "Tests that recompute the key numbers a second, independent way and check they match to within 0.1%.",
      ],
      hard:
        "The real data was a single day’s snapshot, and you can’t measure things like volatility from one day of prices. Rather than show numbers that looked right but weren’t, I made the dashboard notice when it only has one day, switch to the measures that are honest with that data, and label which panels fill in once more history is collected.",
      learned:
        "Build for the person who has to use it every morning. I kept all the fund maths separate from the screen, so the firm can plug in live data later without rewriting anything, and I mapped how every piece fits together in week one, before writing the code.",
      result:
        "Shipped the core dashboard and every stretch goal within the three weeks. [add: what happened next, e.g. who uses it or what the team said]",
      stats: [
        { value: "3 weeks", label: "from a blank page to shipped" },
        { value: "0.1%", label: "every key number double-checked to" },
        { value: "1", label: "screen instead of a pile of spreadsheets" },
      ],
      tools: ["Python", "pandas", "FastAPI", "React", "TypeScript"],
      links: [],
      visual: "sankore",
      visualCaption: "A sketch of the layout. The real screen shows the fund’s own data, so it stays private.",
      bet: {
        downside: "Three weeks of an internship spent building instead of just reporting.",
        upside: "A tool the fund can keep using after I’ve gone, instead of one more summer of spreadsheets.",
      },
    },
    {
      key: "nexus",
      kicker: "Personal project",
      name: "Nexus",
      aka: "the app is called QuestFlow",
      role: "Solo build",
      when: "Feb – Jul 2026",
      status: "Open source",
      summary:
        "A productivity app that turns your to-do list into a role-playing game, with an AI coach that can actually do things for you.",
      built: [
        "The game: tasks become quests that earn XP and gold, with character classes, a skill tree, and boss battles against things like the Procrastination Demon.",
        "Hoot, an AI coach you can talk to that can take 12 real actions in the app, like adding tasks, setting goals or planning your week.",
        "A vocabulary trainer that uses spaced repetition, plus exercises for arguing, summarising and speaking.",
        "Accounts, paid subscriptions, and an offline mode so it still works on a phone with no signal.",
      ],
      hard:
        "Making it work offline. Everything saves to the device first, so the app opens instantly and keeps working with no connection, then syncs to your account once you’re back online.",
      learned:
        "Most productivity apps treat motivation as the user’s problem. I started treating it as a design problem: small rewards right now, progress you can see over months, and an app that notices when you’re starting to burn out.",
      result:
        "The full code is public on GitHub. [add: whether people use it, and how many]",
      stats: [
        { value: "20", label: "screens, from quests to a map of what you’ve learned" },
        { value: "12", label: "actions the AI coach can take for you" },
        { value: "5", label: "character classes to level up" },
      ],
      tools: ["Next.js", "TypeScript", "Supabase", "Gemini", "Stripe"],
      links: [{ label: "Code on GitHub", href: "https://github.com/FolahanWilliams/nexus-tracker" }],
      visual: "nexus",
      visualCaption: "Illustrative, built from the app’s real features.",
      bet: {
        downside: "A few months of spare time on an app nobody else ends up using.",
        upside: "Habits that feel like a game people actually want to keep playing.",
      },
    },
  ] as PortfolioProject[],
  // "Also include links to any other online work" (the application's words).
  elsewhere: {
    heading: "Everything else",
    intro: "The rest of my work, and the quickest ways to reach me.",
  },
  closing: {
    heading: "There’s more on the main page",
    body: "How I think, the research that started all of this, and the life around the work: piano, guitar, the gym, and faith.",
    cta: "Back to the main page",
  },
};
