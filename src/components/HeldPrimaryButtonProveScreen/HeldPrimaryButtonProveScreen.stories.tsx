import { HeldPrimaryButtonProveScreen } from '@selfxyz/mobile-sdk-alpha/components';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

/**
 * Specialized held button for proof generation screen.
 * Shows progress during ZK proof generation process.
 * This component has specific internal state management and doesn't accept children prop.
 */
const meta: Meta<typeof HeldPrimaryButtonProveScreen> = {
  title: 'Mobile SDK/Buttons/HeldPrimaryButtonProveScreen',
  component: HeldPrimaryButtonProveScreen,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Specialized button for generating zero-knowledge proofs. Manages its own state based on session, scroll, and readiness.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onVerify: {
      action: 'verify',
      description: 'Function called when verification is triggered',
    },
    selectedAppSessionId: {
      control: 'text',
      description: 'Current app session ID',
    },
    hasScrolledToBottom: {
      control: 'boolean',
      description: 'Whether user has scrolled to bottom of content',
    },
    isReadyToProve: {
      control: 'boolean',
      description: 'Whether system is ready to generate proof',
    },
  },
  args: {
    onVerify: fn(),
    selectedAppSessionId: 'session-123',
    hasScrolledToBottom: true,
    isReadyToProve: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Ready to prove state - all conditions met
 */
export const ReadyToProve: Story = {
  args: {
    selectedAppSessionId: 'session-123',
    hasScrolledToBottom: true,
    isReadyToProve: true,
  },
};

/**
 * Waiting for scroll - user hasn't scrolled to bottom
 */
export const WaitingForScroll: Story = {
  args: {
    selectedAppSessionId: 'session-123',
    hasScrolledToBottom: false,
    isReadyToProve: true,
  },
};

/**
 * No session selected
 */
export const NoSession: Story = {
  args: {
    selectedAppSessionId: null,
    hasScrolledToBottom: true,
    isReadyToProve: true,
  },
};
