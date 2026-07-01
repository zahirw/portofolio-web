"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  /** Rendered wrapper tag. Defaults to a div. */
  as?: "div" | "li" | "article" | "section";
  className?: string;
};

// Fade + rise into view once when scrolled to. Respects prefers-reduced-motion:
// motion-averse users get an instant, static appearance.
export default function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
