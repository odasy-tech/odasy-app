/**
 * Odasy shadows — theme-aware, restrained, never decorative.
 *
 * The editorial voice favours hairlines over shadows. We define just
 * five elevation levels:
 *
 *   none    — no shadow (most surfaces)
 *   inset   — pressed / sunken state, subtle inner highlight
 *   raised  — cards lifting from paper
 *   hover   — interactive lift on hover
 *   modal   — overlays and dialog scrims
 *
 * Each elevation has a light + dark variant.
 */

interface ShadowSet {
  none: string;
  inset: string;
  raised: string;
  hover: string;
  modal: string;
}

export const lightShadows: ShadowSet = {
  none: 'none',
  inset: 'inset 0 1px 0 rgba(255, 255, 255, 1)',
  raised:
    '0 1px 0 rgba(255, 255, 255, 1) inset, 0 8px 24px -12px rgba(80, 70, 200, 0.18)',
  hover:
    '0 1px 0 rgba(255, 255, 255, 1) inset, 0 16px 36px -16px rgba(80, 70, 200, 0.32)',
  modal: '0 24px 64px -16px rgba(11, 10, 30, 0.32)',
};

export const darkShadows: ShadowSet = {
  none: 'none',
  inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
  raised:
    '0 1px 0 rgba(255, 255, 255, 0.04) inset, 0 12px 40px -16px rgba(0, 0, 0, 0.5)',
  hover:
    '0 1px 0 rgba(255, 255, 255, 0.06) inset, 0 24px 56px -16px rgba(0, 0, 0, 0.6)',
  modal: '0 32px 80px -20px rgba(0, 0, 0, 0.7)',
};

export const shadows = {
  light: lightShadows,
  dark: darkShadows,
} as const;

export type Shadows = ShadowSet;
export type ShadowKey = keyof ShadowSet;
