import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    return {
      ...config,
      define: {
        ...config.define,
        global: 'globalThis',
        __DEV__: 'false',
        'process.env': '{}',
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          'react-native': 'react-native-web',
          'react-native/Libraries/Utilities/codegenNativeComponent':
            'react-native-web/dist/cjs/modules/UnimplementedView',
          buffer: 'buffer/',
          process: 'process/browser',
        },
        extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        include: [...(config.optimizeDeps?.include || []), 'react-native-web', 'react-native-svg'],
        exclude: [...(config.optimizeDeps?.exclude || []), 'react-native'],
        esbuildOptions: {
          ...config.optimizeDeps?.esbuildOptions,
          resolveExtensions: [
            '.web.tsx',
            '.web.ts',
            '.web.jsx',
            '.web.js',
            '.tsx',
            '.ts',
            '.jsx',
            '.js',
          ],
          loader: {
            '.js': 'jsx',
          },
        },
      },
      build: {
        ...config.build,
        commonjsOptions: {
          ...config.build?.commonjsOptions,
          transformMixedEsModules: true,
        },
        rollupOptions: {
          ...config.build?.rollupOptions,
          output: {
            ...config.build?.rollupOptions?.output,
            // Prevent circular dependency issues in production builds
            preserveEntrySignatures: 'exports-only',
            manualChunks: (id) => {
              // Skip vitest-related modules
              if (id.includes('vitest') || id.includes('vite-inject-mocker')) {
                return;
              }

              // Split React and React DOM into separate chunk
              if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
                return 'react-vendor';
              }

              // Bundle React Native Web with React Native SVG to avoid circular deps
              if (
                id.includes('node_modules/react-native-web/') ||
                id.includes('node_modules/react-native-svg/')
              ) {
                return 'react-native-web';
              }

              // Split Storybook core into its own chunk
              if (id.includes('node_modules/@storybook/')) {
                return 'storybook-vendor';
              }

              // All other node_modules into a general vendor chunk
              if (id.includes('node_modules/')) {
                return 'vendor';
              }
            },
          },
        },
        chunkSizeWarningLimit: 3000, // Increase limit to accommodate test infrastructure files
      },
    };
  },
};
export default config;
