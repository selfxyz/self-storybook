import fs from 'node:fs';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Dynamically resolve local SDK and common packages for tests
const projectRoot = process.cwd();
const mobileSdkRoot = path.resolve(projectRoot, '.local-packages/mobile-sdk-alpha');
const mobileSdkSrcComponents = path.join(mobileSdkRoot, 'src/components/index.ts');
const mobileSdkSrcRootIndex = path.join(mobileSdkRoot, 'src/index.ts');
let mobileSdkComponentsPath: string | undefined;
try {
  // Use Node resolution to respect package exports if available
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  mobileSdkComponentsPath = require.resolve('@selfxyz/mobile-sdk-alpha/components');
} catch {
  // ignore - will fallback to local sources/shims
}
const useSdkSrcFallback = !mobileSdkComponentsPath && fs.existsSync(mobileSdkSrcComponents);

const commonRoot = path.resolve(projectRoot, '.local-packages/common');
const commonDistEsmIndex = path.join(commonRoot, 'dist/esm/index.js');
const hasCommonDist = fs.existsSync(commonDistEsmIndex);
const commonPublishedVirtual = path.join(
  projectRoot,
  '.storybook/shims/self-common-published-virtual.ts',
);
const commonLocalVirtual = path.join(projectRoot, '.storybook/shims/self-common-virtual.ts');

export default defineConfig({
  // @ts-expect-error - Vite plugin type mismatch between vite and vitest's bundled vite version
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./.storybook/vitest.setup.tsx'],
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    server: {
      deps: {
        inline: ['@selfxyz/mobile-sdk-alpha', '@selfxyz/common'],
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '.storybook/',
        'dist/',
        'storybook-static/',
        '**/*.stories.tsx',
        '**/*.config.ts',
        '**/*.config.js',
        '**/index.ts',
      ],
    },
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
  assetsInclude: ['**/*.json'],
  resolve: {
    alias: [
      {
        find: 'react-native',
        replacement: 'react-native-web',
      },
      {
        find: 'react-native/Libraries/Utilities/codegenNativeComponent',
        replacement: 'react-native-web/dist/cjs/modules/UnimplementedView',
      },
      // Ensure SDK components subpath and root resolve for tests (prefer built if available)
      ...(mobileSdkComponentsPath
        ? [
            {
              find: '@selfxyz/mobile-sdk-alpha/components',
              replacement: mobileSdkComponentsPath,
            },
            {
              find: '@selfxyz/mobile-sdk-alpha',
              replacement: mobileSdkSrcRootIndex,
            },
          ]
        : useSdkSrcFallback
          ? [
              {
                find: '@selfxyz/mobile-sdk-alpha/components',
                replacement: path.join(
                  projectRoot,
                  '.storybook/shims/mobile-sdk-components-web.tsx',
                ),
              },
              {
                find: '@selfxyz/mobile-sdk-alpha',
                replacement: mobileSdkSrcRootIndex,
              },
            ]
          : []),
      // Map @selfxyz/common to published or local virtual shim depending on availability
      {
        find: /^@selfxyz\/common$/,
        replacement: hasCommonDist ? commonPublishedVirtual : commonLocalVirtual,
      },
      // When local dist is missing, also map subpath imports directly to source files
      ...(!hasCommonDist
        ? [
            {
              find: /^@selfxyz\/common\/(.+)$/,
              replacement: path.join(commonRoot, 'src', '$1'),
            },
            {
              find: /^src\/(.+)$/,
              replacement: path.join(commonRoot, 'src', '$1'),
            },
          ]
        : []),
      {
        find: /^i18n-iso-countries\/langs\/.*\.json$/,
        replacement:
          '/Volumes/files/Projects/selfxyz/self-storybook/.storybook/mocks/i18n-iso-countries.ts',
      },
      {
        find: /^i18n-iso-countries$/,
        replacement:
          '/Volumes/files/Projects/selfxyz/self-storybook/.storybook/mocks/i18n-iso-countries.ts',
      },
      {
        find: /^i18n-iso-countries\//,
        replacement:
          '/Volumes/files/Projects/selfxyz/self-storybook/.storybook/mocks/i18n-iso-countries.ts',
      },
    ],
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
  },
  define: {
    global: 'globalThis',
    __DEV__: 'false',
  },
});
