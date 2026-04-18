import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { COLORS } from '@/theme/colors';

interface ScanLineProps {
  /** Distance in pixels the line travels. Default: screen-height. */
  travel?: number;
  /** Duration in ms. Default 1800. */
  duration?: number;
}

/**
 * Volt line that sweeps from top to bottom once on mount.
 * Document-scanner feel. Purely decorative — pointerEvents none.
 */
export function ScanLine({ travel = 1000, duration = 1800 }: ScanLineProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration,
      easing: Easing.inOut(Easing.ease),
    });
  }, [duration, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * travel }],
    opacity: progress.value < 0.02 ? 0 : progress.value > 0.98 ? 0 : 0.6,
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.line, animatedStyle]}
    />
  );
}

const styles = StyleSheet.create({
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1,
    backgroundColor: COLORS.volt,
    shadowColor: COLORS.volt,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    zIndex: 10,
  },
});
