"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion, type MotionValue } from "motion/react";

const SKILLS = [
  "React",
  "Next.js",
  "Vue.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "React Native",
  "Redux",
  "Zustand",
  "Pinia",
];

// Deterministic per-chip start (no Math.random -> SSR-safe, no hydration drift):
//   fx/fy = start position as a fraction of the free space (0..1)
//   deg   = travel direction in degrees
//   spd   = speed in px/s
//   spin  = continuous rotation while floating, in deg/s (sign = direction)
const START = [
  { fx: 0.14, fy: 0.18, deg: 34, spd: 52, spin: 54 },
  { fx: 0.70, fy: 0.08, deg: 148, spd: 46, spin: -44 },
  { fx: 0.40, fy: 0.78, deg: 208, spd: 58, spin: 66 },
  { fx: 0.05, fy: 0.52, deg: 20, spd: 44, spin: -58 },
  { fx: 0.62, fy: 0.34, deg: 302, spd: 56, spin: 48 },
  { fx: 0.10, fy: 0.88, deg: 126, spd: 48, spin: -72 },
  { fx: 0.54, fy: 0.60, deg: 250, spd: 54, spin: 60 },
  { fx: 0.82, fy: 0.82, deg: 202, spd: 50, spin: -50 },
  { fx: 0.74, fy: 0.44, deg: 160, spd: 60, spin: 74 },
  { fx: 0.26, fy: 0.04, deg: 66, spd: 46, spin: -46 },
];

const GAP = 8; // px gap between chips in the tidy layout
const CHARGE_THRESHOLD = 0.02; // charge level above which chips bounce

// Gravity-drop physics (used once the gauge is released).
const GRAVITY = 1500; // px/s^2 baseline (scaled per chip)
const AIR_DRAG = 1.6; // 1/s — sheds sideways momentum while airborne
const SPIN_DRAG = 1.1; // 1/s — airborne angular damping
const FLOOR_FRICTION = 0.72; // horizontal damping on ground contact
const BOUNCE_MIN_VY = 130; // px/s — impacts slower than this don't rebound
const SPIN_COUPLE = 0.9; // deg/s of spin gained per px/s of sliding on impact
const SETTLE_TAU = 0.22; // s — how fast grounded chips ease down flat
const SLEEP_MOVE = 0.5; // px/frame below which a chip counts as still
const SLEEP_FRAMES = 16; // consecutive still frames -> settle
const MAX_FALL_S = 5; // hard cap so the pile always comes to rest

type Chip = {
  el: HTMLElement;
  w: number;
  h: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  bvx: number; // stored DVD bounce velocity (restored on each press)
  bvy: number;
  bva: number; // stored float spin, deg/s (restored on each press)
  angle: number; // deg
  va: number; // angular velocity deg/s
  grav: number; // per-chip gravity scale (weight variance)
  rest: number; // per-chip restitution (bounciness variance)
  px: number; // prev position (sleep detection)
  py: number;
  tx: number; // tidy target x
  ty: number; // tidy target y
};

const clamp = (v: number, lo: number, hi: number) =>
  v < lo ? lo : v > hi ? hi : v;

/**
 * Skill chips for the Skills card, driven by the orb's hold-to-charge gauge:
 *   - idle at load: chips sit in a neat, bottom-anchored row.
 *   - gauge held: chips bounce around the box like the DVD-logo screensaver.
 *   - gauge released: gravity takes over — chips fall, tumble and pile up
 *     irregularly at the bottom, and stay there (they do not re-tidy).
 * `pointer-events-none` so the card click still opens the modal; reduced-motion
 * users just get the tidy layout, unmoving.
 */
