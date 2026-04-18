/**
 * Font family name constants for Odasy mobile.
 *
 * @expo-google-fonts exports each weight as its own font family string.
 * Reference these constants in `fontFamily` props to keep names consistent.
 */
export const FONTS = {
  display: {
    regular: 'Fraunces_400Regular',
    medium: 'Fraunces_500Medium',
    semibold: 'Fraunces_600SemiBold',
    italic: 'Fraunces_400Regular_Italic',
  },
  mono: {
    regular: 'JetBrainsMono_400Regular',
    medium: 'JetBrainsMono_500Medium',
  },
} as const;
