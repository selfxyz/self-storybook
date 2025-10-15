import type { Adapters } from '@selfxyz/mobile-sdk-alpha';
import { createListenersMap, defaultConfig, SelfClientProvider } from '@selfxyz/mobile-sdk-alpha';
import { AbstractButton } from '@selfxyz/mobile-sdk-alpha/components';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useMemo } from 'react';

// Mock adapters for AbstractButton stories
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

/**
 * Abstract button component - base component for all button variants.
 * This is an internal component; use PrimaryButton or SecondaryButton instead.
 */
const meta: Meta<typeof AbstractButton> = {
  title: 'Mobile SDK/Buttons/AbstractButton',
  component: AbstractButton,
  decorators: [
    (Story) => {
      const adapters = useMemo(() => createMockAdapters(), []);
      const { map } = useMemo(() => createListenersMap(), []);

      return (
        <SelfClientProvider config={defaultConfig} adapters={adapters} listeners={map}>
          <Story />
        </SelfClientProvider>
      );
    },
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Base button component used internally. Provides core button functionality with customizable colors and borders. Use PrimaryButton or SecondaryButton for standard implementations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    bgColor: {
      control: 'color',
      description: 'Background color',
    },
    color: {
      control: 'color',
      description: 'Text color',
    },
    borderColor: {
      control: 'color',
      description: 'Border color (optional)',
    },
    borderWidth: {
      control: 'number',
      description: 'Border width in pixels',
    },
    onPress: {
      action: 'pressed',
      description: 'Function called when button is pressed',
    },
  },
  args: {
    onPress: fn(),
    bgColor: '#000000',
    color: '#FFFFFF',
    borderWidth: 2,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default abstract button with custom styling
 */
export const Default: Story = {
  args: {
    children: 'Custom Button',
    bgColor: '#1ea7fd',
    color: '#ffffff',
  },
};

/**
 * With border
 */
export const WithBorder: Story = {
  args: {
    children: 'Bordered Button',
    bgColor: '#ffffff',
    color: '#000000',
    borderColor: '#000000',
    borderWidth: 2,
  },
};

/**
 * Custom colors
 */
export const CustomColors: Story = {
  args: {
    children: 'Custom Style',
    bgColor: '#10b981',
    color: '#ffffff',
  },
};
