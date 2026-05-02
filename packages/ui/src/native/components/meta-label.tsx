import type { ReactNode } from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';

import { fonts } from '../../theme/typography';
import { useTheme } from '../theme';

type MetaLabelTone = 'mute' | 'accent' | 'ink' | 'inverse';

export interface MetaLabelProps extends TextProps {
  tone?: MetaLabelTone;
  children: ReactNode;
}

/**
 * Editorial micro-label on native — Geist 600 caps, tight tracking.
 */
export function MetaLabel({ tone = 'mute', style, children, ...rest }: MetaLabelProps) {
  const { tokens } = useTheme();
  const colorByTone: Record<MetaLabelTone, string> = {
    mute: tokens.ink.secondary,
    accent: tokens.accent.action,
    ink: tokens.ink.primary,
    inverse: 'rgba(255,255,255,0.7)',
  };
  return (
    <Text {...rest} style={[styles.label, { color: colorByTone[tone] }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 10,
    letterSpacing: 3.2,
    fontFamily: fonts.sans.native,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
