import Image from "next/image";
import { portfolio } from "@/content/content";
import { hasPublicFile } from "@/lib/public-assets";
import { Section } from "../Section";
import { Bet } from "./Bet";
import { DraftText, hasCopy } from "./DraftText";

/** The London workshop: the photo (once it's in public/), what happened, and
 *  the bet it was. Unfilled "[add: …]" fields simply don't render in prod. */
export function Talk() {
  const { talk, labels } = portfolio;
  const photo = hasPublicFile(talk.image.src);
  return (
    <div id={talk.key} className="anchor">
      <Section className="pf-case-section">
        <div className="pf-talk" data-photo={photo}>
          {photo && (
            <figure className="pf-talk-photo">
              <Image
                src={talk.image.src}
                width={talk.image.width}
                height={talk.image.height}
                alt={talk.image.alt}
                sizes="(max-width: 900px) 100vw, 55vw"
              />
            </figure>
          )}

          <div className="pf-talk-copy">
            <div className="eyebrow">
              {talk.eyebrow}
              {hasCopy(talk.when) && (
                <>
                  {" · "}
                  <DraftText text={talk.when} />
                </>
              )}
            </div>
            <h2 id="talk-title" className="pf-case-title">
              {talk.heading}
            </h2>
            {/* index keys: a text key would be serialised into the page
                payload, "[add: …]" reminders and all */}
            {talk.body.filter(hasCopy).map((p, i) => (
              <p key={i} className="pf-talk-p">
                <DraftText text={p} />
              </p>
            ))}
            {hasCopy(talk.learned) && (
              <div className="pf-q" style={{ marginTop: "1.2rem" }}>
                <h3>{labels.learned}</h3>
                <p>
                  <DraftText text={talk.learned} />
                </p>
              </div>
            )}
            <Bet bet={talk.bet} />
          </div>
        </div>
      </Section>
    </div>
  );
}
