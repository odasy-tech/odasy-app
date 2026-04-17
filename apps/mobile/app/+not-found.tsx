import { Link, Stack } from 'expo-router';
import { H2, Paragraph, Text, YStack } from 'tamagui';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <YStack
        flex={1}
        background="$ink950"
        alignItems="center"
        justifyContent="center"
        padding="$6"
        gap="$3"
      >
        <H2 color="$bone">Off the map</H2>
        <Paragraph color="$boneMute" textAlign="center">
          This trail does not exist.
        </Paragraph>
        <Link href="/">
          <Text color="$volt" fontWeight="700">
            Go home
          </Text>
        </Link>
      </YStack>
    </>
  );
}
