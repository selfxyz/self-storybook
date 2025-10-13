import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Button } from './Button';

/**
 * React Native Button component that works across web and mobile platforms.
 * This button uses React Native primitives and is rendered using React Native Web in Storybook.
 */
const meta = {
  title: 'React Native/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Primary UI component for user interaction, built with React Native that works on both mobile and web.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
      description: 'Custom background color',
    },
    primary: {
      control: 'boolean',
      description: 'Is this the principal call to action?',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    label: {
      control: 'text',
      description: 'Button text label',
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary button variant
 */
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

/**
 * Secondary button variant
 */
export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

/**
 * Large button size
 */
export const Large: Story = {
  args: {
    size: "small",
    label: "Test",
  },
};

/**
 * Small button size
 */
export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};
