import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './HeldPrimaryButton.stories';

const { Default } = composeStories(stories);

describe('HeldPrimaryButton', () => {
  it('renders correctly', () => {
    render(<Default />);
    expect(screen.getByText('Hold to Confirm')).toBeDefined();
  });
});
