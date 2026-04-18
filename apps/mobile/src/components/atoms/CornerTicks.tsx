import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@/theme/colors';

interface CornerTicksProps {
  /** Inset in pixels from each corner. Default 8. */
  inset?: number;
  /** Size of each tick in pixels. Default 14. */
  size?: number;
  color?: string;
}

/**
 * Four L-shaped ticks at each corner of the parent — the classified-document
 * framing device used across the Odasy landing. Place inside a `position: relative`
 * container.
 */
export function CornerTicks({
  inset = 8,
  size = 14,
  color = COLORS.volt,
}: CornerTicksProps) {
  return (
    <>
      <Tick style={{ top: inset, left: inset }} rotation={0} size={size} color={color} />
      <Tick style={{ top: inset, right: inset }} rotation={90} size={size} color={color} />
      <Tick style={{ bottom: inset, right: inset }} rotation={180} size={size} color={color} />
      <Tick style={{ bottom: inset, left: inset }} rotation={270} size={size} color={color} />
    </>
  );
}

function Tick({
  style,
  rotation,
  size,
  color,
}: {
  style: object;
  rotation: number;
  size: number;
  color: string;
}) {
  return (
    <View
      pointerEvents="none"
      style={[
        { position: 'absolute', transform: [{ rotate: `${rotation}deg` }] },
        style,
      ]}
    >
      <Svg width={size} height={size} viewBox="0 0 16 16">
        <Path d="M0 6 L0 0 L6 0" stroke={color} strokeWidth={1} fill="none" />
      </Svg>
    </View>
  );
}
