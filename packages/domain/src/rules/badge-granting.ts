import type { Badge, BadgeRule } from '../entities/badge';

/**
 * Snapshot of the signals needed to evaluate any badge rule.
 * The caller fetches these once and passes them in — rules stay pure.
 */
export interface UserSignals {
  checkinCount: number;
  missionCount: number;
  missionsCompletedByType: Record<string, number>;
  completedMissionIds: ReadonlySet<string>;
}

export function isBadgeEarned(rule: BadgeRule, signals: UserSignals): boolean {
  switch (rule.type) {
    case 'checkin_count':
      return signals.checkinCount >= rule.count;
    case 'mission_count':
      return signals.missionCount >= rule.count;
    case 'mission_type_completed':
      return (signals.missionsCompletedByType[rule.missionType] ?? 0) >= rule.count;
    case 'specific_mission':
      return signals.completedMissionIds.has(rule.missionId);
  }
}

export function evaluateBadges(
  badges: readonly Badge[],
  alreadyEarned: ReadonlySet<string>,
  signals: UserSignals,
): Badge[] {
  return badges.filter(
    (badge) =>
      badge.active &&
      !alreadyEarned.has(badge.id) &&
      isBadgeEarned(badge.rule, signals),
  );
}
