import type { Mission } from '@odasy/domain';
import type { RecommendMissionsInput } from '../use-cases/recommend-missions';

/**
 * Deterministic, dependency-free mission ranker used when the AI Gateway
 * is unavailable. Scores each mission by interest overlap plus a small
 * boost for featured missions. Never throws.
 */
export function fallbackMissionRanker(input: RecommendMissionsInput): Mission[] {
  const interests = new Set(input.interests);

  const scored = input.availableMissions.map((mission) => {
    const tagOverlap = mission.tags.filter((tag) => interests.has(tag)).length;
    const typeMatch = interests.has(mission.type) ? 1 : 0;
    const featuredBoost = mission.featured ? 0.5 : 0;
    return {
      mission,
      score: tagOverlap * 2 + typeMatch * 3 + featuredBoost,
    };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, input.limit)
    .map((entry) => entry.mission);
}
