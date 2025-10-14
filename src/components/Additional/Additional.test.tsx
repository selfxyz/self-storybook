import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './Additional.stories';

const { Default } = composeStories(stories);

describe('Additional', () => {
  it('renders correctly', () => {
    render(<Default />);
    expect(screen.getByText(/Enable biometric/)).toBeDefined();
  });
});
