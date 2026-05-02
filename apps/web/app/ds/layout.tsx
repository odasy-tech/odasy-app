import type { ReactNode } from 'react';
import { ShowcaseShell } from '@/components/ds-showcase/layout-shell';

export const metadata = {
  title: 'Odasy DS',
  description: 'Design system showcase for Odasy.',
};

export default function DSLayout({ children }: { children: ReactNode }) {
  return <ShowcaseShell>{children}</ShowcaseShell>;
}
