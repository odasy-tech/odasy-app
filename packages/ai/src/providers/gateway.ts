/**
 * Vercel AI Gateway notes.
 *
 * The gateway is the **default global provider** in the AI SDK, so we do
 * not need to wrap model IDs in a `gateway(...)` call — passing the string
 * (e.g. `'anthropic/claude-sonnet-4.6'`) directly to `generateText({ model })`
 * is enough. This file documents how auth is resolved.
 *
 * ## Authentication
 *
 * Two mutually exclusive paths, in preference order:
 *
 * 1. **OIDC (recommended for production on Vercel).** When deployed to
 *    Vercel, the runtime automatically exchanges an OIDC token for an AI
 *    Gateway credential — no secrets to rotate. Nothing to do here;
 *    Vercel injects it for you.
 *
 * 2. **`AI_GATEWAY_API_KEY` (required for local dev and non-Vercel runtimes).**
 *    Set it in `.env.local` (pull via `vercel env pull`). Used as a
 *    fallback when OIDC is unavailable.
 *
 * See https://vercel.com/docs/ai-gateway for the full auth model.
 */

export const AI_GATEWAY_ENV_VAR = 'AI_GATEWAY_API_KEY' as const;
