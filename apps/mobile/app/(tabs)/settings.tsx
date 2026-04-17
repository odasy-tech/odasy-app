import { H1, Paragraph, YStack } from 'tamagui';

export default function SettingsScreen() {
  return (
    <YStack flex={1} background="$ink950" padding="$5" paddingTop="$8" gap="$3">
      <H1 color="$bone">Settings</H1>
      <Paragraph color="$boneMute">Coming soon.</Paragraph>
    </YStack>
  );
}
