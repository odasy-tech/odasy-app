/**
 * Pure XP and level calculations. No I/O, no DB, no side effects.
 * The same function runs on the server (after a check-in) and on the
 * client (for optimistic UI updates).
 */

export const XP_PER_CHECKIN = 10;
export const XP_PER_MISSION = {
  easy: 50,
  medium: 100,
  hard: 150,
} as const;

/**
 * Level thresholds. Entry N is the minimum XP required to reach level N+1.
 * Formula keeps the early game quick and the late game meaningful.
 */
const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500];

export function calculateLevel(xp: number): number {
  if (xp < 0) return 1;
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    const threshold = LEVEL_THRESHOLDS[i];
    if (threshold !== undefined && xp >= threshold) {
      level = i + 1;
    }
  }
  return level;
}

export function xpToNextLevel(xp: number): number | null {
  const currentLevel = calculateLevel(xp);
  const nextThreshold = LEVEL_THRESHOLDS[currentLevel];
  if (nextThreshold === undefined) return null; // Max level
  return nextThreshold - xp;
}

export function levelProgress(xp: number): number {
  const currentLevel = calculateLevel(xp);
  const currentThreshold = LEVEL_THRESHOLDS[currentLevel - 1] ?? 0;
  const nextThreshold = LEVEL_THRESHOLDS[currentLevel];
  if (nextThreshold === undefined) return 1;
  return (xp - currentThreshold) / (nextThreshold - currentThreshold);
}
