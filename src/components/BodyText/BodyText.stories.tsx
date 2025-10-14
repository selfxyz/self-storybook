import { BodyText } from '@selfxyz/mobile-sdk-alpha/components';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Body text component for paragraphs and general content
 */
const meta: Meta<typeof BodyText> = {
  title: 'Mobile SDK/Typography/BodyText',
  component: BodyText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Standard body text component for paragraphs and content blocks.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default body text
 */
export const Default: Story = {
  args: {
    children: 'Place your passport on the back of your phone to scan the NFC chip.',
  },
};

/**
 * Short body text
 */
export const Short: Story = {
  args: {
    children: 'Your data is encrypted and secure.',
  },
};
