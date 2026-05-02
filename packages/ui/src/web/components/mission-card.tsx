'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '../../shared/utils';
import { MetaLabel } from './meta-label';

export type MissionStatus = 'available' | 'in-progress' | 'completed' | 'locked';
export type MissionType = 'exploration' | 'coffee' | 'nature' | 'town' | 'culture' | 'gastronomy';
export type MissionDifficulty = 1 | 2 | 3 | 4 | 5;

export interface MissionCardProps {
  /** Editorial title of the mission. */
  title: string;
  /** Short narrative description. */
  description?: ReactNode;
  type: MissionType;
  difficulty: MissionDifficulty;
  status: MissionStatus;
  /** Optional location label (e.g. "Salento · Quindío"). */
  location?: string;
  /** Optional reward chip text (e.g. "+150 XP"). */
  reward?: string;
  /** Number of completed steps (when in-progress). */
  stepsDone?: number;
  /** Total steps. */
  stepsTotal?: number;
  /** Click handler — wraps the whole card. */
  onClick?: () => void;
  className?: string;
}

const TYPE_LABELS: Record<MissionType, string> = {
  exploration: 'Exploración',
  coffee: 'Café',
  nature: 'Naturaleza',
  town: 'Pueblo',
  culture: 'Cultura',
  gastronomy: 'Gastronomía',
};

const STATUS_TONE: Record<MissionStatus, { bg: string; text: string; label: string }> = {
  available: {
    bg: 'bg-[var(--color-bg-elevated)]',
    text: 'text-[var(--color-ink-secondary)]',
    label: 'Disponible',
  },
  'in-progress': {
    bg: 'bg-[var(--color-accent-soft)]',
    text: 'text-[var(--color-accent-action)]',
    label: 'En curso',
  },
  completed: {
    bg: 'bg-[var(--color-nature-soft)]',
    text: 'text-[var(--color-nature-base)]',
    label: 'Completada',
  },
  locked: {
    bg: 'bg-[var(--color-bg-muted)]',
    text: 'text-[var(--color-ink-tertiary)]',
    label: 'Bloqueada',
  },
};

/**
 * Mission card — editorial title + type + difficulty + progress + reward.
 *
 * Difficulty is shown as 1-5 filled diamonds (★★★☆☆). Status maps to a
 * tonal pill. Optional progress indicator when `stepsDone`/`stepsTotal`
 * are provided.
 */
export function MissionCard({
  title,
  description,
  type,
  difficulty,
  status,
  location,
  reward,
  stepsDone,
  stepsTotal,
  onClick,
  className,
}: MissionCardProps) {
  const interactive = !!onClick && status !== 'locked';
  const statusStyle = STATUS_TONE[status];

  return (
    <motion.div
      {...(interactive ? { whileHover: { y: -3 } } : {})}
      {...(interactive ? { onClick, role: 'button' as const, tabIndex: 0 } : {})}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      className={cn(
        'ds-card relative flex flex-col gap-4 p-6 sm:p-7',
        interactive && 'cursor-pointer transition-shadow hover:shadow-[var(--shadow-hover)]',
        status === 'locked' && 'opacity-70',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <MetaLabel tone="accent">{TYPE_LABELS[type]}</MetaLabel>
        <span
          aria-label={`Dificultad ${difficulty}`}
          className="text-[12px] tracking-[0.4em] text-[var(--color-warm-base)]"
          style={{ fontFamily: 'var(--font-family-sans)' }}
        >
          {Array.from({ length: 5 })
            .map((_, i) => (i < difficulty ? '★' : '☆'))
            .join('')}
        </span>
      </div>

      <h3
        className="text-[24px] leading-[1.15] tracking-[-0.005em] text-[var(--color-ink-primary)]"
        style={{
          fontFamily: 'var(--font-family-display)',
          fontStyle: 'italic',
        }}
      >
        {title}
      </h3>

      {description ? (
        <p
          className="text-[14px] leading-[1.65] text-[var(--color-ink-secondary)]"
          style={{ fontFamily: 'var(--font-family-sans)' }}
        >
          {description}
        </p>
      ) : null}

      {location ? <MetaLabel>{location}</MetaLabel> : null}

      {/* Progress (in-progress missions) */}
      {status === 'in-progress' && stepsDone != null && stepsTotal != null ? (
        <div className="mt-1 flex items-center gap-3">
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-[var(--color-border-default)]">
            <div
              className="h-full bg-[var(--color-accent-action)]"
              style={{ width: `${(stepsDone / stepsTotal) * 100}%` }}
            />
          </div>
          <span
            className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent-action)] tabular-nums"
            style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700 }}
          >
            {stepsDone} / {stepsTotal}
          </span>
        </div>
      ) : null}

      <div className="mt-auto flex items-center justify-between gap-3 pt-2">
        <span
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em]',
            statusStyle.bg,
            statusStyle.text,
          )}
          style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 600 }}
        >
          {statusStyle.label}
        </span>
        {reward ? (
          <span
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-warm-soft)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-warm-base)]"
            style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-warm-base)]" />
            {reward}
          </span>
        ) : null}
      </div>
    </motion.div>
  );
}
