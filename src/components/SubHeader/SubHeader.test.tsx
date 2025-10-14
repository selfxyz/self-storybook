import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './SubHeader.stories';

const { Default } = composeStories(stories);

describe('SubHeader', () => {
  it('renders correctly', () => {
    render(<Default />);
    expect(screen.getByText('Scan Your Passport')).toBeDefined();
  });
});
