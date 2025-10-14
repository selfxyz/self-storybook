import { Caution } from '@selfxyz/mobile-sdk-alpha/components';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Caution component for warning messages and important notices
 */
const meta: Meta<typeof Caution> = {
  title: 'Mobile SDK/Typography/Caution',
  component: Caution,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Warning text component for cautionary messages and important notices.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default caution message
 */
export const Default: Story = {
  args: {
    children: 'Warning: This action cannot be undone',
  },
};

/**
 * Privacy caution
 */
export const Privacy: Story = {
  args: {
    children: 'Caution: Do not share your recovery phrase with anyone',
  },
};
