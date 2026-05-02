/**
 * `@odasy/ui` — public package surface.
 *
 * Use one of the path-specific entries when possible:
 *   `@odasy/ui/theme`     — tokens (cross-platform)
 *   `@odasy/ui/web`       — web React components
 *   `@odasy/ui/native`    — React Native components
 *   `@odasy/ui/utils`     — cn(), other utils
 *   `@odasy/ui/hooks`     — shared hooks
 *
 * The default export keeps backwards-compat aliases for the original
 * Tamagui-based imports.
 */

export * from './theme';

// Backwards-compat: the legacy landing and Tamagui-aware mobile code
// still imports `tamaguiConfig` and various Tamagui primitives from this
// package's root.
export { default as tamaguiConfig } from '../tamagui.config';
export {
  Button as TamaguiButton,
  Card as TamaguiCard,
  H1, H2, H3, H4,
  Paragraph,
  Stack,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui';
