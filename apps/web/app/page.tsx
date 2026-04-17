import { ScanLine } from '@/components/landing/atoms/scan-line';
import { Apparatus } from '@/components/landing/sections/apparatus';
import { Artifact } from '@/components/landing/sections/artifact';
import { Dossier } from '@/components/landing/sections/dossier';
import { Expedition } from '@/components/landing/sections/expedition';
import { Field } from '@/components/landing/sections/field';
import { Opener } from '@/components/landing/sections/opener';
import { Premise } from '@/components/landing/sections/premise';
import { LocaleProvider } from '@/lib/i18n/locale-context';

export default function HomePage() {
  return (
    <LocaleProvider>
      <main className="noise-overlay relative min-h-screen bg-ink-950 text-bone">
        <ScanLine />
        <Opener />
        <Premise />
        <Apparatus />
        <Field />
        <Artifact />
        <Expedition />
        <Dossier />
      </main>
    </LocaleProvider>
  );
}
