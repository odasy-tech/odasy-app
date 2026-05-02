/**
 * Odasy motion — easings, durations, named keyframes.
 *
 * Motion philosophy:
 *   - Animations reward agency, not decoration. A check-in deserves a
 *     stamp. A button click does not.
 *   - One well-orchestrated page-load beats fifty micro-interactions.
 *   - Always honour `prefers-reduced-motion`.
 *
 * Token layers:
 *   • duration  — how long
 *   • easing    — what feels right
 *   • spring    — physics-based spring presets (Reanimated, Motion)
 *   • keyframe  — named choreographies portable across web + mobile
 */

/** Durations in milliseconds. Always pair with a named easing. */
export const duration = {
  /** 120ms — instant feedback (press, focus). */
  instant: 120,
  /** 200ms — fast UI state changes (toggle, tab). */
  fast: 200,
  /** 320ms — standard transitions (modal, sheet). */
  base: 320,
  /** 520ms — emphasis transitions (hero, page change). */
  slow: 520,
  /** 900ms — narrative reveals (text fade-in, stamp ceremony). */
  narrate: 900,
  /** 1400ms — epic moments (badge unlock, mission complete). */
  epic: 1400,
} as const;

/**
 * Easings — cubic-bezier formulas as CSS strings.
 * Each easing has a job. Use them by name, not by intuition.
 *
 * For libraries that don't accept `cubic-bezier(...)` strings (e.g. Motion
 * v12 wants `[x1, y1, x2, y2]` arrays), pair with `easingPoints`.
 */
export const easing = {
  /** General-purpose UI transitions. The default if you don't know. */
  standard: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
  /** Content arriving — overshoots into place. */
  entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
  /** Content leaving — accelerates away. */
  exit: 'cubic-bezier(0.7, 0, 0.84, 0)',
  /** Precise mechanical state change (toggle, checkmark). */
  precise: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Long, calm narrative arc (scroll-linked, hero reveals). */
  narrative: 'cubic-bezier(0.87, 0, 0.13, 1)',
  /** Linear — for continuous motion (rotation). */
  linear: 'linear',
} as const;

/**
 * Easings as `[x1, y1, x2, y2]` control point tuples.
 * Use these when the consuming library expects an array (Motion library
 * `transition.ease`, Reanimated `Easing.bezier(...)`).
 *
 * The `linear` slot is omitted because Motion accepts the literal string.
 */
export const easingPoints = {
  standard: [0.22, 0.61, 0.36, 1],
  entrance: [0.16, 1, 0.3, 1],
  exit: [0.7, 0, 0.84, 0],
  precise: [0.4, 0, 0.2, 1],
  narrative: [0.87, 0, 0.13, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>;

/**
 * Spring presets for physics-based animations.
 * Used by Motion (web) and Reanimated 4 (native).
 */
export const spring = {
  /** Soft, dampened — for cards lifting, hover states. */
  soft: { stiffness: 220, damping: 22, mass: 1 },
  /** Snappy — for buttons, toggles. */
  snappy: { stiffness: 280, damping: 20, mass: 0.8 },
  /** Bouncy — for celebrations (stamp lift, badge reveal). */
  bouncy: { stiffness: 240, damping: 14, mass: 0.9 },
  /** Stiff — for instant precision (focus rings). */
  stiff: { stiffness: 400, damping: 28, mass: 1 },
} as const;

/**
 * Named keyframes — portable choreographies.
 * Web emits these as @keyframes via codegen.
 * Native equivalents live next to the components that need them.
 */
export const keyframes = {
  /** Horizontal sweep across viewport — page load signature. */
  sweep: {
    name: 'ds-sweep',
    duration: 2600,
    easing: easing.precise,
    delay: 200,
    iterations: 1,
  },
  /** Fade + rise from below — for content reveals. */
  rise: {
    name: 'ds-rise',
    duration: 1000,
    easing: easing.entrance,
    delay: 0,
    iterations: 1,
  },
  /** Pulse outward — for active markers (map pin, divider dot). */
  pulse: {
    name: 'ds-pulse',
    duration: 2400,
    easing: 'ease-out',
    delay: 0,
    iterations: Infinity,
  },
  /** Slow rotation — compass roses, decorative loops. */
  rotate: {
    name: 'ds-rotate',
    duration: 240_000,
    easing: easing.linear,
    delay: 0,
    iterations: Infinity,
  },
  /** Breathing opacity — atmospheric backgrounds. */
  breathe: {
    name: 'ds-breathe',
    duration: 7000,
    easing: easing.standard,
    delay: 0,
    iterations: Infinity,
  },
  /** SVG path draw-in — contour lines, route reveals. */
  drawPath: {
    name: 'ds-draw-path',
    duration: 6000,
    easing: 'ease-out',
    delay: 0,
    iterations: 1,
  },
  /** Vertical scan from top to bottom — opener instrument. */
  scanDown: {
    name: 'ds-scan-down',
    duration: 2400,
    easing: 'ease-out',
    delay: 300,
    iterations: 1,
  },
} as const;

export const motion = {
  duration,
  easing,
  easingPoints,
  spring,
  keyframes,
} as const;

export type Motion = typeof motion;
export type Duration = keyof typeof duration;
export type Easing = keyof typeof easing;
export type Spring = keyof typeof spring;
export type KeyframeName = keyof typeof keyframes;
