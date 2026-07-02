"use client";

import { useEffect, useRef } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

/* PCB-style traces radiating from the orb (container center) across the whole
   bento grid. Purely decorative background layer, sitting behind every card:
   invisible while idle, brightening with the hold-to-charge progress, with
   light pulses flowing center → out while charging (see `.circuit-field` in
   globals.css). */

type CircuitFieldProps = {
  /** Shared hold-to-charge progress (0..1) — the same value the orb animates. */
  progress: MotionValue<number>;
};

/* Eight radial directions: four orthogonal, four diagonal (corners). */
const DIRS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
] as const;

type Trace = {
  d: string;
  node: readonly [number, number];
  delay: number;
  dur: number;
};

/* One PCB trace from the center outward along (sx, sy): a straight run, one
   45°/right-angle jog, then on to a terminal pad. Variants change run/jog
   lengths and fan parallel traces apart so they never stack. Coordinates live
   in the centered -100..100 viewBox (paths stay inside ±96 so every pad lands
   just shy of the grid's edges). */
function makeTrace(sx: number, sy: number, v: number, i: number): Trace {
  let d: string;
  let node: readonly [number, number];

  if (sx !== 0 && sy !== 0) {
    /* Diagonal: 45° run, right-angle jog (alternating H/V), 45° again. */
    const run = 20 + v * 8;
    const jog = 14 + v * 8;
    const tail = 46 - v * 8;
    const ax = sx * run;
    const ay = sy * run;
    const bx = v % 2 === 0 ? ax + sx * jog : ax;
    const by = v % 2 === 0 ? ay : ay + sy * jog;
    node = [bx + sx * tail, by + sy * tail];
    d = `M0 0L${ax} ${ay}L${bx} ${by}L${node[0]} ${node[1]}`;
  } else {
    /* Orthogonal: straight run, 45° dogleg fanning sideways, straight out.
       The middle variant (off = 0) stays a straight main bus. */
    const off = (v - 1) * 16;
    const run = 22 + v * 7;
    const end = 96 - v * 14;
    const px = sx === 0 ? 1 : 0; // perpendicular axis for the fan offset
    const py = sy === 0 ? 1 : 0;
    const ax = sx * run;
    const ay = sy * run;
    const bx = sx * (run + Math.abs(off)) + px * off;
    const by = sy * (run + Math.abs(off)) + py * off;
    node = [sx * end + px * off, sy * end + py * off];
    d =
      off === 0
        ? `M0 0L${node[0]} ${node[1]}`
        : `M0 0L${ax} ${ay}L${bx} ${by}L${node[0]} ${node[1]}`;
  }

  return {
    d,
    node,
    /* Deterministic pseudo-random stagger so the flow reads organic. */
    delay: ((i * 7) % 10) * 0.06,
    dur: 1.5 + ((i * 13) % 7) * 0.12,
  };
}

const TRACES: Trace[] = DIRS.flatMap(([sx, sy], di) =>
  [0, 1, 2].map((v) => makeTrace(sx, sy, v, di * 3 + v)),
);

/* The comet = one round head bead (animateMotion) + continuous dash-reveal
   streaks for the body/tail, all driven by SMIL on the same timeline.

   Why this split: the head must be a crisp screen-round dot, which needs
   vector-effect:non-scaling-stroke — but combining non-scaling-stroke with
   dashes is what broke earlier (Chromium computes that dash pattern in
   screen space, ignoring pathLength, scattering segments mid-path). So the
   head is a moving dot with no dash, while the streaks are dashed paths
   with NO vector-effect: plain user-space dashing + pathLength=1 is the
   standard, reliable line-reveal technique everywhere. (Their stroke width
   is therefore in viewBox units and stretches slightly differently per
   direction — invisible at these widths under the glow.)

   Geometry-glued tail: a dash of length `len` at offset `len - f` has its
   leading edge exactly at distance f along the path — the same f where the
   paced animateMotion head sits when both share dur/begin. So animating the
   offset from `len` (f=0) to `len - 1` (f=1) keeps each streak welded to
   the back of the head the whole trip, no time-lag gaps. Two streaks
   stacked (short bright + long faint) taper the tail; drawn under the head
   so the dot caps the seam. */
