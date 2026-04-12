import type { ExpoConfig } from 'expo/config';

/**
 * Expo app configuration. Values that vary per environment are read from
 * `process.env` at build time — set them via `vercel env pull` for preview/
 * production or in `.env.local` for local dev.
 *
 * Asset references (icon, adaptiveIcon, splash, favicon) are intentionally
 * omitted until real PNGs exist in `./assets/images/`. When added, re-enable
 * them here. See `./assets/images/.gitkeep` for the required sizes.
 */
const config: ExpoConfig = {
  name: 'Odasy',
  slug: 'odasy',
  version: '0.1.0',
  orientation: 'portrait',
  scheme: 'odasy',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,

  ios: {
    bundleIdentifier: 'com.odasy.app',
    supportsTablet: true,
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        'Odasy uses your location to validate check-ins at curated places.',
      NSCameraUsageDescription:
        'Odasy uses the camera so you can attach photos to your check-ins.',
      NSPhotoLibraryUsageDescription:
        'Odasy needs access to your photo library to attach images to check-ins.',
    },
  },

  android: {
    package: 'com.odasy.app',
    permissions: [
      'ACCESS_FINE_LOCATION',
      'ACCESS_COARSE_LOCATION',
      'CAMERA',
      'READ_EXTERNAL_STORAGE',
    ],
  },

  web: {
    bundler: 'metro',
    output: 'static',
  },

  plugins: [
    'expo-router',
    'expo-location',
    'expo-image-picker',
    'expo-camera',
    'expo-secure-store',
    '@rnmapbox/maps',
  ],

  experiments: {
    typedRoutes: true,
  },

  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: process.env.EAS_PROJECT_ID ?? '',
    },
  },
};

export default config;
