import { AuroraSweepLine } from '@/components/landing-v2/atoms/aurora-sweep-line';
import { AuroraThemeProvider } from '@/components/landing-v2/lib/theme-context';
import { ApparatusV2 } from '@/components/landing-v2/sections/apparatus';
import { ArtifactV2 } from '@/components/landing-v2/sections/artifact';
import { DossierV2 } from '@/components/landing-v2/sections/dossier';
import { ExpeditionV2 } from '@/components/landing-v2/sections/expedition';
import { ExplorerV2 } from '@/components/landing-v2/sections/explorer';
import { FieldV2 } from '@/components/landing-v2/sections/field';
import { OpenerV2 } from '@/components/landing-v2/sections/opener';
import { PremiseV2 } from '@/components/landing-v2/sections/premise';
import { V2Shell } from '@/components/landing-v2/v2-shell';
import { LocaleProvider } from '@/lib/i18n/locale-context';

export const metadata = {
  title: 'Odasy — Atelier Cartographique (v2)',
  description:
    'A field instrument for explorers who want their journeys to mean something.',
};

export default function HomePageV2() {
  return (
    <LocaleProvider>
      <AuroraThemeProvider>
        <V2Shell>
          <AuroraSweepLine />
          <OpenerV2 />
          <PremiseV2 />
          <ExplorerV2 />
          <ApparatusV2 />
          <FieldV2 />
          <ArtifactV2 />
          <ExpeditionV2 />
          <DossierV2 />
        </V2Shell>
      </AuroraThemeProvider>
    </LocaleProvider>
  );
}
