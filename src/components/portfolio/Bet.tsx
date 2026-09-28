import { portfolio } from "@/content/content";
import { DraftText } from "./DraftText";

/** "The bet": the philosophy applied to one project. The worst case it could
 *  have cost me, beside the best case it could become. */
export function Bet({ bet }: { bet: { downside: string; upside: string } }) {
  const { labels } = portfolio;
  return (
    <div className="pf-bet" role="group" aria-label={labels.bet}>
      <div className="pf-bet-label">{labels.bet}</div>
      <div className="pf-bet-grid">
        <div className="pf-bet-side" data-side="down">
          <span className="pf-bet-k">
            <span aria-hidden>↓ </span>
            {labels.downside}
          </span>
          <p>
            <DraftText text={bet.downside} />
          </p>
        </div>
        <div className="pf-bet-side" data-side="up">
          <span className="pf-bet-k">
            <span aria-hidden>↑ </span>
            {labels.upside}
          </span>
          <p>
            <DraftText text={bet.upside} />
          </p>
        </div>
      </div>
    </div>
  );
}
