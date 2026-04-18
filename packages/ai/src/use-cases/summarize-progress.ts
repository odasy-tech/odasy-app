import { generateText } from 'ai';
import { MODELS } from '../providers/models';
import { fallbackProgressSummary } from '../fallbacks/template-summaries';

export interface SummarizeProgressInput {
  userId: string;
  displayName: string;
  recentCheckinCount: number;
  recentMissionCount: number;
  recentPlaceNames: readonly string[];
}

export interface SummaryResult {
  content: string;
  source: 'ai' | 'fallback';
}

export async function summarizeProgress(
  input: SummarizeProgressInput,
): Promise<SummaryResult> {
  try {
    const { text } = await generateText({
      model: MODELS.fast,
      prompt: [
        `Write a short, upbeat one-paragraph summary (max 40 words) of this explorer's recent adventure:`,
        `Name: ${input.displayName}`,
        `Places visited recently: ${input.recentPlaceNames.join(', ')}`,
        `Check-ins: ${input.recentCheckinCount}, missions: ${input.recentMissionCount}`,
      ].join('\n'),
    });
    return { content: text, source: 'ai' };
  } catch {
    return { content: fallbackProgressSummary(input), source: 'fallback' };
  }
}
