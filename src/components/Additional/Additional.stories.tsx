import { Additional } from '@selfxyz/mobile-sdk-alpha/components';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Additional text component for supplementary information
 */
const meta: Meta<typeof Additional> = {
  title: 'Mobile SDK/Typography/Additional',
  component: Additional,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Text component for additional notes and supplementary information.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default additional text
 */
export const Default: Story = {
  args: {
    children: 'Optional: Enable biometric authentication for faster access',
  },
};

/**
 * Note format
 */
export const Note: Story = {
  args: {
    children: 'Note: This data is stored only on your device',
  },
};
