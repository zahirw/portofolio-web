"use client";

import type { MotionValue, Variants } from "motion/react";
import Cell from "./Cell";
import PhotoOrb from "./PhotoOrb";

// Photo orb — frameless centerpiece floating in the well the three
// neighbouring cards curve around (desktop). No card surface.
export function OrbSection({
  variants,
  progress,
}: {
  variants?: Variants;
  progress: MotionValue<number>;
}) {
  return (
    <Cell variants={variants} area="orb">
      <div className="flex h-full w-full items-center justify-center">
        <PhotoOrb progress={progress} />
      </div>
    </Cell>
  );
}
