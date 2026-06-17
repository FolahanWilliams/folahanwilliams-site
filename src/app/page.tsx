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
