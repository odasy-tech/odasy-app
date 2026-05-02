/**
 * Decorative ruler ticks at the left + right page margins, evoking an
 * architect's drafting page. Pure CSS, fixed to the viewport, hidden
 * below `xl` so it doesn't fight content on small screens.
 */
export function PageEdges() {
  return (
    <>
      {/* left ruler */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 left-3 z-10 hidden w-3 xl:block"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, var(--color-border-default) 0 1px, transparent 1px 24px)',
          opacity: 0.55,
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      />
      {/* right ruler */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 right-3 z-10 hidden w-3 xl:block"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, var(--color-border-default) 0 1px, transparent 1px 24px)',
          opacity: 0.55,
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      />
    </>
  );
}
