import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
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
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          'react-native': 'react-native-web',
          'react-native/Libraries/Utilities/codegenNativeComponent':
            'react-native-web/dist/cjs/modules/UnimplementedView',
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
    };
  },
};
export default config;
