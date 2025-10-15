import type { Adapters } from '@selfxyz/mobile-sdk-alpha';
import { createListenersMap, defaultConfig, SelfClientProvider } from '@selfxyz/mobile-sdk-alpha';
import type { Preview } from '@storybook/react';
import React, { useMemo } from 'react';

// Mock adapters for Storybook - provide minimal implementations
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
      console.log('Analytics Event:', event, params);
    },
  },
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Mobile SDK', ['Typography', 'Buttons', 'Visual', 'Input']],
      },
    },
  },
  decorators: [
    (Story) => {
      const adapters = useMemo(() => createMockAdapters(), []);
      const { map } = useMemo(() => createListenersMap(), []);

      return (
        <SelfClientProvider config={defaultConfig} adapters={adapters} listeners={map}>
          <div style={{ margin: '3em' }}>
            <Story />
          </div>
        </SelfClientProvider>
      );
    },
  ],
};

export default preview;
