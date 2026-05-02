/**
 * Mobile colour shim — re-exports the legacy Nightfall palette from
 * `@odasy/ui/theme` so the existing screens keep their look while we
 * eliminate the duplicate literal table that lived here previously.
 *
 * Hito 7 (mobile UI rebuild) replaces these COLORS imports with the
 * Aurora `tokens` API in screens that get redesigned.
 */

import { nightfallColors } from '@odasy/ui/theme';

export const COLORS = nightfallColors;
