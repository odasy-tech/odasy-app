/**
 * One-shot horizontal hairline that sweeps across the top of the
 * viewport on page load. The "instrument powering up" signature.
 *
 * The animation is defined as `@keyframes ds-sweep` and triggered via
 * the `.ds-animate-sweep` utility, both emitted by the codegen. Content
 * adapts to the active theme automatically through the
 * `.ds-sweep-line` token-driven gradient.
 */
export function SweepLine() {
  return (
    <div
      aria-hidden
      className="ds-sweep-line ds-animate-sweep"
    />
  );
}
