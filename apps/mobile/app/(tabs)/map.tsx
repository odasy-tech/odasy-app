import { H2, Paragraph, YStack } from '@odasy/ui';

export default function MapScreen() {
  return (
    <YStack flex={1} padding="$4" gap="$3">
      <H2>Regional map</H2>
      <Paragraph>Mapbox GL will render the living map here.</Paragraph>
    </YStack>
  );
}
