'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '../../shared/utils';
import { MetaLabel } from './meta-label';

export type PlaceCategory = 'coffee' | 'town' | 'viewpoint' | 'nature' | 'gastronomy' | 'culture';
export type PlaceStatus = 'discovered' | 'undiscovered' | 'wishlisted';

export interface PlaceCardProps {
  /** Place name. */
  name: string;
  /** Subregion / location (e.g. "Salento, Quindío"). */
  location: string;
  /** Optional editorial pull-quote or short description. */
  description?: ReactNode;
  /** Hero image URL. */
  imageUrl?: string;
  category: PlaceCategory;
  status?: PlaceStatus;
  /** Optional click handler. */
  onClick?: () => void;
  className?: string;
}

const CATEGORY_LABEL: Record<PlaceCategory, string> = {
  coffee: 'Café',
  town: 'Pueblo',
  viewpoint: 'Mirador',
  nature: 'Naturaleza',
  gastronomy: 'Gastronomía',
  culture: 'Cultura',
};

const STATUS_PILL: Record<PlaceStatus, { bg: string; text: string; label: string; dot: string }> = {
  discovered: {
    bg: 'bg-[var(--color-accent-soft)]',
    text: 'text-[var(--color-accent-action)]',
    dot: 'bg-[var(--color-accent-action)]',
    label: 'Descubierto',
  },
  undiscovered: {
    bg: 'bg-[var(--color-bg-muted)]',
    text: 'text-[var(--color-ink-tertiary)]',
    dot: 'bg-[var(--color-ink-tertiary)]',
    label: 'Por descubrir',
  },
  wishlisted: {
    bg: 'bg-[var(--color-warm-soft)]',
    text: 'text-[var(--color-warm-base)]',
    dot: 'bg-[var(--color-warm-base)]',
    label: 'Guardado',
  },
};

/**
 * Editorial place card — hero image, name, location, category chip,
 * optional description and status. Used in lists, recommendations,
 * and the planning/wishlist surfaces.
 */
export function PlaceCard({
  name,
  location,
  description,
  imageUrl,
  category,
  status = 'undiscovered',
  onClick,
  className,
}: PlaceCardProps) {
  const interactive = !!onClick;
  const statusPill = STATUS_PILL[status];
  return (
    <motion.div
      {...(interactive ? { whileHover: { y: -3 } } : {})}
      {...(interactive ? { onClick, role: 'button' as const, tabIndex: 0 } : {})}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      className={cn(
        'ds-card group relative flex flex-col overflow-hidden p-0',
        interactive && 'cursor-pointer',
        className,
      )}
    >
      {imageUrl ? (
        <div
          className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-bg-muted)]"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
          <span
            className={cn(
              'absolute left-3 top-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[9px] uppercase tracking-[0.28em]',
              statusPill.bg,
              statusPill.text,
            )}
            style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700 }}
          >
            <span className={cn('h-1.5 w-1.5 rounded-full', statusPill.dot)} />
            {statusPill.label}
          </span>
        </div>
      ) : null}

      <div className="flex flex-col gap-2 p-5 sm:p-6">
        <MetaLabel tone="accent">{CATEGORY_LABEL[category]}</MetaLabel>
        <h3
          className="text-[22px] leading-[1.18] text-[var(--color-ink-primary)]"
          style={{
            fontFamily: 'var(--font-family-display)',
            fontStyle: 'italic',
          }}
        >
          {name}
        </h3>
        <MetaLabel>{location}</MetaLabel>
        {description ? (
          <p
            className="mt-2 text-[13.5px] leading-[1.65] text-[var(--color-ink-secondary)]"
            style={{ fontFamily: 'var(--font-family-sans)' }}
          >
            {description}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}
