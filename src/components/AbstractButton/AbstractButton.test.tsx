import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './AbstractButton.stories';

const { Default } = composeStories(stories);

describe('AbstractButton', () => {
  it('renders correctly', () => {
    render(<Default />);
    expect(screen.getByText('Custom Button')).toBeDefined();
  });
});
