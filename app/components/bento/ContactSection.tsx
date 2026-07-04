"use client";

import type { Variants } from "motion/react";
import { GitHubIcon, LinkedInIcon, SendIcon, UpworkIcon } from "../icons";
import BentoCard from "./BentoCard";
import Cell from "./Cell";

// Contact — CTA.
export function ContactSection({
  variants,
  onOpen,
}: {
  variants?: Variants;
  onOpen: () => void;
}) {
  return (
    <Cell variants={variants} area="contact">
      <BentoCard
        onClick={onOpen}
        label="Open Contact details"
        className="justify-center gap-2.5"
      >
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-accent-strong">
          Let&apos;s talk
        </span>
        <span className="inline-flex items-center gap-2 self-start rounded-full bg-[linear-gradient(90deg,var(--color-accent),var(--color-accent-2))] px-5 py-2.5 font-semibold text-white shadow-[0_12px_26px_-10px_rgba(74,158,255,0.55)] transition-transform group-hover:-translate-y-0.5">
          <SendIcon />
          Get in touch
        </span>
        <div
          className="flex gap-2 text-[1.05rem] text-accent-strong"
          aria-hidden="true"
        >
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <GitHubIcon />
          </span>
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <LinkedInIcon />
          </span>
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <UpworkIcon />
          </span>
        </div>
      </BentoCard>
    </Cell>
  );
}
