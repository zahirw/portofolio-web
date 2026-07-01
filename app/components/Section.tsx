import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionProps = {
  id: string;
  title: string;
  eyebrow?: string;
  icon?: ReactNode;
  children: ReactNode;
};

// Reused by every content section: anchor target + heading + consistent spacing.
// The heading fades/rises into view (Phase 3); each section reveals its own items.
export default function Section({ id, title, eyebrow, icon, children }: SectionProps) {
  return (
    <section id={id} className="section">
      <div className="container">
        <Reveal>
          <header className="section-head">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h2 className="section-title">
              {icon ? (
                <span className="section-title-icon" aria-hidden="true">
                  {icon}
                </span>
              ) : null}
              {title}
            </h2>
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
