'use client';

import { tokens, palette as rawPalette } from '@odasy/ui/theme';
import { Card } from '@odasy/ui/web';
import { ShowcaseSection } from '@/components/ds-showcase/section';

function flatten(obj: Record<string, unknown>, prefix = ''): { key: string; value: string }[] {
  const out: { key: string; value: string }[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object') {
      out.push(...flatten(v as Record<string, unknown>, path));
    } else {
      out.push({ key: path, value: String(v) });
    }
  }
  return out;
}

function Swatch({ token, value }: { token: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="h-12 w-12 shrink-0 rounded border border-[var(--color-border-default)]"
        style={{ backgroundColor: value }}
      />
      <div className="min-w-0">
        <div
          className="text-[12px] font-semibold tracking-[0.02em] text-[var(--color-ink-primary)]"
          style={{ fontFamily: 'var(--font-family-sans)' }}
        >
          {token}
        </div>
        <div
          className="text-[11px] tabular-nums text-[var(--color-ink-secondary)]"
          style={{ fontFamily: 'var(--font-family-sans)' }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

export default function ColorsPage() {
  const lightTokens = flatten(tokens.light as unknown as Record<string, unknown>);
  const darkTokens = flatten(tokens.dark as unknown as Record<string, unknown>);
  const paletteFlat = flatten(rawPalette as unknown as Record<string, unknown>);

  return (
    <ShowcaseSection
      eyebrow="Foundations · Colors"
      title="Color tokens"
      description={
        <>
          Three layers: raw palette (left), semantic tokens (right), component
          tokens (in component pages). Every component reaches semantic tokens
          first; raw palette values appear only inside the token definitions.
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h3
            className="mb-4 text-[18px] uppercase tracking-[0.32em] text-[var(--color-ink-primary)]"
            style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700 }}
          >
            Light tokens
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {lightTokens.map((t) => (
              <Swatch key={t.key} token={t.key} value={t.value} />
            ))}
          </div>
        </Card>

        <Card>
          <h3
            className="mb-4 text-[18px] uppercase tracking-[0.32em] text-[var(--color-ink-primary)]"
            style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700 }}
          >
            Dark tokens
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {darkTokens.map((t) => (
              <Swatch key={t.key} token={t.key} value={t.value} />
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3
          className="mb-4 text-[18px] uppercase tracking-[0.32em] text-[var(--color-ink-primary)]"
          style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700 }}
        >
          Raw palette
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {paletteFlat.map((t) => (
            <Swatch key={t.key} token={t.key} value={t.value} />
          ))}
        </div>
      </Card>
    </ShowcaseSection>
  );
}
