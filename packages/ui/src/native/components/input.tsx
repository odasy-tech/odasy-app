import { useState, type ReactNode } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { fonts } from '../../theme/typography';
import { useTheme } from '../theme';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
}

/**
 * Editorial text input for native. Always wraps a label + hint/error
 * stack. Focus state colours the underline border in accent.
 */
export function Input({ label, hint, error, onFocus, onBlur, ...rest }: InputProps) {
  const { tokens } = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label ? (
        <Text style={[styles.label, { color: tokens.ink.secondary, fontFamily: fonts.sans.native }]}>
          {label}
        </Text>
      ) : null}
      <TextInput
        {...rest}
        placeholderTextColor={tokens.ink.tertiary}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        style={[
          styles.input,
          {
            color: tokens.ink.primary,
            fontFamily: fonts.sans.native,
            borderBottomColor: error
              ? tokens.status.danger
              : focused
                ? tokens.accent.action
                : tokens.border.default,
          },
        ]}
      />
      {error ? (
        <Text style={[styles.message, { color: tokens.status.danger }]}>{error}</Text>
      ) : hint ? (
        <Text style={[styles.message, { color: tokens.ink.secondary }]}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 3.2,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    fontSize: 16,
    paddingVertical: 10,
  },
  message: {
    fontSize: 12,
    lineHeight: 18,
  },
});
