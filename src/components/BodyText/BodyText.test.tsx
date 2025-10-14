import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './BodyText.stories';

const { Default } = composeStories(stories);

describe('BodyText', () => {
  it('renders correctly', () => {
    render(<Default />);
    expect(screen.getByText(/Place your passport/)).toBeDefined();
  });
});
