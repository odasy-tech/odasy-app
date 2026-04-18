import { useRouter } from 'expo-router';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, G, Line } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  Easing,
  withRepeat,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react-native';
import { MetaLabel } from '@/components/atoms/MetaLabel';
import { ScanLine } from '@/components/atoms/ScanLine';
import { FieldCoordinates } from '@/components/atoms/FieldCoordinates';
import { COLORS } from '@/theme/colors';
import { FONTS } from '@/theme/fonts';

const { height: SCREEN_H } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  // Staggered reveal
  const headerOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslate = useSharedValue(18);
  const bodyOpacity = useSharedValue(0);
  const ctaOpacity = useSharedValue(0);
  const footerOpacity = useSharedValue(0);
  const compassRotate = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
    titleOpacity.value = withDelay(700, withTiming(1, { duration: 900 }));
    titleTranslate.value = withDelay(
      700,
      withTiming(0, { duration: 900, easing: Easing.out(Easing.cubic) })
    );
    bodyOpacity.value = withDelay(1300, withTiming(1, { duration: 700 }));
    ctaOpacity.value = withDelay(1700, withTiming(1, { duration: 700 }));
    footerOpacity.value = withDelay(2000, withTiming(1, { duration: 600 }));
    compassRotate.value = withRepeat(
      withTiming(360, { duration: 240_000, easing: Easing.linear }),
      -1,
      false
    );
  }, [
    headerOpacity,
    titleOpacity,
    titleTranslate,
    bodyOpacity,
    ctaOpacity,
    footerOpacity,
    compassRotate,
  ]);

  const headerStyle = useAnimatedStyle(() => ({ opacity: headerOpacity.value }));
  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslate.value }],
  }));
  const bodyStyle = useAnimatedStyle(() => ({ opacity: bodyOpacity.value }));
  const ctaStyle = useAnimatedStyle(() => ({ opacity: ctaOpacity.value }));
  const footerStyle = useAnimatedStyle(() => ({ opacity: footerOpacity.value }));
  const compassStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${compassRotate.value}deg` }],
  }));

  return (
    <View style={styles.root}>
      <ScanLine travel={SCREEN_H} duration={2000} />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <Animated.View style={[styles.header, headerStyle]}>
          <View style={styles.headerRow}>
            <MetaLabel tone="mute">Odasy · Expediente v.01</MetaLabel>
            <View style={styles.dotRow}>
              <View style={styles.dotActive} />
              <View style={styles.dotIdle} />
              <View style={styles.dotIdle} />
            </View>
          </View>
          <View style={{ marginTop: 6 }}>
            <FieldCoordinates />
          </View>
        </Animated.View>

        <View style={styles.center}>
          <Animated.View style={[styles.compassWrap, compassStyle]}>
            <CompassRose />
          </Animated.View>

          <Animated.View style={[styles.titleBlock, titleStyle]}>
            <Text style={styles.title}>odasy</Text>
            <View style={styles.rule} />
          </Animated.View>

          <Animated.View style={[styles.subtitleBlock, bodyStyle]}>
            <Text style={styles.subtitle}>
              Instrumento de campo{'\n'}para exploradores del{' '}
              <Text style={styles.subtitleAccent}>Eje Cafetero</Text>.
            </Text>
          </Animated.View>
        </View>

        <Animated.View style={[styles.ctaBlock, ctaStyle]}>
          <Pressable
            onPress={() => router.push('/(auth)/sign-in')}
            style={({ pressed }) => [
              styles.ctaPrimary,
              pressed && styles.ctaPrimaryPressed,
            ]}
          >
            <Text style={styles.ctaPrimaryText}>Abrir expediente</Text>
            <ArrowRight size={14} color={COLORS.ink950} strokeWidth={2.25} />
          </Pressable>

          <Pressable
            onPress={() => router.push('/(auth)/sign-up')}
            style={({ pressed }) => [
              styles.ctaSecondary,
              pressed && styles.ctaSecondaryPressed,
            ]}
          >
            <Text style={styles.ctaSecondaryText}>Iniciar inscripción</Text>
          </Pressable>
        </Animated.View>

        <Animated.View style={[styles.footer, footerStyle]}>
          <MetaLabel>Sociedad cartográfica · bogotá · co</MetaLabel>
          <MetaLabel>v.01 · beta privada</MetaLabel>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

function CompassRose() {
  return (
    <Svg width={180} height={180} viewBox="0 0 200 200">
      <Circle cx="100" cy="100" r="94" stroke={COLORS.ink700} strokeWidth="0.8" fill="none" />
      <Circle cx="100" cy="100" r="70" stroke={COLORS.ink700} strokeWidth="0.5" fill="none" />
      <Circle cx="100" cy="100" r="46" stroke={COLORS.ink700} strokeWidth="0.5" fill="none" />

      <G>
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          const rad = (angle * Math.PI) / 180;
          const outer = 94;
          const inner = i % 4 === 0 ? 78 : 86;
          const isCardinal = i === 0;
          return (
            <Line
              key={i}
              x1={100 + Math.sin(rad) * inner}
              y1={100 - Math.cos(rad) * inner}
              x2={100 + Math.sin(rad) * outer}
              y2={100 - Math.cos(rad) * outer}
              stroke={isCardinal ? COLORS.volt : COLORS.boneDim}
              strokeWidth={isCardinal ? 1.4 : 0.6}
              strokeOpacity={isCardinal ? 1 : 0.5}
            />
          );
        })}
      </G>

      {/* N arrow */}
      <Line x1="100" y1="14" x2="100" y2="36" stroke={COLORS.volt} strokeWidth="1.6" />
      <Circle cx="100" cy="100" r="2" fill={COLORS.volt} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.ink950 },
  safe: { flex: 1, paddingHorizontal: 28, paddingVertical: 14 },
  header: {},
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dotRow: { flexDirection: 'row', gap: 5 },
  dotActive: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.volt },
  dotIdle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.ink700,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassWrap: {
    position: 'absolute',
    opacity: 0.35,
  },
  titleBlock: { alignItems: 'center' },
  title: {
    fontFamily: FONTS.display.medium,
    fontSize: 96,
    color: COLORS.bone,
    letterSpacing: -5,
    lineHeight: 96,
  },
  rule: {
    marginTop: 18,
    width: 42,
    height: 1.2,
    backgroundColor: COLORS.volt,
  },
  subtitleBlock: { marginTop: 22, paddingHorizontal: 12 },
  subtitle: {
    fontFamily: FONTS.display.regular,
    fontSize: 18,
    lineHeight: 26,
    color: COLORS.boneMute,
    textAlign: 'center',
  },
  subtitleAccent: {
    fontFamily: FONTS.display.italic,
    color: COLORS.volt,
  },
  ctaBlock: { gap: 10, marginBottom: 16 },
  ctaPrimary: {
    backgroundColor: COLORS.volt,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  ctaPrimaryPressed: { backgroundColor: COLORS.voltDeep },
  ctaPrimaryText: {
    fontFamily: FONTS.mono.medium,
    fontSize: 12,
    letterSpacing: 3.2,
    color: COLORS.ink950,
    textTransform: 'uppercase',
  },
  ctaSecondary: {
    borderWidth: 1,
    borderColor: COLORS.ink700,
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaSecondaryPressed: { borderColor: COLORS.volt, backgroundColor: COLORS.ink900 },
  ctaSecondaryText: {
    fontFamily: FONTS.mono.regular,
    fontSize: 12,
    letterSpacing: 3.2,
    color: COLORS.bone,
    textTransform: 'uppercase',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
