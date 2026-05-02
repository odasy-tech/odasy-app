import { ChapterRail, SweepLine, ThemeProvider } from '@odasy/ui/web';
import { Apparatus } from '@/components/landing/sections/apparatus';
import { Artifact } from '@/components/landing/sections/artifact';
import { Dossier } from '@/components/landing/sections/dossier';
import { Expedition } from '@/components/landing/sections/expedition';
import { Explorer } from '@/components/landing/sections/explorer';
import { Field } from '@/components/landing/sections/field';
import { Opener } from '@/components/landing/sections/opener';
import { Premise } from '@/components/landing/sections/premise';
import { LocaleProvider } from '@/lib/i18n/locale-context';

export const metadata = {
  title: 'Odasy — Explorer Dossier',
  description:
    'A field instrument for explorers who want their journeys to mean something.',
};

const CHAPTERS = [
  { id: 'chapter-premise',    roman: 'I',   label: 'Premisa'      },
  { id: 'chapter-explorer',   roman: '·',   label: 'Identidad'    },
  { id: 'chapter-apparatus',  roman: 'II',  label: 'Instrumental' },
  { id: 'chapter-field',      roman: 'III', label: 'Campo'        },
  { id: 'chapter-artifact',   roman: 'IV',  label: 'Artefacto'    },
  { id: 'chapter-expedition', roman: 'V',   label: 'Expedición'   },
];

export default function HomePage() {
  return (
    <LocaleProvider>
      <ThemeProvider defaultTheme="light">
        <main
          className="ds-paper relative min-h-screen overflow-x-clip text-[var(--color-ink-primary)]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          <ChapterRail chapters={CHAPTERS} invertOn={['chapter-expedition']} />
          <SweepLine />
          <Opener />
          <Premise />
          <Explorer />
          <Apparatus />
          <Field />
          <Artifact />
          <Expedition />
          <Dossier />
        </main>
      </ThemeProvider>
    </LocaleProvider>
  );
}
