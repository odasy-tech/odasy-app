import { Redirect } from 'expo-router';

/**
 * Root entry — no auth wiring yet, so everyone lands on the Welcome cover.
 * When Clerk is re-enabled, branch here: authed → /(tabs), else → /(auth)/welcome.
 */
export default function Index() {
  return <Redirect href="/(auth)/welcome" />;
}
