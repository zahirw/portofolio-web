"use client";

import Image from "next/image";
import { profile } from "@/lib/data";

// Rotating mono "tech" string that circles the portrait (the reference's globe
// analog). Repeated so it wraps the full ring with no visible seam.
const RING_TEXT = " FRONTEND · REACT · NEXT.JS · TYPESCRIPT · VUE · 01001010 ·";

export default function PhotoOrb() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center desk:w-(--orb-d) desk:max-w-(--orb-d)">
      {/* Blue → violet glow behind the orb. */}
      <div
        aria-hidden="true"
        className="glow absolute inset-[-8%] -z-10 rounded-full opacity-80 blur-2xl"
      />

      {/* Rotating ring of mono text. */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full animate-ring-spin text-accent-strong motion-reduce:animate-none"
        aria-hidden="true"
      >
        <defs>
          <path
            id="orb-ring-path"
            d="M100,100 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0"
          />
        </defs>
        <text className="fill-current font-mono" fontSize="8.5" letterSpacing="2">
          <textPath href="#orb-ring-path" startOffset="0">
            {RING_TEXT.repeat(3)}
          </textPath>
        </text>
      </svg>

      {/* Dashed violet scan ring, slowly counter-rotating. */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-[6%] h-[88%] w-[88%] animate-ring-spin-rev text-accent-2 motion-reduce:animate-none"
        aria-hidden="true"
      >
        <circle
          cx="100"
          cy="100"
          r="94"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 10"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>

      {/* Portrait. */}
      <div className="relative aspect-square w-[70%] overflow-hidden rounded-full border border-white/70 bg-white/40 p-1.5 shadow-[0_22px_55px_-18px_rgba(23,54,106,0.55)]">
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <Image
            src={profile.photo}
            alt={`${profile.name} — ${profile.role}`}
            fill
            priority
            sizes="(min-width: 960px) 300px, 240px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
