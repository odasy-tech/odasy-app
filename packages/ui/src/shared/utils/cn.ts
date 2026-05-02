import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge any number of className inputs (strings, conditional objects,
 * arrays). Resolves conflicts using `tailwind-merge` so the last-wins
 * convention works across Tailwind utility classes.
 *
 * Use this in every DS component that accepts a `className` prop:
 *
 *     <button className={cn('default-classes', userClassName)} />
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
