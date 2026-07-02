"use client";

import { useId } from "react";
import {
  motion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

/*
 * Speedometer-style HUD gauge nested between the two dashed dot rings
 * (r=83 / r=94 in the 200×200 viewBox): a 270° arc with its gap at the
 * bottom, chopped into chunky segments. The bright fill is revealed by a
 * mask whose solid arc follows the charge progress — track and fill are
 * byte-identical paths, so segments never shift as the gauge fills.
 */
const ARC = "M 37.42 162.58 A 88.5 88.5 0 1 1 162.58 162.58"; // r=88.5, 135°→45° clockwise
const SEGMENTS = 24;
const DASH = 8;
const GAP = 3;
/* Drop the trailing gap so the last dash lands flush on the path end —
   both terminals of the arc are segments, not gaps. */
const PATH_LEN = SEGMENTS * (DASH + GAP) - GAP;
/* true → segments pop on one-by-one (the game-HUD look); false → smooth sweep. */
const QUANTIZED = false;

const SEGMENT_STROKE = {
  pathLength: PATH_LEN,
  fill: "none",
  strokeWidth: 5,
  strokeDasharray: `${DASH} ${GAP}`,
  strokeLinecap: "butt",
} as const;

type ChargeGaugeProps = {
  /** Raw hold-to-charge progress, 0..1. */
  progress: MotionValue<number>;
  /** Full-charge burst is playing (drives the white flash). */
  charged: boolean;
  /** prefers-reduced-motion — suppress the flash, keep the fill. */
  reduce: boolean;
};

export default function ChargeGauge({
  progress,
  charged,
  reduce,
}: ChargeGaugeProps) {
  const id = useId();
  const gradId = `${id}-grad`;
  const maskId = `${id}-mask`;

  const maskTarget = useTransform(progress, (v) =>
    QUANTIZED ? Math.ceil(v * SEGMENTS) / SEGMENTS : v,
  );
  /* Glide the reveal's leading edge instead of tracking the raw (linear) ramp
     1:1, so the fill flows and settles into full charge rather than stopping
     dead. Stiff + slightly over-damped → fluid but no lingering lag. Reduced
     motion binds straight to the target so the fill stays instant. */
  const smoothMask = useSpring(maskTarget, {
    stiffness: 260,
    damping: 32,
    mass: 0.35,
  });
  const maskProgress = reduce ? maskTarget : smoothMask;
  /* Soft halo behind the lit segments, fading in as the charge nears full. */
  const glowOpacity = useTransform(progress, [0.75, 1], [0, 0.85]);

  return (
    <svg
      viewBox="0 0 200 200"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        {/* Arc runs left → top → right, so a horizontal gradient maps
            blue (start) → violet (apex) → orange hot tip (end). */}
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="55%" stopColor="var(--color-accent-2)" />
          <stop offset="100%" stopColor="var(--color-accent-3)" />
        </linearGradient>
        {/* Reveal wipe: a solid (non-dashed) copy of the arc, slightly wider
            than the fill stroke so it covers its antialiased edges. Motion
            drives pathLength straight to the DOM — no React re-renders. */}
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="200"
          height="200"
        >
          <motion.path
            d={ARC}
            fill="none"
            stroke="#fff"
            strokeWidth={7}
            strokeLinecap="butt"
            style={{ pathLength: maskProgress }}
          />
        </mask>
      </defs>

      {/* Dim segmented track — always visible as a hold-me affordance. */}
      <path d={ARC} {...SEGMENT_STROKE} stroke="white" strokeOpacity={0.08} />

      {/* Blurred halo copy of the fill, brightening near full charge. */}
      <motion.path
        d={ARC}
        {...SEGMENT_STROKE}
        stroke={`url(#${gradId})`}
        mask={`url(#${maskId})`}
        style={{ opacity: glowOpacity, filter: "blur(3px)" }}
      />

      {/* Bright segmented fill, revealed by the mask wipe. */}
      <path
        d={ARC}
        {...SEGMENT_STROKE}
        stroke={`url(#${gradId})`}
        mask={`url(#${maskId})`}
      />

      {/* White flash over the whole arc — pulses in step with the shockwave
          ripple for as long as the gauge stays locked at full. */}
      {charged && !reduce ? (
        <motion.path
          d={ARC}
          fill="none"
          stroke="white"
          strokeWidth={5}
          strokeLinecap="butt"
          initial={false}
          animate={{ opacity: [0.9, 0] }}
          transition={{ duration: 1.1, ease: "easeOut", repeat: Infinity }}
        />
      ) : null}
    </svg>
  );
}
