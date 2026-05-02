/**
 * Section divider — hairline with a violet pin centred. Pins pulses softly.
 */
export function AuroraDivider() {
  return (
    <div className="relative mx-auto flex max-w-5xl items-center justify-center py-20">
      <div className="aurora-rule flex-1" />
      <div className="relative mx-5 flex h-3 w-3 items-center justify-center">
        <span
          aria-hidden
          className="absolute h-2 w-2 rounded-full bg-[var(--color-aurora-deep)]"
        />
        <span
          aria-hidden
          className="absolute h-2 w-2 animate-aurora-pulse rounded-full bg-[var(--color-aurora-deep)]"
        />
      </div>
      <div className="aurora-rule flex-1" />
    </div>
  );
}
