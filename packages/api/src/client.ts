import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from './root.js';

/** Strongly typed inputs for every procedure in the app router. */
export type RouterInputs = inferRouterInputs<AppRouter>;
/** Strongly typed outputs for every procedure in the app router. */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export type { AppRouter };
