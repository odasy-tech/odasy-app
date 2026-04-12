/**
 * tRPC request context. Populated by the Next.js route handler on every
 * incoming call and injected into every procedure through `ctx`.
 *
 * Keep this interface narrow — it is the contract between the transport
 * layer (Next.js) and the router.
 */
export interface Context {
  /** Authenticated Clerk user, null for public endpoints. */
  user: { id: string; email: string | null } | null;
  /** Request headers, useful for rate limiting and diagnostics. */
  headers: Headers;
}

export async function createTRPCContext(opts: {
  headers: Headers;
  user: Context['user'];
}): Promise<Context> {
  return {
    user: opts.user,
    headers: opts.headers,
  };
}
