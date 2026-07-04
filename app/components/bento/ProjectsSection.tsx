"use client";

import type { Variants } from "motion/react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { FolderIcon } from "../icons";
import BentoCard from "./BentoCard";
import Cell from "./Cell";

// Projects — featured work. Top-left edge curves around the orb's
// lower-right; content sits below the arc (desk:justify-end).
export function ProjectsSection({
  variants,
  onOpen,
}: {
  variants?: Variants;
  onOpen: () => void;
}) {
  return (
    <Cell variants={variants} area="projects">
      <BentoCard
        onClick={onOpen}
        label="Open Projects details"
        className="notch-bl gap-2 desk:justify-end"
      >
        <span className="title-icon text-[1.6rem]" aria-hidden="true">
          <FolderIcon />
        </span>
        <h2 className="m-0 text-[1.15rem] font-bold">Projects</h2>
        <p className="m-0 text-[0.8rem] text-muted">
          {projects.length} featured builds
        </p>
        {/* mt-auto pins thumbs to the bottom when stacked; at desktop the
            whole column is bottom-packed (justify-end) below the arc, so
            the auto margin would shove the title up into the cutout. */}
        <div className="mt-auto flex gap-2 pt-2 desk:mt-0">
          {projects.map((project) => (
            <span
              key={project.name}
              className="relative aspect-square w-full max-w-[3.2rem] overflow-hidden rounded-lg border border-white/10 bg-accent-soft"
            >
              <Image
                src={project.thumbnail}
                alt=""
                fill
                sizes="52px"
                className="object-cover"
              />
            </span>
          ))}
        </div>
      </BentoCard>
    </Cell>
  );
}
