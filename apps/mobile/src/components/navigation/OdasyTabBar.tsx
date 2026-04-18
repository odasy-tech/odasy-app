import { useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
  Tent,
  BookOpen,
  Compass,
  Footprints,
  SlidersHorizontal,
  type LucideIcon,
} from 'lucide-react-native';
import { COLORS } from '@/theme/colors';
import { FONTS } from '@/theme/fonts';

interface TabMeta {
  n: string;
  label: string;
  Icon: LucideIcon;
}

/**
 * Editorial tab metadata keyed by expo-router route name.
 * Keep the route names in sync with files under `app/(tabs)/`.
 */
const TAB_META: Record<string, TabMeta> = {
  index: { n: '01', label: 'Campo', Icon: Tent },
  passport: { n: '02', label: 'Dossier', Icon: BookOpen },
  map: { n: '03', label: 'Región', Icon: Compass },
  missions: { n: '04', label: 'Rutas', Icon: Footprints },
  settings: { n: '05', label: 'Ajustes', Icon: SlidersHorizontal },
};

const INDICATOR_W = 34;

/**
 * Custom bottom tab bar — dark "instrument strip" aligned with the
 * Odasy Explorer Dossier voice. A volt segment slides across the top
 * hairline to mark the active station.
 */
export function OdasyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const screenW = Dimensions.get('window').width;
  const tabs = state.routes.filter((r) => TAB_META[r.name]);
  const tabW = screenW / tabs.length;

  const initialX = state.index * tabW + (tabW - INDICATOR_W) / 2;
  const indicatorX = useSharedValue(initialX);
  const indicatorOpacity = useSharedValue(0);

  useEffect(() => {
    indicatorOpacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.ease),
    });
  }, [indicatorOpacity]);

  useEffect(() => {
    indicatorX.value = withSpring(
      state.index * tabW + (tabW - INDICATOR_W) / 2,
      { damping: 22, stiffness: 210, mass: 0.8 }
    );
  }, [state.index, tabW, indicatorX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
    opacity: indicatorOpacity.value,
  }));

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 10),
        },
      ]}
    >
      <View style={styles.topRule} />
      <Animated.View style={[styles.indicator, indicatorStyle]} />

      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const meta = TAB_META[route.name];
          if (!meta) return null;
          const { options } = descriptors[route.key] ?? {};
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: 'tabLongPress', target: route.key });
          };

          return (
            <TabButton
              key={route.key}
              meta={meta}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              accessibilityLabel={options?.tabBarAccessibilityLabel ?? meta.label}
              testID={options?.tabBarButtonTestID}
            />
          );
        })}
      </View>
    </View>
  );
}

interface TabButtonProps {
  meta: TabMeta;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  accessibilityLabel: string;
  testID?: string;
}

function TabButton({
  meta,
  isFocused,
  onPress,
  onLongPress,
  accessibilityLabel,
  testID,
}: TabButtonProps) {
  const pressScale = useSharedValue(1);
  const focusReveal = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    focusReveal.value = withTiming(isFocused ? 1 : 0, {
      duration: 260,
      easing: Easing.out(Easing.cubic),
    });
  }, [isFocused, focusReveal]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  const numberStyle = useAnimatedStyle(() => ({
    opacity: focusReveal.value,
    transform: [{ translateY: (1 - focusReveal.value) * 4 }],
  }));

  const iconColor = isFocused ? COLORS.volt : COLORS.boneDim;
  const labelColor = isFocused ? COLORS.volt : COLORS.boneDim;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={() => {
        pressScale.value = withTiming(0.94, { duration: 80 });
      }}
      onPressOut={() => {
        pressScale.value = withSpring(1, { damping: 16, stiffness: 260 });
      }}
      accessibilityRole="button"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={styles.tab}
      hitSlop={6}
    >
      <Animated.View style={[styles.tabInner, containerStyle]}>
        <Animated.Text style={[styles.n, numberStyle, { color: COLORS.volt }]}>
          {meta.n}
        </Animated.Text>

        <meta.Icon
          size={22}
          color={iconColor}
          strokeWidth={isFocused ? 1.6 : 1.35}
        />

        <Text style={[styles.label, { color: labelColor }]}>{meta.label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.ink950,
    paddingTop: 10,
  },
  topRule: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.ink700,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: INDICATOR_W,
    height: 1.4,
    backgroundColor: COLORS.volt,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.volt,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.75,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  tab: { flex: 1 },
  tabInner: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 4,
    gap: 5,
  },
  n: {
    fontFamily: FONTS.mono.medium,
    fontSize: 9,
    letterSpacing: 1.4,
    height: 11,
  },
  label: {
    fontFamily: FONTS.mono.regular,
    fontSize: 9.5,
    letterSpacing: 1.9,
    textTransform: 'uppercase',
  },
});
