import { typography } from '@odasy/ui/theme';
import { Card } from '@odasy/ui/web';
import { ShowcaseSection } from '@/components/ds-showcase/section';

export default function TypographyPage() {
  return (
    <ShowcaseSection
      eyebrow="Foundations · Typography"
      title="Type system"
      description={
        <>
          Two families — <em>Fraunces</em> (variable, with{' '}
          <code className="text-[var(--color-accent-action)]">SOFT</code>,{' '}
          <code className="text-[var(--color-accent-action)]">WONK</code> and{' '}
          <code className="text-[var(--color-accent-action)]">opsz</code> axes)
          for editorial weight, and <em>Geist</em> for body, labels, UI.
          Paired with a fluid scale (clamp at h2 and above) and tightly
          tracked metadata caps.
        </>
      }
    >
      <Card>
        <div className="flex flex-col gap-6">
          {(Object.entries(typography.scale) as [string, string][]).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col gap-2 border-b border-[var(--color-border-default)] pb-6 last:border-b-0"
            >
              <div
                className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-ink-secondary)] tabular-nums"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
              >
                {key} · {value}
              </div>
              <div
                style={{
                  fontFamily: key.match(/^(meta|micro|small|body|lead)$/)
                    ? 'var(--font-sans)'
                    : 'var(--font-display)',
                  fontSize: value,
                  lineHeight: typography.leading.tight,
                }}
                className="text-[var(--color-ink-primary)]"
              >
                The world is your adventure.
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3
          className="mb-4 text-[14px] uppercase tracking-[0.32em] text-[var(--color-ink-primary)]"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
        >
          Tracking & leading
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-2 text-[10px] uppercase tracking-[0.28em] text-[var(--color-ink-secondary)]">
              Tracking
            </div>
            {Object.entries(typography.tracking).map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between border-b border-[var(--color-border-subtle)] py-1.5">
                <span
                  className="text-[14px]"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    letterSpacing: v as string,
                  }}
                >
                  {k.toUpperCase()}
                </span>
                <span className="text-[10px] text-[var(--color-ink-tertiary)] tabular-nums">{v as string}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="mb-2 text-[10px] uppercase tracking-[0.28em] text-[var(--color-ink-secondary)]">
              Leading
            </div>
            {Object.entries(typography.leading).map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between border-b border-[var(--color-border-subtle)] py-1.5">
                <span className="text-[14px] text-[var(--color-ink-primary)]" style={{ fontFamily: 'var(--font-sans)' }}>
                  {k}
                </span>
                <span className="text-[10px] text-[var(--color-ink-tertiary)] tabular-nums">{v as number}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </ShowcaseSection>
  );
}
