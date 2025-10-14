import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './Caption.stories';

const { Default } = composeStories(stories);

describe('Caption', () => {
  it('renders correctly', () => {
    render(<Default />);
    expect(screen.getByText('Step 1 of 3')).toBeDefined();
  });
});
