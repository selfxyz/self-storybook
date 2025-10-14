import { Caption } from '@selfxyz/mobile-sdk-alpha/components';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Caption component for small labels and secondary text
 */
const meta: Meta<typeof Caption> = {
  title: 'Mobile SDK/Typography/Caption',
  component: Caption,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Small text component for labels, captions, and secondary information.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default caption
 */
export const Default: Story = {
  args: {
    children: 'Step 1 of 3',
  },
};

/**
 * Caption with additional info
 */
export const WithInfo: Story = {
  args: {
    children: 'This process takes about 2 minutes',
  },
};