export function FloatingSkills({
  progress,
  resetKey = 0,
}: {
  progress: MotionValue<number>;
  /** Bump to re-seed the tidy layout (reset button). */
  resetKey?: number;
}) {
  const ulRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const ul = ulRef.current;
    if (!ul) return;
    const els = Array.from(ul.children) as HTMLElement[];

    let W = ul.clientWidth;
    let H = ul.clientHeight;

    const chips: Chip[] = els.map((el, i) => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const s = START[i];
      const rad = (s.deg * Math.PI) / 180;
      const vx = Math.cos(rad) * s.spd;
      const vy = Math.sin(rad) * s.spd;
      // Drive movement with transform only (cheap, GPU-composited); anchor the
      // chips at the top-left corner and translate from there.
      el.style.left = "0px";
      el.style.top = "0px";
      return {
        el,
        w,
        h,
        x: 0,
        y: 0,
        vx,
        vy,
        bvx: vx,
        bvy: vy,
        bva: s.spin,
        angle: 0,
        va: 0,
        // Deterministic per-chip variance so the flock doesn't fall in
        // lockstep: some chips are "heavier", some bounce livelier.
        grav: 0.9 + ((i * 7) % 5) * 0.06, // 0.9 .. 1.14
        rest: 0.24 + ((i * 3) % 4) * 0.06, // 0.24 .. 0.42
        px: 0,
        py: 0,
        tx: 0,
        ty: 0,
      };
    });

    const paint = (c: Chip) => {
      c.el.style.transform = `translate3d(${Math.round(c.x)}px, ${Math.round(c.y)}px, 0) rotate(${c.angle.toFixed(1)}deg)`;
    };

    // Pack chips left-to-right into wrapped rows, centered per row and anchored
    // to the bottom of the box — the tidy initial layout.
    const layoutTidy = () => {
      const rows: { items: Chip[]; w: number; h: number }[] = [];
      let row: Chip[] = [];
      let rowW = 0;
      let rowH = 0;
      for (const c of chips) {
        const needed = c.w + (row.length ? GAP : 0);
        if (row.length && rowW + needed > W) {
          rows.push({ items: row, w: rowW, h: rowH });
          row = [];
          rowW = 0;
          rowH = 0;
        }
        rowW += c.w + (row.length ? GAP : 0);
        rowH = Math.max(rowH, c.h);
        row.push(c);
      }
      if (row.length) rows.push({ items: row, w: rowW, h: rowH });

      const totalH =
        rows.reduce((s, r) => s + r.h, 0) + GAP * Math.max(0, rows.length - 1);
      let yCursor = Math.max(0, H - totalH);
      for (const r of rows) {
        let xCursor = Math.max(0, (W - r.w) / 2);
        for (const c of r.items) {
          c.tx = clamp(xCursor, 0, Math.max(0, W - c.w));
          c.ty = clamp(yCursor, 0, Math.max(0, H - c.h));
          xCursor += c.w + GAP;
        }
        yCursor += r.h + GAP;
      }
    };

    // Start tidy.
    layoutTidy();
    for (const c of chips) {
      c.x = c.tx;
      c.y = c.ty;
      c.px = c.x;
      c.py = c.y;
      paint(c);
    }

    // Reduced motion: no motion at all — hold the tidy layout, re-tidy on resize.
    if (reduce) {
      const roStatic = new ResizeObserver(() => {
        W = ul.clientWidth;
        H = ul.clientHeight;
        for (const c of chips) {
          c.w = c.el.offsetWidth;
          c.h = c.el.offsetHeight;
        }
        layoutTidy();
        for (const c of chips) {
          c.x = c.tx;
          c.y = c.ty;
          paint(c);
        }
      });
      roStatic.observe(ul);
      return () => roStatic.disconnect();
    }

    let mode: "settled" | "bounce" | "fall" = "settled";
    let everFell = false;
    let idle = 0;
    let fallElapsed = 0;

    const ro = new ResizeObserver(() => {
      W = ul.clientWidth;
      H = ul.clientHeight;
      for (const c of chips) {
        c.w = c.el.offsetWidth;
        c.h = c.el.offsetHeight;
        c.x = clamp(c.x, 0, Math.max(0, W - c.w));
        c.y = clamp(c.y, 0, Math.max(0, H - c.h));
      }
      // Only re-tidy while still in the untouched initial state.
      if (!everFell && mode === "settled") {
        layoutTidy();
        for (const c of chips) {
          c.x = c.tx;
          c.y = c.ty;
          paint(c);
        }
      }
    });
    ro.observe(ul);

    // Cheap AABB de-overlap so released chips stack into a heap.
    const resolveCollisions = () => {
      for (let i = 0; i < chips.length; i++) {
        for (let j = i + 1; j < chips.length; j++) {
          const a = chips[i];
          const b = chips[j];
          const ox =
            Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
          const oy =
            Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
          if (ox <= 0 || oy <= 0) continue;
          if (ox < oy) {
            const push = ox / 2;
            const dir = a.x < b.x ? 1 : -1;
            a.x -= dir * push;
            b.x += dir * push;
            const avg = (a.vx + b.vx) / 2;
            a.vx = avg * 0.4;
            b.vx = avg * 0.4;
          } else {
            const push = oy / 2;
            if (a.y < b.y) {
              a.y -= push;
              b.y += push;
            } else {
              a.y += push;
              b.y -= push;
            }
            const avg = (a.vy + b.vy) / 2;
            a.vy = avg * 0.3;
            b.vy = avg * 0.3;
            a.vx *= 0.98;
            b.vx *= 0.98;
          }
        }
      }
    };

    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      if (!last) last = now;
      const dt = Math.min(0.05, (now - last) / 1000); // clamp for tab-outs
      last = now;

      const charging = progress.get() > CHARGE_THRESHOLD;

      if (charging && mode !== "bounce") {
        // (Re)start bouncing from wherever the chips are.
        mode = "bounce";
        for (const c of chips) {
          c.vx = c.bvx;
          c.vy = c.bvy;
          c.va = c.bva;
        }
      } else if (!charging && mode === "bounce") {
        // Release -> drop. Chips simply keep the momentum and spin they had
        // while floating — no injected velocities, so the fall starts from
        // exactly what the eye was tracking.
        mode = "fall";
        everFell = true;
        idle = 0;
        fallElapsed = 0;
      }

      if (mode === "bounce") {
        for (const c of chips) {
          const maxX = Math.max(0, W - c.w);
          const maxY = Math.max(0, H - c.h);
          c.x += c.vx * dt;
          c.y += c.vy * dt;
          if (c.x <= 0) {
            c.x = 0;
            c.vx = Math.abs(c.vx);
          } else if (c.x >= maxX) {
            c.x = maxX;
            c.vx = -Math.abs(c.vx);
          }
          if (c.y <= 0) {
            c.y = 0;
            c.vy = Math.abs(c.vy);
          } else if (c.y >= maxY) {
            c.y = maxY;
            c.vy = -Math.abs(c.vy);
          }
          c.angle = (c.angle + c.va * dt) % 360; // continuous 360° spin
          paint(c);
        }
      } else if (mode === "fall") {
        fallElapsed += dt;
        const drag = Math.exp(-AIR_DRAG * dt);
        const spinDrag = Math.exp(-SPIN_DRAG * dt);
        for (const c of chips) {
          const maxX = Math.max(0, W - c.w);
          const maxY = Math.max(0, H - c.h);
          // Airborne: gravity (per-chip weight) + air drag bleeding off the
          // sideways DVD momentum, so trajectories curve into a real drop
          // instead of gliding diagonally at constant speed.
          c.vy += GRAVITY * c.grav * dt;
          c.vx *= drag;
          c.va *= spinDrag;
          c.x += c.vx * dt;
          c.y += c.vy * dt;
          c.angle += c.va * dt;
          if (c.x <= 0) {
            c.x = 0;
            c.vx = Math.abs(c.vx) * c.rest;
            c.va = -c.va * 0.5;
          } else if (c.x >= maxX) {
            c.x = maxX;
            c.vx = -Math.abs(c.vx) * c.rest;
            c.va = -c.va * 0.5;
          }
          if (c.y >= maxY) {
            c.y = maxY;
            const impact = c.vy;
            if (impact > BOUNCE_MIN_VY) {
              // Real impacts rebound lower each time and convert sliding into
              // tumble (a chip skidding right rolls clockwise).
              c.vy = -impact * c.rest;
              c.va = c.va * 0.35 + c.vx * SPIN_COUPLE;
            } else {
              c.vy = 0;
              c.va *= 0.5;
            }
            c.vx *= FLOOR_FRICTION;
            // Grounded and slowing: ease down onto the nearest flat side —
            // pills come to rest lying flat, not frozen mid-tilt.
            if (Math.abs(c.vy) < BOUNCE_MIN_VY && Math.abs(c.va) < 220) {
              const flat = Math.round(c.angle / 180) * 180;
              c.angle += (flat - c.angle) * (1 - Math.exp(-dt / SETTLE_TAU));
              c.va *= 0.8;
            }
          } else if (c.y <= 0) {
            c.y = 0;
            c.vy = Math.abs(c.vy) * c.rest;
          }
        }
        for (let it = 0; it < 3; it++) resolveCollisions();
        for (const c of chips) {
          c.x = clamp(c.x, 0, Math.max(0, W - c.w));
          c.y = clamp(c.y, 0, Math.max(0, H - c.h));
          // Chips coming to rest ON THE PILE (not the floor) also ease down
          // flat — nothing should freeze mid-tilt.
          if (Math.abs(c.vx) < 30 && Math.abs(c.vy) < 30) {
            const flat = Math.round(c.angle / 180) * 180;
            c.angle += (flat - c.angle) * (1 - Math.exp(-dt / SETTLE_TAU));
          }
        }

        let maxMove = 0;
        for (const c of chips) {
          maxMove = Math.max(
            maxMove,
            Math.abs(c.x - c.px),
            Math.abs(c.y - c.py),
          );
          paint(c);
          c.px = c.x;
          c.py = c.y;
        }
        if (maxMove < SLEEP_MOVE) idle++;
        else idle = 0;
        if (idle > SLEEP_FRAMES || fallElapsed > MAX_FALL_S) {
          mode = "settled";
          for (const c of chips) {
            c.vx = 0;
            c.vy = 0;
            c.va = 0;
          }
        }
      }
      // "settled": positions are frozen; nothing to update until the next press.

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduce, progress, resetKey]);

  return (
    <ul
      ref={ulRef}
      // Full card on mobile/tablet; lower half on desktop, where the orb
      // overlaps the card's top (bouncing there would hide chips behind it).
      className="pointer-events-none absolute inset-0 z-0 m-0 list-none p-0 desk:top-1/2"
    >
      {SKILLS.map((label, i) => (
        <li
          key={label}
          className="tag absolute whitespace-nowrap will-change-transform"
          style={{ left: `${START[i].fx * 100}%`, top: `${START[i].fy * 100}%` }}
        >
          {label}
        </li>
      ))}
    </ul>
  );
}
