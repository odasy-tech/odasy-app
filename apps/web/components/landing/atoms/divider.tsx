/**
 * Section divider — hairline with a volt pin in the centre. Replaces the
 * generic `<hr>` with something that reads as "waypoint on a map".
 */
export function Divider() {
  return (
    <div className="relative mx-auto flex max-w-5xl items-center justify-center py-16">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ink-700 to-transparent" />
      <div
        className="mx-4 h-2 w-2 rounded-full"
        style={{
          background: 'var(--color-volt)',
          boxShadow:
            '0 0 12px color-mix(in srgb, var(--color-volt) 55%, transparent)',
        }}
      />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ink-700 to-transparent" />
    </div>
  );
}
