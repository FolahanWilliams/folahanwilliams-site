"use client";

import { useRef, useState } from "react";
import { piano } from "@/content/content";

/** A small animated keyboard + an optional player. Drop public/piano.mp3 and
 *  rebuild: `hasAudio` (checked on the server) turns the play button on.
 *  Without the file there is no button at all, rather than a dead one. */
export function PianoTile({ hasAudio = false }: { hasAudio?: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [noAudio, setNoAudio] = useState(false);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
      return;
    }
    a.play()
      .then(() => setPlaying(true))
      .catch(() => setNoAudio(true));
  };

  // white keys at x = 0,30,...,180 ; black keys after C,D,F,G,A
  const whites = [0, 30, 60, 90, 120, 150, 180];
  const blacks = [21, 51, 111, 141, 171];

  return (
    <div>
      <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-clay)" }}>
        {piano.pieceLabel}
      </div>
      <h3 style={{ fontSize: "1.25rem", margin: "0.4rem 0 0.7rem" }}>{piano.heading}</h3>

      <svg viewBox="0 0 210 64" width="100%" style={{ maxWidth: 260, display: "block" }} aria-hidden>
        {whites.map((x) => (
          <rect key={x} x={x} y={0} width={30} height={64} rx={3} fill="var(--color-paper)" stroke="var(--color-line)" strokeWidth={1} />
        ))}
        {/* clay "notes" flashing across, like a phrase playing */}
        <rect className="piano-note piano-note-1" x={60} y={0} width={30} height={64} rx={3} fill="var(--color-clay)" />
        <rect className="piano-note piano-note-2" x={150} y={0} width={30} height={64} rx={3} fill="var(--color-clay)" />
        {blacks.map((x) => (
          <rect key={x} x={x} y={0} width={18} height={40} rx={2} fill="#211c17" />
        ))}
        <rect className="piano-note piano-note-3" x={51} y={0} width={18} height={40} rx={2} fill="var(--color-clay)" />
        <rect className="piano-note piano-note-4" x={141} y={0} width={18} height={40} rx={2} fill="var(--color-clay)" />
      </svg>

      <p style={{ margin: "0.9rem 0 0", color: "var(--color-ink-soft)", fontSize: "0.9rem", lineHeight: 1.55 }}>{piano.body}</p>

      {hasAudio && !noAudio && (
        <>
          <button
            onClick={toggle}
            aria-pressed={playing}
            style={{
              marginTop: "1rem",
              cursor: "pointer",
              borderRadius: 999,
              padding: "0.5rem 1rem",
              fontSize: "0.88rem",
              border: "1px solid var(--color-clay)",
              background: "transparent",
              color: "var(--color-clay)",
            }}
          >
            {playing ? "❚❚  Pause" : "▶  Play"}
          </button>

          {/* preload none: nothing downloads until someone presses play */}
          <audio
            ref={audioRef}
            src={piano.audio}
            preload="none"
            onEnded={() => setPlaying(false)}
            onError={() => setNoAudio(true)}
          />
        </>
      )}
    </div>
  );
}
