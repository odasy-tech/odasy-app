import { Text, type TextStyle, type StyleProp } from 'react-native';
import { COLORS } from '@/theme/colors';
import { FONTS } from '@/theme/fonts';

type Tone = 'dim' | 'mute' | 'volt';

interface MetaLabelProps {
  children: React.ReactNode;
  tone?: Tone;
  style?: StyleProp<TextStyle>;
}

const toneColor: Record<Tone, string> = {
  dim: COLORS.boneDim,
  mute: COLORS.boneMute,
  volt: COLORS.volt,
};

/**
 * Classified-document style meta label. Uppercase, tracked monospace.
 * The editorial voice workhorse — use for chapter markers, coordinates,
 * status lines, footer details.
 */
export function MetaLabel({ children, tone = 'dim', style }: MetaLabelProps) {
  return (
    <Text
      style={[
        {
          fontFamily: FONTS.mono.regular,
          fontSize: 10,
          letterSpacing: 2.4,
          textTransform: 'uppercase',
          color: toneColor[tone],
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
