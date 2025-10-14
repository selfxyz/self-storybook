import type { Plugin } from 'vite';

/**
 * Plugin to handle JSON imports that require import attributes
 * This is needed for packages like i18n-iso-countries that use
 * the new JSON module syntax
 */
export function jsonModulePlugin(): Plugin {
  return {
    name: 'json-module-plugin',
    enforce: 'pre',
    resolveId(id) {
      // Intercept i18n-iso-countries JSON imports
      if (id.includes('i18n-iso-countries') && id.endsWith('.json')) {
        return { id: `/__json_mock__${id}`, external: false };
      }
      return null;
    },
    load(id) {
      // Return empty object for mocked JSON modules
      if (id.startsWith('/__json_mock__')) {
        return 'export default {}';
      }
      return null;
    },
  };
}
