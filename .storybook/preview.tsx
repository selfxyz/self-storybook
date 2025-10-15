import { SelfClientProvider } from '@selfxyz/mobile-sdk-alpha';
import type { Preview } from '@storybook/react';
import React, { useMemo } from 'react';
import {
  getStorybookListeners,
  getStorybookSelfClientAdapters,
  getStorybookSelfClientConfig,
} from '../src/storybook/selfClient.factory';

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
      const adapters = useMemo(() => getStorybookSelfClientAdapters(), []);
      const { map } = useMemo(() => getStorybookListeners(), []);

      return (
        <SelfClientProvider
          config={getStorybookSelfClientConfig()}
          adapters={adapters}
          listeners={map}
        >
          <div style={{ margin: '3em' }}>
            <Story />
          </div>
        </SelfClientProvider>
      );
    },
  ],
};

export default preview;
