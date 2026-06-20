import { seo, content, experience, education } from "@/content/content";

// The published 2008 paper, pulled from the work list so its URL stays in sync.
const thesis = content.work.find((w) => w.key === "thesis-2008");

/**
 * JSON-LD structured data — the machine-readable layer that drives Google
 * Knowledge Panels and is parsed/cited by AI answer engines (ChatGPT,
 * Perplexity, Google AI Overviews). One @graph with the entities that matter:
 * the Person, the Organization (Decision Intel), the WebSite, and an FAQ.
 */
export function StructuredData() {
  const personId = `${seo.siteUrl}/#folahan`;
  const orgId = "https://decision-intel.com/#org";

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Person",
      "@id": personId,
      name: content.name,
      url: seo.siteUrl,
      image: `${seo.siteUrl}/headshot.jpg`,
      description: seo.description,
      jobTitle: seo.jobTitle,
      worksFor: { "@id": orgId },
      founder: { "@id": orgId },
      alumniOf: { "@type": "EducationalOrganization", name: education.school },
      knowsAbout: [...seo.knowsAbout],
      gender: "Male",
      email: `mailto:${content.contactEmail}`,
      nationality: { "@type": "Country", name: "United States" },
      birthPlace: { "@type": "Place", name: "United States" },
      homeLocation: { "@type": "Place", name: "London, United Kingdom" },
      sameAs: [...seo.sameAs],
    },
    {
      "@type": "Organization",
      "@id": orgId,
      name: "Decision Intel",
      url: "https://decision-intel.com",
      description:
        "A reasoning-audit platform that surfaces the cognitive biases and weak assumptions in high-stakes decisions before they are made.",
      founder: { "@id": personId },
    },
    {
      "@type": "WebSite",
      "@id": `${seo.siteUrl}/#website`,
      url: seo.siteUrl,
      name: "Folahan Williams",
      description: seo.description,
      about: { "@id": personId },
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${seo.siteUrl}/#profilepage`,
      url: seo.siteUrl,
      name: seo.title,
      mainEntity: { "@id": personId },
    },
    {
      "@type": "FAQPage",
      "@id": `${seo.siteUrl}/#faq`,
      mainEntity: seo.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  // The published research, as a standalone authored work that links back to
  // the Person. Concrete works are some of the strongest entity signals an
  // answer engine can cite ("What has Folahan Williams published?").
  if (thesis) {
    graph.push({
      "@type": "ScholarlyArticle",
      "@id": `${seo.siteUrl}/#thesis-2008`,
      headline: thesis.title,
      name: thesis.title,
      url: thesis.href,
      abstract: thesis.body,
      author: { "@id": personId },
      about: ["Behavioral economics", "Cognitive bias", "2008 financial crisis"],
      inLanguage: "en",
    });
  }

  // Surface the experience as concrete dated roles too (more entity signal).
  const personNode = graph[0] as Record<string, unknown>;
  personNode.hasOccupation = experience.map((r) => ({
    "@type": "Occupation",
    name: `${r.title}, ${r.org}`,
  }));

  const json = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      // structured data must be a raw script — this is the standard Next pattern
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
