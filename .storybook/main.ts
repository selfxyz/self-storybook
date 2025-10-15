import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';
import type { Alias, Plugin } from 'vite';

// Plugin to inject missing React Native APIs into react-native-web
const reactNativeWebPlugin = (): Plugin => ({
  name: 'react-native-web-shim',
  transform(code, id) {
    // Only transform the react-native-web main export (both source and optimized deps)
    if (
      id.includes('node_modules/react-native-web/dist/index.js') ||
      id.includes('react-native-web.js')
    ) {
      // Check if we've already applied the shim
      if (code.includes('/* STORYBOOK_SHIM_APPLIED */')) {
        return null; // Already transformed, skip
      }

      // Check if requireNativeComponent is already present
      if (code.includes('requireNativeComponent')) {
        return null; // Already has it, skip
      }

      // Check if UnimplementedView is available
      const hasUnimplementedView = code.includes('UnimplementedView');

      // Create a simple fallback component for requireNativeComponent
      const shimCode = `
/* STORYBOOK_SHIM_APPLIED */

import * as React from 'react';

// Shim for requireNativeComponent
${
  hasUnimplementedView
    ? `
export const requireNativeComponent = (name) => {
  console.warn(\`requireNativeComponent("\${name}") is not supported on web\`);
  return UnimplementedView;
};
`
    : `
const MockNativeComponent = (props) => {
  if (typeof window !== 'undefined') {
    return React.createElement('div', {
      ...props,
      'data-native-component': 'mock',
      style: { border: '1px dashed red', padding: '8px', ...props.style }
    }, props.children || 'Native Component (Mock)');
  }
  return null;
};

export const requireNativeComponent = (name) => {
  console.warn(\`requireNativeComponent("\${name}") is not supported on web\`);
  return MockNativeComponent;
};
`
}

// Shim for useAnimatedValue - not supported in react-native-web
// Return a mock ref that can be used in components
export const useAnimatedValue = (initialValue) => {
  if (typeof window !== 'undefined') {
    const ref = React.useRef(null);
    if (!ref.current) {
      const animated = {
        _value: initialValue,
        setValue: (v) => {
          animated._value = v;
        },
        // Very small linear interpolation fallback for web
        interpolate: ({ inputRange = [0, 1], outputRange = [0, 1] } = {}) => {
          const v = typeof animated._value === 'number' ? animated._value : 0;
          const inMin = inputRange[0];
          const inMax = inputRange[inputRange.length - 1] ?? inMin + 1;
          const t = inMax === inMin ? 0 : (v - inMin) / (inMax - inMin);
          const outMin = outputRange[0];
          const outMax = outputRange[outputRange.length - 1] ?? outMin;
          return outMin + t * (outMax - outMin);
        },
        addListener: () => {},
        removeAllListeners: () => {},
      };
      ref.current = animated;
    }
    return ref.current;
  }
  return {
    _value: initialValue,
    setValue: () => {},
    interpolate: ({ outputRange = [0, 1] } = {}) => outputRange[0],
    addListener: () => {},
    removeAllListeners: () => {},
  };
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

    // Dynamically resolve SDK subpath exports so Rollup can follow them reliably
    const require = createRequire(import.meta.url);
    let mobileSdkComponentsPath: string | undefined;
    try {
      // Use Node's resolution to respect package "exports" conditions
      mobileSdkComponentsPath = require.resolve('@selfxyz/mobile-sdk-alpha/components');
    } catch {
      // leave undefined if not resolvable at config time
    }

    // Fallback to local source if dist build is missing in .local-packages
    const projectRoot = process.cwd();
    const mobileSdkRoot = path.resolve(projectRoot, '.local-packages/mobile-sdk-alpha');
    const mobileSdkSrcComponents = path.join(mobileSdkRoot, 'src/components/index.ts');
    const mobileSdkSrcRootIndex = path.join(mobileSdkRoot, 'src/index.ts');
    const useSrcFallback = !mobileSdkComponentsPath && fs.existsSync(mobileSdkSrcComponents);

    // Resolve @selfxyz/common; if its dist is missing, alias to its src directory
    const commonRoot = path.resolve(projectRoot, '.local-packages/common');
    const commonDistEsmIndex = path.join(commonRoot, 'dist/esm/index.js');
    const _commonSrcDir = path.join(commonRoot, 'src');
    const _hasCommonDist = fs.existsSync(commonDistEsmIndex);
    const commonPublishedVirtual = path.join(
      projectRoot,
      '.storybook/shims/self-common-published-virtual.ts',
    );
    const commonLocalVirtual = path.join(projectRoot, '.storybook/shims/self-common-virtual.ts');

    // Normalize any existing aliases into array form so we can add regex aliases
    const existingAliases: Alias[] = Array.isArray(config.resolve?.alias)
      ? (config.resolve?.alias as Alias[])
      : Object.entries(config.resolve?.alias || {}).map(([find, replacement]) => ({
          find,
          replacement,
        }));

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
        alias: [
          ...existingAliases,
          { find: 'react-native', replacement: 'react-native-web' },
          {
            find: 'react-native/Libraries/Utilities/codegenNativeComponent',
            replacement: 'react-native-web/dist/cjs/modules/UnimplementedView',
          },
          { find: 'buffer', replacement: 'buffer/' },
          { find: 'process', replacement: 'process/browser' },
          { find: 'scheduler', replacement: 'scheduler/index.js' },
          // Shim noble hashes legacy/md5 subpaths for Storybook builds
          {
            find: '@noble/hashes/legacy',
            replacement: path.join(projectRoot, '.storybook/shims/noble-hashes-legacy-shim.ts'),
          },
          {
            find: '@noble/hashes/md5',
            replacement: path.join(projectRoot, '.storybook/shims/noble-hashes-legacy-shim.ts'),
          },
          // Use ethers as-is (published package)
          // Ensure SDK components subpath always resolves in both dev and build
          // Ensure SDK components subpath and root always resolve (prefer built if available)
          ...(mobileSdkComponentsPath
            ? [
                {
                  find: '@selfxyz/mobile-sdk-alpha/components',
                  replacement: mobileSdkComponentsPath,
                },
                {
                  find: '@selfxyz/mobile-sdk-alpha',
                  replacement: path.join(mobileSdkRoot, 'src/index.ts'),
                },
              ]
            : useSrcFallback
              ? [
                  {
                    find: '@selfxyz/mobile-sdk-alpha/components',
                    replacement: path.join(
                      projectRoot,
                      '.storybook/shims/mobile-sdk-components-web.tsx',
                    ),
                  },
                  { find: '@selfxyz/mobile-sdk-alpha', replacement: mobileSdkSrcRootIndex },
                ]
              : []),
          // Map @selfxyz/common to published or local virtual shim depending on availability
          {
            find: /^@selfxyz\/common$/,
            replacement: _hasCommonDist ? commonPublishedVirtual : commonLocalVirtual,
          },
          // When local dist is missing, also map subpath imports directly to source files
          ...(!_hasCommonDist
            ? [
                {
                  find: /^@selfxyz\/common\/(.+)$/,
                  replacement: path.join(_commonSrcDir, '$1'),
                },
                // Fix bad absolute-internal imports like "src/..." inside local common sources
                {
                  find: /^src\/(.+)$/,
                  replacement: path.join(_commonSrcDir, '$1'),
                },
              ]
            : []),
          // Shim React Native renderer portals for Tamagui on web
          {
            find: 'react-native/Libraries/Renderer/shims/ReactFabric',
            replacement: path.join(projectRoot, '.storybook/shims/react-native-portal-shim.js'),
          },
          {
            find: 'react-native/Libraries/Renderer/shims/ReactNative',
            replacement: path.join(projectRoot, '.storybook/shims/react-native-portal-shim.js'),
          },
          {
            find: 'react-native-web/Libraries/Renderer/shims/ReactFabric',
            replacement: path.join(projectRoot, '.storybook/shims/react-native-portal-shim.js'),
          },
          {
            find: 'react-native-web/Libraries/Renderer/shims/ReactNative',
            replacement: path.join(projectRoot, '.storybook/shims/react-native-portal-shim.js'),
          },
        ],
        extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
        // Ensure Rollup/Vite resolves web-first exports and avoids native entries
        conditions: ['browser', 'import', 'module', 'default'],
        // Prefer browser and ESM entry points for Storybook web build
        mainFields: ['browser', 'module', 'main'],
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        include: [
          ...(config.optimizeDeps?.include || []),
          'react-native-web',
          'react-native-svg',
          'scheduler',
          // Only prebundle SDK when using built dist; avoid prebundling TS source
          ...(!useSrcFallback
            ? ['@selfxyz/mobile-sdk-alpha', '@selfxyz/mobile-sdk-alpha/components']
            : []),
          '@selfxyz/common',
        ],
        exclude: [
          ...(config.optimizeDeps?.exclude || []),
          'react-native',
          ...(useSrcFallback
            ? ['@selfxyz/mobile-sdk-alpha', '@selfxyz/mobile-sdk-alpha/components']
            : []),
          // Keep @selfxyz/common included (published package)
        ],
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
