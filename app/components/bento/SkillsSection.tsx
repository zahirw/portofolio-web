"use client";

import type { MotionValue, Variants } from "motion/react";
import { LayersIcon, ResetIcon } from "../icons";
import BentoCard from "./BentoCard";
import Cell from "./Cell";
import { CircuitTrace } from "./decor";
import { FloatingSkills } from "./FloatingSkills";

// Skills — compact slot beside the orb. Heading sits top-left (clear of
// the orb, which notches the top-right); the chips fill below it.
export function SkillsSection({
  variants,
  progress,
  resetKey,
  onReset,
  onOpen,
}: {
  variants?: Variants;
  progress: MotionValue<number>;
  resetKey: number;
  onReset: () => void;
  onOpen: () => void;
}) {
  return (
    <Cell variants={variants} area="exp">
      {/* Relative wrapper so the reset button can sit as a sibling overlay
          — it must NOT nest inside the card's <button> (invalid, and its
          click would open the modal). */}
      <div className="relative h-full">
        <BentoCard
          onClick={onOpen}
          label="Open Skills details"
          className="notch-br gap-2 min-h-[210px] desk:min-h-0"
        >
          {/* Skill chips: a neat row at the bottom while idle, bouncing
              around the box (DVD-logo style) while the orb gauge is held,
              then dropping into an irregular pile on release. Decorative
              layer behind the heading; pointer-events-none so the card
              click still opens the modal. */}
          <FloatingSkills progress={progress} resetKey={resetKey} />
          <span
            className="title-icon relative z-10 text-[1.6rem]"
            aria-hidden="true"
          >
            <LayersIcon />
          </span>
          <h2 className="relative z-10 m-0 text-[1.15rem] font-bold">
            Skills
          </h2>
          <p className="relative z-10 m-0 font-mono text-[0.72rem] text-muted-2">
            20+ technologies
          </p>
          <CircuitTrace className="bottom-2 right-2 h-16 w-16 opacity-30" />
        </BentoCard>
        <button
          type="button"
          onClick={onReset}
          aria-label="Reset skills layout"
          title="Reset skills"
          className="absolute bottom-2 right-2 z-30 inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-black/25 text-[0.85rem] text-muted-2 backdrop-blur-sm transition hover:border-accent/40 hover:bg-black/40 hover:text-accent-strong focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <ResetIcon />
        </button>
      </div>
    </Cell>
  );
}
