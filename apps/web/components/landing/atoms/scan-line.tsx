/**
 * One-shot volt scan line on page load. Sweeps down the viewport once,
 * hinting at "this is an instrument powering up". Pure CSS, no JS.
 */
export function ScanLine() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-px animate-scan-down"
      style={{
        background:
          'linear-gradient(to right, transparent, var(--color-volt) 50%, transparent)',
        boxShadow:
          '0 0 24px 2px color-mix(in srgb, var(--color-volt) 45%, transparent)',
      }}
    />
  );
}
