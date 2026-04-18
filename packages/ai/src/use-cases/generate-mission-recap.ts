import { generateText } from 'ai';
import type { Mission } from '@odasy/domain';
import { MODELS } from '../providers/models';
import { fallbackMissionRecap } from '../fallbacks/template-summaries';

export interface MissionRecapInput {
  displayName: string;
  mission: Mission;
  placeNames: readonly string[];
}

export interface RecapResult {
  content: string;
  source: 'ai' | 'fallback';
}

export async function generateMissionRecap(
  input: MissionRecapInput,
): Promise<RecapResult> {
  try {
    const { text } = await generateText({
      model: MODELS.fast,
      prompt: [
        `Write a celebratory 2-sentence recap of a completed mission for ${input.displayName}.`,
        `Mission: ${input.mission.title}`,
        `Places visited: ${input.placeNames.join(', ')}`,
      ].join('\n'),
    });
    return { content: text, source: 'ai' };
  } catch {
    return { content: fallbackMissionRecap(input), source: 'fallback' };
  }
}
