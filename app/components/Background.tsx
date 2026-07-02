// Fixed decorative background: soft gradient wash + blurred color blobs.
// Sits behind all content (aria-hidden, pointer-events none).
export default function Background() {
  return (
    <div
      className="fixed inset-0 -z-[1] overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute rounded-full blur-[90px] opacity-40 will-change-transform w-[520px] h-[520px] -top-40 -right-30 bg-[radial-gradient(circle,#3b6fe0,transparent_70%)] animate-drift-1" />
      <div className="absolute rounded-full blur-[90px] opacity-35 will-change-transform w-[460px] h-[460px] top-[40%] -left-[180px] bg-[radial-gradient(circle,#4a9eff,transparent_70%)] animate-drift-2" />
      {/* Warm orange blob — the reference's Python/flow heat, low in the wash. */}
      <div className="absolute rounded-full blur-[90px] opacity-25 will-change-transform w-[420px] h-[420px] -bottom-40 right-[10%] bg-[radial-gradient(circle,#ff8c42,transparent_70%)] animate-drift-3" />
      {/* Violet blob — the secondary "tech" accent woven into the wash. */}
      <div className="absolute rounded-full blur-[90px] opacity-30 will-change-transform w-[400px] h-[400px] top-[18%] right-[22%] bg-[radial-gradient(circle,#7c6ff0,transparent_70%)] animate-drift-1" />
      <div className="grid-overlay" />
    </div>
  );
}
