// Fixed decorative background: soft gradient wash + blurred color blobs.
// Sits behind all content (aria-hidden, pointer-events none).
export default function Background() {
  return (
    <div className="bg-decor" aria-hidden="true">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="grid-overlay" />
    </div>
  );
}
