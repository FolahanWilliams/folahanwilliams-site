import { Reveal } from "./Reveal";

export function Section({
  children,
  measure = false,
  className = "",
}: {
  children: React.ReactNode;
  measure?: boolean; // constrain to reading width for prose sections
  className?: string;
}) {
  return (
    <section className={className} style={{ padding: "clamp(3.5rem, 9vw, 7rem) 1.5rem" }}>
      <div style={{ maxWidth: measure ? "var(--measure)" : "75rem", margin: "0 auto" }}>
        <Reveal>{children}</Reveal>
      </div>
    </section>
  );
}
