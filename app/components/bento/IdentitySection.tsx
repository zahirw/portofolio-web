"use client";

import type { Variants } from "motion/react";
import { profile } from "@/lib/data";
import { MapPinIcon } from "../icons";
import BentoCard from "./BentoCard";
import Cell from "./Cell";

// Identity — name + role + location. Its bottom edge curves up around
// the orb's top (notch-top); at desktop the deep arc eats the lower
// half, so the name block sits in the top zone.
export function IdentitySection({ variants }: { variants?: Variants }) {
  return (
    <Cell variants={variants} area="identity">
      <BentoCard className="notch-top items-center justify-center text-center desk:justify-start desk:pt-8">
        <p className="m-0 mb-1.5 inline-flex items-center justify-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent-strong">
          <MapPinIcon className="size-[1.15em]" />
          {profile.location}
        </p>
        <h1 className="m-0 bg-[linear-gradient(115deg,var(--color-fg)_25%,var(--color-accent)_75%,var(--color-accent-2)_105%)] bg-clip-text text-[clamp(2rem,6vw,3.4rem)] font-extrabold leading-[1.05] text-transparent">
          {profile.name}
        </h1>
        <p className="m-0 mt-2 text-[clamp(1rem,2.5vw,1.35rem)] font-semibold text-accent-strong">
          {profile.role}
        </p>
      </BentoCard>
    </Cell>
  );
}
