import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from 'tamagui';
import { odasyColors, odasyRadii } from './src/theme/tokens';

/**
 * Shared Tamagui config for mobile and web.
 *
 * Extends Tamagui's `defaultConfig/v4` with the Odasy "Nightfall & Volt"
 * palette. Colors are exposed as raw tokens — use them in components as
 * `backgroundColor="$ink950"`, `color="$bone"`, `borderColor="$volt"`.
 *
 * See `technical/DESIGN_SYSTEM.md` in odasy-docs for the full rationale.
 */
export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    // Tamagui v4 does not ship default `tokens.color` — we register all
    // brand colors here so `$ink950`, `$volt`, `$bone`, ... are usable globally.
    color: odasyColors,
    radius: {
      ...defaultConfig.tokens.radius,
      ...odasyRadii,
    },
  },
  themes: {
    ...defaultConfig.themes,
    // Odasy dark is the default — pasa ink950 como fondo y bone como texto.
    dark_odasy: {
      ...defaultConfig.themes.dark,
      background: odasyColors.ink950,
      backgroundHover: odasyColors.ink900,
      backgroundPress: odasyColors.ink800,
      backgroundFocus: odasyColors.ink800,
      color: odasyColors.bone,
      colorHover: odasyColors.bone,
      colorPress: odasyColors.bone,
      borderColor: odasyColors.ink700,
      borderColorHover: odasyColors.volt,
      placeholderColor: odasyColors.boneDim,
    },
  },
});

export type OdasyTamaguiConfig = typeof tamaguiConfig;

// Module augmentation for Tamagui lives per-app (e.g. apps/mobile/tamagui.d.ts)
// so that TypeScript inside each app picks up our custom tokens, themes, and
// color shortcuts. Declaring it here does not propagate across workspace boundaries.

export default tamaguiConfig;
