# Consuming `@odasy/ui`

A practical guide for Odasy app authors. Pair with `README.md` for the why;
this file is the cheat sheet for the day-to-day how.

## Web (apps/web)

### One-time setup

In `apps/web/app/globals.css`:

```css
@import "tailwindcss";
@import "@odasy/ui/styles/tokens.css";       /* generated CSS variables */
@import "@odasy/ui/styles/utilities.css";    /* .ds-paper, .ds-card, etc */
```

In `apps/web/app/layout.tsx` (or any root that needs the provider):

```tsx
import { ThemeProvider } from '@odasy/ui/web';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Daily imports

```tsx
import { Button, Card, MetaLabel, Stamp, useTheme } from '@odasy/ui/web';
import { tokens, motion, spacing } from '@odasy/ui/theme';
```

### Common patterns

```tsx
// Editorial card
<Card cornerTicks>
  <MetaLabel tone="accent">Capítulo IV · El artefacto</MetaLabel>
  <h2>Cada sello se gana.</h2>
</Card>

// Mission card
<MissionCard
  title="Ruta del Sabor"
  type="gastronomy"
  difficulty={4}
  status="in-progress"
  stepsDone={3}
  stepsTotal={5}
  reward="+150 XP"
  onClick={() => router.push('/missions/flavour')}
/>
```

### Tailwind classes vs DS tokens

Prefer DS arbitrary-value classes over inventing your own:

```tsx
// ✅ semantic, theme-aware
<div className="bg-[var(--color-bg-surface)] text-[var(--color-ink-primary)]" />

// ❌ avoid hard-coded hex
<div className="bg-[#FFFFFF]" />
```

Common token names:

| Concept | Variable |
|---|---|
| Page background | `--color-bg-canvas` |
| Card surface | `--color-bg-surface` |
| Body text | `--color-ink-primary` |
| Secondary text | `--color-ink-secondary` |
| Primary action | `--color-accent-action` |
| Soft accent bg | `--color-accent-soft` |
| Border | `--color-border-default` |

## Mobile (apps/mobile)

### One-time setup

In `apps/mobile/src/providers/AppProviders.tsx`:

```tsx
import { ThemeProvider as DSThemeProvider } from '@odasy/ui/native';

export function AppProviders({ children }) {
  return (
    <DSThemeProvider defaultTheme="system">
      {/* …your other providers… */}
      {children}
    </DSThemeProvider>
  );
}
```

### Daily imports

```tsx
import { Button, Card, Input, MetaLabel, useTheme } from '@odasy/ui/native';
import { tokens, motion, spacing } from '@odasy/ui/theme';
```

### Reading tokens in styles

```tsx
import { useTheme } from '@odasy/ui/native';

function MyScreen() {
  const { tokens } = useTheme();
  return (
    <View style={{ backgroundColor: tokens.bg.canvas, padding: 24 }}>
      <Text style={{ color: tokens.ink.primary }}>Hola explorador.</Text>
    </View>
  );
}
```

## Anti-patterns

❌ Don't reach into `@odasy/ui` internals (e.g. `@odasy/ui/src/...`). Always go
through the public `exports` map.

❌ Don't hard-code colours. If you find yourself typing a hex literal, you are
adding tech debt.

❌ Don't add a new component to `apps/*/components/` if the same need will recur
elsewhere — promote it into `@odasy/ui` instead.

## Regenerating CSS tokens

After changing anything in `packages/ui/src/theme/`:

```sh
pnpm --filter @odasy/ui gen:tokens
```

The generated file lives at `packages/ui/src/web/styles/tokens.generated.css`
and is committed (so consumers don't need to regenerate to install).

## Migrating off the legacy Nightfall palette

The original `/` landing on `apps/web` and the current mobile screens still use
the Nightfall palette via `@odasy/ui/theme/legacy.ts`. New work should always
use the Aurora tokens from `@odasy/ui/theme`. The plan is to retire the legacy
palette once all surfaces have migrated.
