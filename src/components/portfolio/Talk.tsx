import Image from "next/image";
import { portfolio } from "@/content/content";
import { findPublicImage } from "@/lib/public-assets";
import { Section } from "../Section";
import { Bet } from "./Bet";
import { DraftText, hasCopy } from "./DraftText";

/** The London workshop: the photo (the first image in public/portfolio/talk/,
 *  any filename), what happened, and the bet it was. Unfilled "[add: …]"
 *  fields simply don't render in prod. */
export function Talk() {
  const { talk, labels } = portfolio;
  const photo = findPublicImage(talk.image.dir);
  return (
    <div id={talk.key} className="anchor">
      <Section className="pf-case-section">
        <div className="pf-talk" data-photo={Boolean(photo)}>
          {photo && (
            // any photo size works: it fills a 4:3 frame (cropped to fit)
            <figure className="pf-talk-photo">
              <Image src={photo} alt={talk.image.alt} fill sizes="(max-width: 900px) 100vw, 55vw" />
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
