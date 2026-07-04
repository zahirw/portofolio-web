"use client";

import type { Variants } from "motion/react";
import { profile } from "@/lib/data";
import BentoCard from "./BentoCard";
import Cell from "./Cell";

// Stat — years of experience.
export function StatSection({
  variants,
  onOpen,
}: {
  variants?: Variants;
  onOpen: () => void;
}) {
  return (
    <Cell variants={variants} area="stat">
      <BentoCard
        onClick={onOpen}
        label="Open About details"
        className="justify-center gap-4"
      >
        <div>
          <span className="text-[2.6rem] font-extrabold leading-none text-accent-strong">
            {profile.stats[0].value}
          </span>
          <span className="mt-1 block text-[0.9rem] text-muted">
            {profile.stats[0].label}
          </span>
        </div>
        <div className="flex gap-5 border-t border-white/10 pt-3">
          {profile.stats.slice(1).map((stat) => (
            <div key={stat.label}>
              <span className="text-[1.3rem] font-bold leading-none text-accent-strong">
                {stat.value}
              </span>
              <span className="mt-1 block font-mono text-[0.68rem] text-muted-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </BentoCard>
    </Cell>
  );
}
