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

  // §3.3 The work — one question, four angles. EXACTLY 4 items (content.test enforces).
  work: [
    {
      key: "decision-intel",
      title: "Decision Intel",
      kindLabel: "the question as a company",
      body:
        "A reasoning-audit platform. It reads a high-stakes strategic memo and surfaces the cognitive biases, blind spots, and weak assumptions in the reasoning — before the decision gets made, not after the outcome punishes it. I built it because the most expensive mistakes I kept reading about weren’t failures of data; they were failures of thinking that no one checked.",
      href: "https://decision-intel.com",
      linkLabel: "decision-intel.com",
    },
    {
      key: "thesis-2008",
      title: "The cognitive roots of the 2008 crisis",
      kindLabel: "the question as research",
      body:
        "A published paper tracing the 2008 financial crisis to its cognitive roots — the biases, and the cortisol and testosterone feedback loops, that turned individually rational people into a collectively irrational market. It’s where the whole obsession started.",
      pdf: "/thesis.pdf",
      linkLabel: "Read the paper (PDF)",
    },
    {
      key: "finding-finance",
      title: "Finding Finance",
      kindLabel: "the question as teaching",
      body:
        "A student-led initiative I co-founded to teach younger students how money actually works — and, just as importantly, the psychology that quietly drives the decisions they’ll make about it.",
    },
    {
      key: "investment-internship",
      title: "Investment Analyst — [confirm: firm · location · dates]",
      kindLabel: "the question in practice",
      body:
        "The same lens, applied to live markets: building a portfolio-intelligence view that makes a fund’s exposure, its risk, and the real drivers of its returns legible at a glance — so the people making the calls can actually see what they’re deciding on.",
    },
  ] as WorkItem[],

  // §3.4 Who I am — the reveal
  whoIAm: {
    heading: "Who I am",
    paragraphs: [
      "I was born in the United States and raised between Lagos and the UK — Lagos is home. San Francisco is where I’m headed next.",
      "I’m sixteen — which I mention here, near the bottom, rather than at the top, because I’d rather the work spoke first.",
      "Away from the screen, I’ve played piano for twelve years: ABRSM Grade 6 piano, Grade 5 music theory with distinction, and Grade 6 guitar on the way. [confirm exact grade wording] Practising something for years before you’re any good at it turns out to be the same discipline everything else here needed.",
    ],
    // §3.4 faith — lightly present: ONE honest line. Yours to keep, cut, or reword.
    valuesLine:
      "I’m a Christian, and it’s the quiet foundation under all of this — the reason I care about building things that are honest, not only clever.",
  },

  // §3.5 quiet proof — understated
  proof: {
    // [confirm] check this against the signed i-Fitness review and use its exact words
    review:
      "Rated “Excellent” across quality of work, timekeeping, and competency in role — with, in the reviewer’s words, the curiosity and mindset for “a future career in finance and the business world.”",
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
