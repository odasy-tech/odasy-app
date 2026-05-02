'use client';

import { useEffect, useState } from 'react';
import { useAuroraTheme } from '../lib/theme-context';

interface ChapterEntry {
  id: string;
  roman: string;
  label: string;
}

const CHAPTERS: ChapterEntry[] = [
  { id: 'chapter-premise',    roman: 'I',   label: 'Premisa'      },
  { id: 'chapter-explorer',   roman: '·',   label: 'Identidad'    },
  { id: 'chapter-apparatus',  roman: 'II',  label: 'Instrumental' },
  { id: 'chapter-field',      roman: 'III', label: 'Campo'        },
  { id: 'chapter-artifact',   roman: 'IV',  label: 'Artefacto'    },
  { id: 'chapter-expedition', roman: 'V',   label: 'Expedición'   },
];

/**
 * Right-edge chapter rail — a hairline track with stations.
 *
 *      I   ◯ ╴
 *      ·   ◯ ╴
 *     II   ◯ ╴
 *    III   ◯ ╴
 *  CAMPO  IV  ●           ← active station: filled + halo, label expanded
 *      V   ◯ ╴
 *
 * No frosted container, no pill — the rail is text + dots floating
 * directly on the page. Theme- and section-aware: when the user is over
 * Expedition (the inverted-contrast band), the rail flips its palette so
 * it reads as the *opposite* of the band beneath it. A discreet drop
 * shadow on the dot text keeps single-pixel strokes legible during the
 * cross-fade between sections.
 */
export function AuroraChapterRail() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const { theme } = useAuroraTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length === 0) return;
        const topMost = visibleEntries.sort(
          (a, b) =>
            Math.abs(a.boundingClientRect.top) -
            Math.abs(b.boundingClientRect.top),
        )[0];
        if (topMost) setActiveId(topMost.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Inverted contrast mode for Expedition — the only section whose
  // surface is the inverse of the surrounding theme.
  const inverted = activeId === 'chapter-expedition';

  // Whether the rail is currently sitting over a *light* surface or a
  // *dark* surface — derived from theme + inverted-section state.
  const onLightSurface =
    (theme === 'light' && !inverted) || (theme === 'dark' && inverted);

  const inkColor    = onLightSurface ? '#1A1830'                : '#F0EEF8';
  const muteColor   = onLightSurface ? 'rgba(26,24,48,0.42)'   : 'rgba(240,238,248,0.45)';
  const dimColor    = onLightSurface ? 'rgba(26,24,48,0.22)'   : 'rgba(240,238,248,0.22)';
  const accentColor = onLightSurface ? '#5046C8'                : '#D4DAFF';
  const accentGlow  = onLightSurface ? 'rgba(80,70,200,0.32)'  : 'rgba(212,218,255,0.55)';
  // Subtle text shadow keeps the hairline track + dots legible during
  // the colour cross-fade between sections.
  const textShadow  = onLightSurface
    ? '0 1px 0 rgba(255,255,255,0.45)'
    : '0 1px 2px rgba(0,0,0,0.25)';

  return (
    <nav
      aria-label="Capítulos"
      className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translate(${visible ? '0' : '8px'}, -50%)`,
        transition: 'opacity 0.45s ease, transform 0.45s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <ol className="relative flex flex-col gap-4 py-1 pr-2.5">
        {/* Vertical hairline track — runs through the centre of every dot */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-3 bottom-3 w-px"
          style={{
            right: '5px',
            backgroundColor: dimColor,
            transition: 'background-color 0.4s ease',
          }}
        />

        {CHAPTERS.map((c) => {
          const isActive = c.id === activeId;
          const isHover = c.id === hoverId;
          const showLabel = isActive || isHover;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={isActive ? 'true' : undefined}
                onMouseEnter={() => setHoverId(c.id)}
                onMouseLeave={() => setHoverId(null)}
                className="flex items-center justify-end gap-2.5"
                style={{
                  fontFamily: 'var(--font-family-aurora-sans)',
                  fontWeight: isActive ? 700 : 500,
                  textShadow,
                  transition: 'color 0.25s ease',
                }}
              >
                {/* Label — collapses to 0 width when neither active nor hovered */}
                <span
                  className="overflow-hidden whitespace-nowrap text-[10px] uppercase tracking-[0.32em]"
                  style={{
                    maxWidth: showLabel ? '140px' : '0px',
                    opacity: showLabel ? 1 : 0,
                    color: isActive ? accentColor : inkColor,
                    transition:
                      'max-width 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, color 0.25s ease',
                  }}
                >
                  {c.label}
                </span>

                {/* Roman numeral */}
                <span
                  className="tabular-nums"
                  style={{
                    fontFamily: 'var(--font-family-aurora-display)',
                    fontStyle: 'italic',
                    fontSize: '13px',
                    minWidth: '16px',
                    textAlign: 'right',
                    color: isActive ? accentColor : showLabel ? inkColor : muteColor,
                    transition: 'color 0.25s ease',
                  }}
                >
                  {c.roman}
                </span>

                {/* Station dot on the rail */}
                <span
                  aria-hidden
                  className="relative inline-flex h-2 w-2 items-center justify-center"
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{
                        boxShadow: `0 0 0 4px ${accentGlow}`,
                        transition: 'box-shadow 0.35s ease',
                      }}
                    />
                  )}
                  <span
                    className="relative h-2 w-2 rounded-full border"
                    style={{
                      borderColor: isActive ? accentColor : muteColor,
                      backgroundColor: isActive
                        ? accentColor
                        : isHover
                          ? muteColor
                          : 'transparent',
                      transition:
                        'background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
                      transform: isActive ? 'scale(1.15)' : 'scale(1)',
                    }}
                  />
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
