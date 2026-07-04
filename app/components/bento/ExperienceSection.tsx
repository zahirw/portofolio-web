"use client";

import type { Variants } from "motion/react";
import { experiences } from "@/lib/data";
import { ArrowRightIcon, BriefcaseIcon } from "../icons";
import BentoCard from "./BentoCard";
import Cell from "./Cell";

// Experience — tall right rail, listing every role.
export function ExperienceSection({
  variants,
  onOpen,
}: {
  variants?: Variants;
  onOpen: () => void;
}) {
  return (
    <Cell variants={variants} area="skills">
      <BentoCard
        onClick={onOpen}
        label="Open Experience details"
        className="gap-3"
      >
        <div className="flex items-center justify-between">
          <span className="title-icon text-[1.8rem]" aria-hidden="true">
            <BriefcaseIcon />
          </span>
          <ArrowRightIcon className="size-4 -rotate-45 text-accent-strong transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <h2 className="m-0 text-[1.3rem] font-bold">Experience</h2>
        <ul className="m-0 grid list-none gap-3 p-0">
          {experiences.map((job) => (
            <li key={job.company}>
              <p className="m-0 text-[0.9rem] font-semibold text-accent-strong">
                {job.role}
              </p>
              <p className="m-0 font-mono text-[0.7rem] text-muted-2">
                {job.company} · {job.start} – {job.end}
              </p>
            </li>
          ))}
        </ul>
        <span className="mt-auto font-mono text-[0.72rem] text-muted-2">
          {experiences.length} roles · tap to expand
        </span>
      </BentoCard>
    </Cell>
  );
}
