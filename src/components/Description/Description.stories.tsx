import { Description } from '@selfxyz/mobile-sdk-alpha/components';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Description component for detailed explanatory text
 */
const meta: Meta<typeof Description> = {
  title: 'Mobile SDK/Typography/Description',
  component: Description,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Descriptive text component for detailed explanations and instructions.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default description
 */
export const Default: Story = {
  args: {
    children:
      'We use zero-knowledge proofs to verify your identity without revealing personal information.',
  },
};

/**
 * Short description
 */
export const Short: Story = {
  args: {
    children: 'Your privacy is protected.',
  },
};
