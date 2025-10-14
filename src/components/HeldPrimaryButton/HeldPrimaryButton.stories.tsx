import { HeldPrimaryButton } from '@selfxyz/mobile-sdk-alpha/components';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

/**
 * Long-press button with progress indicator.
 * Requires user to hold for a duration to complete the action.
 */
const meta: Meta<typeof HeldPrimaryButton> = {
  title: 'Mobile SDK/Buttons/HeldPrimaryButton',
  component: HeldPrimaryButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Button that requires long-press interaction with visual progress feedback. Used for confirmatory actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onLongPress: {
      action: 'long-pressed',
      description: 'Function called when hold duration is complete',
    },
  },
  args: {
    onLongPress: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default held button
 */
export const Default: Story = {
  args: {
    children: 'Hold to Confirm',
  },
};

/**
 * With action
 */
export const WithAction: Story = {
  args: {
    children: 'Hold to Delete',
  },
};
