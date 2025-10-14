import { RoundFlag } from '@selfxyz/mobile-sdk-alpha/components';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Round flag component displaying country flags in circular format.
 * Uses ISO Alpha-3 country codes (e.g., "USA", "GBR", "DEU").
 */
const meta: Meta<typeof RoundFlag> = {
  title: 'Mobile SDK/Visual/RoundFlag',
  component: RoundFlag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays circular country flags using ISO Alpha-3 codes. Shows gray fallback circle for invalid codes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    countryCode: {
      control: 'text',
      description: 'ISO Alpha-3 country code (e.g., USA, GBR, DEU)',
    },
    size: {
      control: 'number',
      description: 'Size of the flag in pixels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * United States flag
 */
export const USA: Story = {
  args: {
    countryCode: 'USA',
    size: 64,
  },
};

/**
 * United Kingdom flag
 */
export const GBR: Story = {
  args: {
    countryCode: 'GBR',
    size: 64,
  },
};

/**
 * Germany flag
 */
export const DEU: Story = {
  args: {
    countryCode: 'DEU',
    size: 64,
  },
};

/**
 * France flag
 */
export const FRA: Story = {
  args: {
    countryCode: 'FRA',
    size: 64,
  },
};

/**
 * Japan flag
 */
export const JPN: Story = {
  args: {
    countryCode: 'JPN',
    size: 64,
  },
};

/**
 * Small size
 */
export const Small: Story = {
  args: {
    countryCode: 'CAN',
    size: 32,
  },
};

/**
 * Large size
 */
export const Large: Story = {
  args: {
    countryCode: 'AUS',
    size: 128,
  },
};

/**
 * Invalid country code (shows gray fallback)
 */
export const Invalid: Story = {
  args: {
    countryCode: 'INVALID',
    size: 64,
  },
};
