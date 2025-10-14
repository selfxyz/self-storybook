import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './Caution.stories';

const { Default } = composeStories(stories);

describe('Caution', () => {
  it('renders correctly', () => {
    render(<Default />);
    expect(screen.getByText(/cannot be undone/)).toBeDefined();
  });
});
