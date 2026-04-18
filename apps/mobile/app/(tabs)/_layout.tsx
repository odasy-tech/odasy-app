import { Tabs } from 'expo-router';
import { OdasyTabBar } from '@/components/navigation/OdasyTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <OdasyTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="passport" />
      <Tabs.Screen name="map" />
      <Tabs.Screen name="missions" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
