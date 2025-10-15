import type { Adapters } from '@selfxyz/mobile-sdk-alpha';
import { createListenersMap, defaultConfig } from '@selfxyz/mobile-sdk-alpha';

// Minimal adapters suitable for Storybook runtime; no real device/network features
const createMockAdapters = (): Adapters => ({
  auth: {
    getPrivateKey: async () => null,
  },
  scanner: {
    scan: async () => {
      throw new Error('NFC scanning not available in Storybook');
    },
  },
  network: {
    http: {
      fetch: async (input: RequestInfo) => {
        // eslint-disable-next-line no-console
        console.log('Mock HTTP fetch:', input);
        return new Response(JSON.stringify({ data: null }), { status: 200 });
      },
    },
    ws: {
      connect: () => ({
        send: () => {},
        close: () => {},
        onMessage: () => {},
        onError: () => {},
        onClose: () => {},
      }),
    },
  },
  crypto: {
    hash: async (input: Uint8Array) => input,
    sign: async (data: Uint8Array) => data,
  },
  documents: {
    loadDocumentCatalog: async () => ({ documents: [] }),
    loadDocumentById: async () => null,
    saveDocumentCatalog: async () => {},
    deleteDocument: async () => {},
    saveDocument: async () => {},
  },
  analytics: {
    trackEvent: (event: string, params?: Record<string, unknown>) => {
      // eslint-disable-next-line no-console
      console.log('Analytics Event:', event, params);
    },
  },
});

export const getStorybookSelfClientConfig = () => defaultConfig;
export const getStorybookSelfClientAdapters = () => createMockAdapters();
export const getStorybookListeners = () => createListenersMap();
