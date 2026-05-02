/**
 * generate-css-tokens.ts
 *
 * Reads the canonical TypeScript token sources in `src/theme/` and emits a
 * single CSS file (`src/web/styles/tokens.generated.css`) consumed by web
 * apps via Tailwind 4's `@theme` block + a `.ds-dark` override scope.
 *
 * Run via:
 *   pnpm --filter @odasy/ui gen:tokens
 *
 * The output is always machine-generated. Do not hand-edit the file
 * the script produces — change the source TS instead and re-run.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  duration,
  easing,
  fonts,
  keyframes,
  leading,
  lightTokens,
  darkTokens,
  radii,
  scale,
  spacing,
  tracking,
  weight,
  lightShadows,
  darkShadows,
} from '../src/theme/index.js';

// Resolve repo paths relative to this script.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUTPUT = resolve(__dirname, '../src/web/styles/tokens.generated.css');

/**
 * Flattens a nested token tree into kebab-case CSS variables.
 *
 * Example:
 *   { bg: { canvas: '#FFF' } } → '--color-bg-canvas: #FFF;'
 */
function flatten(
  prefix: string,
  obj: Record<string, unknown>,
  depth = 0,
): string[] {
  const out: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const cssKey = `${prefix}-${camelToKebab(key)}`;
    if (value && typeof value === 'object' && depth < 5) {
      out.push(...flatten(cssKey, value as Record<string, unknown>, depth + 1));
    } else {
      out.push(`  ${cssKey}: ${value};`);
    }
  }
  return out;
}

function camelToKebab(s: string): string {
  return s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Emits the @theme block (Tailwind 4) with all canonical tokens for the
 * light theme, plus :root html/body defaults and the `.ds-dark` scope.
 */
function build(): string {
  const lines: string[] = [];

  lines.push('/**');
  lines.push(' * Odasy Design System — generated CSS tokens.');
  lines.push(' *');
  lines.push(' * AUTO-GENERATED. Do not edit by hand.');
  lines.push(' * Source of truth: packages/ui/src/theme/*.ts');
  lines.push(' * Regenerate: pnpm --filter @odasy/ui gen:tokens');
  lines.push(' */');
  lines.push('');

  /* ─── @theme: light defaults + scale + motion ─────────────────── */
  lines.push('@theme {');
  // Color tokens (light)
  lines.push(...flatten('--color', lightTokens));
  // Shadows (light)
  for (const [key, value] of Object.entries(lightShadows)) {
    lines.push(`  --shadow-${camelToKebab(key)}: ${value};`);
  }
  // Typography
  lines.push(`  --font-family-display: ${fonts.display.web};`);
  lines.push(`  --font-family-sans: ${fonts.sans.web};`);
  for (const [key, value] of Object.entries(scale)) {
    lines.push(`  --text-${camelToKebab(key)}: ${value};`);
  }
  for (const [key, value] of Object.entries(weight)) {
    lines.push(`  --font-weight-${camelToKebab(key)}: ${value};`);
  }
  for (const [key, value] of Object.entries(tracking)) {
    lines.push(`  --tracking-${camelToKebab(key)}: ${value};`);
  }
  for (const [key, value] of Object.entries(leading)) {
    lines.push(`  --leading-${camelToKebab(key)}: ${value};`);
  }
  // Spacing
  for (const [key, value] of Object.entries(spacing)) {
    lines.push(`  --spacing-${key}: ${value};`);
  }
  // Radii
  for (const [key, value] of Object.entries(radii)) {
    lines.push(`  --radius-${camelToKebab(key)}: ${value};`);
  }
  // Motion durations + easings
  for (const [key, value] of Object.entries(duration)) {
    lines.push(`  --duration-${camelToKebab(key)}: ${value}ms;`);
  }
  for (const [key, value] of Object.entries(easing)) {
    lines.push(`  --ease-${camelToKebab(key)}: ${value};`);
  }
  lines.push('}');
  lines.push('');

  /* ─── .ds-dark: dark mode overrides ───────────────────────────── */
  lines.push('/* Dark mode — applied to <html class="ds-dark"> or any subtree. */');
  lines.push('.ds-dark {');
  lines.push(...flatten('--color', darkTokens));
  for (const [key, value] of Object.entries(darkShadows)) {
    lines.push(`  --shadow-${camelToKebab(key)}: ${value};`);
  }
  lines.push('}');
  lines.push('');

  /* ─── Page defaults + selection ───────────────────────────────── */
  lines.push('html, body {');
  lines.push('  background-color: var(--color-bg-canvas);');
  lines.push('  color: var(--color-ink-primary);');
  lines.push('  font-family: var(--font-family-sans);');
  lines.push('  -webkit-font-smoothing: antialiased;');
  lines.push('  -moz-osx-font-smoothing: grayscale;');
  lines.push('  text-rendering: optimizeLegibility;');
  lines.push('}');
  lines.push('');
  lines.push('::selection {');
  lines.push('  background-color: var(--color-selection-bg);');
  lines.push('  color: var(--color-selection-fg);');
  lines.push('}');
  lines.push('');

  /* ─── Keyframes ────────────────────────────────────────────────── */
  lines.push('/* ─── Named keyframes — every motion choreography lives here ── */');
  lines.push('');
  for (const [, kf] of Object.entries(keyframes)) {
    lines.push(emitKeyframe(kf.name));
    lines.push('');
  }

  /* ─── Reduced-motion guard ────────────────────────────────────── */
  lines.push('@media (prefers-reduced-motion: reduce) {');
  lines.push('  *, *::before, *::after {');
  lines.push('    animation-duration: 0.001ms !important;');
  lines.push('    animation-iteration-count: 1 !important;');
  lines.push('    transition-duration: 0.001ms !important;');
  lines.push('  }');
  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

/** Emits the @keyframes definition for a named choreography. */
function emitKeyframe(name: string): string {
  const map: Record<string, string> = {
    'ds-sweep': `@keyframes ds-sweep {
  0%   { transform: translateX(-100%); opacity: 0; }
  10%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}`,
    'ds-rise': `@keyframes ds-rise {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}`,
    'ds-pulse': `@keyframes ds-pulse {
  0%, 100% { transform: scale(1);   opacity: 0.7; }
  50%      { transform: scale(1.6); opacity: 0;   }
}`,
    'ds-rotate': `@keyframes ds-rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}`,
    'ds-breathe': `@keyframes ds-breathe {
  0%, 100% { opacity: 0.18; }
  50%      { opacity: 0.32; }
}`,
    'ds-draw-path': `@keyframes ds-draw-path {
  from { stroke-dashoffset: var(--dash-length, 2000); }
  to   { stroke-dashoffset: 0; }
}`,
    'ds-scan-down': `@keyframes ds-scan-down {
  0%   { transform: translateY(-100vh); opacity: 0; }
  15%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { transform: translateY(100vh);  opacity: 0; }
}`,
  };
  return map[name] ?? `/* missing keyframe: ${name} */`;
}

/* ─── Run ─────────────────────────────────────────────────────────── */
const css = build();
mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, css, 'utf8');
console.log(`✓ tokens generated → ${OUTPUT}`);
console.log(`  ${css.split('\n').length} lines, ${css.length} bytes`);
