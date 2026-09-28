import type { Metadata } from "next";
import { content, portfolio, seo } from "@/content/content";
import { FloatingNav } from "@/components/FloatingNav";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { Philosophy } from "@/components/portfolio/Philosophy";
import { ProjectCase } from "@/components/portfolio/ProjectCase";
import { Talk } from "@/components/portfolio/Talk";
import { Elsewhere } from "@/components/portfolio/Elsewhere";
import { stripDraft } from "@/components/portfolio/DraftText";

const url = `${seo.siteUrl}/portfolio`;
const title = `${portfolio.seo.title} · ${content.name}`;

export const metadata: Metadata = {
  title: portfolio.seo.title,
  description: portfolio.seo.description,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "profile",
    url,
    siteName: content.name,
    title,
    description: portfolio.seo.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description: portfolio.seo.description },
};

/** The page as structured data: a collection of works by the same Person the
 *  root layout already describes, so search / answer engines tie them up. */
function PortfolioStructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#page`,
    url,
    name: title,
    description: portfolio.seo.description,
    about: { "@id": `${seo.siteUrl}/#folahan` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: portfolio.projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${url}#${p.key}`,
        item: {
          "@type": "CreativeWork",
          name: p.name,
          description: stripDraft(p.summary),
          creator: { "@id": `${seo.siteUrl}/#folahan` },
          ...(p.links[0] ? { sameAs: p.links[0].href } : {}),
        },
      })),
    },
  };
  return (
    <script
      type="application/ld+json"
      // structured data must be a raw script — the standard Next pattern
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function PortfolioPage() {
  return (
    <>
      <PortfolioStructuredData />
      <FloatingNav />
      <main>
        <PortfolioHero />
        <Philosophy />
        {portfolio.projects.map((p, i) => (
          <ProjectCase key={p.key} project={p} index={i} />
        ))}
        <Talk />
        <Elsewhere />
      </main>
    </>
  );
}
