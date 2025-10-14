import { Title } from '@selfxyz/mobile-sdk-alpha/components';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Main heading component with large size variant.
 * Uses the Advercase font family with black color by default.
 */
const meta: Meta<typeof Title> = {
  title: 'Mobile SDK/Typography/Title',
  component: Title,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Primary heading component for mobile SDK. Default size is 28px (line-height 35px), large variant is 38px (line-height 47px).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: [undefined, 'large'],
      description: 'Size variant of the title',
    },
    children: {
      control: 'text',
      description: 'Text content to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default title with standard sizing (28px)
 */
export const Default: Story = {
  args: {
    children: 'Welcome Back',
  },
};

/**
 * Large title variant (38px) for prominent headings
 */
export const Large: Story = {
  args: {
    children: 'Get Started',
    size: 'large',
  },
};

/**
 * Multi-line title example
 */
export const MultiLine: Story = {
  args: {
    children: 'Prove Your Identity Securely',
  },
};
