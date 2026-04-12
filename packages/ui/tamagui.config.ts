import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from 'tamagui';
import { odasyTokens } from './src/theme/tokens.js';

/**
 * Shared Tamagui config for both mobile (apps/mobile) and web (apps/admin,
 * apps/web). Keep this as the single source of truth for the design system.
 *
 * Version pinned to Tamagui 1.144.4 — see technical/STACK.md §5 for the
 * rationale on staying on 1.x until 2.0 reaches GA.
 */
export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    color: {
      ...defaultConfig.tokens.color,
      ...odasyTokens.colors,
    },
  },
});

export type OdasyTamaguiConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends OdasyTamaguiConfig {}
}

export default tamaguiConfig;
