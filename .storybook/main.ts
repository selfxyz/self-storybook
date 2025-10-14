import type { StorybookConfig } from '@storybook/react-vite';
import type { Plugin } from 'vite';

// Plugin to inject missing React Native APIs into react-native-web
const reactNativeWebPlugin = (): Plugin => ({
  name: 'react-native-web-shim',
  transform(code, id) {
    // Only transform the react-native-web main export
    if (id.includes('node_modules/react-native-web/dist/index.js')) {
      // Check if we've already applied the shim
      if (code.includes('/* STORYBOOK_SHIM_APPLIED */')) {
        return null; // Already transformed, skip
      }

      // Check if UnimplementedView is already imported/exported
      const hasUnimplementedView = code.includes('UnimplementedView');

      // Add missing exports using the existing UnimplementedView
      const shimCode = hasUnimplementedView
        ? `
/* STORYBOOK_SHIM_APPLIED */
${
  code.includes('requireNativeComponent')
    ? ''
    : `
export const requireNativeComponent = (name) => {
  console.warn(\`requireNativeComponent("\${name}") is not supported on web\`);
  return UnimplementedView;
};
`
}
// Shim for useAnimatedValue - not supported in react-native-web
// Return a mock ref that can be used in components
export const useAnimatedValue = (initialValue) => {
  const { useRef } = require('react');
  return useRef({ value: initialValue, setValue: () => {} }).current;
};
`
        : `
/* STORYBOOK_SHIM_APPLIED */
import UnimplementedView from './cjs/modules/UnimplementedView';
${
  code.includes('requireNativeComponent')
    ? ''
    : `
export const requireNativeComponent = (name) => {
  console.warn(\`requireNativeComponent("\${name}") is not supported on web\`);
  return UnimplementedView;
};
`
}
// Shim for useAnimatedValue - not supported in react-native-web
// Return a mock ref that can be used in components
export const useAnimatedValue = (initialValue) => {
  const { useRef } = require('react');
  return useRef({ value: initialValue, setValue: () => {} }).current;
};
`;
      return code + shimCode;
    }
    return null;
  },
});

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
    options: {
      builder: {
        viteConfigPath: undefined,
      },
    },
  },
  async viteFinal(config, { configType }) {
    // Completely disable test mode for production builds
    if (configType === 'PRODUCTION') {
      // Your production-specific Vite config adjustments here
    }

    return {
      ...config,
      plugins: [...(config.plugins || []), reactNativeWebPlugin()],
      // Disable server file system access checks for production
      server: {
        ...config.server,
        fs: {
          ...config.server?.fs,
          strict: false,
        },
      },
      define: {
        ...config.define,
        global: 'globalThis',
        __DEV__: 'false',
        'process.env': '{}',
        'process.env.NODE_ENV': '"production"',
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
          scheduler: 'scheduler/index.js',
        },
        extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        include: [
          ...(config.optimizeDeps?.include || []),
          'react-native-web',
          'react-native-svg',
          'scheduler',
        ],
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
          // Prefer default export interop so CJS default functions are callable
          requireReturnsDefault: 'preferred',
        },
        rollupOptions: {
          ...config.build?.rollupOptions,
          output: {
            ...config.build?.rollupOptions?.output,
            // Prevent circular dependency issues in production builds
            format: 'es',
            hoistTransitiveImports: false,
            inlineDynamicImports: false,
            // manualChunks: (id) => {
            //   // Split React and React DOM into separate chunk
            //   if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            //     return 'react-vendor';
            //   }
            //
            //   // Don't split react-native-web - bundle it with other vendor code
            //   // to avoid circular dependency initialization issues
            //   if (
            //     id.includes('node_modules/react-native-web/') ||
            //     id.includes('node_modules/react-native-svg/')
            //   ) {
            //     return 'vendor';
            //   }
            //
            //   // Split Storybook core into its own chunk
            //   if (id.includes('node_modules/@storybook/')) {
            //     return 'storybook-vendor';
            //   }
            //
            //   // All other node_modules into a general vendor chunk
            //   if (id.includes('node_modules/')) {
            //     return 'vendor';
            //   }
            // },
          },
          onwarn(warning, warn) {
            // Suppress circular dependency warnings for react-native-web
            if (
              warning.code === 'CIRCULAR_DEPENDENCY' &&
              warning.message.includes('react-native-web')
            ) {
              return;
            }
            warn(warning);
          },
        },
        chunkSizeWarningLimit: 3000, // Increase limit to accommodate test infrastructure files
      },
    };
  },
};
export default config;
