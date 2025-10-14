import { DescriptionTitle } from '@selfxyz/mobile-sdk-alpha/components';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Description title component for section headers
 */
const meta: Meta<typeof DescriptionTitle> = {
  title: 'Mobile SDK/Typography/DescriptionTitle',
  component: DescriptionTitle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Title component for description sections and detailed content blocks.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default description title
 */
export const Default: Story = {
  args: {
    children: 'How It Works',
  },
};

/**
 * Question format
 */
export const Question: Story = {
  args: {
    children: 'Why do I need to scan my passport?',
  },
};
