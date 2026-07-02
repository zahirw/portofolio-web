"use client";

import type { ReactNode } from "react";

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  /** When provided, the card renders as a real <button> that opens a modal. */
  onClick?: () => void;
  /** Accessible label for interactive cards (e.g. "Open Skills details"). */
  label?: string;
};

// A single bento tile's surface. Grid placement is handled by the motion
// wrapper in BentoGrid; this component only owns the glass card + interaction.
// Clickable tiles are real <button>s (keyboard + screen reader friendly, and
// announce a dialog via aria-haspopup); display tiles are plain <div>s.
export default function BentoCard({
  children,
  className = "",
  onClick,
  label,
}: BentoCardProps) {
  const base = `bento-card flex h-full w-full flex-col p-5 desk:p-6 ${className}`;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-haspopup="dialog"
        aria-label={label}
        className={`${base} bento-card-btn group`}
      >
        {children}
      </button>
    );
  }

  return <div className={base}>{children}</div>;
}
