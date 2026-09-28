/**
 * Renders portfolio copy that may contain "[add: …]" reminders for facts
 * still to fill in. In development they show as a highlighted note so they're
 * impossible to miss; in the production build they're removed entirely, so
 * an unfinished reminder can never ship to the live page.
 */
const MARKER = /\s*\[add:[^\]]*\]/g;
const IS_MARKER = /^\s*\[add:[^\]]*\]$/; // non-global: .test() keeps no state

export function DraftText({ text }: { text: string }) {
  if (process.env.NODE_ENV === "production") return <>{text.replace(MARKER, "").trim()}</>;

  const parts = text.split(/(\s*\[add:[^\]]*\])/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        IS_MARKER.test(part) ? (
          <mark key={i} className="pf-todo">
            {part.trim()}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/** Same rule for plain strings (metadata, structured data). */
export function stripDraft(text: string): string {
  return text.replace(MARKER, "").trim();
}

/** Whether a field has anything to show: in production a field that is only
 *  an "[add: …]" reminder renders nothing (no empty paragraph or label). */
export function hasCopy(text: string): boolean {
  return process.env.NODE_ENV === "production" ? stripDraft(text).length > 0 : text.trim().length > 0;
}
