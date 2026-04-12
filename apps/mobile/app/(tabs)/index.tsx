import { ScrollView } from 'react-native';
import { H1, Paragraph, YStack } from '@odasy/ui';

export default function HomeScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <YStack padding="$4" gap="$3">
        <H1>Welcome, explorer</H1>
        <Paragraph>
          Your next adventure starts here. Pick a mission, earn stamps, and build your
          passport across the Colombian Coffee Region.
        </Paragraph>
      </YStack>
    </ScrollView>
  );
}
