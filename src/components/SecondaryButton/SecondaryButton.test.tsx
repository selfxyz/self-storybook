import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './SecondaryButton.stories';

const { Default } = composeStories(stories);

describe('SecondaryButton', () => {
  it('renders correctly', () => {
    render(<Default />);
    expect(screen.getByText('Cancel')).toBeDefined();
  });
});
