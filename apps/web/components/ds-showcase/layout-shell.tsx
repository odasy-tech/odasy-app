'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { Container, ThemeProvider, ThemeToggle } from '@odasy/ui/web';
import { GROUP_LABELS, groupedPlates, plateFor } from './nav';
import { PageEdges } from './page-edges';
import { PlateFooter } from './plate-footer';

export function ShowcaseShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const groups = groupedPlates();
  const current = plateFor(pathname);

  return (
    <ThemeProvider defaultTheme="light">
      <main
        className="ds-paper relative min-h-screen text-[var(--color-ink-primary)]"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        <PageEdges />

        <PlateHeader plate={current?.plate ?? '—'} title={current?.label ?? 'Index'} />

        <Container width="wide" className="relative z-10 pb-24 pt-10 sm:pt-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr]">
            <Sidebar pathname={pathname} groups={groups} />

            <div className="min-w-0 flex flex-col gap-20">
              {children}
              <PlateFooter pathname={pathname} />
            </div>
          </div>
        </Container>
      </main>
    </ThemeProvider>
  );
}

/* ── Plate header ─────────────────────────────────────────────────── */

function PlateHeader({ plate, title }: { plate: string; title: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border-default)] bg-[var(--color-bg-canvas)]/85 backdrop-blur-md">
      {/* hairline ruler tick band — gives the header a "measured" feel */}
      <div
        aria-hidden
        className="ds-ticker pointer-events-none absolute inset-x-0 bottom-0 h-[3px] opacity-50"
      />

      <Container width="wide">
        <div className="flex items-center justify-between gap-6 py-4 sm:py-5">
          {/* left: brand mark + plate index */}
          <div className="flex items-center gap-5">
            <Link
              href="/ds"
              className="group flex items-baseline gap-2 text-[var(--color-ink-primary)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="text-[20px] tracking-[-0.01em] sm:text-[22px]">
                Odasy
              </span>
              <span
                aria-hidden
                className="hidden h-[14px] w-px bg-[var(--color-border-default)] sm:inline-block"
              />
              <span
                className="hidden text-[10px] uppercase tracking-[0.42em] text-[var(--color-ink-secondary)] transition-colors group-hover:text-[var(--color-accent-action)] sm:inline"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
              >
                Atelier
              </span>
            </Link>

            <span
              aria-hidden
              className="hidden h-5 w-px bg-[var(--color-border-default)] sm:block"
            />

            <div className="hidden items-baseline gap-2 sm:flex">
              <span
                className="text-[10px] uppercase tracking-[0.42em] text-[var(--color-ink-tertiary)]"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
              >
                Plate
              </span>
              <span
                className="text-[15px] italic tabular-nums text-[var(--color-accent-action)]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                {plate}
              </span>
              <span className="text-[var(--color-ink-tertiary)]" aria-hidden>
                ·
              </span>
              <span
                className="text-[12px] uppercase tracking-[0.32em] text-[var(--color-ink-primary)]"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
              >
                {title}
              </span>
            </div>
          </div>

          {/* right: external links + theme */}
          <div className="flex items-center gap-5">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[var(--color-ink-secondary)] transition-colors hover:text-[var(--color-accent-action)] sm:inline-flex"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              <span>Live landing</span>
              <span aria-hidden>↗</span>
            </Link>
            <LiveClock />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}

/* ── Live clock — gives the dossier its "instrument" feel ─────────── */

function LiveClock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = String(d.getUTCHours()).padStart(2, '0');
      const m = String(d.getUTCMinutes()).padStart(2, '0');
      const s = String(d.getUTCSeconds()).padStart(2, '0');
      setTime(`${h}:${m}:${s} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span
      className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--color-ink-tertiary)] tabular-nums md:inline-flex"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <span
        aria-hidden
        className="ds-animate-pulse h-1.5 w-1.5 rounded-full bg-[var(--color-accent-action)]"
      />
      {time}
    </span>
  );
}

/* ── Sidebar ──────────────────────────────────────────────────────── */

function Sidebar({
  pathname,
  groups,
}: {
  pathname: string;
  groups: ReturnType<typeof groupedPlates>;
}) {
  return (
    <aside className="hidden lg:block">
      <nav
        aria-label="Design system index"
        className="sticky top-28 flex flex-col gap-9"
      >
        {groups.map(({ group, entries }) => (
          <div key={group} className="flex flex-col gap-3.5">
            <div className="flex items-center gap-2.5">
              <span
                className="text-[10px] uppercase tracking-[0.42em] text-[var(--color-accent-action)]"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
              >
                {GROUP_LABELS[group]}
              </span>
              <div className="ds-rule flex-1" />
            </div>

            <ul className="flex flex-col gap-0.5">
              {entries.map((entry) => {
                const active = pathname === entry.href;
                return (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      className="group relative flex items-center gap-3 py-1.5 pl-1 pr-2 transition-colors"
                      style={{
                        color: active
                          ? 'var(--color-accent-action)'
                          : 'var(--color-ink-secondary)',
                      }}
                    >
                      {/* left rail indicator */}
                      <span
                        aria-hidden
                        className="absolute left-0 top-1/2 h-4 w-px -translate-y-1/2 transition-all"
                        style={{
                          backgroundColor: active
                            ? 'var(--color-accent-action)'
                            : 'transparent',
                        }}
                      />

                      <span
                        className="w-7 shrink-0 text-right text-[11px] italic tabular-nums"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 500,
                          color: active
                            ? 'var(--color-accent-action)'
                            : 'var(--color-ink-tertiary)',
                          fontStyle: 'italic',
                        }}
                      >
                        {entry.plate}
                      </span>

                      <span
                        className="text-[13px] tracking-[0.005em] transition-colors group-hover:text-[var(--color-ink-primary)]"
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: active ? 600 : 400,
                        }}
                      >
                        {entry.label}
                      </span>

                      {entry.status && entry.status !== 'live' ? (
                        <span
                          aria-label={entry.status}
                          className="ml-auto rounded-sm border px-1 text-[8.5px] uppercase tracking-[0.22em]"
                          style={{
                            borderColor: 'var(--color-border-default)',
                            color: 'var(--color-ink-tertiary)',
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 600,
                          }}
                        >
                          {entry.status}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* Footer mark */}
        <div className="flex flex-col gap-2 pl-1 pt-2">
          <div className="ds-rule" />
          <span
            className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-ink-tertiary)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            v1.0 · Aurora
          </span>
        </div>
      </nav>
    </aside>
  );
}
