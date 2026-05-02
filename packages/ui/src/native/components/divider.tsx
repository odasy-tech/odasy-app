import { StyleSheet, View, type ViewProps } from 'react-native';

import { useTheme } from '../theme';

/**
 * Hairline divider on native. Thin, neutral, full-width.
 */
export function Divider({ style, ...rest }: ViewProps) {
  const { tokens } = useTheme();
  return (
    <View
      {...rest}
      style={[styles.line, { backgroundColor: tokens.border.default }, style]}
    />
  );
}

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
});
