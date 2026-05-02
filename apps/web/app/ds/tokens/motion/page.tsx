'use client';

import { motion as m } from 'motion/react';
import { useState } from 'react';
import { duration, easing, easingPoints, motion as motionTokens } from '@odasy/ui/theme';
import { Card, Button } from '@odasy/ui/web';
import { ShowcaseSection } from '@/components/ds-showcase/section';

const EASING_DEMOS: { name: string; cssValue: string; ease: 'linear' | readonly [number, number, number, number] }[] = [
  { name: 'standard',  cssValue: easing.standard,  ease: easingPoints.standard },
  { name: 'entrance',  cssValue: easing.entrance,  ease: easingPoints.entrance },
  { name: 'exit',      cssValue: easing.exit,      ease: easingPoints.exit },
  { name: 'precise',   cssValue: easing.precise,   ease: easingPoints.precise },
  { name: 'narrative', cssValue: easing.narrative, ease: easingPoints.narrative },
  { name: 'linear',    cssValue: easing.linear,    ease: 'linear' },
];

export default function MotionPage() {
  const [tick, setTick] = useState(0);

  return (
    <ShowcaseSection
      eyebrow="Foundations · Motion"
      title="Motion system"
      description="Six durations × six easings. Keyframes named at the DS level so a single semantic name (ds-rise, ds-pulse, ds-sweep) ports across web and mobile."
    >
      <Card>
        <div className="flex items-center justify-between gap-6">
          <div>
            <h3
              className="text-[14px] uppercase tracking-[0.32em] text-[var(--color-ink-primary)]"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
            >
              Durations × easings
            </h3>
            <p
              className="mt-1 text-[12px] text-[var(--color-ink-secondary)]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Click to retrigger.
            </p>
          </div>
          <Button onClick={() => setTick((t) => t + 1)} size="sm">
            Replay
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {EASING_DEMOS.map((demo) => (
            <div
              key={demo.name}
              className="rounded-md border border-[var(--color-border-default)] p-4"
            >
              <div
                className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent-action)]"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
              >
                {demo.name}
              </div>
              <div className="text-[11px] text-[var(--color-ink-tertiary)] tabular-nums">
                {demo.cssValue}
              </div>
              <m.div
                key={`${demo.name}-${tick}`}
                className="mt-3 h-1 origin-left bg-[var(--color-accent-action)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: duration.base / 1000, ease: demo.ease }}
              />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3
          className="mb-4 text-[14px] uppercase tracking-[0.32em] text-[var(--color-ink-primary)]"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
        >
          Named keyframes
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {Object.entries(motionTokens.keyframes).map(([key, kf]) => (
            <div
              key={key}
              className="flex flex-col gap-2 rounded-md border border-[var(--color-border-default)] p-4"
            >
              <span
                className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent-action)]"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
              >
                {kf.name}
              </span>
              <span className="text-[11px] text-[var(--color-ink-tertiary)] tabular-nums">
                {kf.duration}ms
              </span>
            </div>
          ))}
        </div>
      </Card>
    </ShowcaseSection>
  );
}
