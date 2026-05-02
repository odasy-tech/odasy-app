import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Fraunces, Geist } from 'next/font/google';
import './globals.css';

/**
 * Variable Fraunces serif — the editorial display family for the Aurora
 * DS. Variable axes (SOFT, WONK, opsz) let one family handle book copy,
 * editorial heads and wonky heroes.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  axes: ['SOFT', 'WONK', 'opsz'],
});

/**
 * Geist sans — body, labels, UI.
 */
const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Odasy — Explorer Dossier',
  description:
    'A gamified field instrument for explorers who want their journeys to mean something.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${geist.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
