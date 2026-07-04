"use client";

import type { Variants } from "motion/react";
import { profile } from "@/lib/data";
import { MapPinIcon } from "../icons";
import BentoCard from "./BentoCard";
import Cell from "./Cell";

// Status — availability toggle. Live Jakarta local time is computed
// client-side by the parent (BentoGrid) so server/client markup matches
// on hydration; this component just renders whatever it's given.
export function StatusSection({
  variants,
  localTime,
}: {
  variants?: Variants;
  localTime: string;
}) {
  return (
    <Cell variants={variants} area="status">
      <BentoCard className="justify-between">
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted-2">
          Availability
        </span>
        <div className="flex items-center gap-1.5 font-mono text-[0.78rem] text-muted-2">
          <MapPinIcon className="size-[1.1em] text-accent-strong" />
          {localTime || "--:--"} WIB · {profile.location}
        </div>
        <div className="flex items-center gap-3">
          <span className="relative inline-flex h-7 w-12 items-center rounded-full bg-[linear-gradient(90deg,var(--color-accent),var(--color-accent-2))] p-1 shadow-inner">
            <span className="ml-auto size-5 rounded-full bg-white shadow" />
          </span>
          <span className="text-[0.92rem] font-semibold">Open to work</span>
        </div>
      </BentoCard>
    </Cell>
  );
}
