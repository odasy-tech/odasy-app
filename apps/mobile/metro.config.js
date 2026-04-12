// Learn more: https://docs.expo.dev/guides/monorepos/
const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch the entire monorepo so Metro picks up changes in workspace packages.
//    Append (don't replace) so Expo's internal watch folders stay intact.
config.watchFolders = [...(config.watchFolders ?? []), workspaceRoot];

// 2. Let Metro resolve packages from the app's own node_modules AND the
//    hoisted root node_modules (pnpm / Turborepo / Yarn workspaces layout).
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

module.exports = config;
