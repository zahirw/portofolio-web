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
    <section id={id} className="py-18">
      <div className="mx-auto w-full max-w-[65rem] px-6">
        <Reveal>
          <header className="mb-9">
            {eyebrow ? (
              <p className="font-mono uppercase tracking-[0.14em] text-[0.72rem] text-accent-strong m-0 mb-3">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="text-[clamp(1.75rem,4vw,2.4rem)] relative inline-flex items-center gap-[0.65rem] pb-[0.6rem] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-[3px] after:rounded-sm after:bg-[linear-gradient(90deg,var(--color-accent),transparent)]">
              {icon ? (
                <span className="title-icon" aria-hidden="true">
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