const TAIL_STREAKS = [
  { len: 0.2, width: 0.6, opacity: 0.32 },
  { len: 0.18, width: 0.55, opacity: 0.35 },
] as const;

/* Head bead diameter (screen px, non-scaling). */
const HEAD_W = 6.5;

export default function CircuitField({ progress }: CircuitFieldProps) {
  const rootRef = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();

  /* SMIL animations run from document load by default — park them until the
     first press so the idle field costs nothing. */
  useEffect(() => {
    rootRef.current?.pauseAnimations();
  }, []);

  /* Progress → brightness as ONE css var on the root; every layer scales via
     calc() with zero React re-renders (same MotionValue→DOM trick as the
     charge gauge). The pulse gate (data-active) is derived from the same
     value and toggled straight on the DOM — pulses flow whenever any charge
     is present (charging or draining), and the whole interaction never
     touches React state, so nothing above ever re-renders mid-press.
     The bead animations are SMIL, so the global prefers-reduced-motion CSS
     rule can't freeze them — gate them here instead: under reduced motion
     the timeline simply never unpauses (beads stay parked at the masked
     center), while the static brightness feedback still works. Each fresh
     press rewinds the timeline so the comets always restart from the orb. */
  useMotionValueEvent(progress, "change", (v) => {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty("--lvl", v.toFixed(3));
    const wasActive = el.hasAttribute("data-active");
    if (v > 0.001 && !wasActive) {
      el.setAttribute("data-active", "true");
      if (!reduce) {
        el.setCurrentTime(0);
        el.unpauseAnimations();
      }
    } else if (v <= 0.001 && wasActive) {
      el.removeAttribute("data-active");
      el.pauseAnimations();
    }
  });

  return (
    <svg
      ref={rootRef}
      viewBox="-100 -100 200 200"
      preserveAspectRatio="none"
      aria-hidden="true"
      /* No explicit z-index: as the .bento container's first child it paints
         before every card (all `bento-card` surfaces are z-index:auto), so it
         naturally sits behind them — visible in the gaps and faintly through
         the frosted glass — without fighting their stacking order. */
      className="circuit-field pointer-events-none absolute inset-0 h-full w-full text-accent mix-blend-screen"
    >
      {/* Static traces — faint full lines that brighten with the charge.
          non-scaling-stroke keeps their width uniform even though the
          centered square viewBox stretches to fill the non-square grid. */}
      <g
        className="circuit-base"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      >
        {TRACES.map((t, i) => (
          <path key={i} d={t.d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      {/* Terminal pads — zero-length strokes with round caps so they render
          as true circles despite the anisotropic viewBox scaling. */}
      <g
        className="circuit-nodes"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      >
        {TRACES.map((t, i) => (
          <path
            key={i}
            d={`M${t.node[0]} ${t.node[1]}h0.01`}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      {/* Traveling pulses — a comet per trace: dash-reveal streaks for the
          tapering tail plus a round head bead riding animateMotion, welded
          together by sharing one SMIL timeline (see the TAIL_STREAKS comment
          for the geometry), flowing center → pad while charging. */}
      <g className="circuit-pulses" fill="none" strokeLinecap="round">
        {TRACES.map((t, i) => (
          <g key={i}>
            {TAIL_STREAKS.map(({ len, width, opacity }, s) => (
              <path
                key={s}
                d={t.d}
                pathLength={1}
                strokeWidth={width}
                opacity={opacity}
                strokeDasharray={`${len} ${2 - len}`}
                strokeDashoffset={len}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from={`${len}`}
                  to={`${len - 1}`}
                  dur={`${t.dur}s`}
                  begin={`${t.delay}s`}
                  repeatCount="indefinite"
                />
              </path>
            ))}
            <path
              d="M0 0h0.01"
              strokeWidth={HEAD_W}
              vectorEffect="non-scaling-stroke"
            >
              <animateMotion
                path={t.d}
                dur={`${t.dur}s`}
                begin={`${t.delay}s`}
                repeatCount="indefinite"
              />
            </path>
          </g>
        ))}
      </g>
    </svg>
  );
}
