module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: 'react',
        },
      ],
    ],
    plugins: [
      // Tamagui compiler — extracts styles at build time for near-native perf.
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui', '@odasy/ui'],
          config: '../../packages/ui/tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],
      // Reanimated plugin must be listed last.
      'react-native-worklets/plugin',
    ],
  };
};
