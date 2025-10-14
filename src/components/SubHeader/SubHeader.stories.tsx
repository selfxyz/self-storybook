import { SubHeader } from '@selfxyz/mobile-sdk-alpha/components';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Secondary heading component for section titles
 */
const meta: Meta<typeof SubHeader> = {
  title: 'Mobile SDK/Typography/SubHeader',
  component: SubHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Secondary heading component used for subsections and subtitles.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default subheader
 */
export const Default: Story = {
  args: {
    children: 'Scan Your Passport',
  },
};

/**
 * Multi-word subheader
 */
export const MultiWord: Story = {
  args: {
    children: 'Complete Your Profile',
  },
};
