import { H2, Paragraph, YStack } from '@odasy/ui';

export default function PassportScreen() {
  return (
    <YStack flex={1} padding="$4" gap="$3">
      <H2>Digital passport</H2>
      <Paragraph>Your stamps, badges, and progression will live here.</Paragraph>
    </YStack>
  );
}
