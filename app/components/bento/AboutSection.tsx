"use client";

import type { Variants } from "motion/react";
import { ArrowRightIcon, UserIcon } from "../icons";
import BentoCard from "./BentoCard";
import Cell from "./Cell";
import { CircuitTrace } from "./decor";

const ABOUT_TAGS = ["Fintech", "Blockchain", "Government"];

// About — tall left rail.
export function AboutSection({
  variants,
  onOpen,
}: {
  variants?: Variants;
  onOpen: () => void;
}) {
  return (
    <Cell variants={variants} area="about">
      <BentoCard onClick={onOpen} label="Open About details" className="gap-3">
        <span className="title-icon text-[2rem]" aria-hidden="true">
          <UserIcon />
        </span>
        <h2 className="m-0 text-[1.3rem] font-bold">About me</h2>
        <p className="m-0 text-[0.95rem] text-muted">
          7+ years crafting responsive, user-centric web &amp; mobile apps
          across fintech, blockchain &amp; government.
        </p>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {ABOUT_TAGS.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[0.75rem] text-accent-strong">
          Read bio
          <ArrowRightIcon className="size-[1.1em] transition-transform group-hover:translate-x-0.5" />
        </span>
        <CircuitTrace className="bottom-3 right-3 h-24 w-24 opacity-40" />
      </BentoCard>
    </Cell>
  );
}
