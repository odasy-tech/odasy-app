import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { useTheme } from '../theme';

export type CardVariant = 'default' | 'quiet' | 'tight';

export interface CardProps extends ViewProps {
  variant?: CardVariant;
  children?: ReactNode;
}

/**
 * Editorial card surface on native. Vellum bg, hairline border.
 */
export function Card({ variant = 'default', style, children, ...rest }: CardProps) {
  const { tokens } = useTheme();
  const padding = variant === 'tight' ? 16 : variant === 'quiet' ? 24 : 28;
  const bg = variant === 'quiet' ? tokens.bg.elevated : tokens.bg.surface;
  return (
    <View
      {...rest}
      style={[
        styles.card,
        {
          backgroundColor: bg,
          borderColor: tokens.border.default,
          padding,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
  },
});
