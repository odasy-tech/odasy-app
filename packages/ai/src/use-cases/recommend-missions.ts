import { generateText, Output } from 'ai';
import { z } from 'zod';
import type { Mission } from '@odasy/domain';
import { MODELS } from '../providers/models';
import { fallbackMissionRanker } from '../fallbacks/mission-ranker';

export interface RecommendMissionsInput {
  userId: string;
  interests: readonly string[];
  availableMissions: readonly Mission[];
  limit: number;
}

const AiRecommendationSchema = z.object({
  missionIds: z.array(z.string().uuid()),
  reasoning: z.string(),
});

export interface RecommendationResult {
  missions: Mission[];
  source: 'ai' | 'fallback';
  reasoning: string | null;
}

/**
 * Ranks and returns the most relevant missions for a user.
 *
 * Never throws. If the AI Gateway fails, falls back to a deterministic
 * rule-based ranker so the core product loop stays functional.
 */
export async function recommendMissions(
  input: RecommendMissionsInput,
): Promise<RecommendationResult> {
  try {
    const result = await generateText({
      model: MODELS.reasoning,
      output: Output.object({ schema: AiRecommendationSchema }),
      prompt: buildPrompt(input),
    });

    const byId = new Map(input.availableMissions.map((m) => [m.id, m]));
    const missions = result.output.missionIds
      .map((id) => byId.get(id as Mission['id']))
      .filter((m): m is Mission => m !== undefined)
      .slice(0, input.limit);

    return {
      missions,
      source: 'ai',
      reasoning: result.output.reasoning,
    };
  } catch {
    return {
      missions: fallbackMissionRanker(input),
      source: 'fallback',
      reasoning: null,
    };
  }
}

function buildPrompt(input: RecommendMissionsInput): string {
  return [
    `Rank the most relevant missions for explorer ${input.userId}.`,
    `Their interests: ${input.interests.join(', ') || 'unknown'}.`,
    `Available missions (JSON): ${JSON.stringify(input.availableMissions)}.`,
    `Return at most ${input.limit} mission IDs, ordered by relevance.`,
  ].join('\n');
}
