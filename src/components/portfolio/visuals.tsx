/**
 * On-brand illustrations for the portfolio case studies. Each is a plain,
 * static picture of what the real thing does (no fake metrics, no real
 * client data), so a non-engineer "gets" the project before reading a word.
 * Sentinel reuses the home page's SignalTicker instead of a new visual.
 */

/** Decision Intel: how one audit works, as four steps down a dashed spine. */
export function DecisionFlow() {
  return (
    <ol className="pf-flow" aria-label="How a Decision Intel audit works">
      <li>
        <span className="pf-flow-n" aria-hidden>1</span>
        <div>
          <div className="pf-flow-t">In: the investment memo</div>
          <div className="pf-flow-d">&ldquo;Buy the company for $750M. Growth continues, and the debt is manageable.&rdquo;</div>
        </div>
      </li>
      <li>
        <span className="pf-flow-n" aria-hidden>2</span>
        <div>
          <div className="pf-flow-t">Find what has to stay true</div>
          <div className="pf-flow-chips">
            <span>Growth holds</span>
            <span>Debt stays affordable</span>
            <span>No customer is too big</span>
          </div>
        </div>
      </li>
      <li>
        <span className="pf-flow-n" aria-hidden>3</span>
        <div>
          <div className="pf-flow-t">Check each one against 1,307 past deals</div>
          <div className="pf-flow-d">How did deals resting on the same assumptions turn out?</div>
        </div>
      </li>
      <li data-last="true">
        <span className="pf-flow-n" aria-hidden>4</span>
        <div>
          <div className="pf-flow-t">Out: the Decision Brief</div>
          <ul className="pf-flow-brief">
            <li data-tone="ok">Growth <span>covered</span></li>
            <li data-tone="bad">Debt terms <span>exposed</span></li>
            <li data-tone="warn">One big customer <span>flagged</span></li>
          </ul>
        </div>
      </li>
    </ol>
  );
}

/** Sankore: the one-screen layout as a sketch (the real screen holds the
 *  fund's own data, so no tickers or figures appear here). */
export function SankoreSketch() {
  const hold = [92, 74, 61, 48, 37];
  const expo = [38, -22, 16, -30, 9];
  const ret = [22, 58, 44, 80, 66];
  return (
    <div
      className="pf-sketch"
      role="img"
      aria-label="Sketch of the dashboard: panels for holdings, exposure, risk, and what drove returns, with alerts and a what-if tool underneath."
    >
      <div className="pf-sketch-bar">
        <span className="pf-sketch-dot" />
        <span className="pf-sketch-dot" />
        <span className="pf-sketch-dot" />
        <span className="pf-sketch-title">Portfolio Intelligence</span>
        <span className="pf-sketch-tabs">
          <span>MTD</span>
          <span data-on="true">YTD</span>
          <span>1Y</span>
        </span>
      </div>
      <div className="pf-sketch-grid">
        <div className="pf-sketch-tile">
          <div className="pf-sketch-label">What it holds</div>
          {hold.map((w, i) => (
            <div key={i} className="pf-sketch-row">
              <span style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
        <div className="pf-sketch-tile">
          <div className="pf-sketch-label">Exposure vs benchmark</div>
          {expo.map((w, i) => (
            <div key={i} className="pf-sketch-row pf-sketch-diverge">
              <span
                data-neg={w < 0}
                style={{ width: `${Math.abs(w)}%`, marginLeft: w < 0 ? `${50 - Math.abs(w)}%` : "50%" }}
              />
            </div>
          ))}
        </div>
        <div className="pf-sketch-tile">
          <div className="pf-sketch-label">Risk</div>
          <svg viewBox="0 0 120 44" width="100%" height="44" aria-hidden>
            <polyline
              points="0,30 12,26 24,31 36,20 48,24 60,14 72,19 84,10 96,16 108,8 120,12"
              fill="none"
              stroke="var(--color-clay)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <line x1="0" y1="36" x2="120" y2="36" stroke="var(--color-line)" strokeDasharray="3 4" />
          </svg>
        </div>
        <div className="pf-sketch-tile">
          <div className="pf-sketch-label">What drove returns</div>
          <div className="pf-sketch-cols">
            {ret.map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="pf-sketch-foot">
        <span className="pf-sketch-alert">Limit alerts</span>
        <span className="pf-sketch-chip">What if the market falls 10%?</span>
        <span className="pf-sketch-chip">Export PDF</span>
      </div>
    </div>
  );
}

/** Nexus / QuestFlow: a to-do list that plays like a game. */
export function QuestCard() {
  return (
    <div
      className="pf-quest"
      role="img"
      aria-label="Illustration of the app: a level and XP bar, three quests worth XP, a boss battle health bar, and a message from the AI coach."
    >
      <div className="pf-quest-top">
        <span>Level 12 · Strategist</span>
        <span>1,240 XP</span>
      </div>
      <div className="pf-meter">
        <span style={{ width: "68%" }} />
      </div>
      <ul className="pf-quest-list">
        <li data-done="true">
          <span className="pf-quest-box" />
          Piano practice, 30 min
          <span className="pf-quest-xp">+25 XP</span>
        </li>
        <li>
          <span className="pf-quest-box" />
          Finish the history essay
          <span className="pf-quest-xp">+40 XP</span>
        </li>
        <li>
          <span className="pf-quest-box" />
          Review 10 new words
          <span className="pf-quest-xp">+15 XP</span>
        </li>
      </ul>
      <div className="pf-boss">
        <div className="pf-boss-name">Boss battle · the Procrastination Demon</div>
        <div className="pf-meter pf-meter-boss">
          <span style={{ width: "35%" }} />
        </div>
      </div>
      <div className="pf-hoot">
        <b>Hoot</b> Two quests to your next level. Want me to plan tomorrow?
      </div>
    </div>
  );
}
