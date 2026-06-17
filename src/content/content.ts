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
