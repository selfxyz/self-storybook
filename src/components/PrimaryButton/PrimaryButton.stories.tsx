import { PrimaryButton } from '@selfxyz/mobile-sdk-alpha/components';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

/**
 * Primary button component with black background and amber text.
 * Main call-to-action button for critical user interactions.
 */
const meta: Meta<typeof PrimaryButton> = {
  title: 'Mobile SDK/Buttons/PrimaryButton',
  component: PrimaryButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Primary action button with black background and amber text. Disabled state shows white background with slate text.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    onPress: {
      action: 'pressed',
      description: 'Function called when button is pressed',
    },
  },
  args: {
    onPress: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default primary button
 */
export const Default: Story = {
  args: {
    children: 'Continue',
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    children: 'Continue',
    disabled: true,
  },
};

/**
 * With action text
 */
export const WithAction: Story = {
  args: {
    children: 'Scan Passport',
  },
};

/**
 * Long text
 */
export const LongText: Story = {
  args: {
    children: 'Complete Identity Verification',
  },
};
