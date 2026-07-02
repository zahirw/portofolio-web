// Small decorative, purely-visual flourishes shared by bento cards.
// All are aria-hidden and pointer-events-none so they never affect a11y.

// Faint circuit traces (lines + node dots) — echoes the reference's
// "branching paths" card. Positioned absolutely by the parent.
export function CircuitTrace({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`pointer-events-none absolute text-accent ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.5" opacity="0.35">
        <path d="M6 20h34l14 14v40" />
        <path d="M54 74h28l14-14V26" />
        <path d="M20 100h30" />
      </g>
      <g fill="currentColor" opacity="0.55">
        <circle cx="6" cy="20" r="3" />
        <circle cx="54" cy="74" r="3" />
        <circle cx="96" cy="26" r="3" />
        <circle cx="50" cy="100" r="3" />
      </g>
    </svg>
  );
}

// A faint monospace binary/hex string used as corner texture.
export function BinaryString({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none select-none font-mono text-[0.6rem] leading-[1.4] tracking-widest text-accent-ink/25 ${className}`}
    >
      01001010 11100101 0110 1001 0100 1110 0x7F3A 1010 0011
    </span>
  );
}
