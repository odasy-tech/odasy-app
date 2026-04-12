/**
 * Canonical model identifiers used across the AI layer.
 * Verified against the Vercel AI Gateway model list on 2026-04-11
 * (`curl https://ai-gateway.vercel.sh/v1/models`). Centralizing them here
 * makes it trivial to swap providers or bump versions.
 *
 * The Vercel AI Gateway is the default provider in the AI SDK, so these
 * strings are passed straight to `generateText({ model: ... })`.
 */
export const MODELS = {
  /** Fast and cheap — short summaries, recaps, tagging. */
  fast: 'anthropic/claude-haiku-4.5',
  /** Heavier reasoning — mission recommendations, personalization. */
  reasoning: 'anthropic/claude-sonnet-4.6',
  /** Embeddings for semantic recommendations (pgvector). */
  embedding: 'openai/text-embedding-3-small',
} as const;

export type ModelKey = keyof typeof MODELS;
