"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

// Each direct grid child: carries the grid-area + entrance animation, and
// stretches to fill its cell so the BentoCard inside can be h-full. Lives at
// module scope (its own file) so grid re-renders never change its component
// identity — a definition inside BentoGrid would remount every cell on any
// state change, killing in-flight orb animations (charge/drain) with them.
export default function Cell({
  area,
  variants,
  children,
}: {
  area: string;
  variants?: Variants;
  children: ReactNode;
}) {
  return (
    <motion.div
      style={{ gridArea: area }}
      variants={variants}
      className="min-w-0"
    >
      {children}
    </motion.div>
  );
}
