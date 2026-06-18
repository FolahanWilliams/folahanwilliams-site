import { FloatingNav } from "@/components/FloatingNav";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { ReasoningLab } from "@/components/ReasoningLab";
import { HowIThink } from "@/components/HowIThink";
import { Work } from "@/components/Work";
import { WhoIAm } from "@/components/WhoIAm";
import { QuietProof } from "@/components/QuietProof";
import { ReachMe } from "@/components/ReachMe";

export default function Home() {
  return (
    <>
      <FloatingNav />
      <main>
        <div id="top">
          <Hero />
        </div>

        <div id="lab" className="anchor">
          <Section>
            <ReasoningLab />
          </Section>
        </div>

        <HowIThink />

        <div id="work" className="anchor">
          <Work />
        </div>

        <div id="about" className="anchor">
          <WhoIAm />
        </div>

        <QuietProof />
        <ReachMe />
      </main>
    </>
  );
}
