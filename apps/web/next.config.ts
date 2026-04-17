import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  // Transpile workspace packages that ship TypeScript source (no build step).
  transpilePackages: ['@odasy/ui', '@odasy/domain', '@odasy/api'],
};

export default config;
