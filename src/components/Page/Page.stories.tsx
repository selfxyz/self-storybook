import type { Meta, StoryObj } from '@storybook/react';
import { Page } from './Page';

const meta = {
  title: 'React Native/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Full page example with header and content built with React Native.',
      },
    },
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};
