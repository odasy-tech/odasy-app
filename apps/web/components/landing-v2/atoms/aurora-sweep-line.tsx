/**
 * One-shot horizontal hairline that sweeps across the top of the viewport
 * when the page mounts — a printer's bar passing the platen, signalling
 * the dossier has just been freshly stamped.
 */
export function AuroraSweepLine() {
  return (
    <div
      aria-hidden
      className="aurora-sweep-line animate-aurora-sweep"
    />
  );
}
