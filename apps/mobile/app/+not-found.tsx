import { Link, Stack } from 'expo-router';
import { H2, Paragraph, YStack } from '@odasy/ui';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <YStack flex={1} alignItems="center" justifyContent="center" padding="$6" gap="$3">
        <H2>Off the map</H2>
        <Paragraph>This trail does not exist.</Paragraph>
        <Link href="/">Go home</Link>
      </YStack>
    </>
  );
}
