/**
 * Odasy design tokens. Brand colors inspired by the Colombian Coffee Region:
 * earthy coffee browns, leaf greens, and a warm accent for achievements.
 */
export const odasyTokens = {
  colors: {
    // Brand
    odasyCoffee: '#6F4E37',
    odasyCoffeeLight: '#9B6A4A',
    odasyCoffeeDark: '#4A3325',

    odasyLeaf: '#228B22',
    odasyLeafLight: '#3FAA3F',
    odasyLeafDark: '#145214',

    odasyGold: '#D4A24C',
    odasyGoldLight: '#E8BD6E',

    // Semantic
    odasySuccess: '#16A34A',
    odasyWarning: '#F59E0B',
    odasyDanger: '#DC2626',
    odasyInfo: '#2563EB',
  },
  radii: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 9999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
} as const;

export type OdasyTokens = typeof odasyTokens;
