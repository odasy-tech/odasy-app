import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
} from 'react-native';

import { fonts } from '../../theme/typography';
import { useTheme } from '../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  withArrow?: boolean;
  children?: ReactNode;
}

/**
 * Native CTA. Mirrors the web Button API: three variants × three sizes.
 * Renders a Pressable with token-driven colours and a Reanimated-friendly
 * surface (Pressable already provides press state via `style` callback).
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  withArrow = false,
  disabled,
  style,
  children,
  ...rest
}: ButtonProps) {
  const { tokens } = useTheme();
  const isDisabled = disabled || loading;

  const sizing = SIZE[size];

  const palette =
    variant === 'primary'
      ? {
          bg: tokens.accent.action,
          bgHover: tokens.accent.hover,
          text: tokens.ink.onAccent,
          border: tokens.accent.action,
        }
      : variant === 'secondary'
        ? {
            bg: tokens.bg.surface,
            bgHover: tokens.bg.elevated,
            text: tokens.ink.secondary,
            border: tokens.border.default,
          }
        : {
            bg: 'transparent',
            bgHover: tokens.accent.soft,
            text: tokens.accent.action,
            border: 'transparent',
          };

  return (
    <Pressable
      {...rest}
      disabled={isDisabled}
      style={(state) => [
        styles.button,
        {
          backgroundColor: state.pressed ? palette.bgHover : palette.bg,
          borderColor: palette.border,
          paddingVertical: sizing.padY,
          paddingHorizontal: sizing.padX,
          opacity: isDisabled ? 0.5 : 1,
        },
        typeof style === 'function' ? style(state) : style,
      ]}
    >
      <View style={styles.content}>
        {loading ? <ActivityIndicator color={palette.text} /> : null}
        <Text
          style={[
            styles.label,
            { color: palette.text, fontSize: sizing.fontSize, opacity: loading ? 0 : 1 },
          ]}
        >
          {children}
        </Text>
        {withArrow && !loading ? (
          <View style={[styles.arrow, { backgroundColor: palette.text }]} />
        ) : null}
      </View>
    </Pressable>
  );
}

const SIZE: Record<ButtonSize, { padX: number; padY: number; fontSize: number }> = {
  sm: { padX: 16, padY: 10, fontSize: 10 },
  md: { padX: 26, padY: 14, fontSize: 11 },
  lg: { padX: 34, padY: 16, fontSize: 12 },
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontFamily: fonts.sans.native,
    fontWeight: '600',
    letterSpacing: 3.2,
    textTransform: 'uppercase',
  },
  arrow: {
    width: 24,
    height: 1,
  },
});
