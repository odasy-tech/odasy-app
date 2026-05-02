import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DM_Sans, DM_Serif_Display, Fraunces, Geist, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

// V2 landing typography — DM family (see app/v2/).
const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-serif',
});

export const metadata: Metadata = {
  title: 'Odasy — Explorer Dossier',
  description:
    'A gamified field instrument for explorers who want their journeys to mean something.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} ${mono.variable} ${dmSans.variable} ${dmSerifDisplay.variable}`}
    >
      <body className="bg-ink-950 text-bone antialiased">{children}</body>
    </html>
  );
}
