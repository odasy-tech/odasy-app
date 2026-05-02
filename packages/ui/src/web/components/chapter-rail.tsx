'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '../theme';

export interface ChapterEntry {
  /** DOM id of the section element to track. */
  id: string;
  /** Roman numeral or symbol shown next to the dot. */
  roman: string;
  /** Full label revealed on active/hover. */
  label: string;
}

export interface ChapterRailProps {
  chapters: ChapterEntry[];
  /**
   * IDs of sections whose surface is the inverse of the surrounding theme.
   * On those sections the rail flips its palette for legibility.
   */
  invertOn?: string[];
  /** Position from the right edge in pixels. Defaults to 20px. */
  rightOffset?: number;
}

/**
 * Right-edge chapter rail — a hairline track with stations.
 * Tracks the current section via IntersectionObserver and lights the
 * active station. Theme- and section-aware: when the user is over a
 * section listed in `invertOn`, the rail flips its palette.
 *
 * Hidden on screens narrower than `lg`.
 */
export function ChapterRail({
  chapters,
  invertOn = [],
  rightOffset = 20,
}: ChapterRailProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();

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

    chapters.forEach((c) => {
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
  }, [chapters]);

  const inverted = !!(activeId && invertOn.includes(activeId));
  const onLightSurface =
    (theme === 'light' && !inverted) || (theme === 'dark' && inverted);

  const inkColor = onLightSurface ? '#1A1830' : '#F0EEF8';
  const muteColor = onLightSurface ? 'rgba(26,24,48,0.42)' : 'rgba(240,238,248,0.45)';
  const dimColor = onLightSurface ? 'rgba(26,24,48,0.22)' : 'rgba(240,238,248,0.22)';
  const accentColor = onLightSurface ? '#5046C8' : '#D4DAFF';
  const accentGlow = onLightSurface ? 'rgba(80,70,200,0.32)' : 'rgba(212,218,255,0.55)';
  const textShadow = onLightSurface
    ? '0 1px 0 rgba(255,255,255,0.45)'
    : '0 1px 2px rgba(0,0,0,0.25)';

  return (
    <nav
      aria-label="Capítulos"
      className="fixed top-1/2 z-30 hidden -translate-y-1/2 lg:block"
      style={{
        right: rightOffset,
        opacity: visible ? 1 : 0,
        transform: `translate(${visible ? '0' : '8px'}, -50%)`,
        transition: 'opacity 0.45s ease, transform 0.45s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <ol className="relative flex flex-col gap-4 py-1 pr-2.5">
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 top-3 w-px"
          style={{
            right: '5px',
            backgroundColor: dimColor,
            transition: 'background-color 0.4s ease',
          }}
        />

        {chapters.map((c) => {
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
                  fontFamily: 'var(--font-family-sans)',
                  fontWeight: isActive ? 700 : 500,
                  textShadow,
                  transition: 'color 0.25s ease',
                }}
              >
                <span
                  className="overflow-hidden whitespace-nowrap text-[10px] uppercase tracking-[0.32em]"
                  style={{
                    maxWidth: showLabel ? '140px' : '0px',
                    opacity: showLabel ? 1 : 0,
                    color: isActive ? accentColor : inkColor,
                    transition:
                      'max-width 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease, color 0.25s ease',
                  }}
                >
                  {c.label}
                </span>

                <span
                  className="tabular-nums"
                  style={{
                    fontFamily: 'var(--font-family-display)',
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

                <span aria-hidden className="relative inline-flex h-2 w-2 items-center justify-center">
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
