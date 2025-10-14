import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // @ts-expect-error - Vite plugin type mismatch between vite and vitest's bundled vite version
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./.storybook/vitest.setup.tsx'],
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
