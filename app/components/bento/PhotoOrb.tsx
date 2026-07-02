"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "motion/react";
import { profile } from "@/lib/data";
import { CodeIcon } from "../icons";
import ChargeGauge from "./ChargeGauge";

/* Hold-to-charge timing for the HUD gauge around the portrait. */
const CHARGE_S = 1.8; // full hold time, 0 → 1
const DRAIN_S = 0.7; // release spring-back, 1 → 0 (scaled by progress)

/* Ring-light spin speed, in deg/s — idle ambient scan up to a fast sweep at
   full charge. Kept as constant angular *velocity* targets (not durations) so
   interpolating against progress never has to divide by a changing period. */
const RING_SPEED_IDLE = 360 / 7; // matches the old fixed 7s/rev animation
const RING_SPEED_FULL = 360 / 1.2;

type PhotoOrbProps = {
  /** Fires once each time the gauge reaches full charge. */
  onCharged?: () => void;
  /** Optional shared charge progress; when omitted the orb owns its own. */
  progress?: MotionValue<number>;
};

export default function PhotoOrb({
  onCharged,
  progress: progressProp,
}: PhotoOrbProps) {
  const reduce = useReducedMotion();
  /* The local value always exists (hooks stay unconditional); the shared one
     wins when the parent lifts progress to drive siblings (circuit field). */
  const localProgress = useMotionValue(0);
  const progress = progressProp ?? localProgress;
  const controls = useRef<AnimationPlaybackControls | null>(null);
  /* Interaction phase lives in a ref (no re-render while charging); `charged`
     is the only state — it mounts the burst visuals (2 renders per cycle). */
  const phase = useRef<"idle" | "charging" | "charged">("idle");
  const [charged, setCharged] = useState(false);

  const start = () => {
    if (phase.current !== "idle") return;
    phase.current = "charging";
    controls.current?.stop();
    controls.current = animate(progress, 1, {
      // Scale by the remaining distance so the fill *rate* stays constant
      // when re-pressing mid-drain.
      duration: CHARGE_S * (1 - progress.get()),
      ease: "linear",
    });
  };

  const release = () => {
    /* Drains from wherever the gauge is — mid-charge or locked at full. */
    if (phase.current === "idle") return;
    phase.current = "idle";
    setCharged(false);
    controls.current?.stop();
    controls.current = animate(progress, 0, {
      duration: reduce ? 0 : DRAIN_S * progress.get(),
      ease: "easeOut",
    });
  };

  /* Full-charge detection off the value itself (robust against how the
     animation ended). The burst plays once and the gauge locks at full for
     as long as the press is held; release() drains and re-arms it. */
  useMotionValueEvent(progress, "change", (v) => {
    if (v < 0.999 || phase.current !== "charging") return;
    phase.current = "charged";
    setCharged(true);
    onCharged?.();
  });

  useEffect(() => () => controls.current?.stop(), []);

  /* Center light — a bloom behind the emblem that brightens as the gauge
     fills (the reference's glowing core). Progress-linked feedback, so it
     stays active under reduced motion, same as the gauge fill itself. */
  const coreOpacity = useTransform(progress, [0, 1], [0, 0.95]);
  /* The emblem itself lights up: a glow (matching the blue→violet fire) grows
     and it brightens toward white as the charge climbs, peaking at full. */
  const iconGlow = useTransform(
    progress,
    (v) =>
      `drop-shadow(0 0 ${5 + v * 20}px color-mix(in oklab, var(--color-accent) 90%, transparent)) brightness(${1 + v})`,
  );

  /* Ring-light rotation, driven frame-by-frame off the live charge value
     instead of a fixed-duration CSS animation — so its spin speed tracks the
     gauge continuously (idle → full) rather than jumping between presets. */
  const ringRotation = useMotionValue(0);
  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const speed =
      RING_SPEED_IDLE + progress.get() * (RING_SPEED_FULL - RING_SPEED_IDLE);
    ringRotation.set(ringRotation.get() - speed * (delta / 1000));
  });

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center desk:w-(--orb-d) desk:max-w-(--orb-d)">
      {/* Blue → violet glow behind the orb. */}
      <div
        aria-hidden="true"
        className="glow pointer-events-none absolute inset-[-8%] -z-10 rounded-full opacity-80 blur-2xl"
      />

      {/* Full-charge shockwave — an expanding, fading concentric ring that
          ripples outward for as long as the gauge stays locked at full. Uses
          its own centered radial gradient (not the offset `glow` utility) so
          the wave is a symmetric full circle. */}
      <AnimatePresence>
        {charged && !reduce ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-8%] -z-10 rounded-full"
            style={{
              background:
                "radial-gradient(circle, transparent 52%, color-mix(in oklab, var(--color-accent) 55%, transparent) 66%, color-mix(in oklab, var(--color-accent-2) 45%, transparent) 76%, transparent 88%)",
            }}
            initial={false}
            animate={{ opacity: [0.9, 0], scale: [0.6, 1.55] }}
            /* Own transition — the repeating one above would make the exit
               animation loop forever and AnimatePresence never unmount it. */
            exit={{
              opacity: 0,
              transition: { duration: 0.25, ease: "easeOut", repeat: 0 },
            }}
            transition={{ duration: 1.1, ease: "easeOut", repeat: Infinity }}
          />
        ) : null}
      </AnimatePresence>

      {/* Misty full-circle track the comet sweeps along — a faint, hazy ring
          so the light's path reads all the way around, not just under the
          bright head. */}
      <div
        aria-hidden="true"
        className="ring-track pointer-events-none absolute inset-0 opacity-20 blur-[2px] mix-blend-screen"
      />

      {/* Inner rotating light — a blue→violet comet of light circling the
          emblem (replaces the dashed dot ring). Conic gradient masked into a
          thin ring band; `ringRotation` spins it at a speed tied to the
          charge gauge (see the useAnimationFrame loop above), so it sweeps
          faster the closer the hold gets to full. Blur + screen blend make
          the sweeping head read as glowing light rather than a hard arc. */}
      <motion.div
        aria-hidden="true"
        className="ring-light pointer-events-none absolute inset-0 blur-[2px] mix-blend-screen"
        style={{ rotate: ringRotation }}
      />

      {/* Hold-to-charge gauge, nested inside the light ring. */}
      <ChargeGauge progress={progress} charged={charged} reduce={!!reduce} />

      {/* Portrait — the only interactive hit area. pointer-events-auto opts it
          back in at desktop, where the whole orb cell is pointer-events:none
          so the overlap never blocks the exp/projects cards; its 76% square
          hit box stays well inside the notch well radius. */}
      <button
        type="button"
        aria-label={`${profile.name} — hold to charge`}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          start();
        }}
        onPointerUp={release}
        onPointerCancel={release}
        onLostPointerCapture={release}
        onContextMenu={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if ((e.key === " " || e.key === "Enter") && !e.repeat) {
            e.preventDefault(); // Space must not scroll or fire a keyup click
            start();
          }
        }}
        onKeyUp={(e) => {
          if (e.key === " " || e.key === "Enter") release();
        }}
        onBlur={release}
        className="pointer-events-auto relative flex aspect-square w-[76%] cursor-pointer touch-none select-none appearance-none items-center justify-center rounded-full bg-transparent [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
      >
        {/* Blazing fire core behind the emblem — warm, flickering flame layers
            that flare up as the gauge charges and peak at full. The flicker is
            CSS keyframes (frozen by the global prefers-reduced-motion rule);
            only its overall intensity is progress-linked via Motion. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ opacity: coreOpacity }}
        >
          {/* Hot core — white-blue center pulsing in place. */}
          <div
            className="absolute inset-[16%] rounded-full blur-md mix-blend-screen animate-fire-core motion-reduce:animate-none"
            style={{
              background:
                "radial-gradient(circle, rgba(224,238,255,0.95) 0%, var(--color-accent-strong) 30%, color-mix(in oklab, var(--color-accent) 88%, transparent) 52%, transparent 72%)",
            }}
          />
          {/* Main flame tongue licking upward — blue → violet. */}
          <div
            className="absolute bottom-[18%] left-[22%] h-[72%] w-[56%] origin-bottom rounded-[50%] blur-lg mix-blend-screen animate-fire-lick motion-reduce:animate-none"
            style={{
              background:
                "radial-gradient(50% 62% at 50% 82%, rgba(210,232,255,0.92) 0%, var(--color-accent) 36%, color-mix(in oklab, var(--color-accent-2) 90%, transparent) 62%, transparent 82%)",
            }}
          />
          {/* Second tongue — desynced duration + negative delay for an
              irregular, non-repeating flicker. */}
          <div
            className="absolute bottom-[16%] left-[30%] h-[62%] w-[40%] origin-bottom rounded-[50%] blur-lg mix-blend-screen animate-fire-lick [animation-delay:-0.22s] [animation-duration:0.33s] motion-reduce:animate-none"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 82%, rgba(205,224,255,0.9) 0%, var(--color-accent-strong) 40%, color-mix(in oklab, var(--color-accent-2) 88%, transparent) 66%, transparent 84%)",
            }}
          />
          {/* Third, narrow tongue — fastest and offset, for extra chaos. */}
          <div
            className="absolute bottom-[20%] left-[38%] h-[54%] w-[24%] origin-bottom rounded-[50%] blur-md mix-blend-screen animate-fire-lick [animation-delay:-0.11s] [animation-duration:0.27s] motion-reduce:animate-none"
            style={{
              background:
                "radial-gradient(50% 58% at 50% 84%, rgba(235,244,255,0.95) 0%, var(--color-accent-strong) 38%, color-mix(in oklab, var(--color-accent) 82%, transparent) 68%, transparent 86%)",
            }}
          />
        </motion.div>

        {/* Center emblem — the frontend `</>` glyph, glowing on a transparent
            core and brightening as the gauge charges. */}
        <motion.div
          aria-hidden="true"
          className="relative h-[42%] w-[42%] text-accent-strong"
          style={{ filter: iconGlow }}
        >
          <CodeIcon className="h-full w-full" strokeWidth={1.5} />
        </motion.div>
      </button>
    </div>
  );
}
