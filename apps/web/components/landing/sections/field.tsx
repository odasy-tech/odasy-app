'use client';

import { MetaLabel } from '@odasy/ui/web';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { useLocale } from '@/lib/i18n/locale-context';

export function Field() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLocale();

  return (
    <section
      id="chapter-field"
      ref={ref}
      className="relative mx-auto grid max-w-6xl gap-16 px-6 py-32 sm:px-12 sm:py-44 md:grid-cols-[1.1fr_1fr] md:gap-20"
    >
      {/* Left: schematic region */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative"
      >
        <div className="ds-card relative aspect-square w-full overflow-hidden p-7">
          <div className="ds-corners absolute inset-0">
            <span className="ds-corner tl" />
            <span className="ds-corner tr" />
            <span className="ds-corner bl" />
            <span className="ds-corner br" />
          </div>

          <div className="absolute left-7 top-7 z-10 flex flex-col gap-1">
            <MetaLabel tone="accent">{t.field.mapTitle}</MetaLabel>
            <span
              className="text-[9px] uppercase tracking-[0.32em] text-[var(--color-ink-tertiary)]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Quindío · Risaralda · Caldas
            </span>
          </div>

          {/* Catalogue mark — top-right (where no other HTML lives) */}
          <div
            className="absolute right-7 top-7 z-10 text-[9px] uppercase tracking-[0.32em] text-[var(--color-ink-tertiary)]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            N° I · MMXXVI
          </div>

          <svg viewBox="0 0 400 400" className="relative h-full w-full" aria-hidden>
            <defs>
              {/* Land tint — subtle violet wash for the territory */}
              <linearGradient id="landTint" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-info-base)" stopOpacity="0.06" />
                <stop offset="100%" stopColor="var(--color-accent-base)" stopOpacity="0.10" />
              </linearGradient>
              {/* Discovered area — warm amber centred on Salento */}
              <radialGradient id="warmZone" cx="63%" cy="71%" r="20%">
                <stop offset="0%" stopColor="var(--color-warm-base)" stopOpacity="0.28" />
                <stop offset="60%" stopColor="var(--color-warm-base)" stopOpacity="0.08" />
                <stop offset="100%" stopColor="var(--color-warm-base)" stopOpacity="0" />
              </radialGradient>
              {/* Region clip — discovered wash respects the land outline */}
              <clipPath id="regionClip">
                <path d="M 108 64
                         L 172 50
                         C 200 48, 224 52, 240 60
                         C 264 64, 280 70, 290 80
                         L 320 124
                         C 332 138, 340 148, 340 160
                         C 338 178, 334 192, 332 204
                         C 330 220, 326 232, 322 244
                         C 318 256, 314 264, 310 272
                         L 290 312
                         C 268 332, 250 344, 240 348
                         C 220 354, 200 356, 180 354
                         C 158 354, 140 348, 124 336
                         C 110 328, 100 318, 96 304
                         C 86 290, 80 274, 76 260
                         C 70 248, 66 234, 66 220
                         C 64 200, 62 184, 62 168
                         C 64 152, 70 134, 74 124
                         C 78 112, 84 100, 88 92
                         C 96 80, 102 70, 108 64 Z" />
              </clipPath>
            </defs>

            {/* === LAND — Eje Cafetero outer silhouette === */}
            <path
              d="M 108 64
                 L 172 50
                 C 200 48, 224 52, 240 60
                 C 264 64, 280 70, 290 80
                 L 320 124
                 C 332 138, 340 148, 340 160
                 C 338 178, 334 192, 332 204
                 C 330 220, 326 232, 322 244
                 C 318 256, 314 264, 310 272
                 L 290 312
                 C 268 332, 250 344, 240 348
                 C 220 354, 200 356, 180 354
                 C 158 354, 140 348, 124 336
                 C 110 328, 100 318, 96 304
                 C 86 290, 80 274, 76 260
                 C 70 248, 66 234, 66 220
                 C 64 200, 62 184, 62 168
                 C 64 152, 70 134, 74 124
                 C 78 112, 84 100, 88 92
                 C 96 80, 102 70, 108 64 Z"
              fill="url(#landTint)"
              stroke="var(--color-accent-action)"
              strokeOpacity="0.55"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Discovered warm zone — clipped to the land */}
            <g clipPath="url(#regionClip)">
              <rect x="0" y="0" width="400" height="400" fill="url(#warmZone)" />
            </g>

            {/* === Department borders (internal) — dashed hairlines === */}
            <g
              fill="none"
              stroke="var(--color-accent-action)"
              strokeOpacity="0.32"
              strokeWidth="0.7"
              strokeDasharray="3 2"
            >
              {/* Caldas / Risaralda */}
              <path d="M 64 178 C 130 168, 200 175, 264 168 L 338 174" />
              {/* Risaralda / Quindío */}
              <path d="M 70 264 C 140 256, 200 268, 260 258 L 326 268" />
            </g>

            {/* === Río Otún — sinuous blue thread crossing through Pereira === */}
            <path
              d="M 338 198
                 C 300 210, 260 218, 220 220
                 C 188 222, 140 232, 100 248
                 C 80 256, 70 268, 64 280"
              fill="none"
              stroke="var(--color-info-base)"
              strokeOpacity="0.42"
              strokeWidth="0.7"
              strokeLinecap="round"
            />

            {/* === Department labels — caps tracked, low alpha === */}
            <g
              fontFamily="var(--font-sans)"
              fontWeight="700"
              fill="var(--color-accent-action)"
              fillOpacity="0.34"
              letterSpacing="3"
            >
              <text x="180" y="100" fontSize="6">CALDAS</text>
              <text x="174" y="222" fontSize="6">RISARALDA</text>
              <text x="178" y="320" fontSize="6">QUINDÍO</text>
            </g>

            {/* === Trail — dashed line connecting discovered cities === */}
            <g
              fill="none"
              stroke="var(--color-accent-action)"
              strokeOpacity="0.55"
              strokeWidth="0.9"
              strokeDasharray="2.4 2.6"
              strokeLinecap="round"
            >
              {/* Salento → Armenia */}
              <path d="M 250 274 Q 220 286 188 290" />
              {/* Armenia → Pereira */}
              <path d="M 188 290 Q 170 256 170 220" />
              {/* Pereira → Manizales */}
              <path d="M 170 220 Q 200 178 220 138" />
            </g>

            {/* === GHOST PINS (undiscovered) — hollow dashed circles === */}
            {[
              { x: 244, y: 264, label: 'Filandia', tx: 252, ty: 263 },
              { x: 218, y: 286, label: 'Circasia', tx: 226, ty: 296 },
              { x: 274, y: 282, label: 'Cocora',   tx: 282, ty: 281 },
            ].map((p) => (
              <g key={p.label}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="2.4"
                  fill="none"
                  stroke="var(--color-ink-secondary)"
                  strokeOpacity="0.42"
                  strokeWidth="0.6"
                  strokeDasharray="0.8 1.2"
                />
                <text
                  x={p.tx}
                  y={p.ty}
                  fontSize="6.2"
                  fontFamily="var(--font-display)"
                  fontStyle="italic"
                  fill="var(--color-ink-secondary)"
                  fillOpacity="0.55"
                  letterSpacing="0.35"
                >
                  {p.label}
                </text>
              </g>
            ))}

            {/* === DISCOVERED PINS === */}
            {[
              { x: 220, y: 138, label: 'Manizales', tx: 228, ty: 137 },
              { x: 170, y: 220, label: 'Pereira',   tx: 178, ty: 219 },
              { x: 188, y: 290, label: 'Armenia',   tx: 196, ty: 295 },
            ].map((p) => (
              <g key={p.label}>
                {/* Subtle outer ring */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="6"
                  fill="none"
                  stroke="var(--color-accent-action)"
                  strokeOpacity="0.22"
                  strokeWidth="0.5"
                />
                {/* Solid pin */}
                <circle cx={p.x} cy={p.y} r="2.6" fill="var(--color-accent-action)" />
                {/* Label */}
                <text
                  x={p.tx}
                  y={p.ty}
                  fontSize="7.6"
                  fontFamily="var(--font-display)"
                  fontStyle="italic"
                  fill="var(--color-accent-action)"
                  fillOpacity="0.96"
                  letterSpacing="0.3"
                >
                  {p.label}
                </text>
              </g>
            ))}

            {/* === SALENTO — primary pin (active beachhead) === */}
            <g>
              {/* Pulse rings */}
              <circle cx="250" cy="274" r="22" stroke="var(--color-warm-base)" strokeOpacity="0.24" fill="none" strokeWidth="0.5" />
              <circle cx="250" cy="274" r="13" stroke="var(--color-warm-base)" strokeOpacity="0.5" fill="none" strokeWidth="0.7" />
              {/* Solid amber pin */}
              <circle cx="250" cy="274" r="4.2" fill="var(--color-warm-base)" />
              {/* Bright centre */}
              <circle cx="250" cy="274" r="1.6" fill="#FFFFFF" />
              {/* Star indicator above the pin */}
              <text x="250" y="261" textAnchor="middle" fontSize="6" fill="var(--color-warm-base)" fillOpacity="0.85">★</text>
              {/* Salento label — italic serif, prominent */}
              <text
                x="262" y="276"
                fontSize="10.2"
                fontFamily="var(--font-display)"
                fontStyle="italic"
                fill="var(--color-warm-base)"
                fontWeight="700"
                letterSpacing="0.4"
              >
                Salento
              </text>
              <text
                x="262" y="285"
                fontSize="3.4"
                fontFamily="var(--font-sans)"
                fontWeight="700"
                fill="var(--color-warm-base)"
                fillOpacity="0.78"
                letterSpacing="2.6"
              >
                BEACHHEAD · 01
              </text>
            </g>

            {/* === Compass rose — cartographic stamp top-right ===
             * Only chrome that lives inside the SVG. The corner coordinate
             * ticks were removed because the HTML overlays (title, sub-region
             * ticker, exploration progress) occupy the same corners. */}
            <g transform="translate(348 78)">
              <circle r="14" fill="var(--color-bg-surface)" fillOpacity="0.7" stroke="var(--color-accent-action)" strokeOpacity="0.32" strokeWidth="0.45" />
              <path d="M 0 -12 L 1.4 -2 L 0 -3.5 L -1.4 -2 Z" fill="var(--color-accent-action)" fillOpacity="0.85" />
              <path d="M 0 12 L 1.4 2 L 0 3.5 L -1.4 2 Z" fill="var(--color-accent-action)" fillOpacity="0.4" />
              <path d="M 12 0 L 2 1.4 L 3.5 0 L 2 -1.4 Z" fill="var(--color-accent-action)" fillOpacity="0.4" />
              <path d="M -12 0 L -2 1.4 L -3.5 0 L -2 -1.4 Z" fill="var(--color-accent-action)" fillOpacity="0.4" />
              <circle r="0.7" fill="var(--color-accent-action)" fillOpacity="0.85" />
              <text x="0" y="-15" fontSize="3.6" textAnchor="middle" fill="var(--color-accent-action)" fillOpacity="0.85" fontFamily="var(--font-display)" fontStyle="italic">N</text>
            </g>
          </svg>

          <div className="absolute bottom-7 left-7 z-10 flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-action)]" />
            <MetaLabel>{t.field.mapSubregions}</MetaLabel>
          </div>
          {/* Exploration progress — overlay communicating the "Living Map" pillar */}
          <div className="absolute bottom-7 right-7 z-10 flex flex-col items-end gap-1.5">
            <div
              className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-warm-base)]"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
            >
              Explorado · 18%
            </div>
            <div className="h-[3px] w-24 overflow-hidden rounded-full bg-[var(--color-border-default)]">
              <div
                className="h-full rounded-full bg-[var(--color-warm-base)]"
                style={{ width: '18%' }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right: manifesto */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
        className="flex flex-col justify-center"
      >
        <MetaLabel className="mb-8">{t.field.chapter}</MetaLabel>
        <h2
          className="leading-[1.04] tracking-[-0.025em] text-[var(--color-ink-primary)]"
          style={{
            fontSize: 'var(--text-h2)',
            fontFamily: 'var(--font-display)',
          }}
        >
          {t.field.heading}
        </h2>
        <p
          className="mt-7 text-base leading-[1.7] text-[var(--color-ink-secondary)] sm:text-lg"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {t.field.paragraph}
        </p>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[var(--color-border-default)] pt-10">
          {t.field.stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <div
                className="text-5xl leading-none tracking-[-0.02em] text-[var(--color-accent-action)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {s.value}
              </div>
              <MetaLabel>{s.label}</MetaLabel>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-soft)] px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent-action)]"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-action)]" />
            {t.field.now}
          </span>
          {t.field.roadmap.map((r) => (
            <span
              key={r}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-default)] px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-[var(--color-ink-secondary)]"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
            >
              <span aria-hidden>→</span>
              {r}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
