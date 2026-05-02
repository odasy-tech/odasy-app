import { radii, spacing } from '@odasy/ui/theme';
import { Card } from '@odasy/ui/web';
import { ShowcaseSection } from '@/components/ds-showcase/section';

export default function SpacingPage() {
  return (
    <ShowcaseSection
      eyebrow="Foundations · Spacing & radii"
      title="Spacing scale"
      description="4-pixel base, generous editorial vertical rhythm. Radii are kept square by default — rounded surfaces are reserved for chips, pills, avatars."
    >
      <Card>
        <div className="flex flex-col gap-3">
          {(Object.entries(spacing) as [string, string][]).map(([k, v]) => (
            <div key={k} className="flex items-center gap-4">
              <span
                className="w-12 shrink-0 text-right text-[12px] uppercase tracking-[0.22em] text-[var(--color-ink-secondary)] tabular-nums"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
              >
                {k}
              </span>
              <div className="h-3 bg-[var(--color-accent-action)]" style={{ width: v }} />
              <span className="text-[11px] text-[var(--color-ink-tertiary)] tabular-nums">{v}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3
          className="mb-4 text-[14px] uppercase tracking-[0.32em] text-[var(--color-ink-primary)]"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
        >
          Radii
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(Object.entries(radii) as [string, string][]).map(([k, v]) => (
            <div key={k} className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 bg-[var(--color-accent-soft)] border border-[var(--color-accent-action)]"
                style={{ borderRadius: v }}
              />
              <div className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-ink-secondary)] tabular-nums">
                {k} · {v}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </ShowcaseSection>
  );
}
