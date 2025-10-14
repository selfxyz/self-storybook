import { SecondaryButton } from '@selfxyz/mobile-sdk-alpha/components';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

/**
 * Secondary button component for less prominent actions
 */
const meta: Meta<typeof SecondaryButton> = {
  title: 'Mobile SDK/Buttons/SecondaryButton',
  component: SecondaryButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Secondary action button for less critical interactions.',
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
 * Default secondary button
 */
export const Default: Story = {
  args: {
    children: 'Cancel',
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    children: 'Cancel',
    disabled: true,
  },
};

/**
 * Alternative action
 */
export const Alternative: Story = {
  args: {
    children: 'Skip for Now',
  },
};
