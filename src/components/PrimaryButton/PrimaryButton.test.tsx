import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './PrimaryButton.stories';

const { Default, Disabled } = composeStories(stories);

describe('PrimaryButton', () => {
  it('renders default button correctly', () => {
    render(<Default />);
    expect(screen.getByText('Continue')).toBeDefined();
  });

  it('renders disabled button correctly', () => {
    render(<Disabled />);
    expect(screen.getByText('Continue')).toBeDefined();
  });
});
