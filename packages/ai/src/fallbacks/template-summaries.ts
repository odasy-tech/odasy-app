import type { MissionRecapInput } from '../use-cases/generate-mission-recap.js';
import type { SummarizeProgressInput } from '../use-cases/summarize-progress.js';

export function fallbackProgressSummary(input: SummarizeProgressInput): string {
  if (input.recentCheckinCount === 0) {
    return `${input.displayName}, your next adventure is waiting — start a mission to earn your first stamp.`;
  }
  const places = input.recentPlaceNames.slice(0, 3).join(', ');
  return `${input.displayName} explored ${input.recentCheckinCount} places recently${places ? ` including ${places}` : ''}. Keep going!`;
}

export function fallbackMissionRecap(input: MissionRecapInput): string {
  return `${input.displayName} completed "${input.mission.title}" and earned ${input.mission.xpReward} XP. A chapter added to the passport.`;
}
