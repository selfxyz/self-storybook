import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './Description.stories';

const { Default } = composeStories(stories);

describe('Description', () => {
  it('renders correctly', () => {
    render(<Default />);
    expect(screen.getByText(/zero-knowledge proofs/)).toBeDefined();
  });
});
